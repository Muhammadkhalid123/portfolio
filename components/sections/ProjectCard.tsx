import React from "react";
import Link from "next/link";
import { Project } from "@/content/projects";
import { PersonaTagBadge, Badge } from "@/components/ui/Badge";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";
import { ExternalLink, Github, ArrowRight, Server, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  persona?: "personal" | "dev" | "ai";
}

export function ProjectCard({ project, persona = "personal" }: ProjectCardProps) {
  const isDevOps = project.tags.includes("devops");
  const isAI = project.tags.includes("ai");

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300 flex flex-col justify-between group overflow-hidden relative",
        persona === "dev"
          ? "bg-[#0c1424]/80 hover:bg-[#101c34]/90 border-cyan-950/80 hover:border-cyan-500/50 shadow-[0_4px_20px_-10px_rgba(6,182,212,0.15)]"
          : persona === "ai"
          ? "bg-[#140e26]/80 hover:bg-[#1c1336]/90 border-purple-950/80 hover:border-purple-500/50 shadow-[0_4px_20px_-10px_rgba(168,85,247,0.15)]"
          : "bg-[#11131c]/80 hover:bg-[#161924]/90 border-slate-800/80 hover:border-indigo-500/40 shadow-[0_4px_20px_-10px_rgba(99,102,241,0.15)]"
      )}
    >
      {/* Top Banner / Card Header */}
      <div className="p-6 pb-4">
        {/* Badges & Tags Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => (
              <PersonaTagBadge key={tag} tag={tag} />
            ))}
          </div>

          {project.featured && (
            <Badge variant="outline" size="sm" className="border-amber-500/40 text-amber-300 bg-amber-500/10">
              Featured
            </Badge>
          )}
        </div>

        {/* Title & Slug Link */}
        <Link
          href={`/projects/${project.slug}`}
          className="group/title block mb-2"
        >
          <h3 className="text-xl font-bold text-white group-hover/title:text-indigo-300 transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-all group-hover/title:translate-x-1 text-indigo-400 shrink-0" />
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-5">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-md bg-slate-900/90 text-slate-300 border border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer / Action Links */}
      <div className="px-6 py-4 bg-slate-950/40 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <Link000
          href={`/projects/${project.slug}`}
          className="text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>Case Study & Architecture</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
        </Link000>

        <div className="flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub Repository`}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Live Demo`}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
