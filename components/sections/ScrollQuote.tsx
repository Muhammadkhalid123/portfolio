"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollQuote() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const quote =
    "We focus on creating production-ready architectures that hold up under real-world usage, combining intuitive web frontends with high-performance Python inference services.";

  const words = quote.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !textRef.current) return;

    const wordSpans = textRef.current.querySelectorAll(".quote-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordSpans,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 45%",
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
      className="w-full py-20 md:py-32 border-b border-[var(--rule)]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="mono text-[12px] text-[var(--muted)] mb-8 uppercase tracking-wider">
          // ENGINEERING PHILOSOPHY
        </div>

        <p
          ref={textRef}
          className="statement text-[28px] sm:text-[40px] md:text-[52px] lg:text-[62px] leading-[1.08] text-[var(--ink)] tracking-tight max-w-[1100px] select-none"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="quote-word inline-block mr-[0.25em] transition-opacity"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
