import React from "react";
import { profile } from "@/content/profile";
import { personas } from "@/content/personas";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Server,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  GitBranch,
  Terminal,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function About({ persona = "personal" }: { persona?: "personal" | "dev" | "ai" }) {
  const personaConfig = personas[persona];
  const bioParagraphs = profile.bio[persona];

  const valueProps = {
    personal: [
      {
        icon: Layers,
        title: "Full-Stack Versatility",
        description: "From Next.js 14 reactive user interfaces to Python / FastAPI asynchronous backend architectures.",
      },
      {
        icon: Cpu,
        title: "AI & RAG Engineering",
        description: "Designing semantic retrieval engines, LLM agent workflows, and neural text-to-speech audio pipelines.",
      },
      {
        icon: Server,
        title: "DevOps & Cloud Automation",
        description: "Multi-stage Docker packaging, automated GitHub Actions CI/CD, and Nginx reverse proxy on AWS EC2.",
      },
    ],
    dev: [
      {
        icon: Server,
        title: "Automated AWS EC2 Cloud Infra",
        description: "Hardened Ubuntu server provisioning, Nginx reverse proxy, Certbot SSL automation, and firewall security.",
      },
      {
        icon: Terminal,
        title: "Multi-Stage Docker Containers",
        description: "Optimized Alpine images under 120MB with standalone builds, bridge networks, and persistent volume backups.",
      },
      {
        icon: GitBranch,
        title: "Zero-Downtime CI/CD Pipelines",
        description: "GitHub Actions workflows triggering automated testing, GHCR container pushes, and rolling SSH server rollouts.",
      },
    ],
    ai: [
      {
        icon: Cpu,
        title: "RAG & Semantic Retrieval",
        description: "Dense vector indexing with Qdrant, hybrid BM25 search, cross-encoder reranking, and citation grounding.",
      },
      {
        icon: Sparkles,
        title: "NLP & Transformers",
        description: "Custom abstractive document summarizers, Hugging Face transformer pipelines, and LangChain orchestration.",
      },
      {
        icon: Zap,
        title: "Neural Audio Synthesis",
        description: "Deep learning acoustic vocoders, sub-200ms streaming TTS pipelines, and real-time audio playback.",
      },
    ],
  }[persona];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={persona === "dev" ? "Infrastructure & Engineering" : persona === "ai" ? "AI Capabilities" : "About Muhammad Khalid"}
          badgeVariant={persona === "dev" ? "dev" : persona === "ai" ? "ai" : "personal"}
          title="Architecting for"
          highlightedTitle={persona === "dev" ? "Scalability & Resilience" : persona === "ai" ? "Autonomous Intelligence" : "Performance & Reliability"}
          gradientClass={
            persona === "dev"
              ? "from-cyan-400 to-blue-400"
              : persona === "ai"
              ? "from-purple-400 to-fuchsia-400"
              : "from-indigo-400 to-amber-300"
          }
          description="A look at the principles, core capabilities, and engineering philosophy behind every project."
        />

        {/* Bio & Value Proposition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Bio & Core Positioning (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <span>Engineering Focus:</span>
                <span className={cn(
                  "font-mono text-sm px-2.5 py-0.5 rounded-lg border",
                  persona === "dev"
                    ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/30"
                    : persona === "ai"
                    ? "bg-purple-950/80 text-purple-300 border-purple-500/30"
                    : "bg-indigo-950/80 text-indigo-300 border-indigo-500/30"
                )}>
                  {personaConfig.headline}
                </span>
              </h3>

              <div className="space-y-4 text-slate-300 leading-relaxed text-base">
                {bioParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{profile.location}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{profile.availability}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Three Pillar Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {valueProps.map((prop, idx) => {
              const PropIcon = prop.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={cn(
                      "p-2.5 rounded-xl border transition-colors",
                      persona === "dev"
                        ? "bg-cyan-950/60 border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400"
                        : persona === "ai"
                        ? "bg-purple-950/60 border-purple-500/30 text-purple-400 group-hover:border-purple-400"
                        : "bg-indigo-950/60 border-indigo-500/30 text-indigo-400 group-hover:border-indigo-400"
                    )}>
                      <PropIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white group-hover:text-slate-100 mb-1">
                        {prop.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center flex flex-col items-center justify-center group hover:border-slate-700 transition-colors"
            >
              <span className={cn(
                "text-3xl sm:text-4xl font-extrabold mb-1 font-mono tracking-tight",
                persona === "dev"
                  ? "text-cyan-400"
                  : persona === "ai"
                  ? "text-purple-400"
                  : "text-indigo-400"
              )}>
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-slate-200 mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-slate-500 leading-normal">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
