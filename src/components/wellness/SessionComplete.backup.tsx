import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, TrendingUp, RefreshCw } from 'lucide-react';
import { Game, Mood } from '../../types/wellness';

interface SessionCompleteProps {
  mood: Mood;
  game: Game;
  score: number;
  onPlayAgain: () => void;
  onNewSession: () => void;
  onFinish: () => void;
}

export const SessionComplete: React.FC<SessionCompleteProps> = ({
  mood,
  game,
  score,
  onPlayAgain,
  onNewSession,
  onFinish
}) => {
  const getRecommendation = () => {
    if (score >= 80) {
      return {
        title: "Excellent Session!",
        message: "You've made great progress in managing your wellness. Keep up the good work!",
        tips: [
          "Try to maintain this practice daily",
          "Consider longer sessions when you have time",
          "Share your progress with friends or family"
        ]
      };
    } else if (score >= 60) {
      return {
        title: "Good Progress!",
        message: "You're building healthy wellness habits. Consistency is key!",
        tips: [
          "Try to practice at the same time each day",
          "Focus on quality over speed",
          "Remember that progress takes time"
        ]
      };
    } else {
      return {
        title: "Great Start!",
        message: "Every session is a step forward. Don't worry about the score - just keep practicing!",
        tips: [
          "Start with shorter sessions and build up",
          "Find a quiet, comfortable space",
          "Be patient with yourself"
        ]
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-6"
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Success Icon */}
        <motion.div
          className="text-8xl mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          🎉
        </motion.div>

        {/* Title and Score */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{recommendation.title}</h2>
        <p className="text-gray-600 mb-6">{recommendation.message}</p>

        {/* Score Display */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-sm opacity-90">Activity</div>
              <div className="text-xl font-semibold">{game.name}</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-90">Mood</div>
              <div className="text-xl font-semibold">{mood.name}</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-90">Score</div>
              <div className="text-3xl font-bold">{score}%</div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Tips for Your Next Session
          </h3>
          <ul className="space-y-2">
            {recommendation.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-600">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-medium flex items-center justify-center space-x-2"
            onClick={onPlayAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </motion.button>

          <motion.button
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-medium flex items-center justify-center space-x-2"
            onClick={onNewSession}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5" />
            <span>New Session</span>
          </motion.button>

          <motion.button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-full font-medium flex items-center justify-center space-x-2"
            onClick={onFinish}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            <span>Finish</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
