"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DepthPortrait } from "@/components/ui/DepthPortrait";

export interface HeroProps {
  persona?: string;
}

export function Hero({ persona }: HeroProps = {}) {
  const heroRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Title lines rise through mask (0.9s, expo.out, 0.09s stagger)
      tl.from([titleLine1Ref.current, titleLine2Ref.current], {
        yPercent: 110,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.09,
      })
      // The one-liner, intro and availability fade in with 0.3s duration and 0.6s delay (HAOQI token)
      .from(afterRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      }, ">-0.3+0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden border-b border-[var(--rule)]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Giant Tight Display Title + Explanatory Copy */}
          <div className="lg:col-span-8 z-10">
            {/* Title with screen reader label and masked visual spans */}
            <h1
              className="display tracking-[-0.03em] select-none"
              aria-label="AI and Full-Stack Engineering"
            >
              <div className="overflow-hidden">
                <span ref={titleLine1Ref} className="block" aria-hidden="true">
                  AI &amp; Full-Stack
                </span>
              </div>
              <div className="overflow-hidden mt-1 sm:mt-2">
                <span ref={titleLine2Ref} className="block" aria-hidden="true">
                  Engineering
                </span>
              </div>
            </h1>

            {/* After Content: One-line, Intro, Availability */}
            <div ref={afterRef} className="mt-8 md:mt-12 space-y-6 max-w-[62ch]">
              <p className="statement text-[22px] sm:text-[28px] md:text-[32px] text-[var(--ink)] leading-[1.15]">
                We build practical AI systems that deliver real results.
              </p>

              <p className="body text-[var(--muted)] text-[16px] leading-[1.5]">
                We specialize in production-ready AI systems: RAG chatbots, multi-tenant conversational platforms, document summarization, lightweight speech synthesis, and autonomous lead-generation bots.
              </p>

              <div className="pt-2 flex items-center gap-3 mono text-[13px] text-[var(--muted)]">
                <span className="inline-block w-2 h-2 bg-[var(--ink)]" aria-hidden="true" />
                <span>Available worldwide / remote. Available for projects and contracts.</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Depth Portrait Character Overlapping Hero */}
          <div className="lg:col-span-4 relative mt-4 lg:mt-0 flex justify-start lg:justify-end">
            <div className="w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] relative bg-[var(--paper)] border border-[var(--rule)]">
              <DepthPortrait
                imageSrc="/images/khalid_portrait.jpg"
                depthSrc="/images/khalid_depth.jpg"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
