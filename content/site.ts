/**
 * Every fact and every sentence on this site lives here.
 *
 * Edit this file to update the site — the components read from it and never
 * hard-code copy. Anything marked `TODO(nabil)` is something only Nabil can
 * confirm; search the repo for that marker before deploying.
 */

export const profile = {
  fullName: "Muhammad Nabil Bin Mohd Nizam",
  displayName: "Muhammad Nabil",
  shortName: "Nabil",
  role: "Software Engineering student",
  university: "Universiti Tun Hussein Onn Malaysia (UTHM)",
  universityShort: "UTHM",
  location: "Malaysia",
  // Used for <title>, OG cards, and the JSON-LD Person schema.
  tagline:
    "Final-year software engineering student building full-stack, AI-assisted products.",
  metaDescription:
    "Muhammad Nabil — final-year Software Engineering student at UTHM. Flutter, Next.js and TypeScript, Node.js and MongoDB, with AI-assisted product work. Seeking a software engineering internship.",
} as const;

export const links = {
  github: "https://github.com/naabelverse",
  githubHandle: "naabelverse",
  linkedin: "https://www.linkedin.com/in/muhammad-nabil-82b16642b",
  linkedinHandle: "muhammad-nabil",
  // Split so the address is assembled in the browser rather than sitting in
  // the served HTML as a scrapeable mailto: string.
  emailUser: "naabel.workspace",
  emailDomain: "gmail.com",
  forgeroomRepo: "https://github.com/naabelverse/ForgeRoom",
  resumeAnalyzerRepo: "https://github.com/naabelverse/ai-resume-analyzer",
  resumeAnalyzerLive: "https://ai-resume-analyzer-by-naabel.up.railway.app",
  resumeAnalyzerDemo:
    "https://ai-resume-analyzer-by-naabel.up.railway.app/analyze/demo",
  /**
   * TODO(nabil): drop your CV at public/resume.pdf, then change this to
   * "/resume.pdf". While it stays null, every "Download CV" button is replaced
   * with a working alternative rather than shipping a link that 404s.
   */
  resume: null as string | null,
} as const;

export const emailAddress = `${links.emailUser}@${links.emailDomain}`;

/**
 * Canonical origin — the single source for metadataBase, the sitemap, robots
 * and every OG URL. Change it here if a custom domain is assigned.
 */
export const siteUrl = "https://portfolio-naabel.up.railway.app";

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Background", href: "/#background" },
  { label: "About", href: "/about" },
] as const;

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

export const hero = {
  // TODO(nabil): confirm the intake, or delete this badge entirely.
  availability: "Available for internship — TODO(nabil): intake",
  headline: "I build mobile and web apps, and the services and AI behind them.",
  intro:
    "I'm Nabil, a final-year Software Engineering student at UTHM. My final-year project turns a photo of a room into a complete interior design plan — a Flutter app on the front, a Node.js and MongoDB API behind it, and a vision model plus an LLM doing the reasoning in between.",
  secondary:
    "I care about software that holds up when the network is slow, the API key is missing, or the user does something unexpected.",
  primaryCta: {
    label: "Read the ForgeRoom case study",
    href: "/projects/forgeroom",
  },
  /** Used only while `links.resume` is null. */
  fallbackCta: { label: "See my background", href: "/#background" },
} as const;

/**
 * Four facts a recruiter can absorb in one glance. Every number here is
 * measured from the real repository, not estimated.
 */
export const proofStrip = [
  { label: "Primary stack", value: "Flutter · Node.js · MongoDB" },
  { label: "Final-year project", value: "~18K lines of Dart, 50 commits" },
  { label: "Also builds in", value: "TypeScript · Java · C# · SQL" },
  { label: "Based in", value: "Malaysia · UTHM" },
] as const;

/* -------------------------------------------------------------------------
   Work
   ------------------------------------------------------------------------- */

