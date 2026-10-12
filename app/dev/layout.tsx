import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LiquidBackground } from "@/components/ui/LiquidBackground";

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#0F0F0F] relative">
      <LiquidBackground persona="dev" />
      <Header persona="dev" />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer persona="dev" />
    </div>
  );
}
