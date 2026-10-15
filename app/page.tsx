import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { RecedeSection } from "@/components/ui/RecedeSection";
import { StatementTimeline } from "@/components/sections/StatementTimeline";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { StackRows } from "@/components/sections/StackRows";
import { Pipeline } from "@/components/sections/Pipeline";
import { ScrollQuote } from "@/components/sections/ScrollQuote";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#181918] overflow-x-clip text-[var(--ink)] flex flex-col">
      {/* Global Navigation - Outside any transformed element */}
      <Header />

      {/* 01 // Hero */}
      <RecedeSection>
        <Hero />
      </RecedeSection>

      {/* 02 // Architectural Manifesto & Timeline (Text-heavy: gentle maxRotate 10) */}
      <RecedeSection maxRotate={10}>
        <StatementTimeline />
      </RecedeSection>

      {/* 03 // Selected Production Works & Case Studies Archive */}
      <RecedeSection>
        <WorkIndex />
      </RecedeSection>

      {/* 04 // Architectural Stack Matrix & Capabilities (Mixed: maxRotate 12) */}
      <RecedeSection maxRotate={12}>
        <StackRows />
      </RecedeSection>

      {/* 05 // CI/CD Infrastructure Pipeline Terminal (Mixed: maxRotate 12) */}
      <RecedeSection maxRotate={12}>
        <Pipeline />
      </RecedeSection>

      {/* 06 // Engineering Manifesto & Principles (Text-heavy: gentle maxRotate 10) */}
      <RecedeSection maxRotate={10}>
        <ScrollQuote />
      </RecedeSection>

      {/* 07 // Direct Collaboration & Commission Dispatch (Except last section: Contact) */}
      <ContactSection />

      {/* 08 // Colophon & Footer Navigation */}
      <Footer />
    </main>
  );
}
