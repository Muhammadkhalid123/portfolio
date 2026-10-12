"use client";

import React, { useState, useEffect } from "react";
import { GitBranch, Terminal, Box, Server, Shield, ExternalLink, ArrowRight } from "lucide-react";

export interface DeploymentStackProps {
  persona?: "personal" | "dev" | "ai";
}

export function DeploymentStack({ persona = "dev" }: DeploymentStackProps = {}) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "01",
      title: "Push to main",
      icon: GitBranch,
      description: "Local commit pushed to GitHub repository branch",
      code: `git add .\ngit commit -m "feat: ship production update"\ngit push origin main`,
      details: "Triggers automated GitHub Actions webhook pipeline securely via repository secrets.",
    },
    {
      step: "02",
      title: "GitHub Actions",
      icon: Terminal,
      description: "Automated linting, typechecking, and build validation",
      code: `jobs:\n  validate-and-build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run typecheck\n      - run: npm run build`,
      details: "Ensures zero type regressions or syntax issues before containerizing code.",
    },
    {
      step: "03",
      title: "Docker build",
      icon: Box,
      description: "Multi-stage Alpine container packaging",
      code: `FROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static\nEXPOSE 3000\nCMD ["node", "server.js"]`,
      details: "Produces a minimal production image under 120MB published to GitHub Container Registry.",
    },
    {
      step: "04",
      title: "EC2 deploy",
      icon: Server,
      description: "Zero-downtime SSH container pull & restart",
      code: `ssh -i $SSH_PRIVATE_KEY $SSH_USER@$SSH_HOST << 'EOF'\n  cd /var/www/portfolio\n  docker compose pull\n  docker compose up -d --remove-orphans\nEOF`,
      details: "Atomic container swap executing on AWS EC2 instance without expensive load balancer overhead.",
    },
    {
      step: "05",
      title: "Nginx SSL",
      icon: Shield,
      description: "Reverse proxy edge routing with automated TLS",
      code: `server {\n  listen 443 ssl http2;\n  server_name khalid.dev;\n  location / {\n    proxy_pass http://portfolio_app:3000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n  }\n}`,
      details: "Hardened security headers, gzip compression, and automated Let's Encrypt certificate renewal.",
    },
  ];

  const current = steps[activeStep];

  return (
    <section
      id="pipeline"
      className="bg-[#211E1C] text-[#F9F8F6] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-16 border-b border-white/[0.12]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#718698] block mb-3">
            03 / Infrastructure
          </span>
          <h2 className="heading-h1 text-[#F9F8F6]">
            How code reaches production
          </h2>
          <p className="text-base text-[#718698] mt-4 max-w-xl font-normal leading-relaxed">
            A real, automated CI/CD deployment pipeline from local git commit to live AWS EC2 instance.
          </p>
        </div>

        {/* 5-Node Interactive Pipeline Track (Antimetal pattern) */}
        <div className="pt-16 pb-12">
          {/* Progress bar line connecting nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative mb-12">
            {steps.map((s, idx) => {
              const isSelected = activeStep === idx;
              const Icon = s.icon;

              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-5 border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white/[0.08] border-[#A1FFCB] text-[#F9F8F6]"
                      : "bg-transparent border-white/[0.1] text-[#718698] hover:border-white/30 hover:text-[#F9F8F6]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`font-mono text-xs ${
                        isSelected ? "text-[#A1FFCB]" : "text-[#718698]"
                      }`}
                    >
                      {s.step}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-[#A1FFCB]" : "text-[#718698]"
                      }`}
                    />
                  </div>
                  <h4 className="text-sm font-normal text-[#F9F8F6] mb-1">
                    {s.title}
                  </h4>
                  <p className="font-mono text-[11px] text-[#718698] line-clamp-1">
                    {s.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Step Terminal Code Panel */}
          <div className="border border-white/[0.12] bg-black/40 overflow-hidden">
            <div className="px-6 py-3.5 border-b border-white/[0.1] flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#A1FFCB]" />
                <span className="font-mono text-xs text-[#F9F8F6]">
                  Step {current.step} — {current.title}
                </span>
              </div>
              <span className="font-mono text-xs text-[#718698]">
                {current.description}
              </span>
            </div>

            <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm text-[#F9F8F6] overflow-x-auto leading-relaxed bg-[#191715]">
              <pre className="text-[#A1FFCB]/90">
                <code>{current.code}</code>
              </pre>
            </div>

            <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.01] flex items-center justify-between text-xs font-mono text-[#718698]">
              <span>{current.details}</span>
              <span className="text-[#A1FFCB]">Live on AWS</span>
            </div>
          </div>
        </div>

        {/* Signature Honesty Statement (Section 6.4) */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-[#F9F8F6]/85 font-normal">
            "This is the actual pipeline behind every project on this site, including this portfolio."
          </p>
          <a
            href="https://github.com/Muhammadkhalid123/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#A1FFCB] hover:underline shrink-0"
          >
            <span>View source on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
