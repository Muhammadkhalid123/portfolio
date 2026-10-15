"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check, Terminal, FileCode } from "lucide-react";
import { playTick } from "@/lib/sound";
import { useSmoothScroll } from "@/components/ui/SmoothScrollProvider";

interface PipelineStep {
  id: string;
  step: string;
  title: string;
  meta: string;
  file: string;
  language: string;
  code: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: "git",
    step: "01",
    title: "Push to main",
    meta: "Branch protection · Signed commits · Webhook dispatch",
    file: "git log --oneline -n 1",
    language: "bash",
    code: `commit 8f3b21c (HEAD -> main, origin/main)
Author: Muhammad Khalid <khalid@khalid.dev>
Date:   Mon Oct 12 18:24:00 2026 +0500

    feat(ai): optimize RAG retrieval chunking pipeline
    
    - Add semantic similarity threshold (0.82)
    - Reduce TTFT to 240ms via streaming generator
    - Signed-off-by: Muhammad Khalid`,
  },
  {
    id: "ci",
    step: "02",
    title: "GitHub Actions",
    meta: "Strict typecheck · ESLint · Security audit · GHCR publish",
    file: ".github/workflows/deploy.yml",
    language: "yaml",
    code: `name: Production CI/CD
on:
  push:
    branches: [main]

jobs:
  validate-and-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - name: Build & Push Image
        run: |
          docker build -t ghcr.io/muhammadkhalid123/portfolio:\${{ github.sha }} .
          docker push ghcr.io/muhammadkhalid123/portfolio:\${{ github.sha }}`,
  },
  {
    id: "docker",
    step: "03",
    title: "Docker build",
    meta: "Multi-stage Alpine · Unprivileged non-root user · Image <120MB",
    file: "Dockerfile",
    language: "dockerfile",
    code: `# Multi-stage lean production image
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`,
  },
  {
    id: "deploy",
    step: "04",
    title: "EC2 deploy",
    meta: "SSH trigger · Pull from GHCR · Zero-downtime container swap",
    file: "deploy.sh",
    language: "bash",
    code: `#!/usr/bin/env bash
set -euo pipefail

echo "==> Deploying portfolio container on AWS EC2..."
docker pull ghcr.io/muhammadkhalid123/portfolio:latest

# Zero-downtime blue/green container rotation
docker compose up -d --no-deps --build portfolio_web

# Validate health endpoint before pruning previous generation
curl --fail --retry 5 --retry-delay 2 http://localhost:3000/api/health
docker image prune -af --filter "until=24h"
echo "==> Deployment complete. Zero downtime achieved."`,
  },
  {
    id: "nginx",
    step: "05",
    title: "Nginx & SSL",
    meta: "TLS 1.3 · Let's Encrypt automated renewal · Gzip compression",
    file: "nginx.conf",
    language: "nginx",
    code: `upstream nextjs_upstream {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 443 ssl http2;
    server_name khalid.dev;

    ssl_certificate /etc/letsencrypt/live/khalid.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/khalid.dev/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}`,
  },
];

