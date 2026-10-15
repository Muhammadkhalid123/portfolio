"use client";

import React, { useState } from "react";
import { profile } from "@/content/profile";
import { Check, Copy, ArrowUpRight, Send } from "lucide-react";

export interface ContactFormProps {
  persona?: "personal" | "dev" | "ai";
}

export function ContactForm({ persona = "personal" }: ContactFormProps = {}) {
  const [copied, setCopied] = useState(false);
  const [selectedChip, setSelectedChip] = useState("RAG Chatbot");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const chips = [
    "RAG Chatbot",
    "Multi-Tenant AI",
    "Automation Bot",
    "Full-Stack Dev",
    "DevOps & Cloud",
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          projectType: selectedChip,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#211E1C] text-[#F9F8F6] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="pb-16 border-b border-white/[0.12]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#718698] block mb-3">
            06 / Contact
          </span>
          <h2 className="heading-h1 text-[#F9F8F6]">
            Have an AI project in mind?
          </h2>
          <p className="text-base text-[#718698] mt-4 max-w-xl font-normal leading-relaxed">
            I&apos;m currently available for contracts and engineering projects. Let&apos;s discuss your requirements directly.
          </p>
        </div>

        {/* Giant Clickable Email (Segerman Pattern) */}
        <div className="py-16 sm:py-20 border-b border-white/[0.12]">
          <span className="font-mono text-xs uppercase tracking-wider text-[#718698] block mb-4">
            Direct Email Address
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={handleCopyEmail}
              className="text-left group cursor-pointer"
              aria-label="Copy email address"
            >
              <span className="display-title block text-[#F9F8F6] group-hover:text-[#A1FFCB] transition-colors break-all">
                {profile.email}
              </span>
            </button>
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-full border border-white/20 hover:border-[#A1FFCB] text-xs font-mono text-[#F9F8F6] hover:text-[#A1FFCB] transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#A1FFCB]" />
                  <span className="text-[#A1FFCB]">Email copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#718698]" />
                  <span>Click to copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Clean 3-Field Form */}
        <div className="pt-16 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[#718698] block mb-6">
            Or send a project message
          </span>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Type Chips */}
            <div>
              <label className="font-mono text-xs text-[#718698] block mb-3">
                Project focus
              </label>
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => {
                  const isSelected = selectedChip === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setSelectedChip(chip)}
                      className={`px-3.5 py-1.5 text-xs font-mono border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#A1FFCB] text-[#211E1C] border-[#A1FFCB]"
                          : "bg-transparent text-[#718698] border-white/15 hover:border-white/40 hover:text-[#F9F8F6]"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="font-mono text-xs text-[#718698] block mb-2">
                Your name
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full bg-transparent border-b border-white/20 py-3 text-base text-[#F9F8F6] placeholder-[#718698]/50 focus:outline-none focus:border-[#A1FFCB] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-mono text-xs text-[#718698] block mb-2">
                Your email
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="jane@company.com"
                className="w-full bg-transparent border-b border-white/20 py-3 text-base text-[#F9F8F6] placeholder-[#718698]/50 focus:outline-none focus:border-[#A1FFCB] transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="font-mono text-xs text-[#718698] block mb-2">
                Project overview
              </label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Describe your AI system, API, or automation requirements..."
                className="w-full bg-transparent border-b border-white/20 py-3 text-base text-[#F9F8F6] placeholder-[#718698]/50 focus:outline-none focus:border-[#A1FFCB] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F9F8F6] text-[#211E1C] font-mono text-xs uppercase tracking-wider hover:bg-[#A1FFCB] transition-colors cursor-pointer"
              >
                {status === "sending" ? (
                  <span>Sending message...</span>
                ) : status === "sent" ? (
                  <>
                    <Check className="w-4 h-4 text-[#211E1C]" />
                    <span>Message received</span>
                  </>
                ) : (
                  <>
                    <span>Send message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="font-mono text-xs text-rose-400 mt-3">
                  Failed to send message. Please email directly at {profile.email}.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
