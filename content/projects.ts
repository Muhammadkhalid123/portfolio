export type PersonaTag = "dev" | "ai" | "devops";

export interface DeploymentDetails {
  platform: string;
  containerization: string;
  ciCd: string;
  proxy: string;
  details: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: PersonaTag[];
  techStack: string[];
  image: string;
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  architecture?: string[];
  highlights?: string[];
  deployment?: DeploymentDetails;
}

export const projects: Project[] = [
  {
    slug: "smm-automation",
    title: "SMM Automation Suite",
    description: "Automated social media marketing engine orchestrating content scheduling, analytics reporting, and programmatic engagement across platforms.",
    longDescription: "A high-performance full-stack automation platform built to streamline multi-channel social media marketing workflows. Features real-time schedule queues, rate-limited programmatic API dispatchers, webhooks listener architecture, and rich metric analytics dashboard.",
    tags: ["dev"],
    techStack: ["Python", "FastAPI", "TypeScript", "Next.js", "PostgreSQL", "Redis", "Celery", "Docker"],
    image: "/images/projects/smm-automation.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/SMM-Automation",
    liveUrl: "https://smm-demo.khalid.dev",
    featured: true,
    highlights: [
      "Distributed asynchronous task scheduling using Redis and Celery worker pools",
      "OAuth2 multi-tenant authentication integration across social networks",
      "Dynamic data aggregation pipeline computing real-time engagement ROI metrics",
      "Modular microservice design prepared for horizontal container autoscaling"
    ],
    architecture: [
      "Next.js App Router front-end with responsive interactive analytics charts",
      "FastAPI REST API layer with Pydantic validation & strict type safety",
      "PostgreSQL persistence with SQLAlchemy ORM and Alembic migrations",
      "Background worker cluster with Redis message broker for resilient queue dispatch"
    ]
  },
  {
    slug: "text-summarizer",
    title: "AI Text Summarizer & Synthesizer",
    description: "Transformer-based NLP system that ingests long-form documents, extracts key arguments, and synthesizes multi-tier summaries with customizable abstractive modes.",
    longDescription: "An advanced natural language processing application combining Hugging Face transformer models and LangChain to distill massive technical whitepapers, financial reports, and articles into concise, actionable summaries. Supports extractive, abstractive, and bullet-point briefing formats.",
    tags: ["ai"],
    techStack: ["Python", "PyTorch", "Hugging Face", "Transformers", "FastAPI", "React", "Tailwind CSS"],
    image: "/images/projects/text-summarizer.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/text-summarizer",
    liveUrl: "https://summarizer-demo.khalid.dev",
    featured: true,
    highlights: [
      "Fine-tuned BART/T5 models optimized for domain-specific abstractive text summarization",
      "Chunked attention processing to handle ultra-long documents without token limit overflows",
      "Real-time streaming generation using Server-Sent Events (SSE)",
      "Interactive UI with readability scores, key concept extraction, and multi-format export"
    ],
    architecture: [
      "PyTorch inference pipeline with quantized weights for rapid low-latency CPU/GPU execution",
      "FastAPI backend with streaming endpoints and token telemetry logging",
      "LangChain text chunking and recursive summarization map-reduce strategy",
      "Next.js / React reactive interface with live typing animation and summary comparison"
    ]
  },
  {
    slug: "simple-tts-system",
    title: "Neural TTS & Voice Synthesis",
    description: "Low-latency neural text-to-speech synthesis pipeline generating natural speech audio from arbitrary text with pitch modulation and audio export.",
    longDescription: "A deep learning acoustic modeling and vocoder pipeline designed for expressive, natural text-to-speech generation. Features phoneme mapping, acoustic feature extraction, waveform generation, and an interactive audio studio dashboard.",
    tags: ["ai"],
    techStack: ["Python", "PyTorch", "Coqui TTS", "FastAPI", "Web Audio API", "Docker", "FFmpeg"],
    image: "/images/projects/simple-tts-system.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/simple-tts-system",
    liveUrl: "https://tts-demo.khalid.dev",
    featured: true,
    highlights: [
      "End-to-end neural acoustic model paired with high-fidelity neural vocoder",
      "Sub-200ms first-chunk audio streaming playback via Web Audio API",
      "Multi-speaker voice embedding switching and pitch/speed control",
      "Integrated audio normalizer and spectrogram visualizer"
    ],
    architecture: [
      "PyTorch neural synthesis engine containerized with ONNX runtime acceleration",
      "Asynchronous FastAPI streaming bridge converting audio chunks to Opus/MP3 streams",
      "Browser Web Audio API pipeline with HTML5 canvas real-time frequency visualizer",
      "Dockerized microservice environment with pre-cached model weights"
    ]
  },
  {
    slug: "enterprise-crm",
    title: "Enterprise CRM & Pipeline Manager",
    description: "Full-stack customer relationship management platform featuring visual kanban sales pipelines, contact activity feeds, and role-based access control.",
    longDescription: "An end-to-end CRM solution architected for modern business teams. Provides real-time deal stage tracking, activity timelines, automated email sequence triggers, granular RBAC permissions, and comprehensive revenue forecasting analytics.",
    tags: ["dev"],
    techStack: ["TypeScript", "Next.js 14", "React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Zod"],
    image: "/images/projects/crm.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/CRM",
    liveUrl: "https://crm-demo.khalid.dev",
    featured: false,
    highlights: [
      "Interactive drag-and-drop deal board with optimistic UI state updates",
      "Strict type-safe database schemas with Prisma ORM and automated migrations",
      "JWT and session-based authentication with role-based permission tiers (Admin, Manager, Rep)",
      "Exportable CSV/PDF reports with dynamic query filtering and aggregation"
    ],
    architecture: [
      "Next.js App Router full-stack architecture with React Server Components (RSC)",
      "Server Actions with Zod schema validation for secure atomic mutation handling",
      "PostgreSQL relational schema optimized with indexed foreign keys and join tables",
      "Tailwind CSS design system styled with custom dark mode and accessible color tokens"
    ]
  },
  {
    slug: "ec2-docker-cicd",
    title: "AWS EC2 Automated CI/CD & Docker Pipeline",
    description: "Production infrastructure featuring automated GitHub Actions CI/CD, multi-stage Docker containerization, AWS EC2 provisioning, and Nginx reverse proxy with SSL.",
    longDescription: "A rock-solid DevOps deployment pipeline built from the ground up to support zero-downtime containerized application releases. Includes automated lint/test workflows, container registry publishing on GHCR, automated SSH deployment hooks, Nginx reverse proxy with SSL termination, and resource monitoring.",
    // TODO: replace with real project if specific repo is added
    tags: ["dev", "devops"],
    techStack: ["Docker", "GitHub Actions", "AWS EC2", "Nginx", "Linux (Ubuntu)", "Bash", "Let's Encrypt", "GHCR"],
    image: "/images/projects/ec2-docker-cicd.svg",
    repoUrl: "https://github.com/Muhammadkhalid123",
    liveUrl: "https://khalid.dev",
    featured: true,
    highlights: [
      "Zero-downtime rolling container deployments triggered automatically on git push to main",
      "Multi-stage Docker builds reducing production container size to under 120MB",
      "Nginx reverse proxy with automated Let's Encrypt SSL renewal, Gzip compression, and security headers",
      "Automated healthchecks with automatic rollback on service degradation"
    ],
    architecture: [
      "GitHub Actions workflow for continuous integration (lint, typecheck, build validation)",
      "Docker multi-stage builder packaging Next.js standalone server into a slim Alpine image",
      "Automated SSH trigger executing docker-compose pull and atomic container swaps on AWS EC2",
      "Nginx edge proxy enforcing HSTS, CSP headers, rate-limiting, and micro-caching"
    ],
    deployment: {
      platform: "AWS EC2 (t3.micro, Ubuntu 22.04 LTS)",
      containerization: "Docker & Docker Compose (Multi-stage node:20-alpine)",
      ciCd: "GitHub Actions (.github/workflows/deploy.yml) -> GHCR",
      proxy: "Nginx 1.25 Reverse Proxy + Certbot SSL",
      details: [
        "Repository push to 'main' triggers automated CI matrix test and typecheck",
        "Docker image built and pushed to GitHub Container Registry (ghcr.io) tagged with commit SHA",
        "EC2 instance receives deployment trigger via secure SSH authentication key",
        "Nginx forwards public port 80/443 traffic to upstream Next.js container on localhost:3000"
      ]
    }
  },
  {
    slug: "rag-knowledge-engine",
    title: "RAG Enterprise Knowledge Engine",
    description: "Retrieval-Augmented Generation platform indexing private corporate documentation with vector embeddings, hybrid semantic search, and hallucination guardrails.",
    longDescription: "An enterprise-grade RAG solution allowing teams to chat with complex internal documentation with pinpoint source citations. Incorporates dense vector similarity search, BM25 keyword filtering, reranking models, and conversational memory buffers.",
    tags: ["ai", "dev"],
    techStack: ["Python", "LangChain", "Qdrant", "OpenAI / Claude API", "FastAPI", "Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/rag-knowledge-engine.svg",
    repoUrl: "https://github.com/Muhammadkhalid123",
    liveUrl: "https://rag-demo.khalid.dev",
    featured: true,
    highlights: [
      "Hybrid search combining dense vector embeddings with sparse BM25 text indices",
      "FlashRank cross-encoder reranking boosting precision on top-5 retrieval context",
      "Citation grounding verifying source document spans to minimize LLM hallucinations",
      "Real-time vector ingestion pipeline supporting PDF, DOCX, Markdown, and URL crawls"
    ],
    architecture: [
      "FastAPI asynchronous backend with vector embedding pipelines and LangChain integration",
      "Qdrant vector database instance optimized for cosine distance search and payload filters",
      "Next.js client interface with interactive source reference popups and chat history",
      "Dockerized microservice stack with decoupled worker nodes for document embedding"
    ]
  },
  {
    slug: "microservice-infra",
    title: "Dockerized Microservice Cloud Architecture",
    description: "Multi-container microservice infrastructure with centralized API gateway, internal DNS discovery, Redis caching layer, and automated monitoring telemetry.",
    longDescription: "A comprehensive reference architecture for deploying decoupled microservice applications in isolated Docker networks. Features an Nginx API Gateway routing traffic between auth, data, and background services, backed by Redis caching and Prometheus telemetry.",
    // TODO: replace with real project if specific repo is added
    tags: ["dev", "devops"],
    techStack: ["Docker Compose", "Nginx", "Redis", "PostgreSQL", "Prometheus", "Grafana", "Bash", "Linux"],
    image: "/images/projects/microservice-infra.svg",
    repoUrl: "https://github.com/Muhammadkhalid123",
    liveUrl: "https://infra-demo.khalid.dev",
    featured: false,
    highlights: [
      "Centralized reverse proxy API gateway handling SSL termination and path-based routing",
      "Isolated container networks ensuring secure database and cache segregation",
      "Prometheus metrics scraping with Grafana dashboards for CPU, memory, and network I/O monitoring",
      "Graceful service recovery with auto-restart policies and persistent named volume backups"
    ],
    architecture: [
      "Docker Compose network orchestration with dedicated frontend, backend, and database subnets",
      "Nginx edge proxy dispatching /api/auth, /api/data, and / metrics endpoints",
      "Redis distributed cache layer with LRU eviction and replication readiness",
      "Prometheus + Node Exporter metrics collection daemon"
    ],
    deployment: {
      platform: "AWS EC2 / DigitalOcean Droplet (Linux Ubuntu)",
      containerization: "Docker Compose with multi-service bridge networking",
      ciCd: "GitHub Actions automated build and registry publishing",
      proxy: "Nginx Gateway with rate limiting & upstream load-balancing",
      details: [
        "Declarative docker-compose.yml defining 6 interdependent service containers",
        "Environment variable injection via encrypted .env production profiles",
        "Automated log rotation preventing disk exhaustion on small instances"
      ]
    }
  }
];
