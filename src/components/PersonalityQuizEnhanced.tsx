import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import personalityTestData from '@/data/personalityTest';
import aiAdviceData from '@/data/aiAdvice';
import { predictPersonalityRisk, loadPersonalityModel, PredictionResult } from '@/lib/tensorflowService';
import { resultsTracker } from '@/lib/resultsTracker';

interface PersonalityQuizProps {
  onComplete?: (result: PersonalityQuizResult) => void;
}

export interface PersonalityQuizResult {
  riskScore: number;
  riskLevel: string;
  aiPrediction?: PredictionResult;
  advice: string[];
  responses: number[];
  riskFactors: string[];
}

const PersonalityQuizEnhanced: React.FC<PersonalityQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<PersonalityQuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const initializeModel = async () => {
      try {
        await loadPersonalityModel();
        setModelLoading(false);
      } catch (error) {
        console.error('Failed to load personality model:', error);
        setModelLoading(false);
      }
    };

    initializeModel();
  }, []);  const handleAnswer = (value: string) => {
    const answerIndex = parseInt(value);
    const newResponses = [...responses];
    newResponses[currentQuestion] = answerIndex;
    setResponses(newResponses);
    
    // Immediately advance to next question (like ShareYourDay/PersonalizationQuiz)
    if (currentQuestion < personalityTestData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const handleNext = () => {
    if (responses[currentQuestion] === undefined) return;
    
    if (currentQuestion < personalityTestData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRiskScore = (responses: number[]): { score: number; level: string } => {
    let riskScore = 0;
    
    // Age factor (younger age = higher risk)
    if (responses[0] !== undefined && responses[0] <= 2) riskScore += 1;
    
    // Education (lower education = higher risk)
    if (responses[2] !== undefined && responses[2] <= 1) riskScore += 1;
    
    // Employment (unemployed = higher risk)
    if (responses[3] !== undefined && responses[3] === 5) riskScore += 2;
    
    // Living situation (not with family = higher risk)
    if (responses[6] !== undefined && responses[6] === 1) riskScore += 1;
    
    // Satisfaction factors
    if (responses[7] !== undefined && responses[7] === 0) riskScore += 2; // Environment
    if (responses[8] !== undefined && responses[8] === 0) riskScore += 2; // Achievement
    
    // Financial stress
    if (responses[9] !== undefined && responses[9] === 1) riskScore += 2;
    if (responses[10] !== undefined && responses[10] === 1) riskScore += 1; // Debt
    
    // Physical health factors
    if (responses[11] !== undefined && responses[11] === 0) riskScore += 1; // No exercise
    if (responses[12] !== undefined && responses[12] === 1) riskScore += 1; // Smoking
    if (responses[13] !== undefined && responses[13] === 1) riskScore += 1; // Alcohol
    if (responses[14] !== undefined && responses[14] === 1) riskScore += 2; // Illness
    if (responses[16] !== undefined && responses[16] === 1) riskScore += 1; // Eating disorder
    
    // Sleep issues
    if (responses[17] !== undefined && (responses[17] === 0 || responses[17] === 4)) riskScore += 2;
    if (responses[18] !== undefined && responses[18] === 1) riskScore += 2; // Insomnia
    
    // Social media (excessive use)
    if (responses[19] !== undefined && responses[19] === 2) riskScore += 1;
    
    // Work/study pressure
    if (responses[20] !== undefined && responses[20] === 3) riskScore += 2; // Severe
    
    // Psychological factors (major risk factors)
    if (responses[21] !== undefined && responses[21] === 1) riskScore += 2; // Anxiety
    if (responses[22] !== undefined && responses[22] === 1) riskScore += 2; // Deprivation
    if (responses[23] !== undefined && responses[23] === 1) riskScore += 3; // Abuse
    if (responses[24] !== undefined && responses[24] === 1) riskScore += 2; // Cheated
    if (responses[25] !== undefined && responses[25] === 1) riskScore += 3; // Life-threatening event
    if (responses[26] !== undefined && responses[26] === 1) riskScore += 4; // Suicidal thoughts
    if (responses[27] !== undefined && responses[27] === 1) riskScore += 2; // Inferiority
    if (responses[28] !== undefined && responses[28] === 1) riskScore += 2; // Conflicts
    if (responses[29] !== undefined && responses[29] === 1) riskScore += 3; // Loss

    let level: string;
    if (riskScore <= 5) {
      level = "Low Risk";
    } else if (riskScore <= 15) {
      level = "Moderate Risk";
    } else if (riskScore <= 25) {
      level = "High Risk";
    } else {
      level = "Very High Risk";
    }

    return { score: riskScore, level };
  };

  const identifyRiskFactors = (responses: number[]): string[] => {
    const factors = [];
    
    if (responses[3] === 5) factors.push("Unemployment");
    if (responses[7] === 0) factors.push("Dissatisfaction with living environment");
    if (responses[8] === 0) factors.push("Dissatisfaction with achievements");
    if (responses[9] === 1) factors.push("Financial stress");
    if (responses[11] === 0) factors.push("Lack of physical exercise");
    if (responses[14] === 1) factors.push("Serious illness");
    if (responses[18] === 1) factors.push("Insomnia");
    if (responses[21] === 1) factors.push("Recent anxiety");
    if (responses[23] === 1) factors.push("Recent abuse");
    if (responses[26] === 1) factors.push("Suicidal thoughts");
    if (responses[29] === 1) factors.push("Recent loss of someone close");
    
    return factors;
  };
  const completeQuiz = async () => {
    setIsLoading(true);
    
    try {
      // Calculate risk score
      const riskResult = calculateRiskScore(responses);
      const riskFactors = identifyRiskFactors(responses);
      
      // Get AI prediction
      let aiPrediction: PredictionResult | undefined;
      try {
        aiPrediction = await predictPersonalityRisk(responses);
      } catch (error) {
        console.error('AI prediction failed:', error);
      }

      // Generate advice
      const advice = generateAdvice(riskResult.score, riskFactors);

      const quizResult: PersonalityQuizResult = {
        riskScore: riskResult.score,
        riskLevel: riskResult.level,
        aiPrediction,
        advice,
        responses,
        riskFactors
      };

      // Track the result
      resultsTracker.trackPersonalityResult({
        riskScore: quizResult.riskScore,
        riskLevel: quizResult.riskLevel,
        riskFactors: quizResult.riskFactors,
        aiPrediction: quizResult.aiPrediction
      });

      setResult(quizResult);
      setIsCompleted(true);
      onComplete?.(quizResult);
    } catch (error) {
      console.error('Error completing quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAdvice = (score: number, riskFactors: string[]): string[] => {
    const advice = [];
    
    if (score >= 25) {
      advice.push(
        "Your assessment indicates very high risk factors for depression. Please consider seeking immediate professional help.",
        "A mental health professional can provide comprehensive evaluation and appropriate treatment options."
      );
    } else if (score >= 15) {
      advice.push(
        "Your assessment shows several risk factors that may contribute to depression. Consider speaking with a healthcare provider.",
        "Preventive interventions and lifestyle changes may help reduce your risk."
      );
    } else if (score >= 5) {
      advice.push(
        "You have some risk factors that could impact your mental health. Monitoring and self-care are recommended.",
        "Focus on addressing modifiable risk factors like exercise, sleep, and stress management."
      );
    } else {
      advice.push(
        "Your assessment shows relatively low risk factors. Continue maintaining your current healthy lifestyle.",
        "Regular self-check-ins and maintaining protective factors like social support are beneficial."
      );
    }

    // Specific advice based on risk factors
    if (riskFactors.includes("Lack of physical exercise")) {
      advice.push("Regular physical activity can significantly improve mood and reduce depression risk.");
    }
    if (riskFactors.includes("Insomnia")) {
      advice.push("Addressing sleep issues is crucial for mental health. Consider sleep hygiene practices or professional help.");
    }
    if (riskFactors.includes("Suicidal thoughts")) {
      advice.push("CRISIS ALERT: Please contact emergency services (911) or the National Suicide Prevention Lifeline (988) immediately.");
    }

    // Add some general AI-generated advice
    const randomAdvice = aiAdviceData
      .sort(() => 0.5 - Math.random())
      .slice(0, 1)
      .map(text => text.split('.').slice(0, 2).join('.') + '.');
    
    advice.push(...randomAdvice);
    
    return advice;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setIsCompleted(false);
    setResult(null);
    setShowIntro(true);
  };

  const progress = ((currentQuestion + 1) / personalityTestData.length) * 100;

  if (modelLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading assessment tools...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showIntro) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-purple-600" />
            <span>Lifestyle & Risk Assessment</span>
          </CardTitle>
          <CardDescription>
            This comprehensive assessment evaluates lifestyle factors and personal circumstances 
            that may influence mental health and depression risk.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Assessment Overview:</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• {personalityTestData.length} questions about lifestyle and circumstances</li>
              <li>• AI analysis of risk factors</li>
              <li>• Personalized recommendations for risk reduction</li>
              <li>• Takes approximately 5-8 minutes to complete</li>
            </ul>
          </div>
          
          <Alert>
            <User className="h-4 w-4" />
            <AlertDescription>
              This assessment evaluates risk factors, not current symptoms. It's designed to help
              identify areas for preventive mental health care.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button onClick={() => setShowIntro(false)} className="flex-1">
              Begin Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isCompleted && result) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Lifestyle & Risk Assessment Results</CardTitle>
          <CardDescription>
            Your comprehensive risk assessment has been completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Score */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">Risk Assessment</h4>
                <p className="text-sm text-gray-600">{result.riskLevel}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{result.riskScore}</div>
                <div className="text-sm text-gray-500">risk factors</div>
              </div>
            </div>
            <Progress 
              value={Math.min((result.riskScore / 30) * 100, 100)} 
              className="h-2" 
            />
          </div>

          {/* AI Prediction */}
          {result.aiPrediction && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">AI Risk Analysis</h4>
              <p className="text-blue-800">{result.aiPrediction.class}</p>
              <div className="text-sm text-blue-600 mt-1">
                Confidence: {(result.aiPrediction.confidence * 100).toFixed(1)}%
              </div>
            </div>
          )}

          {/* Risk Factors */}
          {result.riskFactors.length > 0 && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Identified Risk Factors</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                {result.riskFactors.map((factor, index) => (
                  <li key={index}>• {factor}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Advice and Recommendations */}
          <div className="space-y-3">
            <h4 className="font-semibold">Recommendations</h4>
            {result.advice.map((advice, index) => (
              <Alert 
                key={index} 
                className={
                  advice.includes("CRISIS ALERT") ? "border-red-200 bg-red-50" :
                  index < 2 ? "border-orange-200 bg-orange-50" : ""
                }
              >
                <AlertDescription 
                  className={advice.includes("CRISIS ALERT") ? "text-red-800 font-semibold" : ""}
                >
                  {advice}
                </AlertDescription>
              </Alert>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              Retake Assessment
            </Button>
            <Button onClick={() => window.print()} variant="outline">
              Save Results
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">{currentQuestion + 1}</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            Lifestyle & Risk Assessment
          </CardTitle>
          <Progress value={progress} className="w-full h-2 mb-4" />
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {personalityTestData.length}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
            {personalityTestData[currentQuestion].question}
          </h3>          <div className="space-y-3">
            {personalityTestData[currentQuestion].answer.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswer(index.toString())}
                className={`w-full p-4 h-auto text-left border-2 transition-all ${
                  responses[currentQuestion] === index
                    ? 'border-purple-400 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                }`}
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
                onClick={handlePrevious}
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

export default PersonalityQuizEnhanced;
