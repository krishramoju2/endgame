import React from "react";
import { Career } from "../data/careers";
import { useAppContext } from "../contexts/AppContext";

interface CareerCardProps {
  career: Career;
  onClick: () => void;
}

export default function CareerCard({ career, onClick }: CareerCardProps) {
  const { theme } = useAppContext();

  // Map theme colors
  const colors = {
    light: {
      bg: "#007bff",
      text: "#fff",
    },
    dark: {
      bg: "#00bcd4",
      text: "#fff",
    },
    blue: {
      bg: "#48dbfb",
      text: "#fff",
    },
  };

  return (

      {career.icon}
      {career.id.replace(/-/g, " ").toUpperCase()}
      {career.description}

  );
}
