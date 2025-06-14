// Firebase Configuration Test
// Run this in browser console to test Firebase setup

import { auth, googleProvider } from './firebase';

export const testFirebaseConfig = () => {
  console.log('🔥 Firebase Configuration Test');
  console.log('Auth instance:', auth);
  console.log('Current user:', auth.currentUser);
  console.log('Google provider:', googleProvider);
  console.log('Project ID:', auth.app.options.projectId);
  console.log('Auth domain:', auth.app.options.authDomain);
  
  // Test if Google provider is configured
  console.log('Google provider scopes:', googleProvider.scopes);
  console.log('Google provider custom parameters:', googleProvider.customParameters);
  
  return {
    projectId: auth.app.options.projectId,
    authDomain: auth.app.options.authDomain,
    isConfigured: !!auth.app.options.projectId
  };
};

// Call this function in browser console to debug
// testFirebaseConfig();
