import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAdjacentProjects,
} from "@/lib/getProjectsByPersona";

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
    title: `${project.title} — Muhammad Khalid`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Muhammad Khalid`,
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

  const { next } = getAdjacentProjects(params.slug);

  const categoryLabel = project.tags.includes("ai") && project.tags.includes("dev")
    ? "AI & ML, Dev"
    : project.tags.includes("ai")
    ? "AI & ML"
    : project.tags.includes("devops")
    ? "DevOps & Cloud"
    : "Dev";

  const yearStr = project.slug.includes("summarizer") || project.slug.includes("crm") || project.slug.includes("smm")
    ? "2023 to 2024"
    : "2024 to present";

  return (
    <div className="flex flex-col min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <Header />

      <main className="flex-1 pt-12 md:pt-16 pb-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-12 md:space-y-16">
          
          {/* Top Metadata Bar: ← Work and Year */}
          <div className="flex items-center justify-between mono text-[13px] text-[var(--muted)] pb-4 border-b border-[var(--rule)]">
            <Link
              href="/#work"
              className="text-[var(--ink)] font-bold hover:opacity-60 transition-opacity"
            >
              &larr; Work
            </Link>
            <span>{yearStr}</span>
          </div>

          {/* Project Title (Display 87px top, line-height 1.0) */}
          <div className="space-y-4">
            <h1 className="display text-[44px] sm:text-[62px] md:text-[76px] lg:text-[87px] leading-[1.0] font-bold tracking-tight text-[var(--ink)]">
              {project.title}
            </h1>
            <p className="statement text-[20px] sm:text-[24px] md:text-[28px] text-[var(--muted)] leading-[1.2] max-w-[800px]">
              {project.description}
            </p>
          </div>

          {/* Metadata Grid (Role, Stack, Links) with Hairline Rules */}
          <div className="py-6 border-y border-[var(--rule)] grid grid-cols-1 md:grid-cols-12 gap-6 mono text-[13px]">
            <div className="md:col-span-3 space-y-1">
              <span className="text-[var(--muted)] block uppercase text-[11px]">Category</span>
              <span className="text-[var(--ink)] font-bold">{categoryLabel}</span>
            </div>

            <div className="md:col-span-6 space-y-1">
              <span className="text-[var(--muted)] block uppercase text-[11px]">Stack</span>
              <span className="text-[var(--ink)]">{project.techStack.join(" · ")}</span>
            </div>

            <div className="md:col-span-3 space-y-1 md:text-right">
              <span className="text-[var(--muted)] block uppercase text-[11px]">Links</span>
              <div className="flex items-center md:justify-end gap-4 text-[var(--ink)] font-bold">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity"
                  >
                    GitHub ↗
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Featured Image (Full width, zero radius, hairline border) */}
          {project.image && (
            <div className="w-full aspect-[16/9] relative bg-[var(--paper)] border border-[var(--rule)] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover"
              />
            </div>
          )}

          {/* Deep Overview (62ch max-width, 16px body) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="mono text-[12px] text-[var(--muted)] uppercase tracking-wider">
                {"// ARCHITECTURE & TECHNICAL DECISIONS"}
              </div>

              <div className="body text-[16px] sm:text-[17px] leading-[1.6] space-y-6 text-[var(--ink)]">
                <p>{project.longDescription || project.description}</p>
                {project.technicalNote && (
                  <div className="p-6 border-l-2 border-[var(--ink)] bg-[var(--ink)]/5 mono text-[13px] leading-relaxed">
                    <span className="font-bold block mb-1 uppercase text-[11px]">Core Architectural Note:</span>
                    {project.technicalNote}
                  </div>
                )}
              </div>

              {/* Key Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-[var(--rule)]">
                  <div className="mono text-[12px] text-[var(--muted)] uppercase tracking-wider">
                    {"// KEY HIGHLIGHTS"}
                  </div>
                  <ul className="space-y-3 mono text-[13px] text-[var(--ink)]">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="font-bold text-[var(--muted)]">—</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Architecture List / Deployment Specs */}
            <div className="lg:col-span-4 space-y-8 border-l border-[var(--rule)] pl-0 lg:pl-8">
              {project.architecture && (
                <div className="space-y-3">
                  <div className="mono text-[12px] text-[var(--muted)] uppercase tracking-wider">
                    {"// SYSTEM BREAKDOWN"}
                  </div>
                  <div className="divide-y divide-[var(--rule)]">
                    {project.architecture.map((layer, idx) => (
                      <div key={idx} className="py-3 mono text-[12px] text-[var(--ink)]">
                        <span className="text-[var(--muted)] mr-2">0{idx + 1}.</span>
                        {layer}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.deployment && (
                <div className="space-y-3 pt-6 border-t border-[var(--rule)]">
                  <div className="mono text-[12px] text-[var(--muted)] uppercase tracking-wider">
                    {"// INFRASTRUCTURE"}
                  </div>
                  <div className="mono text-[12px] space-y-2">
                    <div className="flex justify-between py-1 border-b border-[var(--rule)]">
                      <span className="text-[var(--muted)]">Platform:</span>
                      <span className="text-[var(--ink)] font-bold">{project.deployment.platform}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[var(--rule)]">
                      <span className="text-[var(--muted)]">Containers:</span>
                      <span className="text-[var(--ink)] font-bold">{project.deployment.containerization}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[var(--muted)]">Proxy / SSL:</span>
                      <span className="text-[var(--ink)] font-bold">{project.deployment.proxy}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Project → */}
          {next && (
            <div className="pt-16 md:pt-24 border-t border-[var(--rule)]">
              <div className="mono text-[12px] text-[var(--muted)] uppercase tracking-wider mb-2">
                Next Project &rarr;
              </div>
              <Link
                href={`/projects/${next.slug}`}
                className="group block"
              >
                <div className="text-[32px] sm:text-[48px] md:text-[64px] font-bold leading-tight text-[var(--ink)] group-hover:underline underline-offset-8 decoration-[var(--rule)] transition-all">
                  {next.title} &rarr;
                </div>
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
