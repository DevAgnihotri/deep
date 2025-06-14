import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Brain, Heart, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DepressionQuizProps {
  onComplete?: (score: number, severity: string, answers: number[], recommendations: string[]) => void;
}

export const DepressionQuiz = ({ onComplete }: DepressionQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // PHQ-9 Depression Questionnaire (from depr app)
  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless", 
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed",
    "Thoughts that you would be better off dead, or of hurting yourself",
    "If you've had any days with issues above, how difficult have these problems made it for you at work, home, school, or with other people?"
  ];

  const options = [
    "Not at all",
    "Several days", 
    "More than half the days",
    "Nearly every day"
  ];

  const lastQuestionOptions = [
    "Not difficult at all",
    "Somewhat difficult", 
    "Very difficult",
    "Extremely difficult"
  ];

  const getCurrentOptions = () => {
    return currentQuestion === 9 ? lastQuestionOptions : options;
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const score = answers.slice(0, 9).reduce((sum, answer) => sum + (answer || 0), 0);
    return score;
  };

  const getSeverityLevel = (score: number) => {
    if (score <= 4) return "Normal";
    if (score <= 9) return "Mild Depression";
    if (score <= 14) return "Moderate Depression"; 
    if (score <= 19) return "Severe Depression";
    return "Extremely Severe Depression";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Normal": return "bg-green-100 text-green-800";
      case "Mild Depression": return "bg-yellow-100 text-yellow-800";
      case "Moderate Depression": return "bg-orange-100 text-orange-800";
      case "Severe Depression": return "bg-red-100 text-red-800";
      case "Extremely Severe Depression": return "bg-red-200 text-red-900";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRecommendations = (severity: string, score: number) => {
    const baseRecommendations = [
      "Consider speaking with a mental health professional",
      "Maintain a regular sleep schedule and exercise routine",
      "Practice mindfulness and stress reduction techniques",
      "Stay connected with supportive friends and family"
    ];

    const severitySpecific = {
      "Normal": [
        "Continue maintaining healthy lifestyle habits",
        "Practice preventive mental health strategies",
        "Consider this assessment periodically to monitor your wellbeing"
      ],
      "Mild Depression": [
        "Engage in regular physical activity and outdoor time", 
        "Consider counseling or therapy for additional support",
        "Monitor symptoms and seek help if they worsen"
      ],
      "Moderate Depression": [
        "Strongly consider professional mental health treatment",
        "Discuss medication options with a healthcare provider",
        "Build a strong support network and consider support groups"
      ],
      "Severe Depression": [
        "Seek immediate professional mental health treatment",
        "Consider both therapy and medication with a psychiatrist",
        "Develop a safety plan with healthcare providers"
      ],
      "Extremely Severe Depression": [
        "Seek immediate professional help - contact crisis services if needed",
        "Consider intensive treatment options including hospitalization if necessary",
        "Ensure you have 24/7 support and safety planning"
      ]
    };

    return [...baseRecommendations, ...(severitySpecific[severity] || [])];
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        const score = calculateScore();
        const severity = getSeverityLevel(score);
        const recommendations = getRecommendations(severity, score);
        setShowResults(true);
        setIsLoading(false);
        if (onComplete) {
          onComplete(score, severity, answers, recommendations);
        }
      }, 1000);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const score = calculateScore();
    const severity = getSeverityLevel(score);
    const recommendations = getRecommendations(severity, score);

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            Depression Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-blue-600">/ 27 points</div>
            </div>
            
            <Badge className={`text-lg px-4 py-2 ${getSeverityColor(severity)}`}>
              {severity}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Understanding Your Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p><strong>Score Range:</strong></p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• 0-4: Normal</li>
                    <li>• 5-9: Mild Depression</li>
                    <li>• 10-14: Moderate Depression</li>
                    <li>• 15-19: Severe Depression</li>
                    <li>• 20-27: Extremely Severe Depression</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  {recommendations.slice(0, 4).map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {severity !== "Normal" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> This is a screening tool and not a diagnosis. 
                Please consult with a qualified mental health professional for proper evaluation and treatment.
                {severity.includes("Severe") && (
                  <span className="block mt-2 font-semibold text-red-600">
                    If you're having thoughts of self-harm, please contact a crisis hotline immediately: 988 (US) or your local emergency services.
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              Take Quiz Again
            </Button>
            <Button className="flex-1">
              Find Professional Help
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <Brain className="h-12 w-12 animate-pulse text-blue-600 mx-auto" />
            <h3 className="text-lg font-semibold">Analyzing Your Responses...</h3>
            <div className="w-32 h-2 bg-blue-100 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <CardTitle className="text-lg leading-relaxed">
          {questions[currentQuestion]}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={answers[currentQuestion]?.toString() || ""}
          onValueChange={handleAnswer}
        >
          {getCurrentOptions().map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer font-medium"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={answers[currentQuestion] === undefined}
            className="flex-1 flex items-center justify-center gap-2"
          >
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          This assessment is based on the PHQ-9 depression screening tool
        </div>
      </CardContent>
    </Card>
  );
};
