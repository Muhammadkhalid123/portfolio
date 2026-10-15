"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export interface RecedeSectionProps {
  children: React.ReactNode;
  /** Maximum rotateX angle in degrees upon exit. Default: 20 */
  maxRotate?: number;
  /** Manually disable the recede effect */
  disabled?: boolean;
  /** Additional container classes */
  className?: string;
  /** Container ID for anchor navigation */
  id?: string;
  /** Optional background color for container to match light sections if needed */
  wrapperBackground?: string;
}

/**
 * RecedeSection
 * 
 * Wraps a section in a 1200px perspective container and animates based on that
 * section's own scroll progress while it is exiting (offset ["end end", "end start"]):
 * - scale: 1 -> 0.85 (0.92 on mobile <768px)
 * - rotateX: 0 -> maxRotate deg (max 8deg on mobile <768px)
 * - opacity: 1 -> 0.4
 * - transformOrigin: "center bottom"
 * - respects prefers-reduced-motion and the `disabled` prop
 */
export function RecedeSection({
  children,
  maxRotate = 20,
  disabled = false,
  className = "",
  id,
  wrapperBackground,
}: RecedeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track the section's progress specifically while it is exiting:
  // "end end" -> bottom of section hits bottom of viewport
  // "end start" -> bottom of section leaves top of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  const isEffectDisabled = disabled || shouldReduceMotion;

  // Scale: 1 -> 0.85 on desktop, 1 -> 0.92 on mobile (< 768px)
  const scale = useTransform(scrollYProgress, (progress) => {
    if (isEffectDisabled) return 1;
    const clamped = Math.min(Math.max(progress, 0), 1);
    const targetScale = isMobile ? 0.92 : 0.85;
    return 1 - clamped * (1 - targetScale);
  });

  // RotateX: 0 -> maxRotate (default 20deg) on desktop, 0 -> max 8deg on mobile (< 768px)
  const rotateX = useTransform(scrollYProgress, (progress) => {
    if (isEffectDisabled) return 0;
    const clamped = Math.min(Math.max(progress, 0), 1);
    const targetRotate = isMobile ? Math.min(maxRotate, 8) : maxRotate;
    return clamped * targetRotate;
  });

  // Opacity: 1 -> 0.4
  const opacity = useTransform(scrollYProgress, (progress) => {
    if (isEffectDisabled) return 1;
    const clamped = Math.min(Math.max(progress, 0), 1);
    return 1 - clamped * 0.6;
  });

  if (isEffectDisabled) {
    return (
      <div
        id={id}
        className={`relative w-full ${className}`}
        style={wrapperBackground ? { backgroundColor: wrapperBackground } : undefined}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full [perspective:1200px] ${className}`}
      style={{
        perspective: 1200,
        backgroundColor: wrapperBackground,
      }}
    >
      <motion.div
        style={{
          transformOrigin: "center bottom",
          scale,
          rotateX,
          opacity,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default RecedeSection;
