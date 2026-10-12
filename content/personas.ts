import { PersonaTag } from "./projects";

export interface PersonaConfig {
  key: "personal" | "dev" | "ai";
  route: string;
  name: string;
  label: string;
  shortLabel: string;
  headline: string;
  subheadline: string;
  bioIntro: string;
  themeColor: string;
  accentColor: string;
  accentGradient: string;
  projectFilter: PersonaTag[];
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  badgeText: string;
  showDeploymentStack: boolean;
  showTimeline: boolean;
  metaTitle: string;
  metaDescription: string;
}

export const personas: Record<"personal" | "dev" | "ai", PersonaConfig> = {
  personal: {
    key: "personal",
    route: "/",
    name: "Muhammad Khalid",
    label: "AI & Full-Stack Portfolio",
    shortLabel: "Overview",
    headline: "We build practical AI systems, RAG chatbots, and intelligent automation that deliver real results.",
    subheadline: "We specialize in production-ready AI systems: RAG chatbots, multi-tenant conversational platforms, document summarization, lightweight speech synthesis, and autonomous lead-generation bots.",
    bioIntro: "We build practical AI systems and automation tooling with clean user interfaces, fast Python/FastAPI backends, and robust data pipelines.",
    themeColor: "ai",
    accentColor: "#00FFD0",
    accentGradient: "from-purple-400 via-fuchsia-400 to-cyan-300",
    projectFilter: ["dev", "ai", "devops"],
    ctaPrimaryText: "View Projects",
    ctaSecondaryText: "Get in Touch",
    badgeText: "AI Systems • Full-Stack • DevOps • Automation",
    showDeploymentStack: true,
    showTimeline: true,
    metaTitle: "Muhammad Khalid — AI & Full-Stack Engineering Portfolio",
    metaDescription: "AI & automation engineering portfolio: RAG chatbots, multi-tenant conversational platforms, document summarizers, and automated bots.",
  },
  dev: {
    key: "dev",
    route: "/dev",
    name: "Muhammad Khalid",
    label: "Development & DevOps",
    shortLabel: "DevOps",
    headline: "Full-Stack Development, APIs & Cloud Infrastructure.",
    subheadline: "Engineering robust FastAPI & Next.js web applications, Docker containers, and automated AWS EC2 deployment pipelines.",
    bioIntro: "We focus on building clean, high-performance web applications, resilient backend microservices, and scalable automation systems.",
    themeColor: "dev",
    accentColor: "#00FFD0",
    accentGradient: "from-teal-400 via-cyan-400 to-blue-500",
    projectFilter: ["dev", "devops"],
    ctaPrimaryText: "View Dev Projects",
    ctaSecondaryText: "Discuss Architecture",
    badgeText: "Full-Stack • Docker • CI/CD • AWS",
    showDeploymentStack: true,
    showTimeline: true,
    metaTitle: "Muhammad Khalid — Full-Stack & DevOps Engineering",
    metaDescription: "Full-stack web applications, typed APIs, background task queues, and containerized deployment infrastructure.",
  },
  ai: {
    key: "ai",
    route: "/ai",
    name: "Muhammad Khalid",
    label: "AI & Automation Engineering",
    shortLabel: "AI & RAG",
    headline: "We build practical AI systems and intelligent automation.",
    subheadline: "RAG chatbots, multi-tenant conversational platforms, document summarization, lightweight speech synthesis, and lead-generation automation bots. We build AI features that hold up in production.",
    bioIntro: "Building practical AI tools with clean interfaces and fast Python backends, specializing in RAG retrieval, multi-tenant architectures, NLP summarizers, and autonomous automation bots.",
    themeColor: "ai",
    accentColor: "#a855f7",
    accentGradient: "from-purple-400 via-fuchsia-400 to-cyan-300",
    projectFilter: ["ai", "dev"],
    ctaPrimaryText: "View AI Projects",
    ctaSecondaryText: "Discuss AI Work",
    badgeText: "RAG • Multi-Tenant Chatbots • NLP • Automation",
    showDeploymentStack: true,
    showTimeline: true,
    metaTitle: "AI & Automation Portfolio — Muhammad Khalid | RAG & Chatbots",
    metaDescription: "AI & automation engineering portfolio of Muhammad Khalid. Building RAG chatbots, multi-tenant conversational platforms, document summarizers, and automated bots.",
  },
};
