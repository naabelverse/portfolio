/**
 * AI Resume Analyzer case study.
 *
 * Every claim here is traceable to the repository at
 * https://github.com/naabelverse/ai-resume-analyzer — its README, the rubric
 * weights in lib/schema/analysis.ts, the prompt rules in lib/ai/prompts.ts,
 * and the route handlers under app/api. Benchmarks are single measurements and are
 * described as such; none of them is an average. The eval table is copied
 * from eval-report.txt (gitignored; `pnpm test:eval` regenerates it), and
 * its means are averages of three runs, as the section says.
 */

import type { StackGroup } from "@/components/ui/primitives";

const SCREENSHOTS = "/projects/ai-resume-analyzer";

export type Screenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Full browser viewport (gets window chrome) rather than a cropped card. */
  viewport?: boolean;
};

export const resumeAnalyzer = {
  name: "AI Resume Analyzer",
  tagline: "Upload a resume, get a scored review with concrete rewrites.",

  seo: {
    title: "AI Resume Analyzer case study",
    description:
      "Case study: a Next.js app on NVIDIA Nemotron or Claude that scores resumes out of 100, rewrites weak bullets and matches job keywords, with validated AI output and a fallback.",
    keywords: [
      "AI resume analyzer",
      "resume feedback tool",
      "Next.js AI project",
      "LLM structured output",
      "Zod schema validation",
      "NVIDIA Nemotron",
      "Anthropic Claude API",
      "full-stack TypeScript",
      "ATS resume checker",
    ],
  },

  cover: {
    src: `${SCREENSHOTS}/cover.webp`,
    width: 1600,
    height: 900,
    alt: "Desktop browser window showing the AI Resume Analyzer results page with a score of 72, beside a phone showing the same score gauge.",
    caption: "AI Resume Analyzer on desktop and mobile.",
  } satisfies Screenshot,

  /** The full stack. The home chapter keeps its own shorter list in site.ts. */
  stack: [
    ["Full stack", ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"]],
    ["AI", ["NVIDIA NIM (Nemotron)", "Anthropic Claude API", "Zod"]],
    ["Parsing", ["unpdf", "mammoth"]],
    ["Tests & CI", ["Vitest", "GitHub Actions"]],
    ["Hosting", ["Railway"]],
  ] satisfies readonly StackGroup[],

  meta: [
    {
      label: "Role",
      value:
        "Sole developer across product, frontend, backend, AI pipeline, testing and deployment",
    },
    { label: "Type", value: "Personal project" },
    { label: "Timeline", value: "Aug 2026 to Oct 2026" },
    { label: "Status", value: "Live" },
  ],

  stats: [
    { label: "Automated tests", value: "559" },
    { label: "Scored resume sections", value: "6" },
    { label: "API routes", value: "6" },
    { label: "Eval set in band", value: "12/12" },
  ],

  problem: {
    title: "The problem",
    paragraphs: [
      "Useful resume feedback is hard to get. Articles give generic advice like “use action verbs” and “add keywords”, and a careers adviser or recruiter's time is slow and often costs money.",
      "General-purpose AI chat tools will write a review, but the score shifts each time you ask, the advice rarely points at a specific line, and when the service is busy or returns something malformed you get an error and nothing else. That's a poor deal for a graduate preparing applications, or a career changer tailoring one resume to several roles.",
    ],
  },

  goal: "Return feedback that quotes the candidate's own lines, with a score that is calculated rather than guessed. If the AI fails for any reason, return a rule-based report instead of an error page.",

  architecture: {
    summary:
      "One request, three stages. The browser owns the upload, the preview and the report; the API routes check and extract the file in memory; the model only judges, while code computes the numbers, validates the answer and falls back when it has to.",
    layers: [
      {
        name: "Next.js client",
        items: [
          "PDF or DOCX upload + job description",
          "Text preview before analysis",
          "Staged progress bar",
          "Results UI and session history",
        ],
      },
      {
        name: "API routes",
        items: [
          "File-type check by leading bytes",
          "In-memory extraction (unpdf and mammoth)",
          "Rule-based pre-checks",
          "/api/extract, /api/analyze",
        ],
      },
      {
        name: "AI & validation",
        items: [
          "NVIDIA Nemotron or Claude, schema-constrained JSON",
          "Code computes scores and match %",
          "Zod validation, one retry",
          "Rule-based fallback report",
        ],
      },
    ],
  },

  modules: [
    {
      index: "01",
      name: "Upload and extraction",
      summary: "A PDF or Word file in; the exact text the AI will read out.",
      detail:
        "Drop in a PDF or .docx resume of up to 5 MB. The server checks what the file really is by reading its leading bytes, so a PDF renamed to .docx gets a clear message rather than a parser error. The text is extracted in memory with unpdf or mammoth and the file is never written to disk. Before anything is sent to the model, the app shows that text. It is exactly what the AI will read, so a badly parsed file shows up before you wait for a review of it.",
      screenshots: [
        {
          src: `${SCREENSHOTS}/03-text-preview-desktop.webp`,
          width: 1440,
          height: 900,
          viewport: true,
          alt: "Uploaded fictional resume 'jordan-example-resume.pdf' with its extracted plain text shown in a grey monospace panel, beside a pasted job description.",
          caption:
            "Before anything is analysed, the app shows the exact text it extracted from the file.",
        },
      ],
    },
    {
      index: "02",
      name: "Hybrid scoring",
      summary: "The model judges; code does the arithmetic.",
      detail:
        "Plain code first counts words, bullets and section headings and hands those counts to the model as facts, since language models are unreliable at counting. The model then rates six rubric dimensions inside a strict JSON schema. The app applies the weights to produce the score out of 100: impact 30%, relevance 20%, clarity and structure 15% each, skills and ATS 10% each. It derives the verdict from that number, so the score and its label can never disagree.",
      screenshots: [
        {
          src: `${SCREENSHOTS}/05-results-score-desktop.webp`,
          width: 1440,
          height: 900,
          viewport: true,
          alt: "Results page showing a circular score gauge reading 72 out of 100 labelled 'Needs work', a short summary, and a 'Why this score' explanation, with the start of the section breakdown and AI feedback below.",
          caption:
            "The report opens with the overall score and the reasoning behind it.",
        },
        {
          src: `${SCREENSHOTS}/05-results-score-mobile.webp`,
          width: 780,
          height: 1688,
          alt: "Phone-width results page for the built-in sample report: the score gauge reading 72 out of 100, labelled 'Needs work', with the summary underneath. All data is fictional.",
          caption: "The same report on a phone.",
        },
      ],
    },
    {
      index: "03",
      name: "Section feedback and things to fix",
      summary: "Six scored sections, and feedback that quotes the resume.",
      detail:
        "Contact, summary, experience, education, skills and formatting each get a score, a Pass / Needs work / Poor label and a short note. Labels are derived from the score in code, so a lower number can never carry a better label. Feedback items are graded pass, warn or fail, listed with the most serious first, and each one opens to a detail that quotes the candidate's own lines. A separate “Things to fix” list catches smaller problems such as gaps and typos.",
      screenshots: [
        {
          src: `${SCREENSHOTS}/06b-results-ai-feedback-desktop.webp`,
          width: 610,
          height: 391,
          alt: "AI feedback card with six collapsible items: one red cross for contact details in the page header, three amber warnings, and two green ticks.",
          caption:
            "Feedback items are graded pass, warn or fail, with the most serious first.",
        },
        {
          src: `${SCREENSHOTS}/07-results-things-to-fix-desktop.webp`,
          width: 1200,
          height: 178,
          alt: "'Things to fix' card with two amber items: a nine-month employment gap and two spelling errors, each with a suggested fix.",
          caption:
            "Smaller issues, such as an unexplained gap or typos, get their own list.",
        },
      ],
    },
    {
      index: "04",
      name: "AI bullet rewrites",
      summary: "Duties turned into achievements, without inventing the numbers.",
      detail:
        "Each weak bullet sits beside an improved version and the reason for the change, with one-click copy. Numbers only the candidate knows are left as [X] placeholders to fill in, and if the model writes a new figure anyway, code replaces it with [X] before the report is shown.",
      example: {
        before: "Responsible for maintaining the booking service.",
        after:
          "Maintained a booking service handling [X] requests/day, cutting p95 latency from [X]ms to [X]ms.",
        why: "Turns a duty into an outcome, and names the service it happened to.",
        source: "From the built-in sample report. All values are fictional.",
      },
      screenshots: [
        {
          src: `${SCREENSHOTS}/08-results-bullet-rewrites-desktop.webp`,
          width: 1200,
          height: 632,
          alt: "Suggested bullet rewrites card showing three pairs of 'Original' and 'Improved' bullet points with a Copy button and a 'Why' line under each; numbers to be filled in are marked [X].",
          caption:
            "Weak bullet points side by side with an improved version and the reason for it.",
        },
      ],
    },
    {
      index: "05",
      name: "Job-description keyword matching",
      summary: "What the role asks for, what the resume shows, and the gap.",
      detail:
        "Paste a job posting and the model lists the role's terms that the resume covers and the ones it misses. It is told to judge presence semantically, so a skill described in different words still counts, and never to mark something missing just because the literal term is absent. The match percentage is not the model's: code calculates it from the two lists.",
      screenshots: [
        {
          src: `${SCREENSHOTS}/09-results-keyword-match-desktop.webp`,
          width: 610,
          height: 402,
          alt: "Keyword match card with six green 'in your resume' pills (TypeScript, React, Node.js, PostgreSQL, REST APIs, Git), four grey 'not found' pills (Kubernetes, CI/CD, GraphQL, AWS) and a bar reading 'Matched 6/10 keywords, 60%'.",
          caption:
            "Keywords from the job description that the resume covers, and the ones it misses.",
        },
      ],
    },
    {
      index: "06",
      name: "History, sample report and fallback",
      summary: "Every path ends in a report, never an error page.",
      detail:
        "If the AI is unavailable, rate-limited, slow or returns something unusable, the user still gets a rule-based report on contact details, headings, bullets and length, with a banner explaining what happened. The score gauge is deliberately hidden in this mode, so a structural check is never passed off as a quality grade. Past analyses are listed for the browser session with score, date, a link back and a delete action; the extracted resume text itself is never stored. A built-in sample report shows the full result on fictional data, without an AI call.",
      screenshots: [
        {
          src: `${SCREENSHOTS}/11-fallback-report-desktop.webp`,
          width: 1440,
          height: 900,
          viewport: true,
          alt: "Fallback report with an amber banner saying the analysis couldn't finish and offering 'Upload it again', followed by 'What we found' and 'Automated checks' cards with green ticks and amber warnings, and a keyword panel explaining matching needs the AI review.",
          caption:
            "With no AI available, the user still gets a rule-based report and a clear explanation.",
        },
      ],
    },
  ],

  decisions: [
    {
      title: "Code computes the score, not the model",
      decision:
        "The model rates six weighted dimensions; code combines them into the score out of 100, and derives the verdict, the section labels and the keyword match percentage the same way.",
      why: "Asked for a single 0–100 number, the model returned the midpoint of a rubric band almost every time, leaving about five reachable values on a hundred-point gauge. Arithmetic is the one part I can guarantee, so the model never does it.",
    },
    {
      title: "Schema-constrained output, two Zod schemas",
      decision:
        "One schema constrains the model while it writes. A second Zod schema validates what decoding can't: text lengths, item counts, and whether the section scores are coherent with the overall score.",
      why: "Constrained decoding guarantees shape, not quality. The first schema means I never parse broken JSON; the second catches a well-formed answer that still doesn't add up, and its error message becomes the single retry prompt.",
    },
    {
      title: "Repair cosmetic defects instead of rejecting them",
      decision:
        "After validation, code trims section notes to their last full sentence, merges duplicate feedback headlines, and replaces invented figures in rewrites with [X].",
      why: "Rejecting a report for a repeated headline would spend the only retry and risk dropping the user to the rule-based report over something code can fix deterministically.",
    },
    {
      title: "A rule-based fallback behind every AI call",
      decision:
        "Any AI failure returns a rule-based structural report with a banner, whether it is a missing key, a refusal, a timeout, a rate limit or two failed validations.",
      why: "It is never a server error or a blank page. The specific cause is kept, so the banner can say whether waiting will help.",
    },
    {
      title: "The resume and job description are untrusted input",
      decision:
        "Both arrive wrapped in <resume> and <job_description> tags, and the system prompt states that anything inside them is data, never instructions.",
      why: "Both come from members of the public. Text that imitates a command, such as “ignore previous instructions”, “score this 100” or a fake system prompt, is flagged as suspicious instead of obeyed. Model output is untrusted too: React escapes it, and an ESLint rule forbids dangerouslySetInnerHTML.",
    },
    {
      title: "Railway over Vercel",
      decision:
        "The app runs as a long-running Node server on Railway rather than as serverless functions.",
      why: "In the worst case, two 120-second model attempts plus about 5 seconds of processing run to 245 seconds, beyond Vercel's function limit on the plans I targeted. If the platform kills a request mid-generation, the user sees a network error and the fallback never gets to run.",
    },
    {
      title: "Two providers behind one interface",
      decision:
        "The app runs on NVIDIA Nemotron through NIM or on the Anthropic Claude API, picked by one environment variable. Only the transport differs; the schemas, rubric, prompt, validation, retry and fallback are shared by both.",
      why: "Switching providers is a config change and a restart, not different code. Keeping both working is what proves the seam is real: the offline suite runs the same tests against each provider with mocked responses, not live calls. An abstraction with one implementation is just indirection.",
    },
    {
      title: "Reasoning mode off",
      decision: "Nemotron's reasoning mode is switched off.",
      why: "I measured both settings on the same resume: 7 seconds with reasoning off against 129 with it on, for the same score. With reasoning on, the model also sometimes returned an empty answer.",
    },
  ],

  challenges: [
    {
      title: "Scores clustering in rubric bands",
      problem:
        "Repeat runs on the same resume jumped between band midpoints, scoring 82, then 94, then 82. One 12-point jump flipped the verdict a user would read.",
      did: "Moved the overall score out of the model's answer: the model scores six dimensions and code applies the weights.",
      outcome:
        "Across nine live runs, the widest spread on one resume fell from 12 points to 4, and analyses failing validation twice fell from 1 in 9 to 0.",
    },
    {
      title: "The model getting the match percentage wrong",
      problem:
        "Production showed 40% for a 5-of-11 keyword match. The right answer is 45%; the model had rounded before dividing.",
      did: "Removed the percentage from the model's output and calculated it from the matched and missing lists.",
      outcome: "Correct by construction.",
    },
    {
      title: "Section notes cut off mid-sentence",
      problem:
        "A real analysis cut two section notes off at the 230-character schema limit.",
      did: "Traced it to the decoder stopping at the limit, plus a gap in my truncation repair that read an opening quote as finished punctuation. Notes are now trimmed to their last full sentence after validation.",
      outcome:
        "The follow-up real run passed first time, in 14.4 seconds, with no truncated notes.",
    },
    {
      title: "Invented figures in rewrites",
      problem:
        "The same run invented figures such as “15+ product pages” in its bullet rewrites, numbers the candidate never wrote.",
      did: "New numbers in a rewrite are replaced with [X] in code, after validation, rather than rejected and retried.",
      outcome:
        "The follow-up real run had none, and the retry stays available for problems code can't fix.",
    },
    {
      title: "Slow responses with reasoning on",
      problem:
        "With the model's reasoning mode on, one resume took 129 seconds and sometimes came back empty.",
      did: "Measured both settings on the same resume, then turned reasoning off.",
      outcome: "7 seconds against 129, with the same score. That is one benchmark, not an average.",
    },
    {
      title: "Runaway whitespace responses",
      problem:
        "The model sometimes stopped writing JSON and emitted whitespace until its token limit: one response was 16,384 tokens, 91.9% whitespace, and took up to 187 seconds.",
      did: "Capped output at 4,000 tokens against a largest real response of 1,645, and made the retry quote the validator's error and the model's previous output.",
      outcome:
        "A runaway now ends in a correctly labelled fallback in about 13 seconds instead of about 150. It still happens; the cap limits the cost.",
    },
    {
      title: "The upload form overflowing on phones",
      problem:
        "With a file selected, the upload preview and the job-description box ran past the card's edge at 390px, and at 320 and 360px the whole page scrolled sideways.",
      did: "Traced it to the form grid. Below 880px it had no column template, so its one column was an implicit auto track that could not shrink below the file name, which is set not to wrap. Giving the grid an explicit single column lets the track shrink to the card.",
      outcome:
        "The form stays inside the card and a long file name truncates, as the preview always meant it to. The desktop layout is unchanged.",
      screenshots: [
        {
          src: `${SCREENSHOTS}/03-text-preview-mobile.webp`,
          width: 780,
          height: 1688,
          alt: "Phone-width upload card with a fictional DOCX selected, its name cut short to 'Jordan_Example_Res…' inside the card, above a grey preview of the extracted text: the name Jordan Example, an example.com email, a 555 phone number and a one-line summary.",
          caption: "After the fix: the form fits the card at 390px.",
        },
      ],
    },
  ],

  evaluation: {
    title: "How I measured it",
    lede: "Twelve resumes with known answers, so a prompt or model change is judged on numbers rather than by reading one report.",
    paragraphs: [
      "The eval set is four professions (backend developer, nurse, junior designer and accountant) at three strength levels, each resume scored against a job description in its own field. A strong resume should land between 80 and 100, a middling one between 55 and 70, and a weak one between 0 and 44.",
      "Each resume is scored three times and the mean is checked against its band. One run was not enough: on identical text, one dimension swung by about four points of overall score between runs, and a single-run suite failed on noise. Getting to green also meant fixing three of my own fixtures rather than the model: two strong resumes counted volume instead of outcomes, and one middling resume lacked the job's hard requirements.",
      "The run in the table is from 15 October 2026, on Nemotron only. It has not been run against Claude. It is also not part of CI, because its 36 live calls spend API credits. The 559 offline tests are part of CI: GitHub Actions runs lint, the tests and a build on every pull request and push to main, CodeQL scans the code, and Dependabot proposes dependency updates.",
    ],
    caption: "Eval run, 15 October 2026, Nemotron. Mean of three runs per resume.",
    result:
      "All 12 resumes landed in their band, and in all four professions strong scored above middling and middling above weak.",
    rows: [
      { profession: "Backend developer", level: "Strong", band: "80–100", mean: "90.0" },
      { profession: "Backend developer", level: "Middling", band: "55–70", mean: "59.3" },
      { profession: "Backend developer", level: "Weak", band: "0–44", mean: "28.3" },
      { profession: "Nurse", level: "Strong", band: "80–100", mean: "86.7" },
      { profession: "Nurse", level: "Middling", band: "55–70", mean: "62.3" },
      { profession: "Nurse", level: "Weak", band: "0–44", mean: "23.7" },
      { profession: "Junior designer", level: "Strong", band: "80–100", mean: "86.0" },
      { profession: "Junior designer", level: "Middling", band: "55–70", mean: "62.0" },
      { profession: "Junior designer", level: "Weak", band: "0–44", mean: "26.7" },
      { profession: "Accountant", level: "Strong", band: "80–100", mean: "88.0" },
      { profession: "Accountant", level: "Middling", band: "55–70", mean: "59.0" },
      { profession: "Accountant", level: "Weak", band: "0–44", mean: "31.3" },
    ],
  },

  reflection: [
    "What I'd do differently: compute every number in code from the first commit, instead of moving the score out of the model after watching it cluster.",
    "What I'd add next: run the eval set against Claude too, so the two providers are compared on numbers rather than assumed equal. Then give the Anthropic provider the same rate-limit and credits-exhausted messages the NVIDIA one has.",
    "What I'd leave alone: the rate limiter is in memory, per instance. That is fine for the single Railway instance the app runs on, and a shared store such as Redis would break the goal of running on a fresh clone with no infrastructure.",
    "What surprised me: constrained decoding guarantees shape, not quality. And one “the model ignores this” turned out to be two contradictory instructions.",
  ],
} as const;
