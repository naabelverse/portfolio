import type { Metadata } from "next";

import {
  ArchitectureSection,
  CaseClose,
  CaseHeader,
  DecisionGrid,
  ModuleRow,
  ON_COBALT,
  ProblemSection,
  Reflection,
  Screenshot,
} from "@/components/case-study";
import { Button } from "@/components/ui/button";
import { Section, SectionIntro } from "@/components/ui/primitives";
import { resumeAnalyzer } from "@/content/ai-resume-analyzer";
import { links, profile, resumeAnalyzerProject } from "@/content/site";

// The root title template doesn't reach og:title or twitter:title.
const shareTitle = `${resumeAnalyzer.seo.title} — ${profile.displayName}`;

// The OG image is the file-based opengraph-image.png beside this page.
export const metadata: Metadata = {
  title: resumeAnalyzer.seo.title,
  description: resumeAnalyzer.seo.description,
  keywords: [...resumeAnalyzer.seo.keywords],
  openGraph: {
    title: shareTitle,
    description: resumeAnalyzer.seo.description,
    url: "/projects/ai-resume-analyzer",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: resumeAnalyzer.seo.description,
  },
};

const CHALLENGE_PARTS = [
  { key: "problem", label: "Problem" },
  { key: "did", label: "What I did" },
  { key: "outcome", label: "Outcome" },
] as const;

export default function ResumeAnalyzerCaseStudy() {
  return (
    <>
      <CaseHeader
        badge={resumeAnalyzerProject.badge}
        live
        name={resumeAnalyzer.name}
        tagline={resumeAnalyzer.tagline}
        facts={resumeAnalyzer.meta}
        actions={
          <>
            <Button variant="sun" href={links.resumeAnalyzerLive}>
              Try it yourself
            </Button>
            <Button href={links.resumeAnalyzerDemo}>View the sample report</Button>
            <Button variant="ghost" href={links.resumeAnalyzerRepo}>
              View source on GitHub
            </Button>
          </>
        }
      >
        <Screenshot
          shot={resumeAnalyzer.cover}
          sizes="(min-width: 1180px) 1076px, 100vw"
          preload
          className="mt-[clamp(44px,6vw,72px)]"
        />
      </CaseHeader>

      <ProblemSection
        title={resumeAnalyzer.problem.title}
        paragraphs={resumeAnalyzer.problem.paragraphs}
        goal={resumeAnalyzer.goal}
        stack={resumeAnalyzer.stack}
        stats={resumeAnalyzer.stats}
      />

      <ArchitectureSection
        tone="rose"
        summary={resumeAnalyzer.architecture.summary}
        layers={resumeAnalyzer.architecture.layers}
        diagram={resumeAnalyzerProject.diagram}
      />

      <Section labelledBy="modules-title">
        <SectionIntro
          id="modules-title"
          title="Six features"
          lede="Each one shown on the built-in sample report or the fictional resume I made for these captures. No real person's data."
        />
        <div className="mt-11 border-t-3 border-ink">
          {resumeAnalyzer.modules.map((module) => (
            <ModuleRow key={module.index} index={module.index} name={module.name} summary={module.summary} detail={module.detail}>
              {"example" in module && (
                <div className="mt-6 grid max-w-measure gap-2.5">
                  <div className="rounded-input border-2 border-line-2 bg-white p-4">
                    <p className="text-small font-semibold text-ink-3">Before</p>
                    <p className="mt-1 text-small text-ink-2">{module.example.before}</p>
                  </div>
                  <div className="rounded-input border-2 border-ink bg-wash-blue p-4">
                    <p className="text-small font-semibold text-cobalt">After</p>
                    <p className="mt-1 text-small">{module.example.after}</p>
                  </div>
                  <p className="text-small text-ink-2">
                    <span className="font-semibold text-ink">Why: </span>
                    {module.example.why} <span className="text-ink-3">{module.example.source}</span>
                  </p>
                </div>
              )}
              <div className="mt-6 grid gap-6">
                {module.screenshots.map((shot) => (
                  <Screenshot key={shot.src} shot={shot} sizes="(min-width: 1180px) 860px, 100vw" />
                ))}
              </div>
            </ModuleRow>
          ))}
        </div>
      </Section>

      <Section labelledBy="decisions-title" className="pt-0">
        <SectionIntro
          id="decisions-title"
          title="Decisions worth defending"
          lede="The choices I would be asked about in an interview, and the reasoning behind each one."
        />
        <DecisionGrid decisions={resumeAnalyzer.decisions} />
      </Section>

      <Section labelledBy="challenges-title" className="pt-0">
        <SectionIntro
          id="challenges-title"
          title="Problems I had to solve"
          lede="Each one found in a real run, measured, then fixed, and where it could be, fixed in code rather than in the prompt."
        />
        <div className="mt-11 grid gap-x-8 gap-y-10 md:grid-cols-2">
          {resumeAnalyzer.challenges.map((challenge) => (
            <div key={challenge.title} className="border-t-3 border-ink pt-6">
              <h3>{challenge.title}</h3>
              <dl className="mt-4 grid gap-3">
                {CHALLENGE_PARTS.map((part) => (
                  <div key={part.key}>
                    <dt className="text-small font-semibold text-ink-3">{part.label}</dt>
                    <dd className="mt-1 max-w-measure text-ink-2">{challenge[part.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      <Reflection items={resumeAnalyzer.reflection} />

      <CaseClose
        body="The app is live and the sample report costs nothing to open. I'm happy to talk through any part of it, including the parts I'd build differently now."
        actions={
          <>
            <Button variant="sun" href={links.resumeAnalyzerLive}>
              Try it yourself
            </Button>
            <Button variant="ghost" href="/#contact" className={ON_COBALT}>
              Get in touch
            </Button>
          </>
        }
      />
    </>
  );
}
