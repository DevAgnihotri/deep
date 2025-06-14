
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Users, MessageSquare } from "lucide-react";
import { WellnessMetrics } from "@/components/WellnessMetrics";
import { MentalHealthScore } from "./MentalHealthScore";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onStartJourney: () => void;
}

export const Hero = ({ onStartJourney }: HeroProps) => {
  const navigate = useNavigate();

  const handleCommunitiesClick = () => {
    navigate("/communities");
  };

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-8">
            <img src="/logo.png" alt="ALL&nbsp;IN&nbsp;A Logo" className="w-4 h-4 mr-2 object-contain" />
            Welcome to ALL&nbsp;IN&nbsp;A - Your Mental Health Platform
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-green-600">ALL&nbsp;IN&nbsp;A</span> - Find Your Path to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              {" "}Mental Wellness
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            ALL&nbsp;IN&nbsp;A provides personalized therapy, mindful content, and AI-powered support
            tailored to your unique mental health journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={onStartJourney}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full text-lg font-semibold"
            >
              Talk About Your Day
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
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
          </div>
        </div>
        <div id="mental-health-score" className="mb-8">
            <MentalHealthScore/>
        </div>
        {/* Health Metrics Section */}
        <div id="wellness-metrics" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">ALL&nbsp;IN&nbsp;A Psychological Metrics</h2>
          <WellnessMetrics />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ALL&nbsp;IN&nbsp;A Expert Therapists</h3>
            <p className="text-gray-600 text-center">Connect with licensed mental health professionals through our platform</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Content</h3>
            <p className="text-gray-600 text-center">ALL&nbsp;IN&nbsp;A curates resources based on your unique needs</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
            <p className="text-gray-600 text-center">ALL&nbsp;IN&nbsp;A prioritizes your privacy and data security</p>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};
