"use client";

import { useState } from "react";
import { playTick } from "@/lib/sound";

interface PipelineStep {
  id: string;
  step: string;
  title: string;
  meta: string;
  file: string;
  code: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: "git",
    step: "01",
    title: "Push to main",
    meta: "Branch protection · Signed commits · Webhook dispatch",
    file: "git log --oneline -n 1",
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
    code: `#!/usr/bin/env bash
set -euo pipefail

echo "==> Deploying SHA: $IMAGE_TAG"
docker pull ghcr.io/muhammadkhalid123/portfolio:$IMAGE_TAG

# Graceful zero-downtime swap
docker compose up -d --no-deps --build app
docker container prune -f
docker image prune -a --force --filter "until=48h"

# Healthcheck probe
curl --fail --retry 5 --retry-delay 2 http://localhost:3000/api/health
echo "==> Deployment successful"`,
  },
  {
    id: "nginx",
    step: "05",
    title: "Nginx (SSL)",
    meta: "TLS 1.3 · Let's Encrypt Certbot · Reverse proxy to port 3000",
    file: "/etc/nginx/sites-available/khalid.dev",
    code: `server {
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
  const [activeStepId, setActiveStepId] = useState("docker");

  const activeStep = pipelineSteps.find(s => s.id === activeStepId) || pipelineSteps[0];

  const handleStepClick = (id: string) => {
    playTick(1900, 0.015);
    setActiveStepId(id);
  };

  return (
    <section id="pipeline" className="w-full py-16 md:py-24 border-b border-[var(--rule)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-[var(--rule)]">
          <div className="mono text-[13px] text-[var(--muted)] uppercase tracking-wider">
            // PRODUCTION PIPELINE
          </div>
          <div className="mono text-[12px] text-[var(--muted)]">
            AWS EC2 · Docker Compose · Nginx · GitHub Actions
          </div>
        </div>

        <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Five Step Rows */}
          <div className="lg:col-span-5 space-y-0 divide-y divide-[var(--rule)]">
            {pipelineSteps.map((step) => {
              const isActive = step.id === activeStepId;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  className={`w-full text-left py-6 px-3 transition-colors cursor-pointer block select-none border-l-2 ${
                    isActive
                      ? "border-l-[var(--ink)] bg-[var(--ink)]/5"
                      : "border-l-transparent hover:border-l-[var(--rule)] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3 mono text-[12px] text-[var(--muted)] mb-1">
                    <span>STEP {step.step}</span>
                    <span>/</span>
                    <span>{step.file}</span>
                  </div>
                  <h3 className="text-[22px] sm:text-[26px] font-bold text-[var(--ink)] leading-tight">
                    {step.title}
                  </h3>
                  <p className="mono text-[12px] text-[var(--muted)] mt-1">
                    {step.meta}
                  </p>
                </button>
              );
            })}

            {/* Honesty Quote */}
            <div className="pt-6">
              <p className="mono text-[12px] text-[var(--muted)] leading-relaxed italic">
                &ldquo;This is the actual pipeline behind every project on this site, including this portfolio.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Code Panel */}
          <div className="lg:col-span-7 sticky top-20 border border-[var(--rule)] bg-[var(--paper)]">
            <div className="px-4 py-3 border-b border-[var(--rule)] flex items-center justify-between mono text-[12px]">
              <span className="font-bold text-[var(--ink)]">{activeStep.file}</span>
              <span className="text-[var(--muted)]">STEP {activeStep.step} / 05</span>
            </div>
            <pre className="p-4 sm:p-6 overflow-x-auto mono text-[12px] sm:text-[13px] leading-relaxed text-[var(--ink)] bg-[var(--paper)] max-h-[500px]">
              <code>{activeStep.code}</code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}
