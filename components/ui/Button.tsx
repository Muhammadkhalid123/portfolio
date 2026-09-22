import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan" | "purple" | "amber";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, external, children, disabled, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5",
      md: "px-4 py-2 text-sm font-medium rounded-xl gap-2",
      lg: "px-6 py-3 text-base font-semibold rounded-xl gap-2.5",
    };

    const variantClasses = {
      primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 active:scale-[0.98]",
      secondary: "bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 hover:border-slate-600 active:scale-[0.98]",
      outline: "border border-slate-700 hover:border-slate-500 bg-transparent text-slate-200 hover:bg-slate-800/50 active:scale-[0.98]",
      ghost: "text-slate-300 hover:text-white hover:bg-slate-800/50",
      cyan: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]",
      purple: "bg-gradient-to-r from-purple-500 via-fuchsia-600 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/25 active:scale-[0.98]",
      amber: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 active:scale-[0.98]",
    };

    const baseClass = cn(
      "inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
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
      <button ref={ref} className={baseClass} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
