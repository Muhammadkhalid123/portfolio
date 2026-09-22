"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Top scroll progress indicator
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    // Physics-based Exponential Smooth Scroll function
    const smoothScrollTo = (targetPosition: number, duration: number = 1000) => {
      const startPosition = window.pageYOffset || document.documentElement.scrollTop;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeOutExpo(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Smooth Anchor Link Navigation Interceptor
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        if (href === "#" || href === "#top") {
          e.preventDefault();
          smoothScrollTo(0, 900);
          return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80;
          smoothScrollTo(offsetPosition, 1000);

          // Update URL hash without jumping
          if (window.history.pushState) {
            window.history.pushState(null, "", href);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [pathname]);

  return (
    <>
      {/* Top Scroll Progress Indicator (10% Burgundy #800020 Glow) */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-[#800020] via-[#b92144] to-[#800020] shadow-[0_0_12px_rgba(128,0,32,0.8)] transition-all duration-75 ease-out"
          style={{ width: "0%" }}
        />
      </div>
      {children}
    </>
  );
}
