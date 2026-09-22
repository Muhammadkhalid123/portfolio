import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "default" | "dev" | "ai" | "devops" | "personal";
  title: string;
  highlightedTitle?: string;
  gradientClass?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "default",
  title,
  highlightedTitle,
  gradientClass = "from-indigo-400 to-purple-400",
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignment = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col mb-12 sm:mb-16", alignment[align], className)}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-4 text-xs font-semibold uppercase tracking-wider">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title}{" "}
        {highlightedTitle && (
          <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", gradientClass)}>
            {highlightedTitle}
          </span>
        )}
      </h2>
      {description && (
        <p className="max-w-2xl text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
