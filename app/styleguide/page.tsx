import type { Metadata } from "next";

import { LayerDiagram } from "@/components/case-study";
import { DiagramFigure } from "@/components/diagram";
import { ContactBlock } from "@/components/sections/home-sections";
import { Button } from "@/components/ui/button";
import {
  Badge,
  Card,
  Field,
  Row,
  RowList,
  Section,
  StackList,
  StatStrip,
  type StackGroup,
} from "@/components/ui/primitives";
import { featuredProject, resumeAnalyzerProject } from "@/content/site";

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
  { name: "ink-3", hex: "#646B7A", className: "bg-ink-3", note: "5.1:1, 4.5:1 on washes" },
  { name: "cobalt", hex: "#1F43E6", className: "bg-cobalt", note: "6.7:1" },
  { name: "cobalt-deep", hex: "#132BA6", className: "bg-cobalt-deep" },
  { name: "wash-blue", hex: "#E6EBFF", className: "bg-wash-blue" },
  { name: "sun", hex: "#FFC93D", className: "bg-sun", note: "background only" },
  { name: "sun-deep", hex: "#FFBB0A", className: "bg-sun-deep" },
  { name: "wash-sun", hex: "#FFF3D4", className: "bg-wash-sun" },
  { name: "rose", hex: "#FF4F6E", className: "bg-rose", note: "fills only" },
  { name: "rose-line", hex: "#E63655", className: "bg-rose-line", note: "failure strokes only" },
  { name: "wash-rose", hex: "#FFE7EB", className: "bg-wash-rose" },
  { name: "live", hex: "#16A34A", className: "bg-live", note: "live badge dot only" },
  { name: "line", hex: "#E2E2DC", className: "bg-line" },
  { name: "line-2", hex: "#CFCFC7", className: "bg-line-2" },
];

const STATS = [
  { label: "Mainly builds with", value: "Flutter, Node, MongoDB" },
  { label: "Final-year project", value: "18,000 lines of Dart" },
  { label: "Tests on the live app", value: "559 passing" },
  { label: "Looking for", value: "An internship in Malaysia" },
];

const STACK: readonly StackGroup[] = [
  ["Mobile", ["Flutter", "Dart"]],
  ["Backend", ["Node.js", "MongoDB Atlas"]],
  ["AI", ["Claude"]],
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mt-12 mb-4 text-small text-ink-3">{children}</p>;
}

function ChapterDemo({ tone, live }: { tone: "blue" | "rose"; live?: boolean }) {
  const project = live ? resumeAnalyzerProject : featuredProject;
  return (
    <Section tone={tone}>
      <Badge kind={live ? "live" : "academic"}>{live ? "Live and public" : "Final-year project"}</Badge>
      <h2 className="mt-[18px]">Chapter on wash-{tone}</h2>
      <p className="mt-3.5 max-w-tagline text-tagline text-ink-2">
        A tagline at the chapter size, sitting under the heading.
      </p>
      <div className="mt-[clamp(36px,5vw,56px)] grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-2">
        <div>
          <h4 className="mb-1.5 font-semibold">The problem</h4>
          <p className="max-w-measure text-ink-2">
            Prose column. The stack below is a ruled spec sheet, so it needs no
            variant for the wash it sits on.
          </p>
          <StackList groups={STACK} className="mt-7" />
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/styleguide">Read the case study</Button>
            {live && <Button variant="sun" href="https://example.com">Try it yourself</Button>}
            <Button variant="ghost" href="https://github.com/naabelverse">View source</Button>
          </div>
        </div>
        <DiagramFigure diagram={project.diagram} />
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
          <h1>Heading one</h1>
          <h2>Heading two</h2>
          <h3>Heading three</h3>
          <p className="max-w-tagline text-tagline text-ink-2">Tagline, used once per chapter.</p>
          <p className="max-w-lede text-lede text-ink-2">
            Lede. I build mobile and web apps, some with AI models inside
            them.
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
          <Badge kind="academic">Final-year project</Badge>
          <Badge kind="live">Live and public</Badge>
        </div>

        <Label>Stack list on paper</Label>
        <StackList groups={STACK} />

        <Label>Cards: none, blue, sun, rose</Label>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {([undefined, "blue", "sun", "rose"] as const).map((tone) => (
            <Card key={tone ?? "none"} tone={tone}>
              <h3>{tone ?? "No tone"}</h3>
              <p className="mt-1.5 mb-3.5 text-small text-ink-2">Strongest first.</p>
              <StackList groups={STACK.slice(0, 2)} />
            </Card>
          ))}
        </div>

        <Label>Stat strip, with one empty value that renders as nothing</Label>
        <StatStrip items={[...STATS, { label: "Unconfirmed", value: "" }]} />

        <Label>Layer diagram (case studies)</Label>
        <LayerDiagram
          layers={[
            { name: "Client", items: ["Flutter app", "Provider state"] },
            { name: "API", items: ["Express routes", "JWT auth"] },
            { name: "Models", items: ["Vision model", "LLM"] },
          ]}
        />

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
        <p className="mb-6 text-small text-ink-3">Contact block on paper, after the chapters</p>
        <ContactBlock titleId="sg-contact-title" />
      </Section>
    </>
  );
}
