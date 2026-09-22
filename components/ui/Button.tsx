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
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs font-semibold rounded-xl gap-1.5",
      md: "px-4.5 py-2.5 text-sm font-semibold rounded-2xl gap-2",
      lg: "px-6 py-3 text-sm sm:text-base font-bold rounded-2xl gap-2.5",
    };

    const variantClasses = {
      primary: "bg-[#800020] hover:bg-[#6d0a20] text-[#FCFAF4] border border-[#800020] shadow-[0_8px_25px_rgba(128,0,32,0.45)] active:scale-[0.98] font-bold",
      secondary: "bg-[#010101] text-[#FCFAF4] hover:bg-[#800020] hover:text-[#FCFAF4] border border-[#010101] shadow-[0_4px_20px_rgba(1,1,1,0.25)] active:scale-[0.98] font-bold",
      "liquid-glass": "liquid-glass text-[#FCFAF4] hover:text-white active:scale-[0.98]",
      outline: "border-2 border-[#010101] hover:border-[#800020] bg-transparent text-[#010101] hover:bg-[#800020] hover:text-[#FCFAF4] backdrop-blur-md active:scale-[0.98] font-bold",
      ghost: "text-[#010101] hover:text-[#800020] hover:bg-[#800020]/10 font-bold",
      cyan: "bg-[#800020] hover:bg-[#6d0a20] text-[#FCFAF4] border border-[#800020] shadow-[0_8px_25px_rgba(128,0,32,0.45)] active:scale-[0.98] font-bold",
      purple: "bg-[#800020] hover:bg-[#6d0a20] text-[#FCFAF4] border border-[#800020] shadow-[0_8px_25px_rgba(128,0,32,0.45)] active:scale-[0.98] font-bold",
      amber: "bg-[#010101] hover:bg-[#800020] text-[#FCFAF4] border border-[#010101] shadow-[0_8px_25px_rgba(128,0,32,0.45)] active:scale-[0.98] font-bold",
    };

    const baseClass = cn(
      "inline-flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
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
