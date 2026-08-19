"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { links, nav, profile } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Brand mark. One of the four places DESIGN.md permits the accent colour —
 * the others are the primary CTA, the focus ring, and link emphasis.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid size-6 place-items-center rounded-sm bg-accent text-caption font-semibold text-on-accent"
      >
        N
      </span>
      <span className="text-body-sm font-medium text-ink">
        {profile.displayName}
      </span>
    </span>
  );
}

export function TopNav() {
  const [open, setOpen] = useState(false);

  // Closed from each link's onClick rather than from a pathname effect: the
  // nav targets are hash links, so jumping from "/" to "/#work" never changes
  // the pathname and the panel would stay open over the section just reached.
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <Container>
        <div className="flex h-14 items-center justify-between gap-6">
          <Link
            href="/"
            className="rounded-sm"
            aria-label={`${profile.displayName} — home`}
          >
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex h-9 items-center rounded-md px-3 text-body-sm text-ink-subtle transition-colors hover:bg-surface-1 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ButtonLink
              href={links.github}
              external
              variant="secondary"
              size="sm"
            >
              GitHub
            </ButtonLink>
            <ButtonLink href="/#contact" size="sm">
              Get in touch
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex size-11 items-center justify-center rounded-md text-ink-subtle transition-colors hover:bg-surface-1 hover:text-ink md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
              className="size-5"
            >
              {open ? (
                <>
                  <path d="M5 5l10 10" />
                  <path d="M15 5L5 15" />
                </>
              ) : (
                <>
                  <path d="M3 6h14" />
                  <path d="M3 10h14" />
                  <path d="M3 14h14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-hairline bg-canvas md:hidden"
        >
          <Container>
            <nav aria-label="Main" className="py-4">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex h-12 items-center rounded-md px-2 text-body text-ink-subtle transition-colors hover:bg-surface-1 hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2 border-t border-hairline pt-4">
                <ButtonLink
                  href={links.github}
                  external
                  variant="secondary"
                  onClick={close}
                >
                  GitHub
                </ButtonLink>
                <ButtonLink href="/#contact" onClick={close}>
                  Get in touch
                </ButtonLink>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
