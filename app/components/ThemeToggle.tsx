"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg">
        <span className="material-symbols-outlined">dark_mode</span>
      </div>
    );
  }

  const currentTheme = resolvedTheme || theme;

  return (
    <button
      onClick={() => {
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
      }}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <span className="material-symbols-outlined">light_mode</span>
      ) : (
        <span className="material-symbols-outlined">dark_mode</span>
      )}
    </button>
  );
}
