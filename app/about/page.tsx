import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  Container,
  CtaBanner,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui/primitives";
import { about, links, profile, timeline } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.fullName} — ${profile.role} at ${profile.universityShort}, and what I'm looking for in an internship.`,
  openGraph: {
    title: `About ${profile.displayName}`,
    description: profile.metaDescription,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container>
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-display-lg text-ink">
              {profile.fullName}
            </h1>
            <p className="mt-6 text-body-lg text-ink-subtle">
              {profile.role} · {profile.university}
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="py-8 md:py-12">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="max-w-2xl">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 text-body-lg text-ink-muted first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Card level={2} className="h-fit">
              <h2 className="text-card-title text-ink">
                {about.lookingFor.title}
              </h2>
              <p className="mt-4 text-body text-ink-muted">
                {about.lookingFor.body}
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
                {about.lookingFor.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-pill bg-accent"
                    />
                    <span className="text-body-sm text-ink-subtle">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {links.resume && (
                  <ButtonLink href={links.resume} variant="secondary" size="sm">
                    Download CV
                  </ButtonLink>
                )}
                <ButtonLink
                  href={links.linkedin}
                  external
                  variant="secondary"
                  size="sm"
                >
                  LinkedIn
                </ButtonLink>
              </div>
            </Card>
          </div>
        </Reveal>
      </Section>

      <Section labelledBy="about-background-title">
        <Reveal>
          <SectionHeader
            id="about-background-title"
            eyebrow="Background"
            title="Education & experience"
          />
        </Reveal>

        {/* Reveal inside the <li> — see the note on the home page timeline. */}
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

      <Section id="contact" labelledBy="about-contact-title">
        <Reveal>
          <CtaBanner>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow>Contact</Eyebrow>
                <h2
                  id="about-contact-title"
                  className="mt-3 text-headline text-ink"
                >
                  Say hello
                </h2>
                <p className="mt-4 max-w-md text-body text-ink-subtle">
                  Whether it&rsquo;s an internship, a question about ForgeRoom,
                  or something you think I&rsquo;d find interesting — the form
                  reaches me directly.
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
    </>
  );
}
