import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PersonaTagBadge, Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAdjacentProjects,
} from "@/lib/getProjectsByPersona";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Layers,
  Server,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Box,
  GitBranch,
  Terminal,
} from "lucide-react";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found | Muhammad Khalid",
    };
  }

  return {
    title: `${project.title} — Case Study | Muhammad Khalid`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study | Muhammad Khalid`,
      description: project.description,
      type: "article",
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(params.slug);
  const isDevOps = project.tags.includes("devops");
  const isAI = project.tags.includes("ai");

  return (
    <div className="flex flex-col min-h-screen bg-[#090a0f] text-slate-100">
      <Header persona={isDevOps ? "dev" : isAI ? "ai" : "personal"} />

      <main className="flex-1 pt-32 pb-24">
        {/* Breadcrumb & Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Hero Header */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
            {/* Ambient Accent Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {project.tags.map((tag) => (
                  <PersonaTagBadge key={tag} tag={tag} />
                ))}
                {project.featured && (
                  <Badge variant="personal" size="sm">
                    Featured Project
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.repoUrl && (
                  <Button
                    href={project.repoUrl}
                    external
                    variant="primary"
                    size="md"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </Button>
                )}

                {project.liveUrl && (
                  <Button
                    href={project.liveUrl}
                    external
                    variant="secondary"
                    size="md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demonstration</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Project Case Study Content */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Tech Stack Matrix */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Technology & Tooling Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Overview & Problem Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                <h2 className="text-xl font-bold text-white mb-4">
                  Overview & Engineering Architecture
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Key Architectural Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Key Features & Technical Innovations
                  </h2>
                  <div className="space-y-3">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Architecture Flow / System Breakdown */}
            <div className="lg:col-span-5 space-y-6">
              {project.architecture && project.architecture.length > 0 && (
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-400" />
                    <span>System Components</span>
                  </h2>
                  <div className="space-y-3">
                    {project.architecture.map((layer, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 font-mono leading-relaxed"
                      >
                        <span className="text-indigo-400 font-bold mr-2">
                          0{idx + 1}.
                        </span>
                        {layer}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Specs Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-xs space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-slate-800">
                  <span className="text-slate-400">Author:</span>
                  <span className="font-semibold text-white">Muhammad Khalid</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800">
                  <span className="text-slate-400">License:</span>
                  <span className="font-semibold text-white">MIT</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800">
                  <span className="text-slate-400">Primary Language:</span>
                  <span className="font-semibold text-white">{project.techStack[0] || "TypeScript"}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Production Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DevOps Deployment Architecture Section (Crucial for DevOps tagged projects) */}
          {project.deployment && (
            <div className="p-8 sm:p-10 rounded-3xl bg-cyan-950/20 border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="dev" size="sm">
                  DevOps Breakdown
                </Badge>
                <span className="text-xs font-mono text-cyan-400">Production Cloud Setup</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white mb-6 flex items-center gap-3">
                <Server className="w-6 h-6 text-cyan-400" />
                <span>Deployment & Infrastructure Architecture</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-950 text-xs">
                  <span className="text-slate-400 block mb-1">Hosting Platform</span>
                  <span className="font-mono font-bold text-cyan-300">{project.deployment.platform}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-950 text-xs">
                  <span className="text-slate-400 block mb-1">Containerization</span>
                  <span className="font-mono font-bold text-cyan-300">{project.deployment.containerization}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-950 text-xs">
                  <span className="text-slate-400 block mb-1">CI/CD Pipeline</span>
                  <span className="font-mono font-bold text-cyan-300">{project.deployment.ciCd}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-950 text-xs">
                  <span className="text-slate-400 block mb-1">Edge Reverse Proxy</span>
                  <span className="font-mono font-bold text-cyan-300">{project.deployment.proxy}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {project.deployment.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Adjacent Project Navigation */}
          <div className="pt-10 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/projects/${prev.slug}`}
                className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-3 group"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Previous Project</span>
                  <span className="text-sm font-semibold text-white truncate block">{prev.title}</span>
                </div>
              </Link>
            )}

            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between sm:justify-end gap-3 group sm:text-right"
              >
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Next Project</span>
                  <span className="text-sm font-semibold text-white truncate block">{next.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer persona={isDevOps ? "dev" : isAI ? "ai" : "personal"} />
    </div>
  );
}
