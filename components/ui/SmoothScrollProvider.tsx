"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Butter smooth easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();

      // Update top progress bar
      if (progressBarRef.current) {
        const progress = e.progress * 100;
        progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth Anchor Link Interceptor via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        if (href === "#" || href === "#top") {
          lenis.scrollTo(0, { duration: 1.2 });
        } else {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
          }
        }

        if (window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [pathname]);

  return (
    <>
      {/* Top Scroll Progress Indicator (Butter Video Electric #00FFD0 Accent) */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full bg-[#00FFD0] shadow-[0_0_14px_rgba(0,255,208,0.9)] transition-all duration-75 ease-out"
          style={{ width: "0%" }}
        />
      </div>
      {children}
    </>
  );
}