export const featuredProject = {
  slug: "forgeroom",
  name: "ForgeRoom",
  eyebrow: "Final-year project · PSM",
  tagline: "Multi-modal AI-assisted interior design for Malaysian homes",
  problem:
    "First-time homeowners and students in rented rooms want a space that works, but design tools assume a budget, a floor plan, and vocabulary they don't have.",
  approach:
    "ForgeRoom takes what someone already has — a photo, a rough description, the room's dimensions, and a style they like — and returns a plan they can act on: layout guidance, a colour palette, decoration ideas, and real furniture products with links.",
  outcome:
    "A working Android app backed by a live API, built as five modules against the objectives set in my PSM Chapter 1.",
  stack: [
    "Flutter",
    "Dart",
    "Provider",
    "Node.js",
    "Express",
    "MongoDB Atlas",
    "JWT",
    "GPT-4o vision",
    "Claude",
  ],
  href: "/projects/forgeroom",
  repo: links.forgeroomRepo,
} as const;

export const resumeAnalyzerProject = {
  slug: "ai-resume-analyzer",
  name: "AI Resume Analyzer",
  eyebrow: "Personal project · Live",
  tagline: "Upload a resume, get a scored review with concrete rewrites.",
  problem:
    "Useful resume feedback is hard to get: articles are generic, advisers are slow or cost money, and AI chat tools give a different score each time and an error when they fail.",
  approach:
    "A Next.js app that extracts the resume in memory and has NVIDIA's Nemotron rate six weighted dimensions inside a strict JSON schema. Code then computes the score, validates the answer with Zod and retries once if it has to.",
  outcome:
    "Live on Railway with 538 passing tests. Every failure I could provoke — wrong file type, scanned PDF, missing key, timeout, malformed output — ends in a rule-based report, not an error page.",
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "NVIDIA Nemotron",
    "Zod",
    "unpdf",
    "mammoth",
    "Vitest",
    "Railway",
  ],
  href: "/projects/ai-resume-analyzer",
  repo: links.resumeAnalyzerRepo,
  live: links.resumeAnalyzerLive,
} as const;

export const otherWork = [
  {
    name: "Inventory Management System",
    context: "Java · OOP coursework",
    description:
      "A Java inventory system for Susur Ilham Sdn. Bhd., built to demonstrate object-oriented design: an Item base class with ElectronicItem inheriting from it, state encapsulated behind getters and setters, and an InventoryManager handling search, sorting, category reports, total inventory value, and file-based persistence.",
    stack: ["Java", "OOP", "File I/O"],
    // TODO(nabil): push this to GitHub and paste the URL here.
    repo: null,
  },
  {
    name: "TinyTots Web App",
    context: "ASP.NET Web Forms · C#",
    description:
      "A child-registration system: register a child, list every registration, and edit an existing record, with the data persisted in a SQL Server database. My first end-to-end CRUD application on the .NET stack.",
    stack: ["C#", "ASP.NET", "SQL Server"],
    // TODO(nabil): push this to GitHub and paste the URL here.
    repo: null,
  },
  {
    name: "University coursework",
    context: "C# · .NET · databases",
    description:
      "Smaller builds from lab work: ASP.NET MVC pages with Entity Framework Core, a .NET 8 Razor charting demo, and database exercises against MySQL and SQL Server. Not portfolio pieces on their own, but where most of the fundamentals came from.",
    stack: [".NET 8", "EF Core", "MySQL"],
    repo: null,
  },
] as const;

/* -------------------------------------------------------------------------
   Skills — grouped, honest, and each one backed by something on this page.
   ------------------------------------------------------------------------- */

export const skillGroups = [
  {
    title: "Languages",
    description: "What I write day to day, strongest first.",
    items: [
      "Dart",
      "JavaScript",
      "TypeScript",
      "Java",
      "C#",
      "SQL",
      "HTML & CSS",
    ],
  },
  {
    title: "Mobile",
    description: "Where most of my recent hours have gone.",
    items: [
      "Flutter",
      "Provider state management",
      "Material Design",
      "Android SDK (API 29+)",
    ],
  },
  {
    title: "Web",
    description: "Full-stack TypeScript, from the page to the API route.",
    items: ["Next.js (App Router)", "React", "Tailwind CSS"],
  },
  {
    title: "Backend & data",
    description: "APIs, auth, and the storage underneath.",
    items: [
      "Node.js",
      "Express",
      "MongoDB & Mongoose",
      "JWT authentication",
      "REST API design",
      "MySQL · SQL Server",
    ],
  },
  {
    title: "AI integration",
    description: "Using models as components, with a plan for when they fail.",
    items: [
      "OpenAI GPT-4o (vision)",
      "Anthropic Claude",
      "NVIDIA NIM (Nemotron)",
      "Structured LLM output",
      "Zod schema validation",
      "Prompt construction",
      "Fallback & degradation strategy",
    ],
  },
  {
    title: "Tooling",
    description: "The everyday kit.",
    items: [
      "Git & GitHub",
      "VS Code",
      "Android Studio",
      "npm",
      "Postman",
      "Vitest",
      "Railway",
    ],
  },
] as const;

