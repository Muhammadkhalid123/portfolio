"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { projects, Project } from "@/content/projects";
import { playTick } from "@/lib/sound";

type FilterType = "all" | "dev" | "ai" | "devops";

export function WorkIndex() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<((val: number) => void) | null>(null);
  const yToRef = useRef<((val: number) => void) | null>(null);

  useEffect(() => {
    if (!previewRef.current) return;

    // Set initial position offscreen
    gsap.set(previewRef.current, { xPercent: 15, yPercent: -50, opacity: 0, scale: 0.95 });

    // Setup high-performance quickTo setters
    xToRef.current = gsap.quickTo(previewRef.current, "x", { duration: 0.35, ease: "power2.out" });
    yToRef.current = gsap.quickTo(previewRef.current, "y", { duration: 0.35, ease: "power2.out" });

    const handlePointerMove = (e: PointerEvent) => {
      if (xToRef.current && yToRef.current) {
        xToRef.current(e.clientX);
        yToRef.current(e.clientY);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const handleRowEnter = (project: Project) => {
    playTick(1800, 0.015);
    setHoveredSlug(project.slug);
    setHoveredProject(project);

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
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  };

  const filteredProjects = projects.filter(p => {
    if (activeFilter === "all") return true;
    return p.tags.includes(activeFilter as "dev" | "ai" | "devops");
  });

  return (
    <section id="work" ref={containerRef} className="w-full py-16 md:py-24 border-b border-[var(--rule)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header & HAOQI Bracket Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-8 border-b border-[var(--rule)]">
          <div className="mono text-[13px] text-[var(--muted)] uppercase tracking-wider">
            // SELECTED PROJECTS ({filteredProjects.length})
          </div>

          {/* HAOQI Brackets: [All]  [Dev]  [AI]  [DevOps] */}
          <div className="flex items-center gap-3 mono text-[13px]">
            {(["all", "dev", "ai", "devops"] as FilterType[]).map((filter) => {
              const isSelected = activeFilter === filter;
              const label = filter.toUpperCase();
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    playTick(2000, 0.02);
                    setActiveFilter(filter);
                  }}
                  className={`px-2 py-0.5 border border-[var(--rule)] transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[var(--ink)] text-[var(--paper)] font-bold"
                      : "text-[var(--ink)] hover:opacity-60"
                  }`}
                >
                  [{isSelected ? `x ${label}` : label}]
                </button>
              );
            })}
          </div>
        </div>

        {/* HAOQI Project Rows: [category, mono] [name, sans 72px max] [year, mono] */}
        <div className="divide-y divide-[var(--rule)]">
          {filteredProjects.map((project) => {
            const isHovered = hoveredSlug === project.slug;
            const isAnyHovered = hoveredSlug !== null;
            const dimmed = isAnyHovered && !isHovered;

            // Determine category label
            const categoryLabel = project.tags.includes("ai") && project.tags.includes("dev")
              ? "AI & ML, Dev"
              : project.tags.includes("ai")
              ? "AI & ML"
              : project.tags.includes("devops")
              ? "DevOps & Cloud"
              : "Dev";

            // Determine year string
            const yearStr = project.slug.includes("summarizer") || project.slug.includes("crm") || project.slug.includes("smm")
              ? "2023-2024"
              : "2024-Present";

            return (
              <div
                key={project.slug}
                onMouseEnter={() => handleRowEnter(project)}
                onMouseLeave={handleRowLeave}
                className={`group py-6 md:py-8 transition-opacity duration-300 ${
                  dimmed ? "opacity-35" : "opacity-100"
                }`}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={() => playTick(1600)}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline w-full select-none"
                >
                  {/* Category (mono) */}
                  <span className="md:col-span-3 mono text-[13px] text-[var(--muted)]">
                    {categoryLabel}
                  </span>

                  {/* Project Name (sans fluid display up to 72px) */}
                  <h2 className="md:col-span-7 text-[28px] sm:text-[38px] md:text-[46px] lg:text-[54px] font-normal leading-[1.05] tracking-tight text-[var(--ink)] group-hover:underline underline-offset-8 decoration-[var(--rule)] transition-all">
                    {project.title}
                  </h2>

                  {/* Year + External Links (mono) */}
                  <div className="md:col-span-2 md:text-right mono text-[13px] text-[var(--muted)] flex items-center md:justify-end gap-2">
                    <span>{yearStr}</span>
                    {project.liveUrl && (
                      <span className="text-[var(--ink)] font-bold">↗</span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Cursor Preview (Desktop Only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block w-[360px] bg-[var(--paper)] border border-[var(--ink)] shadow-2xl p-2 will-change-transform"
      >
        {hoveredProject && (
          <div className="space-y-2">
            <div className="relative w-full aspect-[16/10] bg-[var(--paper)] overflow-hidden border border-[var(--rule)]">
              <Image
                src={hoveredProject.image}
                alt={hoveredProject.title}
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
            <div className="px-1 py-1 flex items-center justify-between mono text-[11px]">
              <span className="text-[var(--ink)] font-bold truncate max-w-[220px]">
                {hoveredProject.title}
              </span>
              <span className="text-[var(--muted)]">Preview</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
