"use client";

import { useState } from "react";
import { playTick } from "@/lib/sound";
import { Mail, Check, Terminal, Send, ArrowUpRight, ShieldCheck, Clock } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "RAG & Full-Stack System Architecture",
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
        setFormData({
          name: "",
          email: "",
          subject: "RAG & Full-Stack System Architecture",
          message: "",
        });
      }, 4000);
    }, 700);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 sm:py-24 md:py-32 border-b border-neutral-200 dark:border-neutral-800 bg-[var(--paper)] text-[var(--ink)]"
      aria-label="Contact and Commission Inquiries"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-12 sm:space-y-16">

        {/* Section Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-medium uppercase tracking-widest text-neutral-500">
              <Terminal className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>INDEX 06 // DIRECT COLLABORATION &amp; INQUIRIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Initiate Direct Collaboration
            </h2>
          </div>
          <div className="font-mono text-xs font-medium px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400">
            ENCRYPTED DISPATCH · 24H SLA
          </div>
        </div>

        {/* Studio Call to Action */}
        <div className="space-y-3 select-none max-w-4xl">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800">
            <span>OPEN FOR CONTRACTS &amp; ARCHITECTURAL COMMISSIONS</span>
          </div>
          <h2 className="text-[34px] sm:text-[48px] md:text-[64px] font-bold tracking-tight leading-[1.05] text-neutral-900 dark:text-neutral-50">
            Let&apos;s build something resilient together.
          </h2>
        </div>

        {/* 2-Column Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Studio Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-200/90 dark:border-white/10 p-6 sm:p-10 bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d hover:shadow-3d-hover transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name field */}
              <div className="space-y-2 font-sans">
                <label
                  htmlFor="name"
                  className="flex items-center justify-between text-xs font-mono font-medium uppercase text-neutral-700 dark:text-neutral-300 tracking-wider"
                >
                  <span>01 // SENDER NAME</span>
                  <span className="text-[10px] text-neutral-400 font-normal">REQUIRED</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-3 sm:p-3.5 text-sm sm:text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                />
              </div>

              {/* Email field */}
              <div className="space-y-2 font-sans">
                <label
                  htmlFor="email"
                  className="flex items-center justify-between text-xs font-mono font-medium uppercase text-neutral-700 dark:text-neutral-300 tracking-wider"
                >
                  <span>02 // DIRECT EMAIL</span>
                  <span className="text-[10px] text-neutral-400 font-normal">RFC 5322</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@company.com"
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-3 sm:p-3.5 text-sm sm:text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                />
              </div>

              {/* Scope field */}
              <div className="space-y-2 font-sans">
                <label
                  htmlFor="subject"
                  className="flex items-center justify-between text-xs font-mono font-medium uppercase text-neutral-700 dark:text-neutral-300 tracking-wider"
                >
                  <span>03 // ENGAGEMENT SCOPE</span>
                  <span className="text-[10px] text-neutral-400 font-normal">DOMAIN</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="RAG Platform / Enterprise Full-Stack / Automation"
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-3 sm:p-3.5 text-sm sm:text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all"
                />
              </div>

              {/* Message field */}
              <div className="space-y-2 font-sans">
                <label
                  htmlFor="message"
                  className="flex items-center justify-between text-xs font-mono font-medium uppercase text-neutral-700 dark:text-neutral-300 tracking-wider"
                >
                  <span>04 // ARCHITECTURAL SPECIFICATION</span>
                  <span className="text-[10px] text-neutral-400 font-normal">PAYLOAD</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your requirements, target timeline, and infrastructure parameters..."
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-3 sm:p-3.5 text-sm sm:text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formStatus !== "idle"}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-sans font-semibold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-white dark:bg-black animate-spin" />
                      <span>Dispatching transmission...</span>
                    </>
                  ) : formStatus === "sent" ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Transmission Delivered</span>
                    </>
                  ) : (
                    <>
                      <span>Send Transmission</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Verified SLA, Direct Channel, and Social Links */}
          <div className="lg:col-span-5 space-y-6">

            {/* SLA Specifications Card */}
            <div className="rounded-2xl border border-neutral-200/90 dark:border-white/10 p-6 sm:p-7 bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d hover:shadow-3d-hover hover:-translate-y-0.5 transition-all duration-300 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-semibold uppercase text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>COMMITMENT SLAS</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] text-neutral-600 dark:text-neutral-400 font-medium">
                  ACTIVE
                </span>
              </div>

              <div className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
                {[
                  {
                    icon: Clock,
                    label: "RESPONSE GUARANTEE",
                    val: "< 24 HOURS",
                  },
                  {
                    icon: ShieldCheck,
                    label: "DATA CONFIDENTIALITY",
                    val: "STRICT NDA AVAILABLE",
                  },
                  {
                    icon: Terminal,
                    label: "INITIAL FEASIBILITY",
                    val: "FREE 30-MIN SPEC SESSION",
                  },
                ].map((item, i) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <span className="text-neutral-500 font-medium">
                      {item.label}
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Channel Box */}
            <div className="rounded-2xl border border-neutral-200/90 dark:border-white/10 p-6 sm:p-7 bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d hover:shadow-3d-hover hover:-translate-y-0.5 transition-all duration-300 space-y-3">
              <div className="font-mono text-xs uppercase font-medium text-neutral-400 tracking-wider">
                DIRECT COMMUNICATIONS ENDPOINT
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full text-left group p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all cursor-pointer"
              >
                <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center justify-between">
                  <span>{emailAddress}</span>
                  <Mail className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                </div>
                <div className="font-mono text-xs text-neutral-500 mt-1">
                  {copied ? "✓ Copied to clipboard" : "Click to copy address"}
                </div>
              </button>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-neutral-200/90 dark:border-white/10 p-6 sm:p-7 bg-white/80 dark:bg-[#121312]/80 backdrop-blur-md shadow-3d hover:shadow-3d-hover hover:-translate-y-0.5 transition-all duration-300 space-y-3 font-mono">
              <div className="text-xs uppercase font-medium text-neutral-400 tracking-wider">
                VERIFIED DIGITAL PROFILES
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "GITHUB", url: "https://github.com/Muhammadkhalid123" },
                  { label: "LINKEDIN", url: "https://linkedin.com" },
                  { label: "X / TWITTER", url: "https://x.com" },
                  { label: "RESUME [PDF]", url: "/resume.pdf" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTick(1600)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-medium bg-neutral-100/70 dark:bg-neutral-900/70 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
