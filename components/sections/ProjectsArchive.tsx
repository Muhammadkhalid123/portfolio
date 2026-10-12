"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Project, PersonaTag } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  SlidersHorizontal,
  ArrowLeft,
  Sparkles,
  Terminal,
  Shield,
  Layers,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectsArchiveProps {
  initialProjects: Project[];
}

export function ProjectsArchive({ initialProjects }: ProjectsArchiveProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("all");

  const filterOptions = [
    {
      key: "all",
      label: "All Projects",
      count: initialProjects.length,
      icon: Layers,
    },
    {
      key: "ai",
      label: "AI & RAG Systems",
      count: initialProjects.filter((p) => p.tags.includes("ai")).length,
      icon: Sparkles,
    },
    {
      key: "dev",
      label: "Full-Stack Dev",
      count: initialProjects.filter((p) => p.tags.includes("dev")).length,
      icon: Terminal,
    },
    {
      key: "devops",
      label: "DevOps & Cloud",
      count: initialProjects.filter((p) => p.tags.includes("devops")).length,
      icon: Shield,
    },
  ];

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Tag filter
      const matchesTag =
        activeTag === "all" || project.tags.includes(activeTag as PersonaTag);

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.techStack.some((t) => t.toLowerCase().includes(q));

      return matchesTag && matchesSearch;
    });
  }, [initialProjects, activeTag, searchQuery]);

  return (
    <section className="pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#808080] hover:text-[#00FFD0] transition-colors px-3 py-1.5 rounded-full butter-pill backdrop-blur-xl"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio Overview</span>
          </Link>
        </div>

        {/* Section Header */}
        <SectionHeading
          badge="Complete Showcase"
          badgeVariant="personal"
          title="Engineered Projects &"
          highlightedTitle="Systems Archive"
          gradientClass="from-[#0F0F0F] via-[#009b7d] to-[#00FFD0]"
          description="Browse the complete catalog of production RAG chatbots, multi-tenant conversational platforms, natural language summarizers, automated bots, and containerized cloud deployment pipelines."
        />

        {/* Search & Filter Toolbar */}
        <div className="mb-10 p-4 sm:p-5 rounded-3xl liquid-glass">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#808080] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, technology (e.g. LangChain, Docker, FastAPI)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#0F0F0F] dark:text-[#FAFAFA] placeholder-[#808080] focus:outline-none focus:border-[#00FFD0]/70 focus:ring-1 focus:ring-[#00FFD0]/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808080] hover:text-[#FAFAFA]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {filterOptions.map((filter) => {
                const isSelected = activeTag === filter.key;
                const Icon = filter.icon;

                return (
                  <button
                    key={filter.key}
                    onClick={() => setActiveTag(filter.key)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 border cursor-pointer",
                      isSelected
                        ? "bg-[#0F0F0F] text-[#FAFAFA] border-[#00FFD0]/70 shadow-[0_4px_15px_rgba(0,0,0,0.3)] font-bold"
                        : "text-[#808080] hover:text-[#0F0F0F] dark:hover:text-[#FAFAFA] border-transparent hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn("w-3.5 h-3.5", isSelected ? "text-[#00FFD0]" : "text-[#808080]")} />
                    <span>{filter.label}</span>
                    <span className="text-[10px] opacity-60 ml-0.5">({filter.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results summary bar */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#808080]">
            <span>
              Showing <strong className="text-[#0F0F0F] dark:text-[#00FFD0]">{filteredProjects.length}</strong> of {initialProjects.length} total projects
            </span>
            {(searchQuery || activeTag !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTag("all");
                }}
                className="text-[11px] text-[#00FFD0] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              persona="personal"
            />
          ))}
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 p-8 rounded-3xl liquid-glass text-[#808080]">
            <Search className="w-8 h-8 mx-auto mb-3 text-[#808080]/60" />
            <h3 className="text-base font-semibold text-[#0F0F0F] dark:text-[#FAFAFA] mb-1">
              No matching projects found
            </h3>
            <p className="text-xs max-w-sm mx-auto mb-4">
              Try adjusting your search terms or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTag("all");
              }}
              className="px-4 py-2 rounded-2xl bg-[#00FFD0] text-[#0F0F0F] font-bold text-xs shadow-[0_4px_15px_rgba(0,255,208,0.3)] hover:bg-[#33FFDA] transition-all"
            >
              Clear Search &amp; Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
