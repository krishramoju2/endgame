import React from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../contexts/AppContext";
import Layout from "../../components/Layout";
import ChatBubble from "../../components/ChatBubble";
import ChatInput from "../../components/ChatInput";
import Dashboard from "../../components/Dashboard";
import Head from "next/head";

export default function CareerPage() {
  const router = useRouter();
  const {
    currentCareerId,
    setCurrentCareerId,
    chatHistory,
    currentCareer,
    clearChatHistory
  } = useAppContext();

  const handleBackClick = () => {
    setCurrentCareerId(null);
    // Optional: Scroll to top when going back
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!currentCareerId) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">No Career Selected</h2>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Browse Careers
          </button>
        </div>
      </Layout>
    );
  }

  if (!currentCareer) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">Career Not Found</h2>
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Careers
          </button>
        </div>
      </Layout>
    );
  }

  const formattedTitle = currentCareer.id
    .replace(/-/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <>
      <Head>
        <title>{`${formattedTitle} Assistant | CareerOS`}</title>
        <meta 
          name="description" 
          content={`Get expert advice on ${formattedTitle.toLowerCase()} careers`} 
        />
      </Head>

      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={handleBackClick}
            className="flex items-center mb-6 text-blue-600 hover:text-blue-800 transition"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Careers
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{currentCareer.icon}</span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {formattedTitle} Assistant
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentCareer.description}
            </p>

            <div className="flex justify-end mb-4">
              <button
                onClick={clearChatHistory}
                className="text-sm text-red-500 hover:text-red-700 transition"
                disabled={chatHistory.length === 0}
              >
                Clear Conversation
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p className="text-lg">No conversation yet.</p>
                    <p className="mt-2">Ask your first question to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatHistory.map(({ speaker, message }, i) => (
                      <ChatBubble 
                        key={`${speaker}-${i}-${message.substring(0, 10)}`} 
                        speaker={speaker} 
                        message={message} 
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <ChatInput />
              </div>
            </div>

            <div className="lg:col-span-1">
              <Dashboard />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
