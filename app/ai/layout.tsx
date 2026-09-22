import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0817] text-slate-100">
      <Header persona="ai" />
      <main className="flex-1">{children}</main>
      <Footer persona="ai" />
    </div>
  );
}
