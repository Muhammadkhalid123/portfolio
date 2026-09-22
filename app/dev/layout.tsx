import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#080d1a] text-slate-100">
      <Header persona="dev" />
      <main className="flex-1">{children}</main>
      <Footer persona="dev" />
    </div>
  );
}