/* -------------------------------------------------------------------------
   Background
   ------------------------------------------------------------------------- */

export const timeline = [
  {
    period: "TODO(nabil): year – year",
    title: "Bachelor of Software Engineering",
    org: profile.university,
    description:
      "TODO(nabil): add your CGPA if you're happy to publish it, plus any notable results, awards, or leadership roles.",
  },
  {
    period: "Aug 2026",
    title: "AI Resume Analyzer",
    org: "Personal project",
    description:
      "Designed, built, tested and deployed a full-stack resume reviewer on my own: a Next.js app with an NVIDIA Nemotron pipeline, scores computed in code, Zod-validated output and a rule-based fallback.",
  },
  {
    period: "TODO(nabil): year",
    title: "ForgeRoom — Projek Sarjana Muda (PSM)",
    org: "Final-year project",
    description:
      "Designed and built a multi-modal AI interior design app end to end: requirements and scope in Chapter 1, then the Flutter client, the Express API, the AI pipeline, and alpha testing.",
  },
  {
    period: "TODO(nabil): year",
    title: "Coursework foundations",
    org: profile.universityShort,
    description:
      "Object-oriented programming in Java, database systems, and web application development on the .NET stack — the Inventory Management System and TinyTots came out of this work.",
  },
  {
    period: "TODO(nabil): add or delete",
    title: "TODO(nabil): work experience, part-time roles, or clubs",
    org: "TODO(nabil)",
    description:
      "Delete this entry if it doesn't apply. Anything counts — a part-time job, a committee role, a hackathon, a freelance build.",
  },
] as const;

/* -------------------------------------------------------------------------
   About
   ------------------------------------------------------------------------- */

export const about = {
  headline: "About me",
  paragraphs: [
    "I'm Muhammad Nabil, a final-year Software Engineering student at Universiti Tun Hussein Onn Malaysia. Most of what I know I learned by building something that didn't work yet and staying with it until it did.",
    "My final-year project, ForgeRoom, is the clearest example. It started as a question — could someone renting a room get a genuinely useful design plan from a single photo? — and became a Flutter app, an Express API, a MongoDB database, and a pipeline that hands a room photo to a vision model and the analysis to an LLM. Along the way I rebuilt the codebase once, from scratch, because the first version had grown into something I could no longer reason about.",
    "The habit I'm proudest of is designing for the unhappy path. ForgeRoom runs its full flow with no API keys at all, falling back to mock responses, because a demo that dies when a key expires isn't a demo. That instinct — assume it will fail, decide now what happens then — is what I'd bring to a team.",
  ],
  lookingFor: {
    title: "What I'm looking for",
    body: "A software engineering internship where I can work on a real product with people who review my code. I'm most useful in mobile or backend work, I'm comfortable being the least experienced person in the room, and I'd rather be told my approach is wrong early than find out late.",
    // TODO(nabil): confirm all three before publishing.
    details: [
      "Available: TODO(nabil): intake / dates",
      "Open to: on-site in TODO(nabil): city, hybrid, or remote",
      "Interests: mobile development, backend APIs, applied AI",
    ],
  },
} as const;

/* -------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------- */

export const contact = {
  eyebrow: "Contact",
  title: "Let's talk about an internship",
  description:
    "The fastest way to reach me is the form — it goes straight to my inbox. GitHub and LinkedIn work just as well.",
  formNote: "I read everything and reply within a couple of days.",
} as const;
