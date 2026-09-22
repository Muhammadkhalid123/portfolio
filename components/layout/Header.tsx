"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PersonaSwitcher } from "./PersonaSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { personas } from "@/content/personas";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";
import { Menu, X, Terminal, Sparkles, Layers, Github, FileText, ArrowUpRight } from "lucide-react";

export interface HeaderProps {
  persona?: "personal" | "dev" | "ai";
}

export function Header({ persona = "personal" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const personaConfig = personas[persona];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    ...(persona !== "ai" ? [{ label: "Architecture", href: "#deployment" }] : []),
    ...(persona === "personal" ? [{ label: "Journey", href: "#timeline" }] : []),
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const logoDetails = {
    personal: {
      tag: "MK",
      title: "Muhammad Khalid",
      badge: "Full-Stack & AI",
      badgeClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      icon: Layers,
    },
    dev: {
      tag: "DEV://",
      title: "Khalid.dev",
      badge: "DevOps & Full-Stack",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      icon: Terminal,
    },
    ai: {
      tag: "AI://",
      title: "Khalid.ai",
      badge: "RAG & Neural Systems",
      badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      icon: Sparkles,
    },
  }[persona];

  const LogoIcon = logoDetails.icon;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-xl"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Persona Wordmark */}
          <Link
            href={personaConfig.route}
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-transform duration-300 group-hover:scale-105 border",
                persona === "dev"
                  ? "bg-cyan-950/60 border-cyan-500/40 text-cyan-400 shadow-cyan-500/20 shadow-md"
                  : persona === "ai"
                  ? "bg-purple-950/60 border-purple-500/40 text-purple-400 shadow-purple-500/20 shadow-md"
                  : "bg-indigo-950/60 border-indigo-500/40 text-indigo-400 shadow-indigo-500/20 shadow-md"
              )}
            >
              <LogoIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 group-hover:text-white tracking-tight flex items-center gap-1.5 text-sm sm:text-base">
                {logoDetails.title}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-wider font-semibold border rounded px-1.5 py-0.2 w-max",
                  logoDetails.badgeClass
                )}
              >
                {logoDetails.badge}
              </span>
            </div>
          </Link>

          {/* Persona Switcher Center */}
          <div className="hidden md:flex items-center justify-center">
            <PersonaSwitcher currentPersona={persona} />
          </div>

          {/* Desktop Navigation Links & Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link000
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150 py-1"
                >
                  {link.label}
                </Link000>
              ))}
            </nav>

            <div className="h-4 w-px bg-slate-800" />

            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <ThemeToggle />
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all duration-200"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-slate-900/95 border border-slate-800/90 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex justify-center pb-2 border-b border-slate-800">
              <PersonaSwitcher currentPersona={persona} />
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
