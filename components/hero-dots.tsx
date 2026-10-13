"use client";

import { useEffect, useRef } from "react";

/**
 * The star grid behind the hero. The stars near a mouse pointer turn cobalt
 * (hero-dots in globals.css); touch and pen leave the grid as it is, and so
 * does reduced motion.
 */
export function HeroDots() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dots = ref.current;
    const hero = dots?.parentElement;
    // Reduced motion gets the resting grid: no glow following the cursor.
    if (!dots || !hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = hero.getBoundingClientRect();
      dots.style.setProperty("--x", `${e.clientX - box.left}px`);
      dots.style.setProperty("--y", `${e.clientY - box.top}px`);
      dots.dataset.lit = "";
    };
    const leave = () => delete dots.dataset.lit;

    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0 -z-10">
      <div className="hero-dots-lit absolute inset-0" />
    </div>
  );
}
