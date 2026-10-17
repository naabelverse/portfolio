import Image from "next/image";

import { DiagramFigure, type Diagram } from "@/components/diagram";
import { Badge, Card, Container, Section, SectionIntro, StackList, StatStrip, type StackGroup, type Tone } from "@/components/ui/primitives";

/*
 * Building blocks shared by both case studies. Each page composes them in
 * its own order and keeps its own depth; nothing here flattens the content.
 */

type Fact = { label: string; value: string };

/**
 * A case study page. The header sits on the project's wash, then the sections
 * alternate by position: every even <section> is washed, every odd one paper.
 * Adding or reordering a section needs no tone changes, and each section keeps
 * its full padding because every boundary is a colour change. The first
 * section starts flush: the header's fade already spaces it.
 */
export function CaseStudy({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <div
      style={{ "--wash": `var(--color-wash-${tone})` } as React.CSSProperties}
      // Each section but the last fades into the next one's colour across its
      // bottom padding, as the header does, so the next heading keeps its full
      // top padding clear of the fade.
      className="[&>section:first-of-type]:pt-0 [&>section:nth-of-type(even)]:bg-(--wash) [&>section:nth-of-type(even)]:[--fade-to:var(--color-paper)] [&>section:nth-of-type(odd)]:[--fade-to:var(--wash)] [&>section:not(:last-of-type)]:fade-bottom"
    >
      {children}
    </div>
  );
}

/**
 * The case study's first screen, on the project's wash so it continues the
 * home card the visitor clicked. The wash fades to paper across the bottom
 * padding, the way the home hero fades into the first chapter.
 */
export function CaseHeader({
  badge,
  live,
  name,
  tagline,
  actions,
  facts,
  children,
}: {
  badge: string;
  live?: boolean;
  name: string;
  tagline: string;
  actions: React.ReactNode;
  facts: readonly Fact[];
  children?: React.ReactNode;
}) {
  return (
    // The fade length repeats the Container's bottom padding.
    <div className="fade-bottom bg-(--wash) [--fade-len:clamp(56px,7vw,92px)] [--fade-to:var(--color-paper)]">
      <Container className="pt-[clamp(48px,7vw,86px)] pb-[clamp(56px,7vw,92px)]">
        <Badge kind={live ? "live" : "academic"}>{badge}</Badge>
        <h1 className="mt-[18px]">{name}</h1>
        <p className="mt-6 max-w-lede text-lede text-ink-2">{tagline}</p>
        <div className="mt-9 flex flex-wrap gap-3.5">{actions}</div>
        <StatStrip items={facts} className="mt-[clamp(44px,6vw,72px)]" />
        {children}
      </Container>
    </div>
  );
}

export function ProblemSection({
  title,
  paragraphs,
  goal,
  stack,
  stats,
}: {
  title: string;
  paragraphs: readonly string[];
  goal: string;
  stack: readonly StackGroup[];
  stats: readonly Fact[];
}) {
  return (
    <Section labelledBy="problem-title">
      <div className="grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <h2 id="problem-title">{title}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-measure text-ink-2">
              {paragraph}
            </p>
          ))}
        </div>
        <Card>
          <h3>The goal</h3>
          <p className="mt-3">{goal}</p>
          <StackList groups={stack} className="mt-6" />
        </Card>
      </div>
      <StatStrip items={stats} className="mt-[clamp(44px,6vw,72px)]" />
    </Section>
  );
}

function FlowArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0 rotate-90 self-center lg:rotate-0">
      <path d="M4 12h15m-6-6 6 6-6 6" className="fill-none stroke-ink stroke-[2.5]" />
    </svg>
  );
}

/** Layers of the system, in the diagram grammar: white boxes, ink arrows. */
export function LayerDiagram({ layers }: { layers: ReadonlyArray<{ name: string; items: readonly string[] }> }) {
  return (
    <ol className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
      {layers.map((layer, i) => (
        <li key={layer.name} className="flex flex-col gap-3 lg:flex-1 lg:flex-row">
          <div className="flex-1 rounded-diagram border-[2.5px] border-ink bg-white p-5">
            <p className="font-semibold">{layer.name}</p>
            <ul className="mt-3 grid gap-1.5 text-small text-ink-2">
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {i < layers.length - 1 && <FlowArrow />}
        </li>
      ))}
    </ol>
  );
}

