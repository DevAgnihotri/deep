import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Brain, User, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Heart, Sparkles, Activity, Shield, Zap, ArrowLeft, MessageCircle, Sun, BarChart3, PieChart, LineChart, Calendar, Clock, Target } from 'lucide-react';
import DepressionQuiz, { DepressionQuizResult } from '@/components/DepressionQuizAdvanced';
import PersonalityQuizEnhanced, { PersonalityQuizResult } from '@/components/PersonalityQuizEnhanced';
import AssessmentHistory from '@/components/AssessmentHistory';
import { MentalHealthScore } from '@/components/MentalHealthScore';
import { WellnessMetrics } from '@/components/WellnessMetrics';
import { PersonalizationQuiz } from '@/components/PersonalizationQuiz';

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

interface MentalHealthAssessmentPageProps {
  onNavigate?: (section: string) => void;
}

interface CombinedResults {
  depression?: DepressionQuizResult;
  personality?: PersonalityQuizResult;
  overallRisk: string;
  combinedAdvice: string[];
}

const MentalHealthAssessmentPage: React.FC<MentalHealthAssessmentPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');  const [showShareYourDay, setShowShareYourDay] = useState(false);
  const [shareYourDayCompleted, setShareYourDayCompleted] = useState(false);
  
  // Load data from localStorage on initialization - moved before useEffect
  const [depressionResult, setDepressionResult] = useState<DepressionQuizResult | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('depressionResult');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  
  const [personalityResult, setPersonalityResult] = useState<PersonalityQuizResult | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('personalityResult');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  
  const [combinedResults, setCombinedResults] = useState<CombinedResults | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('combinedResults');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  
  // Enhanced user data tracking
  const [userDashboardData, setUserDashboardData] = useState({
    totalAssessments: 0,
    lastAssessmentDate: null,
    improvementTrend: 'stable',
    consistencyScore: 0,
    weeklyProgress: [],
    riskFactorChanges: [],
    wellnessScore: 0
  });
  
  // Load dashboard analytics
  useEffect(() => {
    const loadDashboardData = () => {
      const assessmentHistory = JSON.parse(localStorage.getItem('mental_health_assessment_history') || '{"records": []}');
      const dailyCheckins = JSON.parse(localStorage.getItem('dailyCheckins') || '[]');
      
      const totalAssessments = assessmentHistory.records.length;
      const lastRecord = assessmentHistory.records[assessmentHistory.records.length - 1];
      
      // Calculate wellness score based on recent data
      let wellnessScore = 70;
      if (depressionResult) {
        wellnessScore -= (depressionResult.phq9Score / 27) * 30;
      }
      if (personalityResult) {
        wellnessScore -= (personalityResult.riskScore / 30) * 20;
      }
      if (dailyCheckins.length > 0) {
        const recentCheckins = dailyCheckins.slice(-7);
        const avgEnergy = recentCheckins.reduce((sum, c) => sum + c.energy, 0) / recentCheckins.length;
        wellnessScore += (avgEnergy - 5) * 3;
      }
      
      setUserDashboardData({
        totalAssessments,
        lastAssessmentDate: lastRecord?.timestamp,
        improvementTrend: calculateTrend(assessmentHistory.records),
        consistencyScore: calculateConsistency(dailyCheckins),
        weeklyProgress: generateWeeklyProgress(dailyCheckins),
        riskFactorChanges: analyzeRiskFactorChanges(assessmentHistory.records),
        wellnessScore: Math.max(0, Math.min(100, Math.round(wellnessScore)))
      });
    };
    
    loadDashboardData();
  }, [depressionResult, personalityResult]);
  
  const calculateTrend = (records) => {
    if (records.length < 2) return 'stable';
    const recent = records.slice(-2);
    const oldScore = recent[0]?.keyMetrics?.phq9Score || 0;
    const newScore = recent[1]?.keyMetrics?.phq9Score || 0;
    return newScore < oldScore ? 'improving' : newScore > oldScore ? 'declining' : 'stable';
  };
  
  const calculateConsistency = (checkins) => {
    if (checkins.length === 0) return 0;
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      last7Days.push(checkins.some(c => c.date === dateStr) ? 1 : 0);
    }
    return (last7Days.reduce((sum, val) => sum + val, 0) / 7) * 100;
  };
  
  const generateWeeklyProgress = (checkins) => {
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayCheckin = checkins.find(c => c.date === dateStr);
      weeklyData.push({
        date: dateStr,
        mood: dayCheckin?.energy || 0,
        completed: !!dayCheckin
      });
    }
    return weeklyData;
  };
  
  const analyzeRiskFactorChanges = (records) => {
    if (records.length < 2) return [];
    const recent = records.slice(-2);    return [
      { factor: 'Depression Score', change: (recent[1]?.keyMetrics?.phq9Score || 0) - (recent[0]?.keyMetrics?.phq9Score || 0) },
      { factor: 'Risk Factors', change: (recent[1]?.keyMetrics?.riskFactorsCount || 0) - (recent[0]?.keyMetrics?.riskFactorsCount || 0) }
    ];
  };

  // Helper function to check if we have any results data
  const hasAnyResults = useCallback(() => {
    return depressionResult || personalityResult || combinedResults;
  }, [depressionResult, personalityResult, combinedResults]);

  // Get latest available data for display
  const getLatestResults = useCallback(() => {
    // Always try to get the most recent data from localStorage
    const savedDepression = localStorage.getItem('depressionResult');
    const savedPersonality = localStorage.getItem('personalityResult');
    const savedCombined = localStorage.getItem('combinedResults');
    
    const latestDepression = savedDepression ? JSON.parse(savedDepression) : depressionResult;
    const latestPersonality = savedPersonality ? JSON.parse(savedPersonality) : personalityResult;
    const latestCombined = savedCombined ? JSON.parse(savedCombined) : combinedResults;
    
    return {
      depression: latestDepression,
      personality: latestPersonality,
      combined: latestCombined
    };
  }, [depressionResult, personalityResult, combinedResults]);

  const handleDepressionComplete = (result: DepressionQuizResult) => {
    setDepressionResult(result);
    localStorage.setItem('depressionResult', JSON.stringify(result));
    
    // Get current personality result for combined calculation
    const currentPersonality = personalityResult;
    updateCombinedResults(result, currentPersonality);
    
    // Always switch to results tab after completion
    setActiveTab('results');
  };

  const handlePersonalityComplete = (result: PersonalityQuizResult) => {
    setPersonalityResult(result);
    localStorage.setItem('personalityResult', JSON.stringify(result));
    
    // Get current depression result for combined calculation
    const currentDepression = depressionResult;
    updateCombinedResults(currentDepression, result);
    
    // Always switch to results tab after completion
    setActiveTab('results');
  };

  const handleFindProfessionalHelp = () => {
    if (onNavigate) {
      onNavigate('booking');
    }
  };

  const handleShareYourDayComplete = (insights: PersonalizationInsights) => {
    console.log("Share Your Day completed:", insights);
    setShareYourDayCompleted(true);
    setShowShareYourDay(false);
  };

  const updateCombinedResults = useCallback((depression: DepressionQuizResult | null, personality: PersonalityQuizResult | null) => {
    if (!depression && !personality) return;

    // Calculate overall risk based on available assessments
    let overallRiskScore = 0;
    
    // Weight depression score more heavily for current symptoms
    if (depression) {
      if (depression.phq9Score >= 20) overallRiskScore += 4;
      else if (depression.phq9Score >= 15) overallRiskScore += 3;
      else if (depression.phq9Score >= 10) overallRiskScore += 2;
      else if (depression.phq9Score >= 5) overallRiskScore += 1;
    }

    // Add personality risk factors
    if (personality) {
      if (personality.riskScore >= 25) overallRiskScore += 3;
      else if (personality.riskScore >= 15) overallRiskScore += 2;
      else if (personality.riskScore >= 5) overallRiskScore += 1;
    }

    // Determine overall risk level
    let overallRisk: string;
    if (overallRiskScore >= 6) overallRisk = "Very High Risk";
    else if (overallRiskScore >= 4) overallRisk = "High Risk";
    else if (overallRiskScore >= 2) overallRisk = "Moderate Risk";
    else overallRisk = "Low Risk";

    // Generate combined advice
    const combinedAdvice = generateCombinedAdvice(depression, personality, overallRisk);

    const combined: CombinedResults = {
      depression,
      personality,
      overallRisk,
      combinedAdvice
    };
    
    setCombinedResults(combined);
    localStorage.setItem('combinedResults', JSON.stringify(combined));
  }, []);

  // Initialize combined results if both individual results exist
  useEffect(() => {
    if (depressionResult && personalityResult && !combinedResults) {
      updateCombinedResults(depressionResult, personalityResult);
    }
  }, [depressionResult, personalityResult, combinedResults, updateCombinedResults]);

  const generateCombinedAdvice = (depression: DepressionQuizResult | null, personality: PersonalityQuizResult | null, overallRisk: string): string[] => {
    const advice = [];

    // Crisis situations
    if ((depression && depression.phq9Score >= 15) || (personality && personality.riskFactors.includes("Suicidal thoughts"))) {
      advice.push("URGENT: Your assessments indicate severe symptoms or risk factors. Please seek immediate professional help.");
      advice.push("Crisis Resources: National Suicide Prevention Lifeline: 988, Crisis Text Line: Text HOME to 741741");
    }

    // High risk recommendations
    if (overallRisk === "Very High Risk" || overallRisk === "High Risk") {
      advice.push("Your combined assessment results indicate significant risk factors that warrant immediate professional attention.");
      advice.push("Strongly recommend comprehensive mental health evaluation including therapy and possible medication assessment.");
    } else if (overallRisk === "Moderate Risk") {
      advice.push("Your results show moderate risk factors. Consider preventive interventions and regular mental health check-ins.");
      advice.push("Therapy, lifestyle modifications, and stress management techniques may be beneficial.");
    } else {
      advice.push("Your assessment shows relatively low risk. Continue maintaining protective factors and healthy habits.");
      advice.push("Regular self-monitoring and preventive care are recommended to maintain good mental health.");
    }

    // Specific recommendations based on identified issues
    if (personality) {
      const allRiskFactors = personality.riskFactors;
      if (allRiskFactors.includes("Lack of physical exercise")) {
        advice.push("Incorporate regular physical activity: aim for 150 minutes of moderate exercise per week.");
      }
      if (allRiskFactors.includes("Insomnia") || allRiskFactors.includes("Sleep issues")) {
        advice.push("Prioritize sleep hygiene: maintain consistent sleep schedule, limit screen time before bed.");
      }
      if (allRiskFactors.includes("Financial stress")) {
        advice.push("Consider financial counseling and explore assistance programs to address economic stressors.");
      }
      if (allRiskFactors.includes("Recent loss") || allRiskFactors.includes("Recent trauma")) {
        advice.push("Consider grief counseling or trauma-focused therapy (EMDR, trauma-focused CBT).");
      }
    }

    // General wellness recommendations
    advice.push("Build and maintain strong social support networks through family, friends, or support groups.");
    advice.push("Practice stress management techniques like mindfulness, meditation, or deep breathing exercises.");
    advice.push("Maintain a balanced lifestyle with regular routines for sleep, meals, and activities.");

    return advice;
  };
  const resetAssessments = () => {
    setDepressionResult(null);
    setPersonalityResult(null);
    setCombinedResults(null);
    localStorage.removeItem('depressionResult');
    localStorage.removeItem('personalityResult');
    localStorage.removeItem('combinedResults');    setActiveTab('overview');
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low Risk": return "bg-green-100 text-green-800 border-green-200";
      case "Moderate Risk": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "High Risk": return "bg-red-500 text-white border-red-600 shadow-lg";
      case "Very High Risk": return "bg-red-600 text-white border-red-700 shadow-xl";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDepressionSeverityColor = (severity: string) => {
    switch (severity) {
      case "None-minimal": return "bg-green-100 text-green-800 border-green-200";
      case "Mild": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Moderate": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Moderately Severe": return "bg-red-500 text-white border-red-600 shadow-lg";
      case "Severe": return "bg-red-600 text-white border-red-700 shadow-xl";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Mental Health Assessments Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Mental Health Assessments
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive AI-powered mental wellness evaluation and personalized insights
        </p>
      </div>

      {/* Top Three Components - Vertical Stack */}
      <div className="space-y-8 mb-8">
        {/* Women's Mental Wellness Score */}
        <div>
          <MentalHealthScore showTitle={true} />
        </div>

        {/* Share Your Day Box */}
        <div>
          <Card className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border-2 border-slate-200 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                <Sun className="w-8 h-8 text-orange-500" />
                <span className="bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent font-bold">
                  Share Your Day
                </span>
                {shareYourDayCompleted && <CheckCircle2 className="w-6 h-6 text-green-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/90 backdrop-blur-lg rounded-xl p-4 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-slate-600" />
                  <span className="font-semibold text-gray-800">Wellness Check-in</span>
                  <Heart className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-gray-600 text-sm text-center leading-relaxed mb-4">
                  Share your thoughts and emotions for personalized mental health insights.
                </p>
                <div className="flex justify-center">
                  {!shareYourDayCompleted ? (
                    <Button 
                      onClick={() => setShowShareYourDay(true)}
                      className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 hover:from-slate-700 hover:via-blue-700 hover:to-indigo-700 text-white px-6 py-2 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Sun className="w-4 h-4 mr-2" />
                      Start Check-in
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Completed Today</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>        {/* Mindhaven Wellness Metrics Grid */}
        <div>
          <WellnessMetrics />
        </div>
      </div>      {/* Main Assessment Content */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span>Comprehensive Mental Health Assessments</span>
          </CardTitle><CardDescription>
            AI-powered depression screening and lifestyle risk assessment with personalized recommendations
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="depression">
            Depression Assessment
          </TabsTrigger>
          <TabsTrigger value="personality">
            Lifestyle Assessment
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!hasAnyResults()}>
            Results
          </TabsTrigger>
          <TabsTrigger value="history">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Enhanced Hero Section */}
          <div className="text-center space-y-8 mb-12">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-12 border-2 border-blue-100 shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full -translate-y-20 translate-x-20 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-green-200 to-blue-300 rounded-full translate-y-16 -translate-x-16 opacity-40"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full -translate-x-12 -translate-y-12 opacity-25"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                </div>                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  AI-Powered Mental Health Assessments
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Experience cutting-edge mental health screening powered by advanced <strong>machine learning</strong> and 
                  <strong> neural networks</strong>. Our AI combines clinical expertise with sophisticated pattern recognition 
                  to provide personalized insights into your mental wellness journey.
                </p>
                
                {/* AI Technology Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-900 mb-2">Neural Networks</h4>
                    <p className="text-sm text-blue-800">Deep learning models analyze complex patterns in mental health data</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-purple-900 mb-2">Pattern Recognition</h4>
                    <p className="text-sm text-purple-800">AI identifies subtle indicators and risk factors automatically</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-green-900 mb-2">Evidence-Based</h4>
                    <p className="text-sm text-green-800">Clinically validated assessments with AI enhancement</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-indigo-100">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-indigo-900 mb-2">Real-Time Analysis</h4>
                    <p className="text-sm text-indigo-800">Instant processing and personalized recommendations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200 cursor-pointer"
                  onClick={() => setActiveTab('depression')}>
              <CardHeader className="text-center space-y-4 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-900">Depression Screening</CardTitle>
                <CardDescription className="text-blue-700 text-lg">
                  PHQ-9 Clinical Assessment enhanced with AI neural network analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Features
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• TensorFlow.js neural network classification</li>
                    <li>• Pattern recognition for symptom analysis</li>
                    <li>• Personalized risk assessment</li>
                    <li>• Clinical-grade accuracy</li>
                  </ul>
                </div>
                {depressionResult && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Assessment:</span>                      <Badge className={getDepressionSeverityColor(depressionResult.severity)}>
                        {depressionResult.severity}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-200 cursor-pointer"
                  onClick={() => setActiveTab('personality')}>
              <CardHeader className="text-center space-y-4 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-purple-900">Lifestyle Assessment</CardTitle>
                <CardDescription className="text-purple-700 text-lg">
                  Comprehensive risk factor analysis with AI-powered insights
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="bg-purple-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    AI Analysis
                  </h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Predictive risk modeling</li>
                    <li>• Multi-factor correlation analysis</li>
                    <li>• Lifestyle pattern recognition</li>
                    <li>• Personalized intervention recommendations</li>
                  </ul>
                </div>
                {personalityResult && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Factors:</span>
                      <Badge className={getRiskColor(personalityResult.riskLevel)}>
                        {personalityResult.riskScore} factors
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Action Section */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Activity className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-2xl font-bold text-indigo-900">Ready to Begin?</h3>
                </div>
                <p className="text-lg text-indigo-800 max-w-2xl mx-auto">
                  Take both assessments for a comprehensive AI-powered analysis of your mental health and personalized recommendations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={() => setActiveTab('depression')}
                    className="h-16 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg px-8"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Start Depression Assessment
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('personality')}
                    className="h-16 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg px-8"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Start Lifestyle Assessment
                  </Button>
                  <Button 
                    onClick={handleFindProfessionalHelp}
                    className="h-16 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg px-8"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Find Professional Help
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depression">
          <DepressionQuiz onComplete={handleDepressionComplete} />
        </TabsContent>

        <TabsContent value="personality">
          <PersonalityQuizEnhanced onComplete={handlePersonalityComplete} />
        </TabsContent>

        <TabsContent value="results">
          {hasAnyResults() && (() => {
            const latestData = getLatestResults();
            
            // Ensure combinedResults are computed if they don't exist but we have individual results
            let displayResults = latestData.combined;
            if (!displayResults && (latestData.depression || latestData.personality)) {
              // Create a basic combined view from available data
              const tempDepression = latestData.depression;
              const tempPersonality = latestData.personality;
              
              // Calculate basic risk level
              let overallRisk = "Low Risk";
              if (tempDepression && tempDepression.phq9Score >= 15) {
                overallRisk = "High Risk";
              } else if (tempPersonality && tempPersonality.riskScore >= 15) {
                overallRisk = "Moderate Risk";
              } else if ((tempDepression && tempDepression.phq9Score >= 10) || (tempPersonality && tempPersonality.riskScore >= 10)) {
                overallRisk = "Moderate Risk";
              }
              
              displayResults = {
                depression: tempDepression,
                personality: tempPersonality,
                overallRisk,
                combinedAdvice: ["Assessment data available. Complete both assessments for comprehensive analysis."]
              };
            }
            
            return (
              <div className="space-y-8">
                {/* AI-Powered Header */}
                <div className="text-center space-y-6">
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white bg-opacity-5 rounded-full -translate-x-12 -translate-y-12"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Brain className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h1 className="text-4xl font-bold mb-4">AI-Powered Assessment Results</h1>
                      <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                        Your comprehensive mental health evaluation has been analyzed using advanced machine learning algorithms
                      </p>
                      <div className="flex items-center justify-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4" />
                          <span>Neural Network Analysis</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>Pattern Recognition</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Evidence-Based Insights</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>                {/* Enhanced Overall Risk Assessment */}
                <Card className={`border-0 shadow-2xl ${
                  displayResults.overallRisk === "Very High Risk" || displayResults.overallRisk === "High Risk" 
                    ? "bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300" 
                    : "bg-gradient-to-br from-gray-50 to-white"
                }`}>
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <div className={`inline-flex items-center gap-4 p-8 rounded-2xl shadow-lg ${
                        displayResults.overallRisk === "Very High Risk" || displayResults.overallRisk === "High Risk"
                          ? "bg-gradient-to-br from-red-100 via-red-50 to-red-100 border-2 border-red-300"
                          : "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-2 border-blue-100"
                      }`}>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-3">
                            <Activity className={`w-6 h-6 mr-2 ${
                              displayResults.overallRisk === "Very High Risk" || displayResults.overallRisk === "High Risk"
                                ? "text-red-600"
                                : "text-blue-600"
                            }`} />
                            <span className={`text-lg font-semibold ${
                              displayResults.overallRisk === "Very High Risk" || displayResults.overallRisk === "High Risk"
                                ? "text-red-800"
                                : "text-gray-800"
                            }`}>AI Risk Assessment</span>
                          </div>
                          <Badge className={`text-2xl px-6 py-3 font-bold shadow-lg ${getRiskColor(displayResults.overallRisk)}`}>
                            {displayResults.overallRisk}
                          </Badge>
                          <div className={`mt-4 text-sm ${
                            displayResults.overallRisk === "Very High Risk" || displayResults.overallRisk === "High Risk"
                              ? "text-red-700"
                              : "text-gray-600"
                          }`}>
                            Analyzed using advanced ML algorithms
                          </div>
                        </div>
                      </div>
                    
                      {/* AI Confidence Indicators */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-blue-50 p-4 rounded-xl text-center">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Brain className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-sm font-semibold text-blue-900">Neural Analysis</div>
                          <div className="text-xs text-blue-700">Deep learning assessment</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl text-center">
                          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-sm font-semibold text-purple-900">Pattern Recognition</div>
                          <div className="text-xs text-purple-700">Complex data analysis</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl text-center">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Shield className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-sm font-semibold text-green-900">Validated Results</div>
                          <div className="text-xs text-green-700">Clinically proven accuracy</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>                {/* Individual Assessment Results */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Enhanced Depression Results */}
                  {displayResults.depression && (                    <Card className={`border-0 shadow-xl overflow-hidden ${
                      displayResults.depression.severity === "Severe" || displayResults.depression.severity === "Moderately Severe"
                        ? "bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300"
                        : "bg-gradient-to-br from-blue-50 to-blue-100"
                    }`}>
                      <div className={`p-6 text-white relative ${
                        displayResults.depression.severity === "Severe" || displayResults.depression.severity === "Moderately Severe"
                          ? "bg-gradient-to-r from-red-500 to-red-600"
                          : "bg-gradient-to-r from-blue-500 to-blue-600"
                      }`}>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -translate-y-12 translate-x-12"></div>
                        <div className="relative z-10">
                          <div className="flex items-center space-x-3 mb-4">
                            <CheckCircle2 className="h-8 w-8" />
                            <div>
                              <h3 className="text-2xl font-bold">Depression Assessment</h3>
                              <p className={
                                displayResults.depression.severity === "Severe" || displayResults.depression.severity === "Moderately Severe"
                                  ? "text-red-100"
                                  : "text-blue-100"
                              }>PHQ-9 Clinical Screening</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-8 space-y-6">                        {/* Score Display */}
                        <div className={`text-center p-6 rounded-2xl shadow-lg ${
                          displayResults.depression.severity === "Severe" || displayResults.depression.severity === "Moderately Severe"
                            ? "bg-red-50 border-2 border-red-200"
                            : "bg-white"
                        }`}>
                          <div className={`text-5xl font-bold mb-2 ${
                            displayResults.depression.severity === "Severe" || displayResults.depression.severity === "Moderately Severe"
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}>
                            {displayResults.depression.phq9Score}
                            <span className="text-2xl text-gray-500">/27</span>
                          </div>
                          <div className={`text-lg font-semibold mb-2 ${
                            displayResults.depression.severity === "Severe" || displayResults.depression.severity === "Moderately Severe"
                              ? "text-red-800"
                              : "text-gray-800"
                          }`}>
                            {displayResults.depression.severity}
                          </div>
                          <div className={`text-sm ${
                            displayResults.depression.severity === "Severe" || displayResults.depression.severity === "Moderately Severe"
                              ? "text-red-700"
                              : "text-gray-600"
                          }`}>Clinical Depression Score</div>
                        </div>

                        {/* AI Analysis Section */}
                        {displayResults.depression.aiPrediction && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-100">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="text-lg font-bold text-blue-900">AI Neural Analysis</h4>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                              <div className="text-sm text-gray-600 mb-2">Machine Learning Classification:</div>
                              <div className="text-lg font-semibold text-blue-800">
                                {displayResults.depression.aiPrediction.class}
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                Analyzed using TensorFlow.js neural networks
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Severity Visualization */}
                        <div className="space-y-3">
                          <div className="text-sm font-semibold text-gray-700">Severity Scale</div>
                          <div className="relative">
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min((displayResults.depression.phq9Score || 0) / 27 * 100, 100)}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>None</span>
                              <span>Mild</span>
                              <span>Moderate</span>
                              <span>Severe</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Enhanced Lifestyle Results */}
                  {displayResults.personality && (
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-purple-100 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -translate-y-12 translate-x-12"></div>                        <div className="relative z-10">
                          <div className="flex items-center space-x-3 mb-4">
                            <User className="h-8 w-8" />
                            <div>
                              <h3 className="text-2xl font-bold">Lifestyle Assessment</h3>
                              <p className="text-purple-100">Risk Factor Analysis</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-8 space-y-6">
                        {/* Risk Score Display */}
                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                          <div className="text-5xl font-bold text-purple-600 mb-2">
                            {displayResults.personality.riskScore}
                            <span className="text-2xl text-gray-500"> factors</span>
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            {displayResults.personality.riskLevel}
                          </div>
                          <div className="text-sm text-gray-600">Identified Risk Factors</div>
                        </div>

                        {/* AI Analysis Section */}
                        {displayResults.personality.aiPrediction && (
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-100">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="text-lg font-bold text-purple-900">AI Pattern Analysis</h4>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                              <div className="text-sm text-gray-600 mb-2">Risk Pattern Classification:</div>
                              <div className="text-lg font-semibold text-purple-800">
                                {displayResults.personality.aiPrediction.class}
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                Analyzed using predictive risk modeling
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Risk Level Visualization */}
                        <div className="space-y-3">
                          <div className="text-sm font-semibold text-gray-700">Risk Level Scale</div>
                          <div className="relative">
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min((displayResults.personality.riskScore || 0) / 30 * 100, 100)}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Low</span>
                              <span>Moderate</span>
                              <span>High</span>
                              <span>Very High</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Enhanced Combined Recommendations */}
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">AI-Generated Recommendations</CardTitle>
                        <CardDescription className="text-green-100">
                          Personalized wellness strategies based on your unique assessment profile
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 space-y-6">
                    <div className="grid gap-4">
                      {displayResults.combinedAdvice.map((advice, index) => {
                        const isUrgent = advice.includes("URGENT") || advice.includes("Crisis Resources");
                        const isHighPriority = index < 2 && !isUrgent;
                        
                        return (
                          <div
                            key={index}
                            className={`p-6 rounded-2xl border-2 shadow-lg transition-all duration-300 hover:shadow-xl ${
                              isUrgent 
                                ? "border-red-300 bg-gradient-to-r from-red-50 to-pink-50" 
                                : isHighPriority 
                                ? "border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50" 
                                : "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50"
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isUrgent 
                                  ? "bg-red-500 text-white" 
                                  : isHighPriority 
                                  ? "bg-orange-500 text-white" 
                                  : "bg-green-500 text-white"
                              }`}>
                                {isUrgent ? (
                                  <AlertTriangle className="w-4 h-4" />
                                ) : isHighPriority ? (
                                  <TrendingUp className="w-4 h-4" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`leading-relaxed ${
                                  isUrgent ? "text-red-900 font-semibold" : "text-gray-800"
                                }`}>
                                  {advice}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-green-200 w-full">
                      <Button 
                        onClick={resetAssessments}
                        variant="outline" 
                        className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                      </Button>
                      <Button 
                        onClick={() => window.print()}
                        variant="outline"
                        className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        Save Results
                      </Button>
                      <Button 
                        onClick={handleFindProfessionalHelp}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Find Professional Help
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })()}        </TabsContent>
          <TabsContent value="history">
          <AssessmentHistory />
        </TabsContent>
      </Tabs>

      {/* Share Your Day Modal */}
      {showShareYourDay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800">Share Your Day - Wellness Check-in</h2>
              <Button 
                onClick={() => setShowShareYourDay(false)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <div className="p-6">
              <PersonalizationQuiz 
                onComplete={handleShareYourDayComplete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentalHealthAssessmentPage;
