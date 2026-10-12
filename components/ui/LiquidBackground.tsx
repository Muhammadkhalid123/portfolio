"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ThreeInteractiveCanvas } from "./ThreeInteractiveCanvas";
import { GsapScrollEffects } from "./GsapScrollEffects";

export interface LiquidBackgroundProps {
  persona?: "personal" | "dev" | "ai";
}

export function LiquidBackground({ persona = "personal" }: LiquidBackgroundProps) {
  return (
    <>
      {/* GSAP Scroll Trigger Animations */}
      <GsapScrollEffects />

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#FAFAFA]">
        {/* Butter Video Ambient Electric Glows (#00FFD0 & #0F0F0F depth on #FAFAFA canvas) */}
        <div className="absolute -top-[15%] left-[20%] w-[680px] h-[680px] rounded-full bg-[#00FFD0]/12 blur-[140px] animate-butter-glow" />
        <div className="absolute top-[35%] -right-[10%] w-[580px] h-[580px] rounded-full bg-[#00FFD0]/8 blur-[130px] animate-butter-glow" />
        <div className="absolute -bottom-[15%] left-[10%] w-[620px] h-[520px] rounded-full bg-[#00FFD0]/10 blur-[140px] animate-butter-glow" />
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[750px] h-[400px] rounded-full bg-[#EDEDED]/60 blur-[100px]" />

        {/* Butter Video Precision Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.55] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(15, 15, 15, 0.035) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15, 15, 15, 0.035) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Subtle Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(15,15,15,0.03)_100%)]" />

        {/* Three.js Interactive 3D WebGL Canvas Overlay */}
        <ThreeInteractiveCanvas />
      </div>
    </>
  );
}
