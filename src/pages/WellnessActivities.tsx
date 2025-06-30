import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gamepad2, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MoodSelector } from '../components/wellness/MoodSelector';
import { GameSelector } from '../components/wellness/GameSelector';
import { SessionComplete } from '../components/wellness/SessionComplete';
import { ProgressDashboard } from '../components/wellness/ProgressDashboard';
import { WellnessMascot } from '../components/wellness/WellnessMascot';
import { BreathingGame } from '../components/wellness/games/BreathingGame';
import { BubblePopGame } from '../components/wellness/games/BubblePopGame';
import { DrawingPad } from '../components/wellness/games/DrawingPad';
import { AngerSmashGame } from '../components/wellness/games/AngerSmashGame';
import { StressSqueezeGame } from '../components/wellness/games/StressSqueezeGame';
import { ColorTherapyGame } from '../components/wellness/games/ColorTherapyGame';
import { DanceTherapyGame } from '../components/wellness/games/DanceTherapyGame';
import { GratitudeTreeGame } from '../components/wellness/games/GratitudeTreeGame';
import { MeditationGardenGame } from '../components/wellness/games/MeditationGardenGame';
import { JoyBurstGame } from '../components/wellness/games/JoyBurstGame';
import { ZenGardenGame } from '../components/wellness/games/ZenGardenGame';
import { EnergyBounceGame } from '../components/wellness/games/EnergyBounceGame';
import { VirtualHugGame } from '../components/wellness/games/VirtualHugGame';
import { KindnessCardsGame } from '../components/wellness/games/KindnessCardsGame';
import { SmileMirrorGame } from '../components/wellness/games/SmileMirrorGame';
import { RhythmTapGame } from '../components/wellness/games/RhythmTapGame';
import { WordFlowGame } from '../components/wellness/games/WordFlowGame';
import { MindfulMazeGame } from '../components/wellness/games/MindfulMazeGame';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Mood, Game, GameSession, UserProgress } from '../types/wellness';

type AppState = 'home' | 'mood-select' | 'game-select' | 'playing' | 'complete' | 'progress';

const WellnessActivities: React.FC = () => {
  const navigate = useNavigate();
  const [appState, setAppState] = useState<AppState>('home');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  
  const [sessions, setSessions] = useLocalStorage<GameSession[]>('mindgames-sessions', []);
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>('mindgames-progress', {
    totalSessions: 0,
    favoriteGame: '',
    averageStressReduction: 0,
    streakDays: 0,
    achievements: []
  });

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setAppState('game-select');
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setAppState('playing');
  };

  const handleGameComplete = (score: number) => {
    setCurrentScore(score);
    
    if (selectedMood && selectedGame) {
      const newSession: GameSession = {
        id: Date.now().toString(),
        mood: selectedMood,
        gameType: selectedGame.name,
        duration: 5,
        score,
        timestamp: new Date().toISOString(),
        stressReduction: Math.floor(Math.random() * 3) + 3
      };
      
      setSessions(prev => [newSession, ...prev]);
      setUserProgress(prev => ({
        ...prev,
        totalSessions: prev.totalSessions + 1,
        averageStressReduction: Math.round(
          (prev.averageStressReduction * prev.totalSessions + newSession.stressReduction) / 
          (prev.totalSessions + 1)
        )
      }));
    }
    
    setAppState('complete');
  };

  const handleSessionEnd = () => {
    setAppState('home');
    setSelectedMood(null);
    setSelectedGame(null);
    setCurrentScore(0);
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    const gameProps = {
      onComplete: handleGameComplete,
      onExit: () => setAppState('game-select'),
      onBack: () => setAppState('game-select')
    };

    switch (selectedGame.id) {
      case 'breathing': return <BreathingGame {...gameProps} />;
      case 'bubble-pop': return <BubblePopGame {...gameProps} />;
      case 'drawing': return <DrawingPad {...gameProps} />;
      case 'anger-smash': return <AngerSmashGame {...gameProps} />;
      case 'stress-squeeze': return <StressSqueezeGame {...gameProps} />;
      case 'color-therapy': return <ColorTherapyGame {...gameProps} />;
      case 'dance-therapy': return <DanceTherapyGame {...gameProps} />;
      case 'gratitude-tree': return <GratitudeTreeGame {...gameProps} />;
      case 'meditation-garden': return <MeditationGardenGame {...gameProps} />;
      case 'joy-burst': return <JoyBurstGame {...gameProps} />;
      case 'zen-garden': return <ZenGardenGame {...gameProps} />;
      case 'energy-bounce': return <EnergyBounceGame {...gameProps} />;
      case 'virtual-hug': return <VirtualHugGame {...gameProps} />;
      case 'kindness-cards': return <KindnessCardsGame {...gameProps} />;
      case 'smile-mirror': return <SmileMirrorGame {...gameProps} />;
      case 'rhythm-tap': return <RhythmTapGame {...gameProps} />;
      case 'word-flow': return <WordFlowGame {...gameProps} />;
      case 'mindful-maze': return <MindfulMazeGame {...gameProps} />;
      default: return <BreathingGame {...gameProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">MindGames</span>
            </div>
            
            <Button 
              onClick={() => navigate("/home")}
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {appState === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* Header */}
              <div className="mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-8">
                  <img src="/logo.png" alt="Mindhaven Logo" className="w-4 h-4 mr-2 object-contain" />
                  Interactive Wellness Activities
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Welcome to
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                    {" "}MindGames
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Interactive wellness activities designed to help you manage stress, improve mood, and build emotional resilience through engaging gameplay.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Gamepad2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-2">{userProgress.totalSessions}</div>
                  <div className="text-gray-600">Sessions Completed</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-2">{userProgress.averageStressReduction}/10</div>
                  <div className="text-gray-600">Avg. Stress Relief</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-2">{userProgress.streakDays}</div>
                  <div className="text-gray-600">Day Streak</div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  onClick={() => setAppState('mood-select')}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
                >
                  Start Activity
                </Button>
                
                <Button
                  onClick={() => setAppState('progress')}
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-full text-lg font-semibold"
                >
                  View Progress
                </Button>
              </div>
            </motion.div>
          )}

          {appState === 'mood-select' && (
            <MoodSelector
              selectedMood={selectedMood}
              onMoodSelect={handleMoodSelect}
            />
          )}

          {appState === 'game-select' && selectedMood && (
            <GameSelector
              selectedMood={selectedMood}
              onGameSelect={handleGameSelect}
            />
          )}

          {appState === 'playing' && renderGame()}

          {appState === 'complete' && selectedMood && selectedGame && (
            <SessionComplete
              mood={selectedMood}
              game={selectedGame}
              score={currentScore}
              onRestart={() => setAppState('game-select')}
              onHome={handleSessionEnd}
            />
          )}

          {appState === 'progress' && (
            <ProgressDashboard
              sessions={sessions as any} // Cast for now, ideally migrate types
              progress={userProgress as any}
              onBack={() => setAppState('home')}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Wellness Mascot */}
      <WellnessMascot
        userLevel={1}
        isVisible={true}
        onToggle={() => {}}
      />
    </div>
  );
};

export default WellnessActivities;
