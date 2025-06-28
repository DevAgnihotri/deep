import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, CheckCircle2 } from 'lucide-react';
import personalityTestData from '@/data/personalityTest';
import aiAdviceData from '@/data/aiAdvice';
import { predictPersonalityRisk, loadPersonalityModel, PredictionResult } from '@/lib/tensorflowService';

interface PersonalityQuizProps {
  onComplete?: (risk: string, answers: number[], recommendations: string[]) => void;
}

export const PersonalityQuiz = ({ onComplete }: PersonalityQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Personality/Lifestyle Assessment Questions (from depr app)
  const questionsData = [    {
      question: "What is your age range (in years)?",
      options: ["16-20", "21-25", "26-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60", "61+"]
    },
    {
      question: "What is your educational qualification?",
      options: ["Graduate", "HSC", "Post Graduate", "SSC"]
    },
    {
      question: "Profession?",
      options: ["Businessman", "Other", "Service holder (Government)", "Service holder (Private)", "Student", "Unemployed"]
    },
    {
      question: "Marital status?",
      options: ["Divorced", "Married", "Unmarried"]
    },
    {
      question: "Type of the residing place?",
      options: ["City", "Town", "Village"]
    },
    {
      question: "Are you living with your family?",
      options: ["With Family", "Without Family"]
    },
    {
      question: "Are you satisfied with your living environment or not?",
      options: ["No", "Yes"]
    },
    {
      question: "Are you satisfied with your current position/ academic achievements or not?",
      options: ["No", "Yes"]
    },
    {
      question: "Are you facing any financial stress?",
      options: ["No", "Yes"]
    },
    {
      question: "Are you in debt?",
      options: ["No", "Yes"]
    },
    {
      question: "What is your frequency of doing physical exercises?",
      options: ["Never", "Regularly", "Sometimes"]
    },
    {
      question: "Do you smoke?",
      options: ["No", "Yes"]
    },
    {
      question: "Do you drink alcohol?",
      options: ["No", "Yes"]
    },
    {
      question: "Are you suffering from any serious illness or not?",
      options: ["No", "Yes"]
    },
    {
      question: "Are you on any prescribed medication?",
      options: ["No", "Yes"]
    },
    {
      question: "Are you suffering from eating disorders like overeating/ loss of appetite?",
      options: ["No", "Yes"]
    },
    {
      question: "What is your average hours of sleep at night?",
      options: ["5 hours", "6 hours", "7 hours", "8 hours", "Below 5 hours", "More than 8"]
    },
    {
      question: "Are you suffering from insomnia?",
      options: ["No", "Yes"]
    },
    {
      question: "What is your average hours of time spent on social media (in a day)?",
      options: ["2-4 hours a day", "5-7 hours a day", "8-10 hours a day"]
    },
    {
      question: "What is your current work or study pressure?",
      options: ["Mild", "Moderate", "No Pressure", "Severe"]
    },
    {
      question: "Have you recently feel anxiety for something?",
      options: ["No", "Yes"]
    },
    {
      question: "Have you recently feel that you are deprived of something that you deserve?",
      options: ["No", "Yes"]
    },
    {
      question: "Have you recently feel abused (physically, sexually, emotionally) or not?",
      options: ["No", "Yes"]
    },
    {
      question: "Whether or not you felt cheated by someone recently?",
      options: ["No", "Yes"]
    },
    {
      question: "Have you faced any life-threatening event recently?",
      options: ["No", "Yes"]
    },
    {
      question: "Do you have any suicidal thought recently?",
      options: ["No", "Yes"]
    },
    {
      question: "Have you recently suffered from inferiority complex?",
      options: ["No", "Yes"]
    },
    {
      question: "Have you recently engaged in any kind of conflicts with friends or family?",
      options: ["No", "Yes"]
    },
    {
      question: "Have you recently lost someone close?",
      options: ["No", "Yes"]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const calculateRiskFactors = () => {
    // Risk scoring based on answers
    let riskScore = 0;
    const riskFactors = [];

    // Check various risk indicators
    if (answers[7] === 0) { // Not satisfied with living environment
      riskScore += 2;
      riskFactors.push("Living environment dissatisfaction");
    }
    if (answers[8] === 0) { // Not satisfied with achievements
      riskScore += 2;
      riskFactors.push("Achievement dissatisfaction");
    }
    if (answers[9] === 1) { // Financial stress
      riskScore += 3;
      riskFactors.push("Financial stress");
    }
    if (answers[10] === 1) { // In debt
      riskScore += 2;
      riskFactors.push("Debt concerns");
    }
    if (answers[11] === 0) { // Never exercise
      riskScore += 2;
      riskFactors.push("Lack of physical activity");
    }
    if (answers[12] === 1) { // Smokes
      riskScore += 1;
      riskFactors.push("Smoking");
    }
    if (answers[13] === 1) { // Drinks alcohol
      riskScore += 1;
      riskFactors.push("Alcohol consumption");
    }
    if (answers[14] === 1) { // Serious illness
      riskScore += 3;
      riskFactors.push("Health concerns");
    }
    if (answers[16] === 1) { // Eating disorders
      riskScore += 3;
      riskFactors.push("Eating disorders");
    }
    if (answers[17] === 4) { // Below 5 hours sleep
      riskScore += 3;
      riskFactors.push("Severe sleep deprivation");
    }
    if (answers[18] === 1) { // Insomnia
      riskScore += 2;
      riskFactors.push("Insomnia");
    }
    if (answers[20] === 3) { // Severe work pressure
      riskScore += 3;
      riskFactors.push("Severe work/study pressure");
    }
    if (answers[21] === 1) { // Recent anxiety
      riskScore += 3;
      riskFactors.push("Recent anxiety");
    }
    if (answers[22] === 1) { // Feel deprived
      riskScore += 2;
      riskFactors.push("Feelings of deprivation");
    }
    if (answers[23] === 1) { // Feel abused
      riskScore += 4;
      riskFactors.push("Recent abuse");
    }
    if (answers[24] === 1) { // Feel cheated
      riskScore += 2;
      riskFactors.push("Feeling betrayed");
    }
    if (answers[25] === 1) { // Life-threatening event
      riskScore += 4;
      riskFactors.push("Recent trauma");
    }
    if (answers[26] === 1) { // Suicidal thoughts
      riskScore += 5;
      riskFactors.push("Suicidal ideation");
    }
    if (answers[27] === 1) { // Inferiority complex
      riskScore += 2;
      riskFactors.push("Low self-esteem");
    }
    if (answers[28] === 1) { // Conflicts
      riskScore += 2;
      riskFactors.push("Relationship conflicts");
    }
    if (answers[29] === 1) { // Lost someone close
      riskScore += 3;
      riskFactors.push("Recent loss/grief");
    }

    return { riskScore, riskFactors };
  };

  const getRiskLevel = (score: number) => {
    if (score <= 5) return "Low Risk";
    if (score <= 15) return "Moderate Risk";
    if (score <= 25) return "High Risk";
    return "Very High Risk";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low Risk": return "bg-green-100 text-green-800";
      case "Moderate Risk": return "bg-yellow-100 text-yellow-800";
      case "High Risk": return "bg-orange-100 text-orange-800";
      case "Very High Risk": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRecommendations = (risk: string, riskFactors: string[]) => {
    const baseRecommendations = [
      "Continue regular mental health check-ins",
      "Maintain healthy lifestyle habits",
      "Build and maintain strong social connections"
    ];

    const riskSpecific = {
      "Low Risk": [
        "Keep up the good work with your current lifestyle",
        "Consider preventive mental health strategies",
        "Regular exercise and good sleep hygiene"
      ],
      "Moderate Risk": [
        "Consider speaking with a counselor or therapist",
        "Focus on stress management techniques",
        "Address lifestyle factors that may be contributing to risk"
      ],
      "High Risk": [
        "Strongly recommend professional mental health support",
        "Consider therapy and possibly medication evaluation",
        "Develop coping strategies for identified risk factors"
      ],
      "Very High Risk": [
        "Seek immediate professional mental health evaluation",
        "Consider intensive support and treatment options",
        "Ensure you have crisis support resources available"
      ]
    };

    const factorSpecific = [];
    if (riskFactors.includes("Suicidal ideation")) {
      factorSpecific.push("URGENT: Contact crisis hotline immediately (988 in US)");
    }
    if (riskFactors.includes("Recent abuse") || riskFactors.includes("Recent trauma")) {
      factorSpecific.push("Consider trauma-informed therapy (EMDR, trauma-focused CBT)");
    }
    if (riskFactors.includes("Financial stress")) {
      factorSpecific.push("Seek financial counseling and explore assistance programs");
    }
    if (riskFactors.includes("Sleep deprivation") || riskFactors.includes("Insomnia")) {
      factorSpecific.push("Prioritize sleep hygiene and consider sleep study");
    }

    return [...factorSpecific, ...baseRecommendations, ...(riskSpecific[risk] || [])];
  };

  const nextQuestion = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        const { riskScore, riskFactors } = calculateRiskFactors();
        const risk = getRiskLevel(riskScore);
        const recommendations = getRecommendations(risk, riskFactors);
        setShowResults(true);
        setIsLoading(false);
        if (onComplete) {
          onComplete(risk, answers, recommendations);
        }
      }, 1500);
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

  const progress = ((currentQuestion + 1) / questionsData.length) * 100;

  if (showResults) {
    const { riskScore, riskFactors } = calculateRiskFactors();
    const risk = getRiskLevel(riskScore);
    const recommendations = getRecommendations(risk, riskFactors);

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <User className="h-6 w-6 text-purple-600" />
            Lifestyle & Mental Health Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-3xl font-bold text-purple-600">{riskScore}</div>
              <div className="text-sm text-purple-600">risk points</div>
            </div>
            
            <Badge className={`text-lg px-4 py-2 ${getRiskColor(risk)}`}>
              {risk}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Risk Assessment Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p><strong>Risk Levels:</strong></p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• 0-5: Low Risk</li>
                    <li>• 6-15: Moderate Risk</li>
                    <li>• 16-25: High Risk</li>
                    <li>• 26+: Very High Risk</li>
                  </ul>
                  {riskFactors.length > 0 && (
                    <div className="mt-4">
                      <p><strong>Identified Risk Factors:</strong></p>
                      <ul className="text-xs space-y-1 ml-4 mt-2">
                        {riskFactors.slice(0, 5).map((factor, index) => (
                          <li key={index}>• {factor}</li>
                        ))}
                        {riskFactors.length > 5 && (
                          <li className="text-gray-500">... and {riskFactors.length - 5} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  {recommendations.slice(0, 6).map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0 ${
                        rec.includes("URGENT") ? "bg-red-500" : "bg-purple-500"
                      }`} />
                      <span className={rec.includes("URGENT") ? "text-red-600 font-semibold" : ""}>
                        {rec}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {(risk === "High Risk" || risk === "Very High Risk" || riskFactors.includes("Suicidal ideation")) && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Your responses indicate elevated risk factors that warrant professional attention.
                {riskFactors.includes("Suicidal ideation") && (
                  <span className="block mt-2 font-semibold text-red-600">
                    CRISIS ALERT: If you're having thoughts of self-harm, please contact a crisis hotline immediately: 
                    988 (US) or your local emergency services.
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              Retake Assessment
            </Button>
            <Button className="flex-1">
              Find Resources
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
            <User className="h-12 w-12 animate-pulse text-purple-600 mx-auto" />
            <h3 className="text-lg font-semibold">Analyzing Your Lifestyle Profile...</h3>
            <div className="w-32 h-2 bg-purple-100 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestionData = questionsData[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Question {currentQuestion + 1} of {questionsData.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <CardTitle className="text-lg leading-relaxed">
          {currentQuestionData.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={answers[currentQuestion]?.toString() || ""}
          onValueChange={handleAnswer}
        >
          {currentQuestionData.options.map((option, index) => (
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
            {currentQuestion === questionsData.length - 1 ? "Complete Assessment" : "Next Question"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Comprehensive lifestyle and mental health risk assessment
        </div>
      </CardContent>
    </Card>
  );
};
