// Google OAuth configuration
import { useEffect, useState } from 'react';

// Define scope for Google Calendar API
export const CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
];

// Represents a Google API client configuration
interface GoogleApiConfig {
  apiKey: string;
  clientId: string;
  discoveryDocs: string[];
  scope: string;
}

// For production, this should be loaded from environment variables or .env file
export const GOOGLE_API_CONFIG: GoogleApiConfig = {
  apiKey: '', // No API key needed for this OAuth implementation
  clientId: '592394375846-ftp9cnlamo37lm00r1nd6167j0ie0bo7.apps.googleusercontent.com',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  scope: CALENDAR_SCOPES.join(' ')
};

// Load the Google API client library
export const loadGoogleApiScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://apis.google.com/js/api.js"]')) {
      // Script already loaded
      if (window.gapi) resolve();
      else {
        const checkGapiInterval = setInterval(() => {
          if (window.gapi) {
            clearInterval(checkGapiInterval);
            resolve();
          }
        }, 100);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      loadGapiClient().then(resolve).catch(reject);
    };
    
    script.onerror = (error) => {
      reject(new Error('Failed to load Google API script'));
    };
    
    document.body.appendChild(script);
  });
};

// Load and initialize the GAPI client 
const loadGapiClient = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    window.gapi.load('client:auth2', async () => {
      try {
        await window.gapi.client.init(GOOGLE_API_CONFIG);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
};

// Check if user is signed in to Google
export const isGoogleSignedIn = (): boolean => {
  if (!window.gapi?.auth2) return false;
  try {
    return window.gapi.auth2.getAuthInstance().isSignedIn.get();
  } catch (error) {
    console.error('Error checking Google sign-in status:', error);
    return false;
  }
};

// Sign in to Google
export const signInToGoogle = async (): Promise<void> => {
  if (!window.gapi?.auth2) {
    throw new Error('Google API client not initialized');
  }
  
  try {
    await window.gapi.auth2.getAuthInstance().signIn();
  } catch (error) {
    console.error('Error signing in to Google:', error);
    throw error;
  }
};

// Sign out from Google
export const signOutFromGoogle = async (): Promise<void> => {
  if (!window.gapi?.auth2) {
    throw new Error('Google API client not initialized');
  }
  
  try {
    await window.gapi.auth2.getAuthInstance().signOut();
  } catch (error) {
    console.error('Error signing out from Google:', error);
    throw error;
  }
};

// Create a calendar event with Google Meet integration
export const createCalendarEventWithMeet = async (
  summary: string,
  description: string,
  startDateTime: string,
  endDateTime: string,
  attendees: { email: string }[] = []
): Promise<any> => {
  if (!window.gapi?.client?.calendar) {
    throw new Error('Google Calendar API not loaded');
  }
  
  try {
    const event = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: endDateTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      attendees,
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };
    
    const response = await window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      resource: event
    });
    
    return response.result;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

// Hook for managing Google API authentication state
export const useGoogleAuth = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const initGoogleApi = async () => {
      try {
        setIsLoading(true);
        await loadGoogleApiScript();
        setIsInitialized(true);
        
        if (window.gapi?.auth2) {
          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          
          // Listen for sign-in state changes
          authInstance.isSignedIn.listen((signedIn: boolean) => {
            setIsSignedIn(signedIn);
          });
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error initializing Google API'));
        console.error('Error initializing Google API:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    initGoogleApi();
    
    return () => {
      // Clean up any listeners if needed
    };
  }, []);
  
  const signIn = async () => {
    try {
      await signInToGoogle();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error signing in to Google'));
      throw err;
    }
  };
  
  const signOut = async () => {
    try {
      await signOutFromGoogle();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error signing out from Google'));
      throw err;
    }
  };
  
  return {
    isInitialized,
    isSignedIn,
    isLoading,
    error,
    signIn,
    signOut,
    createEventWithMeet: createCalendarEventWithMeet
  };
};

// Add TypeScript interface for global window object
declare global {
  interface Window {
    gapi: any;
  }
}
