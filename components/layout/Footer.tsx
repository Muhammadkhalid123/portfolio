"use client";

import { playTick } from "@/lib/sound";
import { useSmoothScroll } from "@/components/ui/SmoothScrollProvider";
import { ArrowUp, Terminal } from "lucide-react";

export interface FooterProps {
  persona?: string;
}

export function Footer({ persona }: FooterProps = {}) {
  const { scrollTo } = useSmoothScroll();

  const scrollToTop = () => {
    playTick(1800, 0.02);
    scrollTo(0, { duration: 1.2 });
  };

  return (
    <footer className="w-full py-16 sm:py-20 bg-[var(--paper)] text-[var(--ink)] font-mono text-xs border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-12">

        {/* Main Footer Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Col 1: Brand & Core Architecture Stack */}
          <div className="md:col-span-5 space-y-2.5">
            <div className="flex items-center gap-2 text-neutral-400 uppercase tracking-widest font-medium text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>COLOPHON // CORE ARCHITECTURE</span>
            </div>
            <p className="text-neutral-900 dark:text-neutral-100 font-semibold text-sm leading-relaxed font-sans">
              RAG Retrieval · LangChain · FastAPI · Python · Next.js 14 · TypeScript · PostgreSQL · Docker · AWS EC2
            </p>
            <p className="text-neutral-500 text-xs font-normal">
              Engineered with Tokyo/Berlin architectural discipline and high-fidelity studio aesthetics. Zero mocks.
            </p>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-neutral-400 uppercase tracking-widest font-medium text-[11px]">
              INDEX NAVIGATION
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "WORK", href: "#work" },
                { label: "STATEMENT", href: "#statement" },
                { label: "STACK", href: "#stack" },
                { label: "PIPELINE", href: "#pipeline" },
                { label: "CONTACT", href: "#contact" },
                { label: "GITHUB ↗", href: "https://github.com/Muhammadkhalid123", external: true },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => playTick(1500)}
                  className="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium uppercase transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Live System Telemetry */}
          <div className="md:col-span-3 space-y-2 md:text-right">
            <div className="text-neutral-400 uppercase tracking-widest font-medium text-[11px]">
              SYSTEM TELEMETRY
            </div>
            <div className="flex items-center md:justify-end gap-2 text-neutral-900 dark:text-neutral-100 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" aria-hidden="true" />
              <span>ALL SERVICES ACTIVE (100%)</span>
            </div>
            <p className="text-neutral-500 text-[11px]">
              LATENCY: 240ms · STATUS: HEALTHY
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-xs">
          <div>
            &copy; {new Date().getFullYear()} MUHAMMAD KHALID. ALL RIGHTS RESERVED.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium text-xs shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
