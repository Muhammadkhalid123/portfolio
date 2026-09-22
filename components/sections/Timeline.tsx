import React from "react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Calendar, CheckCircle2, Milestone, Sparkles, Terminal, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function Timeline() {
  const categoryIcons = {
    dev: Terminal,
    ai: Sparkles,
    devops: Milestone,
    milestone: Layers,
  };

  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-slate-950/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Career Journey"
          badgeVariant="personal"
          title="Engineering & Experience"
          highlightedTitle="Timeline"
          gradientClass="from-indigo-400 via-purple-300 to-amber-300"
          description="Milestones and professional evolution across full-stack architecture, machine learning research, and cloud DevOps."
        />

        <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-12">
          {profile.timeline.map((item, index) => {
            const Icon = categoryIcons[item.category] || Layers;

            return (
              <div key={index} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400 shadow-md group-hover:border-indigo-400 group-hover:scale-110 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 group-hover:border-slate-700 transition-all duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.year}</span>
                    </span>
                    <Badge variant="personal" size="sm">
                      {item.role}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800/60">
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
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
