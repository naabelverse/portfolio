import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { PhoneShowcase } from "@/components/mockups/forgeroom";
import { Reveal } from "@/components/reveal";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Card,
  Container,
  CtaBanner,
  Eyebrow,
  ScreenshotPanel,
  Section,
  SectionHeader,
  StatStrip,
  Tag,
} from "@/components/ui/primitives";
import { resumeAnalyzer } from "@/content/ai-resume-analyzer";
import {
  contact,
  featuredProject,
  hero,
  links,
  otherWork,
  proofStrip,
  resumeAnalyzerProject,
  skillGroups,
  timeline,
} from "@/content/site";

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

const RING = 2 * Math.PI * 128;
const ARC = RING / 4;

/**
 * Ring, two arcs, a block and two dots. Strokes draw, then shapes pop in;
 * the motion itself lives in globals.css under `.hero-draw` / `.hero-pop`.
 */
function HeroComposition() {
  const len = (value: number) => ({ "--len": `${value}px` }) as React.CSSProperties;

  return (
    <svg viewBox="0 0 320 320" aria-hidden="true" className="h-auto w-full">
      <circle className="hero-draw" style={len(RING)} cx="160" cy="160" r="128" fill="none" stroke="#111318" strokeWidth="3" />
      <path className="hero-draw" style={len(ARC)} d="M160 32 A128 128 0 0 1 288 160" fill="none" stroke="#1F43E6" strokeWidth="16" strokeLinecap="round" />
      <path className="hero-draw" style={len(ARC)} d="M32 160 A128 128 0 0 0 160 288" fill="none" stroke="#FFC93D" strokeWidth="16" strokeLinecap="round" />
      <rect className="hero-pop [animation-delay:0.45s]" x="108" y="108" width="104" height="104" rx="16" fill="#1F43E6" />
      <circle className="hero-pop [animation-delay:0.6s]" cx="160" cy="160" r="30" fill="#FFC93D" />
      <circle className="hero-pop [animation-delay:0.75s]" cx="265" cy="68" r="15" fill="#FF4F6E" />
    </svg>
  );
}

