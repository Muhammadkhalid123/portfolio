"use client";

import React from "react";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export interface HeroWatermarkNameProps {
  /**
   * "solid": The background layer under the person with sharp 50/50 dual-panel gradient.
   * "outline": The foreground layer above the person rendering only the letter that overlaps the face.
   */
  layer?: "solid" | "outline";
  /**
   * The single letter that falls across the person's face (defaults to "A").
   */
  outlineLetter?: string;
  className?: string;
}

export function HeroWatermarkName({
  layer = "solid",
  outlineLetter = "A",
  className = "",
}: HeroWatermarkNameProps) {
  const letters = ["K", "H", "A", "L", "E", "D"];

  // Shared container and font classes ensure 100% pixel parity so layers cannot drift
  const typographyClasses = `
    ${anton.className}
    text-[clamp(3.75rem,15.5vw,14.5rem)]
    leading-[0.82]
    tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.15em] lg:tracking-[0.18em] xl:tracking-[0.2em]
    scale-x-[1.15] sm:scale-x-[1.22] md:scale-x-[1.28] lg:scale-x-[1.32] xl:scale-x-[1.36]
    origin-center
    uppercase
    select-none
    pointer-events-none
    whitespace-nowrap
    text-center
  `;

  // Positioned lower so it sits comfortably beneath the header navigation menu
  const positionClasses = `
    absolute
    top-[20%] sm:top-[18%] md:top-[17%] lg:top-[16%] xl:top-[15%]
    left-0 right-0 w-full
    flex items-center justify-center
    pointer-events-none select-none
    transition-opacity duration-1000 motion-reduce:transition-none
  `;

  if (layer === "solid") {
    return (
      <div
        aria-hidden="true"
        className={`${positionClasses} z-20 ${className}`}
        style={{
          opacity: 0.92,
        }}
      >
        <span
          className={typographyClasses}
          style={{
            background:
              "linear-gradient(to right, #FFFFFF 0%, #FFFFFF 50%, #161616 50%, #161616 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            display: "inline-block",
          }}
        >
          {letters.map((char, idx) => (
            <span key={idx}>{char}</span>
          ))}
        </span>
      </div>
    );
  }

  // Outline layer: Sits above the person cutout (z-30), rendering only the letter across the face
  return (
    <div
      aria-hidden="true"
      className={`${positionClasses} z-30 ${className}`}
    >
      <span className={typographyClasses} style={{ display: "inline-block" }}>
        {letters.map((char, idx) => {
          const isTarget = char === outlineLetter;
          return (
            <span
              key={idx}
              style={
                isTarget
                  ? {
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    WebkitTextStroke: "1.75px rgba(255, 255, 255, 0.95)",
                    display: "inline-block",
                  }
                  : {
                    opacity: 0,
                    visibility: "hidden",
                    display: "inline-block",
                  }
              }
            >
              {char}
            </span>
          );
        })}
      </span>
    </div>
  );
}
