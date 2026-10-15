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
      setTimeout(() => playTick(2000, 0.025, 0.05), 10);
    }
  };

  const themeLabel = theme === "auto" ? "AUTO" : theme === "light" ? "LIGHT" : "DARK";
  const soundLabel = soundOn ? "ON" : "OFF";

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--paper)]/95 backdrop-blur-sm border-b-2 sm:border-b-[3px] border-black dark:border-white transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between text-sm">
        {/* Left: Site Brand */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href="/"
            onClick={() => playTick(1400)}
            className="font-black text-base uppercase tracking-tight text-black dark:text-white hover:opacity-70 transition-opacity"
          >
            KHALID.DEV
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden sm:flex items-center gap-6 font-mono text-xs uppercase tracking-wider font-bold">
            <a
              href="#work"
              onClick={() => playTick(1600)}
              className="text-black dark:text-white hover:underline underline-offset-4 decoration-2"
            >
              WORK
            </a>
            <a
              href="#statement"
              onClick={() => playTick(1600)}
              className="text-black dark:text-white hover:underline underline-offset-4 decoration-2"
            >
              ABOUT
            </a>
            <a
              href="#pipeline"
              onClick={() => playTick(1600)}
              className="text-black dark:text-white hover:underline underline-offset-4 decoration-2"
            >
              PIPELINE
            </a>
            <a
              href="#contact"
              onClick={() => playTick(1600)}
              className="text-black dark:text-white hover:underline underline-offset-4 decoration-2"
            >
              CONTACT
            </a>
          </nav>
        </div>

        {/* Right Desktop: Theme, Sound, Clock */}
        <div className="hidden sm:flex items-center gap-4 md:gap-5 font-mono text-xs text-black dark:text-white">
          <button
            type="button"
            onClick={cycleTheme}
            aria-label={`Theme: ${theme}`}
            className="px-2.5 py-1 border-2 border-black dark:border-white bg-black/[0.03] dark:bg-white/[0.05] shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 font-bold uppercase transition-transform cursor-pointer select-none"
          >
            THEME[{mounted ? themeLabel : "AUTO"}]
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={`Sound: ${soundOn ? "on" : "off"}`}
            className="px-2.5 py-1 border-2 border-black dark:border-white bg-black/[0.03] dark:bg-white/[0.05] shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 font-bold uppercase transition-transform cursor-pointer select-none"
          >
            AUDIO[{mounted ? soundLabel : "OFF"}]
          </button>

          <div
            className="text-neutral-500 font-bold flex items-center gap-2 select-none text-[11px]"
            aria-hidden="true"
          >
            <span>{mounted ? `${pkTime} PK` : "--:-- PK"}</span>
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
            className="font-mono text-xs font-black uppercase px-3 py-1 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "[CLOSE]" : "[MENU]"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden w-full bg-[var(--paper)] border-b-2 border-black dark:border-white px-6 py-6 flex flex-col gap-4 font-mono text-sm uppercase">
          <a
            href="#work"
            onClick={() => {
              playTick(1600);
              setMobileMenuOpen(false);
            }}
            className="font-black text-lg text-black dark:text-white"
          >
            WORK
          </a>
          <a
            href="#statement"
            onClick={() => {
              playTick(1600);
              setMobileMenuOpen(false);
            }}
            className="font-black text-lg text-black dark:text-white"
          >
            ABOUT
          </a>
          <a
            href="#pipeline"
            onClick={() => {
              playTick(1600);
              setMobileMenuOpen(false);
            }}
            className="font-black text-lg text-black dark:text-white"
          >
            PIPELINE
          </a>
          <a
            href="#contact"
            onClick={() => {
              playTick(1600);
              setMobileMenuOpen(false);
            }}
            className="font-black text-lg text-black dark:text-white"
          >
            CONTACT
          </a>

          <div className="pt-4 border-t-2 border-black dark:border-white flex flex-wrap gap-3">
            <button
              type="button"
              onClick={cycleTheme}
              className="px-3 py-1 border-2 border-black dark:border-white font-bold text-xs"
            >
              THEME[{mounted ? themeLabel : "AUTO"}]
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="px-3 py-1 border-2 border-black dark:border-white font-bold text-xs"
            >
              AUDIO[{mounted ? soundLabel : "OFF"}]
            </button>
            <div className="w-full text-neutral-500 pt-1 text-xs">
              {mounted ? `${pkTime} PK — You: ${visitorTime}` : "--:-- PK"}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
