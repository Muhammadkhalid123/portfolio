"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Terminal, Sparkles, UserCheck } from "lucide-react";

export function PersonaSwitcher({ currentPersona }: { currentPersona?: "personal" | "dev" | "ai" }) {
  const pathname = usePathname();

  const activeKey: "personal" | "dev" | "ai" =
    currentPersona ||
    (pathname?.startsWith("/dev")
      ? "dev"
      : pathname?.startsWith("/ai")
      ? "ai"
      : "personal");

  const switcherItems = [
    {
      key: "personal" as const,
      route: "/",
      label: "Personal",
      shortLabel: "Overview",
      icon: UserCheck,
      activeClass: "bg-[#800020] text-[#FCFAF4] shadow-[0_4px_20px_rgba(128,0,32,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] border-[#f0a3b3]/50",
      dotColor: "bg-[#FCFAF4]",
    },
    {
      key: "dev" as const,
      route: "/dev",
      label: "Dev & DevOps",
      shortLabel: "DevOps",
      icon: Terminal,
      activeClass: "bg-[#800020] text-[#FCFAF4] shadow-[0_4px_20px_rgba(128,0,32,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] border-[#f0a3b3]/50",
      dotColor: "bg-[#FCFAF4]",
    },
    {
      key: "ai" as const,
      route: "/ai",
      label: "AI Engineer",
      shortLabel: "AI / RAG",
      icon: Sparkles,
      activeClass: "bg-[#800020] text-[#FCFAF4] shadow-[0_4px_20px_rgba(128,0,32,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] border-[#f0a3b3]/50",
      dotColor: "bg-[#FCFAF4]",
    },
  ];

  return (
    <div className="inline-flex items-center p-1.5 rounded-full liquid-glass-pill backdrop-blur-2xl">
      <span className="hidden xl:inline-block px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        Track:
      </span>
      <div className="flex items-center gap-1.5">
        {switcherItems.map((item) => {
          const isActive = activeKey === item.key;
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              href={item.route}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300",
                isActive
                  ? cn("border backdrop-blur-md", item.activeClass)
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200")} />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.shortLabel}</span>
              {isActive && (
                <span className={cn("w-1.5 h-1.5 rounded-full animate-ping inline-block", item.dotColor)} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
