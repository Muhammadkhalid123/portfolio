import React from "react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Calendar, CheckCircle2, Milestone, Sparkles, Terminal, Layers } from "lucide-react";

export function Timeline() {
  const categoryIcons = {
    dev: Terminal,
    ai: Sparkles,
    devops: Milestone,
    milestone: Layers,
  };

  return (
    <section id="timeline" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Background & History"
          badgeVariant="personal"
          title="Project & Engineering"
          highlightedTitle="Timeline"
          gradientClass="from-[#0F0F0F] via-[#009b7d] to-[#00FFD0]"
          description="How our focus evolved from foundational models and scripts to shipping production AI systems and automation pipelines."
        />

        <div className="relative pl-6 sm:pl-8 border-l border-[#0F0F0F]/15 space-y-10">
          {profile.timeline.map((item, index) => {
            const Icon = categoryIcons[item.category] || Layers;

            return (
              <div key={index} className="relative group">
                <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-[#00FFD0] shadow-[0_0_15px_rgba(0,255,208,0.25)] group-hover:border-[#00FFD0] group-hover:scale-110 transition-all">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="p-6 sm:p-7 rounded-3xl liquid-glass group-hover:border-[#00FFD0]/50 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-[#00FFD0] flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00FFD0]/10 border border-[#00FFD0]/30">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.year}</span>
                    </span>
                    <Badge variant="personal" size="sm">
                      {item.role}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-[#FAFAFA] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#808080] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/10">
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-[#FAFAFA]/75">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFD0] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
