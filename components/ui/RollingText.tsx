"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WordItem {
  text: string;
  isGradient?: boolean;
  gradientClass?: string;
}

export function CenterRollingHeadline({
  items,
  className,
  as = "h1",
  staggerDelay = 0.035,
  baseDelay = 0.05,
  duration = 0.7,
}: {
  items: Array<{ text: string; gradient?: boolean; gradientClass?: string }>;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
}) {
  // Flatten words with their styling metadata
  const words: WordItem[] = [];
  items.forEach((item) => {
    const splitWords = item.text.split(" ").filter((w) => w.length > 0);
    splitWords.forEach((word) => {
      words.push({
        text: word,
        isGradient: item.gradient,
        gradientClass: item.gradientClass,
      });
    });
  });

  const totalWords = words.length;
  const centerIndex = (totalWords - 1) / 2;

  const Component = motion[as as "h1"];

  return (
    <Component
      className={cn(
        "flex flex-wrap justify-center items-center gap-x-[0.28em] gap-y-[0.1em] [perspective:1200px]",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      animate="visible"
    >
      {words.map((wordObj, i) => {
        // Distance from center determines delay: center words animate first!
        const distanceFromCenter = Math.abs(i - centerIndex);
        const delay = baseDelay + distanceFromCenter * staggerDelay;

        return (
          <span
            key={i}
            className="inline-block overflow-hidden py-[0.1em] [perspective:800px]"
          >
            <motion.span
              className={cn(
                "inline-block will-change-transform transform-gpu",
                wordObj.isGradient &&
                  (wordObj.gradientClass ||
                    "bg-gradient-to-r from-[#800020] via-[#9c1534] to-[#800020] bg-clip-text text-transparent")
              )}
              variants={{
                hidden: {
                  opacity: 0,
                  y: "80%",
                  rotateX: 50,
                  filter: "blur(4px)",
                  scale: 0.95,
                },
                visible: {
                  opacity: 1,
                  y: "0%",
                  rotateX: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  transition: {
                    duration,
                    delay,
                    ease: [0.215, 0.61, 0.355, 1], // Smooth rolling cubic bezier
                  },
                },
              }}
            >
              {wordObj.text}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}

export function RollingParagraph({
  text,
  className,
  staggerDelay = 0.018,
  baseDelay = 0.15,
  duration = 0.6,
}: {
  text: string;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
}) {
  const words = text.split(" ").filter((w) => w.length > 0);
  const totalWords = words.length;
  const centerIndex = (totalWords - 1) / 2;

  return (
    <motion.p
      className={cn(
        "flex flex-wrap justify-center items-center gap-x-[0.26em] gap-y-[0.15em] [perspective:1000px]",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      animate="visible"
    >
      {words.map((word, i) => {
        const distanceFromCenter = Math.abs(i - centerIndex);
        const delay = baseDelay + distanceFromCenter * staggerDelay;

        return (
          <span key={i} className="inline-block overflow-hidden py-[0.05em]">
            <motion.span
              className="inline-block will-change-transform transform-gpu"
              variants={{
                hidden: {
                  opacity: 0,
                  y: "70%",
                  rotateX: 45,
                  filter: "blur(3px)",
                },
                visible: {
                  opacity: 1,
                  y: "0%",
                  rotateX: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration,
                    delay,
                    ease: [0.215, 0.61, 0.355, 1],
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.p>
  );
}
