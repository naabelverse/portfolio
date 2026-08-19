import { ContactForm } from "@/components/contact-form";
import { PhoneShowcase } from "@/components/mockups/forgeroom";
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
  StatusBadge,
  Tag,
} from "@/components/ui/primitives";
import {
  contact,
  featuredProject,
  hero,
  links,
  otherWork,
  proofStrip,
  skillGroups,
  timeline,
} from "@/content/site";

/* -------------------------------------------------------------------------
   Hero — type only. On a #010102 canvas restraint reads as confidence, and
   the product mockups get their own panel directly below.
   ------------------------------------------------------------------------- */

export function Hero() {
  return (
    <section className="pt-16 pb-12 md:pt-28 md:pb-20">
      <Container>
        <Reveal>
          <StatusBadge tone="success">{hero.availability}</StatusBadge>

          <h1 className="mt-8 max-w-4xl text-display-xl text-ink">
            {hero.headline}
          </h1>

          <p className="mt-8 max-w-2xl text-body-lg text-ink-muted">
            {hero.intro}
          </p>

          <p className="mt-4 max-w-2xl text-body text-ink-subtle">
            {hero.secondary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            {/* Until a CV exists in public/, point at the timeline rather
                than shipping a link that 404s in front of a recruiter. */}
            <ButtonLink
              href={links.resume ?? hero.fallbackCta.href}
              variant="secondary"
              size="lg"
            >
              {links.resume ? "Download CV" : hero.fallbackCta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Proof strip
   ------------------------------------------------------------------------- */

export function ProofStrip() {
  return (
    <Container>
      <Reveal>
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {proofStrip.map((item) => (
            <div key={item.label} className="bg-canvas px-6 py-5">
              <dt className="text-caption text-ink-subtle">{item.label}</dt>
              <dd className="mt-2 text-body-sm text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Container>
  );
}

/* -------------------------------------------------------------------------
   Featured project
   ------------------------------------------------------------------------- */

const FEATURE_BLOCKS = [
  { label: "The problem", body: featuredProject.problem },
  { label: "The approach", body: featuredProject.approach },
  { label: "Where it stands", body: featuredProject.outcome },
];

export function FeaturedProject() {
  return (
    <Section id="work" labelledBy="work-title">
      <Reveal>
        <Eyebrow>{featuredProject.eyebrow}</Eyebrow>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="work-title" className="text-display-md text-ink">
              {featuredProject.name}
            </h2>
            <p className="mt-4 text-body-lg text-ink-subtle">
              {featuredProject.tagline}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href={featuredProject.href}>
              Read the case study
            </ButtonLink>
            <ButtonLink
              href={featuredProject.repo}
              external
              variant="secondary"
            >
              View source
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <ScreenshotPanel className="mt-12">
          <PhoneShowcase />
        </ScreenshotPanel>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {FEATURE_BLOCKS.map((block) => (
            <div key={block.label}>
              <h3 className="text-caption text-ink-subtle">{block.label}</h3>
              <p className="mt-3 text-body text-ink-muted">{block.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {featuredProject.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Other work
   ------------------------------------------------------------------------- */

export function OtherWork() {
  return (
    <Section labelledBy="other-work-title">
      <Reveal>
        <SectionHeader
          id="other-work-title"
          eyebrow="Also built"
          title="Other work"
          description="Coursework and smaller builds. Less polished than ForgeRoom, but this is where the fundamentals came from."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {otherWork.map((project, index) => (
          <Reveal key={project.name} delay={index * 70}>
            <Card className="flex h-full flex-col">
              <p className="text-caption text-ink-subtle">{project.context}</p>
              <h3 className="mt-2 text-card-title text-ink">{project.name}</h3>
              <p className="mt-3 flex-1 text-body-sm text-ink-subtle">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>

              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 text-body-sm text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  View source
                </a>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Skills
   ------------------------------------------------------------------------- */

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <Reveal>
        <SectionHeader
          id="skills-title"
          eyebrow="Toolkit"
          title="What I work with"
          description="Everything here is backed by something on this page — no bars, no percentages, no tools I've only read about."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 60}>
            <Card className="h-full">
              <h3 className="text-card-title text-ink">{group.title}</h3>
              <p className="mt-2 text-body-sm text-ink-subtle">
                {group.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Background
   ------------------------------------------------------------------------- */

export function Background() {
  return (
    <Section id="background" labelledBy="background-title">
      <Reveal>
        <SectionHeader
          id="background-title"
          eyebrow="Background"
          title="Education & experience"
        />
      </Reveal>

      {/* Reveal sits inside the <li>, not around it: an <ol> may only contain
          <li> children, and a wrapper would make every entry a :last-child. */}
      <ol className="mt-12 border-l border-hairline">
        {timeline.map((entry, index) => (
          <li key={entry.title} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[4.5px] size-2 rounded-pill border border-hairline-strong bg-surface-3"
            />
            <Reveal delay={index * 60}>
              <p className="text-caption text-ink-subtle">{entry.period}</p>
              <h3 className="mt-2 text-card-title text-ink">{entry.title}</h3>
              <p className="mt-1 text-body-sm text-ink-subtle">{entry.org}</p>
              <p className="mt-3 max-w-2xl text-body text-ink-muted">
                {entry.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------- */

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <Reveal>
        <CtaBanner>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>{contact.eyebrow}</Eyebrow>
              <h2 id="contact-title" className="mt-3 text-headline text-ink">
                {contact.title}
              </h2>
              <p className="mt-4 max-w-md text-body text-ink-subtle">
                {contact.description}
              </p>
              <p className="mt-2 text-body-sm text-ink-subtle">
                {contact.formNote}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={links.github} external variant="secondary">
                  GitHub
                </ButtonLink>
                <ButtonLink href={links.linkedin} external variant="secondary">
                  LinkedIn
                </ButtonLink>
              </div>
            </div>

            <ContactForm />
          </div>
        </CtaBanner>
      </Reveal>
    </Section>
  );
}
