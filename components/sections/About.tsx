"use client";

import React from "react";
import Image from "next/image";
import { profile } from "@/content/profile";

export interface AboutProps {
  persona?: "personal" | "dev" | "ai";
}

export function About({ persona = "personal" }: AboutProps = {}) {
  const photoStrip = [
    {
      src: "/images/about-1.jpg",
      caption: "Studio workspace — writing Python inference services",
    },
    {
      src: "/images/about-2.jpg",
      caption: "London — systems design & architecture",
    },
    {
      src: "/images/about-3.jpg",
      caption: "Reviewing telemetry & production logs",
    },
  ];

  const briefTimeline = [
    {
      year: "2024 – Present",
      title: "RAG Chatbots & Multi-Tenant Systems",
      detail: "FastAPI · LangChain · Vector DBs · PostgreSQL",
    },
    {
      year: "2023 – 2024",
      title: "Full-Stack Web & Automation Tooling",
      detail: "Next.js · Celery · Redis · Hugging Face",
    },
    {
      year: "2022 – 2023",
      title: "Core Foundations & Deployment",
      detail: "Python · Docker · Linux · Reverse Proxies",
    },
  ];

  return (
    <section
      id="about"
      className="bg-[#F9F8F6] text-[#2A281F] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-b border-black/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-16 border-b border-black/[0.12]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#718698] block mb-3">
            02 / About
          </span>
          <h2 className="heading-h1 text-[#2A281F]">
            The engineer behind the code
          </h2>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 pb-20 items-start">
          {/* Left Column: Direct First-Person Copy */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#2A281F]/90 font-normal leading-relaxed max-w-2xl">
            <p className="text-xl sm:text-2xl text-[#2A281F] font-light leading-snug">
              I'm Khalid. I build RAG chatbots, automation bots and the deployment pipelines behind them. I work alone, so you talk directly to the person who writes the code.
            </p>
            <p className="text-[#718698]">
              My focus is turning language models, vector embeddings, and background worker queues into resilient services that operate reliably in production — not fragile prototypes or toy scripts.
            </p>
            <p className="text-[#718698]">
              Every project I engineer is containerized with Docker, validated with automated testing, and shipped to live AWS EC2 instances behind hardened Nginx reverse proxies with automated SSL.
            </p>

            {/* Quiet Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-black/[0.12]">
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-light text-[#2A281F] block">
                  8
                </span>
                <span className="font-mono text-xs text-[#718698] mt-1 block">
                  Projects built
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-light text-[#2A281F] block">
                  1
                </span>
                <span className="font-mono text-xs text-[#718698] mt-1 block">
                  Direct engineer
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-light text-[#2A281F] block">
                  100%
                </span>
                <span className="font-mono text-xs text-[#718698] mt-1 block">
                  Production deployed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3-Line Concise Timeline */}
          <div className="lg:col-span-5 bg-black/[0.03] border border-black/[0.08] p-8 sm:p-10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#718698] block mb-6">
              Track &amp; Focus Evolution
            </span>
            <div className="space-y-8 divide-y divide-black/[0.08]">
              {briefTimeline.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "pt-6" : ""}>
                  <div className="flex items-center justify-between text-xs font-mono text-[#718698] mb-1.5">
                    <span>{item.year}</span>
                  </div>
                  <h4 className="text-base font-normal text-[#2A281F]">
                    {item.title}
                  </h4>
                  <span className="font-mono text-xs text-[#718698] mt-1 block">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quiet Contact Sheet: Photo Strip (Section 6.3) */}
        <div className="pt-12 border-t border-black/[0.12]">
          <span className="font-mono text-xs uppercase tracking-wider text-[#718698] block mb-6">
            Studio &amp; Environment
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photoStrip.map((photo, pIdx) => (
              <div key={pIdx} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-black/10 border border-black/[0.12]">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                  />
                </div>
                <p className="font-mono text-xs text-[#718698] mt-2.5">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
