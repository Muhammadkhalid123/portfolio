"use client";

import React, { useState } from "react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Send,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
  Clock,
  Sparkles,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContactFormProps {
  persona?: "personal" | "dev" | "ai";
}

export function ContactForm({ persona = "personal" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    track: persona === "dev" ? "DevOps & Full Stack" : persona === "ai" ? "AI & RAG Systems" : "General Inquiry",
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
        track: persona === "dev" ? "DevOps & Full Stack" : persona === "ai" ? "AI & RAG Systems" : "General Inquiry",
        message: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please reach out directly via email.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          badgeVariant={persona === "dev" ? "dev" : persona === "ai" ? "ai" : "personal"}
          title="Let's Build Something"
          highlightedTitle="Exceptional Together"
          gradientClass={
            persona === "dev"
              ? "from-cyan-400 to-blue-400"
              : persona === "ai"
              ? "from-purple-400 to-pink-400"
              : "from-indigo-400 to-amber-300"
          }
          description="Have a high-impact project, an architecture challenge, or an AI concept to deploy? Send a message directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          {/* Left Column: Direct Info & Socials (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Direct Contact
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                I&apos;m actively discussing full-time opportunities, high-impact consulting contracts, and AI/DevOps deployments.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                >
                  <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-slate-400 block font-medium">Email Address</span>
                    <span className="text-xs sm:text-sm font-semibold truncate block">{profile.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-slate-300">
                  <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-slate-400 block font-medium">Response Time</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-300">Within 24 Hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <span className="text-xs text-slate-400 block mb-3 font-semibold uppercase tracking-wider">
                Connect on Developer Networks:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            {status === "success" ? (
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Message Transmitted Successfully!
                </h3>
                <p className="text-sm text-slate-400 max-w-md">
                  Thank you for reaching out. Your inquiry has been received and I will reply within 24 hours.
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Project Opportunity / Consultation"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Area of Interest
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="DevOps & Full Stack">DevOps & Full-Stack Deployment</option>
                      <option value="AI & RAG Systems">AI & RAG Knowledge Systems</option>
                      <option value="Contract / Full-time Role">Contract or Full-time Role</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Message <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, timeline, and architectural requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  size="lg"
                  variant={persona === "dev" ? "cyan" : persona === "ai" ? "purple" : "primary"}
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
