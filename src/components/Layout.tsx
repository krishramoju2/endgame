import React from "react";
import { useAppContext } from "../contexts/AppContext";

export default function ThemeSelector() {
  const { theme, setTheme } = useAppContext();

  return (
    <div className="mb-4">
      <label htmlFor="theme" className="block mb-2 font-medium">
        Select Theme:
      </label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="light">Light Professional</option>
        <option value="dark">Dark Matrix</option>
        <option value="blue">Blue Ocean</option>
      </select>
    </div>
  );
}
