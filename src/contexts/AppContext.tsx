import React, { createContext, useState, useContext, ReactNode, useMemo } from "react";
import { Career, CAREERS } from "../data/careers";

interface ChatMessage {
  speaker: "user" | "expert";
  message: string;
  timestamp: number;
}

interface Interaction {
  timestamp: string;
  question: string;
  response: string;
  rating: number;
}

interface AnalyticsData {
  totalQuestions: number;
  avgRating: number;
  lastUsed: string | null;
  responseCounts: number[];
  interactions: Interaction[];
}

interface AppContextType {
  careers: Career[];
  currentCareerId: string | null;
  setCurrentCareerId: (id: string | null) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, 'timestamp'>) => void;
  clearChatHistory: () => void;
  analytics: Record<string, AnalyticsData>;
  recordInteraction: (careerId: string, question: string, response: string, rating: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  currentCareer: Career | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentCareerId, setCurrentCareerId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [theme, setTheme] = useState<string>("light");

  const currentCareer = useMemo(() => 
    CAREERS.find(c => c.id === currentCareerId),
    [currentCareerId]
  );

  const [analytics, setAnalytics] = useState<Record<string, AnalyticsData>>(() => {
    const initialData: Record<string, AnalyticsData> = {};
    CAREERS.forEach(c => {
      initialData[c.id] = {
        totalQuestions: 0,
        avgRating: 0,
        lastUsed: null,
        responseCounts: new Array(c.responses.length).fill(0),
        interactions: [],
      };
    });
    return initialData;
  });

  const addChatMessage = (msg: Omit<ChatMessage, 'timestamp'>) => {
    setChatHistory(prev => [
      ...prev, 
      {
        ...msg,
        timestamp: Date.now()
      }
    ]);
  };

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  const recordInteraction = (
    careerId: string, 
    question: string, 
    response: string, 
    rating: number
  ) => {
    if (!CAREERS.some(c => c.id === careerId)) return;

    setAnalytics(prev => {
      const careerData = prev[careerId];
      const responseIndex = CAREERS.find(c => c.id === careerId)?.responses.indexOf(response) ?? -1;
      const newTotal = careerData.totalQuestions + 1;
      const newAvg = (careerData.avgRating * careerData.totalQuestions + rating) / newTotal;
      
      const newResponseCounts = [...careerData.responseCounts];
      if (responseIndex >= 0) {
        newResponseCounts[responseIndex] += 1;
      }

      const newInteraction = {
        timestamp: new Date().toISOString(),
        question,
        response,
        rating,
      };

      return {
        ...prev,
        [careerId]: {
          totalQuestions: newTotal,
          avgRating: newAvg,
          lastUsed: new Date().toISOString(),
          responseCounts: newResponseCounts,
          interactions: [...careerData.interactions, newInteraction],
        },
      };
    });
  };

  const contextValue = useMemo(() => ({
    careers: CAREERS,
    currentCareerId,
    setCurrentCareerId,
    chatHistory,
    addChatMessage,
    clearChatHistory,
    analytics,
    recordInteraction,
    theme,
    setTheme,
    currentCareer
  }), [
    currentCareerId,
    chatHistory,
    analytics,
    theme,
    currentCareer
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
