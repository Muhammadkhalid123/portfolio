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
    sm: "px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-wider rounded-full",
    md: "px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider rounded-full",
  };

  // High-end Tokyo/Berlin studio pill badge styling
  const variantClasses = {
    default: "bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-800",
    liquid: "bg-white/80 dark:bg-black/60 backdrop-blur-md text-[var(--ink)] border border-black/10 dark:border-white/10 shadow-sm",
    dev: "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800",
    ai: "bg-[#111211] text-white dark:bg-white dark:text-[#111211] border border-transparent shadow-sm",
    devops: "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800",
    personal: "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-medium",
    outline: "border border-[var(--rule)] text-neutral-600 dark:text-neutral-400 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center transition-all duration-200",
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
