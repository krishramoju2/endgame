import React, { createContext, useState, useContext, ReactNode, useMemo } from "react";
import { Career, CAREERS } from "../data/careers";

// ==================== Type Definitions ====================
type Speaker = "user" | "expert";

interface ChatMessage {
  speaker: Speaker;
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
  addChatMessage: (msg: Omit<ChatMessage, "timestamp">) => void;
  clearChatHistory: () => void;
  analytics: Record<string, AnalyticsData>;
  recordInteraction: (
    careerId: string,
    question: string,
    response: string,
    rating: number
  ) => void;
  theme: string;
  setTheme: (theme: string) => void;
  currentCareer: Career | undefined;
}

// ==================== Context Creation ====================
const AppContext = createContext<AppContextType | undefined>(undefined);

// ==================== Provider Component ====================
export function AppProvider({ children }: { children: ReactNode }) {
  // State Management
  const [currentCareerId, setCurrentCareerId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [theme, setTheme] = useState<string>("light");

  // Derived State
  const currentCareer = useMemo(() => 
    CAREERS.find((c) => c.id === currentCareerId),
    [currentCareerId]
  );

  // Analytics Initialization
  const [analytics, setAnalytics] = useState<Record<string, AnalyticsData>>(() => {
    return CAREERS.reduce<Record<string, AnalyticsData>>((acc, career) => {
      acc[career.id] = {
        totalQuestions: 0,
        avgRating: 0,
        lastUsed: null,
        responseCounts: new Array(career.responses.length).fill(0),
        interactions: [],
      };
      return acc;
    }, {});
  });

  // ==================== Action Handlers ====================
  const addChatMessage = (msg: Omit<ChatMessage, "timestamp">) => {
    setChatHistory((prev) => [
      ...prev,
      {
        ...msg,
        timestamp: Date.now(),
      },
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
    const careerExists = CAREERS.some((c) => c.id === careerId);
    if (!careerExists) return;

    setAnalytics((prev) => {
      const careerData = prev[careerId];
      const career = CAREERS.find((c) => c.id === careerId);
      const responseIndex = career?.responses.indexOf(response) ?? -1;

      // Calculate new analytics values
      const newTotal = careerData.totalQuestions + 1;
      const newAvg = (careerData.avgRating * careerData.totalQuestions + rating) / newTotal;

      // Update response counts
      const newResponseCounts = [...careerData.responseCounts];
      if (responseIndex >= 0) {
        newResponseCounts[responseIndex] += 1;
      }

      // Create new interaction
      const newInteraction: Interaction = {
        timestamp: new Date().toISOString(),
        question,
        response,
        rating,
      };

      return {
        ...prev,
        [careerId]: {
          ...careerData,
          totalQuestions: newTotal,
          avgRating: newAvg,
          lastUsed: new Date().toISOString(),
          responseCounts: newResponseCounts,
          interactions: [...careerData.interactions, newInteraction],
        },
      };
    });
  };

  // ==================== Context Value ====================
  const contextValue = useMemo<AppContextType>(
    () => ({
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
      currentCareer,
    }),
    [currentCareerId, chatHistory, analytics, theme, currentCareer]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// ==================== Custom Hook ====================
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
