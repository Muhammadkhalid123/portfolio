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
          { label: "AI & Automation", tag: "ai" },
          { label: "DevOps & Cloud", tag: "devops" },
        ]
      : persona === "dev"
      ? [
          { label: "All Dev & Infra", tag: "all" },
          { label: "Full-Stack Web", tag: "dev" },
          { label: "Docker & CI/CD", tag: "devops" },
        ]
      : [
          { label: "All AI & Automation", tag: "all" },
          { label: "RAG & NLP", tag: "ai" },
          { label: "Full-Stack & Automation", tag: "dev" },
        ];

  const filteredProjects =
    activeTag === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.tags.includes(activeTag as PersonaTag));

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={persona === "dev" ? "Engineering Projects" : persona === "ai" ? "AI & Automation Systems" : "Portfolio Showcase"}
          badgeVariant={persona === "dev" ? "dev" : persona === "ai" ? "ai" : "personal"}
          title="Featured"
          highlightedTitle="Projects & Systems"
          gradientClass="from-[#800020] via-[#b92144] to-[#800020]"
          description={
            persona === "ai"
              ? "Production RAG chatbots, multi-tenant conversational platforms, document summarizers, and autonomous automation bots."
              : persona === "dev"
              ? "Full-stack web applications, typed APIs, background task queues, and containerized deployment infrastructure."
              : "Real-world full-stack architectures, natural language processing models, and automated deployment pipelines."
          }
        />

        {/* Filter Tabs */}
        {filterTags.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <div className="p-1.5 rounded-full liquid-glass-pill inline-flex flex-wrap items-center justify-center gap-1.5 backdrop-blur-2xl">
              {filterTags.map((filter) => {
                const isSelected = activeTag === filter.tag;

                return (
                  <button
                    key={filter.tag}
                    onClick={() => setActiveTag(filter.tag)}
                    className={cn(
                      "px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer border",
                      isSelected
                        ? "bg-[#800020] text-[#FCFAF4] border-[#f0a3b3]/50 shadow-[0_4px_20px_rgba(128,0,32,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] font-bold"
                        : "text-[#010101]/70 hover:text-[#800020] hover:bg-[#800020]/10 border-transparent"
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
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
