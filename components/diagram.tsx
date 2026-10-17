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
  /** `ink` darkens the model box and puts the output on rose, for the rose chapter. */
  palette?: "ink";
  /**
   * The failure path, in rose-line. With `label` it drops below step `from`
   * and runs back left to its label; with `beside` the last step shares its
   * row with this outcome, which the step above reaches by a dashed arrow.
   */
  fallback: { from: number; label: string } | { beside: DiagramStep };
};

const FILL = {
  sun: { model: "fill-sun", output: "fill-wash-blue" },
  ink: { model: "fill-ink", output: "fill-wash-rose" },
} as const;
const STROKE = "stroke-ink stroke-[2.5]";
const FAIL = "fill-none stroke-rose-line stroke-[2.5] [stroke-dasharray:7_6]";
const FAIL_BOX = "fill-white stroke-rose-line stroke-[2.5] [stroke-dasharray:7_6]";
const SPLIT_GAP = 12;
const TITLE = "fill-ink text-[14px] font-semibold";
const NOTE = "fill-ink-2 text-[12.5px]";
const TITLE_ON_INK = "fill-white text-[14px] font-semibold";
const NOTE_ON_INK = "fill-line-2 text-[12.5px]";

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
  const { fallback } = diagram;
  const boxes: { top: number; bottom: number }[] = [];
  const parts: React.ReactNode[] = [];
  let y = 6;

  // One step's text, centred on `x` with its first baseline below `top`.
  const block = (step: DiagramStep, key: string, x: number, top: number) => {
    const dark = diagram.palette === "ink" && step.kind === "model";
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
        <text key={`t${key}-${r}`} x={x} y={baseline} textAnchor="middle"
          className={row.note ? (dark ? NOTE_ON_INK : NOTE) : dark ? TITLE_ON_INK : TITLE}
        >
          {row.text}
        </text>
      );
    });
    return { texts, bottom: baseline + (rows.at(-1)?.note ? PAD_BOTTOM.note : PAD_BOTTOM.title) };
  };

  diagram.steps.forEach((step, i) => {
    const top = y;
    const fill = step.kind ? FILL[diagram.palette ?? "sun"][step.kind] : "fill-white";
    const half = (width - 8 - SPLIT_GAP) / 2;
    const cols =
      "beside" in fallback && i === diagram.steps.length - 1
        ? [
            { step, x: 4, w: half, box: `${fill} ${STROKE}`, fail: false },
            { step: fallback.beside, x: 4 + half + SPLIT_GAP, w: half, box: FAIL_BOX, fail: true },
          ]
        : [{ step, x: 4, w: width - 8, box: `${fill} ${STROKE}`, fail: false }];
    const laid = cols.map((col, k) => ({ ...col, ...block(col.step, `${i}-${k}`, col.x + col.w / 2, top) }));
    const bottom = Math.max(...laid.map((col) => col.bottom));
    boxes.push({ top, bottom });

    laid.forEach((col, k) => {
      const ax = col.x + col.w / 2;
      if (i > 0) {
        const head = `M${ax - 7} ${top - 7} L${ax} ${top} L${ax + 7} ${top - 7}`;
        parts.push(
          col.fail ? (
            <g key={`a${i}-${k}`}>
              <path d={`M${ax} ${top - GAP} L${ax} ${top - 2}`} className={FAIL} />
              <path d={head} className="fill-none stroke-rose-line stroke-[2.5]" />
            </g>
          ) : (
            <path key={`a${i}-${k}`} d={`M${ax} ${top - GAP} L${ax} ${top} ${head}`} className={`fill-none ${STROKE}`} />
          ),
        );
      }
      parts.push(
        <rect key={`b${i}-${k}`} x={col.x} y={top} width={col.w} height={bottom - top} rx="12" className={col.box} />,
        ...col.texts,
      );
    });
    y = bottom + GAP;
  });

  let height = boxes.at(-1)!.bottom + 6;

  if ("label" in fallback) {
    const from = boxes[fallback.from];
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
