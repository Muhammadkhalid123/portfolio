import { PersonaTag } from "./projects";

export interface Skill {
  name: string;
  category: "devops" | "fullstack" | "ai" | "databases_tools";
  level: number; // 1-100
  tags: PersonaTag[];
  featured?: boolean;
  iconName?: string;
  description?: string;
}

export interface SkillCategory {
  key: "devops" | "fullstack" | "ai" | "databases_tools";
  title: string;
  description: string;
  badge: string;
  personaTag: PersonaTag;
}

export const skillCategories: Record<string, SkillCategory> = {
  devops: {
    key: "devops",
    title: "DevOps & Cloud Infrastructure",
    description: "Automated container builds, CI/CD orchestration, reverse proxy configurations, and AWS EC2 hosting.",
    badge: "Infrastructure",
    personaTag: "devops",
  },
  fullstack: {
    key: "fullstack",
    title: "Full-Stack Web Engineering",
    description: "Modern, high-performance web applications, server components, reactive frontends, and typed REST/tRPC APIs.",
    badge: "Core Stack",
    personaTag: "dev",
  },
  ai: {
    key: "ai",
    title: "AI, RAG & Neural Models",
    description: "Retrieval-Augmented Generation, LLM fine-tuning, neural text-to-speech audio, and vector search systems.",
    badge: "Machine Learning",
    personaTag: "ai",
  },
  databases_tools: {
    key: "databases_tools",
    title: "Databases, Caching & Tooling",
    description: "Relational persistence, vector databases, high-speed memory caching, and developer toolchains.",
    badge: "Data & Tools",
    personaTag: "dev",
  },
};

export const skills: Skill[] = [
  // DevOps & Cloud
  { name: "Docker & Compose", category: "devops", level: 94, tags: ["dev", "devops"], featured: true, description: "Multi-stage builds, Alpine optimizations, bridge networks" },
  { name: "GitHub Actions CI/CD", category: "devops", level: 92, tags: ["dev", "devops"], featured: true, description: "Automated test suites, GHCR publishing, SSH EC2 rollouts" },
  { name: "AWS (EC2, S3, IAM)", category: "devops", level: 88, tags: ["dev", "devops"], featured: true, description: "Instance provisioning, security groups, Elastic IPs" },
  { name: "Nginx Reverse Proxy", category: "devops", level: 90, tags: ["dev", "devops"], featured: true, description: "SSL/TLS termination, rate limiting, gzip, security headers" },
  { name: "Linux / Bash Scripting", category: "devops", level: 89, tags: ["dev", "devops"], featured: true, description: "Server administration, cron scheduling, automation scripts" },
  { name: "Zero-Downtime Rollouts", category: "devops", level: 86, tags: ["dev", "devops"], featured: false, description: "Atomic container swap, health check verifications" },

  // Full Stack
  { name: "TypeScript / JavaScript", category: "fullstack", level: 96, tags: ["dev"], featured: true, description: "Strict typing, generics, modern ESNext patterns" },
  { name: "Next.js 14 (App Router)", category: "fullstack", level: 95, tags: ["dev"], featured: true, description: "RSC, Server Actions, dynamic routes, SSG/SSR" },
  { name: "React 18", category: "fullstack", level: 94, tags: ["dev"], featured: true, description: "Hooks, custom state architecture, optimistic updates" },
  { name: "Python", category: "fullstack", level: 93, tags: ["dev", "ai"], featured: true, description: "AsyncIO, OOP, data processing, model integrations" },
  { name: "FastAPI", category: "fullstack", level: 92, tags: ["dev", "ai"], featured: true, description: "Pydantic data validation, OpenAPI specs, SSE streaming" },
  { name: "Node.js", category: "fullstack", level: 90, tags: ["dev"], featured: false, description: "Express, microservices, asynchronous I/O" },
  { name: "Tailwind CSS", category: "fullstack", level: 96, tags: ["dev"], featured: true, description: "Responsive layouts, custom design tokens, dark modes" },

  // AI & ML
  { name: "RAG Architectures", category: "ai", level: 94, tags: ["ai"], featured: true, description: "Dense vector retrieval, hybrid BM25 search, reranking" },
  { name: "LangChain & LlamaIndex", category: "ai", level: 91, tags: ["ai"], featured: true, description: "Agent tool calling, conversational memory, document parsers" },
  { name: "Hugging Face / Transformers", category: "ai", level: 89, tags: ["ai"], featured: true, description: "Text summarization, BART, T5, BERT embeddings" },
  { name: "Neural TTS & Audio (Coqui/Whisper)", category: "ai", level: 88, tags: ["ai"], featured: true, description: "Acoustic vocoders, phoneme mapping, speech transcription" },
  { name: "Vector DBs (Qdrant, Pinecone)", category: "ai", level: 90, tags: ["ai", "dev"], featured: true, description: "Cosine similarity, payload filtering, index optimization" },
  { name: "Prompt Engineering & Guardrails", category: "ai", level: 93, tags: ["ai"], featured: false, description: "Structured JSON outputs, few-shot prompting, safety checks" },

  // Databases & Tools
  { name: "PostgreSQL & Prisma", category: "databases_tools", level: 92, tags: ["dev"], featured: true, description: "Relational modeling, indexing, ACID transactions, migrations" },
  { name: "Redis", category: "databases_tools", level: 89, tags: ["dev"], featured: true, description: "Task queues, pub/sub, distributed caching, session storage" },
  { name: "Git / GitHub Workflow", category: "databases_tools", level: 95, tags: ["dev", "devops", "ai"], featured: true, description: "Branching strategies, PR reviews, release tagging" },
  { name: "REST & WebSockets", category: "databases_tools", level: 91, tags: ["dev", "ai"], featured: false, description: "Real-time communication, bi-directional event streaming" },
];
