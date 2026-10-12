import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import {
  Badge,
  Card,
  Chip,
  Field,
  Panel,
  Row,
  RowList,
  Section,
  StatStrip,
} from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Design system proof sheet.",
  robots: { index: false, follow: false },
};

/** Contrast is against paper unless noted; computed with the WCAG formula. */
const COLOURS = [
  { name: "paper", hex: "#FAFAF7", className: "bg-paper" },
  { name: "white", hex: "#FFFFFF", className: "bg-white" },
  { name: "ink", hex: "#111318", className: "bg-ink", note: "17.8:1" },
  { name: "ink-2", hex: "#4A4F5C", className: "bg-ink-2", note: "7.8:1" },
  { name: "ink-3", hex: "#848B9A", className: "bg-ink-3", note: "3.3:1, fails AA" },
  { name: "cobalt", hex: "#1F43E6", className: "bg-cobalt", note: "6.7:1" },
  { name: "cobalt-deep", hex: "#132BA6", className: "bg-cobalt-deep" },
  { name: "wash-blue", hex: "#E6EBFF", className: "bg-wash-blue" },
  { name: "sun", hex: "#FFC93D", className: "bg-sun", note: "background only" },
  { name: "sun-deep", hex: "#FFBB0A", className: "bg-sun-deep" },
  { name: "wash-sun", hex: "#FFF3D4", className: "bg-wash-sun" },
  { name: "rose", hex: "#FF4F6E", className: "bg-rose", note: "failure path only" },
  { name: "wash-rose", hex: "#FFE7EB", className: "bg-wash-rose" },
  { name: "line", hex: "#E2E2DC", className: "bg-line" },
  { name: "line-2", hex: "#CFCFC7", className: "bg-line-2" },
];

const STATS = [
  { label: "Mainly builds with", value: "Flutter, Node, MongoDB" },
  { label: "Final-year project", value: "18,000 lines of Dart" },
  { label: "Tests on the live app", value: "538 passing" },
  { label: "Looking for", value: "An internship in Malaysia" },
];

const STACK = ["Flutter", "Dart", "Node.js", "MongoDB Atlas", "Claude"];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mt-12 mb-4 text-small text-ink-3">{children}</p>;
}

/** Stand-in until the real diagrams land in step 4. */
function SampleDiagram() {
  return (
    <svg viewBox="0 0 380 150" role="img" aria-label="Sample diagram: an input box, an arrow, a model box, and a dashed failure path.">
      <rect x="4" y="6" width="372" height="46" rx="12" fill="#fff" stroke="#111318" strokeWidth="2.5" />
      <text x="22" y="34" fontSize="14" fontWeight="600" fill="#111318">Input</text>
      <path d="M190 52 L190 80 M183 73 L190 80 L197 73" stroke="#111318" strokeWidth="2.5" fill="none" />
      <rect x="4" y="80" width="372" height="46" rx="12" fill="#FFC93D" stroke="#111318" strokeWidth="2.5" />
      <text x="22" y="108" fontSize="14" fontWeight="600" fill="#111318">Model step</text>
      <path d="M352 29 L368 29 L368 103 L352 103" stroke="#FF4F6E" strokeWidth="2.5" strokeDasharray="7 6" fill="none" />
    </svg>
  );
}

