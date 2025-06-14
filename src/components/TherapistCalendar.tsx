
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, AlertCircle } from "lucide-react";
import { BookingService, AVAILABLE_TIME_SLOTS } from "@/lib/bookingService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Define types
interface Therapist {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  image: string;
  nextAvailable: string;
  sessionTypes: string[];
  bio: string;
}

interface TherapistCalendarProps {
  therapist: Therapist;
  selectedSessionType?: string;
  onBack: () => void;
  onBookingConfirm: (therapist: Therapist, date: Date, time: string, sessionType: string) => void;
}

export const TherapistCalendar = ({ 
  therapist, 
  selectedSessionType = "Video", 
  onBack, 
  onBookingConfirm 
}: TherapistCalendarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [userBookingCount, setUserBookingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Load booked slots when date changes
  useEffect(() => {
    const loadBookedSlots = async () => {
      if (!selectedDate) return;
      
      const dateStr = selectedDate.toISOString().split('T')[0];
      const booked = await BookingService.getBookedSlotsForDate(therapist.id, dateStr);
      setBookedSlots(booked);
    };

    const loadUserBookingCount = async () => {
      if (!user) return;
      
      const count = await BookingService.getUserBookingCount(user.uid);
      setUserBookingCount(count);
    };

    if (selectedDate && user) {
      loadBookedSlots();
      loadUserBookingCount();
    }  }, [selectedDate, user, therapist.id]);

  // Format time slots to display format
  const formatTimeForDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Check if date is available (no past dates, weekdays only)
  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && date.getDay() !== 0 && date.getDay() !== 6; // No weekends, no past dates
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !user) {
      toast({
        title: "Error",
        description: "Please select a date and time, and ensure you're logged in.",
        variant: "destructive",
      });
      return;
    }

    // Check booking limit
    if (userBookingCount >= 5) {
      toast({
        title: "Booking Limit Reached",
        description: "You have reached the maximum of 5 bookings. Please cancel an existing booking to make a new one.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      
      const result = await BookingService.bookSession(
        user.uid,
        user.email || '',
        therapist.id,
        therapist.name,
        dateStr,
        selectedTime,
        selectedSessionType
      );

      if (result.success) {
        toast({
          title: "Booking Confirmed!",
          description: result.message,
        });
        
        // Call the parent callback with booking details
        onBookingConfirm(therapist, selectedDate, formatTimeForDisplay(selectedTime), selectedSessionType);
      } else {
        toast({
          title: "Booking Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button 
        onClick={onBack}
        variant="outline" 
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Therapists
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Date & Time</CardTitle>
            <p className="text-gray-600">Choose your preferred appointment slot with {therapist.name}</p>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => !isDateAvailable(date)}
              className="rounded-md border p-3 pointer-events-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Available Times</span>
            </CardTitle>
            {selectedDate && (
              <p className="text-gray-600">
                Available slots for {selectedDate.toLocaleDateString()}
              </p>
            )}
          </CardHeader>          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {/* Booking limit warning */}
                {userBookingCount >= 5 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <p className="text-sm text-red-600">
                      You have reached the maximum of 5 bookings. Cancel an existing booking to make a new one.
                    </p>
                  </div>
                )}
                
                {userBookingCount === 4 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <p className="text-sm text-yellow-600">
                      You have 1 booking slot remaining.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Morning Slots</div>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_TIME_SLOTS.slice(0, 2).map((time) => {
                      const isBooked = bookedSlots.includes(time);
                      const isSelected = selectedTime === time;
                      const displayTime = formatTimeForDisplay(time);
                      
                      return (
                        <button
                          key={time}
                          onClick={() => !isBooked && userBookingCount < 5 && setSelectedTime(time)}
                          disabled={isBooked || userBookingCount >= 5}
                          className={`p-3 rounded-lg border text-center transition-all text-sm ${
                            isBooked
                              ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : isSelected
                              ? "border-green-500 bg-green-50 text-green-700"
                              : userBookingCount >= 5
                              ? "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
                              : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                          }`}
                        >
                          {displayTime}
                          {isBooked && <div className="text-xs text-red-500 mt-1">Booked</div>}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-700 mb-2 mt-4">Afternoon Slots</div>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_TIME_SLOTS.slice(2, 4).map((time) => {
                      const isBooked = bookedSlots.includes(time);
                      const isSelected = selectedTime === time;
                      const displayTime = formatTimeForDisplay(time);
                      
                      return (
                        <button
                          key={time}
                          onClick={() => !isBooked && userBookingCount < 5 && setSelectedTime(time)}
                          disabled={isBooked || userBookingCount >= 5}
                          className={`p-3 rounded-lg border text-center transition-all text-sm ${
                            isBooked
                              ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : isSelected
                              ? "border-green-500 bg-green-50 text-green-700"
                              : userBookingCount >= 5
                              ? "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
                              : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                          }`}
                        >
                          {displayTime}
                          {isBooked && <div className="text-xs text-red-500 mt-1">Booked</div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
                  {selectedTime && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Booking Summary</h4>                    <div className="space-y-1 text-sm">
                      <p><strong>Therapist:</strong> {therapist.name}</p>
                      <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {formatTimeForDisplay(selectedTime)}</p>
                      <p><strong>Session Type:</strong> {selectedSessionType}</p>
                      <p><strong>Your Bookings:</strong> {userBookingCount}/5</p>
                    </div>
                    
                    <Button 
                      onClick={handleBooking}
                      disabled={isLoading || userBookingCount >= 5}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                    >
                      {isLoading ? "Booking..." : "Confirm Booking"}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Please select a date to view available times
              </p>
            )}
          </CardContent>        </Card>
      </div>
    </div>
  );
};