export function Pipeline() {
  const [activeStepId, setActiveStepId] = useState("git");
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollTo } = useSmoothScroll();

  const activeStep = pipelineSteps.find((s) => s.id === activeStepId) || pipelineSteps[0];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el, index) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: index === 0 ? "top 85%" : "top 45%",
          end: "bottom 45%",
          onEnter: () => {
            setActiveStepId(pipelineSteps[index].id);
          },
          onEnterBack: () => {
            setActiveStepId(pipelineSteps[index].id);
          },
          onLeaveBack: index > 0 ? () => {
            setActiveStepId(pipelineSteps[index - 1].id);
          } : undefined,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleStepClick = (id: string, index: number) => {
    playTick(1900, 0.015);
    setActiveStepId(id);
    const targetEl = stepRefs.current[index];
    if (targetEl) {
      scrollTo(targetEl, { offset: -120, duration: 0.6 });
    }
  };

  const handleCopyCode = async () => {
    playTick(2000, 0.02);
    try {
      await navigator.clipboard.writeText(activeStep.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 md:py-32 border-b border-neutral-200 dark:border-neutral-800 bg-[var(--paper)] text-[var(--ink)]"
      aria-label="Production Pipeline Walkthrough"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 space-y-12 sm:space-y-14">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-medium uppercase tracking-widest text-neutral-500">
              <Terminal className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>INDEX 04 // CONTINUOUS DELIVERY &amp; ZERO-DOWNTIME SWAP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Production CI/CD &amp; Infrastructure
            </h2>
          </div>
          <div className="font-mono text-xs font-medium px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400">
            AWS EC2 · DOCKER · NGINX · GHCR
          </div>
        </div>

        {/* Side-by-side Walkthrough Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">

          {/* LEFT COLUMN: Expansive Server Rack Step Blades */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 pb-12">
            {pipelineSteps.map((step, idx) => {
              const isActive = step.id === activeStepId;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  onClick={() => handleStepClick(step.id, idx)}
                  className={`min-h-[150px] p-6 sm:p-7 rounded-2xl border flex flex-col justify-between transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? "border-neutral-900 dark:border-white bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-3d-hover translate-x-1"
                      : "border-neutral-200/90 dark:border-white/10 bg-white/80 dark:bg-[#121312]/80 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-3d hover:shadow-3d-hover hover:-translate-y-0.5"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleStepClick(step.id, idx);
                    }
                  }}
                >
                  {/* Top Metadata Row */}
                  <div className="flex items-center justify-between gap-3 font-mono text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold uppercase ${
                          isActive
                            ? "bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        STEP {step.step}
                      </span>
                      <span className="truncate max-w-[200px] font-mono text-[11px] opacity-75">
                        {step.file}
                      </span>
                    </div>

                    {isActive ? (
                      <span className="font-mono text-[10px] font-medium opacity-90 tracking-wider">
                        ● VIEWING CODE
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] opacity-50 uppercase">
                        INSPECT
                      </span>
                    )}
                  </div>

                  {/* Step Title & Description */}
                  <div className="space-y-1.5 py-1">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p
                      className={`font-mono text-xs leading-relaxed ${
                        isActive
                          ? "text-neutral-300 dark:text-neutral-600 font-normal"
                          : "text-neutral-500"
                      }`}
                    >
                      {step.meta}
                    </p>
                  </div>

                  {/* Bottom Line Indicator */}
                  <div className="pt-2 border-t border-current/15 flex items-center justify-between font-mono text-[10px] opacity-70">
                    <span>CONFIG: {step.language.toUpperCase()}</span>
                    <span>READY</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Sticky Studio Terminal Window */}
          <div className="lg:col-span-7 sticky top-24 self-start">
            <div className="rounded-2xl border border-neutral-800 dark:border-white/10 shadow-3d hover:shadow-3d-hover overflow-hidden bg-[#0C0D0C] text-[#F3F4F3] transition-all duration-300">

              {/* Terminal Top Window Bar */}
              <div className="px-5 py-3.5 border-b border-neutral-800 bg-[#141514] flex items-center justify-between font-mono text-xs select-none">
                {/* Monochrome Status Dots + File Title */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-white/25">|</span>
                  <div className="flex items-center gap-2 font-mono text-xs text-white/90">
                    <FileCode className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="font-semibold">{activeStep.file}</span>
                  </div>
                </div>

                {/* Right Controls: Step Indicator & Copy Button */}
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block font-mono text-[11px] text-neutral-500">
                    STEP {activeStep.step} / 05
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-medium uppercase rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer active:scale-95"
                    title="Copy code to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Display Area */}
              <div className="min-h-[380px] max-h-[540px] overflow-auto p-6 sm:p-8 bg-[#090A09]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <pre className="font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-neutral-200 selection:bg-white selection:text-black">
                      <code>{activeStep.code}</code>
                    </pre>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Terminal Bottom Telemetry Bar */}
              <div className="px-5 py-2.5 border-t border-neutral-800 bg-[#121312] flex items-center justify-between font-mono text-[11px] text-neutral-500">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>TARGET: AWS_EC2_UBUNTU_X86</span>
                </span>
                <span className="font-medium text-neutral-300">STATUS: READY FOR DEPLOY</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
