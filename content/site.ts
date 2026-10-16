/**
 * Every fact and every sentence on this site lives here.
 *
 * Edit this file to update the site — the components read from it and never
 * hard-code copy. A string containing TODO fails the production build (see
 * next.config.ts); leave an unconfirmed fact as "" and it renders as nothing.
 */

import type { Diagram } from "@/components/diagram";

export const profile = {
  fullName: "Muhammad Nabil Bin Mohd Nizam",
  displayName: "Muhammad Nabil",
  shortName: "Naabel",
  role: "Software Engineering student",
  university: "Universiti Tun Hussein Onn Malaysia (UTHM)",
  universityShort: "UTHM",
  location: "Malaysia",
  // Under 160 characters so search results show it whole.
  metaDescription:
    "Muhammad Nabil, final-year Software Engineering student at UTHM, seeking internships. Mobile and web apps in Flutter, Next.js and Node.js, some with AI models.",
} as const;

export const links = {
  github: "https://github.com/naabelverse",
  githubHandle: "naabelverse",
  linkedin: "https://www.linkedin.com/in/naabel1910",
  linkedinHandle: "naabel1910",
  // Split so the address is assembled in the browser rather than sitting in
  // the served HTML as a scrapeable mailto: string.
  emailUser: "naabel.workspace",
  emailDomain: "gmail.com",
  forgeroomRepo: "https://github.com/naabelverse/ForgeRoom",
  resumeAnalyzerRepo: "https://github.com/naabelverse/ai-resume-analyzer",
  resumeAnalyzerLive: "https://ai-resume-analyzer-by-naabel.up.railway.app",
  resumeAnalyzerDemo:
    "https://ai-resume-analyzer-by-naabel.up.railway.app/analyze/demo",
  internshipTrackerLive: "https://internship-tracker-by-naabel.up.railway.app/",
  /**
   * The CV. Put the file at public/resume.pdf, then set this to "/resume.pdf".
   * While it is null, the Download CV button on /about and the CV row in the
   * contact block do not render, rather than shipping a link that 404s.
   */
  resume: null as string | null,
} as const;

export const emailAddress = `${links.emailUser}@${links.emailDomain}`;

/**
 * Canonical origin — the single source for metadataBase, the sitemap, robots
 * and every OG URL. Change it here if a custom domain is assigned.
 */
export const siteUrl = "https://portfolio-naabel.up.railway.app";

/** Footer line. No full stop: the footer adds its own, which pops in last. */
export const footerMotto = "Still curious. Still building";

/** Every section link. The header shows `headerNav`, which drops Contact. */
export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const navCta = { label: "Hire me for an internship", href: "/#contact" };

/** Header nav: drops any link the CTA button already goes to (Contact). */
export const headerNav = nav.filter((item) => item.href !== navCta.href);

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

export const hero = {
  headline: "Final-year software engineering student.",
  intro:
    "I build mobile and web apps, some with AI models inside them. I'm most interested in using AI to automate work people currently do by hand, and I want an internship where I can go deeper and build more.",
} as const;

/** A featured project: one chapter on the home page, with its diagram. */
export type Project = {
  slug: string;
  name: string;
  /** The case-study page's single badge. */
  badge: string;
  /** The home page's pair: what kind of project, then whether it is live. Kinds are Badge's. */
  badges: readonly (readonly ["live" | "offline" | "academic" | "personal", string])[];
  tagline: string;
  problem: string;
  approach: string;
  careful: string;
  outcome: string;
  stack: readonly string[];
  href: string;
  repo: string;
  /** A deployed URL. Its presence makes the badge `live` and adds "Try it yourself". */
  live?: string;
  diagram: Diagram;
};

/* -------------------------------------------------------------------------
   Work
   ------------------------------------------------------------------------- */

