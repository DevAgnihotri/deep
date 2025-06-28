import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, MessageCircle, X, Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface MascotProps {
  userLevel: number;
  currentMood?: string;
  recentScore?: number;
  isVisible: boolean;
  onToggle: () => void;
}

interface MascotState {
  expression: string;
  message: string;
  animation: string;
  color: string;
  dogBreed: string;
}

interface MascotProgress {
  level: number;
  experience: number;
  unlockedBreeds: string[];
  totalInteractions: number;
  favoriteMessages: string[];
}

// Simple localStorage hook replacement
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// Dog breeds that unlock with levels
const dogBreeds = {
  1: ['🐕'], // Generic dog
  2: ['🐕', '🐶'], // Puppy
  3: ['🐕', '🐶', '🦮'], // Guide dog
  4: ['🐕', '🐶', '🦮', '🐕‍🦺'], // Service dog
  5: ['🐕', '🐶', '🦮', '🐕‍🦺', '🐩'], // Poodle
  6: ['🐕', '🐶', '🦮', '🐕‍🦺', '🐩', '🐺'], // Wolf (special)
};

// Dog expressions for different moods
const dogExpressions = {
  happy: ['😄', '😊', '🥳', '😍'],
  excited: ['🤩', '😆', '🎉', '⭐'],
  calm: ['😌', '😇', '🧘‍♂️', '💙'],
  supportive: ['🤗', '💪', '❤️', '🌟'],
  playful: ['😜', '🤪', '🎾', '🦴'],
  sleepy: ['😴', '💤', '🌙', '⭐']
};

// Mood-responsive messages with MindHaven personality
const dogMessages = {
  anxious: [
    "I can sense your worry. Remember, you're safe here in MindHaven! 🏡💙",
    "Anxiety is like clouds - they pass. Let's breathe together! 🌤️",
    "I'm right here with you! You're stronger than you know! 💪",
    "Your mind is a haven of peace. Let's find that calm space! 🧘‍♀️"
  ],
  stressed: [
    "Feeling overwhelmed? MindHaven is your sanctuary for relief! 🌿",
    "Stress is temporary, but your peace is permanent. Let's rediscover it! ☮️",
    "Time for a mental break! I'll guide you to tranquility! 🦮",
    "Even the busiest minds need rest. Welcome to your peaceful haven! 🏠"
  ],
  frustrated: [
    "I feel that frustration too! Let's channel it into positive energy! ⚡",
    "Frustration shows you care deeply. That's actually beautiful! ❤️",
    "In MindHaven, we transform challenges into growth! 🌱",
    "Your feelings are valid. Let's work through this together! 🤝"
  ],
  sad: [
    "I see your sadness and I'm here to sit with you. You're not alone! 🤗",
    "Even in MindHaven, we honor all emotions. Sadness has wisdom! 🌙",
    "Your heart is healing. Sometimes we need to feel to heal! 💙",
    "I'm your loyal companion through every feeling! 🐕‍🦺"
  ],
  tired: [
    "Rest is a sacred act in MindHaven. Your body is asking for care! 😴",
    "Tired souls need gentle havens. You've found yours! 🏡",
    "Fatigue is your body's wisdom speaking. Let's listen together! 👂",
    "In this haven, rest is not laziness - it's self-love! 💕"
  ],
  neutral: [
    "Balanced energy is the foundation of MindHaven! You're centered! ⚖️",
    "This peaceful moment is precious. You're exactly where you need to be! 🌸",
    "Neutral is powerful - it's the calm before beautiful growth! 🌱",
    "Your inner stability is inspiring! This is true wellness! ✨"
  ],
  content: [
    "Your contentment lights up MindHaven! This is pure joy! ☀️",
    "I can feel your inner peace radiating. You're glowing! ✨",
    "This serene energy is what MindHaven is all about! 🕊️",
    "Content and grateful - you've found your inner haven! 🏠💙"
  ],
  happy: [
    "Your joy is contagious! MindHaven is celebrating with you! 🎉",
    "Happiness looks beautiful on you! Keep shining! ⭐",
    "This radiant energy is what dreams are made of! 🌈",
    "Your smile makes MindHaven even more beautiful! 😊💙"
  ]
};

// Score-based encouragement with MindHaven themes
const scoreMessages = {
  high: [
    "Outstanding! You're mastering the art of wellness! 🏆",
    "Incredible progress! MindHaven is proud of you! 🌟",
    "You're absolutely amazing! That was phenomenal! ⭐",
    "Excellence achieved! You're a wellness champion! 👑"
  ],
  medium: [
    "Steady progress! Every step in MindHaven counts! 👣",
    "You're growing beautifully! Keep nurturing your wellness! 🌱",
    "Consistent effort is the path to peace! Well done! 🛤️",
    "Your journey in MindHaven is inspiring! Keep going! 💪"
  ],
  low: [
    "Every beginning is precious in MindHaven! You're learning! 🌱",
    "You showed up - that's the most important step! 💙",
    "Growth takes time, and you're on the right path! 🛤️",
    "I believe in your journey! Tomorrow brings new possibilities! 🌅"
  ]
};

