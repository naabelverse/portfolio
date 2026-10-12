import { cn } from "@/lib/cn";

/**
 * Hand-drawn mockups of the ForgeRoom Android app.
 *
 * DESIGN.md makes product screenshots the protagonist of every section, so
 * these stand in until real captures exist. They are the only place in the
 * codebase that steps outside the marketing type scale: inside a device frame
 * we are imitating a phone UI, which has its own, much smaller, scale.
 *
 * TODO(nabil): once you have real screenshots, drop them in public/ and swap
 * the bodies of these three components for <Image /> — the surrounding panels,
 * captions, and layout stay exactly as they are.
 */

/* -------------------------------------------------------------------------
   Device frame
   ------------------------------------------------------------------------- */

function PhoneFrame({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <figure className={cn("flex w-full flex-col items-center", className)}>
      <div className="panel-edge w-full max-w-[268px] rounded-[30px] border border-hairline-strong bg-surface-2 p-2">
        <div className="relative aspect-[9/18.5] overflow-hidden rounded-[23px] border border-hairline bg-canvas">
          <div
            aria-hidden="true"
            className="absolute top-2.5 left-1/2 h-1 w-14 -translate-x-1/2 rounded-pill bg-surface-4"
          />
          <div className="flex h-full flex-col gap-3 px-3.5 pt-7 pb-4">
            {children}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-caption text-ink-subtle">
        {label}
      </figcaption>
    </figure>
  );
}

function ScreenTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] leading-tight font-medium tracking-[-0.01em] text-ink">
      {children}
    </p>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] tracking-wide text-ink-tertiary">{children}</p>
  );
}

/* -------------------------------------------------------------------------
   Screen 1 — multi-modal input
   ------------------------------------------------------------------------- */

const STYLES = [
  "Minimalist",
  "Scandinavian",
  "Japandi",
  "Industrial",
  "Tropical",
  "Modern",
];

/** Line sketch standing in for the uploaded room photo. */
function RoomSketch() {
  return (
    <svg
      viewBox="0 0 160 108"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
    >
      <rect width="160" height="108" fill="var(--color-surface-3)" />
      <path d="M0 74h160" stroke="var(--color-hairline-tertiary)" />
      <rect
        x="18"
        y="20"
        width="42"
        height="34"
        stroke="var(--color-hairline-tertiary)"
      />
      <path d="M39 20v34M18 37h42" stroke="var(--color-hairline-tertiary)" />
      <path
        d="M78 52h58v22H78z"
        fill="var(--color-surface-4)"
        stroke="var(--color-hairline-tertiary)"
      />
      <path d="M86 52v-8h16v8" stroke="var(--color-hairline-tertiary)" />
      <path
        d="M28 74v-8M28 66c-6-2-8-7-6-11 4 1 7 5 6 11ZM28 66c6-3 7-8 5-12-4 2-6 6-5 12Z"
        stroke="var(--color-hairline-tertiary)"
      />
      <path
        d="M22 74h12l-2 8H24l-2-8Z"
        fill="var(--color-surface-4)"
        stroke="var(--color-hairline-tertiary)"
      />
    </svg>
  );
}

