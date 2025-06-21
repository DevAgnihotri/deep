
import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
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
      default:
        return <Hero onStartJourney={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="pt-20">
        {renderCurrentSection()}
      </main>
      <ChatBot />
    </div>
  );
};

export default Index;
