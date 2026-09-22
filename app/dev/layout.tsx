import React from "react";
import { Footer } from "@/components/layout/Footer";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF4] text-[#010101] relative">
      <LiquidBackground persona="dev" />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer persona="dev" />
    </div>
  );
}
