import { createContext, useContext, ReactNode } from 'react';
import { useGoogleAuth } from '@/lib/googleAuth';

// Define the context type
interface GoogleCalendarContextType {
  isInitialized: boolean;
  isSignedIn: boolean;
  isLoading: boolean;
  error: Error | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  createEventWithMeet: (
    summary: string,
    description: string,
    startDateTime: string,
    endDateTime: string,
    attendees?: { email: string }[]
  ) => Promise<any>;
}

// Create the context
const GoogleCalendarContext = createContext<GoogleCalendarContextType | undefined>(undefined);

// Provider component
export const GoogleCalendarProvider = ({ children }: { children: ReactNode }) => {
  const googleAuth = useGoogleAuth();
  
  return (
    <GoogleCalendarContext.Provider value={googleAuth}>
      {children}
    </GoogleCalendarContext.Provider>
  );
};

// Hook for using the Google Calendar context
export const useGoogleCalendar = (): GoogleCalendarContextType => {
  const context = useContext(GoogleCalendarContext);
  
  if (context === undefined) {
    throw new Error('useGoogleCalendar must be used within a GoogleCalendarProvider');
  }
  
  return context;
};
