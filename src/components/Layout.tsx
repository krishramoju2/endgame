import React from "react";
import ThemeSelector from "./ThemeSelector";
import { useAppContext } from "../contexts/AppContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useAppContext();

  // Define background and text color per theme
  const themeStyles: { [key: string]: { bg: string; text: string } } = {
    light: { bg: "#f9f9f9", text: "#2c3e50" },
    dark: { bg: "#181818", text: "#f5f5f5" },
    blue: { bg: "#667eea", text: "#ffffff" },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
      }}
    >
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold">CareerOS</h1>
        <ThemeSelector />
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
