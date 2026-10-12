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
  title: "AI & Automation Engineering",
  subtitle: "Full-stack AI apps (Next.js & FastAPI), RAG chatbots, multi-tenant conversational platforms, summarization, gTTS, and automated bots.",
  location: "Available Worldwide / Remote",
  email: "khalid.dev.engineer@gmail.com",
  github: "https://github.com/Muhammadkhalid123",
  linkedin: "https://www.linkedin.com/in/muhammad-khalid-627344247/",
  twitter: "https://twitter.com",
  resumeUrl: "/resume.pdf",
  availability: "Available for contracts from October 2026",
  bio: {
    personal: [
      "I'm Khalid. I build RAG chatbots, automation bots and the deployment pipelines behind them. I work alone, so you talk to the person who writes the code.",
      "My work spans full-stack web applications (Next.js, TypeScript, Python/FastAPI), production AI features (RAG retrieval, multi-tenant chatbot platforms, document summarizers, gTTS), and autonomous data pipelines.",
      "Every project here is containerized with Docker, tested, and deployed to live production environments."
    ],
    dev: [
      "I build full-stack web applications and backend services using Next.js, TypeScript, Python, and FastAPI.",
      "I design clean, typed architectures with PostgreSQL, structured REST and streaming APIs, and background job queues with Redis and Celery.",
      "Every project I engineer is containerized with Docker and built for reliability and maintainability."
    ],
    ai: [
      "I build practical AI features and automation bots that solve real workflow problems in production.",
      "My focus is on Retrieval-Augmented Generation (RAG) chatbots with source citations, multi-tenant conversational platforms, document summarization using transformer models, and autonomous web crawlers.",
      "Instead of just calling black-box APIs, I wrap models and bots into fast, asynchronous FastAPI microservices with clean frontend interfaces."
    ]
  },
  stats: [
    {
      value: "8",
      label: "Engineered Projects",
      description: "RAG chatbots, multi-tenant platforms, NLP & automation"
    },
    {
      value: "5-Step",
      label: "Automated Pipeline",
      description: "From git push to Docker, EC2, and Nginx SSL"
    },
    {
      value: "100%",
      label: "Direct Collaboration",
      description: "No middlemen — you work directly with the engineer"
    }
  ],
  timeline: [
    {
      year: "2024 – Present",
      title: "RAG Chatbots & AI Systems",
      role: "AI & Automation Engineering",
      category: "ai",
      description: "Engineering conversational AI chatbots, multi-tenant architectures, and NLP automation tools.",
      achievements: [
        "Built RAG-based intelligent chatbot with vector chunking and grounded source citations",
        "Architected multi-tenant chatbot platform with isolated tenant knowledge bases and custom prompts",
        "Engineered automated lead-generation crawler bot with Playwright and BeautifulSoup",
        "Developed lightweight web-based Text-to-Speech system powered by Python and Google gTTS"
      ]
    },
    {
      year: "2023 – 2024",
      title: "Full-Stack & Automation Engineering",
      role: "Engineering Projects",
      category: "dev",
      description: "Developed web applications, background marketing automation tooling, and database-backed services.",
      achievements: [
        "Built SMM automation platform using asynchronous task queues (Celery/Redis)",
        "Shipped AI text summarization tool using fine-tuned Hugging Face transformer models",
        "Built CRM with interactive Kanban pipeline and role-based permissions using Prisma and PostgreSQL"
      ]
    },
    {
      year: "2022 – 2023",
      title: "Foundations & ML Exploration",
      role: "Core Technical Foundations",
      category: "milestone",
      description: "Core Python development, full-stack fundamentals, deep learning concepts, and web automation.",
      achievements: [
        "Built scraping scripts, bots, and initial full-stack prototypes",
        "Explored transformer models and speech synthesis algorithms",
        "Standardized Docker Compose environments for reproducible deployments"
      ]
    }
  ]
};
