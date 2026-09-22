export interface TimelineEvent {
  year: string;
  title: string;
  role: string;
  category: "dev" | "ai" | "devops" | "milestone";
  description: string;
  achievements: string[];
}

export interface ProfileStat {
  value: string;
  label: string;
  description: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  resumeUrl: string;
  availability: string;
  bio: {
    personal: string[];
    dev: string[];
    ai: string[];
  };
  stats: ProfileStat[];
  timeline: TimelineEvent[];
}

export const profile: Profile = {
  name: "Muhammad Khalid",
  shortName: "Khalid",
  title: "Full Stack Developer & AI Engineer",
  subtitle: "Specializing in Next.js, Python, RAG architectures, Docker, and AWS automated deployments.",
  location: "Remote / Available Globally",
  email: "khalid.dev.engineer@gmail.com",
  github: "https://github.com/Muhammadkhalid123",
  linkedin: "https://linkedin.com/in/muhammad-khalid",
  twitter: "https://twitter.com",
  resumeUrl: "/resume.pdf",
  availability: "Available for Full-time Roles & High-Impact Contracts",
  bio: {
    personal: [
      "I am a versatile software engineer with a deep passion for building high-scale full-stack applications, intelligent AI/ML systems, and automated cloud deployments.",
      "My engineering philosophy centers on end-to-end craftsmanship: writing clean, typed application code, integrating state-of-the-art AI models, and packaging the solution into hardened, self-healing Docker containers hosted on AWS.",
      "Whether developing multi-tenant web platforms or fine-tuning transformer pipelines, I prioritize reliability, speed, and clean architectural design."
    ],
    dev: [
      "Specialized in architecting modern full-stack web applications and resilient backend microservices using Next.js 14, TypeScript, Python, and FastAPI.",
      "Expertise in designing automated CI/CD deployment pipelines on AWS EC2, containerizing workloads with multi-stage Docker builds, and configuring secure Nginx reverse proxies with SSL termination.",
      "Dedicated to zero-downtime releases, scalable database schema design with PostgreSQL/Prisma, and performant asynchronous queue management."
    ],
    ai: [
      "Focused on engineering practical, production-grade Artificial Intelligence and Natural Language Processing systems.",
      "Hands-on experience developing Retrieval-Augmented Generation (RAG) architectures with hybrid vector search (Qdrant), cross-encoder reranking, and hallucination guardrails.",
      "Skilled in transformer model integration (Hugging Face, BART, T5), neural speech synthesis (Coqui TTS, Whisper), and LLM orchestration with LangChain."
    ]
  },
  stats: [
    {
      value: "99.9%",
      label: "Deployment Uptime",
      description: "Automated rolling Docker deployments with health checks"
    },
    {
      value: "10+",
      label: "Full Stack & AI Projects",
      description: "From concept to production-grade deployment"
    },
    {
      value: "<120MB",
      label: "Docker Image Sizes",
      description: "Optimized multi-stage standalone builds"
    },
    {
      value: "100%",
      label: "TypeScript & Typed APIs",
      description: "Strict end-to-end type safety across the stack"
    }
  ],
  timeline: [
    {
      year: "2024 - Present",
      title: "Full-Stack AI & Cloud Engineer",
      role: "Independent Consultant & Systems Architect",
      category: "ai",
      description: "Designing end-to-end web applications, custom RAG enterprise knowledge engines, and automated CI/CD deployment infrastructure on AWS EC2.",
      achievements: [
        "Architected multi-persona portfolio and microservice platforms containerized with Docker and Nginx",
        "Built domain-specific document summarization and neural TTS synthesis pipelines",
        "Implemented automated zero-downtime GitHub Actions deployment workflows targeting AWS"
      ]
    },
    {
      year: "2023 - 2024",
      title: "Full-Stack & Backend Developer",
      role: "Software Engineer",
      category: "dev",
      description: "Developed scalable web applications, REST APIs, and asynchronous automation suites.",
      achievements: [
        "Engineered SMM automation suite with asynchronous Celery and Redis task queues",
        "Created enterprise CRM platform featuring interactive Kanban pipeline and role-based permissions",
        "Standardized Docker Compose local development and production container environments"
      ]
    },
    {
      year: "2022 - 2023",
      title: "AI/ML & NLP Foundations",
      role: "Machine Learning Researcher & Developer",
      category: "milestone",
      description: "Explored deep learning architectures, acoustic modeling for speech synthesis, and transformer-based text processing.",
      achievements: [
        "Implemented custom PyTorch neural vocoders and text summarization models",
        "Constructed vector embedding ingestion pipelines for semantic information retrieval",
        "Published open-source utilities and modular Python packages"
      ]
    }
  ]
};
