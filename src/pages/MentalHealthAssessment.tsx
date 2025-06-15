import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  User, 
  Heart, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  BarChart3,
  MessageCircle,
  Sun,
  Sparkles
} from "lucide-react";
import { DepressionQuiz } from "@/components/DepressionQuiz";
import { PersonalityQuiz } from "@/components/PersonalityQuizAdvanced";
import { PersonalizationQuiz } from "@/components/PersonalizationQuiz";
import { aiAdviceService, getCrisisResources } from "@/lib/aiAdviceService";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

interface QuizResults {
  depression?: {
    score: number;
    severity: string;
    answers: number[];
    recommendations: string[];
  };
  personality?: {
    risk: string;
    answers: number[];
    recommendations: string[];
  };
}

export default function MentalHealthAssessment() {
  const [activeTab, setActiveTab] = useState("overview");
  const [results, setResults] = useState<QuizResults>({});
  const [showCombinedResults, setShowCombinedResults] = useState(false);
  const [showShareYourDay, setShowShareYourDay] = useState(false);
  const [shareYourDayCompleted, setShareYourDayCompleted] = useState(false);

  const handleDepressionComplete = (score: number, severity: string, answers: number[], recommendations: string[]) => {
    setResults(prev => ({
      ...prev,
      depression: { score, severity, answers, recommendations }
    }));
    
    // Auto-advance to personality quiz if not completed
    if (!results.personality) {
      setActiveTab("personality");
    } else {
      setShowCombinedResults(true);
    }
  };
  const handlePersonalityComplete = (risk: string, answers: number[], recommendations: string[]) => {
    setResults(prev => ({
      ...prev,
      personality: { risk, answers, recommendations }
    }));
    
    // Auto-advance to depression quiz if not completed
    if (!results.depression) {
      setActiveTab("depression");
    } else {
      setShowCombinedResults(true);
    }
  };  const handleShareYourDayComplete = (insights: PersonalizationInsights) => {
    setShareYourDayCompleted(true);
    setShowShareYourDay(false);
    // You can store the insights if needed
    console.log("Share Your Day completed:", insights);
  };

  const getBothQuizzesCompleted = () => {
    return results.depression && results.personality;
  };

  const getCombinedRiskLevel = () => {
    if (!getBothQuizzesCompleted()) return "Incomplete";
    
    const depressionSeverity = results.depression!.severity;
    const personalityRisk = results.personality!.risk;
    
    // Combined risk assessment
    if (depressionSeverity.includes("Extremely Severe") || personalityRisk === "Very High Risk") {
      return "Critical";
    }
    if (depressionSeverity.includes("Severe") || personalityRisk === "High Risk") {
      return "High";
    }
    if (depressionSeverity.includes("Moderate") || personalityRisk === "Moderate Risk") {
      return "Moderate";
    }
    if (depressionSeverity.includes("Mild") || personalityRisk === "Low Risk") {
      return "Low";
    }
    return "Minimal";
  };
  const getCombinedRecommendations = () => {
    if (!getBothQuizzesCompleted()) return null;
    
    const personalizedAdvice = aiAdviceService.getPersonalizedAdvice(
      results.depression!.severity,
      [] // Could extract risk factors from personality quiz
    );
    
    return {
      immediate: personalizedAdvice.immediate,
      professional: personalizedAdvice.professional,
      lifestyle: personalizedAdvice.lifestyle,
      longTerm: personalizedAdvice.longTerm
    };
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "bg-red-200 text-red-900 border-red-300";
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Moderate": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Low": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Minimal": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    if (results.depression) completed += 50;
    if (results.personality) completed += 50;
    return completed;
  };

  if (showCombinedResults && getBothQuizzesCompleted()) {
    const combinedRisk = getCombinedRiskLevel();
    const recommendations = getCombinedRecommendations();
    const crisisResources = getCrisisResources();
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Mental Health Assessment</h1>
          <p className="text-gray-600">Comprehensive analysis based on both assessments</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Risk Card */}
          <Card className={`border-2 ${getRiskColor(combinedRisk)}`}>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Overall Risk Level
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Badge className={`text-xl px-4 py-2 ${getRiskColor(combinedRisk)}`}>
                {combinedRisk} Risk
              </Badge>
              <div className="mt-4 space-y-2 text-sm">
                <div>Depression: {results.depression!.severity}</div>
                <div>Lifestyle Risk: {results.personality!.risk}</div>
              </div>
            </CardContent>
          </Card>

          {/* Scores Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Assessment Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Depression Score:</span>
                <Badge variant="outline">{results.depression!.score}/27</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Risk Factors:</span>
                <Badge variant="outline">Multiple identified</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(results.depression!.score / 27) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recommended Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recommendations.immediate.slice(0, 3).map((rec, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Crisis Alert */}
        {combinedRisk === "Critical" && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong className="text-red-600">URGENT:</strong> Your assessment indicates a high level of risk. 
              Please consider seeking immediate professional help.
              <div className="mt-2 space-y-1">
                {crisisResources.immediate.map((resource, index) => (
                  <div key={index} className="text-sm font-medium">{resource}</div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Detailed Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Immediate Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.immediate.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Professional Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.professional.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                Lifestyle Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.lifestyle.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Long-term Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.longTerm.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={() => {
              setResults({});
              setShowCombinedResults(false);
              setActiveTab("overview");
            }}
            variant="outline"
          >
            Retake Assessments
          </Button>
          <Button>Find Professional Help</Button>
          <Button variant="outline">Download Results</Button>
          <Button variant="outline">Schedule Follow-up</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Assessment</h1>
        <p className="text-gray-600 mb-4">
          Comprehensive evaluation using clinically-validated assessment tools
        </p>
          {/* Progress Indicator */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Assessment Progress</span>
            <span>{getCompletionPercentage()}% Complete</span>
          </div>
          <Progress value={getCompletionPercentage()} className="h-2" />
        </div>
      </div>

      {/* Share Your Day Section */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <div className="relative">
                <Sun className="w-8 h-8 text-orange-500 animate-pulse" />
                <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400 animate-bounce" />
              </div>
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-bold">
                Share Your Day
              </span>
              {shareYourDayCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              🌟 Tell us about your current mood and feelings to get personalized insights 🌟
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
              <div className="flex items-center justify-center gap-3 mb-3">
                <MessageCircle className="w-5 h-5 text-pink-500" />
                <span className="font-semibold text-gray-800">Quick Daily Check-in</span>
                <Heart className="w-5 h-5 text-red-400 animate-pulse" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                This personalized quiz helps us understand your current state of mind and provides 
                tailored recommendations for your mental wellness journey.
              </p>
              <div className="flex justify-center space-x-4">
                {!shareYourDayCompleted ? (
                  <Button 
                    onClick={() => setShowShareYourDay(true)}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Sharing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    <span>Daily check-in completed!</span>
                  </div>
                )}
                {shareYourDayCompleted && (
                  <Button 
                    onClick={() => setShowShareYourDay(true)}
                    variant="outline"
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    Update Response
                  </Button>
                )}
              </div>
            </div>
            
            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="bg-white/60 rounded-lg p-3 border border-orange-100">
                <Lightbulb className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-700">Personalized Insights</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3 border border-pink-100">
                <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-700">Track Progress</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
                <Heart className="w-5 h-5 text-red-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-700">Better Wellbeing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="depression" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Depression Assessment
            {results.depression && <CheckCircle className="h-3 w-3 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger value="personality" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Lifestyle Assessment
            {results.personality && <CheckCircle className="h-3 w-3 text-green-500" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  About These Assessments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our comprehensive mental health assessment combines two evidence-based screening tools 
                  to provide you with personalized insights and recommendations.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">Depression Assessment</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Based on the PHQ-9, a clinically validated 10-question screening tool 
                        for depression severity.
                      </p>
                      <ul className="text-xs space-y-1 text-gray-500">
                        <li>• 10 questions</li>
                        <li>• ~3-5 minutes</li>
                        <li>• Measures depression severity</li>
                        <li>• Provides treatment recommendations</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold">Lifestyle Assessment</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Comprehensive 30-question evaluation of lifestyle factors 
                        that may impact mental health.
                      </p>
                      <ul className="text-xs space-y-1 text-gray-500">
                        <li>• 30 questions</li>
                        <li>• ~8-10 minutes</li>
                        <li>• Identifies risk factors</li>
                        <li>• Personalized recommendations</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Depression Assessment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {results.depression ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <Badge className="bg-green-100 text-green-800">
                            {results.depression.severity}
                          </Badge>
                        </>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => setActiveTab("depression")}
                          className="flex items-center gap-1"
                        >
                          Start <ArrowRight className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Lifestyle Assessment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {results.personality ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <Badge className="bg-purple-100 text-purple-800">
                            {results.personality.risk}
                          </Badge>
                        </>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => setActiveTab("personality")}
                          className="flex items-center gap-1"
                        >
                          Start <ArrowRight className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {getBothQuizzesCompleted() && (
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={() => setShowCombinedResults(true)}
                      className="flex items-center gap-2"
                    >
                      <TrendingUp className="h-4 w-4" />
                      View Complete Analysis
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> These assessments are screening tools and not diagnostic instruments. 
                Results should be discussed with a qualified mental health professional for proper evaluation and treatment planning.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>

        <TabsContent value="depression" className="mt-6">
          <DepressionQuiz onComplete={handleDepressionComplete} />
        </TabsContent>        <TabsContent value="personality" className="mt-6">
          <PersonalityQuiz onComplete={handlePersonalityComplete} />
        </TabsContent>
      </Tabs>

      {/* Share Your Day Quiz Modal */}
      {showShareYourDay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sun className="w-6 h-6 text-orange-500" />
                  Share Your Day
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowShareYourDay(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              <PersonalizationQuiz onComplete={handleShareYourDayComplete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
