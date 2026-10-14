import type { Metadata } from "next";
import Image from "next/image";

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

/** Camera-viewfinder corners round the portrait; --x/--y point each one outward for .about-corner. */
const VIEWFINDER = [
  "top-0 left-0 rounded-tl-[34px] border-t-4 border-l-4 border-cobalt [--x:-1] [--y:-1]",
  "top-0 right-0 rounded-tr-[34px] border-t-4 border-r-4 border-sun [--x:1] [--y:-1]",
  "bottom-0 left-0 rounded-bl-[34px] border-b-4 border-l-4 border-sun [--x:-1] [--y:1]",
  "right-0 bottom-0 rounded-br-[34px] border-r-4 border-b-4 border-cobalt [--x:1] [--y:1]",
];

export default function AboutPage() {
  const { intake, workMode } = about.lookingFor;
  const availability = `${intake ? `Available ${intake}. ` : ""}Open to ${workMode}`;

  return (
    <Container className="pt-[clamp(48px,7vw,86px)] pb-[clamp(56px,7vw,92px)]">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1>{profile.fullName}</h1>
          <p className="mt-6 max-w-lede text-lede text-ink-2">
            {profile.role} at {profile.university}
          </p>
        </div>
        <div className="relative order-first w-[clamp(200px,24vw,300px)] shrink-0 p-3.5 md:order-none">
          {VIEWFINDER.map((corner) => (
            <span key={corner} aria-hidden="true" className={`about-corner absolute size-12 ${corner}`} />
          ))}
          <Image
            src="/portrait.webp"
            width={520}
            height={520}
            alt={`Portrait of ${profile.fullName}`}
            sizes="300px"
            preload
            className="h-auto w-full rounded-[22px] border-2 border-ink"
          />
        </div>
      </div>

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
