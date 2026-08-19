import type { Metadata } from "next";

import {
  ArchitectureDiagram,
  CaptureScreen,
  PlanScreen,
  ProductsScreen,
} from "@/components/mockups/forgeroom";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  Container,
  CtaBanner,
  Eyebrow,
  ScreenshotPanel,
  Section,
  SectionHeader,
  Tag,
} from "@/components/ui/primitives";
import { forgeroom } from "@/content/forgeroom";
import { featuredProject, links } from "@/content/site";

export const metadata: Metadata = {
  title: `${forgeroom.name} — case study`,
  description: forgeroom.tagline,
  openGraph: {
    title: `${forgeroom.name} — case study`,
    description: forgeroom.tagline,
    url: "/projects/forgeroom",
  },
};

/** The mockup that sits beside each module, where one applies. */
const MODULE_VISUALS: Record<string, React.ReactNode> = {
  "02": <CaptureScreen />,
  "03": <PlanScreen />,
  "04": <ProductsScreen />,
};

export default function ForgeRoomCaseStudy() {
  return (
    <>
      {/* Header ---------------------------------------------------------- */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container>
          <Reveal>
            <Eyebrow>{forgeroom.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-display-lg text-ink">{forgeroom.name}</h1>
            <p className="mt-6 max-w-3xl text-body-lg text-ink-muted">
              {forgeroom.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={links.forgeroomRepo} external>
                View source on GitHub
              </ButtonLink>
              <ButtonLink href="/#contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>

            <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
              {forgeroom.meta.map((item) => (
                <div key={item.label} className="bg-canvas px-6 py-5">
                  <dt className="text-caption text-ink-subtle">{item.label}</dt>
                  <dd className="mt-2 text-body-sm text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Problem --------------------------------------------------------- */}
      <Section labelledBy="problem-title" className="py-12 md:py-20">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <h2 id="problem-title" className="text-display-md text-ink">
                {forgeroom.problem.title}
              </h2>
              {forgeroom.problem.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-body-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <Card level={2} className="h-fit">
              <Eyebrow>The goal</Eyebrow>
              <p className="mt-3 text-body-lg text-ink">{forgeroom.goal}</p>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-6">
                {featuredProject.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </Card>
          </div>
        </Reveal>
      </Section>

      {/* Scale ----------------------------------------------------------- */}
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline lg:grid-cols-4">
            {forgeroom.stats.map((stat) => (
              <div key={stat.label} className="bg-canvas px-6 py-6">
                <dt className="text-caption text-ink-subtle">{stat.label}</dt>
                <dd className="mt-2 text-headline text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* Architecture ---------------------------------------------------- */}
      <Section labelledBy="architecture-title">
        <Reveal>
          <SectionHeader
            id="architecture-title"
            eyebrow="How it fits together"
            title="Architecture"
            description={forgeroom.architecture.summary}
          />
        </Reveal>
        <Reveal delay={80}>
          <ArchitectureDiagram
            layers={forgeroom.architecture.layers}
            className="mt-12"
          />
        </Reveal>
      </Section>

      {/* Modules --------------------------------------------------------- */}
      <Section labelledBy="modules-title">
        <Reveal>
          <SectionHeader
            id="modules-title"
            eyebrow="The build"
            title="Five modules"
            description="Scoped in Chapter 1 of the report, then built in order. Each one had to work on its own before the next began."
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-6">
          {forgeroom.modules.map((module) => {
            const visual = MODULE_VISUALS[module.index];

            return (
              <Reveal key={module.index}>
                <Card className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:p-10">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-mono text-accent">
                        {module.index}
                      </span>
                      <h3 className="text-card-title text-ink">
                        {module.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-body-lg text-ink">
                      {module.summary}
                    </p>
                    <p className="mt-4 max-w-2xl text-body text-ink-subtle">
                      {module.detail}
                    </p>
                  </div>

                  {visual && (
                    <div className="justify-self-center lg:w-[268px]">
                      {visual}
                    </div>
                  )}
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Decisions ------------------------------------------------------- */}
      <Section labelledBy="decisions-title">
        <Reveal>
          <SectionHeader
            id="decisions-title"
            eyebrow="Engineering"
            title="Decisions worth defending"
            description="The choices I would be asked about in an interview, and the reasoning behind each one."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {forgeroom.decisions.map((decision, index) => (
            <Reveal key={decision.title} delay={index * 60}>
              <Card className="h-full">
                <h3 className="text-card-title text-ink">{decision.title}</h3>
                <p className="mt-4 text-body text-ink-muted">
                  {decision.decision}
                </p>
                <p className="mt-4 border-t border-hairline pt-4 text-body-sm text-ink-subtle">
                  <span className="text-ink-muted">Why: </span>
                  {decision.why}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Challenges ------------------------------------------------------ */}
      <Section labelledBy="challenges-title">
        <Reveal>
          <SectionHeader
            id="challenges-title"
            eyebrow="What was hard"
            title="Problems I had to solve twice"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {forgeroom.challenges.map((challenge, index) => (
            <Reveal key={challenge.title} delay={index * 60}>
              <div className="h-full border-t border-hairline pt-6">
                <h3 className="text-card-title text-ink">{challenge.title}</h3>
                <p className="mt-3 text-body text-ink-subtle">
                  {challenge.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Reflection ------------------------------------------------------ */}
      <Section labelledBy="reflection-title">
        <Reveal>
          <ScreenshotPanel className="p-8 md:p-12">
            <Eyebrow>Looking back</Eyebrow>
            <h2 id="reflection-title" className="mt-3 text-headline text-ink">
              What I&rsquo;d change
            </h2>
            <ul className="mt-8 flex flex-col gap-5">
              {forgeroom.reflection.map((item) => (
                <li key={item} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-accent"
                  />
                  <p className="max-w-3xl text-body-lg text-ink-muted">{item}</p>
                </li>
              ))}
            </ul>
          </ScreenshotPanel>
        </Reveal>
      </Section>

      {/* Close ----------------------------------------------------------- */}
      <Section>
        <Reveal>
          <CtaBanner className="text-center">
            <h2 className="text-headline text-ink">
              Want the full walkthrough?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body text-ink-subtle">
              The code is public, and I&rsquo;m happy to talk through any part
              of it — including the parts I&rsquo;d build differently now.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/#contact">Get in touch</ButtonLink>
              <ButtonLink
                href={links.forgeroomRepo}
                external
                variant="secondary"
              >
                View source
              </ButtonLink>
            </div>
          </CtaBanner>
        </Reveal>
      </Section>
    </>
  );
}
