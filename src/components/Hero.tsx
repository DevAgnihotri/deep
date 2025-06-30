import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Users, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export const Hero = ({ onStartJourney }: HeroProps) => {
  const navigate = useNavigate();

  const handleCommunitiesClick = () => {
    navigate("/communities");
  };

  const handleLearnMoreClick = () => {
    navigate("/dashboard");
  };

  const handleTalkAboutDayClick = () => {
    navigate("/ContentRecommendations");
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={handleTalkAboutDayClick}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full text-lg font-semibold"
            >
              Access Resources
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
            </Button>          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};
