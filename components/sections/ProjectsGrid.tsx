"use client";

import React, { useState } from "react";
import { Project, PersonaTag } from "@/content/projects";
import { getProjectsByPersona } from "@/lib/getProjectsByPersona";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export interface ProjectsGridProps {
  persona?: "personal" | "dev" | "ai";
}

export function ProjectsGrid({ persona = "personal" }: ProjectsGridProps) {
  const initialProjects = getProjectsByPersona(persona);
  const [activeTag, setActiveTag] = useState<string>("all");

  const filterTags: { label: string; tag: string }[] =
    persona === "personal"
      ? [
          { label: "All Work", tag: "all" },
          { label: "Full-Stack Dev", tag: "dev" },
          { label: "AI & NLP", tag: "ai" },
          { label: "DevOps & Cloud", tag: "devops" },
        ]
      : persona === "dev"
      ? [
          { label: "All Dev & Infra", tag: "all" },
          { label: "Full-Stack Web", tag: "dev" },
          { label: "Docker & CI/CD", tag: "devops" },
        ]
      : [
          { label: "All AI Work", tag: "all" },
          { label: "RAG & LLMs", tag: "ai" },
        ];

  const filteredProjects =
    activeTag === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.tags.includes(activeTag as PersonaTag));

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={persona === "dev" ? "Engineering Projects" : persona === "ai" ? "AI Case Studies" : "Portfolio Showcase"}
          badgeVariant={persona === "dev" ? "dev" : persona === "ai" ? "ai" : "personal"}
          title="Featured"
          highlightedTitle="Projects & Systems"
          gradientClass={
            persona === "dev"
              ? "from-cyan-400 to-blue-400"
              : persona === "ai"
              ? "from-purple-400 to-pink-400"
              : "from-indigo-400 to-purple-400"
          }
          description="Real-world full-stack architectures, natural language processing models, and automated deployment pipelines."
        />

        {/* Filter Tabs */}
        {filterTags.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {filterTags.map((filter) => {
              const isSelected = activeTag === filter.tag;

              return (
                <button
                  key={filter.tag}
                  onClick={() => setActiveTag(filter.tag)}
                  className={cn(
                    "px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer border",
                    isSelected
                      ? persona === "dev"
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/25 font-bold"
                        : persona === "ai"
                        ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/25 font-bold"
                        : "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25 font-bold"
                      : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800/80 hover:border-slate-700"
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              persona={persona}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <p className="text-sm">No projects found for the selected category filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
