"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do you stop a RAG chatbot from making things up?",
      a: "I partition raw documents into semantically coherent vector chunks, index them with embeddings, and enforce strict prompt grounding. The LLM is instructed to answer solely using the retrieved context and to cite exact document chunks. If the retrieved chunks do not contain the answer, the bot states that clearly rather than hallucinating.",
    },
    {
      q: "Can you work with my existing codebase?",
      a: "Yes. I write clean, modular Python/FastAPI microservices and Next.js frontends with typed REST and streaming endpoints. Because everything is containerized with Docker, services drop directly into existing architectures, server setups, or monorepos.",
    },
    {
      q: "How long does a typical project take?",
      a: "Targeted systems — such as a RAG chatbot, a multi-tenant bot platform, or an automated data extraction crawler — typically ship within 1 to 3 weeks from architectural scope to verified production deployment.",
    },
    {
      q: "How do you handle client data and NDAs?",
      a: "I work under standard non-disclosure agreements. In multi-tenant platforms, tenant IDs strictly isolate databases and vector collections so no data ever leaks across organizations. For cloud inference, enterprise private endpoints or self-hosted models are used according to your data security requirements.",
    },
  ];

  return (
    <section className="bg-[#F9F8F6] text-[#2A281F] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-b border-black/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="pb-16 border-b border-black/[0.12]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#718698] block mb-3">
            05 / Questions
          </span>
          <h2 className="heading-h1 text-[#2A281F]">
            Frequently asked questions
          </h2>
        </div>

        {/* Accordion List (Antimetal pattern) */}
        <div className="divide-y divide-black/[0.12] pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-8 sm:py-10">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between text-left gap-6 group cursor-pointer"
                >
                  <h3 className="heading-h2 text-[#2A281F] group-hover:text-black transition-colors max-w-3xl">
                    {faq.q}
                  </h3>
                  <div className="p-2 border border-black/15 group-hover:border-black shrink-0 transition-colors mt-1">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#2A281F]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#2A281F]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-6 max-w-2xl text-base text-[#718698] font-normal leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
