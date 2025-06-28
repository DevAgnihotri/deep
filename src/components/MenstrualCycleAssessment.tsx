import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ArrowRight, ArrowLeft, Calendar, Heart, Brain } from 'lucide-react';

const menstrualCycleQuestions = [
  {
    id: 1,
    question: "During your menstrual period (days 1-7), how would you describe your mood?",
    options: [
      { value: 0, text: "Stable and normal" },
      { value: 1, text: "Slightly more emotional than usual" },
      { value: 2, text: "Noticeably moody or irritable" },
      { value: 3, text: "Very emotional, crying easily" },
      { value: 4, text: "Severely depressed or anxious" }
    ],
    phase: "menstrual"
  },
  {
    id: 2,
    question: "How do energy levels change during your period?",
    options: [
      { value: 0, text: "Energy levels remain normal" },
      { value: 1, text: "Slightly more tired than usual" },
      { value: 2, text: "Noticeably low energy, need more rest" },
      { value: 3, text: "Very fatigued, struggle with daily tasks" },
      { value: 4, text: "Completely exhausted, can barely function" }
    ],
    phase: "menstrual"
  },
  {
    id: 3,
    question: "During your follicular phase (days 8-14), how is your focus and concentration?",
    options: [
      { value: 0, text: "Sharp focus, very productive" },
      { value: 1, text: "Good concentration, normal productivity" },
      { value: 2, text: "Slightly distracted but manageable" },
      { value: 3, text: "Difficulty concentrating on tasks" },
      { value: 4, text: "Cannot focus, very scattered thoughts" }
    ],
    phase: "follicular"
  },
  {
    id: 4,
    question: "How do you feel about your body image during ovulation (around day 14)?",
    options: [
      { value: 0, text: "Confident and positive about my body" },
      { value: 1, text: "Generally comfortable with my appearance" },
      { value: 2, text: "Neutral feelings about my body" },
      { value: 3, text: "Self-conscious and critical of my body" },
      { value: 4, text: "Very negative body image, avoid mirrors" }
    ],
    phase: "ovulation"
  },
  {
    id: 5,
    question: "During your luteal phase (days 15-28), how severe are your mood swings?",
    options: [
      { value: 0, text: "No mood swings, emotionally stable" },
      { value: 1, text: "Minor mood changes, barely noticeable" },
      { value: 2, text: "Moderate mood swings, but manageable" },
      { value: 3, text: "Significant mood swings affecting relationships" },
      { value: 4, text: "Severe mood swings, feeling out of control" }
    ],
    phase: "luteal"
  },
  {
    id: 6,
    question: "How does PMS affect your irritability and anger levels?",
    options: [
      { value: 0, text: "No increase in irritability" },
      { value: 1, text: "Slightly more irritable than usual" },
      { value: 2, text: "Noticeably more irritable, short-tempered" },
      { value: 3, text: "Very irritable, snapping at others frequently" },
      { value: 4, text: "Extreme anger, feeling rage over small things" }
    ],
    phase: "pms"
  },
  {
    id: 7,
    question: "How do you sleep during the week before your period?",
    options: [
      { value: 0, text: "Sleep normally, well-rested" },
      { value: 1, text: "Slightly disrupted sleep" },
      { value: 2, text: "Difficulty falling asleep or staying asleep" },
      { value: 3, text: "Frequent insomnia, very tired during day" },
      { value: 4, text: "Severe sleep problems, barely sleeping" }
    ],
    phase: "pms"
  },
  {
    id: 8,
    question: "How does your menstrual cycle affect your anxiety levels?",
    options: [
      { value: 0, text: "No increase in anxiety" },
      { value: 1, text: "Mild anxiety during certain phases" },
      { value: 2, text: "Moderate anxiety that's manageable" },
      { value: 3, text: "High anxiety affecting daily activities" },
      { value: 4, text: "Severe anxiety, panic attacks during cycle" }
    ],
    phase: "general"
  },
  {
    id: 9,
    question: "How do food cravings and eating patterns change during your cycle?",
    options: [
      { value: 0, text: "No significant changes in appetite" },
      { value: 1, text: "Slight increase in cravings" },
      { value: 2, text: "Moderate cravings, some overeating" },
      { value: 3, text: "Strong cravings, emotional eating" },
      { value: 4, text: "Extreme cravings, completely out of control eating" }
    ],
    phase: "general"
  },
  {
    id: 10,
    question: "How much do menstrual symptoms interfere with your work or social life?",
    options: [
      { value: 0, text: "No interference, life continues normally" },
      { value: 1, text: "Minor impact, barely noticeable" },
      { value: 2, text: "Some impact, but I can manage" },
      { value: 3, text: "Significant impact, affects performance" },
      { value: 4, text: "Severe impact, unable to function normally" }
    ],
    phase: "general"
  },
  {
    id: 11,
    question: "How do you cope with emotional changes during your cycle?",
    options: [
      { value: 0, text: "I have effective coping strategies" },
      { value: 1, text: "I manage fairly well with some effort" },
      { value: 2, text: "I struggle but get through it" },
      { value: 3, text: "I have difficulty coping, feel overwhelmed" },
      { value: 4, text: "I cannot cope, feel completely helpless" }
    ],
    phase: "general"
  },
  {
    id: 12,
    question: "How supported do you feel by others regarding your menstrual health?",
    options: [
      { value: 0, text: "Very supported and understood" },
      { value: 1, text: "Generally supported by close people" },
      { value: 2, text: "Some support, but could be better" },
      { value: 3, text: "Little support, often misunderstood" },
      { value: 4, text: "No support, feel completely alone" }
    ],
    phase: "general"
  }
];

