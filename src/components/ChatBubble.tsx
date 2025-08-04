import React from "react";
import { useAppContext } from "../contexts/AppContext";

interface ChatBubbleProps {
  speaker: "user" | "expert";
  message: string;
}

export default function ChatBubble({ speaker, message }: ChatBubbleProps) {
  const { theme } = useAppContext();
  const colors = {
    light: {
      userBg: "#007bff",
      expertBg: "#28a745",
      text: "white",
    },
    dark: {
      userBg: "#00bcd4",
      expertBg: "#ff5722",
      text: "white",
    },
    blue: {
      userBg: "#48dbfb",
      expertBg: "#f368e0",
      text: "white",
    },
  };

  return (

      {speaker === "user" ? "You: " : "Expert: "}
      {message}

  );
}
