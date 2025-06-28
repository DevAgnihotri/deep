
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Brain, Heart } from "lucide-react";

interface EPDSQuizProps {
  onComplete?: (score: number, answers: number[]) => void;
}

export const EPDSQuiz = ({ onComplete }: EPDSQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    "Over the past 7 days, have you laughed as much and enjoyed things as you used to?",
    "Do you often find things overwhelming or overwhelming?",
    "Do you feel guilty when things don't go as planned?",
    "Do you have trouble sleeping even when your baby is sleeping?",
    "Do you feel sad or hopeless?",
    "Do you feel scared or frightened for no reason?",
    "Do you feel like you're not good enough as a mother?",
    "Do you have thoughts of harming yourself?",
    "Do you have difficulty bonding with, caring for, or loving your baby?",
    "Have you been anxious or worried for no good reason?"
  ];

  const options = [
    "Never",
    "Sometimes", 
    "Often",
    "Almost always"
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore();
      setShowResults(true);
      if (onComplete) {
        onComplete(score, answers);
      }
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };

  const getResultMessage = (score: number) => {
    if (score <= 9) {
      return {
        level: "Low Risk",
        message: "Your responses suggest you may be coping well. Continue to monitor your wellbeing.",
        color: "text-green-600"
      };
    } else if (score <= 12) {
      return {
        level: "Moderate Risk",
        message: "Consider speaking with a healthcare professional about your feelings.",
        color: "text-yellow-600"
      };
    } else {
      return {
        level: "Higher Risk",
        message: "We recommend you speak with a healthcare professional as soon as possible.",
        color: "text-red-600"
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };
  if (showResults) {
    const score = calculateScore();
    const result = getResultMessage(score);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Your EPDS Assessment Complete</CardTitle>
            <Progress value={100} className="w-full h-2" />
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
              <div className="text-4xl font-bold text-gray-900 mb-2">{score}/30</div>
              <div className={`text-xl font-semibold ${result.color}`}>{result.level}</div>
            </div>
            
            <p className="text-gray-600 text-lg">{result.message}</p>
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Important</span>
              </div>
              <p className="text-sm text-green-800">
                This assessment is not a diagnosis. Please consult with a healthcare professional for proper evaluation and support.
              </p>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <Button onClick={resetQuiz} variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                Take Again
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                <Heart className="w-4 h-4 mr-2" />
                Find Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            Edinburgh Postnatal Depression Scale (EPDS)
          </CardTitle>
          <Progress value={progress} className="w-full h-2 mb-4" />
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{questions[currentQuestion]}</h3>
            
            <RadioGroup
              value={answers[currentQuestion]?.toString() || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {options.map((option, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer">
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      className="border-green-300 text-green-600"
                    />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer text-gray-700 font-medium flex-1 text-left">
                      {option}
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex justify-between pt-6">
            <Button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === undefined}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};