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
  gradientClass = "from-[#800020] via-[#b92144] to-[#800020]",
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
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.035em] text-[#010101] mb-4 leading-[1.15]">
        {title}{" "}
        {highlightedTitle && (
          <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", gradientClass)}>
            {highlightedTitle}
          </span>
        )}
      </h2>
      {description && (
        <p className="max-w-2xl text-base sm:text-lg text-[#010101]/80 font-normal leading-relaxed tracking-[-0.01em]">
          {description}
        </p>
      )}
    </div>
  );
}
