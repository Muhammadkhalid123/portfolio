import React from "react";
import { personas } from "@/content/personas";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { CenterRollingHeadline, RollingParagraph } from "@/components/ui/RollingText";

export interface HeroProps {
  persona?: "personal" | "dev" | "ai";
}

export function Hero({ persona = "ai" }: HeroProps) {
  const personaConfig = personas[persona] || personas.ai;

  const headlineItems = [
    { text: "We build practical AI systems" },
    {
      text: "that deliver real results.",
      gradient: true,
      gradientClass: "bg-gradient-to-r from-[#800020] via-[#b92144] to-[#800020] bg-clip-text text-transparent",
    },
  ];

  return (
    <section id="top" className="relative min-h-[75vh] flex items-center justify-center pt-24 sm:pt-32 pb-16 overflow-hidden">
      {/* Dynamic Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#800020]/14 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-[#b92144]/10 blur-[110px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tag & Status */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill mb-8 backdrop-blur-2xl">
          <Sparkles className="w-4 h-4 text-[#800020]" />
          <span className="text-xs font-semibold text-[#010101]">
            {personaConfig.badgeText}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-[11px] text-emerald-700 font-medium">Available</span>
        </div>

        {/* Hero Headline with Center-to-Edge Staggered Rolling Text Animation */}
        <CenterRollingHeadline
          items={headlineItems}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[60px] font-black tracking-[-0.038em] text-[#010101] mb-6 leading-[1.14] max-w-4xl mx-auto"
          staggerDelay={0.04}
          baseDelay={0.08}
          duration={0.7}
        />

        {/* Subheadline with Rolling Paragraph Animation */}
        <RollingParagraph
          text={personaConfig.subheadline}
          className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-[#010101]/80 font-normal leading-[1.7] tracking-[-0.01em] mb-10"
          staggerDelay={0.02}
          baseDelay={0.28}
          duration={0.6}
        />

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <Button
            href="#projects"
            size="lg"
            variant="primary"
            className="group"
          >
            <span>{personaConfig.ctaPrimaryText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>

          <Button
            href="#contact"
            size="lg"
            variant="secondary"
          >
            <span>{personaConfig.ctaSecondaryText}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
