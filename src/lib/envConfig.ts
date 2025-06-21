// Environment Variables Test Utility
// This file helps verify that all environment variables are properly loaded

export const envConfig = {
  // Firebase
  firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
  // Google OAuth
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  
  // App Config
  appName: import.meta.env.VITE_APP_NAME,
  appEnv: import.meta.env.VITE_APP_ENV,
  
  // Development info
  isDev: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE
};

// Function to log environment status (for debugging)
export const logEnvironmentStatus = () => {
  console.log('🔧 Environment Configuration:');
  console.log('Firebase API Key:', envConfig.firebaseApiKey ? '✅ Loaded' : '❌ Missing');
  console.log('Google Client ID:', envConfig.googleClientId ? '✅ Loaded' : '❌ Missing');
  console.log('App Name:', envConfig.appName || 'Using default');
  console.log('Environment:', envConfig.mode);
  console.log('Is Development:', envConfig.isDev);
};

// Validate required environment variables
export const validateEnvironment = () => {
  const required = {
    'VITE_FIREBASE_API_KEY': envConfig.firebaseApiKey,
    'VITE_GOOGLE_CLIENT_ID': envConfig.googleClientId
  };
  
  const missing = Object.entries(required)
    .filter(([key, value]) => !value)
    .map(([key]) => key);
    
  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing);
    console.warn('App will use fallback values but consider setting these in .env');
  } else {
    console.log('✅ All required environment variables are loaded!');
  }
  
  return missing.length === 0;
};

export default envConfig;
