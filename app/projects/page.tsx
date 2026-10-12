import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { ProjectsArchive } from "@/components/sections/ProjectsArchive";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "All Projects & Systems Architecture | Muhammad Khalid",
  description:
    "Comprehensive archive of production AI systems, RAG chatbots, multi-tenant conversational platforms, full-stack applications, and automated CI/CD DevOps infrastructure.",
  openGraph: {
    title: "All Projects & Architecture Archive | Muhammad Khalid",
    description:
      "Explore production RAG chatbots, multi-tenant conversational platforms, document summarizers, and automated bots engineered by Muhammad Khalid.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] dark:bg-[#0F0F0F] text-[#0F0F0F] dark:text-[#FAFAFA] relative">
      <LiquidBackground persona="personal" />
      <Header persona="personal" />
      <main className="flex-1 relative z-10">
        <ProjectsArchive initialProjects={projects} />
      </main>
      <Footer persona="personal" />
    </div>
  );
}
