import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { Timeline } from "@/components/sections/Timeline";
import { DeploymentStack } from "@/components/sections/DeploymentStack";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { generatePersonaMetadata } from "@/lib/theme";

export const metadata = generatePersonaMetadata("personal");

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#0F0F0F] relative">
      <LiquidBackground persona="personal" />
      <Header persona="personal" />
      <main className="flex-1 relative z-10">
        <Hero persona="personal" />
        <About persona="personal" />
        <SkillsGrid persona="personal" />
        <DeploymentStack persona="personal" />
        <Timeline />
        <ProjectsGrid persona="personal" />
        <ContactForm persona="personal" />
      </main>
      <Footer persona="personal" />
    </div>
  );
}
