import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, Container } from "@/components/ui/primitives";
import { about, links, profile } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.fullName}, ${profile.role} at ${profile.universityShort}, and what I'm looking for in an internship.`,
  openGraph: {
    title: `About ${profile.displayName}`,
    description: profile.metaDescription,
    url: "/about",
  },
};

export default function AboutPage() {
  const { intake, workMode } = about.lookingFor;
  const availability = `${intake ? `Available ${intake}. ` : ""}Open to ${workMode}`;

  return (
    <Container className="pt-[clamp(48px,7vw,86px)] pb-[clamp(56px,7vw,92px)]">
      <h1>{profile.fullName}</h1>
      <p className="mt-6 max-w-lede text-lede text-ink-2">
        {profile.role} at {profile.university}
      </p>

      <div className="mt-[clamp(44px,6vw,72px)] grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="grid gap-5">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-measure text-ink-2">
              {paragraph}
            </p>
          ))}
        </div>

        <Card tone="blue">
          <h2 className="text-[clamp(20px,2.4vw,27px)] leading-[1.2] font-semibold tracking-[-0.02em]">
            {about.lookingFor.title}
          </h2>
          <p className="mt-3 text-ink-2">{about.lookingFor.body}</p>
          <ul className="mt-5 grid list-disc gap-2 border-t-2 border-ink/15 pt-5 pl-5 text-small marker:text-cobalt">
            {[availability, ...about.lookingFor.details].map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            {links.resume && (
              <Button variant="ghost" href={links.resume}>
                Download CV
              </Button>
            )}
            <Button variant="ghost" href={links.linkedin}>
              LinkedIn
            </Button>
          </div>
        </Card>
      </div>
    </Container>
  );
}
