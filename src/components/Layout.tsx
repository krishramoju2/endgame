import React from "react";
import ThemeSelector from "./ThemeSelector";
import { useAppContext } from "../contexts/AppContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useAppContext();

  const themesBg = {
    light: "#f9f9f9",
    dark: "#181818",
    blue: "#667eea",
  };

  const themesText = {
    light: "#2c3e50",
    dark: "#f5f5f5",
    blue: "#ffffff",
  };

  return (


        CareerOS


      {children}

  );
}
