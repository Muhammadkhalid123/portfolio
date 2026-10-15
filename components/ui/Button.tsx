import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan" | "purple" | "amber" | "liquid-glass";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, external, children, disabled, ...props }, ref) => {
    // High-End Studio sizing with refined geometry
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs font-mono font-medium tracking-wider uppercase gap-1.5 rounded-full",
      md: "px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-sans font-semibold tracking-tight gap-2 rounded-full",
      lg: "px-6 py-3 text-sm sm:text-base font-sans font-bold tracking-tight gap-2.5 rounded-full",
    };

    // Architectural Tokyo/Berlin Studio button variants
    const variantClasses = {
      primary: "bg-[#111211] text-white dark:bg-white dark:text-[#111211] hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm active:scale-[0.98] transition-all",
      secondary: "bg-neutral-100 dark:bg-neutral-900 text-[var(--ink)] border border-[var(--rule)] hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 active:scale-[0.98] transition-all",
      outline: "bg-transparent text-[var(--ink)] border border-[var(--rule)] hover:bg-[var(--ink)]/5 active:scale-[0.98] transition-all",
      ghost: "text-[var(--ink)] hover:bg-[var(--ink)]/5 active:scale-[0.98] transition-all",
      "liquid-glass": "bg-white/80 dark:bg-black/60 backdrop-blur-md border border-black/10 dark:border-white/10 text-[var(--ink)] hover:bg-white dark:hover:bg-black/80 shadow-sm active:scale-[0.98] transition-all",
      cyan: "bg-[#111211] text-white hover:bg-neutral-800 active:scale-[0.98] transition-all",
      purple: "bg-[#111211] text-white hover:bg-neutral-800 active:scale-[0.98] transition-all",
      amber: "bg-neutral-100 dark:bg-neutral-900 text-[var(--ink)] border border-[var(--rule)] hover:bg-neutral-200 active:scale-[0.98] transition-all",
    };

    const baseClass = cn(
      "inline-flex items-center justify-center transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClass}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} disabled={disabled} className={baseClass} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