function ChapterDemo({ tone, live }: { tone: "blue" | "rose"; live?: boolean }) {
  return (
    <Section tone={tone}>
      <Badge live={live}>{live ? "Live and public" : "Final-year project"}</Badge>
      <h2 className="mt-[18px]">Chapter on wash-{tone}</h2>
      <p className="mt-3.5 max-w-tagline text-tagline text-ink-2">
        A tagline at the chapter size, sitting under the heading.
      </p>
      <div className="mt-[clamp(36px,5vw,56px)] grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-2">
        <div>
          <h4 className="mb-1.5 font-semibold">The problem</h4>
          <p className="max-w-measure text-ink-2">
            Prose column. Chips below sit on white because the chapter sets the
            chip fill; the same chip on paper sections stays paper.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/styleguide">Read the case study</Button>
            {live && <Button variant="sun" href="https://example.com">Try it yourself</Button>}
            <Button variant="ghost" href="https://github.com/naabelverse">View source</Button>
          </div>
        </div>
        <Panel caption="The caption makes an engineering point rather than restating the picture.">
          <SampleDiagram />
        </Panel>
      </div>
    </Section>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Section>
        <h1>Styleguide</h1>
        <p className="mt-6 max-w-lede text-lede text-ink-2">
          Every primitive and variant on one page, for sign-off before real
          pages are touched.
        </p>

        <Label>Colour</Label>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
          {COLOURS.map((c) => (
            <li key={c.name}>
              <div className={`h-16 rounded-input border-2 border-ink ${c.className}`} />
              <p className="mt-2 text-small font-semibold">{c.name}</p>
              <p className="text-small text-ink-2">
                {c.hex}
                {c.note && `, ${c.note}`}
              </p>
            </li>
          ))}
        </ul>

        <Label>Type</Label>
        <div className="space-y-6">
          <h1>
            Heading one with a <mark className="rounded-[4px] bg-sun px-[0.1em] text-ink">highlight</mark>
          </h1>
          <h2>Heading two</h2>
          <h3>Heading three</h3>
          <p className="max-w-tagline text-tagline text-ink-2">Tagline, used once per chapter.</p>
          <p className="max-w-lede text-lede text-ink-2">
            Lede. Final-year software engineering student at UTHM building apps
            with models inside them.
          </p>
          <p className="max-w-measure">
            Body at 17px. Line length is capped with the measure token, not a
            base style, so captions and grid cells are left alone.
          </p>
          <p className="text-small text-ink-2">Small at 15px, for captions and labels.</p>
          <p>
            Mono only for code: <code className="font-mono text-small">naabelverse/ForgeRoom</code>
          </p>
        </div>

        <Label>Buttons, as buttons and as links</Label>
        <div className="flex flex-wrap gap-3.5">
          <Button>Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="sun">Sun</Button>
          <Button href="/">Internal link</Button>
          <Button variant="ghost" href="https://github.com/naabelverse">External link</Button>
          <Button disabled>Disabled</Button>
        </div>

        <Label>Badges</Label>
        <div className="flex flex-wrap gap-3">
          <Badge>Final-year project</Badge>
          <Badge live>Live and public</Badge>
        </div>

        <Label>Chips on paper</Label>
        <div className="flex flex-wrap gap-2">
          {STACK.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>

        <Label>Cards: none, blue, sun, rose</Label>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {([undefined, "blue", "sun", "rose"] as const).map((tone) => (
            <Card key={tone ?? "none"} tone={tone}>
              <h3>{tone ?? "No tone"}</h3>
              <p className="mt-1.5 mb-3.5 text-small text-ink-2">Strongest first.</p>
              <ul className="flex flex-wrap gap-[7px]">
                {STACK.slice(0, 3).map((s) => (
                  <li key={s}>
                    <Chip compact>{s}</Chip>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Label>Stat strip</Label>
        <StatStrip items={STATS} />

        <Label>Fields</Label>
        <form className="grid max-w-xl gap-4 rounded-panel bg-white p-[clamp(20px,3vw,28px)]">
          <Field id="sg-name" label="Your name" autoComplete="name" />
          <Field id="sg-email" label="Email" type="email" autoComplete="email" />
          <Field id="sg-message" label="Message" multiline />
          <Button type="button" className="justify-self-start">
            Send message
          </Button>
        </form>

        <Label>Row list, project column</Label>
        <RowList>
          <Row aside={<><h3>TinyTots</h3><p className="mt-1.5 text-[15px] text-ink-3">C# and ASP.NET Web Forms</p></>}>
            <p className="max-w-measure text-[16.5px] text-ink-2">
              A child registration system persisted in SQL Server.
            </p>
          </Row>
          <Row aside={<><h3>Lab work</h3><p className="mt-1.5 text-[15px] text-ink-3">.NET 8, EF Core, MySQL</p></>}>
            <p className="max-w-measure text-[16.5px] text-ink-2">
              ASP.NET MVC pages with Entity Framework Core.
            </p>
          </Row>
        </RowList>

        <Label>Row list, narrow date column</Label>
        <RowList narrow>
          <Row aside={<p className="font-display text-[18px] font-bold text-cobalt">Aug 2026</p>}>
            <h3>AI Resume Analyzer</h3>
            <p className="mt-[3px] text-[15.5px] text-ink-3">Personal project</p>
          </Row>
          <Row aside={null}>
            <h3>An entry with no date</h3>
            <p className="mt-[3px] text-[15.5px] text-ink-3">The date column renders empty.</p>
          </Row>
        </RowList>
      </Section>

      <ChapterDemo tone="blue" />
      <ChapterDemo tone="rose" live />

      <Section>
        <p className="text-small text-ink-2">Plain paper section after the chapters.</p>
      </Section>
    </>
  );
}
