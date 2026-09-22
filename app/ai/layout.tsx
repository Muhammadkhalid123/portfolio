import React from "react";
import { Footer } from "@/components/layout/Footer";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

export default function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF4] text-[#010101] relative">
      <LiquidBackground persona="ai" />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer persona="ai" />
    </div>
  );
}
