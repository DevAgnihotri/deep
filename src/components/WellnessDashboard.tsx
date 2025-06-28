import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Award, 
  Target, 
  Activity, 
  Heart, 
  Moon, 
  BookOpen, 
  Gamepad2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Users,
  BarChart3,
  PieChart,
  LineChart,
  Shield
} from 'lucide-react';

interface UserData {
  depression?: {
    phq9Score: number;
    severity: string;
    timestamp: string;
    aiPrediction?: {
      class: string;
      confidence: number;
    };
  };
  personality?: {
    riskScore: number;
    riskLevel: string;
    riskFactors: string[];
    timestamp: string;
  };
  combined?: {
    overallRisk: string;
    combinedAdvice: string[];
    timestamp: string;
  };
  dailyCheckins?: Array<{
    date: string;
    mood: string;
    energy: number;
    stress: number;
    notes?: string;
  }>;
  courseProgress?: Array<{
    courseId: string;
    courseName: string;
    progress: number;
    completedModules: number;
    totalModules: number;
    lastAccessed: string;
  }>;
  sleepContent?: Array<{
    type: string;
    title: string;
    duration: number;
    timestamp: string;
  }>;
  gamesPlayed?: Array<{
    gameTitle: string;
    duration: number;
    timestamp: string;
  }>;
}

interface WellnessDashboardProps {
  onNavigate: (section: string) => void;
}

