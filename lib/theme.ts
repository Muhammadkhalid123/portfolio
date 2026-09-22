import { personas, PersonaConfig } from "@/content/personas";
import type { Metadata } from "next";

export interface PersonaThemeStyles {
  key: "personal" | "dev" | "ai";
  bgClass: string;
  heroBgClass: string;
  cardBgClass: string;
  borderClass: string;
  textAccentClass: string;
  glowClass: string;
  badgeClass: string;
  buttonPrimaryClass: string;
  buttonSecondaryClass: string;
  gradientTextClass: string;
  accentHex: string;
  navActiveBorder: string;
}

export const personaThemes: Record<"personal" | "dev" | "ai", PersonaThemeStyles> = {
  personal: {
    key: "personal",
    bgClass: "bg-[#090a0f] text-slate-100",
    heroBgClass: "from-indigo-950/30 via-slate-900/50 to-[#090a0f]",
    cardBgClass: "bg-[#12141d]/80 hover:bg-[#161924]/90",
    borderClass: "border-slate-800/80 hover:border-indigo-500/40",
    textAccentClass: "text-indigo-400",
    glowClass: "shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)]",
    badgeClass: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    buttonPrimaryClass: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25",
    buttonSecondaryClass: "bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-500",
    gradientTextClass: "bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent",
    accentHex: "#6366f1",
    navActiveBorder: "border-indigo-500 text-indigo-400",
  },
  dev: {
    key: "dev",
    bgClass: "bg-[#080d1a] text-slate-100",
    heroBgClass: "from-cyan-950/30 via-slate-900/50 to-[#080d1a]",
    cardBgClass: "bg-[#0d1527]/80 hover:bg-[#111c34]/90",
    borderClass: "border-cyan-950/80 hover:border-cyan-500/40",
    textAccentClass: "text-cyan-400",
    glowClass: "shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)]",
    badgeClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    buttonPrimaryClass: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25",
    buttonSecondaryClass: "bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50",
    gradientTextClass: "bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent",
    accentHex: "#06b6d4",
    navActiveBorder: "border-cyan-400 text-cyan-400",
  },
  ai: {
    key: "ai",
    bgClass: "bg-[#0b0817] text-slate-100",
    heroBgClass: "from-purple-950/35 via-slate-900/50 to-[#0b0817]",
    cardBgClass: "bg-[#15102a]/80 hover:bg-[#1c1538]/90",
    borderClass: "border-purple-950/80 hover:border-purple-500/40",
    textAccentClass: "text-purple-400",
    glowClass: "shadow-[0_0_50px_-12px_rgba(168,85,247,0.25)]",
    badgeClass: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    buttonPrimaryClass: "bg-gradient-to-r from-purple-500 via-fuchsia-600 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/25",
    buttonSecondaryClass: "bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-purple-500/50",
    gradientTextClass: "bg-gradient-to-r from-white via-purple-100 to-fuchsia-400 bg-clip-text text-transparent",
    accentHex: "#a855f7",
    navActiveBorder: "border-purple-400 text-purple-400",
  },
};

export function getPersonaTheme(key: "personal" | "dev" | "ai"): PersonaThemeStyles {
  return personaThemes[key] || personaThemes.personal;
}

export function generatePersonaMetadata(key: "personal" | "dev" | "ai"): Metadata {
  const config = personas[key];
  const siteUrl = "https://khalid.dev";
  const currentUrl = `${siteUrl}${config.route === "/" ? "" : config.route}`;

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: [
      "Muhammad Khalid",
      "Full Stack Developer",
      "AI Engineer",
      "DevOps Engineer",
      "Next.js Portfolio",
      "Docker AWS EC2",
      "RAG Systems",
      "FastAPI Python",
      "TypeScript",
      "Nginx Reverse Proxy",
    ],
    authors: [{ name: "Muhammad Khalid", url: "https://github.com/Muhammadkhalid123" }],
    creator: "Muhammad Khalid",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: currentUrl,
      title: config.metaTitle,
      description: config.metaDescription,
      siteName: "Muhammad Khalid Portfolio",
      images: [
        {
          url: `/images/og-${key}.svg`,
          width: 1200,
          height: 630,
          alt: `${config.name} - ${config.headline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.metaTitle,
      description: config.metaDescription,
      images: [`/images/og-${key}.svg`],
      creator: "@Muhammadkhalid123",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
