import { cn } from "@/lib/cn";

/*
 * Values are taken from redesign-v2-bright.html. No shadows, no hover on
 * anything that is not clickable, and radius is per element type on purpose.
 */

/* -------------------------------------------------------------------------
   Layout
   ------------------------------------------------------------------------- */

/** Prototype `.wrap`: 1180px including the fluid gutter. */
export function Container({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-wrap px-gutter", className)}>
      {children}
    </div>
  );
}

/** A project's chapter colour. Each key needs a `--color-wash-<key>` token. */
export const SECTION_TONES = {
  blue: "bg-wash-blue",
  rose: "bg-wash-rose",
} as const;

export type Tone = keyof typeof SECTION_TONES;

/**
 * A full-bleed section; with `tone` it is a project chapter on a wash.
 */
export function Section({
  children,
  className,
  id,
  labelledBy,
  tone,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  tone?: Tone;
  style?: React.CSSProperties;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      style={style}
      className={cn(
        "py-section",
        tone && SECTION_TONES[tone],
        className,
      )}
    >
      {/* The anchor id sits on the content, not the section, so a nav jump
          skips the top padding and lands 24px under the header. */}
      <Container id={id} className="scroll-mt-6">
        {children}
      </Container>
    </section>
  );
}

/** h2 plus an optional lede: the opening of every content section. */
export function SectionIntro({ id, title, lede }: { id: string; title: string; lede?: string }) {
  return (
    <>
      <h2 id={id}>{title}</h2>
      {lede && <p className="mt-4 max-w-lede text-lede text-ink-2">{lede}</p>}
    </>
  );
}

/* -------------------------------------------------------------------------
   Labels
   ------------------------------------------------------------------------- */

/**
 * Pill label. With no `kind` it is solid ink (e.g. the 404 tag). A project
 * badge sets `kind`: a white pill with an ink border and a leading mark, so
 * both projects carry equal weight. `live` (the deployed project) gets a
 * green status dot that pulses (still under reduced motion); `academic` gets
 * a graduation cap that hops now and then (.badge-cap in globals.css), calmer
 * than the dot so "live" stays the louder of the two. `offline` is the same
 * dot in rose, the failure colour, for a project not deployed yet. `personal` is
 * a rocket that rumbles and lifts off now and then (.badge-rocket). Outlined padding is 2px less to absorb the border, so
 * every badge is one size.
 */
export function Badge({
  children,
  kind,
  className,
}: {
  children: React.ReactNode;
  kind?: "live" | "offline" | "academic" | "personal";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full text-[15px] font-semibold",
        kind
          ? "gap-2 border-2 border-ink bg-white px-[12px] py-[4px] text-ink"
          : "bg-ink px-[14px] py-[6px] text-paper",
        className,
      )}
    >
      {(kind === "live" || kind === "offline") && (
        <span aria-hidden="true" className="relative flex size-2.5">
          <span
            className={cn(
              "absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping",
              kind === "live" ? "bg-live" : "bg-rose-line",
            )}
          />
          <span className={cn("relative size-2.5 rounded-full", kind === "live" ? "bg-live" : "bg-rose-line")} />
        </span>
      )}
      {kind === "academic" && (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="badge-cap size-[17px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
        >
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c3 2 9 2 12 0v-5" />
          <path d="M22 10v6" />
        </svg>
      )}
      {kind === "personal" && (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="badge-rocket size-[17px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      )}
      {children}
    </span>
  );
}

/** A role and the technologies that fill it, e.g. ["AI", ["Claude"]]. */
export type StackGroup = readonly [label: string, items: readonly string[]];

/**
 * A project's technologies as a spec sheet: one row per role, the role on the
 * left, its technologies as a plain phrase on the right, hairlines between
 * rows. One ruled block rather than a shape per item, so it can't be mistaken
 * for a badge, and the role labels say what kind of information it is. The
 * rules are ink at 15%, so they tint with whatever ground they sit on.
 */
