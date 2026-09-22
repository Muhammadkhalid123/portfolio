import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered" | "glow-dev" | "glow-ai" | "glow-personal";
  children: React.ReactNode;
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    default: "bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-xl",
    glass: "bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl",
    bordered: "bg-transparent border border-slate-800 hover:border-slate-700",
    "glow-dev": "bg-[#0c1424]/90 border border-cyan-900/60 hover:border-cyan-500/50 shadow-[0_4px_24px_-8px_rgba(6,182,212,0.15)]",
    "glow-ai": "bg-[#140e26]/90 border border-purple-900/60 hover:border-purple-500/50 shadow-[0_4px_24px_-8px_rgba(168,85,247,0.15)]",
    "glow-personal": "bg-[#11131c]/90 border border-indigo-950/70 hover:border-indigo-500/40 shadow-[0_4px_24px_-8px_rgba(99,102,241,0.15)]",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