export const featuredProject = {
  slug: "forgeroom",
  name: "ForgeRoom",
  badge: "Final-year project",
  badges: [
    ["academic", "Final-year project"],
    ["offline", "Not live or public yet"],
  ],
  tagline:
    "Photograph a room, describe what you need, and get back a plan you can act on.",
  problem:
    "Students in rented rooms and first-time homeowners want a space that works. Design tools assume a budget, a floor plan, and vocabulary they don't have.",
  approach:
    "A photo, a description, the room's dimensions, and a chosen style go in. A vision model reads the room, an LLM reasons about it, and back comes a layout, a colour palette, and real furniture with prices in ringgit.",
  careful:
    "The furniture catalogue is someone else's service, so it will fail eventually. When it does, the plan still renders and product lookup falls back to cached samples. The user sees a design, not an error page.",
  outcome:
    "A working Android app on a live API, built as five modules against the objectives I set in Chapter 1 of my PSM.",
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
  diagram: {
    label:
      "Diagram: photo, description and dimensions go into a vision model and an LLM, producing a layout, palette and furniture list. If the catalogue is unreachable, cached samples are used.",
    caption:
      "The dashed path is the one I spent longest on. It is also the only one a user is guaranteed to hit eventually.",
    steps: [
      { lines: ["Room photo, description,|dimensions"], note: "and a style they picked" },
      {
        kind: "model",
        lines: ["Vision model reads the room", "LLM plans against|the dimensions"],
      },
      {
        kind: "output",
        lines: ["Layout notes and|colour palette", "Furniture with ringgit prices"],
      },
    ],
    fallback: {
      from: 2,
      label: "Catalogue down? Cached samples,|and the plan still renders.",
    },
  },
} as const satisfies Project;

export const resumeAnalyzerProject = {
  slug: "ai-resume-analyzer",
  name: "AI Resume Analyzer",
  badge: "Live and public",
  badges: [
    ["personal", "Personal project"],
    ["live", "Live and public"],
  ],
  tagline:
    "Upload a resume, get a score that shows its working and rewrites you can use.",
  problem:
    "Resume feedback is hard to get. Articles are generic, advisers are slow or cost money, and chat tools return a different score every time you ask, then an error when they fail.",
  approach:
    "The file is extracted in memory and never written to disk. A model rates six weighted dimensions inside a strict JSON schema. The score itself is computed in code, so the same resume always gets the same number.",
  careful:
    "Every failure I could provoke ends in a report rather than an error page: wrong file type, a scanned PDF with no text layer, a missing key, a timeout, malformed output. Zod validates the answer and the pipeline retries once before falling back to rules.",
  outcome:
    "Deployed and running. 559 tests pass in CI on every push to main, and all 12 resumes in the eval set land in their expected score band.",
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "shadcn/ui",
    "NVIDIA Nemotron",
    "Anthropic Claude",
    "Zod",
    "Vitest",
    "GitHub Actions",
  ],
  href: "/projects/ai-resume-analyzer",
  repo: links.resumeAnalyzerRepo,
  live: links.resumeAnalyzerLive,
  diagram: {
    label:
      "Diagram: a resume is extracted in memory, rated by a model against a schema, validated and scored in code. Invalid output retries once, then rules take over.",
    caption:
      "The model proposes. It does not decide the number, and it does not decide whether you get a page.",
    steps: [
      { lines: ["PDF or DOCX,|extracted in memory"] },
      {
        kind: "model",
        lines: ["Model rates six|weighted dimensions"],
        note: "inside a strict JSON schema",
      },
      {
        lines: ["Zod validates,|code computes the score"],
        note: "the model never decides|the number",
      },
      { kind: "output", lines: ["A report, every single time"] },
    ],
    fallback: { from: 2, to: 3 },
  },
} as const satisfies Project;

/* -------------------------------------------------------------------------
   Skills — grouped, honest, and each one backed by something on this page.
   ------------------------------------------------------------------------- */

