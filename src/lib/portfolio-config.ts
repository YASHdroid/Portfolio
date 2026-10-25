/**
 * Central configuration file for the portfolio.
 *
 * Update this file to change content across the entire desktop experience.
 * Data below reflects Yash Chopra's real resume (YASH_RESUME.pdf).
 */

import type {
  ProfileConfig,
  ProjectConfig,
  SkillCategory,
  ExperienceItem,
  AchievementItem,
  SocialLink,
} from "@/lib/types";

export const profile: ProfileConfig = {
  name: "Yash Chopra",
  firstName: "Yash",
  role: "Full-Stack Developer | AI/ML Enthusiast | Problem Solver",
  tagline: "I build intelligent things for the web and beyond.",
  location: "New Delhi, India",
  education: {
    institution: "Maharaja Agrasen Institute of Technology (MAIT)",
    degree: "B.Tech in Computer Science and Technology",
    location: "Delhi, India",
    startYear: "2024",
    endYear: "2028",
    details:
      "CGPA: 8.67. Core coursework spanning Data Structures & Algorithms, OOP, DBMS, Operating Systems, and Computer Networks. Web Development Executive at IOSD (International Organisation of Software Developers), MAIT.",
  },
  about: {
    intro:
      "Hi, I'm Yash — a B.Tech Computer Science student at MAIT (CGPA 8.67) who loves turning ideas into reliable, intelligent software. I've interned as a full-stack developer at SkillifyMe, shipped agentic RAG systems with Scout, and built AI tooling with CodeLens. My focus sits at the intersection of full-stack engineering and applied AI.",
    philosophy:
      "I believe great software is calm: it does a lot, but never feels busy. I sweat the small details — naming, latency, error states, even security reviews — because those are what separate a toy from a tool people actually use.",
    interests: [
      "Artificial Intelligence & Machine Learning",
      "Retrieval-Augmented Generation (RAG) & Vector Search",
      "Data Structures & Algorithms",
      "Full-Stack Web Development",
      "Generative AI & LLM Agents",
    ],
    exploring: [
      "Agentic LLM workflows with tool-use and structured outputs",
      "Vector search & cross-encoder re-ranking at scale (pgvector)",
      "Cloud deployment — Docker, AWS, Vercel, Render",
      "Designing developer tools that feel calm and fast",
    ],
    journey: [
      {
        year: "2024",
        title: "Began B.Tech in CS&T at MAIT",
        detail:
          "Started formal computer science education; fell in love with algorithms and the craft of writing clean code in C++ and Python.",
      },
      {
        year: "2025",
        title: "Went full-stack",
        detail:
          "Built and shipped DevTinder — a developer networking platform with JWT auth, MongoDB, and a paginated feed. Joined IOSD, MAIT as Web Development Executive.",
      },
      {
        year: "2026",
        title: "Interned at SkillifyMe & built Scout",
        detail:
          "Engineered admin backends, shipped 9+ REST endpoints, closed critical security vulnerabilities. Built Scout — an agentic RAG research assistant with pgvector and a 5-stage deep-research workflow.",
      },
      {
        year: "2026",
        title: "Shipped CodeLens",
        detail:
          "Launched an AI code reviewer on Gemini 2.5 Flash with structured output, dual-login auth, and interview-oriented feedback across 4 languages.",
      },
    ],
  },
};

