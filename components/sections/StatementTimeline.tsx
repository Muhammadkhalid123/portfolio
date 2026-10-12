"use client";

import { useState } from "react";
import { playTick } from "@/lib/sound";

interface TimelinePeriod {
  id: string;
  label: string;
  period: string;
  bullets: string[];
}

const timelineData: TimelinePeriod[] = [
  {
    id: "rag",
    label: "RAG chatbots and AI systems",
    period: "2024 to present",
    bullets: [
      "RAG chatbot with vector chunking, dense embeddings, and grounded citations",
      "Multi-tenant platform with isolated tenant knowledge bases and custom prompts",
      "Lead-generation crawler pipeline with Playwright, BeautifulSoup, and proxy rotation",
      "Web text-to-speech architecture with Python and Google's gTTS streaming"
    ],
  },
  {
    id: "fullstack",
    label: "full-stack and automation engineering",
    period: "2023 to 2024",
    bullets: [
      "SMM automation system with Celery and Redis asynchronous worker queues",
      "Text summarization service with fine-tuned Hugging Face transformer models",
      "Enterprise CRM with a visual Kanban sales pipeline and role-based permissions (Prisma, PostgreSQL)"
    ],
  },
  {
    id: "foundations",
    label: "foundations and ML exploration",
    period: "2022 to 2023",
    bullets: [
      "Custom web scraping scripts, automation bots, and full-stack API prototypes",
      "Transformer architectures, NLP pipelines, and speech-synthesis experiments",
      "Standardized multi-stage Docker Compose environments and Linux server administration"
    ],
  },
];

export function StatementTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const togglePeriod = (id: string) => {
    playTick(1600, 0.02);
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-16 md:py-24 border-b border-[var(--rule)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-16 md:space-y-24">
        
        {/* Block 3: Statement in three short lines */}
        <div className="statement space-y-1 text-[var(--ink)] select-none">
          <div className="overflow-hidden">
            <span className="block leading-[1.0]">We build</span>
          </div>
          <div className="overflow-hidden">
            <span className="block leading-[1.0] font-bold">practical AI systems</span>
          </div>
          <div className="overflow-hidden">
            <span className="block leading-[1.0]">that solve real-world problems.</span>
          </div>
        </div>

        {/* Block 4: Short paragraph + Three Fact Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <p className="body text-[var(--muted)] text-[17px] leading-[1.6]">
              Our work spans full-stack web applications (Next.js, TypeScript, Python/FastAPI), production AI features, and end-to-end data and crawler pipelines.
            </p>
          </div>

          <div className="lg:col-span-6 border-t border-[var(--rule)]">
            {[
              { stat: "6+ AI & automation systems", detail: "Shipped & production-tested" },
              { stat: "100% production-ready", detail: "Real inference pipelines & zero mocks" },
              { stat: "24/7 autonomous workflows", detail: "Background task queues & crawlers" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="py-4 border-b border-[var(--rule)] flex items-center justify-between mono text-[13px]"
              >
                <span className="text-[var(--ink)] font-bold">{item.stat}</span>
                <span className="text-[var(--muted)]">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Block 5: Currently, Previously (Sentence with interactive expansion) */}
        <div className="pt-4 border-t border-[var(--rule)]">
          <div className="mono text-[12px] text-[var(--muted)] mb-4 uppercase tracking-wider">
            // EXPERIENCE TIMELINE
          </div>
          
          <p className="text-[20px] sm:text-[24px] md:text-[28px] leading-[1.3] text-[var(--ink)]">
            Currently engineering{" "}
            <button
              type="button"
              onClick={() => togglePeriod("rag")}
              className={`underline underline-offset-4 font-bold decoration-[var(--rule)] hover:decoration-[var(--ink)] transition-colors cursor-pointer ${
                expandedId === "rag" ? "bg-[var(--ink)] text-[var(--paper)] px-1 no-underline" : ""
              }`}
              aria-expanded={expandedId === "rag"}
            >
              RAG chatbots and AI systems
            </button>{" "}
            (2024 to present). Before that,{" "}
            <button
              type="button"
              onClick={() => togglePeriod("fullstack")}
              className={`underline underline-offset-4 font-bold decoration-[var(--rule)] hover:decoration-[var(--ink)] transition-colors cursor-pointer ${
                expandedId === "fullstack" ? "bg-[var(--ink)] text-[var(--paper)] px-1 no-underline" : ""
              }`}
              aria-expanded={expandedId === "fullstack"}
            >
              full-stack and automation engineering
            </button>{" "}
            (2023 to 2024) and{" "}
            <button
              type="button"
              onClick={() => togglePeriod("foundations")}
              className={`underline underline-offset-4 font-bold decoration-[var(--rule)] hover:decoration-[var(--ink)] transition-colors cursor-pointer ${
                expandedId === "foundations" ? "bg-[var(--ink)] text-[var(--paper)] px-1 no-underline" : ""
              }`}
              aria-expanded={expandedId === "foundations"}
            >
              foundations and ML exploration
            </button>{" "}
            (2022 to 2023).
          </p>

          {/* Interactive expansion drawer */}
          {expandedId && (
            <div className="mt-8 p-6 bg-[var(--paper)] border border-[var(--rule)] animate-fadeIn transition-all">
              {(() => {
                const active = timelineData.find(t => t.id === expandedId);
                if (!active) return null;
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)] mono text-[13px]">
                      <span className="font-bold text-[var(--ink)]">{active.label}</span>
                      <span className="text-[var(--muted)]">{active.period}</span>
                    </div>
                    <ul className="space-y-2 mono text-[13px] text-[var(--muted)]">
                      {active.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span className="text-[var(--ink)] font-bold">—</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
