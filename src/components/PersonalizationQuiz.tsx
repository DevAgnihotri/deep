
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

interface PersonalizationQuizProps {
  onComplete: (insights: PersonalizationInsights) => void;
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

export const PersonalizationQuiz = ({ onComplete }: PersonalizationQuizProps) => {
  const { user } = useAuth();
  const { setQuizResponses, setInsights, markQuizCompleted } = usePersonalization();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "mood",
      title: "How are you feeling right now?",
      options: [
        "Anxious or worried",
        "Sad or down",
        "Stressed or overwhelmed", 
        "Neutral or okay",
        "Happy and energetic"
      ]
    },
    {
      id: "sleep",
      title: "How many hours did you sleep last night?",
      options: [
        "Less than 4 hours",
        "4-5 hours",
        "6-7 hours",
        "8-9 hours",
        "More than 9 hours"
      ]
    },
    {
      id: "wakeTime",
      title: "What time did you wake up today?",
      options: [
        "Before 6:00 AM",
        "6:00 AM - 7:00 AM",
        "7:00 AM - 8:00 AM",
        "8:00 AM - 9:00 AM",
        "After 9:00 AM"
      ]
    },
    {
      id: "breakfast",
      title: "Did you have breakfast today? How did you feel about it?",
      options: [
        "Yes, I enjoyed it and felt satisfied",
        "Yes, but I rushed through it",
        "Yes, but I didn't enjoy it much",
        "No, I skipped breakfast",
        "I only had coffee/drinks"
      ]
    },
    {
      id: "lunch",
      title: "How about lunch? How did it go?",
      options: [
        "Had a great, nutritious meal",
        "Had something quick but decent",
        "Grabbed fast food or snacks",
        "Skipped lunch entirely",
        "Haven't had lunch yet"
      ]
    },
    {
      id: "pain",
      title: "Are you experiencing any physical discomfort or pain today?",
      options: [
        "No, feeling great physically",
        "Minor aches or tension",
        "Moderate discomfort (headache, back pain, etc.)",
        "Significant pain affecting my day",
        "Chronic pain I'm managing"
      ]
    },
    {
      id: "exercise",
      title: "Did you do any physical activity or exercise today?",
      options: [
        "Yes, had a great workout session",
        "Did some light exercise or walking",
        "Planned to but haven't yet",
        "No, didn't feel like it",
        "No, but I usually don't exercise"
      ]
    },
    {
      id: "energy",
      title: "How would you describe your energy levels today?",
      options: [
        "High energy, feeling motivated",
        "Good energy, productive",
        "Average energy, getting by",
        "Low energy, feeling tired",
        "Very low, struggling to stay active"
      ]
    },
    {
      id: "stress",
      title: "What's been your main source of stress or concern today?",
      options: [
        "Work or school responsibilities",
        "Personal relationships",
        "Health or physical concerns",
        "Financial worries",
        "No major stress today"
      ]
    },
    {
      id: "goals",
      title: "What would you like to focus on improving for your overall wellness?",
      options: [
        "Better sleep and rest",
        "Nutrition and eating habits",
        "Physical fitness and movement",
        "Stress management and relaxation",
        "Mental clarity and focus"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate insights based on answers
      const insights = generateInsights(newAnswers);
      
      // Save to context
      setQuizResponses(newAnswers);
      setInsights(insights);
      markQuizCompleted();
      
      // Save to Firestore if user is authenticated
      if (user) {
        saveQuizResponsesToFirebase(newAnswers, insights);
      }
      
      onComplete(insights);
    }
  };

  const saveQuizResponsesToFirebase = async (responses: Record<string, string>, insights: PersonalizationInsights) => {
    if (!user) return;
    
    try {
      const userDocRef = doc(db, "userProfiles", user.uid);
      await setDoc(userDocRef, {
        quizResponses: responses,
        personalizationInsights: insights,
        quizCompletedAt: new Date().toISOString(),
      }, { merge: true });
      
      console.log("Quiz responses saved to Firebase");
    } catch (error) {
      console.error("Error saving quiz responses:", error);
    }
  };