// Level-up messages with MindHaven excitement
const levelUpMessages = [
  "🎉 Level up in MindHaven! Your wellness journey is flourishing!",
  "⭐ New level achieved! You're becoming a master of inner peace!",
  "🚀 MindHaven celebrates your growth! Onward and upward!",
  "💎 Level up! Your commitment to wellness is inspiring!",
  "👑 New heights reached! You're the champion of your own story!"
];

// Random pep talks with MindHaven wisdom
const dogPepTalks = [
  "In MindHaven, every moment is a chance for peace! 🏡",
  "Your mind is a garden, and MindHaven helps it bloom! 🌺",
  "Be gentle with yourself - you're in a safe space here! 💙",
  "MindHaven believes in your infinite potential for growth! ∞",
  "You're exactly where you need to be on your wellness journey! 🛤️",
  "In this haven, self-compassion is your superpower! 💪",
  "Your presence in MindHaven makes it even more beautiful! ✨",
  "Remember: you're not just healing, you're thriving! 🌟"
];

export const WellnessMascot: React.FC<MascotProps> = ({
  userLevel,
  currentMood,
  recentScore,
  isVisible,
  onToggle
}) => {
  const [mascotState, setMascotState] = useState<MascotState>({
    expression: '😊',
    message: "Hello! I'm your wellness companion!",
    animation: 'bounce',
    color: 'from-indigo-400 to-purple-400',
    dogBreed: '🐕'
  });

  const [showMessage, setShowMessage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [mascotProgress, setMascotProgress] = useLocalStorage<MascotProgress>('mascot-progress', {
    level: 1,
    experience: 0,
    unlockedBreeds: ['🐕'],
    totalInteractions: 0,
    favoriteMessages: []
  });

  const sounds = useSoundEffects();

  // Update mascot based on user state
  const updateMascotState = React.useCallback(() => {
    const newState: Partial<MascotState> = {};
    
    // Choose dog breed based on level
    const availableBreeds = dogBreeds[Math.min(userLevel, 6) as keyof typeof dogBreeds] || dogBreeds[1];
    newState.dogBreed = availableBreeds[Math.floor(Math.random() * availableBreeds.length)];
    
    if (currentMood) {
      // Mood-specific expressions and colors (MindHaven theme)
      if (currentMood === 'happy' || currentMood === 'content') {
        newState.expression = dogExpressions.happy[Math.floor(Math.random() * dogExpressions.happy.length)];
        newState.color = 'from-indigo-400 to-purple-400';
        newState.animation = 'bounce';
      } else if (currentMood === 'anxious' || currentMood === 'stressed') {
        newState.expression = dogExpressions.supportive[Math.floor(Math.random() * dogExpressions.supportive.length)];
        newState.color = 'from-blue-400 to-indigo-400';
        newState.animation = 'pulse';
      } else if (currentMood === 'sad' || currentMood === 'tired') {
        newState.expression = dogExpressions.calm[Math.floor(Math.random() * dogExpressions.calm.length)];
        newState.color = 'from-purple-400 to-pink-400';
        newState.animation = 'gentle';
      } else {
        newState.expression = dogExpressions.playful[Math.floor(Math.random() * dogExpressions.playful.length)];
        newState.color = 'from-indigo-400 to-purple-400';
        newState.animation = 'float';
      }

      // Choose appropriate message
      const moodMessageArray = dogMessages[currentMood as keyof typeof dogMessages] || dogPepTalks;
      newState.message = moodMessageArray[Math.floor(Math.random() * moodMessageArray.length)];
    } else if (recentScore !== undefined) {
      // Score-based response
      let scoreCategory: 'high' | 'medium' | 'low' = 'medium';
      if (recentScore >= 80) scoreCategory = 'high';
      else if (recentScore < 50) scoreCategory = 'low';

      const scoreMessageArray = scoreMessages[scoreCategory];
      newState.message = scoreMessageArray[Math.floor(Math.random() * scoreMessageArray.length)];
      newState.expression = dogExpressions.excited[Math.floor(Math.random() * dogExpressions.excited.length)];
      
      if (scoreCategory === 'high') {
        newState.color = 'from-indigo-400 to-purple-400';
        newState.animation = 'celebrate';
      } else if (scoreCategory === 'low') {
        newState.color = 'from-purple-400 to-pink-400';
        newState.animation = 'encourage';
      }
    } else {
      // Random pep talk
      newState.message = dogPepTalks[Math.floor(Math.random() * dogPepTalks.length)];
      newState.expression = dogExpressions.playful[Math.floor(Math.random() * dogExpressions.playful.length)];
      newState.color = 'from-indigo-400 to-purple-400';
      newState.animation = 'float';
    }

    setMascotState(prev => ({ ...prev, ...newState }));
  }, [currentMood, recentScore, userLevel]);

  useEffect(() => {
    updateMascotState();
  }, [updateMascotState]);

  const levelUp = React.useCallback(() => {
    const newBreeds = dogBreeds[Math.min(userLevel, 6) as keyof typeof dogBreeds] || dogBreeds[1];
    
    setMascotProgress(prev => ({
      ...prev,
      level: userLevel,
      experience: prev.experience + 100,
      unlockedBreeds: newBreeds
    }));

    // Show level up animation
    setMascotState(prev => ({
      ...prev,
      expression: '🎉',
      message: levelUpMessages[Math.floor(Math.random() * levelUpMessages.length)],
      animation: 'levelUp',
      color: 'from-indigo-400 to-purple-400'
    }));

    if (soundEnabled) {
      sounds.success();
    }

    setShowMessage(true);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  }, [userLevel, setMascotProgress, soundEnabled, sounds]);

  // Level up detection
  useEffect(() => {
    if (userLevel > mascotProgress.level) {
      levelUp();
    }
  }, [userLevel, mascotProgress.level, levelUp]);

  const handleMascotClick = () => {
    setMascotProgress(prev => ({
      ...prev,
      totalInteractions: prev.totalInteractions + 1,
      experience: prev.experience + 10
    }));

    updateMascotState();
    setShowMessage(true);
    setIsAnimating(true);

    if (soundEnabled) {
      sounds.notification();
    }

    setTimeout(() => {
      setShowMessage(false);
      setIsAnimating(false);
    }, 4000);
  };

  const getAnimationVariants = () => {
    switch (mascotState.animation) {
      case 'bounce':
        return {
          animate: {
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }
        };
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.15, 1],
            transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
          }
        };
      case 'gentle':
        return {
          animate: {
            y: [0, -8, 0],
            transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        };
      case 'float':
        return {
          animate: {
            y: [0, -10, 0],
            x: [0, 3, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        };
      case 'celebrate':
        return {
          animate: {
            rotate: [0, 15, -15, 0],
            scale: [1, 1.3, 1],
            y: [0, -20, 0],
            transition: { duration: 0.6, repeat: 4 }
          }
        };
      case 'encourage':
        return {
          animate: {
            x: [0, -5, 5, 0],
            transition: { duration: 0.4, repeat: 3 }
          }
        };
      case 'levelUp':
        return {
          animate: {
            scale: [1, 1.6, 1.2, 1],
            rotate: [0, 360],
            y: [0, -25, 0],
            transition: { duration: 2.5, ease: "easeOut" }
          }
        };
      default:
        return {
          animate: {
            y: [0, -8, 0],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        };
    }
  };

  if (!isVisible) {
    return (
      <motion.button
        className="fixed bottom-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full shadow-lg z-40"
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Open MindHaven Companion"
      >
        <Heart className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {/* Message Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="mb-4 max-w-xs"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-indigo-200 relative">
              <p className="text-sm text-indigo-900 font-medium">{mascotState.message}</p>
              
              {/* Level indicator */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-indigo-100">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-indigo-500" />
                  <span className="text-xs text-indigo-700">Level {mascotProgress.level}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-indigo-700">{mascotProgress.experience} XP</span>
                </div>
              </div>

              {/* Speech bubble tail */}
              <div className="absolute bottom-0 left-6 transform translate-y-full">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dog Mascot */}
      <div className="relative">
        <motion.div
          className={`w-16 h-16 bg-gradient-to-br ${mascotState.color} rounded-full shadow-lg cursor-pointer flex items-center justify-center text-2xl relative overflow-hidden`}
          onClick={handleMascotClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          {...getAnimationVariants()}
        >
          {/* Dog Breed */}
          <span className="relative z-10 text-3xl">{mascotState.dogBreed}</span>
          
          {/* Expression overlay */}
          <div className="absolute top-1 right-1 text-lg">
            {mascotState.expression}
          </div>
          
          {/* Sparkle effects for level ups */}
          {isAnimating && (
            <div className="absolute inset-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${15 + Math.random() * 70}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    y: [0, -25],
                    x: [0, (Math.random() - 0.5) * 20],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.15,
                    repeat: 2,
                  }}
                />
              ))}
            </div>
          )}

          {/* Level badge */}
          <div className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {mascotProgress.level}
          </div>
        </motion.div>

        {/* Controls */}
        <div className="absolute -top-2 -right-2 flex flex-col space-y-1">
          <motion.button
            className="bg-white text-indigo-600 p-1 rounded-full shadow-md"
            onClick={() => setSoundEnabled(!soundEnabled)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
          </motion.button>
          
          <motion.button
            className="bg-white text-indigo-600 p-1 rounded-full shadow-md"
            onClick={onToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Hide MindHaven companion"
          >
            <X className="w-3 h-3" />
          </motion.button>
        </div>

        {/* Experience bar */}
        <div className="absolute -bottom-2 left-0 right-0 bg-indigo-200 rounded-full h-1">
          <motion.div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(mascotProgress.experience % 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};
