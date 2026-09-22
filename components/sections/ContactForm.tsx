"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export interface ContactFormProps {
  persona?: "personal" | "dev" | "ai";
}

export function ContactForm({ persona = "ai" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    track: "AI & RAG Systems",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        track: "AI & RAG Systems",
        message: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          badgeVariant="ai"
          title="Let's Build Something"
          highlightedTitle="Together"
          gradientClass="from-[#800020] via-[#b92144] to-[#800020]"
          description="Have an AI project, an automation challenge, or a custom system to build? Send a message directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Direct Info & Value Props */}
          <div className="lg:col-span-5 p-8 sm:p-9 rounded-3xl liquid-glass flex flex-col justify-between h-full space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#FCFAF4] mb-2">
                Engineering Consultation
              </h3>
              <p className="text-sm text-[#FCFAF4]/80 leading-relaxed mb-6">
                We are actively discussing new AI projects, high-impact consulting contracts, and autonomous automation pipelines.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5 p-4 rounded-2xl liquid-glass-pill-dark text-[#FCFAF4]">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-[#FCFAF4]/60 block font-medium">Response SLA</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-300">Within 24 Hours</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-2xl liquid-glass-pill-dark text-[#FCFAF4]">
                  <div className="p-2.5 rounded-xl bg-[#800020]/20 text-[#f0a3b3] border border-[#800020]/40">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-[#FCFAF4]/60 block font-medium">Data Privacy &amp; NDA</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#FCFAF4]">Strict Client Confidentiality</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-2xl liquid-glass-pill-dark text-[#FCFAF4]">
                  <div className="p-2.5 rounded-xl bg-[#800020]/20 text-[#f0a3b3] border border-[#800020]/40">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-[#FCFAF4]/60 block font-medium">Architecture Review</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#FCFAF4]">Free Feasibility &amp; Specs Session</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-[#FCFAF4]/70 leading-relaxed">
              <span className="text-[#f0a3b3] font-semibold block mb-1">Direct Routing:</span>
              Your submission triggers an automated priority alert in our engineering workspace.
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 p-8 sm:p-9 rounded-3xl liquid-glass">
            {status === "success" ? (
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#FCFAF4]">
                  Message Transmitted Successfully!
                </h3>
                <p className="text-sm text-[#FCFAF4]/80 max-w-md">
                  Thank you for reaching out. Your inquiry has been received and we will reply within 24 hours.
                </p>
                <Button
                  onClick={() => setStatus("idle")}
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#FCFAF4]/90 mb-1.5">
                      Your Name <span className="text-[#f0a3b3]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl liquid-glass-input text-sm text-[#FCFAF4] placeholder-[#FCFAF4]/40 focus:outline-none focus:border-[#800020] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#FCFAF4]/90 mb-1.5">
                      Email Address <span className="text-[#f0a3b3]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl liquid-glass-input text-sm text-[#FCFAF4] placeholder-[#FCFAF4]/40 focus:outline-none focus:border-[#800020] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#FCFAF4]/90 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="AI Project / Automation Consultation"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl liquid-glass-input text-sm text-[#FCFAF4] placeholder-[#FCFAF4]/40 focus:outline-none focus:border-[#800020] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#FCFAF4]/90 mb-1.5">
                      Area of Interest
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#010101] border border-white/20 text-sm text-[#FCFAF4] focus:outline-none focus:border-[#800020] backdrop-blur-md transition-all"
                    >
                      <option value="AI & RAG Systems">RAG &amp; Intelligent Chatbots</option>
                      <option value="Multi-Tenant Chatbots">Multi-Tenant Bot Architecture</option>
                      <option value="Lead Generation & Automation">Lead Gen &amp; Web Automation Bots</option>
                      <option value="NLP & Text Summarization">NLP &amp; Text Summarization</option>
                      <option value="Custom Project / Contract">Custom Project or Contract</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FCFAF4]/90 mb-1.5">
                    Message <span className="text-[#f0a3b3]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project, timeline, and requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl liquid-glass-input text-sm text-[#FCFAF4] placeholder-[#FCFAF4]/40 focus:outline-none focus:border-[#800020] transition-all resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-xs text-rose-200 flex items-center gap-2 backdrop-blur-md">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  size="lg"
                  variant="primary"
                  className="w-full"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
