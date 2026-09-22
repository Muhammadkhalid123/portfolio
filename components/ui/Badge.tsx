import React from "react";
import { cn } from "@/lib/utils";
import { PersonaTag } from "@/content/projects";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "dev" | "ai" | "devops" | "personal" | "success" | "outline" | "liquid";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
    md: "px-3 py-1 text-xs font-semibold tracking-wide",
  };

  const variantClasses = {
    default: "bg-[#010101]/80 text-[#FCFAF4] border border-[#010101]/20 backdrop-blur-md shadow-sm",
    liquid: "liquid-glass-pill text-[#FCFAF4]",
    dev: "bg-[#800020]/15 text-[#800020] border border-[#800020]/40 backdrop-blur-md shadow-[0_2px_10px_rgba(128,0,32,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] font-semibold",
    ai: "bg-[#800020]/15 text-[#800020] border border-[#800020]/40 backdrop-blur-md shadow-[0_2px_10px_rgba(128,0,32,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] font-semibold",
    devops: "bg-[#010101] text-[#FCFAF4] border border-[#800020]/40 backdrop-blur-md shadow-[0_2px_10px_rgba(1,1,1,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] font-semibold",
    personal: "bg-[#800020] text-[#FCFAF4] border border-[#f0a3b3]/40 backdrop-blur-md shadow-[0_2px_10px_rgba(128,0,32,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] font-semibold",
    success: "bg-emerald-600/15 text-emerald-800 border border-emerald-500/30 backdrop-blur-md",
    outline: "border border-[#010101]/30 text-[#010101] bg-white/40 backdrop-blur-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full transition-all",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function PersonaTagBadge({ tag }: { tag: PersonaTag }) {
  const labels: Record<PersonaTag, { label: string; variant: "dev" | "ai" | "devops" }> = {
    dev: { label: "Dev", variant: "dev" },
    ai: { label: "AI & ML", variant: "ai" },
    devops: { label: "DevOps & Cloud", variant: "devops" },
  };

  const config = labels[tag] || { label: tag, variant: "default" };

  return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
}
