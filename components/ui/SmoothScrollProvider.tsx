"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, any>) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

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

    const htmlEl = document.documentElement;
    htmlEl.classList.add("lenis", "lenis-smooth");

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Buttery smooth easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false,
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
            lenis.scrollTo(targetElement, { offset: -64, duration: 1.2 });
          }
        }

        if (window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Resize recalculation on document layout changes
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      htmlEl.classList.remove("lenis", "lenis-smooth");
      document.removeEventListener("click", handleAnchorClick);
      resizeObserver.disconnect();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [pathname]);

  const scrollTo = (target: string | number | HTMLElement, options?: Record<string, any>) => {
    if (lenisRef.current) {
      if (typeof target === "string" && !target.startsWith("#") && !target.startsWith(".")) {
        const el = document.getElementById(target);
        if (el) {
          lenisRef.current.scrollTo(el, { duration: 1.2, ...options });
          return;
        }
      }
      lenisRef.current.scrollTo(target, { duration: 1.2, ...options });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {/* Top Scroll Progress Indicator (Aura Primary Ink Accent) */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full bg-[var(--ink)] opacity-75 shadow-sm transition-all duration-75 ease-out"
          style={{ width: "0%" }}
        />
      </div>
      {children}
    </SmoothScrollContext.Provider>
  );
}
