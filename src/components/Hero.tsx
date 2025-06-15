import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Shield, Users, MessageSquare, MessageCircle, Sun, Heart, CheckCircle2 } from "lucide-react";
import { WellnessMetrics } from "@/components/WellnessMetrics";
import { MentalHealthScore } from "./MentalHealthScore";
import { PersonalizationQuiz } from "@/components/PersonalizationQuiz";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Add custom CSS for slow spinning animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slow-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-slow-spin {
    animation: slow-spin 3s linear infinite;
  }
`;
document.head.appendChild(style);

interface HeroProps {
  onStartJourney: () => void;
}

interface PersonalizationInsights {
  primaryConcern: string;
  mood: string;
  experience: string;
  contentPreference: string;
  preferredTime: string;
  recommendations: {
    therapyType: string;
    contentTypes: string[];
    urgency: string;
    metrics: {
      focus: string[];
      priority: string[];
    };
  };
}

export const Hero = ({ onStartJourney }: HeroProps) => {
  const navigate = useNavigate();
  const [showShareYourDay, setShowShareYourDay] = useState(false);
  const [shareYourDayCompleted, setShareYourDayCompleted] = useState(false);

  const handleCommunitiesClick = () => {
    navigate("/communities");
  };

  const handleLearnMoreClick = () => {
    navigate("/dashboard");
  };

  const handleShareYourDayComplete = (insights: PersonalizationInsights) => {
    setShareYourDayCompleted(true);
    setShowShareYourDay(false);
    console.log("Share Your Day completed:", insights);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-8">
            <img src="/logo.png" alt="Mindhaven Logo" className="w-4 h-4 mr-2 object-contain" />
            Welcome to Mindhaven - Your Mental Health Platform
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-green-600">Mindhaven</span> - Find Your Path to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              {" "}Mental Wellness
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Mindhaven provides personalized therapy, mindful content, and AI-powered support
            tailored to your unique mental health journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">            <Button
              onClick={() => setShowShareYourDay(true)}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full text-lg font-semibold"
            >
              Talk About Your Day
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              onClick={handleLearnMoreClick}
              variant="outline"
              size="lg"
              className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 rounded-full text-lg font-semibold"
            >
              Learn More
            </Button>
            
            <Button
              onClick={handleCommunitiesClick}
              variant="outline"
              size="lg"
              className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Communities
            </Button>
          </div>        </div>
        <div id="mental-health-score" className="mb-8">
            <MentalHealthScore/>
        </div>        {/* Share Your Day Section */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border-2 border-slate-200 shadow-lg max-w-7xl mx-auto">
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-4 text-3xl mb-4">
                <Sun className="w-10 h-10 text-orange-500 animate-slow-spin" />
                <span className="bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent font-bold">
                  Share Your Day
                </span>
                {shareYourDayCompleted && <CheckCircle2 className="w-8 h-8 text-green-500" />}
              </CardTitle>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Let Mindhaven understand your mental wellness journey through personalized daily check-ins
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-slate-600" />
                  <span className="font-semibold text-gray-800 text-xl">Wellness Check-in</span>
                  <Heart className="w-6 h-6 text-rose-500" />
                </div>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">
                  Share your thoughts, emotions, and experiences with our AI-powered wellness system 
                  for personalized mental health insights and recommendations.
                </p>
                <div className="flex justify-center space-x-4">
                  {!shareYourDayCompleted ? (
                    <Button 
                      onClick={() => setShowShareYourDay(true)}
                      className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 hover:from-slate-700 hover:via-blue-700 hover:to-indigo-700 text-white px-8 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Sun className="w-5 h-5 mr-2 animate-slow-spin" />
                      Start Your Wellness Journey
                    </Button>
                  ) : (
                    <div className="flex items-center gap-3 text-green-700 font-semibold">
                      <CheckCircle2 className="w-6 h-6" />
                      <span>Your wellness check-in is complete</span>
                    </div>
                  )}
                  {shareYourDayCompleted && (
                    <Button 
                      onClick={() => setShowShareYourDay(true)}
                      variant="outline"
                      className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Check-in Again
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Metrics Section */}
        <div id="wellness-metrics" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Mindhaven Psychological Metrics</h2>
          <WellnessMetrics />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mindhaven Expert Therapists</h3>
            <p className="text-gray-600 text-center">Connect with licensed mental health professionals through our platform</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Content</h3>
            <p className="text-gray-600 text-center">Mindhaven curates resources based on your unique needs</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
            <p className="text-gray-600 text-center">Mindhaven prioritizes your privacy and data security</p>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Personalization Quiz Modal */}
      {showShareYourDay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800">Share Your Day - Wellness Check-in</h2>
              <Button 
                onClick={() => setShowShareYourDay(false)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>            <div className="p-6">
              <PersonalizationQuiz 
                onComplete={handleShareYourDayComplete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
