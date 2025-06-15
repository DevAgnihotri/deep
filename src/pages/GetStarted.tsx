import { useState } from "react";
import { PersonalizationQuiz } from "@/components/PersonalizationQuiz";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";

// Get Started Section (after sign up)
const GetStarted = () => {
  const [showQuiz, setShowQuiz] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const handleQuizComplete = (insights: unknown) => {
    console.log("Quiz completed with insights:", insights);
    setQuizCompleted(true);
    setShowQuiz(false);
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <img src="/logo.png" alt="Mindhaven Logo" className="w-12 h-12 object-contain" />
          </div>          <h2 className="text-4xl font-bold mb-6 text-gray-900">Welcome to Your Mindhaven Journey!</h2>
          <p className="text-lg mb-8 text-gray-700">
            Great! Mindhaven has personalized your experience based on your responses. 
            You'll now see recommended health metrics tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full text-lg font-semibold"
            >
              <a href="/home#health-metrics">
                <Sparkles className="w-5 h-5 mr-2" />
                View Your Mindhaven Health Metrics
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setQuizCompleted(false);
                setShowQuiz(true);
              }}
              className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 rounded-full text-lg font-semibold"
            >
              Retake Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 py-8">
        <PersonalizationQuiz onComplete={handleQuizComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
      <h2 className="text-4xl font-bold mb-6">Get Started</h2>
      <p className="text-lg mb-8 text-gray-700">Welcome! Let's personalize your experience.</p>
      <Button
        onClick={() => setShowQuiz(true)}
        size="lg"
        className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 rounded-full text-lg font-semibold"
      >
        Start Personalization Quiz
      </Button>
    </div>
  );
};

export default GetStarted;