export function ArchitectureSection({
  summary,
  layers,
  diagram,
}: {
  summary: string;
  layers: ReadonlyArray<{ name: string; items: readonly string[] }>;
  diagram: Diagram;
}) {
  return (
    <Section labelledBy="architecture-title">
      <SectionIntro id="architecture-title" title="Architecture" lede={summary} />
      <div className="mt-11">
        <LayerDiagram layers={layers} />
      </div>
      <div className="mt-11 grid items-center gap-[clamp(32px,5vw,64px)] lg:grid-cols-2">
        <div>
          <h3>The flow, and where it fails</h3>
          <p className="mt-3 max-w-measure text-ink-2">
            The same request end to end. The dashed path is what happens when a
            dependency fails.
          </p>
        </div>
        <DiagramFigure diagram={diagram} className="max-w-[520px] lg:max-w-none" />
      </div>
    </Section>
  );
}

/** One feature or module: number in the narrow column, the account beside it. */
export function ModuleRow({
  index,
  name,
  summary,
  detail,
  children,
}: {
  index: string;
  name: string;
  summary: string;
  detail: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="grid gap-2 border-b border-line-2 py-[30px] md:grid-cols-[150px_1fr] md:gap-[clamp(20px,4vw,44px)]">
      <p className="font-display text-[18px] font-bold text-cobalt">{index}</p>
      <div>
        <h3>{name}</h3>
        <p className="mt-3 max-w-measure font-medium">{summary}</p>
        <p className="mt-3 max-w-measure text-ink-2">{detail}</p>
        {children}
      </div>
    </article>
  );
}

export function DecisionGrid({ decisions }: { decisions: ReadonlyArray<{ title: string; decision: string; why: string }> }) {
  return (
    <div className="mt-11 grid gap-5 md:grid-cols-2">
      {decisions.map((d) => (
        <Card key={d.title}>
          <h3>{d.title}</h3>
          <p className="mt-3 text-ink-2">{d.decision}</p>
          <p className="mt-4 border-t-2 border-line pt-4 text-small text-ink-2">
            <span className="font-semibold text-ink">Why: </span>
            {d.why}
          </p>
        </Card>
      ))}
    </div>
  );
}

export function Reflection({ items, diff }: { items: readonly string[]; diff: { from: string; to: string } }) {
  return (
    <Section labelledBy="reflection-title">
      <div className="rounded-panel border-3 border-ink bg-wash-sun p-[clamp(24px,4vw,48px)] lg:grid lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-12">
        <div>
          <h2 id="reflection-title">What I&rsquo;d change</h2>
          {/* Decorative: the first item already says it in words. */}
          <div
            aria-hidden="true"
            className="mt-8 hidden w-fit max-w-full rounded-card border-2 border-ink bg-white px-4 py-3 font-mono text-[14px] leading-[1.9] shadow-[4px_4px_0_var(--color-ink)] lg:block"
          >
            <p className="diff-old w-fit whitespace-nowrap text-ink-3">- {diff.from}</p>
            <p
              className="diff-new whitespace-nowrap text-cobalt"
              style={{ "--chars": diff.to.length + 2 } as React.CSSProperties}
            >
              + {diff.to}
            </p>
          </div>
        </div>
        <ul className="mt-6 grid list-disc gap-4 pl-5 marker:text-cobalt lg:mt-0">
          {items.map((item) => (
            <li key={item} className="max-w-measure text-ink-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** Closing block: a white sticker, ink border and hard shadow like the buttons in it. */
export function CaseClose({ body, actions }: { body: string; actions: React.ReactNode }) {
  return (
    <Section>
      <div className="rounded-block border-3 border-ink bg-white p-[clamp(28px,5vw,60px)] shadow-[6px_6px_0_var(--color-ink)] lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <div>
          <h2>Want the full walkthrough?</h2>
          <p className="mt-4 max-w-lede text-lede text-ink-2">{body}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:flex-col">{actions}</div>
      </div>
    </Section>
  );
}

type Shot = { src: string; width: number; height: number; alt: string; caption: string };

/** A real product screenshot: card border, no browser chrome. */
export function Screenshot({ shot, sizes, preload, className }: { shot: Shot; sizes: string; preload?: boolean; className?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-card border-2 border-ink bg-white">
        <Image src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes={sizes} preload={preload} className="block h-auto w-full" />
      </div>
      <figcaption className="mt-2.5 text-small text-ink-2">{shot.caption}</figcaption>
    </figure>
  );
}
