import React from "react";
import { useAppContext } from "../../contexts/AppContext";
import Layout from "../../components/Layout";
import ChatBubble from "../../components/ChatBubble";
import ChatInput from "../../components/ChatInput";
import Dashboard from "../../components/Dashboard";

export default function CareerPage() {
  const {
    careers,
    currentCareerId,
    setCurrentCareerId,
    chatHistory,
  } = useAppContext();

  if (!currentCareerId) {
    // Redirect or fallback to home can be implemented here
    return (

        Please select a career from the home page.

    );
  }

  const career = careers.find((c) => c.id === currentCareerId);
  if (!career) {
    return (

        Career not found.

    );
  }

  return (

       setCurrentCareerId(null)}
        className="mb-4 underline text-blue-600"
      >
        &larr; Back to careers



          {career.icon} {career.id.replace(/-/g, " ").toUpperCase()} Assistant

        {career.description}




          {chatHistory.length === 0 && (
            No conversation yet.
          )}
          {chatHistory.map(({ speaker, message }, i) => (

          ))}







  );
}
