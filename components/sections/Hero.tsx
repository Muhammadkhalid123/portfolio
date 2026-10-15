"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { playTick } from "@/lib/sound";
import { useSmoothScroll } from "@/components/ui/SmoothScrollProvider";
import { HeroWatermarkName } from "./HeroWatermarkName";

export interface HeroProps {
  persona?: string;
}

export function Hero({ persona }: HeroProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    playTick(1600, 0.02);
    setMobileMenuOpen(false);
    scrollTo(targetId, { offset: -30, duration: 1.2 });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[550px] overflow-hidden bg-[var(--paper)] text-[var(--ink)] flex flex-col border-b-2 sm:border-b-[3px] border-black dark:border-white"
      aria-label="Hero Introduction"
    >
      {/* Split Hero Panel: Half Black / Half White (Vertical 50/50 Split on all screens, full edge-to-edge section) */}
      <div className="relative w-full h-full flex-1 overflow-hidden flex flex-row z-10">

          {/* =========================================================================
              LEFT HALF: BLACK PANEL (White Font)
              ========================================================================= */}
          <div className="relative w-1/2 h-full bg-[#181918] text-white flex flex-col justify-between p-3.5 sm:p-5 md:p-7 lg:p-8 xl:p-10 border-r border-[#262826] overflow-hidden z-10">

            {/* Subtle Gradient & Dark-Green Glow Layer */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: `
                  radial-gradient(circle at 75% 50%, rgba(38, 58, 44, 0.45) 0%, rgba(26, 36, 28, 0.25) 40%, rgba(24, 25, 24, 0.85) 75%, #181918 100%),
                  linear-gradient(135deg, #202220 0%, #181918 50%, #131413 100%)
                `,
              }}
              aria-hidden="true"
            />

            {/* Subtle Ambient Grain Texture */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
              aria-hidden="true"
            />

            {/* Left Header: Brand in White Font */}
            <header className="relative z-40 flex items-center justify-between w-full mb-3 sm:mb-4 lg:mb-5 flex-shrink-0">
              <Link
                href="/"
                onClick={() => playTick(1400)}
                className="group inline-flex items-center gap-2.5 sm:gap-3 text-white font-bold tracking-tight text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1"
              >
                {/* <span className="tracking-tight uppercase font-extrabold text-xs sm:text-sm md:text-base group-hover:text-neutral-200 transition-colors">
                  Muhammad Khalid
                </span>
                <span className="hidden sm:inline-block font-mono text-[11px] text-neutral-400 font-normal px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  AI &amp; Full-Stack
                </span> */}
              </Link>
            </header>

            {/* Left Center: Headline, Tagline, Subtext & CTA Buttons (White Font, adjusted width) */}
            {/* <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[360px] sm:max-w-[420px] lg:max-w-[360px] xl:max-w-[430px] py-1 sm:py-2 my-auto">

              {/* Condensed Uppercase Headline in White */}
            <h1
              className="font-sans font-black uppercase text-white leading-[0.92] tracking-[-0.04em] select-none text-[18px] xs:text-[22px] sm:text-[32px] md:text-[40px] lg:text-[44px] xl:text-[54px]"
              aria-label="AI and Full-Stack Engineering"
            >
              <span className="block drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                AI &amp;
              </span>
              <span className="block text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mt-0.5">
                FULL-STACK
              </span>
              <span className="block text-neutral-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mt-0.5">
                ENGINEERING
              </span>
            </h1>

            {/* Tagline & Subtext in White / Light Gray */}
            {/* <div className="mt-2.5 sm:mt-3.5 space-y-1 sm:space-y-1.5 max-w-[340px] sm:max-w-[380px]">
                <p className="text-[#F0F2F0] text-xs sm:text-sm lg:text-[15px] font-medium leading-snug tracking-tight">
                  We build practical AI systems that deliver real results.
                </p>
                <p className="text-neutral-400 text-[11px] sm:text-xs leading-relaxed">
                  Production-ready AI systems: RAG chatbots, multi-tenant conversational platforms, document summarization, lightweight speech synthesis, and autonomous lead-generation bots.
                </p>
              </div> */}

            {/* CTA Buttons */}
            {/* <div className="mt-3.5 sm:mt-4 lg:mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href="#work"
                  onClick={(e) => handleNavClick(e, "work")}
                  className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#161616] font-semibold text-xs sm:text-sm hover:bg-[#F2F4F2] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-[0_8px_20px_rgba(0,0,0,0.25)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>View Work</span>
                  <div className="w-4 h-4 rounded-full bg-[#161616] text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </a>

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-neutral-300 hover:text-white font-medium text-xs sm:text-sm transition-colors border border-white/10 hover:border-white/25 hover:bg-white/5"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div> */}

            {/* </div>  */}

            {/* Left Bottom: Metadata in White / Muted Font */}
            {/* <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>// PRODUCTION SYSTEMS</span>
              <span>ZERO MOCKS</span>
            </div> */}

          </div>

          {/* =========================================================================
              RIGHT HALF: WHITE PANEL (Black Font)
              ========================================================================= */}
          <div className="relative w-1/2 h-full bg-[#FFFFFF] text-[#161616] flex flex-col justify-between p-3.5 sm:p-5 md:p-7 lg:p-8 xl:p-10 overflow-hidden z-10">

            {/* Right Header: Nav Links & Menu in Black Font */}
            <header className="relative z-40 flex items-center justify-end w-full mb-3 sm:mb-4 lg:mb-5 flex-shrink-0 gap-4 sm:gap-5">
              <nav className="hidden lg:flex items-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-widest text-[#161616]/80 font-semibold">
                <a
                  href="#work"
                  onClick={(e) => handleNavClick(e, "work")}
                  className="hover:text-[#161616] transition-colors duration-150 py-1"
                >
                  Work
                </a>
                <a
                  href="#statement"
                  onClick={(e) => handleNavClick(e, "statement")}
                  className="hover:text-[#161616] transition-colors duration-150 py-1"
                >
                  About
                </a>
                <a
                  href="#pipeline"
                  onClick={(e) => handleNavClick(e, "pipeline")}
                  className="hover:text-[#161616] transition-colors duration-150 py-1"
                >
                  Pipeline
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="hover:text-[#161616] transition-colors duration-150 py-1"
                >
                  Contact
                </a>
              </nav>

              {/* Mobile / Tablet Menu Trigger Button (Hidden on Desktop screens) */}
              <button
                type="button"
                onClick={() => {
                  playTick(1600);
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                className="flex lg:hidden w-8 h-8 sm:w-9 sm:h-9 border-2 border-black bg-white dark:bg-black hover:bg-black/[0.05] text-[#161616] items-center justify-center transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black shadow-[2px_2px_0px_0px_#000]"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </header>

            {/* Mobile Dropdown Menu (Adaptive Theme, Hidden on Desktop) */}
            {mobileMenuOpen && (
              <div className="absolute top-16 sm:top-20 left-4 right-4 sm:left-6 sm:right-6 z-50 bg-[#FFFFFF] border-2 border-black p-5 shadow-[6px_6px_0px_0px_#000] flex flex-col gap-3 animate-fadeIn text-[#161616] lg:hidden">
                <nav className="flex flex-col gap-2.5 font-mono text-sm uppercase tracking-wider text-[#161616]">
                  <a
                    href="#work"
                    onClick={(e) => handleNavClick(e, "work")}
                    className="py-1.5 border-b border-black/10 hover:text-neutral-600"
                  >
                    Work
                  </a>
                  <a
                    href="#statement"
                    onClick={(e) => handleNavClick(e, "statement")}
                    className="py-1.5 border-b border-black/10 hover:text-neutral-600"
                  >
                    About
                  </a>
                  <a
                    href="#pipeline"
                    onClick={(e) => handleNavClick(e, "pipeline")}
                    className="py-1.5 border-b border-black/10 hover:text-neutral-600"
                  >
                    Pipeline
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "contact")}
                    className="py-1.5 hover:text-neutral-600"
                  >
                    Contact
                  </a>
                </nav>
                <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span>Remote / Worldwide</span>
                  <span className="font-semibold text-[#161616]">Available</span>
                </div>
              </div>
            )}

            {/* Right Center: Architecture & Specialization Rows (Black Font, aligned right)
            <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[360px] sm:max-w-[420px] lg:max-w-[360px] xl:max-w-[430px] lg:ml-auto py-1 sm:py-2 my-auto">
              
              <div className="mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1 sm:mb-1.5">
                // ARCHITECTURE &amp; PRODUCTION FOCUS
              </div>

              <h2 className="text-base sm:text-lg lg:text-[20px] xl:text-[24px] font-extrabold text-[#161616] tracking-tight leading-snug mb-2 sm:mb-3">
                Scalable AI &amp; Web Applications
              </h2>

              {/* 3 Structured Spec Cards in Black Font */}
            {/* <div className="space-y-1.5 sm:space-y-2">
                
                <div className="p-2.5 sm:p-3 rounded-[12px] bg-[#F7F7F7] border border-[#EBEBEB] space-y-0.5">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold text-[#161616]">
                    <span>01 / RAG &amp; Vector Intelligence</span>
                    <span className="text-neutral-500 font-normal hidden xl:inline">FastAPI</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                    Custom document chunking, dense vector retrieval, and grounded citation pipelines.
                  </p>
                </div>

                <div className="p-2.5 sm:p-3 rounded-[12px] bg-[#F7F7F7] border border-[#EBEBEB] space-y-0.5">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold text-[#161616]">
                    <span>02 / Full-Stack Enterprise Systems</span>
                    <span className="text-neutral-500 font-normal hidden xl:inline">Next.js · TS</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                    Multi-tenant interfaces, PostgreSQL data modeling, Redis caching, and Docker.
                  </p>
                </div>

                <div className="p-2.5 sm:p-3 rounded-[12px] bg-[#F7F7F7] border border-[#EBEBEB] space-y-0.5">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold text-[#161616]">
                    <span>03 / Autonomous Crawlers &amp; Queues</span>
                    <span className="text-neutral-500 font-normal hidden xl:inline">Playwright</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                    High-throughput web scrapers, proxy rotation, and asynchronous task runners.
                  </p>
                </div>

              </div>

            </div>  */}

            {/* Right Bottom: Availability in Black Font */}
            {/* <div className="relative z-10 pt-2.5 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-neutral-600">
              <span>Remote / Worldwide</span>
              <span className="font-bold text-[#161616]">Available for Contracts &amp; Projects</span>
            </div> */}

          </div>

          {/* =========================================================================
              LAYER 2: SOLID WATERMARK NAME "KHALED" (Behind Person, z-20)
              ========================================================================= */}
          <HeroWatermarkName layer="solid" />

          {/* =========================================================================
              LAYER 3: CENTER TALL PERSON CUTOUT: public/images/mine-without-bg.png (z-[25])
              Centered horizontally right over the seam to hide the center breaking line.
              ========================================================================= */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-[25] w-[280px] sm:w-[340px] md:w-[390px] lg:w-[430px] xl:w-[480px] h-[86%] sm:h-[90%] lg:h-[95%]"
            aria-hidden="true"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/mine-without-bg.png"
                alt="Muhammad Khalid — AI and Full-Stack Engineer"
                priority
                fill
                sizes="(min-width: 1280px) 480px, (min-width: 1024px) 430px, (min-width: 768px) 390px, 320px"
                className="object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>

          {/* =========================================================================
              LAYER 4: OUTLINE-ONLY LETTER "A" (In Front of Person's Face, z-30)
              ========================================================================= */}
          <HeroWatermarkName layer="outline" outlineLetter="A" />

        </div>
    </section>
  );
}