export const skillGroups = [
  {
    title: "Languages",
    note: "Strongest first.",
    items: ["Dart", "JavaScript", "TypeScript", "Java", "C#", "SQL"],
  },
  {
    title: "Mobile",
    note: "Where most of my recent hours went.",
    items: ["Flutter", "Provider", "Material Design", "Android SDK"],
  },
  {
    title: "Web",
    note: "Page through to API route.",
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    title: "Services and data",
    note: "The part underneath.",
    items: ["Node.js", "Express", "MongoDB", "JWT auth", "REST design", "SQL Server"],
  },
  {
    title: "Models as components",
    note: "Used with a plan for failure.",
    items: ["GPT-4o vision", "Claude", "Nemotron", "Structured output", "Zod", "Fallbacks"],
  },
  {
    title: "Everyday kit",
    note: "Nothing exotic.",
    items: ["Git", "GitHub Actions", "VS Code", "Android Studio", "Postman", "Vitest", "Railway"],
  },
  {
    title: "Languages I speak",
    note: "",
    items: ["Malay (native)", "English (professional)"],
  },
] as const;

/* -------------------------------------------------------------------------
   Experience — an empty `period` or `description` renders as nothing.
   ------------------------------------------------------------------------- */

type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  description: string;
  /** For a project with no chapter of its own. Optional; empty renders nothing. */
  stack?: readonly string[];
  /** e.g. "Finalist". Optional; empty renders nothing. */
  result?: string;
  /** Repo or demo URL. Optional; empty renders nothing. */
  link?: string;
  /** Link text, when "View the project" would mislead (e.g. a teammate's repo). */
  linkLabel?: string;
};

/** An entry with an empty `title` is skipped entirely. */
export const timeline: readonly TimelineEntry[] = [
  {
    period: "March 2024 to 2027",
    title: "Bachelor of Software Engineering",
    org: "Universiti Tun Hussein Onn Malaysia",
    description:
      "Coursework includes machine learning, data science, software testing, and human computer interaction.",
  },
  {
    period: "Aug 2026 to Oct 2026",
    title: "AI Resume Analyzer",
    org: "Personal project",
    description:
      "Designed, built, tested and deployed on my own: a Next.js app with a constrained model pipeline on NVIDIA Nemotron or Claude, scoring in code, validated output, and a rule-based fallback. 559 tests run in CI, and a twelve-resume eval set checks that the scores land where they should.",
  },
  {
    // Date unconfirmed, so it sits beside the other personal project for now.
    period: "",
    title: "Internship Tracker",
    org: "Personal project",
    description:
      "A web app for tracking internship applications from saved through to offer, with a Kanban board, calendar view and analytics dashboard.",
    // Empty until confirmed.
    stack: [],
    link: links.internshipTrackerLive,
    linkLabel: "Try it live",
  },
  {
    period: "May 2026",
    title: "National Deep Tech Challenge 2026",
    org: "Universiti Malaya Centre of Innovation and Enterprise (UMCIE)",
    description:
      "With a team of five, built NutriScan Clinical in 24 hours: nurses photograph a patient's meal tray before and after, and a vision model flags anyone who ate under half.",
    result: "Participated",
    // The repo belongs to a teammate, so the label says whose it is.
    link: "https://github.com/muazramzii/nutriscan-clinical",
    linkLabel: "View the team's repo on GitHub",
  },
  {
    period: "",
    title: "ForgeRoom",
    org: "Final-year project",
    description:
      "Scope and requirements in Chapter 1, then the Flutter client, the Express API, the model pipeline, and alpha testing.",
  },
  {
    period: "2024 to 2025",
    title: "Coursework foundations",
    org: profile.universityShort,
    description:
      "Object-oriented programming in Java, database systems, and web development on the .NET stack.",
  },
  {
    period: "Dec 2022 to Feb 2024",
    title: "Clinic Assistant",
    org: "Remedic Clinic Jitra (Zip-Zip Group of Companies), Jitra, Kedah",
    description:
      "Patient registration, medical records, billing and stock. I also learned what the medicines we dispensed were for and how to assist with procedures.",
  },
  {
    period: "Dec 2021 to Oct 2022",
    title: "Resident Technician",
    org: "Zpeed Solutions Sdn Bhd, Perak",
    description:
      "Looked after campus IT infrastructure and wireless access points, closed support tickets against SLA targets, and wrote the monthly and quarterly incident reports.",
  },
  {
    period: "Aug 2021 to Nov 2021",
    title: "IT Support Intern",
    org: "Zpeed Solutions Sdn Bhd, Perak",
    description: "Where I started at Zpeed, before staying on as a resident technician.",
  },
  {
    period: "Jun 2018 to Feb 2022",
    title: "Diploma in Computer Engineering",
    org: "Universiti Malaysia Perlis (UniMAP)",
    description: "",
  },
];

