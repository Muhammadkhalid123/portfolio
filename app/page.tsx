import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { DeploymentStack } from "@/components/sections/DeploymentStack";
import { Timeline } from "@/components/sections/Timeline";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { generatePersonaMetadata } from "@/lib/theme";

export const metadata = generatePersonaMetadata("personal");

export default function PersonalPortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#090a0f] text-slate-100">
      <Header persona="personal" />
      <main className="flex-1">
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
