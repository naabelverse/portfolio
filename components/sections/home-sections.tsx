import { existsSync } from "node:fs";
import { join } from "node:path";

import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { DiagramFigure } from "@/components/diagram";
import { HeroDots } from "@/components/hero-dots";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";
import {
  Badge,
  Card,
  Chip,
  Container,
  Row,
  RowList,
  Section,
  SectionIntro,
} from "@/components/ui/primitives";
import {
  contact,
  emailAddress,
  featuredProject,
  hero,
  links,
  otherWork,
  profile,
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

// Checked at build (the page is static). Without the file the composition
// falls back to the original block and sun dot instead of showing a hole.
const PORTRAIT = "/portrait.webp";
const hasPortrait = existsSync(join(process.cwd(), "public", PORTRAIT));

/**
 * Ring and two arcs draw in; the portrait sits in the middle and is present
 * from first paint (a face that pops in reads as a
 * gimmick). The motion lives in globals.css under `.hero-draw` / `.hero-pop`.
 */
function HeroComposition() {
  const len = (value: number) => ({ "--len": `${value}px` }) as React.CSSProperties;

  return (
    <div className="relative">
      <svg viewBox="0 0 320 320" aria-hidden="true" className="h-auto w-full">
        <circle className="hero-draw" style={len(RING)} cx="160" cy="160" r="128" fill="none" stroke="#111318" strokeWidth="3" />
        <path className="hero-draw" style={len(ARC)} d="M160 32 A128 128 0 0 1 288 160" fill="none" stroke="#1F43E6" strokeWidth="16" strokeLinecap="round" />
        <path className="hero-draw" style={len(ARC)} d="M32 160 A128 128 0 0 0 160 288" fill="none" stroke="#FFC93D" strokeWidth="16" strokeLinecap="round" />
        {!hasPortrait && (
          <>
            <rect className="hero-pop [animation-delay:0.45s]" x="108" y="108" width="104" height="104" rx="16" fill="#1F43E6" />
            <circle className="hero-pop [animation-delay:0.6s]" cx="160" cy="160" r="30" fill="#FFC93D" />
            <circle className="hero-pop [animation-delay:0.75s]" cx="265" cy="68" r="15" fill="#FF4F6E" />
          </>
        )}
      </svg>
      {hasPortrait && (
        // r=106 of the 320 viewBox (66.25% wide), centred, so the arcs (inner
        // edge r=120) frame the photo closely. The 4px cobalt ring sits
        // outside it (box-content) so the photo keeps that radius.
        <Image
          src={PORTRAIT}
          width={520}
          height={520}
          alt={`Portrait of ${profile.fullName}`}
          sizes="260px"
          preload
          className="absolute top-1/2 left-1/2 box-content h-auto w-[66.25%] -translate-1/2 rounded-full border-4 border-ink"
        />
      )}
    </div>
  );
}

export function Hero() {
  return (
    // Fades from paper into the blue wash of the first chapter, so the two
    // backgrounds meet without a seam. At least one screen tall (minus the
    // 68px header) so the first chapter starts below the fold; the intro and
    // the project cards are centred in that height as one group. The bottom
    // pad must stay deep enough for the blurred paper patches to fade out
    // before overflow-hidden clips them, or they end in a hard white edge.
    <div className="relative isolate flex min-h-[calc(100svh-68px)] flex-col overflow-hidden bg-linear-to-b from-paper from-55% to-wash-blue">
      <HeroDots />
    <Container className="flex w-full flex-1 flex-col justify-center pt-[clamp(48px,7vw,86px)] pb-[clamp(56px,7vw,92px)]">
        <div className="grid items-center gap-[clamp(28px,5vw,64px)] lg:grid-cols-[1.4fr_0.6fr]">
          <div className="relative">
            {/* Blurred paper patches over the star grid, here and behind the
                portrait, so the stars fade out around the words, the button
                and the photo instead of showing through them. */}
            <div aria-hidden="true" className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[48px] bg-paper blur-2xl" />
            {/* Smaller than the global 96px h1, but still above the 58px h2. */}
            <h1 className="text-[length:clamp(36px,6vw,64px)]">{hero.headline}</h1>
            <p className="mt-[26px] max-w-lede text-lede text-ink-2">{hero.intro}</p>
          </div>
          <div className="relative order-first max-w-[380px] lg:order-none lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-[6%] -z-10 rounded-full bg-paper blur-xl" />
            <HeroComposition />
          </div>
        </div>
        <HeroProjectCards />
      </Container>
    </div>
  );
}

/** Preview cards at the hero's foot, each jumping to its project chapter. */
function HeroProjectCards() {
  // Each card wears its chapter's wash, so it previews the section it leads to.
  const cards: { project: Project; href: string; tone: string }[] = [
    { project: featuredProject, href: "/#work", tone: "bg-wash-blue" },
    { project: resumeAnalyzerProject, href: "/#resume-analyzer", tone: "bg-wash-rose" },
  ];
  return (
    <div className="relative mt-[clamp(32px,4vw,48px)]">
      {/* The same blurred paper patch as behind the intro, so the stars fade
          out around the cards instead of crowding their edges and the gap. */}
      <div aria-hidden="true" className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[48px] bg-paper blur-2xl" />
    <ul className="grid gap-4 md:grid-cols-2">
      {cards.map(({ project, href, tone }) => (
        <li key={project.slug} className="flex">
          <Link
            href={href}
            className={`group w-full rounded-card border-2 border-ink p-6 transition-transform duration-150 hover:-translate-y-1 ${tone}`}
          >
            <Badge kind={project.live ? "live" : "academic"}>{project.badge}</Badge>
            <p className="mt-4 flex items-center justify-between gap-4 font-display text-[26px] font-bold tracking-[-0.02em]">
              {project.name}
              <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
                →
              </span>
            </p>
            <p className="mt-1.5 text-[16px] text-ink-2">{project.tagline}</p>
          </Link>
        </li>
      ))}
    </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Project chapters — full-bleed washes; the sections between stay paper.
   ------------------------------------------------------------------------- */

/** Each chapter tone's wash colour, for fading one chapter into the next. */
const WASH = {
  blue: "var(--color-wash-blue)",
  rose: "var(--color-wash-rose)",
} as const;

/** How far each edge fade reaches into a chapter. */
const BLEND = "220px";

/** The gap stars: [left %, top %, size px, colour token, twinkle delay s]. */
const GAP_STARS: [number, number, number, string, number][] = [
  [6, 30, 14, "cobalt", 0], [14, 62, 10, "ink", 1.2], [22, 22, 18, "sun", 0.6],
  [31, 70, 12, "rose", 1.8], [39, 38, 16, "cobalt", 0.9], [47, 76, 10, "ink", 2.4],
  [55, 26, 12, "rose", 1.5], [63, 58, 18, "sun", 0.3], [71, 34, 10, "ink", 2.1],
  [79, 68, 14, "cobalt", 1.1], [87, 28, 12, "rose", 0.4], [94, 60, 16, "sun", 1.9],
];

/**
 * Twinkling stars in the gap between two chapters: the hero's four-point star
 * in the brand colours. Spans the previous chapter's bottom padding and this
 * one's top padding, so it sits in the empty band where the washes blend.
 */
function GapStars() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-section h-[calc(var(--spacing-section)*2)]"
    >
      {GAP_STARS.map(([left, top, size, color, delay]) => (
        <svg
          key={`${left}-${top}`}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          className="gap-star absolute"
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
        >
          <path d="M10 0Q11.4 8.6 20 10 11.4 11.4 10 20 8.6 11.4 0 10 8.6 8.6 10 0Z" style={{ fill: `var(--color-${color})` }} />
        </svg>
      ))}
    </div>
  );
}

function ProjectChapter({
  project,
  tone,
  id,
  className,
  blendFrom,
  blendTo,
}: {
  project: Project;
  tone: keyof typeof WASH;
  id: string;
  className?: string;
  /** Colour of the section above; the top edge fades in from it. */
  blendFrom?: string;
  /** Colour of the section below; the bottom edge fades out into it. */
  blendTo?: string;
}) {
  const headingId = `${id}-title`;
  // The gradient runs to transparent over the tone's own background colour,
  // so only the edges change and the middle stays the chapter's wash.
  const blend =
    blendFrom || blendTo
      ? {
          backgroundImage: `linear-gradient(to bottom, ${blendFrom ?? "transparent"}, transparent ${BLEND}, transparent calc(100% - ${BLEND}), ${blendTo ?? "transparent"})`,
        }
      : undefined;
  const blocks = [
    { label: "The problem", body: project.problem },
    { label: "How it works", body: project.approach },
    { label: "What I was careful about", body: project.careful },
    { label: "Where it stands", body: project.outcome },
  ];

  return (
    <Section id={id} labelledBy={headingId} tone={tone} className={cn("relative", className)} style={blend}>
      {blendFrom && <GapStars />}
      <Badge kind={project.live ? "live" : "academic"}>{project.badge}</Badge>
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
  // In page order. Each chapter fades in from the wash above it and the last
  // fades out into the paper section after, so a chapter added here blends
  // with its neighbours without any extra work. The first needs no fade: the
  // hero already ends in its blue wash.
  const chapters = [
    // Short top pad: the hero's bottom pad already sits above it in the same wash.
    { id: "work", tone: "blue", project: featuredProject, className: "pt-[clamp(24px,4vw,64px)]" },
    { id: "resume-analyzer", tone: "rose", project: resumeAnalyzerProject },
  ] as const;

  return chapters.map((chapter, i) => (
    <ProjectChapter
      key={chapter.id}
      {...chapter}
      blendFrom={i > 0 ? WASH[chapters[i - 1].tone] : undefined}
      blendTo={i === chapters.length - 1 ? "var(--color-paper)" : undefined}
    />
  ));
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
   Skills
   ------------------------------------------------------------------------- */

const SKILL_TONES = ["blue", "sun", "rose"] as const;

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionIntro
        id="skills-title"
        title="Skills"
        lede="Everything here backs something on this page. No bars, no percentages, nothing I have only read about."
      />
      <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Card key={group.title} tone={SKILL_TONES[i % 3]}>
            <h3>{group.title}</h3>
            {group.note ? (
              <p className="mt-1.5 mb-3.5 text-[15px] text-ink-2">{group.note}</p>
            ) : (
              <div className="mb-3.5" />
            )}
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
   Experience
   ------------------------------------------------------------------------- */

/** Shared with /about. Empty dates and descriptions render as nothing. */
export function Timeline({ className }: { className?: string }) {
  return (
    <RowList narrow className={className}>
      {timeline.filter((entry) => entry.title).map((entry) => (
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
          {entry.result && <p className="mt-2 text-[15.5px] font-semibold">{entry.result}</p>}
          {entry.link && (
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[15.5px] font-semibold text-cobalt underline underline-offset-4 hover:text-cobalt-deep"
            >
              {entry.linkLabel ?? "View the project"}
            </a>
          )}
        </Row>
      ))}
    </RowList>
  );
}

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      {/* The section's old id, so links already shared to #background still land here. */}
      <div id="background" className="scroll-mt-6" />
      <SectionIntro id="experience-title" title="Experience" />
      <Timeline className="mt-11" />
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------- */

const REACH = [
  { label: emailAddress, mark: "✉", href: `mailto:${emailAddress}`, aria: "Email" },
  { label: "GitHub", mark: "↗", href: links.github, aria: `GitHub, ${links.githubHandle}` },
  { label: "LinkedIn", mark: "↗", href: links.linkedin, aria: `LinkedIn, ${profile.displayName}` },
  ...(links.resume ? [{ label: "CV", mark: "↓", href: links.resume, aria: "Download my CV (PDF)" }] : []),
];

/* Drawn in a fixed 280×220 box so the plane's CSS offset-path (in px) lines up with the SVG trail. */
const FLIGHT = "M10 205C65 205 110 178 120 140C130 102 92 84 78 107C64 130 102 154 148 140C204 123 232 75 268 28";
const CLOUD = "M10 24a10 10 0 0 1 0-20 14 14 0 0 1 26-4 12 12 0 0 1 18 8 8 8 0 0 1 0 16Z";
/* x, y, scale, opacity, animation delay: kept clear of the flight path. */
const CLOUDS = [
  [8, 28, 1.3, 0.22, 0],
  [176, 168, 1, 0.16, -3],
  [150, 30, 0.7, 0.12, -6],
];

/** Fills the empty top-right of the contact block on wide screens: a paper plane looping out. */
function PaperPlane() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-[clamp(28px,5vw,64px)] top-[clamp(28px,4vw,48px)] hidden h-[220px] w-[280px] xl:block">
      <svg width="280" height="220" className="absolute inset-0 overflow-visible">
        {CLOUDS.map(([x, y, scale, opacity, delay]) => (
          <g key={x} transform={`translate(${x} ${y}) scale(${scale})`}>
            <path d={CLOUD} fill="white" fillOpacity={opacity} className="plane-cloud" style={{ animationDelay: `${delay}s` }} />
          </g>
        ))}
        <path d={FLIGHT} fill="none" stroke="white" strokeOpacity=".4" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 10" className="plane-trail" />
      </svg>
      <svg width="34" height="34" viewBox="0 0 34 34" className="plane absolute left-0 top-0" style={{ offsetPath: `path("${FLIGHT}")` }}>
        <path d="M32 17 2 4l7 13-7 13Z" fill="white" />
        <path d="M9 17h23" stroke="var(--color-cobalt-deep)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/** The cobalt block: headline and links on top, the form underneath. Shared with /about. */
export function ContactBlock({ titleId = "contact-title" }: { titleId?: string }) {
  return (
    <div className="relative rounded-block bg-cobalt p-[clamp(28px,5vw,64px)] text-white">
      <PaperPlane />
      {/* Between the global h1 and h2: this is the page's closing line. */}
      <h2 id={titleId} className="max-w-[14ch] text-[length:clamp(40px,7.5vw,84px)] text-balance">
        {contact.title}
      </h2>
      <p className="mt-5 max-w-lede text-lede text-white/85">{contact.description}</p>
      <ul className="mt-8 flex flex-wrap gap-2.5">
        {REACH.map((item) => (
          <li key={item.href} className="min-w-0">
            <a
              href={item.href}
              aria-label={item.aria}
              className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border-2 border-white/45 px-[18px] py-2 text-[16px] font-semibold transition-colors duration-150 hover:border-white hover:bg-white hover:text-cobalt"
              {...(item.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <span className="break-all">{item.label}</span>
              <span aria-hidden="true">{item.mark}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-[clamp(32px,5vw,52px)]">
        <ContactForm />
      </div>
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
