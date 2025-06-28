import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Calendar, Target, Award, BarChart3, Activity, Clock, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { GameSession, UserProgress } from '../../types/wellness';

interface ProgressDashboardProps {
  sessions: GameSession[];
  userProgress: UserProgress;
  onBack: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ sessions, userProgress, onBack }) => {
  const recentSessions = sessions.slice(-7);
  const weeklyAverage = recentSessions.length > 0 
    ? Math.round(recentSessions.reduce((sum, session) => sum + session.stressReduction, 0) / recentSessions.length)
    : 0;

  const moodDistribution = sessions.reduce((acc, session) => {
    const moodName = session.mood?.name || 'Unknown';
    acc[moodName] = (acc[moodName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonMood = Object.entries(moodDistribution).length > 0 
    ? Object.entries(moodDistribution).reduce((a, b) => 
        moodDistribution[a[0]] > moodDistribution[b[0]] ? a : b
      )?.[0] || 'None'
    : 'None';

  const achievements = [
    { 
      id: 'first-session', 
      name: 'First Steps', 
      description: 'Complete your first session', 
      unlocked: sessions.length >= 1,
      icon: '🎯'
    },
    { 
      id: 'week-streak', 
      name: 'Week Warrior', 
      description: 'Use the app for 7 days', 
      unlocked: userProgress.streakDays >= 7,
      icon: '🔥'
    },
    { 
      id: 'high-scorer', 
      name: 'High Scorer', 
      description: 'Score above 90%', 
      unlocked: sessions.some(s => s.score >= 90),
      icon: '🏆'
    },
    { 
      id: 'mood-master', 
      name: 'Mood Master', 
      description: 'Try all available activities', 
      unlocked: new Set(sessions.map(s => s.gameType)).size >= 4,
      icon: '🎭'
    },
    {
      id: 'consistency-champion',
      name: 'Consistency Champion',
      description: 'Complete 10 sessions',
      unlocked: sessions.length >= 10,
      icon: '⭐'
    },
    {
      id: 'wellness-warrior',
      name: 'Wellness Warrior',
      description: 'Maintain a 3-day streak',
      unlocked: userProgress.streakDays >= 3,
      icon: '💪'
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-6xl mx-auto p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          onClick={onBack}
          variant="outline" 
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Wellness Journey</h2>
        <p className="text-gray-600">Track your progress and achievements</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Activity className="w-5 h-5" />}
          title="Total Sessions"
          value={userProgress.totalSessions.toString()}
          subtitle="Completed activities"
          color="bg-emerald-500"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="Stress Relief"
          value={`${userProgress.averageStressReduction}/10`}
          subtitle="Average improvement"
          color="bg-green-500"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          title="Current Streak"
          value={`${userProgress.streakDays} days`}
          subtitle="Consistent practice"
          color="bg-teal-500"
        />
        <StatCard
          icon={<Award className="w-5 h-5" />}
          title="Achievements"
          value={`${unlockedAchievements.length}/${achievements.length}`}
          subtitle="Unlocked badges"
          color="bg-blue-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Activity
        </h3>
        {sessions.length > 0 ? (
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session, index) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{session.mood.icon}</div>
                  <div>
                    <div className="font-medium text-gray-800">{session.gameType}</div>
                    <div className="text-sm text-gray-600">{session.mood.name} • {new Date(session.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-emerald-600">{session.score}%</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No sessions yet. Start your wellness journey today!
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked 
                  ? 'border-emerald-200 bg-emerald-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${
                    achievement.unlocked ? 'text-emerald-800' : 'text-gray-600'
                  }`}>
                    {achievement.name}
                  </div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: string;
}> = ({ icon, title, value, subtitle, color }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg p-6"
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
  >
    <div className={`${color} text-white p-3 rounded-xl inline-flex mb-4`}>
      {icon}
    </div>
    <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
    <div className="text-gray-600 font-medium mb-1">{title}</div>
    <div className="text-sm text-gray-500">{subtitle}</div>
  </motion.div>
);
