"use client";

import { useState } from "react";
import { playTick } from "@/lib/sound";
import { Cpu, Server, Terminal, Shield } from "lucide-react";

interface StackGroup {
  id: string;
  index: string;
  category: string;
  subtitle: string;
  icon: typeof Cpu;
  technologies: string[];
  specs: string[];
}

const stackGroups: StackGroup[] = [
  {
    id: "ai",
    index: "01",
    category: "AI & Vector Intelligence",
    subtitle: "Inference pipelines, embeddings, and autonomous workers",
    icon: Cpu,
    technologies: [
      "RAG Architecture",
      "LangChain",
      "Vector Embeddings",
      "Hugging Face",
      "Playwright",
      "Celery / Redis",
    ],
    specs: [
      "Dense vector similarity search with semantic distance thresholds (0.82+)",
      "Strict grounding pipelines with document citations to eliminate hallucinations",
      "Asynchronous background worker queues for decoupled scraping & LLM tasks",
      "Web-native text-to-speech audio streaming via Python & gTTS",
    ],
  },
  {
    id: "fullstack",
    index: "02",
    category: "Full-Stack Web Systems",
    subtitle: "Type-safe architectures, streaming UI, and relational data",
    icon: Server,
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Python / FastAPI",
      "React 18",
      "PostgreSQL",
      "Prisma ORM",
      "Tailwind CSS",
    ],
    specs: [
      "Server-side rendering (SSR), streaming responses, and React Server Components",
      "End-to-end schema validation powered by Pydantic (backend) and Zod (client)",
      "Relational data modeling, connection pooling, and automated Prisma migrations",
      "Token-driven modern UI systems with custom micro-interactions",
    ],
  },
  {
    id: "devops",
    index: "03",
    category: "DevOps & Cloud Infrastructure",
    subtitle: "Hardened environments, minimal containers, and CI/CD",
    icon: Terminal,
    technologies: [
      "Docker Compose",
      "GitHub Actions",
      "AWS EC2",
      "Nginx",
      "Linux / Bash",
      "TLS 1.3 / SSL",
    ],
    specs: [
      "Multi-stage Docker builds resulting in lean production images (<120MB)",
      "Automated GitHub Actions CI/CD with strict linting, typecheck, and GHCR push",
      "Zero-downtime rolling container swaps triggered via SSH deployment scripts",
      "Reverse proxy with Nginx, rate-limiting, and automated Let's Encrypt SSL",
    ],
  },
];

export function StackRows() {
  const [activeGroup, setActiveGroup] = useState<string>("ai");

  return (
    <section
      id="stack"
      className="relative w-full py-20 sm:py-24 md:py-32 border-b border-neutral-200 dark:border-neutral-800 bg-[var(--paper)] text-[var(--ink)]"
      aria-label="Engineering Stack & System Architecture"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-12 sm:space-y-14">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-medium uppercase tracking-widest text-neutral-500">
              <Shield className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>INDEX 03 // ARCHITECTURAL STACK &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Production Stack &amp; Infrastructure
            </h2>
          </div>
          <div className="font-mono text-xs font-medium px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400">
            AUDITED FOR RESILIENCE
          </div>
        </div>

        {/* 3-Column Studio Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {stackGroups.map((group) => {
            const Icon = group.icon;
            const isSelected = activeGroup === group.id;

            return (
              <div
                key={group.id}
                onClick={() => {
                  playTick(1800, 0.02);
                  setActiveGroup(group.id);
                }}
                className={`rounded-2xl border bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d hover:shadow-3d-hover hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected
                    ? "border-neutral-900 dark:border-white ring-1 ring-neutral-900 dark:ring-white"
                    : "border-neutral-200/90 dark:border-white/10 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                {/* Card Top Banner */}
                <div>
                  <div className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-neutral-500">
                    <span className="flex items-center gap-2 font-medium text-neutral-900 dark:text-neutral-100">
                      <Icon className="w-4 h-4" />
                      <span>{group.index} // ARCHITECTURE</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-[10px] text-neutral-700 dark:text-neutral-300 font-medium">
                      VERIFIED
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {group.category}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 font-mono mt-1">
                        {group.subtitle}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {group.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Specs / Deliverables */}
                    <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 space-y-2.5">
                      <div className="font-mono text-[10px] uppercase font-medium text-neutral-400 tracking-widest">
                        KEY DELIVERABLES
                      </div>
                      <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300">
                        {group.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span className="leading-relaxed">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="border-t border-neutral-200 dark:border-neutral-800 px-6 py-3 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-center justify-between font-mono text-[11px] text-neutral-500">
                  <span>DISCIPLINE</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">ZERO CRITICAL BUGS</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
