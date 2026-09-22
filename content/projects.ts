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
  technicalNote?: string;
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
    slug: "my-rag-based-chatbot",
    title: "RAG-Based Intelligent Chatbot",
    description: "An intelligent conversational chatbot powered by Retrieval-Augmented Generation (RAG). Ingests custom documentation and knowledge sources to generate grounded, hallucination-resistant responses with citations.",
    technicalNote: "Uses dense vector similarity retrieval over partitioned document embeddings paired with prompt grounding to deliver accurate context-aware responses.",
    longDescription: "A Retrieval-Augmented Generation (RAG) chatbot system built to query technical documentation, manuals, and custom knowledge bases. Features an interactive web interface and an asynchronous Python backend inference pipeline that parses raw documents into vector embeddings and feeds contextual chunks into LLM prompt windows with exact source attribution.",
    tags: ["ai", "dev"],
    techStack: ["HTML", "JavaScript", "Python", "FastAPI", "LangChain", "Vector RAG", "Tailwind CSS"],
    image: "/images/projects/my-rag-based-chatbot.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/my-rag-based-chatbot",
    featured: true,
    highlights: [
      "Document ingestion and text chunking pipeline for custom knowledge bases",
      "Vector similarity retrieval grounding LLM responses with source references",
      "Clean responsive web interface with real-time streaming conversational responses",
      "Modular Python backend supporting interchangeable LLM and embedding providers"
    ],
    architecture: [
      "HTML5 & JavaScript dynamic chat interface with markdown formatting and citation drawers",
      "FastAPI server exposing REST and streaming endpoints for query processing",
      "LangChain retrieval pipeline connecting vector search to contextual LLM prompts",
      "Vector storage maintaining document embeddings for fast cosine similarity lookups"
    ]
  },
  {
    slug: "multi-tenant-chatbot",
    title: "Multi-Tenant AI Chatbot Platform",
    description: "A scalable AI chatbot architecture supporting multi-tenancy, enabling isolated organization workspaces, custom system prompts, and tenant-specific knowledge bases.",
    technicalNote: "Engineered multi-tenant data isolation at the database and retrieval level to ensure zero cross-tenant data leakage while sharing core LLM infrastructure.",
    longDescription: "A production-ready chatbot platform engineered with multi-tenant architecture. Allows multiple organizations or departments to manage independent chatbot instances, customized persona prompts, separate access controls, and segregated knowledge silos under a unified backend infrastructure.",
    tags: ["ai", "dev"],
    techStack: ["HTML", "JavaScript", "Python", "FastAPI", "PostgreSQL", "Multi-Tenancy", "LLM APIs"],
    image: "/images/projects/multi-tenant-chatbot.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/Multi-Tenant-Chatbot",
    featured: true,
    highlights: [
      "Strict tenant isolation and workspace partitioning for enterprise data privacy",
      "Customizable bot personas, system directives, and dedicated knowledge repositories",
      "Token tracking, rate limiting, and session management per organization",
      "Modern web front-end with tenant branding and analytics overview"
    ],
    architecture: [
      "HTML/JS frontend with tenant-aware routing and authenticated bot widget",
      "FastAPI API gateway enforcing tenant validation, rate limits, and authentication",
      "Isolated relational schema and vector collections partitioned by tenant ID",
      "Centralized LLM prompt orchestration layer with dynamic context injection"
    ]
  },
  {
    slug: "text-summarizer",
    title: "AI Text Summarizer & Synthesizer",
    description: "Takes long documents and produces summaries at different lengths — quick skim vs. detailed. Built on transformer models (BART/T5) with a FastAPI backend so the summarization runs as its own service.",
    technicalNote: "Wrapped Hugging Face BART/T5 models in a standalone FastAPI service to keep heavy model inference decoupled from the frontend.",
    longDescription: "A natural language processing application that summarizes long-form documents into concise briefings. Users can toggle between concise bullet summaries and detailed abstractive overviews. Heavy transformer computation is encapsulated in a dedicated FastAPI service with token tracking.",
    tags: ["ai"],
    techStack: ["Python", "PyTorch", "Hugging Face", "FastAPI", "React", "Tailwind CSS"],
    image: "/images/projects/text-summarizer.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/text-summarizer",
    featured: true,
    highlights: [
      "Abstractive summarization using fine-tuned BART and T5 transformer architectures",
      "FastAPI inference backend handling chunked tokenization for longer inputs",
      "Interactive frontend showing side-by-side comparison of source text and generated summary",
      "Lightweight containerization enabling deployment on modest compute instances"
    ],
    architecture: [
      "React front-end with clean typography and summary length controls",
      "FastAPI API layer receiving document payloads and managing inference requests",
      "Hugging Face pipeline tokenizing text and running forward passes through transformer weights",
      "Structured JSON responses containing synthesized text and metadata"
    ]
  },
  {
    slug: "simple-tts-system",
    title: "Lightweight Web Text-to-Speech (gTTS)",
    description: "Lightweight web-based Text-to-Speech system built with Python using Google's gTTS. Converts text inputs into clear, natural voice audio with browser playback and export.",
    technicalNote: "Leverages Google's gTTS engine integrated with an asynchronous web layer to generate and stream audio blobs directly to the HTML5 Audio API.",
    longDescription: "A lightweight, responsive web-based Text-to-Speech (TTS) application developed using Python and Google's gTTS library. Converts user-submitted text into smooth, clear spoken audio in real time with audio file download and in-browser playback controls.",
    tags: ["ai"],
    techStack: ["Python", "Google gTTS", "FastAPI", "HTML5 Audio", "JavaScript", "Docker"],
    image: "/images/projects/simple-tts-system.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/simple-tts-system",
    featured: true,
    highlights: [
      "Real-time speech synthesis using Google's gTTS engine",
      "Lightweight web interface with live audio waveform and playback controls",
      "Instant MP3 generation and audio download streaming",
      "Asynchronous Python web server optimized for fast audio file serving"
    ],
    architecture: [
      "Interactive web interface featuring text area and HTML5 audio player controls",
      "FastAPI / Python endpoint converting text payloads to audio buffers via gTTS",
      "In-memory audio caching and streaming response delivery",
      "Dockerized lightweight service ready for instant container deployment"
    ]
  },
  {
    slug: "smm-automation",
    title: "Social Media Marketing Automation",
    description: "Schedules and posts social content automatically, with analytics tracking built in. Used Celery + Redis for the background job queue since posting has to happen on a schedule independent of the web app being open.",
    technicalNote: "Used Celery + Redis for the background job queue so scheduled posts dispatch reliably in the background without blocking web requests.",
    longDescription: "An automation tool built to manage and schedule multi-channel social media posts. The application features a Next.js front-end for drafting and calendar planning, a FastAPI backend for handling logic, and an asynchronous Celery worker pool with Redis to trigger and dispatch posts on a timetable.",
    tags: ["ai", "dev"],
    techStack: ["Python", "FastAPI", "TypeScript", "Next.js", "PostgreSQL", "Redis", "Celery", "Docker"],
    image: "/images/projects/smm-automation.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/SMM-Automation",
    featured: true,
    highlights: [
      "Asynchronous background task queue powered by Celery and Redis",
      "PostgreSQL database storing schedule entries, authentication tokens, and campaign metadata",
      "FastAPI backend with Pydantic validation for structured API endpoints",
      "Containerized with Docker Compose for local development and server deployment"
    ],
    architecture: [
      "Next.js App Router user interface for scheduling calendar and campaign management",
      "FastAPI REST API handling authentication, CRUD operations, and worker queue dispatches",
      "Redis broker managing pending jobs and timing events",
      "Celery workers executing background network requests independently of user sessions"
    ]
  },
  {
    slug: "leads-generating-bot",
    title: "Automated Lead-Generation Bot",
    description: "An automated bot for scraping, filtering, and qualifying sales leads and business contact info into structured datasets for outreach pipelines.",
    technicalNote: "Implemented automated anti-blocking rate limiters, headless browser automation, and data normalization pipelines to build clean prospect databases.",
    longDescription: "An intelligent Python-based lead-generation and prospecting automation tool. Designed to crawl targeted public directories and platforms, extract verified business contacts, filter prospective leads by custom qualification criteria, and export clean, structured datasets ready for CRM integration.",
    tags: ["ai", "dev"],
    techStack: ["Python", "FastAPI", "Playwright", "BeautifulSoup", "Pandas", "PostgreSQL", "Docker"],
    image: "/images/projects/leads-generating-bot.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/leads-generating-bot",
    featured: true,
    highlights: [
      "Automated extraction of business contact details, emails, and company metadata",
      "Custom lead filtering, scoring, and duplicate elimination heuristics",
      "Automated export to structured CSV, JSON, and direct CRM sync",
      "Robust error handling with retry logic and dynamic proxy/rate-limiting support"
    ],
    architecture: [
      "Web crawler & headless browser scraping engine powered by Python",
      "Data validation and cleaning pipeline parsing unstructured HTML with BeautifulSoup",
      "FastAPI service orchestrating search parameters and export jobs",
      "Structured relational storage in PostgreSQL for prospect deduplication"
    ]
  },
  {
    slug: "enterprise-crm",
    title: "Enterprise CRM & Pipeline Manager",
    description: "A CRM with a visual kanban-style sales pipeline and role-based permissions, so different users see different things. Built with Prisma + PostgreSQL for the data layer and Zod for validation end to end.",
    technicalNote: "Combined Prisma ORM with strict Zod schema validation to ensure type safety from the UI inputs all the way to PostgreSQL.",
    longDescription: "A full-stack customer relationship management web application designed for team pipeline tracking. Features drag-and-drop deal progression, contact interaction histories, role-based access control (Admin, Manager, Rep), and structured data export.",
    tags: ["dev"],
    techStack: ["TypeScript", "Next.js 14", "React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Zod"],
    image: "/images/projects/crm.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/CRM",
    featured: false,
    highlights: [
      "Kanban deal board with real-time stage updates and activity tracking",
      "Relational database schema modeled in PostgreSQL with Prisma migrations",
      "Role-based authorization restricting sensitive deal financials to managers/admins",
      "End-to-end type safety using TypeScript and Zod validation"
    ],
    architecture: [
      "Next.js App Router front-end with server components and responsive layouts",
      "Server Actions handling mutations with Zod input validation",
      "Prisma client executing indexed queries and relational joins on PostgreSQL",
      "Tailwind CSS component styling with clean dark and light mode support"
    ]
  },
  {
    slug: "ec2-docker-cicd",
    title: "AWS EC2 CI/CD & Docker Pipeline",
    description: "This is the actual deployment infrastructure this portfolio runs on: GitHub Actions builds a Docker image, ships it to EC2, and Nginx handles SSL and routing. Built to achieve seamless zero-downtime container swaps on a minimal EC2 box.",
    technicalNote: "The key challenge was achieving zero-downtime container swaps on a small t3.micro EC2 instance without paying for an expensive AWS Application Load Balancer.",
    longDescription: "The production DevOps deployment pipeline powering this portfolio website. On every push to main, GitHub Actions runs lint and type validation, builds a minimal multi-stage Docker image (<120MB), and pushes it to GHCR. An SSH deploy script triggers a container pull and restart on AWS EC2 behind an Nginx reverse proxy with automated Let's Encrypt SSL.",
    tags: ["dev", "devops"],
    techStack: ["Docker", "GitHub Actions", "AWS EC2", "Nginx", "Linux", "Bash", "Let's Encrypt"],
    image: "/images/projects/ec2-docker-cicd.svg",
    repoUrl: "https://github.com/Muhammadkhalid123/portfolio",
    liveUrl: "https://khalid.dev",
    featured: false,
    highlights: [
      "Automated CI/CD with GitHub Actions: linting, typechecking, and container build",
      "Multi-stage Dockerfile producing a slim Alpine production image (<120MB)",
      "Automated SSH deploy script executing docker compose up on AWS EC2",
      "Hardened Nginx reverse proxy with gzip compression, security headers, and SSL"
    ],
    architecture: [
      "GitHub Actions CI runner validating code and publishing images to GitHub Container Registry",
      "AWS EC2 Ubuntu instance running Docker Engine and Docker Compose",
      "Nginx reverse proxy routing port 80/443 traffic to the internal Next.js container",
      "Let's Encrypt Certbot renewing SSL certificates automatically"
    ],
    deployment: {
      platform: "AWS EC2 (Ubuntu 22.04 LTS, t3.micro)",
      containerization: "Docker & Docker Compose (Multi-stage node:20-alpine)",
      ciCd: "GitHub Actions (.github/workflows/deploy.yml) -> GHCR",
      proxy: "Nginx 1.25 Reverse Proxy + Let's Encrypt SSL",
      details: [
        "Pushing to 'main' triggers automated linting, strict typecheck, and container build",
        "Image published to ghcr.io tagged with commit SHA",
        "EC2 instance receives deployment trigger over secure SSH key",
        "Nginx forwards public port 443 HTTPS traffic to localhost:3000"
      ]
    }
  }
];
