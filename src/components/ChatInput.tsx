import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

export default function ChatInput() {
  const { currentCareerId, recordInteraction, addChatMessage, careers, chatHistory } = useAppContext();
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(3);

  if (!currentCareerId) return null;

  const career = careers.find((c) => c.id === currentCareerId);
  if (!career) return null;

  const onSend = () => {
    if (!input.trim()) return;
    // Pick a random response from career bot
    const response =
      career.responses[Math.floor(Math.random() * career.responses.length)];

    // Log user question and expert response
    addChatMessage({ speaker: "user", message: input.trim() });
    addChatMessage({ speaker: "expert", message: response });
    // Record analytics
    recordInteraction(currentCareerId, input.trim(), response, rating);
    setInput("");
  };

  return (

       setInput(e.target.value)}
        placeholder="Type your question..."
      />

        Ask Expert



          Rate response:

         setRating(Number(e.target.value))}
        />
        {rating}


  );
}
