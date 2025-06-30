import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap, ArrowLeft } from 'lucide-react';

interface Ball {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  energy: number;
}

interface EnergyBounceGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const EnergyBounceGame: React.FC<EnergyBounceGameProps> = ({ onComplete, onBack }) => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [bounces, setBounces] = useState(0);

  const colors = useMemo(() => [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9'
  ], []);

  const createBall = useCallback((): Ball => ({
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * 600 + 100,
    y: Math.random() * 200 + 100,
    vx: (Math.random() - 0.5) * 8,
    vy: Math.random() * 5 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 30 + 40,
    energy: Math.floor(Math.random() * 20) + 10
  }), [colors]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        setTimeSpent(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Add balls periodically
  useEffect(() => {
    if (isPlaying) {
      const ballInterval = setInterval(() => {
        setBalls(prev => {
          if (prev.length < 6) {
            return [...prev, createBall()];
          }
          return prev;
        });
      }, 3000);

      return () => clearInterval(ballInterval);
    }
  }, [isPlaying, createBall]);

  // Animate balls
  useEffect(() => {
    if (!isPlaying) return;

    const animationInterval = setInterval(() => {
      setBalls(prev => prev.map(ball => {
        let newX = ball.x + ball.vx;
        let newY = ball.y + ball.vy;
        let newVx = ball.vx;
        let newVy = ball.vy + 0.5; // gravity

        // Bounce off walls
        if (newX <= ball.size/2 || newX >= 800 - ball.size/2) {
          newVx = -newVx * 0.8;
          newX = Math.max(ball.size/2, Math.min(800 - ball.size/2, newX));
        }

        // Bounce off floor
        if (newY >= 400 - ball.size/2) {
          newVy = -Math.abs(newVy) * 0.8;
          newY = 400 - ball.size/2;
        }

        return {
          ...ball,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy
        };
      }));
    }, 16);

    return () => clearInterval(animationInterval);
  }, [isPlaying]);

  const bounceBall = (ballId: string) => {
    setBalls(prev => prev.map(ball => {
      if (ball.id === ballId) {
        setBounces(b => b + 1);
        setScore(s => s + ball.energy);
        setEnergy(e => Math.min(100, e + ball.energy));
        
        return {
          ...ball,
          vy: -Math.abs(ball.vy) - 5,
          vx: ball.vx + (Math.random() - 0.5) * 4
        };
      }
      return ball;
    }));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setBalls([]);
    setScore(0);
    setEnergy(0);
    setTimeSpent(0);
    setBounces(0);
  };

  const finishSession = () => {
    const finalScore = Math.min(Math.round((score / 10) + (bounces * 2) + (timeSpent / 60) * 5), 100);
    onComplete(finalScore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <motion.button
            onClick={onBack}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-md rounded-full transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Energy Bounce
            </h2>
            <p className="text-gray-600">Bounce balls to boost your energy and mood</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{bounces}</div>
              <div className="text-sm text-gray-600">Bounces</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">{energy}%</div>
              <div className="text-sm text-gray-600">Energy</div>
            </div>
          </div>
          
          {/* Energy Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${energy}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 relative overflow-hidden border border-white/20">
          <div className="relative w-full h-96 bg-gradient-to-b from-sky-100 to-blue-100 rounded-xl overflow-hidden">
            {/* Instructions */}
            {!isPlaying && balls.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center text-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-6xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-2">Energy Bounce!</h3>
                  <p className="text-lg">Click balls to bounce them and gain energy</p>
                </motion.div>
              </div>
            )}

            {/* Balls */}
            <AnimatePresence>
              {balls.map((ball) => (
                <motion.div
                  key={ball.id}
                  className="absolute rounded-full cursor-pointer shadow-lg"
                  style={{
                    left: ball.x - ball.size / 2,
                    top: ball.y - ball.size / 2,
                    width: ball.size,
                    height: ball.size,
                    backgroundColor: ball.color,
                  }}
                  onClick={() => bounceBall(ball.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold">
                    +{ball.energy}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            className={`px-6 py-3 rounded-full font-medium flex items-center justify-center space-x-2 ${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Start'}</span>
          </motion.button>

          <motion.button
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full flex items-center justify-center space-x-2 font-medium hover:bg-gray-300 transition-colors"
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>
          
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-medium flex items-center justify-center space-x-2 shadow-lg"
            onClick={finishSession}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-4 h-4" />
            <span>Complete</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
