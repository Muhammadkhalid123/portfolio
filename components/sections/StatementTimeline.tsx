"use client";

import { useState } from "react";
import { playTick } from "@/lib/sound";
import { Terminal, ShieldCheck, Cpu, ArrowUpRight, Activity } from "lucide-react";

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
      "Web text-to-speech architecture with Python and Google's gTTS streaming",
    ],
  },
  {
    id: "fullstack",
    label: "full-stack and automation engineering",
    period: "2023 to 2024",
    bullets: [
      "SMM automation system with Celery and Redis asynchronous worker queues",
      "Text summarization service with fine-tuned Hugging Face transformer models",
      "Enterprise CRM with a visual Kanban sales pipeline and role-based permissions (Prisma, PostgreSQL)",
    ],
  },
  {
    id: "foundations",
    label: "foundations and ML exploration",
    period: "2022 to 2023",
    bullets: [
      "Custom web scraping scripts, automation bots, and full-stack API prototypes",
      "Transformer architectures, NLP pipelines, and speech-synthesis experiments",
      "Standardized multi-stage Docker Compose environments and Linux server administration",
    ],
  },
];

export function StatementTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const togglePeriod = (id: string) => {
    playTick(1600, 0.02);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="statement"
      className="relative w-full py-20 sm:py-24 md:py-32 border-b border-neutral-200 dark:border-neutral-800 bg-[var(--paper)] text-[var(--ink)] overflow-hidden"
      aria-label="Capabilities and Experience Statement"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-14 sm:space-y-18 md:space-y-24">

        {/* =========================================================================
            TOKYO/BERLIN STUDIO HEADER BAR
            ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500 select-none">
          <div className="flex items-center gap-2.5 font-medium text-neutral-900 dark:text-neutral-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>DIRECTIVE 01 // ARCHITECTURAL MANIFESTO</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block">ENV: PRODUCTION</span>
            <span className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>STATUS: ONLINE</span>
            </span>
          </div>
        </div>

        {/* =========================================================================
            HIGH-END STUDIO HEADLINE STATEMENT
            ========================================================================= */}
        <div className="space-y-4 select-none max-w-5xl">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800">
            <span>CORE PHILOSOPHY</span>
          </div>

          <h2 className="text-[36px] sm:text-[52px] md:text-[68px] lg:text-[80px] font-bold tracking-tight leading-[1.02] text-neutral-900 dark:text-neutral-50">
            We build{" "}
            <span className="text-neutral-400 dark:text-neutral-500 font-normal italic font-serif">
              practical
            </span>{" "}
            AI systems that solve real-world problems.
          </h2>
        </div>

        {/* =========================================================================
            STUDIO 2-COLUMN ARCHITECTURAL GRID
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* LEFT COLUMN: Studio Scope Card */}
          <div className="lg:col-span-6 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d hover:shadow-3d-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Card Header */}
            <div className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-neutral-500">
              <span className="flex items-center gap-2 font-medium text-neutral-900 dark:text-neutral-100">
                <Terminal className="w-4 h-4" />
                <span>ENGINEERING SCOPE</span>
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 font-mono text-neutral-600 dark:text-neutral-400">
                SPEC 2.4
              </span>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <p className="text-[17px] sm:text-[19px] leading-[1.65] text-neutral-700 dark:text-neutral-300 font-normal">
                Our focus centers on{" "}
                <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                  full-stack web applications
                </strong>{" "}
                (Next.js, TypeScript, Python/FastAPI),{" "}
                <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                  production AI features
                </strong>
                , and{" "}
                <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                  end-to-end data and crawler pipelines
                </strong>
                .
              </p>

              {/* Studio Tech Badges */}
              <div className="pt-5 border-t border-neutral-200/80 dark:border-neutral-800 space-y-3">
                <div className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest font-medium">
                  PRIMARY ARSENAL
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js 14",
                    "TypeScript",
                    "Python / FastAPI",
                    "RAG & Embeddings",
                    "Playwright",
                    "Docker",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs font-medium px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Bar */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 px-6 py-3 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-center justify-between font-mono text-[11px] text-neutral-500">
              <span>SYSTEM DISCIPLINE</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">ZERO MOCKS · 100% SHIPPED</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Studio Production Benchmarks Matrix */}
          <div className="lg:col-span-6 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d hover:shadow-3d-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Matrix Header */}
            <div className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-neutral-500">
              <span className="flex items-center gap-2 font-medium text-neutral-900 dark:text-neutral-100">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>PRODUCTION BENCHMARKS</span>
              </span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                VERIFIED
              </span>
            </div>

            {/* Data Rows with Subtle Studio Hover */}
            <div className="divide-y border-neutral-200 dark:border-neutral-800 flex-1 flex flex-col justify-around p-2">
              {[
                {
                  idx: "01",
                  stat: "6+ AI & automation systems",
                  detail: "Shipped & production-tested",
                  badge: "LIVE",
                },
                {
                  idx: "02",
                  stat: "100% production-ready",
                  detail: "Real inference pipelines & zero mocks",
                  badge: "VERIFIED",
                },
                {
                  idx: "03",
                  stat: "24/7 autonomous workflows",
                  detail: "Background task queues & crawlers",
                  badge: "DAEMON",
                },
              ].map((item) => (
                <div
                  key={item.idx}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 transition-colors duration-200 cursor-default"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-2 sm:mb-0">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {item.idx}
                    </span>
                    <span className="font-sans font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 tracking-tight">
                      {item.stat}
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 font-mono text-xs text-neutral-500">
                    <span>{item.detail}</span>
                    <span className="hidden sm:inline-block text-[10px] font-medium border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded-full text-neutral-600 dark:text-neutral-400">
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Matrix Footer */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 px-6 py-3 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-center justify-between font-mono text-[11px] text-neutral-500">
              <span>OUTPUT FIDELITY</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">FULL-SYSTEM RESILIENCE</span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            STUDIO EXPERIENCE TIMELINE (Interactive Dossier)
            ========================================================================= */}
        <div className="rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d hover:shadow-3d-hover transition-all duration-300 p-6 sm:p-10 space-y-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 font-mono text-xs uppercase tracking-wider text-neutral-500">
            <div className="flex items-center gap-2 font-medium text-neutral-900 dark:text-neutral-100">
              <Cpu className="w-4 h-4" />
              <span>EXPERIENCE CHRONOLOGY</span>
            </div>
            <span>[INTERACTIVE REGISTRY]</span>
          </div>

          {/* Narrative Paragraph with Refined Studio Buttons */}
          <p className="text-[18px] sm:text-[22px] md:text-[26px] leading-[1.6] text-neutral-900 dark:text-neutral-100 font-normal">
            Currently engineering{" "}
            <button
              type="button"
              onClick={() => togglePeriod("rag")}
              className={`inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold uppercase px-3.5 py-1 rounded-full border transition-all cursor-pointer ${
                expandedId === "rag"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700"
              }`}
              aria-expanded={expandedId === "rag"}
            >
              <span>RAG chatbots &amp; AI systems</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>{" "}
            <span className="font-mono text-xs sm:text-sm text-neutral-400 font-normal">
              (2024 to present)
            </span>
            . Before that,{" "}
            <button
              type="button"
              onClick={() => togglePeriod("fullstack")}
              className={`inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold uppercase px-3.5 py-1 rounded-full border transition-all cursor-pointer ${
                expandedId === "fullstack"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700"
              }`}
              aria-expanded={expandedId === "fullstack"}
            >
              <span>full-stack &amp; automation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>{" "}
            <span className="font-mono text-xs sm:text-sm text-neutral-400 font-normal">
              (2023 to 2024)
            </span>{" "}
            and{" "}
            <button
              type="button"
              onClick={() => togglePeriod("foundations")}
              className={`inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold uppercase px-3.5 py-1 rounded-full border transition-all cursor-pointer ${
                expandedId === "foundations"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700"
              }`}
              aria-expanded={expandedId === "foundations"}
            >
              <span>foundations &amp; ML exploration</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>{" "}
            <span className="font-mono text-xs sm:text-sm text-neutral-400 font-normal">
              (2022 to 2023)
            </span>
            .
          </p>

          {/* Technical Dossier Drawer */}
          {expandedId && (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 p-6 sm:p-8 animate-fadeIn transition-all">
              {(() => {
                const active = timelineData.find((t) => t.id === expandedId);
                if (!active) return null;
                return (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 font-mono text-xs sm:text-sm">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100 uppercase">
                        DOSSIER // {active.label}
                      </span>
                      <span className="font-medium text-xs px-2.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {active.period.toUpperCase()}
                      </span>
                    </div>
                    <ul className="space-y-2.5 font-mono text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                      {active.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span className="leading-relaxed">{bullet}</span>
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
