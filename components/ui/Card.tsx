import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered" | "glow-dev" | "glow-ai" | "glow-personal" | "liquid" | "liquid-dev" | "liquid-ai" | "liquid-personal";
  children: React.ReactNode;
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    default: "bg-white/80 dark:bg-[#121312]/80 border border-neutral-200/90 dark:border-white/10 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-1 backdrop-blur-md",
    glass: "bg-white/60 dark:bg-black/50 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-1",
    liquid: "bg-white/70 dark:bg-[#141514]/70 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-1",
    "liquid-dev": "bg-white/70 dark:bg-[#141514]/70 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-1",
    "liquid-ai": "bg-white/70 dark:bg-[#141514]/70 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-1",
    "liquid-personal": "bg-white/70 dark:bg-[#141514]/70 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-1",
    bordered: "bg-transparent border border-neutral-200 dark:border-neutral-800 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-0.5",
    "glow-dev": "bg-white/80 dark:bg-[#121312]/80 border border-neutral-200/90 dark:border-white/10 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-1",
    "glow-ai": "bg-white/80 dark:bg-[#121312]/80 border border-neutral-200/90 dark:border-white/10 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-1",
    "glow-personal": "bg-white/80 dark:bg-[#121312]/80 border border-neutral-200/90 dark:border-white/10 text-[var(--ink)] shadow-3d hover:shadow-3d-hover hover:-translate-y-1",
  };

  return (
    <div
      className={cn(
        "rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 ease-out",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
