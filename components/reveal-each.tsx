"use client";

import { useEffect, useRef } from "react";

/**
 * FooterReveal for each child: a child that starts below the fold is armed,
 * then marked shown the first time it scrolls into view. Server HTML has no
 * data-reveal, so without JS (or for children already on screen at load)
 * everything simply shows static.
 */
export function RevealEach({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [...(ref.current?.children ?? [])].filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el.getBoundingClientRect().top >= window.innerHeight,
    );
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );
    for (const item of items) {
      item.dataset.reveal = "armed";
      observer.observe(item);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
