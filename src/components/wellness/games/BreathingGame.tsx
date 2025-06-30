import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface BreathingGameProps {
  onComplete?: (score: number) => void;
}

interface BreathingSession {
  technique: string;
  cycles: number;
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
  description: string;
  benefits: string[];
}

export const BreathingGame: React.FC<BreathingGameProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [cycle, setCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  const [selectedTechnique, setSelectedTechnique] = useState(0);
  const [stressLevel, setStressLevel] = useState(8);
  const [coherenceScore, setCoherenceScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const breathingTechniques: BreathingSession[] = [
    {
      technique: "4-7-8 Relaxation",
      cycles: 8,
      inhaleTime: 4,
      holdTime: 7,
      exhaleTime: 8,
      description: "Dr. Weil's technique for deep relaxation and sleep",
      benefits: ["Reduces anxiety", "Improves sleep", "Lowers stress hormones"]
    },
    {
      technique: "Box Breathing",
      cycles: 10,
      inhaleTime: 4,
      holdTime: 4,
      exhaleTime: 4,
      description: "Navy SEAL technique for focus and calm",
      benefits: ["Enhances focus", "Reduces stress", "Improves performance"]
    },
    {
      technique: "Coherent Breathing",
      cycles: 12,
      inhaleTime: 5,
      holdTime: 0,
      exhaleTime: 5,
      description: "Heart Rate Variability optimization",
      benefits: ["Balances nervous system", "Improves HRV", "Enhances emotional regulation"]
    }
  ];

  const currentTechnique = breathingTechniques[selectedTechnique];

  const handleComplete = () => {
    const score = Math.min(100, coherenceScore + (100 - stressLevel * 10));
    onComplete?.(score);
  };

  const handleStart = () => {
    setIsActive(true);
    setShowInstructions(false);
    setCycle(0);
    setPhase('inhale');
    setTimeLeft(currentTechnique.inhaleTime);
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setCycle(0);
    setPhase('inhale');
    setTimeLeft(currentTechnique.inhaleTime);
    setStressLevel(8);
    setCoherenceScore(0);
    setShowInstructions(true);
  };

  // Main breathing timer
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase(currentTechnique.holdTime > 0 ? 'hold' : 'exhale');
            return currentTechnique.holdTime > 0 ? currentTechnique.holdTime : currentTechnique.exhaleTime;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return currentTechnique.exhaleTime;
          } else if (phase === 'exhale') {
            setCycle(prev => {
              const newCycle = prev + 1;
              if (newCycle >= currentTechnique.cycles) {
                setIsActive(false);
                const score = Math.min(100, coherenceScore + (100 - stressLevel * 10));
                onComplete?.(score);
                return newCycle;
              }
              return newCycle;
            });
            setPhase('inhale');
            return currentTechnique.inhaleTime;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, currentTechnique, cycle, coherenceScore, stressLevel, onComplete]);

  // Update stress and coherence
  useEffect(() => {
    if (isActive) {
      setStressLevel(prev => Math.max(1, prev - 0.05));
      setCoherenceScore(prev => Math.min(100, prev + 1));
    }
  }, [isActive, cycle]);

  const getPhaseInstructions = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      default: return 'Ready?';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale': return 1.5;
      case 'hold': return 1.5;
      case 'exhale': return 0.8;
      default: return 1;
    }
  };

  const getCircleColor = () => {
    switch (phase) {
      case 'inhale': return 'from-green-400 to-emerald-500';
      case 'hold': return 'from-blue-400 to-blue-500';
      case 'exhale': return 'from-purple-400 to-purple-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">Breathing Exercise</span>
            </div>
            
            <Button 
              onClick={() => navigate("/mindgames")}
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {showInstructions ? (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌬️
                </motion.div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Guided Breathing Exercise</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {breathingTechniques.map((technique, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedTechnique === index
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                      onClick={() => setSelectedTechnique(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <h3 className="font-semibold mb-2">{technique.technique}</h3>
                      <p className={`text-sm ${
                        selectedTechnique === index ? 'text-green-100' : 'text-gray-600'
                      }`}>
                        {technique.description}
                      </p>
                      <div className="mt-3 text-xs">
                        <span className={selectedTechnique === index ? 'text-green-100' : 'text-gray-500'}>
                          {technique.cycles} cycles • {technique.inhaleTime}-{technique.holdTime}-{technique.exhaleTime}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits:</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {currentTechnique.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Breathing Exercise
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{currentTechnique.technique}</h2>
                  <span className="text-lg font-semibold text-gray-600">
                    Cycle {cycle + 1} of {currentTechnique.cycles}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((cycle) / currentTechnique.cycles) * 100}%` }}
                  />
                </div>
              </div>

              {/* Breathing Circle */}
              <div className="relative mb-8">
                <motion.div
                  className={`w-64 h-64 mx-auto rounded-full bg-gradient-to-br ${getCircleColor()} flex items-center justify-center text-white shadow-2xl`}
                  animate={{ scale: getCircleScale() }}
                  transition={{ duration: timeLeft, ease: "easeInOut" }}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{timeLeft}</div>
                    <div className="text-xl">{getPhaseInstructions()}</div>
                  </div>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{Math.round(10 - stressLevel)}/10</div>
                  <div className="text-sm text-gray-600">Relaxation</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{Math.round(coherenceScore)}%</div>
                  <div className="text-sm text-gray-600">Coherence</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{cycle}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gray-600">{currentTechnique.cycles - cycle}</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handlePause}
                  variant="outline"
                  size="lg"
                  className="px-6 py-3"
                >
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="px-6 py-3"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BreathingGame;
