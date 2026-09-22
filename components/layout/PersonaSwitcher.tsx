"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { personas } from "@/content/personas";
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
      activeClass: "bg-indigo-600/90 text-white shadow-md shadow-indigo-500/20 border-indigo-400/40",
      dotColor: "bg-amber-400",
    },
    {
      key: "dev" as const,
      route: "/dev",
      label: "Dev & DevOps",
      shortLabel: "DevOps",
      icon: Terminal,
      activeClass: "bg-cyan-600/90 text-white shadow-md shadow-cyan-500/20 border-cyan-400/40",
      dotColor: "bg-cyan-400",
    },
    {
      key: "ai" as const,
      route: "/ai",
      label: "AI Engineer",
      shortLabel: "AI / RAG",
      icon: Sparkles,
      activeClass: "bg-purple-600/90 text-white shadow-md shadow-purple-500/20 border-purple-400/40",
      dotColor: "bg-fuchsia-400",
    },
  ];

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-slate-900/85 border border-slate-700/70 backdrop-blur-md shadow-inner">
      <span className="hidden xl:inline-block px-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        Persona:
      </span>
      <div className="flex items-center gap-1">
        {switcherItems.map((item) => {
          const isActive = activeKey === item.key;
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              href={item.route}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-full transition-all duration-200",
                isActive
                  ? cn("border", item.activeClass)
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
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
