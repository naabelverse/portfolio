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

const SECTION_TONES = {
  blue: "bg-wash-blue",
  rose: "bg-wash-rose",
} as const;

/**
 * A full-bleed section; with `tone` it is a project chapter on a wash.
 * Toned sections flip chips inside them to white via `--chip-bg`.
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
  tone?: keyof typeof SECTION_TONES;
  style?: React.CSSProperties;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      style={style}
      className={cn(
        "py-section",
        tone && [SECTION_TONES[tone], "[--chip-bg:var(--color-white)]"],
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
 * Solid pill. `live` is rose and is reserved for the deployed project.
 * Ink text, not white: white on rose is 3.2:1 and fails AA at 15px.
 */
export function Badge({
  children,
  live = false,
  className,
}: {
  children: React.ReactNode;
  live?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-[14px] py-[6px] text-[15px] font-semibold",
        live ? "bg-rose text-ink" : "bg-ink text-paper",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * One technology per chip. Fill comes from the surrounding surface through
 * `--chip-bg` (paper by default, white in a chapter, translucent in a card).
 * `compact` is the slimmer chip used inside skill cards.
 */
export function Chip({
  children,
  compact = false,
  className,
}: {
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-ink bg-[var(--chip-bg,var(--color-paper))] text-[14.5px] font-medium",
        compact ? "border-[1.5px] px-[11px] py-1" : "border-2 px-[13px] py-[5px]",
        className,
      )}
    >
      {children}
    </span>
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
        <figcaption className="mt-[18px] border-t-2 border-line pt-4 text-[15px]/[1.5] text-ink-2">
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
        "rounded-card border-2 border-ink p-6 [--chip-bg:rgb(255_255_255/0.75)]",
        tone ? CARD_TONES[tone] : "bg-paper",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Label/value facts: heavy rules top and bottom, nothing else. */
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
        "grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-8 gap-y-6 border-y-3 border-ink py-[22px]",
        className,
      )}
    >
      {/* Empty values are unconfirmed facts: render nothing, not a label. */}
      {items.filter((item) => item.value).map((item) => (
        <div key={item.label}>
          <dt className="mb-1 text-[15px] text-ink-3">{item.label}</dt>
          <dd className="font-display text-[22px] font-bold tracking-[-0.02em]">
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
