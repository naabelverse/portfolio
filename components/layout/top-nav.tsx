"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { nav, navCta, profile } from "@/content/site";
import { cn } from "@/lib/cn";

/** Wordmark: the cobalt full stop is one of cobalt's named jobs. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[21px] font-extrabold tracking-[-0.04em]", className)}>
      {profile.shortName}
      <span className="text-cobalt">.</span>
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
    <header className="sticky top-0 z-50 border-b border-line bg-paper/88 backdrop-blur-md">
      <Container className="flex h-[66px] items-center justify-between gap-5">
        <Link href="/" aria-label={`${profile.displayName}, home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-7 text-[16px] font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-2 transition-colors duration-150 hover:text-cobalt">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hidden on a wrapper: cn() does not merge, so `hidden` on the
            Button itself would lose to its own `inline-flex`. */}
        <div className="hidden md:block">
          <Button href={navCta.href}>{navCta.label}</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="min-h-11 cursor-pointer rounded-full border-2 border-ink px-[18px] py-[9px] text-[16px] font-semibold md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-paper px-gutter pt-1.5 pb-5 md:hidden"
      >
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close} className="block py-[13px] text-[18px] font-medium text-ink-2 hover:text-cobalt">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button href={navCta.href} onClick={close} className="mt-3">
          {navCta.label}
        </Button>
      </nav>
    </header>
  );
}
