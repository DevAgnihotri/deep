import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import depressionTestData from '@/data/depressionTest';
import aiAdviceData from '@/data/aiAdvice';
import { predictDepression, calculatePHQ9Score, loadDepressionModel, PredictionResult } from '@/lib/tensorflowService';
import { resultsTracker } from '@/lib/resultsTracker';

interface DepressionQuizProps {
  onComplete?: (result: DepressionQuizResult) => void;
}

export interface DepressionQuizResult {
  phq9Score: number;
  severity: string;
  aiPrediction?: PredictionResult;
  advice: string[];
  responses: number[];
}

const DepressionQuiz: React.FC<DepressionQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<DepressionQuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const initializeModel = async () => {
      try {
        await loadDepressionModel();
        setModelLoading(false);
      } catch (error) {
        console.error('Failed to load depression model:', error);
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
    if (currentQuestion < depressionTestData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const handleNext = () => {
    if (responses[currentQuestion] === undefined) return;
    
    if (currentQuestion < depressionTestData.length - 1) {
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
  const completeQuiz = async () => {
    setIsLoading(true);
    
    try {
      // Calculate traditional PHQ-9 score
      const phq9Result = calculatePHQ9Score(responses);
      
      // Get AI prediction
      let aiPrediction: PredictionResult | undefined;
      try {
        aiPrediction = await predictDepression(responses);
      } catch (error) {
        console.error('AI prediction failed:', error);
      }

      // Generate advice
      const advice = generateAdvice(phq9Result.score);

      const quizResult: DepressionQuizResult = {
        phq9Score: phq9Result.score,
        severity: phq9Result.severity,
        aiPrediction,
        advice,
        responses
      };

      // Track the result
      resultsTracker.trackDepressionResult({
        phq9Score: quizResult.phq9Score,
        severity: quizResult.severity,
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

  const generateAdvice = (score: number): string[] => {
    const advice = [];
    
    if (score >= 15) {
      // Severe depression - crisis resources
      advice.push(
        "Your responses indicate you may be experiencing severe depression symptoms. Please consider reaching out to a mental health professional immediately.",
        "Crisis resources: National Suicide Prevention Lifeline: 988 or Crisis Text Line: Text HOME to 741741"
      );
    } else if (score >= 10) {
      // Moderate depression
      advice.push(
        "Your responses suggest moderate depression symptoms. Consider speaking with a healthcare provider about your mental health.",
        "Professional counseling and therapy can be very effective for managing depression symptoms."
      );
    } else if (score >= 5) {
      // Mild depression
      advice.push(
        "You may be experiencing mild depression symptoms. Self-care strategies and monitoring your mood may be helpful.",
        "Consider regular exercise, maintaining social connections, and establishing a routine."
      );
    } else {
      // Minimal symptoms
      advice.push(
        "Your responses indicate minimal depression symptoms. Continue maintaining your mental health with healthy habits.",
        "Regular exercise, good sleep hygiene, and stress management are great preventive measures."
      );
    }

    // Add some AI-generated advice
    const randomAdvice = aiAdviceData
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
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

  const progress = ((currentQuestion + 1) / depressionTestData.length) * 100;

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
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            <span>Depression Assessment (PHQ-9)</span>
          </CardTitle>
          <CardDescription>
            This assessment helps identify symptoms of depression using the PHQ-9 questionnaire,
            a clinically validated screening tool.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">What to Expect:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• {depressionTestData.length} questions about your mood and daily functioning</li>
              <li>• AI-powered analysis of your responses</li>
              <li>• Personalized recommendations and resources</li>
              <li>• Takes approximately 3-5 minutes to complete</li>
            </ul>
          </div>
          
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This is a screening tool, not a diagnostic test. Always consult with a healthcare 
              professional for proper evaluation and treatment.
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
          <CardTitle>Assessment Results</CardTitle>
          <CardDescription>
            Your depression assessment has been completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* PHQ-9 Score */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">PHQ-9 Score</h4>
                <p className="text-sm text-gray-600">{result.severity}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{result.phq9Score}</div>
                <div className="text-sm text-gray-500">out of 27</div>
              </div>
            </div>
            <Progress value={(result.phq9Score / 27) * 100} className="h-2" />
          </div>

          {/* AI Prediction */}
          {result.aiPrediction && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">AI Analysis</h4>
              <p className="text-purple-800">{result.aiPrediction.class}</p>
              <div className="text-sm text-purple-600 mt-1">
                Confidence: {(result.aiPrediction.confidence * 100).toFixed(1)}%
              </div>
            </div>
          )}

          {/* Advice and Recommendations */}
          <div className="space-y-3">
            <h4 className="font-semibold">Recommendations</h4>
            {result.advice.map((advice, index) => (
              <Alert key={index} className={index < 2 ? "border-orange-200 bg-orange-50" : ""}>
                <AlertDescription>{advice}</AlertDescription>
              </Alert>
            ))}
          </div>

          {/* Crisis Resources for High Scores */}
          {result.phq9Score >= 15 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Immediate Help Available:</strong><br />
                • National Suicide Prevention Lifeline: 988<br />
                • Crisis Text Line: Text HOME to 741741<br />
                • Emergency Services: 911
              </AlertDescription>
            </Alert>
          )}

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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">{currentQuestion + 1}</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            Depression Assessment (PHQ-9)
          </CardTitle>
          <Progress value={progress} className="w-full h-2 mb-4" />
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {depressionTestData.length}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
            {depressionTestData[currentQuestion].question}
          </h3>          <div className="space-y-3">
            {depressionTestData[currentQuestion].answer.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswer(index.toString())}
                className={`w-full p-4 h-auto text-left border-2 transition-all ${
                  responses[currentQuestion] === index
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
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

export default DepressionQuiz;
