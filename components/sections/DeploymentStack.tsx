"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import {
  GitBranch,
  Terminal,
  Server,
  Shield,
  Box,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PipelineStep {
  id: string;
  step: string;
  title: string;
  icon: React.ElementType;
  codeSnippet: string;
}

export function DeploymentStack({ persona = "dev" }: { persona?: "personal" | "dev" | "ai" }) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: PipelineStep[] = [
    {
      id: "git",
      step: "01",
      title: "Push to main",
      icon: GitBranch,
      codeSnippet: `git add .
git commit -m "feat: ship update"
git push origin main`,
    },
    {
      id: "ci",
      step: "02",
      title: "GitHub Actions",
      icon: Terminal,
      codeSnippet: `jobs:
  validate-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build`,
    },
    {
      id: "docker",
      step: "03",
      title: "Docker build",
      icon: Box,
      codeSnippet: `FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]`,
    },
    {
      id: "ec2",
      step: "04",
      title: "EC2 deploy",
      icon: Server,
      codeSnippet: `ssh -i $SSH_PRIVATE_KEY $SSH_USER@$SSH_HOST << 'EOF'
  cd /var/www/portfolio
  docker compose pull
  docker compose up -d --remove-orphans
EOF`,
    },
    {
      id: "nginx",
      step: "05",
      title: "Nginx (SSL)",
      icon: Shield,
      codeSnippet: `server {
  listen 443 ssl http2;
  server_name khalid.dev;
  location / {
    proxy_pass http://portfolio_app:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}`,
    },
  ];

  const current = steps[activeStep];

  return (
    <section id="deployment" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="DevOps Architecture"
          badgeVariant="devops"
          title="How It Gets to"
          highlightedTitle="Production"
          gradientClass="from-[#800020] via-[#b92144] to-[#800020]"
          description="A clean, automated deployment pipeline from local git commit to live AWS EC2 instance."
        />

        {/* Clean Linear Pipeline Diagram */}
        <div className="p-3.5 sm:p-5 rounded-3xl liquid-glass mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {steps.map((s, index) => {
              const StepIcon = s.icon;
              const isSelected = activeStep === index;

              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "flex-1 w-full p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5",
                      isSelected
                        ? "bg-[#800020] border-[#f0a3b3]/50 text-[#FCFAF4] shadow-[0_4px_25px_rgba(128,0,32,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl font-bold"
                        : "liquid-glass-pill-dark text-[#FCFAF4]/70 hover:text-[#FCFAF4] hover:bg-[#800020]/20"
                    )}
                  >
                    <StepIcon className={cn("w-4 h-4", isSelected ? "text-[#FCFAF4]" : "text-[#FCFAF4]/60")} />
                    <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                      {s.title}
                    </span>
                  </button>

                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-[#800020]/60 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Code Snippet Viewer */}
        <div className="rounded-3xl liquid-glass overflow-hidden mb-6">
          <div className="px-5 py-3 bg-white/[0.04] border-b border-white/10 flex items-center justify-between backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="ml-2 text-xs font-mono text-[#FCFAF4]">
                {current.title} — configuration
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#f0a3b3] font-semibold px-2.5 py-0.5 rounded-full bg-[#800020]/20 border border-[#800020]/40">
              Step {current.step} / 05
            </span>
          </div>

          <div className="p-6 font-mono text-xs text-[#FCFAF4] overflow-x-auto bg-black/40 leading-relaxed backdrop-blur-xl">
            <pre>
              <code>{current.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Direct One-Sentence Statement */}
        <p className="text-center text-sm text-[#010101]/80 font-medium">
          This is the actual pipeline behind every project on this site — including this portfolio.
        </p>
      </div>
    </section>
  );
}