export function CaptureScreen() {
  return (
    <PhoneFrame label="Multi-modal input">
      <ScreenTitle>New design</ScreenTitle>

      <div className="overflow-hidden rounded-md border border-hairline">
        <div className="aspect-[4/3]">
          <RoomSketch />
        </div>
        <div className="flex items-center justify-between border-t border-hairline bg-surface-1 px-2 py-1.5">
          <span className="text-[9px] text-ink-subtle">room-photo.jpg</span>
          <span className="text-[9px] text-accent">Retake</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <FieldLabel>Describe the room</FieldLabel>
        <div className="rounded-md border border-hairline bg-surface-1 px-2 py-1.5">
          <p className="text-[10px] leading-snug text-ink-muted">
            Small rented bedroom, one window, needs storage and better light.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <FieldLabel>Dimensions</FieldLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            ["L", "3.20"],
            ["W", "2.75"],
            ["H", "2.60"],
          ].map(([axis, value]) => (
            <div
              key={axis}
              className="rounded-md border border-hairline bg-surface-1 px-1.5 py-1"
            >
              <span className="text-[8px] text-ink-tertiary">{axis}</span>
              <p className="text-[10px] text-ink">{value} m</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <FieldLabel>Style</FieldLabel>
        <div className="flex flex-wrap gap-1">
          {STYLES.map((style) => (
            <span
              key={style}
              className={cn(
                "rounded-pill border px-1.5 py-0.5 text-[9px]",
                style === "Japandi"
                  ? "border-accent/60 bg-accent-faint text-accent"
                  : "border-hairline bg-surface-1 text-ink-subtle",
              )}
            >
              {style}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto grid h-8 place-items-center rounded-md bg-accent text-[11px] font-medium text-on-accent">
        Generate design
      </div>
    </PhoneFrame>
  );
}

/* -------------------------------------------------------------------------
   Screen 2 — the generated plan
   ------------------------------------------------------------------------- */

/**
 * A muted interior palette. DESIGN.md forbids stacking bright accents inside
 * a product mockup, and a real Japandi palette is warm and desaturated anyway.
 */
const PALETTE = [
  { name: "Warm linen", hex: "#E4DCCF" },
  { name: "Clay", hex: "#B08968" },
  { name: "Charred oak", hex: "#5A4B3F" },
  { name: "Sage", hex: "#7C8B74" },
  { name: "Off-black", hex: "#2E2C2A" },
];

const LAYOUT_NOTES = [
  "Move the bed to the wall opposite the window to free the light path.",
  "A narrow 40cm shelf tower fits the alcove beside the door.",
  "Layer a floor lamp in the far corner for evening light.",
];

export function PlanScreen() {
  return (
    <PhoneFrame label="Generated design plan">
      <div className="flex items-start justify-between gap-2">
        <div>
          <ScreenTitle>Japandi bedroom</ScreenTitle>
          <p className="text-[9px] text-ink-tertiary">3.20m x 2.75m x 2.60m</p>
        </div>
        <span className="rounded-pill border border-hairline bg-surface-2 px-1.5 py-0.5 text-[8px] text-ink-muted">
          Saved
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <FieldLabel>Colour palette</FieldLabel>
        <div className="flex gap-1">
          {PALETTE.map((swatch) => (
            <div key={swatch.hex} className="flex-1">
              <div
                className="h-7 rounded-sm border border-hairline"
                style={{ backgroundColor: swatch.hex }}
              />
              <p className="mt-1 text-[7px] text-ink-tertiary">{swatch.hex}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <FieldLabel>Layout</FieldLabel>
        <ul className="flex flex-col gap-1.5">
          {LAYOUT_NOTES.map((note) => (
            <li
              key={note}
              className="flex gap-1.5 rounded-md border border-hairline bg-surface-1 px-2 py-1.5"
            >
              <span
                aria-hidden="true"
                className="mt-1 size-1 shrink-0 rounded-pill bg-accent"
              />
              <p className="text-[9px] leading-snug text-ink-muted">{note}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex gap-1.5">
        <div className="grid h-8 flex-1 place-items-center rounded-md border border-hairline bg-surface-1 text-[10px] text-ink">
          Share
        </div>
        <div className="grid h-8 flex-1 place-items-center rounded-md bg-accent text-[10px] font-medium text-on-accent">
          Products
        </div>
      </div>
    </PhoneFrame>
  );
}

/* -------------------------------------------------------------------------
   Screen 3 — furniture recommendations
   ------------------------------------------------------------------------- */

/** Illustrative rows. Real prices come from the retailer API at runtime. */
const PRODUCTS = [
  { name: "Floor lamp, rattan shade", price: "RM 149" },
  { name: "Shelf unit, 40 x 180cm", price: "RM 219" },
  { name: "Linen curtains, 145 x 250cm", price: "RM 89" },
  { name: "Storage bench, oak veneer", price: "RM 265" },
];

function ProductGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M4 9h16v11H4zM4 9l2-5h12l2 5M12 4v5"
        stroke="var(--color-ink-tertiary)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function ProductsScreen() {
  return (
    <PhoneFrame label="Furniture recommendations">
      <div className="flex items-start justify-between gap-2">
        <ScreenTitle>Furniture picks</ScreenTitle>
        <span className="rounded-pill border border-hairline bg-surface-2 px-1.5 py-0.5 text-[8px] text-ink-muted">
          IKEA
        </span>
      </div>

      <ul className="flex flex-col gap-1.5">
        {PRODUCTS.map((product) => (
          <li
            key={product.name}
            className="flex items-center gap-2 rounded-md border border-hairline bg-surface-1 p-1.5"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-sm border border-hairline bg-surface-3">
              <ProductGlyph />
            </span>
            <span className="min-w-0 flex-1">
              <p className="truncate text-[10px] text-ink">{product.name}</p>
              <p className="text-[9px] text-ink-tertiary">{product.price}</p>
            </span>
            <span className="text-[9px] text-accent">View</span>
          </li>
        ))}
      </ul>

      <div className="rounded-md border border-dashed border-hairline-strong px-2 py-1.5">
        <p className="text-[8px] leading-snug text-ink-tertiary">
          Catalogue unreachable? The plan still renders — product lookup falls
          back to cached samples.
        </p>
      </div>

      <div className="mt-auto grid h-8 place-items-center rounded-md border border-hairline bg-surface-1 text-[10px] text-ink">
        Save to history
      </div>
    </PhoneFrame>
  );
}

/* -------------------------------------------------------------------------
   Showcase — the three screens as one panel
   ------------------------------------------------------------------------- */

function FlowArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 rotate-90 text-ink-tertiary lg:rotate-0"
    >
      <path
        d="M4 12h15m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArchitectureDiagram({
  layers,
  className,
}: {
  layers: ReadonlyArray<{ name: string; items: readonly string[] }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-4 lg:flex-row lg:items-center",
        className,
      )}
    >
      {layers.map((layer, index) => (
        <div
          key={layer.name}
          className="flex flex-col items-center gap-4 lg:flex-1 lg:flex-row"
        >
          <div className="panel-edge w-full rounded-lg border border-hairline bg-surface-1 p-5">
            <p className="text-card-title text-ink">{layer.name}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {layer.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1 shrink-0 rounded-pill bg-ink-tertiary"
                  />
                  <span className="text-body-sm text-ink-subtle">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {index < layers.length - 1 && (
            <div className="shrink-0">
              <FlowArrow />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
