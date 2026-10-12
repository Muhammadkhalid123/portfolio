import React from "react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Globe, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function About({ persona = "ai" }: { persona?: "personal" | "dev" | "ai" }) {
  const bioParagraphs = profile.bio[persona] || profile.bio.ai;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Our AI Work"
          badgeVariant="ai"
          title="How We Build &"
          highlightedTitle="Deliver AI"
          gradientClass="from-[#0F0F0F] via-[#009b7d] to-[#00FFD0]"
          description="A direct look at where we focus, what we build, and how we deliver practical, production-ready AI systems."
        />

        {/* Narrative Card */}
        <div className={cn(
          "p-8 sm:p-10 rounded-3xl mb-12 transition-all duration-300 liquid-glass-ai"
        )}>
          <div className="space-y-6">
            {bioParagraphs.map((para, idx) => {
              if (idx === 0) {
                return (
                  <p
                    key={idx}
                    className="text-lg sm:text-xl font-semibold text-[#FAFAFA] leading-snug tracking-[-0.015em] pb-5 border-b border-white/10"
                  >
                    {para}
                  </p>
                );
              }
              if (idx === bioParagraphs.length - 1) {
                return (
                  <div
                    key={idx}
                    className="p-4.5 sm:p-5 rounded-2xl border-l-2 border-[#00FFD0] bg-[#00FFD0]/10 text-[#FAFAFA] text-sm sm:text-[15px] leading-relaxed backdrop-blur-md font-serif italic"
                  >
                    <p className="font-normal">
                      &ldquo;{para}&rdquo;
                    </p>
                  </div>
                );
              }
              return (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-[#FAFAFA]/85 leading-[1.8] font-normal tracking-[-0.01em]"
                >
                  {para}
                </p>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#FAFAFA]/70">
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#00FFD0]" />
              <span className="font-medium text-[#FAFAFA]">{profile.location}</span>
            </span>
            <span className="flex items-center gap-2 text-[#00FFD0]">
              <ShieldCheck className="w-4 h-4 text-[#00FFD0]" />
              <span className="font-medium">{profile.availability}</span>
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl liquid-glass text-center flex flex-col items-center justify-center group hover:scale-[1.02] transition-all duration-300"
            >
              <span className="text-3xl sm:text-4xl font-extrabold mb-1 font-mono tracking-tight text-[#00FFD0] drop-shadow-[0_0_12px_rgba(0,255,208,0.35)]">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-[#FAFAFA] mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-[#808080] leading-normal">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
