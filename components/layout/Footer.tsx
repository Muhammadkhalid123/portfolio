import React from "react";
import { profile } from "@/content/profile";
import { Link000 } from "@/components/ui/skiper-ui/skiper40";
import { Sparkles, ArrowUp, Code2, MessageSquare, Layers } from "lucide-react";

export interface FooterProps {
  persona?: "personal" | "dev" | "ai";
}

export function Footer({ persona = "ai" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#800020]/30 bg-[#010101] bg-hex-pattern-dark pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-gradient-to-b from-[#800020]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#800020] border border-[#f0a3b3]/40 flex items-center justify-center font-mono font-bold text-xs text-[#FCFAF4] shadow-[0_0_15px_rgba(128,0,32,0.35)]">
                AI
              </div>
              <span className="text-lg font-bold text-[#FCFAF4] tracking-tight">
                AI &amp; Automation Engineering
              </span>
            </div>
            <p className="text-sm text-[#FCFAF4]/70 leading-relaxed max-w-sm">
              We engineer scalable RAG chatbots, multi-tenant conversational platforms, NLP summarizers, and automated web bots.
            </p>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#FCFAF4] uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-[#FCFAF4]/70">
              <li>
                <Link000
                  href="#projects"
                  className="inline-flex items-center gap-2 hover:text-[#f0a3b3] transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-[#800020]" />
                  <span>Featured AI Projects</span>
                </Link000>
              </li>
              <li>
                <Link000
                  href="#about"
                  className="inline-flex items-center gap-2 hover:text-[#f0a3b3] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#800020]" />
                  <span>About Our Work</span>
                </Link000>
              </li>
              <li>
                <Link000
                  href="#skills"
                  className="inline-flex items-center gap-2 hover:text-[#f0a3b3] transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#800020]" />
                  <span>AI Tech Stack</span>
                </Link000>
              </li>
              <li>
                <Link000
                  href="#contact"
                  className="inline-flex items-center gap-2 hover:text-[#f0a3b3] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#800020]" />
                  <span>Get in Touch</span>
                </Link000>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Tech Stack */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#FCFAF4] uppercase tracking-wider">
              AI Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "FastAPI", "LangChain", "RAG Embeddings", "Multi-Tenancy", "Hugging Face", "Google gTTS", "Playwright", "Docker"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-white/5 border border-white/10 text-[#FCFAF4]/80"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Col 5: System Status */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#FCFAF4] uppercase tracking-wider">
              System Status
            </h3>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[#FCFAF4] font-medium">All AI Services Active</span>
              </div>
              <p className="text-[#FCFAF4]/60 text-[11px] leading-relaxed">
                Containerized Python &amp; Next.js microservices running with zero downtime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FCFAF4]/60">
          <p>
            &copy; {currentYear} AI &amp; Automation Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="inline-flex items-center gap-1 hover:text-[#FCFAF4] transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3 text-[#800020]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
