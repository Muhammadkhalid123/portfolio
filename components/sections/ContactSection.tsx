"use client";

import { useState } from "react";
import { playTick } from "@/lib/sound";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Contract / Project Inquiry",
    message: "",
  });

  const emailAddress = "khalid@khalid.dev";

  const handleCopyEmail = async () => {
    playTick(2000, 0.02);
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTick(2200, 0.03);
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => {
        setFormStatus("idle");
        setFormData({ name: "", email: "", subject: "Contract / Project Inquiry", message: "" });
      }, 4000);
    }, 800);
  };

  return (
    <section id="contact" className="w-full py-20 md:py-32 border-b border-[var(--rule)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Giant Stacked 4 Words CTA: Let's / Build / Something / Together */}
        <div className="mb-16 md:mb-24 select-none">
          <div className="mono text-[12px] text-[var(--muted)] mb-6 uppercase tracking-wider">
            // GET IN TOUCH
          </div>
          <h2
            className="display text-[54px] sm:text-[76px] md:text-[96px] lg:text-[112px] leading-[0.95] tracking-tight font-bold text-[var(--ink)]"
            aria-label="Let's Build Something Together"
          >
            <span className="block">Let&apos;s</span>
            <span className="block">Build</span>
            <span className="block">Something</span>
            <span className="block">Together</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Underline-Only Form & Rectangle Button */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block mono text-[12px] text-[var(--muted)] uppercase">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full bg-transparent border-b border-[var(--rule)] focus:border-[var(--ink)] py-3 text-[16px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)]/40"
                />
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block mono text-[12px] text-[var(--muted)] uppercase">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full bg-transparent border-b border-[var(--rule)] focus:border-[var(--ink)] py-3 text-[16px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)]/40"
                />
              </div>

              {/* Subject field */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block mono text-[12px] text-[var(--muted)] uppercase">
                  Area of Interest
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="RAG System / Full-Stack App / Contract"
                  className="w-full bg-transparent border-b border-[var(--rule)] focus:border-[var(--ink)] py-3 text-[16px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)]/40"
                />
              </div>

              {/* Message field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block mono text-[12px] text-[var(--muted)] uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your architecture, timeline, and goals..."
                  className="w-full bg-transparent border-b border-[var(--rule)] focus:border-[var(--ink)] py-3 text-[16px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)]/40 resize-none"
                />
              </div>

              {/* Submit Button (Strict HAOQI Rectangle, ink fill, paper text, inverts on hover) */}
              <div>
                <button
                  type="submit"
                  disabled={formStatus !== "idle"}
                  className="px-8 py-4 bg-[var(--ink)] text-[var(--paper)] mono text-[13px] font-bold hover:bg-[var(--paper)] hover:text-[var(--ink)] border border-[var(--ink)] transition-colors duration-300 cursor-pointer disabled:opacity-50"
                >
                  {formStatus === "submitting"
                    ? "SENDING..."
                    : formStatus === "sent"
                    ? "✓ MESSAGE SENT"
                    : "SEND MESSAGE"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Three SLA rows, Direct Email Copy & Social Links */}
          <div className="lg:col-span-5 space-y-10 lg:pl-6">
            
            {/* SLA and Commitment Rows */}
            <div className="border-t border-[var(--rule)] divide-y divide-[var(--rule)]">
              {[
                { label: "Response SLA", val: "Within 24 hours" },
                { label: "Data privacy", val: "Strict client confidentiality" },
                { label: "Architecture", val: "Free feasibility & specs session" },
              ].map((row, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between mono text-[13px]">
                  <span className="text-[var(--muted)]">{row.label}</span>
                  <span className="text-[var(--ink)] font-bold">{row.val}</span>
                </div>
              ))}
            </div>

            {/* Direct Email with 2s copied state */}
            <div className="pt-2">
              <div className="mono text-[12px] text-[var(--muted)] uppercase mb-2">
                Direct Email
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-left group cursor-pointer"
              >
                <div className="text-[24px] sm:text-[30px] font-bold tracking-tight text-[var(--ink)] group-hover:underline underline-offset-4 decoration-[var(--rule)]">
                  {emailAddress}
                </div>
                <div className="mono text-[12px] text-[var(--muted)] mt-1">
                  {copied ? "[Email copied to clipboard]" : "[Click to copy email]"}
                </div>
              </button>
            </div>

            {/* Plain Text Links: GitHub ↗, X ↗, Resume ↗ */}
            <div className="pt-4 border-t border-[var(--rule)] flex flex-wrap gap-6 mono text-[14px]">
              <a
                href="https://github.com/Muhammadkhalid123"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTick(1600)}
                className="text-[var(--ink)] hover:opacity-60 transition-opacity"
              >
                GitHub ↗
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTick(1600)}
                className="text-[var(--ink)] hover:opacity-60 transition-opacity"
              >
                X ↗
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTick(1600)}
                className="text-[var(--ink)] hover:opacity-60 transition-opacity"
              >
                Resume ↗
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
