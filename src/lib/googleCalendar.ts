// Google Calendar API Integration
import { useEffect, useState } from 'react';

// Define Google API scopes needed for calendar integration
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// These credentials would typically come from environment variables
// For production, use .env files and ensure they're added to .gitignore
const API_KEY = ''; // No API key needed for this OAuth implementation
const CLIENT_ID = '592394375846-ftp9cnlamo37lm00r1nd6167j0ie0bo7.apps.googleusercontent.com';

export interface GoogleCalendarEvent {
  summary: string;
  location?: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: {
    email: string;
    name?: string;
  }[];
  conferenceData?: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
    };
  };
  reminders?: {
    useDefault: boolean;
    overrides?: {
      method: string;
      minutes: number;
    }[];
  };
}

// Initialize Google API client
export const initGoogleClient = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
            discoveryDocs: [DISCOVERY_DOC],
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    };
    script.onerror = (error) => reject(error);
    document.body.appendChild(script);
  });
};

// Check if user is signed in
export const isSignedIn = (): boolean => {
  return window.gapi.auth2?.getAuthInstance().isSignedIn.get() || false;
};

// Sign in
export const signIn = async (): Promise<void> => {
  try {
    await window.gapi.auth2.getAuthInstance().signIn();
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await window.gapi.auth2.getAuthInstance().signOut();
  } catch (error) {
    console.error('Error signing out from Google:', error);
    throw error;
  }
};

// Create a calendar event with Google Meet
export const createCalendarEvent = async (event: GoogleCalendarEvent): Promise<string> => {
  try {
    // Add Google Meet to the event
    const eventWithMeet = {
      ...event,
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
      resource: eventWithMeet,
    });

    return response.result;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw error;
  }
};

// Custom hook for Google Calendar integration
export const useGoogleCalendar = () => {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initGoogle = async () => {
      try {
        await initGoogleClient();
        setIsReady(true);
        
        // Check if user is already signed in
        const signedIn = isSignedIn();
        setIsAuthenticated(signedIn);
        
        // Set up auth change listener
        window.gapi.auth2?.getAuthInstance().isSignedIn.listen((isSignedIn) => {
          setIsAuthenticated(isSignedIn);
        });
      } catch (err) {
        setError(err as Error);
      }
    };

    initGoogle();
  }, []);

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      setError(err as Error);
    }
  };

  const addEventToCalendar = async (event: GoogleCalendarEvent) => {
    try {
      if (!isAuthenticated) {
        await handleSignIn();
      }
      return await createCalendarEvent(event);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    isReady,
    isAuthenticated,
    error,
    signIn: handleSignIn,
    signOut: handleSignOut,
    addEventToCalendar,
  };
};

// Add TypeScript interface for global window object
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gapi: any;
  }
}
