"use client";

import React from "react";

export interface ClarityDesignBadgeProps {
  label: string;
  iconName?: string;
  status?: "info" | "success" | "warning";
}

export function ClarityDesignBadge({ label, status = "info" }: ClarityDesignBadgeProps) {
  const statusClasses = {
    info: "bg-[#0F0F0F] text-[#00FFD0] border-[#00FFD0]/40 shadow-[0_0_12px_rgba(0,255,208,0.2)]",
    success: "bg-[#00FFD0]/15 text-[#009b7d] border-[#00FFD0]/30",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  };

  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold border backdrop-blur-md transition-all">
      <span className={statusClasses[status] ? "" : ""}>{label}</span>
    </div>
  );
}
