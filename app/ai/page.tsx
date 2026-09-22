import React from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { generatePersonaMetadata } from "@/lib/theme";

export const metadata = generatePersonaMetadata("ai");

export default function AiPortfolioPage() {
  return (
    <>
      <Hero persona="ai" />
      <About persona="ai" />
      <SkillsGrid persona="ai" />
      <ProjectsGrid persona="ai" />
      <ContactForm persona="ai" />
    </>
  );
}
