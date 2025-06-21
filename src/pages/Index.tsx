
import { useState, useEffect } from "react";
import { Users, Heart, Shield } from "lucide-react";
import { Hero } from "@/components/Hero";
import { WellnessDashboard } from "@/components/WellnessDashboard";
import { TherapistBooking } from "@/components/TherapistBooking";
import { ContentRecommendations } from "@/components/ContentRecommendations";
import { ChatBot } from "@/components/ChatBot";
import { Navigation } from "@/components/Navigation";
import { Profile } from "@/components/Profile";
import { Courses } from "@/pages/Courses";
import MentalHealthAssessmentPage from "@/pages/MentalHealthAssessmentPage";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [userInsights, setUserInsights] = useState(null);
  
  // Listen for chatbot navigation events
  useEffect(() => {
    const handleChatbotNavigation = (event: CustomEvent) => {
      const target = event.detail;
      setCurrentSection(target);
    };

    const handleSectionNavigation = (event: CustomEvent) => {
      const target = event.detail;
      setCurrentSection(target);
    };

    window.addEventListener('chatbot-navigate', handleChatbotNavigation as EventListener);
    window.addEventListener('navigate-to-section', handleSectionNavigation as EventListener);
    
    return () => {
      window.removeEventListener('chatbot-navigate', handleChatbotNavigation as EventListener);
      window.removeEventListener('navigate-to-section', handleSectionNavigation as EventListener);
    };
  }, []);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "assessment":
        return <MentalHealthAssessmentPage onNavigate={setCurrentSection} />;
      case "courses":
        return <Courses />;
      case "booking":
        return <TherapistBooking />;
      case "recommendations":
        return <ContentRecommendations insights={userInsights} />;
      case "profile":
        return <Profile />;
      case "dashboard":
        return <WellnessDashboard onNavigate={setCurrentSection} />;
      default:        return (
          <div className="space-y-0">
            <Hero
              onStartJourney={() => setCurrentSection("assessment")}
            />
            <WellnessDashboard onNavigate={setCurrentSection} />
          </div>
        );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="pt-20">
        {renderCurrentSection()}
        
        {/* Mindhaven Features Section - Always visible at bottom */}
        {currentSection === "home" && (
          <section className="py-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Why Choose Mindhaven?</h2>
                <p className="text-xl text-blue-100">Your trusted partner in mental wellness</p>
              </div>
                <div className="grid md:grid-cols-3 gap-8">
                {/* Expert Therapists */}
                <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 hover:scale-110">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mindhaven Expert Therapists</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Connect with licensed mental health professionals through our platform
                  </p>
                </div>

                {/* Personalized Content */}
                <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 hover:scale-110">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Personalized Content</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Mindhaven curates resources based on your unique needs
                  </p>
                </div>

                {/* Safe & Secure */}
                <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 hover:scale-110">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Safe & Secure</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Mindhaven prioritizes your privacy and data security
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <ChatBot />
    </div>
  );
};

export default Index;
