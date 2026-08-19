import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------
   Layout
   ------------------------------------------------------------------------- */

/** Max content width sits at 1280px per DESIGN.md. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-8", className)}>
      {children}
    </div>
  );
}

/**
 * A page section on the canvas. Vertical rhythm is the 96px `section` token,
 * eased down on small viewports where 96px reads as a gap rather than a beat.
 */
export function Section({
  children,
  className,
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 md:py-section", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Type
   ------------------------------------------------------------------------- */

/** Small taxonomy label — the one type step with positive tracking. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-eyebrow text-ink-subtle", className)}>{children}</p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <h2 id={id} className="text-display-md text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-body-lg text-ink-subtle">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Surfaces — depth is a background step plus a hairline plus the inset top
   highlight. DESIGN.md forbids drop shadows on this canvas.
   ------------------------------------------------------------------------- */

export function Card({
  children,
  className,
  level = 1,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** 1 = default card, 2 = featured or hovered card. */
  level?: 1 | 2;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "panel-edge rounded-lg border p-6",
        level === 1
          ? "border-hairline bg-surface-1"
          : "border-hairline-strong bg-surface-2",
        interactive &&
          "transition-colors duration-200 hover:border-hairline-strong hover:bg-surface-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * `product-screenshot-card` — the dominant container in the system. Frames a
 * product mockup at 16px radius with 24px of breathing room.
 */
export function ScreenshotPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "panel-edge overflow-hidden rounded-xl border border-hairline bg-surface-1 p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** `cta-banner` — the closing panel near the bottom of a page. */
export function CtaBanner({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "panel-edge rounded-lg border border-hairline bg-surface-1 p-8 md:p-12",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Chips
   ------------------------------------------------------------------------- */

/**
 * `status-badge` — pill, surface-2, caption type. Success green is the only
 * semantic colour DESIGN.md allows on this canvas.
 */
export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-hairline bg-surface-2 px-3 py-1 text-caption text-ink-muted",
        className,
      )}
    >
      {tone === "success" && (
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-pill bg-success"
        />
      )}
      {children}
    </span>
  );
}

/** Stack chip. Small, quiet, and always factual — one technology per tag. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-hairline bg-surface-2 px-2 py-1 text-caption text-ink-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}
