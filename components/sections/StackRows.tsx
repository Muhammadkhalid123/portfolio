"use client";

import { useState } from "react";
import { playTick } from "@/lib/sound";

interface StackGroup {
  id: string;
  category: string;
  technologies: string;
  details: string;
}

const stackGroups: StackGroup[] = [
  {
    id: "ai",
    category: "AI & automation",
    technologies: "RAG · LangChain · Hugging Face · gTTS · Playwright · Celery/Redis",
    details: "Vector similarity search, document chunking, prompt engineering, grounded citations, transformer pipelines, headless crawlers, and asynchronous background worker queues.",
  },
  {
    id: "fullstack",
    category: "Full-stack",
    technologies: "Next.js · TypeScript · React · Python · FastAPI · PostgreSQL · Prisma · Tailwind",
    details: "Server-side rendering, streaming responses, type-safe API schemas with Pydantic & Zod, relational data modeling, migrations, and responsive component systems.",
  },
  {
    id: "devops",
    category: "DevOps & cloud",
    technologies: "Docker · GitHub Actions · AWS EC2 · Nginx · Linux",
    details: "Multi-stage minimal container builds (<120MB), automated CI/CD validation pipelines, zero-downtime SSH container swaps, hardened reverse proxies, and automated Let's Encrypt SSL.",
  },
];

export function StackRows() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleStack = (id: string) => {
    playTick(1700, 0.02);
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--rule)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="mono text-[13px] text-[var(--muted)] uppercase tracking-wider pb-8 border-b border-[var(--rule)]">
          // ENGINEERING STACK
        </div>

        <div className="divide-y divide-[var(--rule)]">
          {stackGroups.map((group) => {
            const isOpen = openId === group.id;

            return (
              <div key={group.id} className="py-6 md:py-8 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleStack(group.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline cursor-pointer group select-none"
                >
                  {/* Category Title */}
                  <span className="md:col-span-4 text-[22px] sm:text-[28px] md:text-[32px] font-normal tracking-tight text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--rule)]">
                    {group.category}
                  </span>

                  {/* Mono Technologies String */}
                  <div className="md:col-span-8 flex items-baseline justify-between gap-4">
                    <span className="mono text-[13px] sm:text-[14px] text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">
                      {group.technologies}
                    </span>
                    <span className="mono text-[13px] text-[var(--muted)]">
                      {isOpen ? "[-]" : "[+]"}
                    </span>
                  </div>
                </button>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-[var(--rule)]/60 text-[15px] text-[var(--muted)] leading-relaxed max-w-[80ch] animate-fadeIn">
                    <p>{group.details}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