interface MenstrualCycleAssessmentProps {
  onComplete?: (score: number, answers: number[]) => void;
}

const MenstrualCycleAssessment: React.FC<MenstrualCycleAssessmentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestion < menstrualCycleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResults(newAnswers);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = (finalAnswers: { [key: number]: number }) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const totalScore = Object.values(finalAnswers).reduce((sum, score) => sum + score, 0);
      const answerArray = Object.values(finalAnswers);
      
      if (onComplete) {
        onComplete(totalScore, answerArray);
      }
      
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const getResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = menstrualCycleQuestions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    let severity = "";
    let description = "";
    let recommendations: string[] = [];

    if (percentage <= 25) {
      severity = "Minimal Impact";
      description = "Your menstrual cycle has minimal impact on your mental health. You're managing well!";
      recommendations = [
        "Continue your current self-care routine",
        "Track your cycle to maintain awareness",
        "Stay hydrated and maintain regular exercise"
      ];
    } else if (percentage <= 40) {
      severity = "Mild Impact";
      description = "Your cycle has a mild impact on your emotional well-being. Some management strategies could help.";
      recommendations = [
        "Consider keeping a mood and cycle diary",
        "Practice relaxation techniques during difficult phases",
        "Ensure adequate sleep and nutrition",
        "Plan lighter schedules during challenging times"
      ];
    } else if (percentage <= 60) {
      severity = "Moderate Impact";
      description = "Your menstrual cycle significantly affects your mental health. Professional guidance could be beneficial.";
      recommendations = [
        "Consult with a healthcare provider about PMS management",
        "Consider counseling for coping strategies",
        "Explore dietary changes and supplements",
        "Build a strong support system",
        "Practice stress management techniques"
      ];
    } else if (percentage <= 80) {
      severity = "Significant Impact";
      description = "Your cycle has a major impact on your daily functioning. Professional support is recommended.";
      recommendations = [
        "Speak with a gynecologist about treatment options",
        "Consider therapy specializing in women's health",
        "Explore medication options for severe PMS",
        "Make lifestyle modifications with professional guidance",
        "Join support groups for women with similar experiences"
      ];
    } else {
      severity = "Severe Impact (Possible PMDD)";
      description = "Your symptoms suggest possible PMDD or severe PMS. Please seek professional help immediately.";
      recommendations = [
        "Schedule an appointment with a healthcare provider this week",
        "Consider seeing a reproductive psychiatrist",
        "Explore both therapy and medication options",
        "Reach out to PMDD support organizations",
        "Don't suffer alone - professional help is available"
      ];
    }

    return { severity, description, recommendations, score: totalScore, percentage: Math.round(percentage) };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Your Cycle Patterns...</h3>
            <p className="text-gray-600">Generating personalized insights about your menstrual cycle and mental health.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const results = getResults();
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-6 h-6 mr-2" />
            <CardTitle>Your Cycle & Mental Health Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-pink-600 mb-2">{results.percentage}%</div>
            <div className="text-xl font-semibold text-gray-800 mb-2">{results.severity}</div>
            <p className="text-gray-600">{results.description}</p>
          </div>

          <div className="bg-pink-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-pink-800 mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Personalized Recommendations
            </h4>
            <ul className="space-y-2">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start text-pink-700">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {results.percentage > 60 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-800 mb-2">🚨 Important Notice</h4>
              <p className="text-red-700 text-sm">
                Your results suggest significant menstrual-related mental health challenges. Please consider reaching out to a healthcare provider who specializes in women's reproductive mental health.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              Retake Assessment
            </Button>
            <Button className="flex-1 bg-pink-600 hover:bg-pink-700">
              Save Results
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / menstrualCycleQuestions.length) * 100;
  const question = menstrualCycleQuestions[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {currentQuestion + 1}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {menstrualCycleQuestions.length}</p>
                <p className="text-xs text-pink-600 capitalize">Phase: {question.phase}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</p>
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className={`w-full p-4 text-left justify-start h-auto whitespace-normal bg-white hover:bg-pink-50 hover:border-pink-300 border-gray-200 transition-all duration-200 ${
                  answers[currentQuestion] === option.value 
                    ? 'bg-pink-50 border-pink-400 text-pink-800' 
                    : ''
                }`}
              >
                <div className="flex items-center w-full">
                  <div className="flex-1 text-sm leading-relaxed">{option.text}</div>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Button>
            ))}
          </div>
        </div>

        {currentQuestion > 0 && (
          <div className="flex justify-start">
            <Button
              onClick={handlePrevious}
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MenstrualCycleAssessment;
