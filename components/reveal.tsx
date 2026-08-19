"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in milliseconds, for items revealed as a group. */
  delay?: number;
};

/**
 * Fades and lifts its children into place the first time they enter the
 * viewport, then stops observing.
 *
 * The revealed flag is written straight to the DOM rather than held in React
 * state: it is presentation only, nothing else reads it, and a state update
 * here would re-render the whole subtree for a change CSS already handles. The
 * visual states live in the `reveal` utility in globals.css, which collapses to
 * a no-op under `prefers-reduced-motion: reduce`.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => {
      node.dataset.revealed = "true";
    };

    // Anything without IntersectionObserver gets the content immediately
    // rather than a permanently invisible page.
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-revealed="false"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
