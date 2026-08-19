import type { Metadata } from "next";

import { Button, ButtonLink } from "@/components/ui/button";
import {
  Card,
  Container,
  CtaBanner,
  Eyebrow,
  ScreenshotPanel,
  Section,
  StatusBadge,
  Tag,
} from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Design system proof sheet.",
  robots: { index: false, follow: false },
};

const SURFACES = [
  { name: "canvas", value: "#010102", className: "bg-canvas" },
  { name: "surface-1", value: "#0f1011", className: "bg-surface-1" },
  { name: "surface-2", value: "#141516", className: "bg-surface-2" },
  { name: "surface-3", value: "#18191a", className: "bg-surface-3" },
  { name: "surface-4", value: "#191a1b", className: "bg-surface-4" },
];

const INKS = [
  { name: "ink", value: "#f7f8f8", className: "text-ink", contrast: "19.4:1" },
  {
    name: "ink-muted",
    value: "#d0d6e0",
    className: "text-ink-muted",
    contrast: "13.6:1",
  },
  {
    name: "ink-subtle",
    value: "#8a8f98",
    className: "text-ink-subtle",
    contrast: "6.4:1",
  },
  {
    name: "ink-tertiary",
    value: "#62666d",
    className: "text-ink-tertiary",
    contrast: "3.6:1 — large or decorative only",
  },
];

const ACCENTS = [
  { name: "accent", value: "#2dd4bf", className: "bg-accent" },
  { name: "accent-hover", value: "#5eead4", className: "bg-accent-hover" },
  { name: "accent-pressed", value: "#14b8a6", className: "bg-accent-pressed" },
  { name: "success", value: "#27a644", className: "bg-success" },
];

const TYPE_SCALE = [
  { token: "display-xl", className: "text-display-xl", note: "80px / 600" },
  { token: "display-lg", className: "text-display-lg", note: "56px / 600" },
  { token: "display-md", className: "text-display-md", note: "40px / 600" },
  { token: "headline", className: "text-headline", note: "28px / 600" },
  { token: "card-title", className: "text-card-title", note: "22px / 500" },
  { token: "subhead", className: "text-subhead", note: "20px / 400" },
  { token: "body-lg", className: "text-body-lg", note: "18px / 400" },
  { token: "body", className: "text-body", note: "16px / 400" },
  { token: "body-sm", className: "text-body-sm", note: "14px / 400" },
  { token: "caption", className: "text-caption", note: "12px / 400" },
  { token: "eyebrow", className: "text-eyebrow", note: "13px / 500, +tracking" },
  { token: "mono", className: "font-mono text-mono", note: "13px / 400" },
];

const RADII = [
  { token: "xs", className: "rounded-xs", value: "4px" },
  { token: "sm", className: "rounded-sm", value: "6px" },
  { token: "md", className: "rounded-md", value: "8px — buttons, inputs" },
  { token: "lg", className: "rounded-lg", value: "12px — cards" },
  { token: "xl", className: "rounded-xl", value: "16px — screenshot panels" },
  { token: "xxl", className: "rounded-xxl", value: "24px" },
  { token: "pill", className: "rounded-pill", value: "9999px — badges only" },
];

function Swatch({
  name,
  value,
  className,
}: {
  name: string;
  value: string;
  className: string;
}) {
  return (
    <div>
      <div
        className={`h-16 rounded-md border border-hairline ${className}`}
        aria-hidden="true"
      />
      <p className="mt-2 text-body-sm text-ink">{name}</p>
      <p className="font-mono text-mono text-ink-subtle">{value}</p>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Container className="pt-16 pb-8">
        <Eyebrow>Internal</Eyebrow>
        <h1 className="mt-4 text-display-md text-ink">Styleguide</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-subtle">
          Every token in the system, rendered. Check this page against DESIGN.md
          after changing globals.css. Not linked from the site and excluded from
          the sitemap.
        </p>
      </Container>

      <Section className="py-10">
        <h2 className="text-headline text-ink">Surface ladder</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          {SURFACES.map((surface) => (
            <Swatch key={surface.name} {...surface} />
          ))}
        </div>

        <h2 className="mt-16 text-headline text-ink">Accent &amp; semantic</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {ACCENTS.map((accent) => (
            <Swatch key={accent.name} {...accent} />
          ))}
        </div>

        <h2 className="mt-16 text-headline text-ink">Ink</h2>
        <ul className="mt-6 flex flex-col gap-4">
          {INKS.map((ink) => (
            <li
              key={ink.name}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-hairline pb-4"
            >
              <span className={`text-body-lg ${ink.className}`}>
                The quick brown fox — {ink.name}
              </span>
              <span className="font-mono text-mono text-ink-subtle">
                {ink.value}
              </span>
              <span className="text-caption text-ink-subtle">
                {ink.contrast}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="py-10">
        <h2 className="text-headline text-ink">Type scale</h2>
        <ul className="mt-6 flex flex-col gap-8">
          {TYPE_SCALE.map((step) => (
            <li key={step.token} className="border-b border-hairline pb-8">
              <p className="font-mono text-mono text-ink-subtle">
                {step.token} · {step.note}
              </p>
              <p className={`mt-3 text-ink ${step.className}`}>
                Design is how it works
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="py-10">
        <h2 className="text-headline text-ink">Radius</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
          {RADII.map((radius) => (
            <div key={radius.token}>
              <div
                aria-hidden="true"
                className={`h-16 border border-hairline-strong bg-surface-2 ${radius.className}`}
              />
              <p className="mt-2 text-body-sm text-ink">{radius.token}</p>
              <p className="text-caption text-ink-subtle">{radius.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-10">
        <h2 className="text-headline text-ink">Buttons</h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="inverse">Inverse</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <ButtonLink href="/">Link as button</ButtonLink>
        </div>

        <h2 className="mt-16 text-headline text-ink">Chips</h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusBadge>Neutral badge</StatusBadge>
          <StatusBadge tone="success">Success badge</StatusBadge>
          <Tag>Flutter</Tag>
          <Tag>Node.js</Tag>
        </div>
      </Section>

      <Section className="py-10">
        <h2 className="text-headline text-ink">Elevation</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card>
            <p className="text-card-title text-ink">Level 1</p>
            <p className="mt-2 text-body-sm text-ink-subtle">
              surface-1, hairline border, inset top highlight.
            </p>
          </Card>
          <Card level={2}>
            <p className="text-card-title text-ink">Level 2</p>
            <p className="mt-2 text-body-sm text-ink-subtle">
              surface-2, hairline-strong border.
            </p>
          </Card>
          <Card interactive>
            <p className="text-card-title text-ink">Interactive</p>
            <p className="mt-2 text-body-sm text-ink-subtle">
              Hover to lift from surface-1 to surface-2.
            </p>
          </Card>
        </div>

        <ScreenshotPanel className="mt-6">
          <p className="text-card-title text-ink">Screenshot panel</p>
          <p className="mt-2 text-body-sm text-ink-subtle">
            16px radius. Frames product mockups.
          </p>
        </ScreenshotPanel>

        <CtaBanner className="mt-6">
          <p className="text-headline text-ink">CTA banner</p>
          <p className="mt-2 text-body text-ink-subtle">
            48px padding at desktop.
          </p>
        </CtaBanner>
      </Section>
    </>
  );
}