export const WellnessDashboard: React.FC<WellnessDashboardProps> = ({ onNavigate }) => {
  const [userData, setUserData] = useState<UserData>({});
  const [showQuickCheckin, setShowQuickCheckin] = useState(false);
  const [todayMood, setTodayMood] = useState(5);
  const [todayEnergy, setTodayEnergy] = useState(5);
  const [todayStress, setTodayStress] = useState(5);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const data: UserData = {};
    
    // Load assessment data
    const depression = localStorage.getItem('depressionResult');
    if (depression) {
      data.depression = JSON.parse(depression);
    }
    
    const personality = localStorage.getItem('personalityResult');
    if (personality) {
      data.personality = JSON.parse(personality);
    }
    
    const combined = localStorage.getItem('combinedResults');
    if (combined) {
      data.combined = JSON.parse(combined);
    }

    // Load daily check-ins
    const checkins = localStorage.getItem('dailyCheckins');
    if (checkins) {
      data.dailyCheckins = JSON.parse(checkins);
    }

    // Load course progress
    const courseProgress = localStorage.getItem('courseProgress');
    if (courseProgress) {
      data.courseProgress = JSON.parse(courseProgress);
    }

    // Load sleep content usage
    const sleepContent = localStorage.getItem('sleepContentUsage');
    if (sleepContent) {
      data.sleepContent = JSON.parse(sleepContent);
    }

    // Load games played
    const gamesPlayed = localStorage.getItem('gamesPlayed');
    if (gamesPlayed) {
      data.gamesPlayed = JSON.parse(gamesPlayed);
    }

    setUserData(data);
  };

  const saveQuickCheckin = () => {
    const today = new Date().toISOString().split('T')[0];
    const checkin = {
      date: today,
      mood: getMoodLabel(todayMood),
      energy: todayEnergy,
      stress: todayStress,
      notes: '',
      timestamp: new Date().toISOString()
    };

    const existingCheckins = userData.dailyCheckins || [];
    const todayIndex = existingCheckins.findIndex(c => c.date === today);
    
    if (todayIndex >= 0) {
      existingCheckins[todayIndex] = checkin;
    } else {
      existingCheckins.push(checkin);
    }

    localStorage.setItem('dailyCheckins', JSON.stringify(existingCheckins));
    setUserData({ ...userData, dailyCheckins: existingCheckins });
    setShowQuickCheckin(false);
  };

  const getMoodLabel = (score: number) => {
    if (score <= 2) return 'Low';
    if (score <= 4) return 'Moderate';
    if (score <= 6) return 'Good';
    if (score <= 8) return 'Great';
    return 'Excellent';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low Risk": return "text-green-600 bg-green-50 border-green-200";
      case "Moderate Risk": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "High Risk": return "text-red-600 bg-red-50 border-red-200";
      case "Very High Risk": return "text-red-700 bg-red-100 border-red-300";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getWellnessScore = () => {
    let score = 70; // Base score
    
    if (userData.depression) {
      score -= (userData.depression.phq9Score / 27) * 30;
    }
    
    if (userData.personality) {
      score -= (userData.personality.riskScore / 30) * 20;
    }

    // Boost from recent check-ins
    const recentCheckins = userData.dailyCheckins?.filter(c => {
      const checkinDate = new Date(c.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return checkinDate >= weekAgo;
    }) || [];

    score += recentCheckins.length * 2;

    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const getStreakDays = () => {
    const checkins = userData.dailyCheckins || [];
    if (checkins.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (checkins.some(c => c.date === dateStr)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getTodayCheckin = () => {
    const today = new Date().toISOString().split('T')[0];
    return userData.dailyCheckins?.find(c => c.date === today);
  };

  const getRecentTrend = () => {
    const checkins = userData.dailyCheckins?.slice(-7) || [];
    if (checkins.length < 2) return null;
    
    const avgRecent = checkins.slice(-3).reduce((sum, c) => sum + c.energy, 0) / Math.min(3, checkins.length);
    const avgPrevious = checkins.slice(0, -3).reduce((sum, c) => sum + c.energy, 0) / Math.max(1, checkins.length - 3);
    
    return avgRecent > avgPrevious ? 'improving' : 'declining';
  };

  const wellnessScore = getWellnessScore();
  const streakDays = getStreakDays();
  const todayCheckin = getTodayCheckin();
  const trend = getRecentTrend();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome to Your Wellness Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your mental health journey with personalized insights and real-time progress monitoring
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Wellness Score Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Wellness Score</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-3xl font-bold text-blue-900">{wellnessScore}</span>
                  <span className="text-lg text-blue-600">/100</span>
                  {trend && (
                    <div className="flex items-center">
                      {trend === 'improving' ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
            <Progress value={wellnessScore} className="mt-4" />
          </CardContent>
        </Card>

        {/* Check-in Streak Card */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Check-in Streak</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-3xl font-bold text-green-900">{streakDays}</span>
                  <span className="text-lg text-green-600">days</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            {streakDays > 0 && (
              <p className="text-xs text-green-600 mt-2">Great consistency! 🎉</p>
            )}
          </CardContent>
        </Card>

        {/* Risk Level Card */}
        <Card className={`shadow-lg ${userData.combined ? getRiskColor(userData.combined.overallRisk) : 'bg-gray-50 border-gray-200'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Current Risk Level</p>
                <div className="mt-2">
                  {userData.combined ? (
                    <Badge className={`${getRiskColor(userData.combined.overallRisk)} border`}>
                      {userData.combined.overallRisk}
                    </Badge>
                  ) : (
                    <div className="text-sm text-gray-500">
                      <Button 
                        size="sm" 
                        onClick={() => onNavigate('assessment')}
                        className="text-xs"
                      >
                        Take Assessment
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-purple-700 mb-3">Today's Check-in</p>
              {todayCheckin ? (
                <div className="space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
                  <p className="text-xs text-green-600">Completed</p>
                  <p className="text-xs text-purple-600">Mood: {todayCheckin.mood}</p>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowQuickCheckin(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white w-full"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Quick Check-in
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts and Analytics */}        <div className="lg:col-span-2 space-y-6">
          {/* Mental Health Trend Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-blue-600" />
                Mental Health Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userData.dailyCheckins && userData.dailyCheckins.length > 0 ? (
                <div className="space-y-4">
                  <div className="h-40 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {userData.dailyCheckins.length} check-ins recorded
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last 30 days tracking available
                      </p>
                    </div>
                  </div>
                  
                  {/* Mini trend summary */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round(userData.dailyCheckins.reduce((sum, c) => sum + c.energy, 0) / userData.dailyCheckins.length)}
                      </p>
                      <p className="text-xs text-gray-600">Avg Energy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {Math.round(userData.dailyCheckins.reduce((sum, c) => sum + (10 - c.stress), 0) / userData.dailyCheckins.length)}
                      </p>
                      <p className="text-xs text-gray-600">Calm Level</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{userData.dailyCheckins.length}</p>
                      <p className="text-xs text-gray-600">Total Days</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-40 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No check-in data yet</p>
                    <Button 
                      size="sm" 
                      onClick={() => setShowQuickCheckin(true)}
                      className="mt-2"
                    >
                      Start Tracking
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Overview */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-green-600" />
                Activity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">
                    {userData.depression || userData.personality ? '2' : '0'}
                  </p>
                  <p className="text-xs text-blue-600">Assessments</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">
                    {userData.courseProgress?.length || 0}
                  </p>
                  <p className="text-xs text-green-600">Courses</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Moon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-900">
                    {userData.sleepContent?.length || 0}
                  </p>
                  <p className="text-xs text-purple-600">Sleep Sessions</p>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Gamepad2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-900">
                    {userData.gamesPlayed?.length || 0}
                  </p>
                  <p className="text-xs text-orange-600">Games Played</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Insights and Actions */}
        <div className="space-y-6">
          {/* AI Insights Card */}
          <Card className="shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-900">
                <Zap className="w-5 h-5 mr-2" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userData.combined?.combinedAdvice ? (
                <div className="space-y-3">
                  {userData.combined.combinedAdvice.slice(0, 2).map((advice, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border-l-4 border-indigo-400">
                      <p className="text-sm text-gray-700">{advice}</p>
                    </div>
                  ))}
                  <Button 
                    size="sm" 
                    onClick={() => onNavigate('assessment')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    View All Insights
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Brain className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-3">Complete assessments for personalized insights</p>
                  <Button 
                    size="sm" 
                    onClick={() => onNavigate('assessment')}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Take Assessment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => onNavigate('assessment')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Brain className="w-4 h-4 mr-2" />
                Mental Health Assessment
              </Button>
              
              <Button 
                onClick={() => onNavigate('courses')}
                variant="outline"
                className="w-full border-green-200 text-green-700 hover:bg-green-50"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>
              
              <Button 
                onClick={() => onNavigate('recommendations')}
                variant="outline"
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Moon className="w-4 h-4 mr-2" />
                Sleep & Relaxation
              </Button>
              
              <Button 
                onClick={() => onNavigate('booking')}
                variant="outline"
                className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <Users className="w-4 h-4 mr-2" />
                Book Therapist
              </Button>            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Check-in Modal */}
      {showQuickCheckin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <Heart className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Quick Check-in</h3>
              <p className="text-gray-600">How are you feeling today?</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mood (1-10)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">😔</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={todayMood}
                    onChange={(e) => setTodayMood(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">😊</span>
                  <Badge>{todayMood}</Badge>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Energy Level (1-10)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">🔋</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={todayEnergy}
                    onChange={(e) => setTodayEnergy(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">⚡</span>
                  <Badge>{todayEnergy}</Badge>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stress Level (1-10)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">😌</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={todayStress}
                    onChange={(e) => setTodayStress(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">😰</span>
                  <Badge>{todayStress}</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowQuickCheckin(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={saveQuickCheckin}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Save Check-in
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
