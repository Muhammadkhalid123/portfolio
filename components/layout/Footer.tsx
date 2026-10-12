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
    <footer className="relative border-t border-white/10 bg-[#0F0F0F] bg-editor-canvas-dark pt-16 pb-12 overflow-hidden text-[#FAFAFA]">
      {/* Ambient background electric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-gradient-to-b from-[#00FFD0]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0F0F0F] border border-[#00FFD0]/40 flex items-center justify-center font-mono font-bold text-xs text-[#00FFD0] shadow-[0_0_15px_rgba(0,255,208,0.25)]">
                AI
              </div>
              <span className="text-lg font-bold text-[#FAFAFA] tracking-tight">
                AI &amp; Automation Engineering
              </span>
            </div>
            <p className="text-sm text-[#808080] leading-relaxed max-w-sm">
              We engineer scalable RAG chatbots, multi-tenant conversational platforms, NLP summarizers, and automated web bots.
            </p>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#FAFAFA] uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-[#808080]">
              <li>
                <Link000
                  href="#projects"
                  className="inline-flex items-center gap-2 hover:text-[#00FFD0] transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-[#00FFD0]" />
                  <span>Featured AI Projects</span>
                </Link000>
              </li>
              <li>
                <Link000
                  href="#about"
                  className="inline-flex items-center gap-2 hover:text-[#00FFD0] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00FFD0]" />
                  <span>About Our Work</span>
                </Link000>
              </li>
              <li>
                <Link000
                  href="#skills"
                  className="inline-flex items-center gap-2 hover:text-[#00FFD0] transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#00FFD0]" />
                  <span>AI Tech Stack</span>
                </Link000>
              </li>
              <li>
                <Link000
                  href="#contact"
                  className="inline-flex items-center gap-2 hover:text-[#00FFD0] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#00FFD0]" />
                  <span>Get in Touch</span>
                </Link000>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Tech Stack */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#FAFAFA] uppercase tracking-wider">
              AI Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "FastAPI", "LangChain", "RAG Embeddings", "Multi-Tenancy", "Hugging Face", "Google gTTS", "Playwright", "Docker"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-white/5 border border-white/10 text-[#FAFAFA]/80 hover:border-[#00FFD0]/40 transition-colors"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Col 5: System Status */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#FAFAFA] uppercase tracking-wider">
              System Status
            </h3>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FFD0] animate-pulse" />
                <span className="text-[#FAFAFA] font-medium">All AI Services Active</span>
              </div>
              <p className="text-[#808080] text-[11px] leading-relaxed">
                Containerized Python &amp; Next.js microservices running with zero downtime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#808080]">
          <p>
            &copy; {currentYear} AI &amp; Automation Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="inline-flex items-center gap-1 hover:text-[#00FFD0] transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3 text-[#00FFD0]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
