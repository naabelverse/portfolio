import { Panel } from "@/components/ui/primitives";

/*
 * System diagrams, drawn from data in content/site.ts. A new project gets a
 * diagram by adding a `diagram` object; no drawing code changes.
 *
 * SVG text scales with the drawing, so one fixed layout cannot keep labels
 * legible from 1280px down to 360px. Each diagram renders twice, a wide
 * layout (380 units) and a narrow one (280 units), and the panel's width
 * picks which shows. Narrow labels break at `|`; authors place it so each
 * line fits, and on wide it reads as a space. Check new labels at 360px.
 */

export type DiagramStep = {
  /** `model` is the sun box where a model does the work; `output` is the result. */
  kind?: "model" | "output";
  /** Bold statements, one per line on wide. */
  lines: readonly string[];
  /** Grey sub-label under the statements. */
  note?: string;
};

export type Diagram = {
  /** One sentence describing the whole flow, for screen readers. */
  label: string;
  /** An engineering point, not a restatement of the picture. */
  caption: string;
  steps: readonly DiagramStep[];
  /**
   * The failure path, in rose-line. With `label` it drops below step `from`
   * and runs back left to its label; with `to` it brackets the right edge
   * from step `from` to step `to`.
   */
  fallback: { from: number; label: string } | { from: number; to: number };
};

const FILL = { model: "fill-sun", output: "fill-wash-blue" } as const;
const STROKE = "stroke-ink stroke-[2.5]";
const FAIL = "fill-none stroke-rose-line stroke-[2.5] [stroke-dasharray:7_6]";
const TITLE = "fill-ink text-[14px] font-semibold";
const NOTE = "fill-ink-2 text-[12.5px]";

// Vertical rhythm, in viewBox units.
const PAD_TOP = 28;
const TITLE_STEP = 26;
const NOTE_STEP = 20;
const WRAP_STEP = 19;
const PAD_BOTTOM = { title: 20, note: 16 };
const GAP = 28;
const TEXT_X = 22;

function DiagramSvg({ diagram, width, wide }: { diagram: Diagram; width: number; wide: boolean }) {
  const split = (text: string) => (wide ? [text.replaceAll("|", " ")] : text.split("|"));
  const cx = width / 2;
  const boxes: { top: number; bottom: number }[] = [];
  const parts: React.ReactNode[] = [];
  let y = 6;

  diagram.steps.forEach((step, i) => {
    const top = y;
    // `wrap` marks the second line of a broken label: it sits tighter than
    // the next statement, so one wrapped statement doesn't read as two.
    const rows = [
      ...step.lines.flatMap((line) => split(line).map((text, k) => ({ text, note: false, wrap: k > 0 }))),
      ...(step.note ? split(step.note).map((text, k) => ({ text, note: true, wrap: k > 0 })) : []),
    ];
    let baseline = top + PAD_TOP - TITLE_STEP;
    const texts = rows.map((row, r) => {
      baseline += r === 0 ? TITLE_STEP : row.wrap ? WRAP_STEP : row.note ? NOTE_STEP : TITLE_STEP;
      return (
        <text key={`t${i}-${r}`} x={TEXT_X} y={baseline} className={row.note ? NOTE : TITLE}>
          {row.text}
        </text>
      );
    });
    const bottom = baseline + (rows.at(-1)?.note ? PAD_BOTTOM.note : PAD_BOTTOM.title);
    boxes.push({ top, bottom });

    if (i > 0) {
      parts.push(
        <path key={`a${i}`} d={`M${cx} ${top - GAP} L${cx} ${top} M${cx - 7} ${top - 7} L${cx} ${top} L${cx + 7} ${top - 7}`} className={`fill-none ${STROKE}`} />,
      );
    }
    parts.push(
      <rect key={`b${i}`} x="4" y={top} width={width - 8} height={bottom - top} rx="12" className={`${step.kind ? FILL[step.kind] : "fill-white"} ${STROKE}`} />,
      ...texts,
    );
    y = bottom + GAP;
  });

  const { fallback } = diagram;
  const from = boxes[fallback.from];
  let height = boxes.at(-1)!.bottom + 6;

  if ("to" in fallback) {
    const to = boxes[fallback.to];
    const y1 = (from.top + from.bottom) / 2;
    const y2 = (to.top + to.bottom) / 2;
    parts.push(
      <path key="fail" d={`M${width - 28} ${y1} L${width - 12} ${y1} L${width - 12} ${y2} L${width - 28} ${y2}`} className={FAIL} />,
    );
  } else {
    const drop = from.bottom + 30;
    parts.push(
      <path key="fail" d={`M${width - 40} ${from.bottom} L${width - 40} ${drop} L${TEXT_X} ${drop} M${TEXT_X + 8} ${drop - 7} L${TEXT_X} ${drop} L${TEXT_X + 8} ${drop + 7}`} className={FAIL} />,
    );
    split(fallback.label).forEach((text, r) => {
      const baseline = drop + 26 + r * WRAP_STEP;
      parts.push(
        <text key={`fl${r}`} x={TEXT_X} y={baseline} className={NOTE}>
          {text}
        </text>,
      );
      height = baseline + 8;
    });
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={diagram.label}>
      {parts}
    </svg>
  );
}

/** A diagram in its panel. Only one layout is displayed, so only one is announced. */
export function DiagramFigure({ diagram, className }: { diagram: Diagram; className?: string }) {
  return (
    <Panel caption={diagram.caption} className={className}>
      {/* Switch on the panel's own width, not the viewport: the panel is
          half-width beside prose past 980px and full-width below it. 368px
          is where the wide layout's 12.5px sub-labels would drop under 12. */}
      <div className="@container">
        <div className="hidden @min-[368px]:block">
          <DiagramSvg diagram={diagram} width={380} wide />
        </div>
        <div className="@min-[368px]:hidden">
          <DiagramSvg diagram={diagram} width={280} wide={false} />
        </div>
      </div>
    </Panel>
  );
}
