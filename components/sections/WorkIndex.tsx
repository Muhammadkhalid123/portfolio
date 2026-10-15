"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ExternalLink, FolderGit2, ArrowUpRight, Terminal, LayoutGrid, List } from "lucide-react";
import { playTick } from "@/lib/sound";
import { projects, Project } from "@/content/projects";

type FilterType = "all" | "dev" | "ai" | "devops";

export function WorkIndex() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const containerRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Active hovered project object for the cursor preview
  const hoveredProject = projects.find((p) => p.slug === hoveredSlug) || null;

  // Floating cursor follower effect using GSAP quickTo
  useEffect(() => {
    if (!previewRef.current) return;

    const xTo = gsap.quickTo(previewRef.current, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(previewRef.current, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset preview so it doesn't collide with the cursor point
      xTo(e.clientX + 24);
      yTo(e.clientY - 120);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleRowEnter = (project: Project) => {
    playTick(1800, 0.015);
    setHoveredSlug(project.slug);
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleRowLeave = () => {
    setHoveredSlug(null);
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.tags.includes(activeFilter as "dev" | "ai" | "devops");
  });

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full py-20 sm:py-24 md:py-32 border-b border-neutral-200 dark:border-neutral-800 bg-[var(--paper)] text-[var(--ink)]"
      aria-label="Selected Production Works"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-12 sm:space-y-14">

        {/* =========================================================================
            TOKYO/BERLIN STUDIO HEADER & MINIMALIST FILTER TABS
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-medium uppercase tracking-widest text-neutral-500">
              <Terminal className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>INDEX 02 // SELECTED WORKS ARCHIVE</span>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-700 dark:text-neutral-300">
                {filteredProjects.length} OF {projects.length} SHIPPED
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Production Systems &amp; Case Studies
            </h2>
          </div>

          {/* Right Controls: Filters + View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Minimalist Studio Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {(["all", "dev", "ai", "devops"] as FilterType[]).map((filter) => {
                const isSelected = activeFilter === filter;
                const label =
                  filter === "all"
                    ? "All Systems"
                    : filter === "ai"
                    ? "AI & RAG"
                    : filter === "dev"
                    ? "Full-Stack"
                    : "DevOps & Cloud";

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => {
                      playTick(2000, 0.02);
                      setActiveFilter(filter);
                    }}
                    className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                        : "bg-neutral-100/70 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle: Grid / Table */}
            <div className="flex items-center p-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80">
              <button
                type="button"
                onClick={() => {
                  playTick(2200, 0.02);
                  setViewMode("grid");
                }}
                aria-label="Grid View"
                title="Case Study Grid View"
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  playTick(2200, 0.02);
                  setViewMode("table");
                }}
                aria-label="Table View"
                title="Index Table View"
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STUDIO PROJECTS PRESENTATION (GRID VIEW OR TABLE VIEW)
            ========================================================================= */}
        {viewMode === "grid" ? (
          /* =======================================================================
             3D ELEVATED CASE STUDY GRID (TOKYO/BERLIN DESIGN STUDIO CARDS)
             ======================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => {
              const indexStr = String(idx + 1).padStart(2, "0");
              const categoryLabel =
                project.tags.includes("ai") && project.tags.includes("dev")
                  ? "AI & Full-Stack"
                  : project.tags.includes("ai")
                  ? "AI & Vector RAG"
                  : project.tags.includes("devops")
                  ? "DevOps & Cloud"
                  : "Full-Stack Dev";

              return (
                <article
                  key={project.slug}
                  className="group flex flex-col rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/90 dark:bg-[#121312]/90 backdrop-blur-md shadow-3d hover:shadow-3d-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  {/* Card Media Preview with Tokyo/Berlin Visuals */}
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={() => playTick(1600)}
                    className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-white/10 block cursor-pointer"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-950/80 backdrop-blur-md text-white font-mono text-[11px] font-medium border border-white/15 shadow-sm">
                        {indexStr} // {categoryLabel}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-950/80 backdrop-blur-md text-neutral-300 font-mono text-[10px] border border-white/10">
                        {project.slug.includes("summarizer") ||
                        project.slug.includes("crm") ||
                        project.slug.includes("smm")
                          ? "2023-24"
                          : "PROD"}
                      </span>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-2.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={() => playTick(1600)}
                        className="group/title inline-flex items-center gap-2"
                      >
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover/title:text-neutral-600 dark:group-hover/title:text-neutral-400 transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform" />
                      </Link>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-neutral-600 dark:text-neutral-400"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="font-mono text-[10px] px-2 py-0.5 text-neutral-400">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => playTick(2000)}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium text-[11px] shadow-sm hover:opacity-90 active:scale-95 transition-all"
                            >
                              <span>Live</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => playTick(2000)}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium text-[11px] hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95 transition-all"
                            >
                              <span>Code</span>
                              <FolderGit2 className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <Link
                          href={`/projects/${project.slug}`}
                          onClick={() => playTick(1600)}
                          className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium text-[11px] transition-colors"
                        >
                          <span>Details</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* =======================================================================
             STUDIO PROJECT TABLE WITH CURSOR PREVIEW (ARCHIVAL VIEW)
             ======================================================================= */
          <div className="rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d overflow-hidden divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredSlug === project.slug;
              const isAnyHovered = hoveredSlug !== null;
              const dimmed = isAnyHovered && !isHovered;

              // Formatted index
              const indexStr = String(idx + 1).padStart(2, "0");

              // Category tag
              const categoryLabel =
                project.tags.includes("ai") && project.tags.includes("dev")
                  ? "AI & Full-Stack"
                  : project.tags.includes("ai")
                  ? "AI & Vector RAG"
                  : project.tags.includes("devops")
                  ? "DevOps & Cloud"
                  : "Full-Stack Dev";

              return (
                <div
                  key={project.slug}
                  onMouseEnter={() => handleRowEnter(project)}
                  onMouseLeave={handleRowLeave}
                  className={`group relative p-6 sm:p-8 lg:p-9 transition-all duration-200 ${
                    dimmed ? "opacity-35" : "opacity-100"
                  } hover:bg-neutral-50/80 dark:hover:bg-neutral-800/30`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">

                    {/* Left: Index & Category Badge */}
                    <div className="lg:col-span-3 flex flex-wrap items-center gap-2.5 font-mono">
                      <span className="px-2 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-xs">
                        {indexStr}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 font-medium text-[11px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900">
                        {categoryLabel}
                      </span>
                    </div>

                    {/* Center: Title & Short Synopsis */}
                    <div className="lg:col-span-6 space-y-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={() => playTick(1600)}
                        className="group/title inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-lg"
                      >
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover/title:text-neutral-600 dark:group-hover/title:text-neutral-400 transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform" />
                      </Link>

                      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Mobile Thumbnail View */}
                      <div className="block lg:hidden pt-3">
                        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-neutral-200/80 dark:border-white/10 shadow-3d bg-neutral-100 dark:bg-neutral-900">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 400px"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right: Quick Action Links & Timeline */}
                    <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 font-mono text-xs">
                      <span className="text-neutral-400 font-medium tracking-wider text-[11px]">
                        {project.slug.includes("summarizer") ||
                        project.slug.includes("crm") ||
                        project.slug.includes("smm")
                          ? "2023 // 2024"
                          : "2024 // PROD"}
                      </span>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playTick(2000)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium text-[11px] shadow-sm hover:opacity-90 active:scale-95 transition-all"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playTick(2000)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium text-[11px] hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95 transition-all"
                          >
                            <span>Code</span>
                            <FolderGit2 className="w-3 h-3" />
                          </a>
                        )}

                        <Link
                          href={`/projects/${project.slug}`}
                          onClick={() => playTick(1600)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium text-[11px] transition-colors"
                        >
                          <span>Details</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Floating Cursor Preview (Desktop Only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block w-[360px] bg-white/95 dark:bg-[#121312]/95 backdrop-blur-xl border border-neutral-200 dark:border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-3 will-change-transform"
      >
        {hoveredProject && (
          <div className="space-y-2.5">
            <div className="relative w-full aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 overflow-hidden rounded-xl border border-neutral-200/80 dark:border-neutral-800">
              <Image
                src={hoveredProject.image}
                alt={hoveredProject.title}
                fill
                unoptimized
                className="object-cover"
                sizes="360px"
              />
            </div>
            <div className="px-1 flex items-center justify-between font-mono text-xs">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 truncate max-w-[240px]">
                {hoveredProject.title}
              </span>
              <span className="text-[10px] font-medium border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                PREVIEW
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
