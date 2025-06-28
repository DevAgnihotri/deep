export interface Mood {
  id: string;
  name: string;
  color: string;
  gradient: string;
  icon: string;
  intensity: number;
  description: string;
}

export interface GameSession {
  id: string;
  mood: Mood;
  gameType: string;
  duration: number;
  score: number;
  timestamp: Date;
  effectiveness: number;
}

export interface UserProgress {
  totalSessions: number;
  favoriteGame: string;
  averageStressReduction: number;
  streakDays: number;
  achievements: string[];
}

export interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  suitableForMoods: string[];
  category: 'breathing' | 'interactive' | 'creative' | 'rhythmic' | 'cognitive' | 'social' | 'celebration';
}

// Enhanced types for AI and social features
export interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: string;
  participants: number;
  completed: boolean;
  points: number;
  deadline: Date;
}

export interface WellnessBuddy {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  lastActive: Date;
  supportLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface AIMoodAnalysis {
  detectedMood: Mood;
  confidence: number;
  insights: string[];
  recommendations: string[];
  timestamp: Date;
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: unknown;
    webkitSpeechRecognition: unknown;
  }
  
  interface SpeechRecognitionEvent {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionErrorEvent {
    error: string;
  }
}
