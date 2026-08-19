"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { links } from "@/content/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

/**
 * Assembled at runtime rather than imported as a finished string, so the
 * address is not sitting in the served HTML for address harvesters.
 */
function emailAddress() {
  return [links.emailUser, links.emailDomain].join("@");
}

const FIELD =
  "w-full rounded-md border border-hairline bg-surface-1 px-3 py-2 text-body text-ink placeholder:text-ink-subtle transition-colors hover:border-hairline-strong focus:border-hairline-strong";

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-body-sm text-ink-muted">
      {children}
    </label>
  );
}

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // Without a form id there is nothing to post to. Rather than shipping a
  // button that silently does nothing, fall back to a plain mail link.
  if (!FORM_ID) {
    return (
      <div
        className={cn(
          "rounded-lg border border-dashed border-hairline-strong p-6",
          className,
        )}
      >
        <p className="text-body text-ink">Email is the fastest route.</p>
        <p className="mt-2 text-body-sm text-ink-subtle">
          The contact form activates once{" "}
          <code className="rounded-xs bg-surface-2 px-1 py-0.5 font-mono text-mono text-ink-muted">
            NEXT_PUBLIC_FORMSPREE_ID
          </code>{" "}
          is set. Until then, write to me directly.
        </p>
        <a
          href={`mailto:${emailAddress()}`}
          className="mt-4 inline-flex text-body text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          {emailAddress()}
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
    setError(null);

    try {
      const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Formspree responded ${response.status}`);
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        `Something went wrong sending that. Email me at ${emailAddress()} instead.`,
      );
    }
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={FIELD}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={FIELD}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="A little about the role or the team."
          className={cn(FIELD, "resize-y")}
        />
      </div>

      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
        <a
          href={`mailto:${emailAddress()}`}
          className="text-body-sm text-ink-subtle underline underline-offset-4 transition-colors hover:text-ink"
        >
          or email me directly
        </a>
      </div>

      <p role="status" aria-live="polite" className="text-body-sm">
        {status === "success" && (
          <span className="text-success">
            Thanks — that reached my inbox. I&rsquo;ll reply soon.
          </span>
        )}
        {status === "error" && error && (
          <span className="text-ink-muted">{error}</span>
        )}
      </p>
    </form>
  );
}
