"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/primitives";
import { emailAddress } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

/**
 * Sits straight on the cobalt contact block, with no panel of its own, so the
 * block does not read as boxes inside boxes. Field is styled for paper, so its
 * label and focus ring are recoloured here rather than in the shared component.
 */
const PANEL = "grid gap-4 text-white [&_:focus-visible]:outline-white [&_label]:text-white/85";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  // Non-zero while the envelope is in flight; keying the envelope on it remounts it, replaying the fly-off.
  const [sends, setSends] = useState(0);

  // Without a form id there is nothing to post to. Rather than shipping a
  // button that silently does nothing, fall back to a plain mail link.
  if (!FORM_ID) {
    return (
      <div className={PANEL}>
        <p className="font-semibold">Email is the fastest route.</p>
        <p className="text-small text-white/80">
          The form switches on once <code className="font-mono">NEXT_PUBLIC_FORMSPREE_ID</code> is
          set. Until then, write to me directly.
        </p>
        <a href={`mailto:${emailAddress}`} className="font-semibold break-all text-white underline underline-offset-4 hover:text-sun">
          {emailAddress}
        </a>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSends((n) => n + 1);
    // Hold the thank-you until the envelope's 1.3s flight (globals.css, .mail-fly) has landed.
    const flight = new Promise((done) => setTimeout(done, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1300));
    // Once it has landed, drop .mail-fly so the envelope rests open again and hover can re-seal it.
    flight.then(() => setSends(0));
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: a real person never sees this field, so anything in it is a bot.
    if (data.get("_gotcha")) {
      await flight;
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      form.reset();
      await flight;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`${PANEL} mail-done justify-items-center py-6 text-center`}>
        <span aria-hidden="true" className="hero-pop grid size-12 place-items-center rounded-full bg-green-500 text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        {/* Focused on arrival so screen readers announce it; the form it replaces is gone. */}
        <h3 ref={(el) => el?.focus()} tabIndex={-1} className="outline-none">
          Message sent!
        </h3>
        <p className="max-w-lede text-lede text-white/85">
          Thanks, it reached my inbox. I&apos;ll reply within a couple of days.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          className="mt-2 border-2 border-white/45 bg-transparent text-white hover:border-white hover:bg-white hover:text-cobalt"
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`${PANEL} sm:grid-cols-2`}>
      <Field id="name" name="name" label="Your name" required autoComplete="name" />
      <Field id="email" name="email" label="Email" type="email" required autoComplete="email" />
      <Field id="message" name="message" label="Message" multiline required rows={5} className="sm:col-span-2" />

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap-reverse items-center justify-between gap-x-6 gap-y-3 sm:col-span-2">
        <p role="status" aria-live="polite" className="text-small text-white/85 empty:hidden">
          {status === "error" && `Something went wrong sending that. Email me at ${emailAddress} instead.`}
        </p>
        {/* Icon only: the label lives in aria-label and title. */}
        <Button
          type="submit"
          disabled={status === "submitting"}
          aria-label={status === "submitting" ? "Sending…" : "Send message"}
          title="Send message"
          className="group ml-auto size-14 bg-white px-0 text-cobalt hover:bg-wash-blue"
        >
          {/*
            Open envelope that closes and seals on hover, then flies off on submit (globals.css, .mail-*).
            Paint order is the layering: flap behind letter, pocket in front, seal on top.
            Keyed on sends so each submit remounts it and replays the flight.
          */}
          <svg aria-hidden="true" width="28" height="28" viewBox="0 3 20 20" className="overflow-visible">
            <g key={sends} className={sends ? "mail-fly" : undefined}>
              <g className="mail-trail" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinecap="round">
                <path d="M-1 18l-4 3" />
                <path d="M3 21l-4 3" />
                <path d="M-4 14l-3 2" />
              </g>
              <g className="mail-env">
                <rect x="1" y="7" width="18" height="12" rx="1.5" fill="var(--color-sun-deep)" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M1 7h18l-9 6Z" fill="var(--color-sun-deep)" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" className="mail-flap" />
                <g className="mail-letter">
                  <rect x="4" y="13.5" width="12" height="4.5" rx="1" fill="white" stroke="var(--color-ink)" strokeWidth="1.2" />
                  <path d="M6.5 15.5h7" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinecap="round" />
                </g>
                <path d="M1 7l9 6 9-6v10.5A1.5 1.5 0 0 1 17.5 19h-15A1.5 1.5 0 0 1 1 17.5Z" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
                <circle cx="10" cy="13" r="2.2" fill="var(--color-cobalt)" stroke="var(--color-ink)" strokeWidth="0.8" className="mail-seal" />
              </g>
            </g>
          </svg>
        </Button>
      </div>
    </form>
  );
}
