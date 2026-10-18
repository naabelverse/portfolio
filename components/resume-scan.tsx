/**
 * Decorative hero art for the AI Resume Analyzer: a resume card in the
 * diagram grammar, scanned top to bottom. Lines the scan passes get a
 * highlighter mark, then a score pops in. Animation lives in globals.css;
 * reduced motion shows the finished state (marks and score, no scan line).
 */
const SECTIONS = [
  { heading: 64, lines: [150, 140, 120] },
  { heading: 116, lines: [160, 135, 150, 100] },
  { heading: 180, lines: [140, 155, 90] },
];
const LINES = SECTIONS.flatMap(({ heading, lines }) => lines.map((width, i) => ({ y: heading + 12 + i * 11, width })));
// The lines the "feedback" quotes.
const MARKED = [LINES[1], LINES[4], LINES[8]];

// The scan runs from the first heading to just under the last line.
const SCAN_TOP = 58;
const SCAN_HEIGHT = 168;

export function ResumeScan() {
  const ink = "var(--color-ink)";
  return (
    <svg viewBox="0 0 200 250" width="200" height="250" fill="none">
      <defs>
        <linearGradient id="resume-scan-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-cobalt)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--color-cobalt)" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <rect x="1.25" y="1.25" width="197.5" height="247.5" rx="12" fill="var(--color-white)" stroke={ink} strokeWidth="2.5" />

      {/* Name and contact line */}
      <rect x="20" y="22" width="90" height="9" rx="3" fill={ink} />
      <rect x="20" y="38" width="130" height="4" rx="2" fill="var(--color-ink-3)" opacity="0.5" />

      {/* Highlighter marks, revealed as the scan line passes (the empty rect fixes the clip box to the scan range) */}
      <g className="scan-marks">
        <rect x="0" y={SCAN_TOP} width="200" height={SCAN_HEIGHT} />
        {MARKED.map(({ y, width }) => (
          <rect key={y} x="17" y={y - 2.5} width={width + 6} height="9" rx="2" fill="var(--color-sun)" />
        ))}
      </g>

      {SECTIONS.map(({ heading }) => (
        <rect key={heading} x="20" y={heading} width="52" height="5" rx="2" fill="var(--color-ink-2)" />
      ))}
      {LINES.map(({ y, width }) => (
        <rect key={y} x="20" y={y} width={width} height="4" rx="2" fill="var(--color-ink-3)" opacity="0.45" />
      ))}

      <g className="scan-line">
        <rect x="8" y={SCAN_TOP - 22} width="184" height="22" fill="url(#resume-scan-glow)" />
        <path d={`M8 ${SCAN_TOP} H192`} stroke="var(--color-cobalt)" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="scan-score">
        <circle cx="160" cy="212" r="24" fill="var(--color-white)" stroke={ink} strokeWidth="2.5" />
        <text x="160" y="219" textAnchor="middle" className="font-display" fontSize="19" fontWeight="700" fill={ink}>
          82
        </text>
      </g>
    </svg>
  );
}
