"use client";

import React, { useState } from "react";
import { skills, skillCategories, Skill } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Terminal, Cpu, Layers, Database, Check } from "lucide-react";

export function SkillsGrid({ persona = "personal" }: { persona?: "personal" | "dev" | "ai" }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryIcons: Record<string, React.ElementType> = {
    devops: Terminal,
    fullstack: Layers,
    ai: Cpu,
    databases_tools: Database,
  };

  // Filter skills based on persona relevance
  const relevantSkills = skills.filter((skill) => {
    if (persona === "personal") return true;
    if (persona === "dev") return skill.tags.includes("dev") || skill.tags.includes("devops");
    if (persona === "ai") return skill.tags.includes("ai");
    return true;
  });

  const availableCategories = Object.keys(skillCategories).filter((catKey) => {
    if (persona === "personal") return true;
    if (persona === "dev") return catKey === "devops" || catKey === "fullstack" || catKey === "databases_tools";
    if (persona === "ai") return catKey === "ai" || catKey === "fullstack";
    return true;
  });

  const displayedSkills = selectedCategory === "all"
    ? relevantSkills
    : relevantSkills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={persona === "dev" ? "DevOps & Full Stack" : persona === "ai" ? "AI & Machine Learning" : "Technical Arsenal"}
          badgeVariant={persona === "dev" ? "dev" : persona === "ai" ? "ai" : "personal"}
          title="Skills & Core"
          highlightedTitle="Competencies"
          gradientClass={
            persona === "dev"
              ? "from-cyan-400 to-blue-400"
              : persona === "ai"
              ? "from-purple-400 to-pink-400"
              : "from-indigo-400 to-purple-400"
          }
          description="A categorized breakdown of tools, frameworks, languages, and cloud deployment technologies used daily."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer",
              selectedCategory === "all"
                ? persona === "dev"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25"
                  : persona === "ai"
                  ? "bg-purple-500 text-white shadow-md shadow-purple-500/25"
                  : "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            )}
          >
            All Skills ({relevantSkills.length})
          </button>

          {availableCategories.map((catKey) => {
            const cat = skillCategories[catKey];
            const Icon = categoryIcons[catKey] || Layers;
            const isSelected = selectedCategory === catKey;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer border",
                  isSelected
                    ? persona === "dev"
                      ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/60 shadow-md shadow-cyan-500/15"
                      : persona === "ai"
                      ? "bg-purple-950/80 text-purple-300 border-purple-500/60 shadow-md shadow-purple-500/15"
                      : "bg-indigo-950/80 text-indigo-300 border-indigo-500/60 shadow-md shadow-indigo-500/15"
                    : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800/80 hover:border-slate-700"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedSkills.map((skill, idx) => {
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-base font-bold text-white group-hover:text-slate-100">
                      {skill.name}
                    </h3>
                    <span className={cn(
                      "text-xs font-mono font-bold",
                      persona === "dev"
                        ? "text-cyan-400"
                        : persona === "ai"
                        ? "text-purple-400"
                        : "text-indigo-400"
                    )}>
                      {skill.level}%
                    </span>
                  </div>

                  {skill.description && (
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      persona === "dev"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                        : persona === "ai"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-gradient-to-r from-indigo-500 to-amber-400"
                    )}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
