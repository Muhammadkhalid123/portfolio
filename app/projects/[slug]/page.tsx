import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PersonaTagBadge, Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
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
  const pagePersona = isDevOps ? "dev" : isAI ? "ai" : "personal";

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#0F0F0F] relative">
      <LiquidBackground persona={pagePersona} />
      <Header persona={pagePersona} />

      <main className="flex-1 pt-28 pb-24 relative z-10">
        {/* Breadcrumb & Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#808080] hover:text-[#0F0F0F] transition-colors px-3.5 py-1.5 rounded-full butter-pill w-max"
          >
            <ArrowLeft className="w-4 h-4 text-[#00FFD0]" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Hero Header */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className={
            pagePersona === "dev"
              ? "p-8 sm:p-12 rounded-3xl liquid-glass-dev overflow-hidden"
              : pagePersona === "ai"
              ? "p-8 sm:p-12 rounded-3xl liquid-glass-ai overflow-hidden"
              : "p-8 sm:p-12 rounded-3xl liquid-glass-personal overflow-hidden"
          }>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className={project.image ? "lg:col-span-7" : "lg:col-span-12"}>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <PersonaTagBadge key={tag} tag={tag} />
                  ))}
                  {project.featured && (
                    <Badge variant="outline" size="sm" className="border-[#00FFD0]/60 text-[#00FFD0] bg-[#0F0F0F]/80">
                      Featured Project
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FAFAFA] tracking-tight mb-4">
                  {project.title}
                </h1>

                <p className="text-base sm:text-lg text-[#FAFAFA]/85 max-w-3xl leading-relaxed mb-8">
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

              {project.image && (
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-2xl relative aspect-[16/10] group">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Project Case Study Content */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Tech Stack Matrix */}
          <div className="p-6 sm:p-8 rounded-3xl liquid-glass">
            <h2 className="text-xs font-semibold text-[#00FFD0] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#00FFD0]" />
              <span>Technology & Tooling Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-xl liquid-glass-pill-dark text-[#FAFAFA]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Overview & Problem Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 rounded-3xl liquid-glass">
                <h2 className="text-xl font-bold text-[#FAFAFA] mb-4">
                  What it does & how it was built
                </h2>
                <p className="text-sm sm:text-base text-[#FAFAFA]/85 leading-relaxed mb-4">
                  {project.longDescription || project.description}
                </p>
                {project.technicalNote && (
                  <div className="p-4 rounded-2xl bg-black/50 border border-[#00FFD0]/30 text-xs text-[#FAFAFA]/80">
                    <span className="text-[#00FFD0] font-semibold block mb-1">Technical Decision:</span>
                    {project.technicalNote}
                  </div>
                )}
              </div>

              {/* Key Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="p-8 rounded-3xl liquid-glass">
                  <h2 className="text-xl font-bold text-[#FAFAFA] mb-4">
                    Key Features & Technical Decisions
                  </h2>
                  <div className="space-y-3">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-[#FAFAFA]/85">
                        <CheckCircle2 className="w-4 h-4 text-[#00FFD0] shrink-0 mt-0.5" />
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
                <div className="p-8 rounded-3xl liquid-glass">
                  <h2 className="text-xl font-bold text-[#FAFAFA] mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#00FFD0]" />
                    <span>System Components</span>
                  </h2>
                  <div className="space-y-3">
                    {project.architecture.map((layer, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl liquid-glass-pill-dark text-xs text-[#FAFAFA]/85 font-mono leading-relaxed"
                      >
                        <span className="text-[#00FFD0] font-bold mr-2">
                          0{idx + 1}.
                        </span>
                        {layer}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Specs Card */}
              <div className="p-6 rounded-3xl liquid-glass text-xs space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-[#808080]">Engineering Team:</span>
                  <span className="font-semibold text-[#FAFAFA]">AI &amp; Automation Engineering</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-[#808080]">License:</span>
                  <span className="font-semibold text-[#FAFAFA]">MIT</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-[#808080]">Primary Language:</span>
                  <span className="font-semibold text-[#FAFAFA]">{project.techStack[0] || "TypeScript"}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#808080]">Status:</span>
                  <span className="text-[#00FFD0] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD0] animate-pulse" />
                    Production Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DevOps Deployment Architecture Section */}
          {project.deployment && (
            <div className="p-8 sm:p-10 rounded-3xl liquid-glass-dev">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="dev" size="sm">
                  DevOps Breakdown
                </Badge>
                <span className="text-xs font-mono text-[#00FFD0]">Production Cloud Setup</span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#FAFAFA] mb-6 flex items-center gap-3">
                <Server className="w-6 h-6 text-[#00FFD0]" />
                <span>Deployment & Infrastructure Architecture</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-2xl liquid-glass-pill-dark text-xs">
                  <span className="text-[#808080] block mb-1">Hosting Platform</span>
                  <span className="font-mono font-bold text-[#00FFD0]">{project.deployment.platform}</span>
                </div>
                <div className="p-4 rounded-2xl liquid-glass-pill-dark text-xs">
                  <span className="text-[#808080] block mb-1">Containerization</span>
                  <span className="font-mono font-bold text-[#00FFD0]">{project.deployment.containerization}</span>
                </div>
                <div className="p-4 rounded-2xl liquid-glass-pill-dark text-xs">
                  <span className="text-[#808080] block mb-1">CI/CD Pipeline</span>
                  <span className="font-mono font-bold text-[#00FFD0]">{project.deployment.ciCd}</span>
                </div>
                <div className="p-4 rounded-2xl liquid-glass-pill-dark text-xs">
                  <span className="text-[#808080] block mb-1">Edge Reverse Proxy</span>
                  <span className="font-mono font-bold text-[#00FFD0]">{project.deployment.proxy}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {project.deployment.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#FAFAFA]/85">
                    <ShieldCheck className="w-4 h-4 text-[#00FFD0] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Adjacent Project Navigation */}
          <div className="pt-10 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/projects/${prev.slug}`}
                className="p-4 rounded-2xl liquid-glass hover:border-[#00FFD0]/50 transition-all flex items-center gap-3 group"
              >
                <ArrowLeft className="w-4 h-4 text-[#808080] group-hover:text-[#00FFD0] group-hover:-translate-x-1 transition-all" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#808080] block">Previous Project</span>
                  <span className="text-sm font-semibold text-[#FAFAFA] truncate block">{prev.title}</span>
                </div>
              </Link>
            )}

            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="p-4 rounded-2xl liquid-glass hover:border-[#00FFD0]/50 transition-all flex items-center justify-between sm:justify-end gap-3 group sm:text-right"
              >
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#808080] block">Next Project</span>
                  <span className="text-sm font-semibold text-[#FAFAFA] truncate block">{next.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#808080] group-hover:text-[#00FFD0] group-hover:translate-x-1 transition-all" />
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer persona={pagePersona} />
    </div>
  );
}
