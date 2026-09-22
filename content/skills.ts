import { PersonaTag } from "./projects";

export interface Skill {
  name: string;
  category: "devops" | "fullstack" | "ai";
  tags: PersonaTag[];
  featured?: boolean;
  note?: string;
}

export interface SkillCategory {
  key: "devops" | "fullstack" | "ai";
  title: string;
  description: string;
  badge: string;
  personaTag: PersonaTag;
}

export const skillCategories: Record<string, SkillCategory> = {
  fullstack: {
    key: "fullstack",
    title: "Full-Stack Development",
    description: "Tools and frameworks we reach for when building web applications and backend APIs.",
    badge: "Core Stack",
    personaTag: "dev",
  },
  ai: {
    key: "ai",
    title: "AI & Automation",
    description: "Architectures we use for RAG chatbots, multi-tenant bot systems, NLP summarization, and automation bots.",
    badge: "AI Systems",
    personaTag: "ai",
  },
  devops: {
    key: "devops",
    title: "DevOps & Cloud",
    description: "How we containerize, test, and deploy applications to production servers.",
    badge: "Infrastructure",
    personaTag: "devops",
  },
};

export const skills: Skill[] = [
  // Full-Stack
  { name: "Next.js", category: "fullstack", tags: ["dev"], featured: true, note: "App Router, Server Components & Server Actions" },
  { name: "TypeScript", category: "fullstack", tags: ["dev"], featured: true, note: "Strict end-to-end typing across frontend and backend" },
  { name: "React", category: "fullstack", tags: ["dev"], featured: true, note: "Hooks, clean component state, optimistic UI" },
  { name: "Python", category: "fullstack", tags: ["dev", "ai"], featured: true, note: "AsyncIO, data processing, model integrations & bots" },
  { name: "FastAPI", category: "fullstack", tags: ["dev", "ai"], featured: true, note: "Pydantic validation, streaming endpoints, typed REST APIs" },
  { name: "HTML5 / JavaScript", category: "fullstack", tags: ["dev", "ai"], featured: true, note: "Semantic UI, DOM manipulation, responsive web interfaces" },
  { name: "Tailwind CSS", category: "fullstack", tags: ["dev"], featured: true, note: "Responsive UI layouts, dark mode tokens" },
  { name: "PostgreSQL", category: "fullstack", tags: ["dev"], featured: true, note: "Relational schema design, indexes, migrations" },
  { name: "Prisma", category: "fullstack", tags: ["dev"], featured: false, note: "Type-safe database ORM and migrations" },

  // AI & ML & Automation
  { name: "RAG Architectures", category: "ai", tags: ["ai"], featured: true, note: "Vector similarity search, document chunking & grounded citations" },
  { name: "Multi-Tenant Bot Architecture", category: "ai", tags: ["ai", "dev"], featured: true, note: "Isolated workspace environments, partitioned vector stores & auth" },
  { name: "LangChain & LLM APIs", category: "ai", tags: ["ai"], featured: true, note: "Prompt chains, tool calling, document parsers & context assembly" },
  { name: "Hugging Face Transformers", category: "ai", tags: ["ai"], featured: true, note: "BART and T5 models for abstractive and extractive text summarization" },
  { name: "Google gTTS & Web Audio", category: "ai", tags: ["ai"], featured: true, note: "Lightweight text-to-speech audio streaming and in-browser playback" },
  { name: "Web Scraping & Lead Bots", category: "ai", tags: ["ai", "dev"], featured: true, note: "Playwright, BeautifulSoup, and automated data extraction pipelines" },
  { name: "Social Media Automation", category: "ai", tags: ["ai", "dev"], featured: false, note: "Celery & Redis asynchronous background dispatch queues" },

  // DevOps / Cloud
  { name: "Docker & Compose", category: "devops", tags: ["dev", "devops"], featured: true, note: "Multi-stage builds, containerized deployment across our project portfolio" },
  { name: "GitHub Actions CI/CD", category: "devops", tags: ["dev", "devops"], featured: true, note: "Automated lint, typecheck, build validation, and SSH deploy triggers" },
  { name: "AWS EC2", category: "devops", tags: ["dev", "devops"], featured: true, note: "Ubuntu instances, Elastic IPs, Security Groups" },
  { name: "Nginx", category: "devops", tags: ["dev", "devops"], featured: true, note: "Reverse proxy, Let's Encrypt SSL termination, Gzip & security headers" },
  { name: "Linux / Bash", category: "devops", tags: ["dev", "devops"], featured: true, note: "Server maintenance, shell automation, environment configuration" },
];
