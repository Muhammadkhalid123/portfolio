"use client";

import React from "react";
import { skills, skillCategories } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { Terminal, Cpu, Layers } from "lucide-react";

export interface SkillsGridProps {
  persona?: "personal" | "dev" | "ai";
}

export function SkillsGrid({ persona = "ai" }: SkillsGridProps) {
  const categoryIcons: Record<string, React.ElementType> = {
    fullstack: Layers,
    ai: Cpu,
    devops: Terminal,
  };

  const categoryKeys: Array<"fullstack" | "ai" | "devops"> = ["ai", "fullstack", "devops"];

  const gridColsClass =
    categoryKeys.length === 1
      ? "grid-cols-1 max-w-xl mx-auto"
      : categoryKeys.length === 2
      ? "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
      : "grid-cols-1 md:grid-cols-3";

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="AI & Model Tools"
          badgeVariant="ai"
          title="Technologies We"
          highlightedTitle="Actually Use"
          gradientClass="from-[#800020] via-[#b92144] to-[#800020]"
          description="Grouped by what we reach for first when building AI systems, RAG pipelines, and automated bots."
        />

        {/* Grouped Skills Columns */}
        <div className={cn("grid gap-6 items-stretch", gridColsClass)}>
          {categoryKeys.map((catKey) => {
            const cat = skillCategories[catKey];
            const Icon = categoryIcons[catKey] || Layers;
            const categorySkills = skills.filter((s) => s.category === catKey);

            return (
              <div
                key={catKey}
                className={cn(
                  "p-6 sm:p-7 rounded-3xl flex flex-col h-full transition-all duration-300",
                  catKey === "devops"
                    ? "liquid-glass-dev"
                    : catKey === "ai"
                    ? "liquid-glass-ai"
                    : "liquid-glass-personal"
                )}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/10">
                  <div className="p-2.5 rounded-xl border border-[#800020]/40 bg-[#800020]/20 text-[#f0a3b3] backdrop-blur-md">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#FCFAF4]">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-[#FCFAF4]/70">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-3 flex-1">
                  {categorySkills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-2xl liquid-glass-pill-dark hover:border-[#800020]/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#FCFAF4]">
                          {skill.name}
                        </span>
                      </div>
                      {skill.note && (
                        <p className="text-[11px] text-[#FCFAF4]/70 mt-1 leading-snug">
                          {skill.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