export function Hero() {
  return (
    <Container className="pt-[clamp(48px,7vw,86px)] pb-[clamp(56px,7vw,92px)]">
      <div className="grid items-center gap-[clamp(28px,5vw,64px)] lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <h1 className="max-w-[13ch]">
            {hero.headline.before}
            <mark className="box-decoration-clone rounded-[4px] bg-sun px-[0.1em] text-ink">
              {hero.headline.highlight}
            </mark>
            {hero.headline.after}
          </h1>
          <p className="mt-[26px] max-w-lede text-lede text-ink-2">{hero.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button variant="ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className="order-first max-w-[380px] lg:order-none lg:max-w-none">
          <HeroComposition />
        </div>
      </div>

      <StatStrip items={proofStrip} className="mt-[clamp(44px,6vw,72px)]" />
    </Container>
  );
}

/* -------------------------------------------------------------------------
   Featured project
   ------------------------------------------------------------------------- */

type Feature = {
  name: string;
  eyebrow: string;
  tagline: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: readonly string[];
  href: string;
  repo: string;
  live?: string;
};

function FeaturedProject({
  project,
  visual,
  id,
  headingId,
  className,
}: {
  project: Feature;
  visual: React.ReactNode;
  id?: string;
  headingId: string;
  className?: string;
}) {
  const blocks = [
    { label: "The problem", body: project.problem },
    { label: "The approach", body: project.approach },
    { label: "Where it stands", body: project.outcome },
  ];

  return (
    <Section id={id} labelledBy={headingId} className={className}>
      <Reveal>
        <Eyebrow>{project.eyebrow}</Eyebrow>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id={headingId} className="text-display-md text-ink">
              {project.name}
            </h2>
            <p className="mt-4 text-body-lg text-ink-subtle">
              {project.tagline}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href={project.href}>Read the case study</ButtonLink>
            {project.live && (
              <ButtonLink href={project.live} external variant="secondary">
                Try it live
              </ButtonLink>
            )}
            <ButtonLink href={project.repo} external variant="secondary">
              View source
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <ScreenshotPanel className="mt-12">{visual}</ScreenshotPanel>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {blocks.map((block) => (
            <div key={block.label}>
              <h3 className="text-caption text-ink-subtle">{block.label}</h3>
              <p className="mt-3 text-body text-ink-muted">{block.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/** The two featured builds, ForgeRoom first, inside the #work anchor. */
export function FeaturedProjects() {
  const { cover } = resumeAnalyzer;

  return (
    <>
      <FeaturedProject
        id="work"
        headingId="work-title"
        project={featuredProject}
        visual={<PhoneShowcase />}
      />
      <FeaturedProject
        headingId="resume-analyzer-title"
        project={resumeAnalyzerProject}
        className="pt-0 md:pt-0"
        visual={
          <Image
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt={cover.alt}
            sizes="(min-width: 1280px) 1184px, 100vw"
            className="block h-auto w-full rounded-lg"
          />
        }
      />
    </>
  );
}

/* -------------------------------------------------------------------------
   Other work
   ------------------------------------------------------------------------- */

export function OtherWork() {
  return (
    <Section labelledBy="other-work-title">
      <Reveal>
        <SectionHeader
          id="other-work-title"
          eyebrow="Also built"
          title="Other work"
          description="Coursework and smaller builds. Less polished than the projects above, but this is where the fundamentals came from."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {otherWork.map((project, index) => (
          <Reveal key={project.name} delay={index * 70}>
            <Card className="flex h-full flex-col">
              <p className="text-caption text-ink-subtle">{project.context}</p>
              <h3 className="mt-2 text-card-title text-ink">{project.name}</h3>
              <p className="mt-3 flex-1 text-body-sm text-ink-subtle">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>

              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 text-body-sm text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  View source
                </a>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Skills
   ------------------------------------------------------------------------- */

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <Reveal>
        <SectionHeader
          id="skills-title"
          eyebrow="Toolkit"
          title="What I work with"
          description="Everything here is backed by something on this page — no bars, no percentages, no tools I've only read about."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 60}>
            <Card className="h-full">
              <h3 className="text-card-title text-ink">{group.title}</h3>
              <p className="mt-2 text-body-sm text-ink-subtle">
                {group.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Background
   ------------------------------------------------------------------------- */

export function Background() {
  return (
    <Section id="background" labelledBy="background-title">
      <Reveal>
        <SectionHeader
          id="background-title"
          eyebrow="Background"
          title="Education & experience"
        />
      </Reveal>

      {/* Reveal sits inside the <li>, not around it: an <ol> may only contain
          <li> children, and a wrapper would make every entry a :last-child. */}
      <ol className="mt-12 border-l border-hairline">
        {timeline.map((entry, index) => (
          <li key={entry.title} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[4.5px] size-2 rounded-pill border border-hairline-strong bg-surface-3"
            />
            <Reveal delay={index * 60}>
              <p className="text-caption text-ink-subtle">{entry.period}</p>
              <h3 className="mt-2 text-card-title text-ink">{entry.title}</h3>
              <p className="mt-1 text-body-sm text-ink-subtle">{entry.org}</p>
              <p className="mt-3 max-w-2xl text-body text-ink-muted">
                {entry.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------- */

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <Reveal>
        <CtaBanner>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>{contact.eyebrow}</Eyebrow>
              <h2 id="contact-title" className="mt-3 text-headline text-ink">
                {contact.title}
              </h2>
              <p className="mt-4 max-w-md text-body text-ink-subtle">
                {contact.description}
              </p>
              <p className="mt-2 text-body-sm text-ink-subtle">
                {contact.formNote}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={links.github} external variant="secondary">
                  GitHub
                </ButtonLink>
                <ButtonLink href={links.linkedin} external variant="secondary">
                  LinkedIn
                </ButtonLink>
              </div>
            </div>

            <ContactForm />
          </div>
        </CtaBanner>
      </Reveal>
    </Section>
  );
}
