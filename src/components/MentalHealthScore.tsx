
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, AlertCircle, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MenstrualCycleAssessment from "./MenstrualCycleAssessment";

interface MentalHealthScoreProps {
  showTitle?: boolean;
  cycleScore?: number;
  cycleAnswers?: number[];
}

export const MentalHealthScore = ({ showTitle = true, cycleScore, cycleAnswers }: MentalHealthScoreProps) => {
  const [showCycleQuiz, setShowCycleQuiz] = useState(false);
  const [currentCycleScore, setCurrentCycleScore] = useState(cycleScore);
  const [lastAssessmentDate, setLastAssessmentDate] = useState<Date | null>(
    cycleScore ? new Date() : null
  );

  // Calculate mental health score based on Cycle assessment results
  const calculateMentalHealthScore = (cycleScore?: number) => {
    if (!cycleScore && cycleScore !== 0) {
      return 75; // Default score when no assessment taken
    }
      // Convert cycle score (0-48, higher is worse) to mental health score (0-100, higher is better)
    // Cycle: 0-12 = minimal, 13-19 = mild, 20-29 = moderate, 30-38 = significant, 39+ = severe
    if (cycleScore <= 12) {
      return 85 - (cycleScore * 2); // 85-61 range (good to excellent)
    } else if (cycleScore <= 19) {
      return 67 - ((cycleScore - 12) * 2); // 67-53 range (fair to good)
    } else if (cycleScore <= 29) {
      return 53 - ((cycleScore - 19) * 2); // 53-33 range (needs attention)
    } else {
      return Math.max(15, 33 - ((cycleScore - 29) * 1)); // 33-15 range (serious concern)
    }
  };

  const mentalHealthScore = calculateMentalHealthScore(currentCycleScore);
  
  const handleCycleComplete = (score: number, answers: number[]) => {
    setCurrentCycleScore(score);
    setLastAssessmentDate(new Date());
    setShowCycleQuiz(false);
  };

  const handleBookingNavigation = () => {
    // Navigate to booking section - you can customize this based on your routing setup
    const bookingSection = document.getElementById('therapist-booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no booking section on current page, navigate to booking page
      window.location.href = '/booking';
    }
  };

  if (showCycleQuiz) {
    return <MenstrualCycleAssessment onComplete={handleCycleComplete} />;
  }
  
  const getScoreStatus = (score: number) => {
    if (score >= 80) return { status: "Excellent", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" };
    if (score >= 60) return { status: "Good", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" };
    if (score >= 40) return { status: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" };
    return { status: "Needs Attention", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" };
  };

  const scoreInfo = getScoreStatus(mentalHealthScore);

  return (
    <Card className={`${scoreInfo.bgColor} ${scoreInfo.borderColor} border-2`}>
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className={`w-5 h-5 ${scoreInfo.color}`} />
            <span>Women's Mental Wellness Score</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={!showTitle ? "pt-6" : ""}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{mentalHealthScore}/100</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${scoreInfo.color} ${scoreInfo.bgColor}`}>
              {scoreInfo.status}
            </span>
          </div>
          
          <Progress value={mentalHealthScore} className="h-3" />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-medium">Last Assessment</span>
              </div>
              <p className="text-gray-600">
                {lastAssessmentDate ? lastAssessmentDate.toLocaleDateString() : "No assessment taken"}
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Trend</span>
              </div>
              <p className="text-gray-600">                {currentCycleScore !== undefined ?
                  (currentCycleScore <= 12 ? "Excellent" : currentCycleScore <= 19 ? "Good" : currentCycleScore <= 29 ? "Monitor" : "Attention needed") :
                  "Not assessed"
                }
              </p>
            </div>
          </div>
            <div className="p-3 bg-white/70 rounded-lg">            <p className="text-sm text-gray-700">
              {currentCycleScore !== undefined ? 
                `Based on your recent cycle assessment (Score: ${currentCycleScore}/48). ` : 
                "Take a cycle assessment to get personalized insights. "
              }
              {mentalHealthScore >= 70 ? " You're doing well! Keep up the good self-care." : 
               mentalHealthScore >= 50 ? " Consider speaking with a healthcare provider." : 
               " We recommend reaching out to a mental health professional."}
            </p>
          </div>

          {/* Booking Button - shows when EPDS suggests speaking with healthcare provider */}
          {currentCycleScore !== undefined && currentCycleScore >= 20 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    Professional Support Recommended
                  </p>
                  <p className="text-xs text-blue-600">
                    Consider booking an appointment with a healthcare provider
                  </p>
                </div>
                <Button
                  onClick={handleBookingNavigation}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          )}          {/* Cycle Assessment Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={() => setShowCycleQuiz(true)}
              variant="outline"
              className="w-full border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {currentCycleScore !== undefined ? "Retake Cycle Assessment" : "Take Cycle & Mental Health Assessment"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};