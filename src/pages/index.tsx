import React from "react";
import { useAppContext } from "../contexts/AppContext";
import CareerCard from "../components/CareerCard";
import Layout from "../components/Layout";
import Head from "next/head";
import { Career } from "../data/careers";

export default function Home() {
  const { 
    careers, 
    setCurrentCareerId, 
    theme,
    chatHistory,
    addChatMessage,
    analytics,
    recordInteraction
  } = useAppContext();

  // Get theme colors
  const themeColors = {
    light: {
      bg: "bg-gray-50",
      text: "text-gray-800",
      cardBg: "bg-white",
      border: "border-gray-200"
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-white",
      cardBg: "bg-gray-800",
      border: "border-gray-700"
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-900 to-indigo-800",
      text: "text-white",
      cardBg: "bg-blue-800",
      border: "border-blue-700"
    }
  };

  // Safeguard against undefined/empty careers
  if (!careers || careers.length === 0) {
    return (
      <Layout>
        <div className={`min-h-screen p-8 ${themeColors[theme].bg} ${themeColors[theme].text}`}>
          <h1 className="text-3xl font-bold mb-4">Welcome to CareerOS</h1>
          <p className="text-lg">No career options available at the moment.</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>CareerOS - Career Advisors</title>
        <meta name="description" content="AI-powered career guidance platform" />
      </Head>
      
      <Layout>
        <div className={`min-h-screen p-6 transition-colors duration-300 ${themeColors[theme].bg}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className={`text-4xl font-bold mb-2 ${themeColors[theme].text}`}>
                Welcome to CareerOS
              </h1>
              <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Choose a career expert to begin your journey
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {careers.map((career: Career) => {
                if (!career.id) {
                  console.error("Career missing ID:", career);
                  return null;
                }

                return (
                  <CareerCard
                    key={career.id}
                    career={career}
                    onClick={() => {
                      setCurrentCareerId(career.id);
                      // Reset chat history when changing careers
                      addChatMessage({
                        speaker: "expert",
                        message: `Hello! I'm your ${career.id.replace(/-/g, ' ')} advisor. How can I help you today?`
                      });
                    }}
                  />
                );
              })}
            </div>

            {/* Analytics Preview */}
            <div className={`mt-12 p-6 rounded-lg ${themeColors[theme].cardBg} ${themeColors[theme].border} border`}>
              <h2 className={`text-2xl font-semibold mb-4 ${themeColors[theme].text}`}>
                Platform Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                  <p className="text-sm font-medium">Total Interactions</p>
                  <p className="text-2xl font-bold">
                    {Object.values(analytics).reduce((sum, data) => sum + data.totalQuestions, 0)}
                  </p>
                </div>
                <div className={`p-4 rounded ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                  <p className="text-sm font-medium">Average Rating</p>
                  <p className="text-2xl font-bold">
                    {(() => {
                      const allRatings = Object.values(analytics)
                        .filter(data => data.totalQuestions > 0)
                        .map(data => data.avgRating);
                      return allRatings.length > 0 
                        ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(2)
                        : "0.00";
                    })()}
                  </p>
                </div>
                <div className={`p-4 rounded ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                  <p className="text-sm font-medium">Active Bots</p>
                  <p className="text-2xl font-bold">{careers.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
