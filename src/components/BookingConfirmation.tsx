import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Video, Phone, CheckCircle, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface BookingDetails {
  therapist: Therapist;
  date: Date;
  time: string;
  sessionType: string;
}

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
  availableTimes?: string[];
}

interface BookingConfirmationProps {
  therapist: Therapist;
  bookingDetails?: BookingDetails;
  onBack: () => void;
  onBookingComplete?: () => void;
}

export const BookingConfirmation = ({ therapist, bookingDetails: providedBookingDetails, onBack, onBookingComplete }: BookingConfirmationProps) => {
  
  // Use provided booking details or create mock details if not provided
  const bookingDetails = providedBookingDetails || {
    therapist: therapist,
    date: new Date(),
    time: "2:00 PM",
    sessionType: "Video",
  };  // Format date and time for display
  const bookingDate = format(bookingDetails.date, "EEEE, MMMM d, yyyy");
  
  // Get session icon
  const getSessionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Button 
        onClick={onBack}
        variant="outline" 
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="space-y-6">
        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>              <div>
                <h3 className="text-lg font-semibold text-green-800">Mindhaven Booking Confirmed!</h3>
                <p className="text-green-600">Your Mindhaven therapy session has been successfully scheduled.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Session Details</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Therapist Info */}
            <div className="flex items-center space-x-4">
              <img 
                src={therapist.image} 
                alt={therapist.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{therapist.name}</h3>
                <p className="text-gray-600">{therapist.specialty}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(therapist.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({therapist.rating})</span>
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">{bookingDate}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-gray-600">{bookingDetails.time}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {getSessionIcon(bookingDetails.sessionType)}
                <div>
                  <p className="font-medium">Session Type</p>
                  <Badge variant="secondary">{bookingDetails.sessionType}</Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-green-600">Confirmed</p>
                </div>
              </div>
            </div>
          </CardContent>        </Card>
      </div>
    </div>
  );
};
