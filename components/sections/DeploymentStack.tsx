"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  GitBranch,
  Terminal,
  Server,
  Shield,
  ArrowRight,
  CheckCircle2,
  Lock,
  Cpu,
  RefreshCw,
  Box,
  Layers,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PipelineStep {
  id: string;
  step: string;
  title: string;
  category: string;
  icon: React.ElementType;
  description: string;
  codeSnippet: string;
  badge: string;
}

export function DeploymentStack({ persona = "dev" }: { persona?: "personal" | "dev" | "ai" }) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: PipelineStep[] = [
    {
      id: "git",
      step: "01",
      title: "Git Push to Main",
      category: "Source Control",
      icon: GitBranch,
      description: "Code commit and pull request merge to the 'main' branch automatically activates GitHub Actions webhooks.",
      badge: "Webhook Trigger",
      codeSnippet: `git add .
git commit -m "feat(infra): zero-downtime deployment release"
git push origin main`,
    },
    {
      id: "ci",
      step: "02",
      title: "GitHub Actions CI",
      category: "Continuous Integration",
      icon: Terminal,
      description: "Automated workflow executes linting (ESLint), strict TypeScript typechecks, and test suites.",
      badge: "CI Verification",
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
      title: "Docker Multi-Stage",
      category: "Containerization",
      icon: Box,
      description: "Builds a minimal standalone production container using Node 20 Alpine (<120MB) and publishes to GHCR.",
      badge: "ghcr.io image",
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
      title: "AWS EC2 Rollout",
      category: "Cloud Hosting",
      icon: Server,
      description: "Actions runner establishes an authenticated SSH session into the AWS EC2 instance and triggers docker-compose pull.",
      badge: "AWS EC2 t3.micro",
      codeSnippet: `ssh -i $SSH_PRIVATE_KEY $SSH_USER@$SSH_HOST << 'EOF'
  cd /var/www/portfolio
  docker compose pull
  docker compose up -d --remove-orphans
EOF`,
    },
    {
      id: "nginx",
      step: "05",
      title: "Nginx Reverse Proxy",
      category: "Edge Routing & SSL",
      icon: Shield,
      description: "Nginx terminates SSL via Let's Encrypt Certbot, applies gzip compression and security headers, routing to port 3000.",
      badge: "SSL / Port 443",
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
  const CurrentIcon = current.icon;

  return (
    <section id="deployment" className="py-24 relative overflow-hidden bg-[#070b14]">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="DevOps Architecture"
          badgeVariant="devops"
          title="Automated Cloud"
          highlightedTitle="Deployment Pipeline"
          gradientClass="from-cyan-400 via-blue-400 to-emerald-400"
          description="A production-grade, zero-downtime CI/CD deployment stack running on AWS EC2 behind a hardened Nginx reverse proxy."
        />

        {/* Pipeline Step Interactive Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {steps.map((s, index) => {
            const StepIcon = s.icon;
            const isSelected = activeStep === index;

            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group",
                  isSelected
                    ? "bg-cyan-950/70 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.2)] text-white"
                    : "bg-slate-900/50 hover:bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={cn(
                    "text-xs font-mono font-bold",
                    isSelected ? "text-cyan-300" : "text-slate-500"
                  )}>
                    {s.step}
                  </span>
                  <div className={cn(
                    "p-1.5 rounded-lg border",
                    isSelected
                      ? "bg-cyan-900/50 border-cyan-500/40 text-cyan-300"
                      : "bg-slate-800 border-slate-700 text-slate-400 group-hover:text-slate-200"
                  )}>
                    <StepIcon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-white line-clamp-1">
                    {s.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {s.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Details & Benefits (5 cols) */}
          <div className="lg:col-span-5 p-7 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="dev" size="sm">
                  {current.badge}
                </Badge>
                <span className="text-xs font-mono text-slate-500">Step {current.step} of 05</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-3 flex items-center gap-3">
                <CurrentIcon className="w-6 h-6 text-cyan-400" />
                <span>{current.title}</span>
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fully automated on git commit triggers</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Isolated environment variables via secrets</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Rolling container deployment with zero downtime</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Status: Automated & Tested</span>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Healthy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Code Snippet / Config Viewer (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#090e18] border border-slate-800/90 overflow-hidden flex flex-col">
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  {current.id === "git"
                    ? "terminal ~ git-push"
                    : current.id === "ci"
                    ? ".github/workflows/deploy.yml"
                    : current.id === "docker"
                    ? "docker/Dockerfile"
                    : current.id === "ec2"
                    ? "deploy-hook.sh (EC2 SSH)"
                    : "docker/nginx.conf"}
                </span>
              </div>
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                production ready
              </Badge>
            </div>

            {/* Code Block */}
            <div className="p-5 font-mono text-xs text-cyan-200 overflow-x-auto flex-1 leading-relaxed bg-[#060a12]">
              <pre>
                <code>{current.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
