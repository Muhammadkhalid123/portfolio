"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";

export interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Track asset preloading
    const assetsToLoad = [
      "/images/khalid_portrait.jpg",
      "/images/khalid_depth.jpg",
    ];

    let loadedCount = 0;
    const totalAssets = assetsToLoad.length;

    // Minimum simulation step to ensure natural counter motion
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          return prev + Math.floor(Math.random() * 12) + 6;
        }
        return prev;
      });
    }, 40);

    assetsToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === totalAssets) {
          clearInterval(interval);
          setProgress(100);
        }
      };
    });

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && !isDone) {
      setIsDone(true);

      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      tl.to(".loader-counter-wrap", {
        yPercent: -120,
        duration: 0.65,
        ease: "expo.inOut",
        delay: 0.15,
      }).to(
        ".loader-curtain",
        {
          yPercent: -100,
          duration: 0.8,
          ease: "expo.inOut",
        },
        "-=0.4"
      );
    }
  }, [progress, isDone, onComplete]);

  return (
    <div
      aria-hidden="true"
      className="loader-curtain fixed inset-0 z-[9999] bg-[#211E1C] flex flex-col items-center justify-center text-[#F9F8F6] pointer-events-none select-none"
    >
      <div className="overflow-hidden h-24 flex items-center">
        <div className="loader-counter-wrap flex items-baseline gap-2">
          <span className="font-mono text-7xl sm:text-8xl font-light text-[#F9F8F6] tracking-tighter">
            {Math.min(100, Math.max(0, progress))}
          </span>
          <span className="font-mono text-xl text-[#A1FFCB]">%</span>
        </div>
      </div>
      <span className="font-mono text-xs tracking-widest text-[#718698] mt-4 uppercase">
        Loading Assets
      </span>
    </div>
  );
}
