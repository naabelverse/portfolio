import { ContactForm } from "@/components/contact-form";
import { DiagramFigure } from "@/components/diagram";
import { Button } from "@/components/ui/button";
import {
  Badge,
  Card,
  Chip,
  Container,
  Row,
  RowList,
  Section,
  SectionIntro,
  StatStrip,
} from "@/components/ui/primitives";
import {
  contact,
  emailAddress,
  featuredProject,
  hero,
  links,
  otherWork,
  profile,
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
        <DiagramFigure diagram={project.diagram} className="max-w-[520px] lg:max-w-none" />
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
   Smaller and earlier
   ------------------------------------------------------------------------- */

export function OtherWork() {
  return (
    <Section id="other-work" labelledBy="other-work-title">
      <SectionIntro
        id="other-work-title"
        title="Smaller and earlier"
        lede="Coursework and first attempts. Rougher than the two above, but this is where the fundamentals came from."
      />
      <RowList className="mt-11">
        {otherWork.map((project) => (
          <Row
            key={project.name}
            aside={
              <>
                <h3>{project.name}</h3>
                <p className="mt-1.5 text-[15px] text-ink-3">{project.context}</p>
              </>
            }
          >
            <p className="max-w-measure text-[16.5px] text-ink-2">{project.description}</p>
          </Row>
        ))}
      </RowList>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   What I use
   ------------------------------------------------------------------------- */

const SKILL_TONES = ["blue", "sun", "rose"] as const;

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionIntro
        id="skills-title"
        title="What I use"
        lede="Everything here backs something on this page. No bars, no percentages, nothing I have only read about."
      />
      <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Card key={group.title} tone={SKILL_TONES[i % 3]}>
            <h3>{group.title}</h3>
            <p className="mt-1.5 mb-3.5 text-[15px] text-ink-2">{group.note}</p>
            <ul className="flex flex-wrap gap-[7px]">
              {group.items.map((item) => (
                <li key={item}>
                  <Chip compact>{item}</Chip>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Background
   ------------------------------------------------------------------------- */

/** Shared with /about. Empty dates and descriptions render as nothing. */
export function Timeline({ className }: { className?: string }) {
  return (
    <RowList narrow className={className}>
      {timeline.map((entry) => (
        <Row
          key={entry.title}
          aside={
            entry.period && (
              <p className="font-display text-[18px] font-bold text-cobalt">{entry.period}</p>
            )
          }
        >
          <h3>{entry.title}</h3>
          <p className="mt-[3px] text-[15.5px] text-ink-3">{entry.org}</p>
          {entry.description && (
            <p className="mt-2.5 max-w-measure text-[16.5px] text-ink-2">{entry.description}</p>
          )}
        </Row>
      ))}
    </RowList>
  );
}

export function Background() {
  return (
    <Section id="background" labelledBy="background-title">
      <SectionIntro id="background-title" title="Background" />
      <Timeline className="mt-11" />
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------- */

const REACH = [
  { label: emailAddress, what: "Email", href: `mailto:${emailAddress}` },
  { label: links.githubHandle, what: "GitHub", href: links.github },
  { label: profile.displayName, what: "LinkedIn", href: links.linkedin },
];

/** The cobalt block. Shared with /about. */
export function ContactBlock({ titleId = "contact-title" }: { titleId?: string }) {
  return (
    <div className="grid items-start gap-[clamp(28px,5vw,56px)] rounded-block bg-cobalt p-[clamp(28px,5vw,60px)] text-white lg:grid-cols-2">
      <div>
        <h2 id={titleId}>{contact.title}</h2>
        <p className="mt-4 max-w-lede text-lede text-white/85">{contact.description}</p>
        <ul className="mt-7">
          {REACH.map((item) => (
            <li key={item.what} className="border-t border-white/30 last:border-b">
              <a
                href={item.href}
                className="flex justify-between gap-4 py-3.5 text-[17px] font-medium hover:text-sun"
                {...(item.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <span className="break-all">{item.label}</span>
                <span className="self-center text-[14.5px] font-normal text-white/80">{item.what}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ContactForm />
    </div>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <ContactBlock />
    </Section>
  );
}