export const projects: ProjectConfig[] = [
  {
    id: "scout",
    name: "Scout",
    tagline: "Agentic AI research assistant over web sources & uploaded PDFs.",
    description:
      "Scout is an agentic RAG research assistant. An LLM agent chooses between Tavily web search and PDF search via tool calling, returning deduplicated, source-attributed answers grounded in retrieved documents.",
    longDescription:
      "Scout is a two-service system: a Python/FastAPI AI service plus a Node/Express backend with JWT auth and PostgreSQL. The RAG pipeline chunks PDFs, stores FastEmbed embeddings in PostgreSQL with pgvector, retrieves by cosine similarity, and re-ranks with a cross-encoder to ground answers in the document. A 5-stage deep-research workflow (plan, execute, analyze, synthesize, verify) produces structured, verification-checked research reports. LLM tool calling is hardened with JSON-schema validation, bounded retries, a 10-call cap per request, and 30+ mocked tests.",
    techStack: [
      "Python",
      "FastAPI",
      "Node.js",
      "Express",
      "PostgreSQL",
      "pgvector",
      "Groq",
      "Tavily",
    ],
    features: [
      "Two-service architecture with JWT auth & shared-secret security",
      "Agentic tool calling — Tavily web search vs PDF search",
      "RAG pipeline: chunking, FastEmbed + pgvector, cosine retrieval",
      "Cross-encoder re-ranking for grounded answers",
      "5-stage deep-research workflow with verification",
      "30+ mocked tests & document-ownership checks",
    ],
    accent: "lavender",
    icon: "compass",
    year: "2026",
    github: "https://github.com/YASHdroid/scout-ai",
    demo: "https://scout-ai-umber.vercel.app",
  },
  {
    id: "codelens",
    name: "CodeLens",
    tagline: "AI code review & interview preparation platform.",
    description:
      "CodeLens is an AI-powered code review and interview preparation platform built on Gemini 2.5 Flash. It detects bugs, explains issues, generates corrected code, and gives interview-oriented feedback across 4 languages.",
    longDescription:
      "CodeLens reviews code with Gemini 2.5 Flash and enforces structured output — JSON response schemas ensure AI reviews render consistently in the UI and are stored in review history. Auth is secure by design: JWT with two login methods (email/password and Google OAuth), protected routes, and per-user data access. REST APIs on Node.js/Express with MongoDB power authentication, code reviews, review history, interview preparation, and user management.",
    techStack: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini 2.5 Flash",
      "JWT",
      "Tailwind CSS",
    ],
    features: [
      "AI code reviewer on Gemini 2.5 Flash",
      "Bug detection, explanations & corrected code generation",
      "Interview-oriented feedback across JS, Java, C++, Python",
      "Structured JSON output — consistent UI rendering",
      "JWT auth with email/password + Google OAuth",
      "Review history & per-user data access",
    ],
    accent: "sage",
    icon: "scanSearch",
    year: "2026",
    github: "https://github.com/YASHdroid/CodeLens",
    demo: "https://code-lens-kohl.vercel.app",
  },
  {
    id: "devtinder",
    name: "DevTinder",
    tagline: "Full-stack developer networking platform.",
    description:
      "DevTinder is a full-stack developer networking platform — think Tinder, but for finding developer connections. Swipe through profiles, send connection requests, and build your dev network.",
    longDescription:
      "DevTinder ships a REST API with 10+ endpoints covering authentication, profile management, connection requests, and developer feeds — secured with JWT in HTTP-only cookies and protected routes. The paginated feed serves 10 profiles per request, smartly excluding the logged-in user and anyone with an existing connection request. Profile images are handled via Cloudinary, and the UI is built with React and Tailwind CSS.",
    techStack: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "JWT",
      "Tailwind CSS",
    ],
    features: [
      "REST API with 10+ endpoints",
      "JWT auth in HTTP-only cookies + protected routes",
      "Paginated feed — 10 profiles per request",
      "Smart exclusion of self & existing connections",
      "Cloudinary-powered profile images",
    ],
    accent: "rose",
    icon: "heart",
    year: "2025",
    github: "https://github.com/YASHdroid/Dev-tinder",
    demo: "https://dev-tinder-three-beta.vercel.app/login",
  },
  {
    id: "foodify",
    name: "Foodify",
    tagline: "Restaurant discovery & food ordering with a Redux-powered cart.",
    description:
      "Foodify is a restaurant discovery and food ordering web app. Browse listings with ratings, delivery times and cost-for-two, search and filter top-rated restaurants, and manage a fully state-driven cart.",
    longDescription:
      "Foodify is a React single-page application built on Redux Toolkit. A dedicated cart slice drives all add, remove and checkout state through dispatched actions, while client-side routing switches between Home, Help, Deals and About views. Restaurant data comes from a live API layer with a mock-data fallback, and the listing UI supports search plus a Top Rated filter. The interface is styled with Tailwind CSS and bundled with Parcel.",
    techStack: [
      "React",
      "Redux Toolkit",
      "JavaScript",
      "Tailwind CSS",
      "Parcel",
      "React Router",
    ],
    features: [
      "Redux Toolkit store with a dedicated cart slice",
      "Restaurant listings with ratings, delivery time & cost for two",
      "Search and Top Rated filtering",
      "Client-side routing — Home, Help, Deals, About",
      "Live restaurant API with a mock-data fallback",
    ],
    accent: "rose",
    icon: "utensils",
    year: "2025",
    github: "https://github.com/YASHdroid/Foodify",
    demo: "https://foodify-seven-ashy.vercel.app/",
  },
  {
    id: "carbon-tracker",
    name: "Carbon Tracker",
    tagline: "Track your carbon footprint, earn rewards, join eco-challenges.",
    description:
      "Carbon Tracker is a sustainability platform that helps users measure and reduce their environmental impact. It pairs a carbon footprint calculator with impact tracking, a rewards system, and community eco-challenges.",
    longDescription:
      "Carbon Tracker is a React + Vite web application built around one idea — make every action count for the planet. Users can calculate their carbon footprint, monitor impact statistics over time, earn reward points, and join community challenges. A global impact dashboard aggregates community metrics such as trees planted, carbon reduced and waste recycled, while News and Resources sections keep users engaged with sustainability content.",
    techStack: ["React", "Vite", "JavaScript", "CSS"],
    features: [
      "Carbon footprint calculator",
      "Personal impact tracking with detailed statistics",
      "Rewards system — points for prizes & experiences",
      "Community eco-challenges and competitions",
      "Global impact dashboard — trees, carbon & waste metrics",
      "News & Resources sustainability hub",
    ],
    accent: "sage",
    icon: "leaf",
    year: "2025",
    github: "https://github.com/YASHdroid/carbon-tracker",
    demo: "https://carbontracker-git-main-yash-5721d40c.vercel.app/",
  },
  {
    id: "krishimitra",
    name: "Krishimitra",
    tagline: "Farmer's friend — crop advisory, weather alerts & community support.",
    description:
      "Krishimitra (\"Farmer's Friend\") is a multilingual farmer-support website that delivers advanced agricultural guidance, real-time weather alerts, and community support to farmers — in their own language, English or Hindi.",
    longDescription:
      "Krishimitra is a Next.js + TypeScript web app built with v0 and deployed on Vercel. Farmers sign in with a phone number and farmer card number, then receive AI-powered crop advisory grounded in datasets and guidelines from Punjab Agricultural University (PAU), real-time weather alerts for planning, and a farmer community for connecting with experienced growers. Constant assistance is available through the Kisan Call Centre helpline (1800-180-1551), and the interface ships with English/Hindi language selection plus a dark mode.",
    techStack: ["Next.js", "TypeScript", "React", "CSS", "Vercel"],
    features: [
      "AI-powered crop advisory grounded in PAU datasets & guidelines",
      "Real-time weather alerts for farm planning",
      "Farmer community — connect with experienced growers",
      "24/7 support via Kisan Call Centre helpline (1800-180-1551)",
      "English / Hindi language selection",
      "Phone + farmer card login, with dark mode",
    ],
    accent: "sage",
    icon: "sprout",
    year: "2025",
    github: "https://github.com/YASHdroid/v0-krishimitra-farmer-website",
    demo: "https://v0-krishimitra-farmer-website.vercel.app",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Programming Languages",
    icon: "braces",
    skills: [
      { name: "Python", note: "AI services, scripting" },
      { name: "C++", note: "DSA, competitive programming" },
      { name: "Java", note: "OOP, core CS" },
      { name: "JavaScript", note: "Browser & runtime" },
      { name: "SQL", note: "Queries & schema design" },
    ],
  },
  {
    id: "core-cs",
    name: "Core Computer Science",
    icon: "bookOpen",
    skills: [
      { name: "DSA", note: "Data structures & algorithms" },
      { name: "OOP", note: "Design patterns" },
      { name: "DBMS", note: "Database systems" },
      { name: "Operating Systems", note: "Processes, memory, threads" },
      { name: "Computer Networks", note: "Protocols & the web" },
    ],
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: "server",
    skills: [
      { name: "Node.js", note: "JS runtime" },
      { name: "Express.js", note: "REST APIs in production" },
      { name: "FastAPI", note: "Python async APIs" },
      { name: "PostgreSQL", note: "+ pgvector semantic search" },
      { name: "JWT", note: "Secure auth patterns" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "layoutDashboard",
    skills: [
      { name: "React", note: "Component-driven UIs" },
      { name: "Redux", note: "Predictable state" },
      { name: "Tailwind CSS", note: "Utility-first styling" },
      { name: "Vite", note: "Fast builds" },
    ],
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: "brainCircuit",
    skills: [
      { name: "Agentic RAG", note: "Tool-calling LLM agents" },
      { name: "pgvector", note: "Embeddings & cosine search" },
      { name: "Groq & Gemini", note: "LLM providers" },
      { name: "Generative AI", note: "Structured outputs" },
    ],
  },
  {
    id: "tools",
    name: "Infrastructure & Tools",
    icon: "wrench",
    skills: [
      { name: "Git", note: "Version control" },
      { name: "Docker", note: "Reproducible environments" },
      { name: "AWS", note: "Cloud basics" },
      { name: "Vercel & Render", note: "Deployment" },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    type: "professional",
    title: "Full-Stack Developer Intern — SkillifyMe",
    org: "SkillifyMe · Haryana-based architectural surface materials company",
    period: "2026",
    description:
      "Engineered the admin backend for a full-stack site on React/Vite (Vercel) and Node.js/Express/MongoDB (Render): JWT-based authentication, role-protected admin routes, and a product catalog managing 6 material categories with full CRUD controls. Designed and shipped 9+ REST API endpoints across admin, inquiry, and product management. Conducted a security review and closed 2 critical vulnerabilities — an unauthenticated admin-creation endpoint and unprotected data-mutating routes — before production handoff.",
  },
  {
    type: "activity",
    title: "Web Development Executive",
    org: "International Organisation of Software Developers (IOSD), MAIT",
    period: "2025 — Present",
    description:
      "Core member of the campus software development body — building web projects, contributing to technical events, and helping peers level up full-stack skills.",
  },
  {
    type: "project",
    title: "Builder — Scout (Agentic RAG Research Assistant)",
    org: "Personal Project",
    period: "2026",
    description:
      "Two-service system (FastAPI + Node/Express) with an LLM agent that chooses between Tavily web search and PDF search via tool calling. Built the pgvector RAG pipeline with cross-encoder re-ranking and a 5-stage deep-research workflow, hardened with 30+ mocked tests.",
  },
  {
    type: "project",
    title: "Builder — CodeLens (AI Code Review Platform)",
    org: "Personal Project",
    period: "2026",
    description:
      "AI code reviewer on Gemini 2.5 Flash with structured JSON output, review history, JWT + Google OAuth auth, and interview-oriented feedback across 4 programming languages.",
  },
  {
    type: "project",
    title: "Builder — DevTinder (Developer Networking Platform)",
    org: "Personal Project",
    period: "2025",
    description:
      "Full-stack networking platform with 10+ REST endpoints, JWT in HTTP-only cookies, a paginated feed serving 10 profiles per request, and Cloudinary-powered profile images.",
  },
  {
    type: "project",
    title: "Builder — Foodify (Restaurant Discovery & Cart)",
    org: "Personal Project",
    period: "2025",
    description:
      "Restaurant discovery SPA built on Redux Toolkit — a dedicated cart slice, client-side routing across Home/Help/Deals/About, search plus Top Rated filtering, and listings with ratings, delivery time and cost-for-two.",
  },
  {
    type: "project",
    title: "Builder — Carbon Tracker (Sustainability Platform)",
    org: "Personal Project",
    period: "2025",
    description:
      "React + Vite platform pairing a carbon footprint calculator with personal impact tracking, a rewards system, community eco-challenges, and a global impact dashboard.",
  },
];

export const achievements: AchievementItem[] = [
  {
    title: "CGPA 8.67 in B.Tech Computer Science & Technology",
    detail:
      "Maintained strong academic performance at Maharaja Agrasen Institute of Technology (MAIT) while shipping projects and interning.",
    year: "2024 — 2028",
  },
  {
    title: "Full-Stack Developer Internship — SkillifyMe",
    detail:
      "Shipped production admin backends, 9+ REST endpoints, and closed 2 critical security vulnerabilities before production handoff.",
    year: "2026",
  },
  {
    title: "Shipped 6 Production-Grade Projects",
    detail:
      "Scout (agentic RAG), CodeLens (AI code review), DevTinder (developer networking), Foodify (food ordering), Carbon Tracker (sustainability), and Krishimitra (farmer advisory) — all live with deployed frontends.",
    year: "2025 — 2026",
  },
  {
    title: "Web Development Executive — IOSD, MAIT",
    detail:
      "Selected as a core member of the International Organisation of Software Developers campus chapter.",
    year: "2025 — Present",
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    value: "choprayash601@gmail.com",
    href: "mailto:choprayash601@gmail.com",
    icon: "mail",
    description: "Best for collaboration, internships, or a quick hello.",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/YASHdroid",
    href: "https://github.com/YASHdroid",
    icon: "github",
    description: "Source code for Scout, CodeLens, DevTinder, and more.",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/yash-chopra-4578a830b",
    href: "https://www.linkedin.com/in/yash-chopra-4578a830b/",
    icon: "linkedin",
    description: "Professional updates, experience, and projects.",
  },
  {
    id: "leetcode",
    label: "Leetcode",
    value: "leetcode.com/u/yashchopra0022",
    href: "https://leetcode.com/u/yashchopra0022/",
    icon: "code",
    description: "Problem-solving practice in C++ and Python.",
  },
];

/**
 * Resume configuration — real resume file served from /public/resume.pdf.
 */
export const resume = {
  fileUrl: "/resume.pdf",
  available: true,
  placeholderNote: "",
  summary: [
    "B.Tech Computer Science & Technology student at MAIT (CGPA 8.67) focused on applied AI and full-stack engineering.",
    "Full-Stack Developer Intern at SkillifyMe — shipped admin backends, 9+ REST endpoints, and closed critical security vulnerabilities.",
    "Built agentic RAG systems (Scout), AI code review (CodeLens), and developer networking (DevTinder) — all deployed and live.",
  ],
  sections: [
    {
      heading: "Education",
      items: [
        `${profile.education.degree} · ${profile.education.institution} · ${profile.education.startYear} – ${profile.education.endYear} · CGPA 8.67`,
      ],
    },
    {
      heading: "Experience",
      items: [
        "SkillifyMe — Full-Stack Developer Intern (2026): JWT auth, product catalog, 9+ REST endpoints, security review",
        "IOSD, MAIT — Web Development Executive (2025 — Present)",
      ],
    },
    {
      heading: "Selected Projects",
      items: projects.map((p) => `${p.name} — ${p.tagline}`),
    },
    {
      heading: "Core Tech",
      items: [
        "Python, C++, Java, JavaScript, SQL",
        "React, Redux, Tailwind, Vite",
        "Node.js, Express, FastAPI, PostgreSQL + pgvector, MongoDB",
        "JWT, Docker, AWS, Git",
        "Agentic RAG, Groq, Gemini 2.5 Flash, Generative AI",
      ],
    },
    {
      heading: "Core CS",
      items: [
        "Data Structures & Algorithms",
        "OOP, DBMS, Operating Systems, Computer Networks",
      ],
    },
    {
      heading: "Contact",
      items: [
        "+91 8708390714 · New Delhi, India",
        "choprayash601@gmail.com",
        "github.com/YASHdroid · linkedin.com/in/yash-chopra-4578a830b",
      ],
    },
  ],
};

/**
 * Terminal commands. Each command returns lines of content.
 * Keep commands safe — they never shell out; they only return
 * portfolio content.
 */
export const terminalCommands = {
  help: [
    "Available commands:",
    "  help       — show this list",
    "  about      — who is Yash Chopra",
    "  projects   — list selected projects",
    "  skills     — list skill categories",
    "  contact    — show contact links",
    "  whoami     — quick identity",
    "  date       — current date & time",
    "  clear      — clear the terminal",
  ],
  about: [
    `${profile.name} — ${profile.role}`,
    `Based in ${profile.location}.`,
    `${profile.education.degree} at ${profile.education.institution} (CGPA 8.67).`,
    "",
    "Focus: agentic RAG, AI code intelligence, and building calm,",
    "intelligent software that people actually enjoy using.",
  ],
  projects: projects.map((p) => `  ${p.name.padEnd(14)} [${p.year}] ${p.tagline}`),
  skills: skillCategories.map(
    (c) => `  ${c.name}: ${c.skills.map((s) => s.name).join(", ")}`,
  ),
  contact: socialLinks.map((s) => `  ${s.label.padEnd(10)} ${s.href}`),
  whoami: [
    `${profile.name} — ${profile.role}`,
    "B.Tech CS&T @ MAIT · Full-Stack Intern @ SkillifyMe",
  ],
  date: [() => new Date().toString()],
} as const;
