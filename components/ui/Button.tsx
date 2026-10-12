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
      md: "px-5 py-2.5 text-sm font-semibold rounded-2xl gap-2",
      lg: "px-6 py-3.5 text-sm sm:text-base font-bold rounded-2xl gap-2.5",
    };

    const variantClasses = {
      primary: "bg-[#00FFD0] hover:bg-[#33FFDA] text-[#0F0F0F] border border-[#00FFD0] shadow-[0_4px_20px_rgba(0,255,208,0.35)] hover:shadow-[0_6px_25px_rgba(0,255,208,0.5)] active:scale-[0.98] font-bold",
      secondary: "bg-[#0F0F0F] text-[#FAFAFA] hover:bg-[#181818] hover:text-[#00FFD0] border border-[#0F0F0F] hover:border-[#00FFD0]/60 shadow-[0_4px_20px_rgba(15,15,15,0.25)] active:scale-[0.98] font-bold",
      "liquid-glass": "liquid-glass text-[#FAFAFA] hover:text-[#00FFD0] border-white/10 hover:border-[#00FFD0]/50 active:scale-[0.98]",
      outline: "border-2 border-[#0F0F0F] hover:border-[#00FFD0] bg-transparent text-[#0F0F0F] hover:bg-[#00FFD0] hover:text-[#0F0F0F] backdrop-blur-md active:scale-[0.98] font-bold",
      ghost: "text-[#0F0F0F] hover:text-[#0F0F0F] hover:bg-[#00FFD0]/15 font-bold",
      cyan: "bg-[#00FFD0] hover:bg-[#33FFDA] text-[#0F0F0F] border border-[#00FFD0] shadow-[0_4px_20px_rgba(0,255,208,0.35)] active:scale-[0.98] font-bold",
      purple: "bg-[#00FFD0] hover:bg-[#33FFDA] text-[#0F0F0F] border border-[#00FFD0] shadow-[0_4px_20px_rgba(0,255,208,0.35)] active:scale-[0.98] font-bold",
      amber: "bg-[#0F0F0F] hover:bg-[#181818] text-[#FAFAFA] hover:text-[#00FFD0] border border-[#0F0F0F] hover:border-[#00FFD0]/60 shadow-[0_4px_20px_rgba(15,15,15,0.25)] active:scale-[0.98] font-bold",
    };

    const baseClass = cn(
      "magnetic-hover inline-flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(0.2,0.715,0.205,0.99)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFD0] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
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
