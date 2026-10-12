"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { initSoundPreference, isSoundEnabled, setSoundEnabled, playTick } from "@/lib/sound";

type ThemeMode = "auto" | "light" | "dark";

export interface HeaderProps {
  persona?: string;
}

export function Header({ persona }: HeaderProps = {}) {
  const [theme, setTheme] = useState<ThemeMode>("auto");
  const [soundOn, setSoundOn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pkTime, setPkTime] = useState("--:--");
  const [visitorTime, setVisitorTime] = useState("--:--");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const soundPref = initSoundPreference();
    setSoundOn(soundPref);

    try {
      const savedTheme = localStorage.getItem("khalid_theme") as ThemeMode | null;
      if (savedTheme && ["auto", "light", "dark"].includes(savedTheme)) {
        applyTheme(savedTheme);
      } else {
        applyTheme("auto");
      }
    } catch (e) {
      applyTheme("auto");
    }

    const updateClocks = () => {
      const now = new Date();
      // PK time: GMT+5
      const pkFormatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setPkTime(pkFormatted);

      // Visitor local time
      const visitorFormatted = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setVisitorTime(visitorFormatted);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 10000);
    return () => clearInterval(interval);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    setTheme(mode);
    try {
      localStorage.setItem("khalid_theme", mode);
    } catch (e) {}

    const root = document.documentElement;
    if (mode === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (mode === "light") {
      root.removeAttribute("data-theme");
    } else {
      // auto
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.setAttribute("data-theme", "dark");
      } else {
        root.removeAttribute("data-theme");
      }
    }
  };

  const cycleTheme = () => {
    playTick(2200, 0.02);
    if (theme === "auto") applyTheme("light");
    else if (theme === "light") applyTheme("dark");
    else applyTheme("auto");
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      // play a short confirmation tick
      setTimeout(() => playTick(2000, 0.025, 0.05), 10);
    }
  };

  const themeLabel = theme === "auto" ? "A" : theme === "light" ? "L" : "D";
  const soundLabel = soundOn ? "||" : "|";

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--rule)] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between text-sm">
        {/* Left: Site Brand */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href="/"
            onClick={() => playTick(1400)}
            className="font-bold text-[15px] tracking-tight hover:opacity-70 transition-opacity"
          >
            khalid.dev
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden sm:flex items-center gap-6 text-[14px]">
            <a
              href="#work"
              onClick={() => playTick(1600)}
              className="text-[var(--ink)] hover:opacity-60 transition-opacity"
            >
              Work
            </a>
            <a
              href="#contact"
              onClick={() => playTick(1600)}
              className="text-[var(--ink)] hover:opacity-60 transition-opacity"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Right Desktop: Theme, Sound, Clock */}
        <div className="hidden sm:flex items-center gap-5 md:gap-6 mono text-[13px] text-[var(--ink)]">
          <button
            type="button"
            onClick={cycleTheme}
            aria-label={`Theme: ${theme}`}
            className="hover:opacity-60 transition-opacity cursor-pointer select-none"
          >
            THEME[{mounted ? themeLabel : "A"}]
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={`Sound: ${soundOn ? "on" : "off"}`}
            className="hover:opacity-60 transition-opacity cursor-pointer select-none"
          >
            SOUND[{mounted ? soundLabel : "|"}]
          </button>

          <div
            className="text-[var(--muted)] flex items-center gap-3 select-none"
            aria-hidden="true"
          >
            <span>{mounted ? `${pkTime} GMT+5 PK` : "--:-- GMT+5 PK"}</span>
            <span className="opacity-40">/</span>
            <span>{mounted ? visitorTime : "--:--"}</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              playTick(1600);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="mono text-[13px] px-2 py-1 border border-[var(--rule)]"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "[Close]" : "[Menu]"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden w-full bg-[var(--paper)] border-b border-[var(--rule)] px-6 py-6 flex flex-col gap-5 text-base">
          <a
            href="#work"
            onClick={() => {
              playTick(1600);
              setMobileMenuOpen(false);
            }}
            className="text-lg font-bold"
          >
            Work
          </a>
          <a
            href="#contact"
            onClick={() => {
              playTick(1600);
              setMobileMenuOpen(false);
            }}
            className="text-lg font-bold"
          >
            Contact
          </a>

          <div className="pt-4 border-t border-[var(--rule)] flex flex-wrap gap-4 mono text-[13px]">
            <button
              type="button"
              onClick={cycleTheme}
              className="px-2 py-1 border border-[var(--rule)]"
            >
              THEME[{mounted ? themeLabel : "A"}]
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="px-2 py-1 border border-[var(--rule)]"
            >
              SOUND[{mounted ? soundLabel : "|"}]
            </button>
            <div className="w-full text-[var(--muted)] pt-1">
              {mounted ? `${pkTime} GMT+5 PK — You: ${visitorTime}` : "--:-- GMT+5 PK"}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
