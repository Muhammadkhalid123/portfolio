import React from "react";
import Link from "next/link";
import { personas } from "@/content/personas";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowRight,
  FileText,
  Terminal,
  Sparkles,
  Layers,
  CheckCircle2,
  Cpu,
  Server,
  Code2,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroProps {
  persona?: "personal" | "dev" | "ai";
}

export function Hero({ persona = "personal" }: HeroProps) {
  const personaConfig = personas[persona];

  const personaBadges = {
    personal: {
      badgeVariant: "personal" as const,
      icon: Layers,
      highlightWord: "Engineering Intelligence",
      gradient: "from-indigo-400 via-purple-300 to-amber-300",
      secondaryCtaVariant: "secondary" as const,
    },
    dev: {
      badgeVariant: "dev" as const,
      icon: Terminal,
      highlightWord: "Production-Grade Systems",
      gradient: "from-cyan-400 via-blue-400 to-emerald-300",
      secondaryCtaVariant: "secondary" as const,
    },
    ai: {
      badgeVariant: "ai" as const,
      icon: Sparkles,
      highlightWord: "Autonomous Intelligence",
      gradient: "from-purple-400 via-fuchsia-400 to-cyan-300",
      secondaryCtaVariant: "secondary" as const,
    },
  }[persona];

  const Icon = personaBadges.icon;

  return (
    <section id="top" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Dynamic Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {persona === "dev" && (
          <>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[130px] rounded-full" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
          </>
        )}
        {persona === "ai" && (
          <>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/15 blur-[130px] rounded-full" />
            <div className="absolute top-1/3 right-1/4 w-[450px] h-[350px] bg-fuchsia-500/10 blur-[110px] rounded-full" />
          </>
        )}
        {persona === "personal" && (
          <>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[420px] bg-indigo-600/12 blur-[130px] rounded-full" />
            <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-amber-500/8 blur-[110px] rounded-full" />
          </>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tag & Status */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md mb-8 shadow-lg shadow-black/40">
          <Icon className={cn("w-4 h-4", persona === "dev" ? "text-cyan-400" : persona === "ai" ? "text-purple-400" : "text-indigo-400")} />
          <span className="text-xs font-semibold text-slate-300">
            {personaConfig.badgeText}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-emerald-400 font-medium">Available</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          {persona === "personal" ? (
            <>
              Building <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">End-to-End AI</span> & Scalable Cloud Applications.
            </>
          ) : persona === "dev" ? (
            <>
              Full-Stack Engineering with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Hardened Cloud Infra</span>.
            </>
          ) : (
            <>
              Transforming Ideas into <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Production AI & RAG</span> Systems.
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          {personaConfig.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Button
            href="#projects"
            size="lg"
            variant={persona === "dev" ? "cyan" : persona === "ai" ? "purple" : "primary"}
            className="group"
          >
            <span>{personaConfig.ctaPrimaryText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>

          <Button
            href="#contact"
            size="lg"
            variant="secondary"
          >
            <span>{personaConfig.ctaSecondaryText}</span>
          </Button>

          <Button
            href={profile.resumeUrl}
            external
            size="lg"
            variant="outline"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>View Resume</span>
          </Button>
        </div>

        {/* Persona Quick Exploration Links (only on root/personal or for cross-brand discovery) */}
        <div className="pt-8 border-t border-slate-800/80 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-4">
            Audience & Specialization Tracks:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
            <Link
              href="/dev"
              className={cn(
                "p-3.5 rounded-xl border transition-all duration-200 group flex items-start gap-3",
                persona === "dev"
                  ? "bg-cyan-950/40 border-cyan-500/50 shadow-md shadow-cyan-500/10"
                  : "bg-slate-900/40 hover:bg-slate-900/80 border-slate-800 hover:border-cyan-500/40"
              )}
            >
              <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800/60 text-cyan-400 group-hover:scale-105 transition-transform">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                  <span>Dev & DevOps Brand</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  Full-stack, Docker, AWS EC2, CI/CD
                </p>
              </div>
            </Link>

            <Link
              href="/ai"
              className={cn(
                "p-3.5 rounded-xl border transition-all duration-200 group flex items-start gap-3",
                persona === "ai"
                  ? "bg-purple-950/40 border-purple-500/50 shadow-md shadow-purple-500/10"
                  : "bg-slate-900/40 hover:bg-slate-900/80 border-slate-800 hover:border-purple-500/40"
              )}
            >
              <div className="p-2 rounded-lg bg-purple-950 border border-purple-800/60 text-purple-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                  <span>AI Engineer Brand</span>
                  <ArrowRight className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  RAG, LLMs, Voice TTS & Summarizers
                </p>
              </div>
            </Link>

            <Link
              href="/"
              className={cn(
                "p-3.5 rounded-xl border transition-all duration-200 group flex items-start gap-3 sm:col-span-2 lg:col-span-1",
                persona === "personal"
                  ? "bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-500/10"
                  : "bg-slate-900/40 hover:bg-slate-900/80 border-slate-800 hover:border-indigo-500/40"
              )}
            >
              <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-800/60 text-indigo-400 group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                  <span>Personal Portfolio</span>
                  <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  Full scope, experience timeline & story
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
