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
 * label, controls and focus ring are recoloured here rather than in the shared
 * component.
 */
const PANEL = [
  "grid gap-4 text-white",
  "[&_:focus-visible]:outline-white [&_label]:text-white/85",
  "[&_:is(input,textarea)]:border-white/30 [&_:is(input,textarea)]:bg-white/10 [&_:is(input,textarea)]:text-white",
  "[&_:is(input,textarea):focus]:border-white",
].join(" ");

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

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
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: a real person never sees this field, so anything in it is a bot.
    if (data.get("_gotcha")) {
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
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className={`${PANEL} sm:grid-cols-2`}>
      <Field id="name" name="name" label="Your name" required autoComplete="name" />
      <Field id="email" name="email" label="Email" type="email" required autoComplete="email" />
      <Field id="message" name="message" label="Message" multiline required rows={5} className="sm:col-span-2" />

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap-reverse items-center justify-between gap-x-6 gap-y-3 sm:col-span-2">
        <p role="status" aria-live="polite" className="text-small text-white/85 empty:hidden">
          {status === "success" && "Thanks, that reached my inbox. I'll reply soon."}
          {status === "error" && `Something went wrong sending that. Email me at ${emailAddress} instead.`}
        </p>
        {/* Same arrow nudge as the hero button. */}
        <Button type="submit" disabled={status === "submitting"} className="group ml-auto gap-1.5 bg-white text-cobalt hover:bg-wash-blue">
          {status === "submitting" ? "Sending…" : "Send message"}
          <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </Button>
      </div>
    </form>
  );
}
