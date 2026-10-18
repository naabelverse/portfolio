import type { Metadata } from "next";

import {
  ArchitectureSection,
  CaseClose,
  CaseHeader,
  CaseStudy,
  DecisionGrid,
  ModuleRow,
  ProblemSection,
  Reflection,
} from "@/components/case-study";
import { Button } from "@/components/ui/button";
import { Section, SectionIntro } from "@/components/ui/primitives";
import { forgeroom } from "@/content/forgeroom";
import { featuredProject, links } from "@/content/site";

export const metadata: Metadata = {
  title: `${forgeroom.name} case study`,
  description: forgeroom.tagline,
  openGraph: {
    title: `${forgeroom.name} case study`,
    description: forgeroom.tagline,
    url: "/projects/forgeroom",
  },
  twitter: {
    card: "summary_large_image",
    title: `${forgeroom.name} case study`,
    description: forgeroom.tagline,
  },
};

export default function ForgeRoomCaseStudy() {
  return (
    <CaseStudy tone={featuredProject.tone}>
      <CaseHeader
        badge={featuredProject.badge}
        name={forgeroom.name}
        tagline={forgeroom.tagline}
        facts={forgeroom.meta}
        actions={
          <>
            <Button variant="github" href={links.forgeroomRepo}>
              View source on GitHub
            </Button>
            <Button href="/#contact">
              Get in touch
            </Button>
          </>
        }
      />

      <ProblemSection
        title={forgeroom.problem.title}
        paragraphs={forgeroom.problem.paragraphs}
        goal={forgeroom.goal}
        stack={forgeroom.stack}
        stats={forgeroom.stats}
      />

      <ArchitectureSection
        summary={forgeroom.architecture.summary}
        layers={forgeroom.architecture.layers}
        diagram={featuredProject.diagram}
      />

      <Section labelledBy="modules-title">
        <SectionIntro
          id="modules-title"
          title="Five modules"
          lede="Scoped in Chapter 1 of the report, then built in order. Each one had to work on its own before the next began."
        />
        <div className="mt-11 border-t-3 border-ink">
          {forgeroom.modules.map((module) => (
            <ModuleRow key={module.index} {...module} />
          ))}
        </div>
      </Section>

      <Section labelledBy="decisions-title">
        <SectionIntro
          id="decisions-title"
          title="Decisions worth defending"
          lede="The choices I would be asked about in an interview, and the reasoning behind each one."
        />
        <DecisionGrid decisions={forgeroom.decisions} />
      </Section>

      <Section labelledBy="challenges-title">
        <SectionIntro id="challenges-title" title="Problems I had to solve twice" />
        <div className="mt-11 grid gap-x-8 gap-y-10 md:grid-cols-2">
          {forgeroom.challenges.map((challenge) => (
            <div key={challenge.title} className="border-t-3 border-ink pt-6">
              <h3>{challenge.title}</h3>
              <p className="mt-3 max-w-measure text-ink-2">{challenge.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Reflection items={forgeroom.reflection} diff={forgeroom.reflectionDiff} />

      <CaseClose
        body="The code is public, and I'm happy to talk through any part of it, including the parts I'd build differently now."
        actions={
          <>
            <Button href="/#contact">
              Get in touch
            </Button>
            <Button variant="github" href={links.forgeroomRepo}>
              View source
            </Button>
          </>
        }
      />
    </CaseStudy>
  );
}
