"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to light mode matching Butter Video clean aesthetic
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-2xl bg-[#0F0F0F]/10 border border-[#0F0F0F]/10 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="p-2.5 rounded-2xl bg-[#0F0F0F] hover:bg-[#181818] border border-white/15 hover:border-[#00FFD0]/60 text-[#FAFAFA] transition-all duration-200 cursor-pointer shadow-sm"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-[#00FFD0]" />
      ) : (
        <Moon className="w-4 h-4 text-[#00FFD0]" />
      )}
    </button>
  );
}
