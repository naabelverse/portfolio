import Link from "next/link";

import { Container } from "@/components/ui/primitives";
import { footerNav, links, profile } from "@/content/site";

const elsewhere = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
];

/** Prototype footer, plus the site links: About is only reachable from here. */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-line py-9 text-[15px] text-ink-3">
      <Container className="flex flex-col gap-5">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-2 hover:text-cobalt">
                  {item.label}
                </Link>
              </li>
            ))}
            {elsewhere.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-cobalt">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap justify-between gap-x-[18px] gap-y-2">
          <span>{profile.fullName}</span>
          <span>Built with Next.js and Tailwind</span>
        </div>
      </Container>
    </footer>
  );
}
