import React from "react";
import { useAppContext } from "../contexts/AppContext";

const themes = {
  light: {
    bg: "#f9f9f9",
    text: "#2c3e50",
    primary: "#007bff",
    secondary: "#ffffff",
    accent: "#28a745",
    card: "#ffffff",
  },
  dark: {
    bg: "#181818",
    text: "#f5f5f5",
    primary: "#00bcd4",
    secondary: "#242424",
    accent: "#ff5722",
    card: "#2c2c2c",
  },
  blue: {
    bg: "#667eea",
    text: "#ffffff",
    primary: "#48dbfb",
    secondary: "#576574",
    accent: "#f368e0",
    card: "#252861",
  },
};

export default function ThemeSelector() {
  const { theme, setTheme } = useAppContext();

  return (
     setTheme(e.target.value)}
    >
      Light Professional
      Dark Matrix
      Blue Gradient

  );
}
