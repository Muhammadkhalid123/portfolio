import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { StatementTimeline } from "@/components/sections/StatementTimeline";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { StackRows } from "@/components/sections/StackRows";
import { Pipeline } from "@/components/sections/Pipeline";
import { ScrollQuote } from "@/components/sections/ScrollQuote";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] flex flex-col">
      <Header />
      <Hero />
      <StatementTimeline />
      <WorkIndex />
      <StackRows />
      <Pipeline />
      <ScrollQuote />
      <ContactSection />
      <Footer />
    </main>
  );
}
