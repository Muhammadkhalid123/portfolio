"use client";

import React from "react";

export function Stack() {
  const stackGroups = [
    {
      category: "AI",
      technologies: "RAG · LangChain · Hugging Face · Playwright · Vector Embeddings",
    },
    {
      category: "Full-stack",
      technologies: "Next.js · TypeScript · FastAPI · PostgreSQL · Prisma · Redis",
    },
    {
      category: "Infra",
      technologies: "Docker · GitHub Actions · AWS EC2 · Nginx · Linux",
    },
  ];

  return (
    <section className="bg-[#F9F8F6] text-[#2A281F] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-b border-black/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="pb-12 border-b border-black/[0.12]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#718698] block mb-3">
            04 / Stack
          </span>
          <h2 className="heading-h1 text-[#2A281F]">
            Technologies in production
          </h2>
        </div>

        {/* 3-Line Clean Mono Stack (Section 6.5) */}
        <div className="pt-10 divide-y divide-black/[0.12]">
          {stackGroups.map((group) => (
            <div
              key={group.category}
              className="py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4 font-mono"
            >
              <span className="text-sm uppercase tracking-wider text-[#2A281F] w-40 shrink-0 font-medium">
                {group.category}
              </span>
              <span className="text-sm sm:text-base text-[#718698] flex-1">
                {group.technologies}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
