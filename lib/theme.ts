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
    bgClass: "bg-[#FAFAFA] text-[#0F0F0F]",
    heroBgClass: "from-[#0F0F0F] via-[#181818] to-[#0F0F0F]",
    cardBgClass: "bg-[#0F0F0F] hover:bg-[#161616]",
    borderClass: "border-white/10 hover:border-[#00FFD0]/50",
    textAccentClass: "text-[#00FFD0]",
    glowClass: "shadow-[0_0_50px_-12px_rgba(0,255,208,0.25)]",
    badgeClass: "bg-[#0F0F0F] text-[#00FFD0] border-[#00FFD0]/40",
    buttonPrimaryClass: "bg-[#00FFD0] hover:bg-[#33FFDA] text-[#0F0F0F] font-bold shadow-lg shadow-[#00FFD0]/20",
    buttonSecondaryClass: "bg-[#0F0F0F] hover:bg-[#181818] text-[#FAFAFA] border border-white/15 hover:border-[#00FFD0]/60",
    gradientTextClass: "bg-gradient-to-r from-[#0F0F0F] via-[#808080] to-[#0F0F0F] bg-clip-text text-transparent",
    accentHex: "#00FFD0",
    navActiveBorder: "border-[#00FFD0] text-[#00FFD0]",
  },
  dev: {
    key: "dev",
    bgClass: "bg-[#FAFAFA] text-[#0F0F0F]",
    heroBgClass: "from-[#0F0F0F] via-[#141414] to-[#0F0F0F]",
    cardBgClass: "bg-[#0F0F0F] hover:bg-[#161616]",
    borderClass: "border-white/10 hover:border-[#00FFD0]/50",
    textAccentClass: "text-[#00FFD0]",
    glowClass: "shadow-[0_0_50px_-12px_rgba(0,255,208,0.25)]",
    badgeClass: "bg-[#0F0F0F] text-[#00FFD0] border-[#00FFD0]/40",
    buttonPrimaryClass: "bg-[#00FFD0] hover:bg-[#33FFDA] text-[#0F0F0F] font-bold shadow-lg shadow-[#00FFD0]/20",
    buttonSecondaryClass: "bg-[#0F0F0F] hover:bg-[#181818] text-[#FAFAFA] border border-white/15 hover:border-[#00FFD0]/60",
    gradientTextClass: "bg-gradient-to-r from-[#0F0F0F] via-[#808080] to-[#0F0F0F] bg-clip-text text-transparent",
    accentHex: "#00FFD0",
    navActiveBorder: "border-[#00FFD0] text-[#00FFD0]",
  },
  ai: {
    key: "ai",
    bgClass: "bg-[#FAFAFA] text-[#0F0F0F]",
    heroBgClass: "from-[#0F0F0F] via-[#141414] to-[#0F0F0F]",
    cardBgClass: "bg-[#0F0F0F] hover:bg-[#161616]",
    borderClass: "border-white/10 hover:border-[#00FFD0]/50",
    textAccentClass: "text-[#00FFD0]",
    glowClass: "shadow-[0_0_50px_-12px_rgba(0,255,208,0.25)]",
    badgeClass: "bg-[#0F0F0F] text-[#00FFD0] border-[#00FFD0]/40",
    buttonPrimaryClass: "bg-[#00FFD0] hover:bg-[#33FFDA] text-[#0F0F0F] font-bold shadow-lg shadow-[#00FFD0]/20",
    buttonSecondaryClass: "bg-[#0F0F0F] hover:bg-[#181818] text-[#FAFAFA] border border-white/15 hover:border-[#00FFD0]/60",
    gradientTextClass: "bg-gradient-to-r from-[#0F0F0F] via-[#808080] to-[#0F0F0F] bg-clip-text text-transparent",
    accentHex: "#00FFD0",
    navActiveBorder: "border-[#00FFD0] text-[#00FFD0]",
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
