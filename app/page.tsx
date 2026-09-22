import React from "react";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { generatePersonaMetadata } from "@/lib/theme";

export const metadata = generatePersonaMetadata("ai");

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF4] text-[#010101] relative">
      <LiquidBackground persona="ai" />
      <main className="flex-1 relative z-10">
        <Hero persona="ai" />
        <About persona="ai" />
        <SkillsGrid persona="ai" />
        <ProjectsGrid persona="ai" />
        <ContactForm persona="ai" />
      </main>
      <Footer persona="ai" />
    </div>
  );
}
