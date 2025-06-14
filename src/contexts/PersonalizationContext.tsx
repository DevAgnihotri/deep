import { createContext, useContext, useState, ReactNode } from 'react';

interface QuizResponses {
  mood?: string;
  sleep?: string;
  wakeTime?: string;
  breakfast?: string;
  lunch?: string;
  pain?: string;
  exercise?: string;
  energy?: string;
  stress?: string;
  goals?: string;
}

interface PersonalizationInsights {
  primaryConcern: string;
  mood: string;
  experience: string;
  contentPreference: string;
  preferredTime: string;
  recommendations: {
    therapyType: string;
    contentTypes: string[];
    urgency: string;
    metrics: {
      focus: string[];
      priority: string[];
    };
  };
}

interface PersonalizationContextType {
  quizResponses: QuizResponses;
  insights: PersonalizationInsights | null;
  isQuizCompleted: boolean;
  setQuizResponses: (responses: QuizResponses) => void;
  setInsights: (insights: PersonalizationInsights) => void;
  markQuizCompleted: () => void;
  resetPersonalization: () => void;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const PersonalizationProvider = ({ children }: { children: ReactNode }) => {
  const [quizResponses, setQuizResponses] = useState<QuizResponses>({});
  const [insights, setInsights] = useState<PersonalizationInsights | null>(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const markQuizCompleted = () => setIsQuizCompleted(true);
  
  const resetPersonalization = () => {
    setQuizResponses({});
    setInsights(null);
    setIsQuizCompleted(false);
  };

  return (
    <PersonalizationContext.Provider
      value={{
        quizResponses,
        insights,
        isQuizCompleted,
        setQuizResponses,
        setInsights,
        markQuizCompleted,
        resetPersonalization,
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};
