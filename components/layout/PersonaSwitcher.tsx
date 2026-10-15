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
      activeClass: "bg-[#0F0F0F] text-[#FAFAFA] shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] border-[#00FFD0]/70",
      dotColor: "bg-[#00FFD0]",
    },
    {
      key: "dev" as const,
      route: "/dev",
      label: "Dev & DevOps",
      shortLabel: "DevOps",
      icon: Terminal,
      activeClass: "bg-[#0F0F0F] text-[#FAFAFA] shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] border-[#00FFD0]/70",
      dotColor: "bg-[#00FFD0]",
    },
    {
      key: "ai" as const,
      route: "/ai",
      label: "AI Engineer",
      shortLabel: "AI / RAG",
      icon: Sparkles,
      activeClass: "bg-[#0F0F0F] text-[#FAFAFA] shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] border-[#00FFD0]/70",
      dotColor: "bg-[#00FFD0]",
    },
  ];

  return (
    <div className="inline-flex items-center p-1.5 rounded-full butter-pill backdrop-blur-2xl">
      <span className="hidden xl:inline-block px-3 text-[11px] font-semibold text-[#808080] uppercase tracking-wider">
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
                "group relative inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200",
                isActive
                  ? cn("border backdrop-blur-md", item.activeClass)
                  : "text-[#808080] hover:text-[#0F0F0F] hover:bg-[#0F0F0F]/5 border border-transparent"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-[#00FFD0]" : "text-[#808080] group-hover:text-[#0F0F0F]")} />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.shortLabel}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