export function StackList({ groups, className }: { groups: readonly StackGroup[]; className?: string }) {
  return (
    <dl className={cn("text-small", className)}>
      {groups.map(([label, items]) => (
        <div
          key={label}
          className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 border-t border-ink/15 py-2 last:border-b"
        >
          <dt className="font-semibold">{label}</dt>
          <dd className="text-ink-2">{items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------
   Surfaces
   ------------------------------------------------------------------------- */

/** The diagram container. The caption makes an engineering point. */
export function Panel({
  children,
  caption,
  className,
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "rounded-panel border-3 border-ink bg-paper p-[clamp(20px,3vw,30px)] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full",
        className,
      )}
    >
      {children}
      {caption && (
        <figcaption className="mt-[18px] border-t-2 border-line pt-4 text-center text-[15px]/[1.5] text-ink-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const CARD_TONES = {
  blue: "bg-wash-blue",
  sun: "bg-wash-sun",
  rose: "bg-wash-rose",
} as const;

/** Skill-group card. */
export function Card({
  children,
  tone,
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof CARD_TONES;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border-2 border-ink p-6",
        tone ? CARD_TONES[tone] : "bg-paper",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Label/value facts, centred between heavy rules. The first fact (the long
 * one, e.g. Role) takes its own row; the rest share the row below.
 */
export function StatStrip({
  items,
  className,
}: {
  items: readonly { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "flex flex-wrap gap-x-8 gap-y-6 border-y-3 border-ink py-[22px] text-center",
        className,
      )}
    >
      {/* Empty values are unconfirmed facts: render nothing, not a label. */}
      {items.filter((item) => item.value).map((item) => (
        <div key={item.label} className="flex-1 basis-[190px] first:basis-full">
          <dt className="mb-1 text-[15px] text-ink-3">{item.label}</dt>
          <dd className="font-display text-[22px] font-bold tracking-[-0.02em]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Numeric stats in the diagram grammar: one white box, a cell per figure. */
export function StatNumbers({
  items,
  className,
}: {
  items: readonly { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 overflow-hidden rounded-diagram border-[2.5px] border-ink bg-white lg:grid-cols-4",
        // Inner rules: 2x2 below lg, one row of four from lg.
        "max-lg:[&>*:nth-child(even)]:border-l-2 max-lg:[&>*:nth-child(n+3)]:border-t-2 lg:[&>*+*]:border-l-2",
        className,
      )}
    >
      {items.filter((item) => item.value).map((item) => (
        // Reversed so the label is read first but the figure sits on top.
        <div key={item.label} className="flex flex-col-reverse justify-end border-ink px-5 py-[22px] text-center">
          <dt className="mt-2 text-[15px] text-ink-3">{item.label}</dt>
          <dd className="font-display text-[clamp(30px,4vw,40px)] leading-none font-bold tracking-[-0.03em]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------
   Lists
   ------------------------------------------------------------------------- */

/**
 * "Smaller and earlier" and "Experience". `narrow` is the 150px date
 * column; the default 210px fits a project title.
 */
export function RowList({
  children,
  narrow = false,
  className,
}: {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-t-3 border-ink",
        narrow ? "[--aside:150px]" : "[--aside:210px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Row({
  aside,
  children,
}: {
  aside: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="grid gap-2 border-b border-line-2 py-[30px] md:grid-cols-[var(--aside)_1fr] md:gap-[clamp(20px,4vw,44px)]">
      <div>{aside}</div>
      <div>{children}</div>
    </article>
  );
}

/* -------------------------------------------------------------------------
   Forms
   ------------------------------------------------------------------------- */

const CONTROL =
  "min-h-[46px] w-full rounded-input border-2 border-line-2 bg-white px-[13px] py-[11px] text-[16px] text-ink transition-[border-color] duration-150 focus:border-cobalt";

type FieldProps = { label: string; id: string; className?: string } & (
  | ({ multiline?: false } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({ multiline: true } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
);

/** Input or textarea with a real label. 16px text so iOS does not zoom. */
export function Field({ label, id, multiline, className, ...rest }: FieldProps) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={id} className="text-[14.5px] font-semibold text-ink-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={id}
          className={cn(CONTROL, "min-h-[110px] resize-y")}
        />
      ) : (
        <input
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          id={id}
          className={CONTROL}
        />
      )}
    </div>
  );
}
