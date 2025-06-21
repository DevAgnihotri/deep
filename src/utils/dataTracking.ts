// Utility functions for tracking user data across the application

export interface CourseProgressData {
  courseId: string;
  courseName: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  lastAccessed: string;
}

export interface SleepContentUsage {
  type: string;
  title: string;
  duration: number;
  timestamp: string;
}

export interface GamePlayData {
  gameTitle: string;
  duration: number;
  timestamp: string;
}

export interface DailyCheckin {
  date: string;
  mood: string;
  energy: number;
  stress: number;
  notes?: string;
  timestamp: string;
}

// Course Progress Tracking
export const trackCourseProgress = (courseId: string, courseName: string, progress: number, completedModules: number, totalModules: number) => {
  const courseData: CourseProgressData = {
    courseId,
    courseName,
    progress,
    completedModules,
    totalModules,
    lastAccessed: new Date().toISOString()
  };
  const existing = localStorage.getItem('courseProgress');
  const courses: CourseProgressData[] = existing ? JSON.parse(existing) : [];
  
  const existingIndex = courses.findIndex(c => c.courseId === courseId);
  if (existingIndex >= 0) {
    courses[existingIndex] = courseData;
  } else {
    courses.push(courseData);
  }

  localStorage.setItem('courseProgress', JSON.stringify(courses));
};

// Sleep Content Usage Tracking
export const trackSleepContent = (type: string, title: string, duration: number = 0) => {
  const sleepData: SleepContentUsage = {
    type,
    title,
    duration,
    timestamp: new Date().toISOString()
  };

  const existing = localStorage.getItem('sleepContentUsage');
  let sessions: SleepContentUsage[] = existing ? JSON.parse(existing) : [];
  sessions.push(sleepData);

  // Keep only last 50 sessions to prevent excessive storage
  if (sessions.length > 50) {
    sessions = sessions.slice(-50);
  }

  localStorage.setItem('sleepContentUsage', JSON.stringify(sessions));
};

// Game Play Tracking
export const trackGamePlay = (gameTitle: string, duration: number = 0) => {
  const gameData: GamePlayData = {
    gameTitle,
    duration,
    timestamp: new Date().toISOString()
  };

  const existing = localStorage.getItem('gamesPlayed');
  let games: GamePlayData[] = existing ? JSON.parse(existing) : [];
  games.push(gameData);

  // Keep only last 50 game sessions
  if (games.length > 50) {
    games = games.slice(-50);
  }

  localStorage.setItem('gamesPlayed', JSON.stringify(games));
};

// Daily Check-in Management
export const saveDailyCheckin = (checkin: Omit<DailyCheckin, 'timestamp'>) => {
  const checkinData: DailyCheckin = {
    ...checkin,
    timestamp: new Date().toISOString()
  };

  const existing = localStorage.getItem('dailyCheckins');
  let checkins: DailyCheckin[] = existing ? JSON.parse(existing) : [];
  
  const todayIndex = checkins.findIndex(c => c.date === checkin.date);
  if (todayIndex >= 0) {
    checkins[todayIndex] = checkinData;
  } else {
    checkins.push(checkinData);
  }

  // Keep only last 90 days of check-ins
  if (checkins.length > 90) {
    checkins = checkins.slice(-90);
  }

  localStorage.setItem('dailyCheckins', JSON.stringify(checkins));
};

// Get user statistics
export const getUserStats = () => {
  const depression = localStorage.getItem('depressionResult');
  const personality = localStorage.getItem('personalityResult');
  const combined = localStorage.getItem('combinedResults');
  const checkins = localStorage.getItem('dailyCheckins');
  const courses = localStorage.getItem('courseProgress');
  const sleep = localStorage.getItem('sleepContentUsage');
  const games = localStorage.getItem('gamesPlayed');

  return {
    hasDepressionData: !!depression,
    hasPersonalityData: !!personality,
    hasCombinedData: !!combined,
    checkinsCount: checkins ? JSON.parse(checkins).length : 0,
    coursesCount: courses ? JSON.parse(courses).length : 0,
    sleepSessionsCount: sleep ? JSON.parse(sleep).length : 0,
    gamesPlayedCount: games ? JSON.parse(games).length : 0,
  };
};

// Initialize demo data for new users (optional)
export const initializeDemoData = () => {
  const stats = getUserStats();
  
  // Only initialize if user has no data at all
  const hasAnyData = stats.hasDepressionData || stats.hasPersonalityData || stats.checkinsCount > 0;
  
  if (!hasAnyData) {
    // Add a few demo check-ins for the past week
    const demoCheckins: DailyCheckin[] = [];
    for (let i = 7; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      demoCheckins.push({
        date: date.toISOString().split('T')[0],
        mood: ['Moderate', 'Good', 'Great'][Math.floor(Math.random() * 3)],
        energy: Math.floor(Math.random() * 4) + 5, // 5-8
        stress: Math.floor(Math.random() * 4) + 3, // 3-6
        timestamp: date.toISOString()
      });
    }
    
    localStorage.setItem('dailyCheckins', JSON.stringify(demoCheckins));
  }
};

// Clear all user data (for reset/logout)
export const clearAllUserData = () => {
  const keys = [
    'depressionResult',
    'personalityResult', 
    'combinedResults',
    'dailyCheckins',
    'courseProgress',
    'sleepContentUsage',
    'gamesPlayed'
  ];
  
  keys.forEach(key => localStorage.removeItem(key));
};
