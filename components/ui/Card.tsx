import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered" | "glow-dev" | "glow-ai" | "glow-personal" | "liquid" | "liquid-dev" | "liquid-ai" | "liquid-personal";
  children: React.ReactNode;
}

export function Card({
  className,
  variant = "liquid",
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    default: "bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-xl",
    glass: "liquid-glass",
    liquid: "liquid-glass",
    "liquid-dev": "liquid-glass-dev",
    "liquid-ai": "liquid-glass-ai",
    "liquid-personal": "liquid-glass-personal",
    bordered: "bg-transparent border border-white/10 hover:border-white/20",
    "glow-dev": "liquid-glass-dev",
    "glow-ai": "liquid-glass-ai",
    "glow-personal": "liquid-glass-personal",
  };

  return (
    <div
      className={cn(
        "rounded-3xl p-6 sm:p-8 transition-all duration-300",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