  const generateInsights = (allAnswers: Record<string, string>): PersonalizationInsights => {
    // Determine focus metrics based on user responses
    const focusMetrics: string[] = [];
    const priorityMetrics: string[] = [];
    
    // Map daily life responses to relevant health metrics
    
    // Mood-based recommendations
    if (allAnswers.mood?.includes("Anxious") || allAnswers.mood?.includes("worried")) {
      focusMetrics.push("stress", "heartRate", "hrv", "breathing");
      priorityMetrics.push("stress-management");
    }
    
    if (allAnswers.mood?.includes("Sad") || allAnswers.mood?.includes("down")) {
      focusMetrics.push("mood", "activity", "social", "sleep");
      priorityMetrics.push("mood-tracking");
    }
    
    if (allAnswers.mood?.includes("Stressed") || allAnswers.mood?.includes("overwhelmed")) {
      focusMetrics.push("stress", "meditation", "breathing", "heartRate");
      priorityMetrics.push("stress-management");
    }
    
    // Sleep-based recommendations
    if (allAnswers.sleep?.includes("Less than 4") || allAnswers.sleep?.includes("4-5 hours")) {
      focusMetrics.push("sleep", "energy", "mood");
      priorityMetrics.push("sleep-improvement");
    }
    
    // Energy-based recommendations
    if (allAnswers.energy?.includes("Low energy") || allAnswers.energy?.includes("Very low")) {
      focusMetrics.push("energy", "sleep", "activity", "nutrition");
      priorityMetrics.push("energy-boost");
    }
    
    // Exercise/Activity recommendations
    if (allAnswers.exercise?.includes("No, didn't feel") || allAnswers.exercise?.includes("No, but I usually don't")) {
      focusMetrics.push("activity", "energy", "mood");
      priorityMetrics.push("physical-activity");
    }
    
    // Pain/Physical wellness
    if (allAnswers.pain?.includes("Moderate") || allAnswers.pain?.includes("Significant") || allAnswers.pain?.includes("Chronic")) {
      focusMetrics.push("pain", "sleep", "stress", "mindfulness");
      priorityMetrics.push("pain-management");
    }
    
    // Stress source mapping
    if (allAnswers.stress?.includes("Work") || allAnswers.stress?.includes("school")) {
      focusMetrics.push("stress", "focus", "breathing");
      priorityMetrics.push("work-stress");
    }
    
    if (allAnswers.stress?.includes("relationships")) {
      focusMetrics.push("social", "communication", "confidence");
      priorityMetrics.push("social-wellness");
    }
    
    if (allAnswers.stress?.includes("Health")) {
      focusMetrics.push("health", "anxiety", "mindfulness");
      priorityMetrics.push("health-anxiety");
    }
    
    // Goals-based recommendations
    if (allAnswers.goals?.includes("Better sleep")) {
      focusMetrics.push("sleep", "bedtime", "relaxation");
      priorityMetrics.push("sleep-optimization");
    }
    
    if (allAnswers.goals?.includes("Nutrition")) {
      focusMetrics.push("nutrition", "energy", "mood");
      priorityMetrics.push("nutrition-wellness");
    }
    
    if (allAnswers.goals?.includes("Physical fitness")) {
      focusMetrics.push("activity", "energy", "strength");
      priorityMetrics.push("fitness-goals");
    }
    
    if (allAnswers.goals?.includes("Stress management")) {
      focusMetrics.push("stress", "meditation", "breathing", "mindfulness");
      priorityMetrics.push("stress-reduction");
    }
    
    if (allAnswers.goals?.includes("Mental clarity")) {
      focusMetrics.push("focus", "meditation", "mindfulness", "sleep");
      priorityMetrics.push("cognitive-wellness");
    }
    
    // Default metrics if no specific preferences detected
    if (focusMetrics.length === 0) {
      focusMetrics.push("mood", "sleep", "stress", "activity");
      priorityMetrics.push("overall-wellness");
    }

    return {
      primaryConcern: allAnswers.goals || "General wellness",
      mood: allAnswers.mood || "Neutral",
      experience: allAnswers.experience || "New to therapy",
      contentPreference: allAnswers.preferences || "Mixed content",
      preferredTime: allAnswers.schedule || "Flexible",
      recommendations: {
        therapyType: allAnswers.goals?.includes("anxiety") ? "CBT" : "General",
        contentTypes: [allAnswers.preferences?.toLowerCase() || "mixed"],
        urgency: allAnswers.mood?.includes("Anxious") || allAnswers.mood?.includes("Sad") ? "high" : "normal",
        metrics: {
          focus: focusMetrics,
          priority: priorityMetrics
        }
      }
    };
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">{currentQuestion + 1}</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            Let's personalize your Mindhaven experience
          </CardTitle>
          <Progress value={progress} className="w-full h-2 mb-4" />
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
            {questions[currentQuestion].title}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswer(option)}
                className="w-full p-4 h-auto text-left border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-gray-700">{option}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            ))}
          </div>
          
          {currentQuestion > 0 && (
            <div className="flex justify-center pt-4">
              <Button
                variant="ghost"
                onClick={goBack}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Question
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
