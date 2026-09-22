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
    ...(persona === "personal" ? [{ label: "History", href: "#timeline" }] : []),
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const logoDetails = {
    personal: {
      tag: "MK",
      title: "Muhammad Khalid",
      badge: "Full-Stack & AI",
      badgeClass: "bg-[#800020]/15 text-[#800020] border-[#800020]/40",
      icon: Layers,
    },
    dev: {
      tag: "DEV://",
      title: "Khalid.dev",
      badge: "DevOps & Full-Stack",
      badgeClass: "bg-[#800020]/15 text-[#800020] border-[#800020]/40",
      icon: Terminal,
    },
    ai: {
      tag: "AI://",
      title: "Khalid.ai",
      badge: "RAG & Voice Synthesis",
      badgeClass: "bg-[#800020]/15 text-[#800020] border-[#800020]/40",
      icon: Sparkles,
    },
  }[persona];

  const LogoIcon = logoDetails.icon;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#FCFAF4]/80 backdrop-blur-2xl border-b border-[#010101]/10 py-3 shadow-[0_10px_30px_rgba(1,1,1,0.06)]"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Persona Wordmark */}
          <Link
            href={personaConfig.route}
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-2xl"
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 group-hover:scale-105 border border-[#800020]/40 bg-[#010101] text-[#800020] shadow-[0_0_15px_rgba(128,0,32,0.3)] backdrop-blur-xl"
            >
              <LogoIcon className="w-5 h-5 text-[#800020]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#010101] group-hover:text-[#800020] transition-colors tracking-tight flex items-center gap-1 text-sm sm:text-base">
                {logoDetails.title}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#800020]" />
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.2 w-max backdrop-blur-md",
                  logoDetails.badgeClass
                )}
              >
                {logoDetails.badge}
              </span>
            </div>
          </Link>

          {/* Persona Switcher Center */}
          <div className="flex items-center justify-center">
            <PersonaSwitcher currentPersona={persona} />
          </div>

          {/* Desktop Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-2xl bg-[#010101] text-[#FCFAF4] hover:bg-[#800020] border border-[#800020]/30 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <ThemeToggle />
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-2xl bg-[#800020] hover:bg-[#6d0a20] text-[#FCFAF4] border border-[#f0a3b3]/40 shadow-[0_4px_15px_rgba(128,0,32,0.35)] transition-all duration-200"
            >
              <FileText className="w-3.5 h-3.5 text-[#f0a3b3]" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
