import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowLeft, Timer, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Bubble {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  points: number;
}

interface BubblePopGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const BubblePopGame: React.FC<BubblePopGameProps> = ({ onComplete, onExit }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bubblesPopped, setBubblesPopped] = useState(0);

  const bubbleColors = useMemo(() => [
    'from-blue-400 to-cyan-400',
    'from-pink-400 to-rose-400',
    'from-purple-400 to-violet-400',
    'from-green-400 to-emerald-400',
    'from-yellow-400 to-orange-400',
  ], []);

  const completeGame = useCallback(() => {
    const finalScore = Math.min(100, Math.floor((score / 10) + (bubblesPopped * 2)));
    onComplete(finalScore);
  }, [score, bubblesPopped, onComplete]);

  const createBubble = useCallback((): Bubble => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * (window.innerWidth - 120) + 60,
      y: window.innerHeight + 50,
      size: Math.random() * 30 + 40,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      speed: Math.random() * 2 + 1.5,
      points: Math.floor(Math.random() * 20) + 10
    };
  }, [bubbleColors]);

  // Generate bubbles
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setBubbles(prev => {
        if (prev.length < 8) {
          return [...prev, createBubble()];
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [gameActive, createBubble]);

  // Move bubbles
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setBubbles(prev => 
        prev
          .map(bubble => ({ ...bubble, y: bubble.y - bubble.speed }))
          .filter(bubble => bubble.y > -100)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Game timer
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          completeGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, completeGame]);

  const startGame = () => {
    setGameStarted(true);
    setGameActive(true);
    setScore(0);
    setBubblesPopped(0);
    setTimeLeft(60);
    setBubbles([]);
  };

  const popBubble = (bubbleId: string) => {
    setBubbles(prev => {
      const bubble = prev.find(b => b.id === bubbleId);
      if (bubble) {
        setScore(s => s + bubble.points);
        setBubblesPopped(p => p + 1);
      }
      return prev.filter(b => b.id !== bubbleId);
    });
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameActive(false);
    setScore(0);
    setBubblesPopped(0);
    setTimeLeft(60);
    setBubbles([]);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={onExit}
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>

          <div className="text-6xl mb-6">🫧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bubble Pop</h2>
          <p className="text-gray-600 mb-6">
            Pop bubbles to release tension and stress! Tap as many bubbles as you can in 60 seconds.
          </p>
          
          <div className="space-y-3 text-sm text-gray-600 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <Timer className="w-4 h-4" />
              <span>60 seconds to pop as many bubbles as possible</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Each bubble gives you points</span>
            </div>
          </div>

          <Button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 rounded-full text-lg font-semibold"
          >
            Start Popping!
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🫧</div>
              <span className="font-bold text-xl text-gray-800">Bubble Pop</span>
            </div>
            
            <Button 
              onClick={onExit}
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Exit</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Game UI */}
      <div className="absolute top-20 left-4 right-4 z-40">
        <div className="flex justify-between items-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
            <div className="text-sm text-gray-600">Score</div>
            <div className="text-2xl font-bold text-blue-600">{score}</div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
            <div className="text-sm text-gray-600">Time</div>
            <div className="text-2xl font-bold text-orange-600">{timeLeft}s</div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
            <div className="text-sm text-gray-600">Popped</div>
            <div className="text-2xl font-bold text-green-600">{bubblesPopped}</div>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="absolute top-32 right-4 z-40">
        <Button
          onClick={resetGame}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Bubbles */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute cursor-pointer rounded-full bg-gradient-to-br ${bubble.color} shadow-lg`}
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => popBubble(bubble.id)}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <div className="w-1/3 h-1/3 bg-white/30 rounded-full" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Game Over Screen */}
      {!gameActive && gameStarted && (
        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Great Job!</h2>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">Final Score: <span className="font-bold text-blue-600">{score}</span></p>
              <p className="text-gray-600">Bubbles Popped: <span className="font-bold text-green-600">{bubblesPopped}</span></p>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={startGame}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
              >
                Play Again
              </Button>
              <Button
                onClick={completeGame}
                variant="outline"
                className="flex-1"
              >
                Finish
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
