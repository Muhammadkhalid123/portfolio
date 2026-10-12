"use client";

import { playTick } from "@/lib/sound";

export interface FooterProps {
  persona?: string;
}

export function Footer({ persona }: FooterProps = {}) {
  const scrollToTop = () => {
    playTick(1800, 0.02);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 md:py-16 bg-[var(--paper)] text-[var(--ink)] mono text-[13px] border-t border-[var(--rule)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-8">
        
        {/* Main Footer Row: AI Stack, Nav Links, Live Status */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: AI Stack List */}
          <div className="md:col-span-5 space-y-1">
            <div className="text-[var(--muted)] uppercase text-[11px] tracking-wider">
              Core Tech Stack
            </div>
            <p className="text-[var(--ink)]">
              RAG · LangChain · FastAPI · Python · Next.js · TypeScript · Docker · AWS EC2
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-4 space-y-1">
            <div className="text-[var(--muted)] uppercase text-[11px] tracking-wider">
              Index
            </div>
            <div className="flex flex-wrap gap-4 text-[var(--ink)]">
              <a href="#work" onClick={() => playTick(1500)} className="hover:opacity-60 transition-opacity">
                Work
              </a>
              <a href="#pipeline" onClick={() => playTick(1500)} className="hover:opacity-60 transition-opacity">
                Pipeline
              </a>
              <a href="#contact" onClick={() => playTick(1500)} className="hover:opacity-60 transition-opacity">
                Contact
              </a>
              <a href="https://github.com/Muhammadkhalid123" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Col 3: Real Status */}
          <div className="md:col-span-3 space-y-1 md:text-right">
            <div className="text-[var(--muted)] uppercase text-[11px] tracking-wider">
              System Telemetry
            </div>
            <div className="flex items-center md:justify-end gap-2 text-[var(--ink)]">
              <span className="w-2 h-2 rounded-none bg-[var(--ink)]" aria-hidden="true" />
              <span>All AI services active</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-[var(--rule)] flex items-center justify-between text-[12px] text-[var(--muted)]">
          <span>&copy; {new Date().getFullYear()} Muhammad Khalid. All rights reserved.</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-[var(--ink)] hover:opacity-60 transition-opacity cursor-pointer uppercase tracking-wider"
          >
            [Back to top ↑]
          </button>
        </div>

      </div>
    </footer>
  );
}
