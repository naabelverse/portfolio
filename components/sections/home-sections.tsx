import { ContactForm } from "@/components/contact-form";
import { DiagramFigure } from "@/components/diagram";
import { Reveal } from "@/components/reveal";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Badge,
  Card,
  Chip,
  Container,
  CtaBanner,
  Eyebrow,
  Section,
  SectionHeader,
  StatStrip,
  Tag,
} from "@/components/ui/primitives";
import {
  contact,
  featuredProject,
  hero,
  links,
  otherWork,
  proofStrip,
  type Project,
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
          {/* The h1's 1.03 line-height is shorter than the font's content
              area, so when the highlight wraps, its line fragments overlap by
              a few px and the lower fragment paints over the line above. Safe
              today: no word directly above the highlight has a descender.
              If the headline changes, check every wrap width for a clipped
              g, j, p, q or y. */}
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
   Project chapters — full-bleed washes; the sections between stay paper.
   ------------------------------------------------------------------------- */

function ProjectChapter({
  project,
  tone,
  id,
}: {
  project: Project;
  tone: "blue" | "rose";
  id: string;
}) {
  const headingId = `${id}-title`;
  const blocks = [
    { label: "The problem", body: project.problem },
    { label: "How it works", body: project.approach },
    { label: "What I was careful about", body: project.careful },
    { label: "Where it stands", body: project.outcome },
  ];

  return (
    <Section id={id} labelledBy={headingId} tone={tone}>
      <Badge live={Boolean(project.live)}>{project.badge}</Badge>
      <h2 id={headingId} className="mt-[18px]">
        {project.name}
      </h2>
      <p className="mt-3.5 max-w-tagline text-tagline text-ink-2">{project.tagline}</p>

      <div className="mt-[clamp(36px,5vw,56px)] grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-2">
        <div>
          {blocks.map((block, i) => (
            <div key={block.label} className={i > 0 ? "mt-[26px]" : undefined}>
              {/* h3 for the outline; set at body size, as in the prototype. */}
              <h3 className="mb-1.5 font-sans text-[17px] leading-[1.6] font-semibold tracking-normal">
                {block.label}
              </h3>
              <p className="max-w-measure text-ink-2">{block.body}</p>
            </div>
          ))}

          <ul className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.live && (
              <Button variant="sun" href={project.live}>
                Try it yourself
              </Button>
            )}
            <Button href={project.href}>Read the case study</Button>
            <Button variant="ghost" href={project.repo}>
              View source
            </Button>
          </div>
        </div>

        {/* Capped when the split stacks, or the labels balloon to ~30px. */}
        <DiagramFigure diagram={project.diagram} className="max-w-[600px] lg:max-w-none" />
      </div>
    </Section>
  );
}

/** The two featured builds, ForgeRoom first, inside the #work anchor. */
export function FeaturedProjects() {
  return (
    <>
      <ProjectChapter id="work" tone="blue" project={featuredProject} />
      <ProjectChapter id="resume-analyzer" tone="rose" project={resumeAnalyzerProject} />
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
