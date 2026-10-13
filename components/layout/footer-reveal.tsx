"use client";

import { useEffect, useRef } from "react";

/**
 * The <footer> element, armed to play .footer-rise once when it scrolls into
 * view. Server HTML has no data-reveal, so without JS (or when the footer is
 * already on screen at load) it simply shows static.
 */
export function FooterReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = ref.current;
    if (!footer || footer.getBoundingClientRect().top < window.innerHeight) return;

    footer.dataset.reveal = "armed";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        footer.dataset.reveal = "shown";
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className={className}>
      {children}
    </footer>
  );
}
