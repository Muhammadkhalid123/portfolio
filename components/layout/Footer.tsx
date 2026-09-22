import React from "react";
import Link from "next/link";
import { profile } from "@/content/profile";
import { personas } from "@/content/personas";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";
import { Github, Linkedin, Mail, Twitter, Terminal, Sparkles, Layers, ArrowUp, Heart } from "lucide-react";

export function Footer({ persona = "personal" }: { persona?: "personal" | "dev" | "ai" }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#07090e] pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-gradient-to-b from-indigo-500/5 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center font-mono font-bold text-indigo-400">
                MK
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Full Stack Developer & AI Engineer building scalable web applications, RAG pipelines, and automated Docker/EC2 cloud infrastructure.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Personas Navigator */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Brand Personas
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li>
                <Link000
                  href="/"
                  className="inline-flex items-center gap-2 hover:text-indigo-400 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Personal (Full Scope)</span>
                </Link000>
              </li>
              <li>
                <Link000
                  href="/dev"
                  className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dev & DevOps Brand</span>
                </Link000>
              </li>
              <li>
                <Link000
                  href="/ai"
                  className="inline-flex items-center gap-2 hover:text-purple-400 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>AI Engineer Brand</span>
                </Link000>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Tech Stack */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Core Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js 14", "TypeScript", "Python", "FastAPI", "Docker", "AWS EC2", "LangChain", "Qdrant", "Nginx"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-900 border border-slate-800 text-slate-400"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Col 5: System Status */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Status & Hosting
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">Systems Operational</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Deployed via Docker container behind Nginx reverse proxy with automated GitHub Actions CI/CD.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {profile.name}. All rights reserved. Built with Next.js 14 App Router & Tailwind CSS.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="inline-flex items-center gap-1 hover:text-slate-300 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