/* -------------------------------------------------------------------------
   About
   ------------------------------------------------------------------------- */

export const about = {
  headline: "About me",
  tagline:
    "Final-year Software Engineering student at Universiti Tun Hussein Onn Malaysia (UTHM), Parit Raja, Johor",
  // Nabil's own account. Keep it close to verbatim; don't smooth it.
  paragraphs: [
    "I'm from Jitra, Kedah, and I came to software the long way round.",
    "After finishing my diploma in Computer Engineering at UniMAP in 2022, I had no intention of studying further. I wanted to work. I joined Zpeed Solutions in Perak, first as an IT support intern and then as a resident technician, looking after campus network infrastructure, troubleshooting wireless access points, and closing support tickets against SLA targets. I was there for about a year and a half. It was my first real job and it taught me what it feels like when something you're responsible for stops working and someone is waiting on you to fix it.",
    "When I moved back to Kedah, there wasn't much computer engineering work around Jitra. What I found instead was a job as a clinic assistant, and I did it for just over a year. On paper it was registration, medical records, billing and stock. In practice I learned a lot more than that: what the medicines we dispensed were for, how to assist with the procedures that came through, and how to keep records that someone else could rely on later. I also learned how to talk to people who are worried and want a straight answer, which is harder than it sounds.",
    "None of it was software. But it was the first time I was responsible for something where getting it wrong mattered to a real person, and that has stayed with me.",
    "I kept thinking I could be doing more. Not that there was anything wrong with the work. It just wasn't where I wanted to end up, and the longer I stayed the wider that gap felt.",
    "So I applied to study again. This time not computer engineering but software engineering, because the part I'd always liked was building the thing, not maintaining it. I started at UTHM in March 2024.",
    "I'm in my final year now and it finishes soon. Most of what I know I learned by building something that didn't work yet and staying with it until it did. That's still how I work: I pick something slightly beyond what I know how to do, and I don't stop until it runs.",
  ],
  /** Newest first. */
  committees: {
    title: "Committee work",
    items: [
      { role: "Assistant Head Committee", event: "25th UTHM Convocation Festival", period: "Dec 2025" },
      { role: "Head Committee", event: "Sayembara Pantun Teknologi Era Baharu (SUTERA) 2025", period: "Oct 2025" },
      { role: "Facilitator", event: "Minggu Haluan Siswa orientation week", period: "Sep 2025" },
      { role: "Sub-Committee", event: "UTHM Inter-Faculty Sports 2024", period: "Nov 2024" },
      { role: "Head Committee", event: "FSKTM Dean's Award Ceremony", period: "Jun 2024" },
    ],
  },
  lookingFor: {
    title: "What I'm looking for",
    body: "A software engineering internship where I can work on a real product with people who review my code. I'm most useful in mobile or backend work, I'm comfortable being the least experienced person in the room, and I'd rather be told my approach is wrong early than find out late.",
    /** Internship intake, e.g. "March to August 2027". Empty drops the clause. */
    intake: "February to July 2027",
    // Non-breaking hyphen (U+2011) so "on-site" never splits across lines.
    workMode: "on‑site or hybrid work in Malaysia",
    details: ["Most interested in mobile development, backend APIs and applied AI"],
  },
} as const;

/* -------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------- */

export const contact = {
  title: "Let's talk about an internship",
  description:
    "I'm looking for a software engineering internship in Malaysia, on-site or hybrid. Send a message and I'll reply within a couple of days.",
} as const;
