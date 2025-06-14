// Test Firebase Google Auth Configuration
// Open browser console and run: testGoogleAuthConfig()

export const testGoogleAuthConfig = async () => {
  console.log('🔥 Testing Google Auth Configuration...');
  
  try {
    // Import Firebase (adjust path if needed)
    const { auth, googleProvider } = await import('../lib/firebase');
    
    console.log('✅ Firebase Auth initialized:', !!auth);
    console.log('✅ Google Provider configured:', !!googleProvider);
    console.log('📋 Project ID:', auth.app.options.projectId);
    console.log('📋 Auth Domain:', auth.app.options.authDomain);
    console.log('📋 Google Provider Scopes:', googleProvider.scopes);
    
    // Test if we can get auth methods
    const methods = await auth.fetchSignInMethodsForEmail('test@example.com').catch(() => []);
    console.log('📋 Available sign-in methods work:', methods.length >= 0);
    
    return {
      success: true,
      projectId: auth.app.options.projectId,
      authDomain: auth.app.options.authDomain
    };
  } catch (error) {
    console.error('❌ Configuration test failed:', error);
    return { success: false, error };
  }
};

// Auto-run test in development
if (typeof window !== 'undefined') {
  (window as any).testGoogleAuthConfig = testGoogleAuthConfig;
  console.log('🔧 Run testGoogleAuthConfig() in console to test Firebase setup');
}
