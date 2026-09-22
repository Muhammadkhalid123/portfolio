"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LiquidBackgroundProps {
  persona?: "personal" | "dev" | "ai";
}

export function LiquidBackground({ persona = "personal" }: LiquidBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#FCFAF4]">
      {/* Dynamic Floating Liquid Orbs (Burgundy #800020 & Obsidian #010101 on Cream #FCFAF4) */}
      {persona === "dev" && (
        <>
          {/* Burgundy Liquid Blob */}
          <div className="absolute -top-[12%] left-[15%] w-[650px] h-[650px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-tr from-[#800020]/25 via-[#800020]/10 to-transparent blur-[110px] animate-liquid-slow" />
          {/* Obsidian Soft Shadow Depth */}
          <div className="absolute top-[35%] -right-[8%] w-[580px] h-[580px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-br from-[#010101]/10 via-[#800020]/12 to-transparent blur-[120px] animate-liquid-reverse" />
          {/* Deep Wine Bottom Glow */}
          <div className="absolute -bottom-[15%] left-[8%] w-[700px] h-[520px] rounded-[50%_50%_40%_60%/40%_60%_50%_50%] bg-gradient-to-t from-[#800020]/15 via-[#010101]/5 to-transparent blur-[130px] animate-liquid-slow" />
        </>
      )}

      {persona === "ai" && (
        <>
          {/* Vivid Burgundy / Rose Wine Blob */}
          <div className="absolute -top-[12%] left-[20%] w-[680px] h-[680px] rounded-[50%_50%_70%_30%/30%_50%_70%_50%] bg-gradient-to-tr from-[#800020]/28 via-[#b92144]/15 to-transparent blur-[110px] animate-liquid-slow" />
          {/* Obsidian Core Blob */}
          <div className="absolute top-[38%] -right-[8%] w-[580px] h-[580px] rounded-[40%_60%_40%_60%/60%_40%_60%_40%] bg-gradient-to-bl from-[#800020]/18 via-[#010101]/8 to-transparent blur-[120px] animate-liquid-reverse" />
          {/* Wine Bottom Glow */}
          <div className="absolute -bottom-[15%] left-[12%] w-[620px] h-[500px] rounded-[60%_40%_50%_50%/40%_50%_60%_50%] bg-gradient-to-t from-[#800020]/18 via-[#010101]/5 to-transparent blur-[130px] animate-liquid-slow" />
        </>
      )}

      {persona === "personal" && (
        <>
          {/* Deep Burgundy Blob */}
          <div className="absolute -top-[12%] left-[22%] w-[680px] h-[680px] rounded-[45%_55%_70%_30%/40%_45%_55%_60%] bg-gradient-to-tr from-[#800020]/25 via-[#800020]/10 to-transparent blur-[110px] animate-liquid-slow" />
          {/* Obsidian Ambient Depth */}
          <div className="absolute top-[35%] -right-[8%] w-[520px] h-[520px] rounded-[60%_40%_40%_60%/50%_60%_40%_50%] bg-gradient-to-bl from-[#010101]/8 via-[#800020]/14 to-transparent blur-[120px] animate-liquid-reverse" />
          {/* Burgundy Warm Glow */}
          <div className="absolute -bottom-[15%] left-[10%] w-[700px] h-[500px] rounded-[50%_50%_60%_40%/40%_50%_50%_60%] bg-gradient-to-t from-[#800020]/16 via-[#010101]/6 to-transparent blur-[130px] animate-liquid-slow" />
        </>
      )}

      {/* Hexagonal Lattice Pattern (Honeycomb Grid) */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='96' viewBox='0 0 56 96'%3E%3Cpath d='M28 0l28 16v32L28 64 0 48V16L28 0zm0 96l28-16V48L28 32 0 48v32l28 16z' fill='none' stroke='%23800020' stroke-opacity='0.1' stroke-width='1.2'/%3E%3Ccircle cx='28' cy='48' r='1.5' fill='%23800020' fill-opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 96px",
        }}
      />

      {/* Radial Vignette & Specular Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(1,1,1,0.03)_100%)]" />
    </div>
  );
}

