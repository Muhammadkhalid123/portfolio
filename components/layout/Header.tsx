"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PersonaSwitcher } from "./PersonaSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { personas } from "@/content/personas";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";
import {
  Terminal,
  Sparkles,
  Layers,
  Github,
  FileText,
  ArrowUpRight,
  Menu,
  X,
  Code2,
  Server,
  Milestone,
  FolderGit2,
  MessageSquare,
  User,
} from "lucide-react";

export interface HeaderProps {
  persona?: "personal" | "dev" | "ai";
}

export function Header({ persona = "personal" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const personaConfig = personas[persona] || personas.personal;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomeTrack = pathname === "/" || pathname === "/dev" || pathname === "/ai";

  const getSectionHref = (id: string) => {
    return isHomeTrack ? `#${id}` : `/#${id}`;
  };

  const navLinks = [
    { label: "About", href: getSectionHref("about"), icon: User },
    { label: "Skills", href: getSectionHref("skills"), icon: Code2 },
    { label: "Architecture", href: getSectionHref("deployment"), icon: Server },
    { label: "Journey", href: getSectionHref("timeline"), icon: Milestone },
    { label: "Projects", href: "/projects", icon: FolderGit2 },
    { label: "Contact", href: getSectionHref("contact"), icon: MessageSquare },
  ];

  const logoDetails = {
    personal: {
      tag: "MK",
      title: "Muhammad Khalid",
      badge: "Full-Stack & AI",
      badgeClass: "bg-[#0F0F0F] text-[#00FFD0] border-[#00FFD0]/40",
      icon: Layers,
    },
    dev: {
      tag: "DEV://",
      title: "Khalid.dev",
      badge: "DevOps & Full-Stack",
      badgeClass: "bg-[#0F0F0F] text-[#00FFD0] border-[#00FFD0]/40",
      icon: Terminal,
    },
    ai: {
      tag: "AI://",
      title: "Khalid.ai",
      badge: "RAG & Voice Synthesis",
      badgeClass: "bg-[#0F0F0F] text-[#00FFD0] border-[#00FFD0]/40",
      icon: Sparkles,
    },
  }[persona];

  const LogoIcon = logoDetails.icon;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#FAFAFA]/90 dark:bg-[#0F0F0F]/90 backdrop-blur-2xl border-b border-[#0F0F0F]/10 dark:border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          : "bg-transparent py-4 sm:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-4">
          {/* Logo / Persona Wordmark */}
          <Link
            href={personaConfig.route}
            className="group flex items-center gap-2.5 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFD0] rounded-2xl shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 group-hover:scale-105 border border-white/15 group-hover:border-[#00FFD0]/60 bg-[#0F0F0F] text-[#00FFD0] shadow-[0_0_15px_rgba(0,255,208,0.2)] backdrop-blur-xl">
              <LogoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FFD0]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#0F0F0F] dark:text-[#FAFAFA] group-hover:text-[#009b7d] dark:group-hover:text-[#00FFD0] transition-colors tracking-tight flex items-center gap-1 text-sm sm:text-base">
                {logoDetails.title}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#00FFD0]" />
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.2 w-max backdrop-blur-md hidden xs:inline-block",
                  logoDetails.badgeClass
                )}
              >
                {logoDetails.badge}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
            {navLinks.map((link) => (
              <Link000
                key={link.label}
                href={link.href}
                className="text-xs xl:text-sm font-semibold text-[#808080] hover:text-[#0F0F0F] dark:hover:text-[#FAFAFA] transition-colors py-1"
              >
                {link.label}
              </Link000>
            ))}
          </nav>

          {/* Persona Switcher Center */}
          <div className="hidden md:flex items-center justify-center">
            <PersonaSwitcher currentPersona={persona} />
          </div>

          {/* Desktop Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 sm:p-2.5 rounded-2xl bg-[#0F0F0F] text-[#FAFAFA] hover:text-[#00FFD0] hover:bg-[#181818] border border-white/15 hover:border-[#00FFD0]/60 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
            </a>
            <ThemeToggle />
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#00FFD0] hover:bg-[#33FFDA] text-[#0F0F0F] border border-[#00FFD0] shadow-[0_4px_15px_rgba(0,255,208,0.35)] hover:shadow-[0_6px_20px_rgba(0,255,208,0.5)] transition-all duration-200"
            >
              <FileText className="w-3.5 h-3.5 text-[#0F0F0F]" />
              <span className="hidden sm:inline">Resume</span>
            </a>

            {/* Mobile / Tablet Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-2xl bg-[#0F0F0F] text-[#FAFAFA] hover:text-[#00FFD0] hover:bg-[#181818] border border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFD0]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#00FFD0]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 sm:p-5 rounded-3xl bg-[#0F0F0F]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200 text-[#FAFAFA]">
            {/* Persona Switcher on mobile */}
            <div className="flex md:hidden justify-center pb-3 border-b border-white/10">
              <PersonaSwitcher currentPersona={persona} />
            </div>

            {/* Nav links grid */}
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-[#FAFAFA]/85 hover:text-[#00FFD0] hover:border-[#00FFD0]/50 hover:bg-[#00FFD0]/10 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#00FFD0]" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#FAFAFA]/70 hover:text-[#00FFD0] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-xl bg-[#00FFD0] text-[#0F0F0F]"
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
