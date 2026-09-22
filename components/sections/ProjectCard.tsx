import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/content/projects";
import { PersonaTagBadge, Badge } from "@/components/ui/Badge";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  persona?: "personal" | "dev" | "ai";
}

export function ProjectCard({ project, persona = "personal" }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative border border-white/10 hover:border-[#800020]/40 shadow-[0_8px_32px_rgba(0,0,0,0.37)]",
        persona === "dev"
          ? "liquid-glass-dev"
          : persona === "ai"
          ? "liquid-glass-ai"
          : "liquid-glass-personal"
      )}
    >
      <div>
        {/* Project Image Banner */}
        {project.image && (
          <Link
            href={`/projects/${project.slug}`}
            className="block relative w-full aspect-[16/9.5] overflow-hidden bg-black/50 border-b border-white/10 group/img"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Badges Overlaid on top of image */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.tags.map((tag) => (
                  <PersonaTagBadge key={tag} tag={tag} />
                ))}
              </div>
              {project.featured && (
                <Badge variant="outline" size="sm" className="border-amber-400/40 text-amber-300 bg-black/60 backdrop-blur-md">
                  Featured
                </Badge>
              )}
            </div>
          </Link>
        )}

        {/* Card Body */}
        <div className="p-6 sm:p-7 pb-4">
          {/* Fallback badges if no image */}
          {!project.image && (
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.tags.map((tag) => (
                  <PersonaTagBadge key={tag} tag={tag} />
                ))}
              </div>

              {project.featured && (
                <Badge variant="outline" size="sm" className="border-amber-400/40 text-amber-300 bg-amber-400/10">
                  Featured
                </Badge>
              )}
            </div>
          )}

          {/* Title & Slug Link */}
          <Link
            href={`/projects/${project.slug}`}
            className="group/title block mb-2.5"
          >
            <h3 className="font-display text-xl font-bold tracking-[-0.025em] text-[#FCFAF4] group-hover/title:text-[#f0a3b3] transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-all group-hover/title:translate-x-1 text-[#f0a3b3] shrink-0" />
            </h3>
          </Link>

          {/* Description */}
          <p className="text-[13.5px] sm:text-sm text-[#FCFAF4]/80 leading-[1.65] font-normal tracking-[-0.01em] mb-4">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-lg bg-[#800020]/15 text-[#FCFAF4] border border-[#800020]/30 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer / Action Links */}
      <div className="px-6 sm:px-7 py-4 bg-black/30 border-t border-white/10 flex items-center justify-between gap-3">
        <Link000
          href={`/projects/${project.slug}`}
          className="text-xs font-semibold text-[#FCFAF4] hover:text-[#f0a3b3] transition-colors flex items-center gap-1.5"
        >
          <span>Case Study &amp; Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#f0a3b3] group-hover:translate-x-0.5 transition-transform" />
        </Link000>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} Live Demo`}
            className="p-2 rounded-xl liquid-glass-pill-dark text-[#FCFAF4] hover:text-[#f0a3b3] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
