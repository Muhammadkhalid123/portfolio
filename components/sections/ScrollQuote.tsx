"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal } from "lucide-react";

export function ScrollQuote() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const manifestoWords = [
    "Architecture",
    "over",
    "hype.",
    "Production",
    "over",
    "prototypes.",
    "Deterministic",
    "systems",
    "over",
    "fragile",
    "prompts.",
  ];

  const principles = [
    {
      code: "01",
      title: "ZERO MOCKS",
      desc: "Every endpoint connects to live inference engines, real vector collections, and persistent relational storage.",
    },
    {
      code: "02",
      title: "GROUNDED CITATIONS",
      desc: "RAG retrieval pipelines enforce strict semantic distance thresholds (0.82+) to eliminate hallucination.",
    },
    {
      code: "03",
      title: "MINIMAL SURFACES",
      desc: "Multi-stage Alpine Docker containers compiled under 120MB with unprivileged non-root execution.",
    },
    {
      code: "04",
      title: "SUB-SECOND TTFT",
      desc: "Streaming generator responses delivering Time-To-First-Token under 250ms on real workloads.",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !textRef.current) return;

    const wordSpans = textRef.current.querySelectorAll(".manifesto-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordSpans,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 sm:py-24 md:py-32 border-b border-neutral-200 dark:border-neutral-800 bg-[var(--paper)] text-[var(--ink)]"
      aria-label="Engineering Manifesto"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-12 sm:space-y-16">

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500 select-none">
          <div className="flex items-center gap-2 font-medium text-neutral-900 dark:text-neutral-100">
            <Terminal className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
            <span>MANIFESTO 05 // PHILOSOPHICAL FOUNDATIONS</span>
          </div>
          <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
            CORE DISCIPLINE
          </span>
        </div>

        {/* Massive Manifesto Scroller */}
        <div className="space-y-4 max-w-5xl">
          <p
            ref={textRef}
            className="text-[34px] sm:text-[48px] md:text-[62px] lg:text-[76px] font-bold tracking-tight leading-[1.05] text-neutral-900 dark:text-neutral-50 select-none"
          >
            {manifestoWords.map((word, i) => (
              <span
                key={i}
                className="manifesto-word inline-block mr-[0.25em] transition-opacity"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* 4 Studio Principle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item) => (
            <div
              key={item.code}
              className="rounded-2xl border border-neutral-200/90 dark:border-white/10 p-6 bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d hover:shadow-3d-hover hover:-translate-y-1.5 flex flex-col justify-between space-y-4 transition-all duration-300"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                    {item.code}
                  </span>
                  <span className="text-neutral-400 font-medium uppercase tracking-wider text-[10px]">
                    PROTOCOL
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </h3>
              </div>

              <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
