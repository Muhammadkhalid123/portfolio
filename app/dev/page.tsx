import React from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { DeploymentStack } from "@/components/sections/DeploymentStack";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { generatePersonaMetadata } from "@/lib/theme";

export const metadata = generatePersonaMetadata("dev");

export default function DevPortfolioPage() {
  return (
    <>
      <Hero persona="dev" />
      <About persona="dev" />
      <DeploymentStack persona="dev" />
      <SkillsGrid persona="dev" />
      <ProjectsGrid persona="dev" />
      <ContactForm persona="dev" />
    </>
  );
}
