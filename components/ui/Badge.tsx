import React from "react";
import { cn } from "@/lib/utils";
import { PersonaTag } from "@/content/projects";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "dev" | "ai" | "devops" | "personal" | "success" | "outline";
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
    sm: "px-2 py-0.5 text-[11px] font-medium tracking-wide",
    md: "px-2.5 py-1 text-xs font-medium tracking-wide",
  };

  const variantClasses = {
    default: "bg-slate-800/90 text-slate-300 border border-slate-700/80",
    dev: "bg-cyan-950/60 text-cyan-300 border border-cyan-500/30",
    ai: "bg-purple-950/60 text-purple-300 border border-purple-500/30",
    devops: "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30",
    personal: "bg-indigo-950/60 text-indigo-300 border border-indigo-500/30",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    outline: "border border-slate-700 text-slate-400 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full transition-colors",
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
