import Link from "next/link";

import { Logo } from "@/components/layout/top-nav";
import { Container } from "@/components/ui/primitives";
import { links, nav, profile } from "@/content/site";

const elsewhere = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
];

export function Footer() {
  // Evaluated at build time — every route here is statically rendered.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-hairline bg-canvas">
      <Container className="py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-body-sm text-ink-subtle">
              {profile.tagline}
            </p>
          </div>

          <div className="flex gap-16">
            <nav aria-label="Footer">
              <h2 className="text-caption text-ink-subtle">Site</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body-sm text-ink-subtle transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-caption text-ink-subtle">Elsewhere</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {elsewhere.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-sm text-ink-subtle transition-colors hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-8 text-caption text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.fullName}
          </p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
