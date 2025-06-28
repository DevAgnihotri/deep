import { ContentRecommendations } from "@/components/ContentRecommendations";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";

const ContentRecommendationsPage = () => {
  const [currentSection, setCurrentSection] = useState("recommendations");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ContentRecommendations insights={null} />
        </div>
      </main>
    </div>
  );
};

export default ContentRecommendationsPage;
