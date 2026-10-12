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
  gradientClass = "from-[#0F0F0F] via-[#333333] to-[#0F0F0F]",
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
        <Badge variant={badgeVariant} className="mb-4 text-[10px] font-semibold uppercase tracking-wider">
          {badge}
        </Badge>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-[-0.035em] text-[#0F0F0F] mb-4 leading-[1.15]">
        {title}{" "}
        {highlightedTitle && (
          <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", gradientClass)}>
            {highlightedTitle}
          </span>
        )}
      </h2>
      {description && (
        <p className="max-w-2xl text-[16px] sm:text-[18px] text-[#808080] font-normal leading-relaxed tracking-[-0.01em]">
          {description}
        </p>
      )}
    </div>
  );
}
