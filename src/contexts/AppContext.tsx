import React, { createContext, useState, useContext, ReactNode } from "react";
import { Career } from "../data/careers";

interface ChatMessage {
  speaker: "user" | "expert";
  message: string;
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
  addChatMessage: (msg: ChatMessage) => void;
  analytics: Record;
  recordInteraction: (careerId: string, question: string, response: string, rating: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const initialAnalyticsData = {
  totalQuestions: 0,
  avgRating: 0,
  lastUsed: null,
  responseCounts: [],
  interactions: [],
};

const AppContext = createContext(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const careers: Career[] = require("../data/careers").CAREERS;

  const [currentCareerId, setCurrentCareerId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [theme, setTheme] = useState("light");

  // Store analytics by careerId
  const [analytics, setAnalytics] = useState>(() => {
    const data: Record = {};
    careers.forEach(c => {
      data[c.id] = {
        totalQuestions: 0,
        avgRating: 0,
        lastUsed: null,
        responseCounts: new Array(c.responses.length).fill(0),
        interactions: [],
      };
    });
    return data;
  });

  function addChatMessage(msg: ChatMessage) {
    setChatHistory(prev => [...prev, msg]);
  }

  function recordInteraction(careerId: string, question: string, response: string, rating: number) {
    setAnalytics(prev => {
      const careerData = prev[careerId];
      const idx = careers.find(c => c.id === careerId)?.responses.indexOf(response) ?? -1;
      const newTotal = careerData.totalQuestions + 1;
      const newAvg = (careerData.avgRating * careerData.totalQuestions + rating) / newTotal;
      const newResponseCounts = [...careerData.responseCounts];
      if (idx >= 0) newResponseCounts[idx] += 1;
      return {
        ...prev,
        [careerId]: {
          totalQuestions: newTotal,
          avgRating: newAvg,
          lastUsed: new Date().toISOString(),
          responseCounts: newResponseCounts,
          interactions: [
            ...careerData.interactions,
            {
              timestamp: new Date().toISOString(),
              question,
              response,
              rating,
            },
          ],
        },
      };
    });
  }

  return (

      {children}

  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
