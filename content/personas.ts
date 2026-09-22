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
    label: "Personal Portfolio",
    shortLabel: "Overview",
    headline: "Muhammad Khalid — Full Stack Developer & AI Engineer",
    subheadline: "Crafting end-to-end intelligent web platforms, high-throughput backend APIs, and production-ready RAG & LLM systems deployed with automated CI/CD.",
    bioIntro: "I bridge the gap between robust software engineering, scalable cloud deployment, and cutting-edge artificial intelligence. With expertise across modern TypeScript, Python, Docker, and distributed systems, I build software that performs reliably in production.",
    themeColor: "personal",
    accentColor: "#6366f1", // Indigo
    accentGradient: "from-indigo-500 via-purple-500 to-amber-500",
    projectFilter: ["dev", "ai", "devops"],
    ctaPrimaryText: "Explore Projects",
    ctaSecondaryText: "Get in Touch",
    badgeText: "Full Stack • AI/ML • DevOps",
    showDeploymentStack: true,
    showTimeline: true,
    metaTitle: "Muhammad Khalid — Full Stack Developer & AI Engineer",
    metaDescription: "Explore Muhammad Khalid's comprehensive portfolio spanning Full Stack web applications, AI/ML & RAG systems, and automated DevOps infrastructure on AWS.",
  },
  dev: {
    key: "dev",
    route: "/dev",
    name: "Muhammad Khalid",
    label: "Development & DevOps",
    shortLabel: "Dev & Infra",
    headline: "Full Stack Developer & Deployment Engineer",
    subheadline: "Architecting high-scale web applications, resilient backend microservices, and automated containerized deployment pipelines with Docker, CI/CD, AWS EC2, and Nginx.",
    bioIntro: "Specializing in enterprise full-stack development, database architecture, and zero-downtime cloud infrastructure. I take software from initial design to hardened, automated production environments.",
    themeColor: "dev",
    accentColor: "#06b6d4", // Electric Cyan
    accentGradient: "from-cyan-400 via-blue-500 to-emerald-400",
    projectFilter: ["dev", "devops"],
    ctaPrimaryText: "View Full-Stack & Infra Projects",
    ctaSecondaryText: "Review Deployment Architecture",
    badgeText: "Full-Stack Architecture & Cloud Infra",
    showDeploymentStack: true,
    showTimeline: false,
    metaTitle: "Full Stack & DevOps Portfolio — Muhammad Khalid",
    metaDescription: "Full Stack Developer and Deployment Engineer specializing in Next.js, FastAPI, PostgreSQL, Docker, AWS EC2, and automated CI/CD pipelines.",
  },
  ai: {
    key: "ai",
    route: "/ai",
    name: "Muhammad Khalid",
    label: "AI Engineer",
    shortLabel: "AI & RAG",
    headline: "AI Engineer — RAG Systems, LLM Apps & Neural Audio",
    subheadline: "Engineering Retrieval-Augmented Generation (RAG) platforms, LLM agent workflows, neural text-to-speech synthesis, and fine-tuned transformer applications.",
    bioIntro: "Focused on turning cutting-edge language and acoustic models into production-ready AI tools. From semantic vector search and custom agent tooling to real-time audio synthesis pipelines.",
    themeColor: "ai",
    accentColor: "#a855f7", // Neon Purple
    accentGradient: "from-purple-400 via-fuchsia-500 to-cyan-400",
    projectFilter: ["ai"],
    ctaPrimaryText: "View AI & RAG Projects",
    ctaSecondaryText: "Discuss AI Solutions",
    badgeText: "AI Systems • RAG • LLMs • Neural TTS",
    showDeploymentStack: false,
    showTimeline: false,
    metaTitle: "AI Engineer Portfolio — Muhammad Khalid | RAG & LLM Systems",
    metaDescription: "AI Engineer portfolio of Muhammad Khalid. Specializing in RAG pipelines, LangChain, Hugging Face transformers, neural voice synthesis, and vector search systems.",
  },
};
