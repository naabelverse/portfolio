import type { Metadata } from "next";
import Image from "next/image";

import { ArchitectureDiagram } from "@/components/mockups/forgeroom";
import { Reveal } from "@/components/reveal";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  Container,
  CtaBanner,
  Eyebrow,
  ScreenshotPanel,
  Section,
  SectionHeader,
  Tag,
} from "@/components/ui/primitives";
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
  const { cover } = resumeAnalyzer;

  return (
    <>
      {/* Header ---------------------------------------------------------- */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container>
          <Reveal>
            <Eyebrow>{resumeAnalyzer.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-display-lg text-ink">
              {resumeAnalyzer.name}
            </h1>
            <p className="mt-6 max-w-3xl text-body-lg text-ink-muted">
              {resumeAnalyzer.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={links.resumeAnalyzerLive} external>
                Try it live
              </ButtonLink>
              <ButtonLink
                href={links.resumeAnalyzerDemo}
                external
                variant="secondary"
              >
                View the sample report
              </ButtonLink>
              <ButtonLink
                href={links.resumeAnalyzerRepo}
                external
                variant="secondary"
              >
                View source on GitHub
              </ButtonLink>
            </div>

            <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
              {resumeAnalyzer.meta.map((item) => (
                <div key={item.label} className="bg-canvas px-6 py-5">
                  <dt className="text-caption text-ink-subtle">{item.label}</dt>
                  <dd className="mt-2 text-body-sm text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={80}>
            <ScreenshotPanel className="mt-12 p-3 md:p-6">
              <Image
                src={cover.src}
                width={cover.width}
                height={cover.height}
                alt={cover.alt}
                sizes="(min-width: 1280px) 1184px, 100vw"
                preload
                className="block h-auto w-full rounded-lg"
              />
            </ScreenshotPanel>
          </Reveal>
        </Container>
      </section>

      {/* Problem --------------------------------------------------------- */}
      <Section labelledBy="problem-title" className="py-12 md:py-20">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <h2 id="problem-title" className="text-display-md text-ink">
                {resumeAnalyzer.problem.title}
              </h2>
              {resumeAnalyzer.problem.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-body-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <Card level={2} className="h-fit">
              <Eyebrow>The goal</Eyebrow>
              <p className="mt-3 text-body-lg text-ink">{resumeAnalyzer.goal}</p>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-6">
                {resumeAnalyzerProject.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </Card>
          </div>
        </Reveal>
      </Section>

      {/* Scale ----------------------------------------------------------- */}
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline lg:grid-cols-4">
            {resumeAnalyzer.stats.map((stat) => (
              <div key={stat.label} className="bg-canvas px-6 py-6">
                <dt className="text-caption text-ink-subtle">{stat.label}</dt>
                <dd className="mt-2 text-headline text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* Architecture ---------------------------------------------------- */}
      <Section labelledBy="architecture-title">
        <Reveal>
          <SectionHeader
            id="architecture-title"
            eyebrow="How it fits together"
            title="Architecture"
            description={resumeAnalyzer.architecture.summary}
          />
        </Reveal>
        <Reveal delay={80}>
          <ArchitectureDiagram
            layers={resumeAnalyzer.architecture.layers}
            className="mt-12"
          />
        </Reveal>
      </Section>

      {/* Modules --------------------------------------------------------- */}
      <Section labelledBy="modules-title">
        <Reveal>
          <SectionHeader
            id="modules-title"
            eyebrow="The build"
            title="Six features"
            description="Each one shown on the built-in sample report or the fictional resume I made for these captures — no real person's data."
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-6">
          {resumeAnalyzer.modules.map((module) => (
            <Reveal key={module.index}>
              <Card className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12 lg:p-10">
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-mono text-accent">
                      {module.index}
                    </span>
                    <h3 className="text-card-title text-ink">{module.name}</h3>
                  </div>
                  <p className="mt-4 text-body-lg text-ink">{module.summary}</p>
                  <p className="mt-4 text-body text-ink-subtle">
                    {module.detail}
                  </p>

                  {"example" in module && (
                    <div className="mt-6 flex flex-col gap-2">
                      <div className="rounded-md border border-hairline bg-surface-2 p-4">
                        <p className="text-caption text-ink-subtle">Before</p>
                        <p className="mt-1 text-body-sm text-ink-muted">
                          {module.example.before}
                        </p>
                      </div>
                      <div className="rounded-md border border-accent/40 bg-accent-faint p-4">
                        <p className="text-caption text-accent">After</p>
                        <p className="mt-1 text-body-sm text-ink">
                          {module.example.after}
                        </p>
                      </div>
                      <p className="mt-1 text-body-sm text-ink-subtle">
                        <span className="text-ink-muted">Why: </span>
                        {module.example.why}{" "}
                        <span className="text-ink-tertiary">
                          {module.example.source}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-6">
                  {module.screenshots.map((shot) => (
                    <BrowserFrame
                      key={shot.src}
                      {...shot}
                      sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, 100vw"
                    />
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Decisions ------------------------------------------------------- */}
      <Section labelledBy="decisions-title">
        <Reveal>
          <SectionHeader
            id="decisions-title"
            eyebrow="Engineering"
            title="Decisions worth defending"
            description="The choices I would be asked about in an interview, and the reasoning behind each one."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {resumeAnalyzer.decisions.map((decision, index) => (
            <Reveal key={decision.title} delay={index * 60}>
              <Card className="h-full">
                <h3 className="text-card-title text-ink">{decision.title}</h3>
                <p className="mt-4 text-body text-ink-muted">
                  {decision.decision}
                </p>
                <p className="mt-4 border-t border-hairline pt-4 text-body-sm text-ink-subtle">
                  <span className="text-ink-muted">Why: </span>
                  {decision.why}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Challenges ------------------------------------------------------ */}
      <Section labelledBy="challenges-title">
        <Reveal>
          <SectionHeader
            id="challenges-title"
            eyebrow="What was hard"
            title="Problems I had to solve"
            description="Each one found in a real run, measured, then fixed — and where it could be, fixed in code rather than in the prompt."
          />
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {resumeAnalyzer.challenges.map((challenge, index) => (
            <Reveal key={challenge.title} delay={index * 60}>
              <div className="h-full border-t border-hairline pt-6">
                <h3 className="text-card-title text-ink">{challenge.title}</h3>
                <dl className="mt-4 flex flex-col gap-3">
                  {CHALLENGE_PARTS.map((part) => (
                    <div key={part.key}>
                      <dt className="text-caption text-ink-subtle">
                        {part.label}
                      </dt>
                      <dd className="mt-1 text-body text-ink-muted">
                        {challenge[part.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Reflection ------------------------------------------------------ */}
      <Section labelledBy="reflection-title">
        <Reveal>
          <ScreenshotPanel className="p-8 md:p-12">
            <Eyebrow>Looking back</Eyebrow>
            <h2 id="reflection-title" className="mt-3 text-headline text-ink">
              What I&rsquo;d change
            </h2>
            <ul className="mt-8 flex flex-col gap-5">
              {resumeAnalyzer.reflection.map((item) => (
                <li key={item} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-accent"
                  />
                  <p className="max-w-3xl text-body-lg text-ink-muted">{item}</p>
                </li>
              ))}
            </ul>
          </ScreenshotPanel>
        </Reveal>
      </Section>

      {/* Close ----------------------------------------------------------- */}
      <Section>
        <Reveal>
          <CtaBanner className="text-center">
            <h2 className="text-headline text-ink">
              Want the full walkthrough?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body text-ink-subtle">
              The app is live and the sample report costs nothing to open.
              I&rsquo;m happy to talk through any part of it — including the
              parts I&rsquo;d build differently now.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={links.resumeAnalyzerLive} external>
                Try it live
              </ButtonLink>
              <ButtonLink
                href={links.resumeAnalyzerDemo}
                external
                variant="secondary"
              >
                View the sample report
              </ButtonLink>
              <ButtonLink href="/#contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </CtaBanner>
        </Reveal>
      </Section>
    </>
  );
}
