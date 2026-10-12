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
    sm: "px-2.5 py-0.5 text-[10px] font-semibold tracking-wide",
    md: "px-3 py-1 text-[13px] font-semibold tracking-wide",
  };

  const variantClasses = {
    default: "bg-[#0F0F0F] text-[#FAFAFA] border border-white/10 backdrop-blur-md shadow-sm",
    liquid: "butter-pill text-[#0F0F0F]",
    dev: "bg-[#0F0F0F] text-[#00FFD0] border border-[#00FFD0]/40 backdrop-blur-md shadow-[0_2px_10px_rgba(0,255,208,0.12)] font-semibold",
    ai: "bg-[#0F0F0F] text-[#00FFD0] border border-[#00FFD0]/40 backdrop-blur-md shadow-[0_2px_10px_rgba(0,255,208,0.12)] font-semibold",
    devops: "bg-[#0F0F0F] text-[#FAFAFA] border border-[#00FFD0]/40 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.2)] font-semibold",
    personal: "bg-[#0F0F0F] text-[#00FFD0] border border-[#00FFD0]/40 backdrop-blur-md shadow-[0_2px_10px_rgba(0,255,208,0.15)] font-semibold",
    success: "bg-[#00FFD0]/15 text-[#009b7d] border border-[#00FFD0]/40 backdrop-blur-md font-semibold",
    outline: "border border-[#0F0F0F]/20 text-[#0F0F0F] bg-white/60 backdrop-blur-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full transition-all duration-200",
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
