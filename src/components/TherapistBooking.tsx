import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, Video, MessageSquare, Phone, CheckCircle, CalendarCheck, Globe, AlertCircle } from "lucide-react";
import { BookingConfirmation } from "@/components/BookingConfirmation";
import { TherapistCalendar } from "./TherapistCalendar";
import { useAuth } from "@/contexts/AuthContext";
import { BookingService, BookingRecord } from "@/lib/bookingService";
import { format } from "date-fns";

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

interface BookingDetails {
  therapist: Therapist;
  date: Date;
  time: string;
  sessionType: string;
}

export const TherapistBooking = () => {
  const { user } = useAuth();
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookedTherapist, setBookedTherapist] = useState<Therapist | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [selectedSessionType, setSelectedSessionType] = useState<string>("Video");
  const [userBookings, setUserBookings] = useState<BookingRecord[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [userBookingCount, setUserBookingCount] = useState(0);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);

  // Force refresh function
  const forceRefreshBookings = () => {
    loadUserBookings();
  };

  // Load user bookings and check limits
  const loadUserBookings = useCallback(async () => {
    if (!user) return;
    
    setIsLoadingBookings(true);
    try {
      const bookings = await BookingService.getUserBookings(user.uid);
      const bookingCount = await BookingService.getUserBookingCount(user.uid);
      
      setUserBookings(bookings);
      setUserBookingCount(bookingCount);
      setHasReachedLimit(bookingCount >= 5);
    } catch (error) {
      console.error("Error loading user bookings:", error);
      // Set safe defaults on error
      setUserBookings([]);
      setUserBookingCount(0);
      setHasReachedLimit(false);
    } finally {
      setIsLoadingBookings(false);
    }
  }, [user]);

  useEffect(() => {
    loadUserBookings();
  }, [loadUserBookings]);

  const therapists: Therapist[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Anxiety & Depression",
      rating: 4.9,
      experience: "8 years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "Today 2:00 PM",
      sessionTypes: ["Video", "Phone", "Chat"],
      bio: "Specializes in cognitive behavioral therapy and mindfulness-based interventions."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Relationships & Communication",
      rating: 4.8,
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "Tomorrow 10:00 AM",
      sessionTypes: ["Video", "Phone"],
      bio: "Expert in couples therapy and family dynamics with a focus on communication skills."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Trauma & PTSD",
      rating: 4.9,
      experience: "10 years",
      image: "https://images.unsplash.com/photo-1623854767276-5025b88735d3?w=150&h=150&fit=crop&crop=face&facepad=3",
      nextAvailable: "Wednesday 3:30 PM",
      sessionTypes: ["Video", "Chat"],
      bio: "Trauma-informed therapist specializing in EMDR and somatic experiencing."
    }
  ];

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "Video": return Video;
      case "Phone": return Phone;
      case "Chat": return MessageSquare;
      default: return Video;
    }
  };

  const handleSelectTherapist = (therapist: Therapist) => {
    // Check if user has reached booking limit before allowing selection
    if (hasReachedLimit) {
      return; // Don't allow selection if limit is reached
    }
    
    setSelectedTherapist(therapist.id);
    setBookedTherapist(therapist);
    setShowCalendar(true);
  };  const handleBookingConfirm = (therapist: Therapist, date: Date, time: string, sessionType: string) => {
    setBookingDetails({ 
      therapist, 
      date, 
      time,
      sessionType
    });
    
    setShowCalendar(false);
    setShowBookingConfirmation(true);
    
    // Force refresh bookings after a successful booking
    forceRefreshBookings();
  };

  const handleBackToTherapists = () => {
    setShowCalendar(false);
    setSelectedTherapist(null);
    setBookedTherapist(null);
    // Refresh bookings when returning to therapist list
    loadUserBookings();
  };

  if (showBookingConfirmation && bookedTherapist && bookingDetails) {
    return (
      <BookingConfirmation 
        therapist={bookedTherapist}
        bookingDetails={bookingDetails}
        onBack={() => {
          setShowBookingConfirmation(false);
          // Force refresh bookings when returning from confirmation
          forceRefreshBookings();
        }}
        onBookingComplete={() => {
          // Force refresh bookings when booking is complete
          forceRefreshBookings();
        }}
      />
    );
  }

  if (showCalendar && bookedTherapist) {
    return (
      <TherapistCalendar
        therapist={bookedTherapist}
        selectedSessionType={selectedSessionType}
        onBack={handleBackToTherapists}
        onBookingConfirm={handleBookingConfirm}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Book a Session with Mindhaven Expert Therapists
        </h1>
        <p className="text-gray-600 text-lg">
          Choose from Mindhaven's licensed mental health professionals
        </p>
        {user && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <a 
              href="https://devtime-five.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Globe className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">
                Check Timezones
              </span>
            </a>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoadingBookings && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading your bookings...</p>
        </div>
      )}

      {/* User's Booked Sessions Section */}
      {user && userBookings.length > 0 && (
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <CalendarCheck className="w-5 h-5 mr-2" />
              Your Upcoming Sessions ({userBookings.length}/5)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{booking.therapistName}</h4>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmed
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      {booking.time}
                    </div>
                    <div className="flex items-center">
                      {React.createElement(getSessionIcon(booking.sessionType), {
                        className: "w-4 h-4 mr-2 text-blue-500"
                      })}
                      {booking.sessionType} Session
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Limit Warning */}
      {user && hasReachedLimit && (
        <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertCircle className="w-5 h-5 mr-2" />
              Booking Limit Reached
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              You have reached the maximum of 5 therapy sessions. To book a new session, 
              please cancel one of your existing bookings first.
            </p>
            <div className="flex items-center space-x-2 text-sm text-red-600">
              <Badge variant="destructive">5/5 Bookings Used</Badge>
              <span>Contact support if you need additional sessions</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Limit Warning for Near Limit */}
      {user && userBookingCount === 4 && !hasReachedLimit && (
        <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertCircle className="w-5 h-5 mr-2" />
              Almost at Booking Limit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700">
              You have 1 booking slot remaining. Choose your next session carefully!
            </p>
            <Badge variant="outline" className="mt-2 text-yellow-600 border-yellow-600">
              4/5 Bookings Used
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Therapist Grid - Only show when not loading */}
      {!isLoadingBookings && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {therapists.map((therapist) => (
          <Card 
            key={therapist.id} 
            className={`transition-all ${
              hasReachedLimit 
                ? 'opacity-60 cursor-not-allowed bg-gray-50' 
                : `cursor-pointer hover:shadow-lg ${
                    selectedTherapist === therapist.id ? 'ring-2 ring-green-500 bg-green-50' : 'bg-white'
                  }`
            }`}
            onClick={() => !hasReachedLimit && setSelectedTherapist(therapist.id)}
          >
            <CardHeader className="text-center">
              <img
                src={therapist.image}
                alt={therapist.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <CardTitle className="text-xl">{therapist.name}</CardTitle>
              <p className="text-green-600 font-medium">{therapist.specialty}</p>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mt-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {therapist.rating}
                </div>
                <span>•</span>
                <span>{therapist.experience} experience</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{therapist.bio}</p>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-green-500" />
                Next available: <span className="font-medium ml-1">{therapist.nextAvailable}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {therapist.sessionTypes.map((type) => {
                  const Icon = getSessionIcon(type);
                  return (
                    <Badge key={type} variant="secondary" className="flex items-center">
                      <Icon className="w-3 h-3 mr-1" />
                      {type}
                    </Badge>
                  );
                })}
              </div>
              
              <Button 
                className={`w-full ${
                  hasReachedLimit
                    ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                    : selectedTherapist === therapist.id 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
                disabled={hasReachedLimit}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasReachedLimit) {
                    handleSelectTherapist(therapist);
                  }
                }}
              >
                {hasReachedLimit ? 'Booking Limit Reached' : 'Select Therapist'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      )}
      
      {/* Booking Confirmation Section */}
      {selectedTherapist && !showCalendar && !hasReachedLimit && (
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to book with {therapists.find(t => t.id === selectedTherapist)?.name}?
                </h3>
                <p className="text-gray-600">
                  Choose your preferred session type and time slot
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <label htmlFor="session-type" className="text-sm font-medium">Session Type:</label>
                  <select 
                    id="session-type"
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    value={selectedSessionType}
                    onChange={(e) => setSelectedSessionType(e.target.value)}
                  >
                    <option value="Video">Video</option>
                    <option value="Phone">Phone</option>
                    <option value="Chat">Chat</option>
                  </select>
                </div>
                
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    const therapist = therapists.find(t => t.id === selectedTherapist);
                    if (therapist) handleSelectTherapist(therapist);
                  }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};