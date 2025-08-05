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
  <div className="layout">
    <header className="p-4 bg-gray-100 border-b">
      <h1 className="text-xl font-semibold">CareerOS</h1>
    </header>
    <main className="p-4">{children}</main>
  </div>
);

}
