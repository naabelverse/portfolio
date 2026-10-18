import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "sun" | "violet" | "tangerine" | "lavender" | "github" | "white";

/**
 * A sticker pill: fully rounded, 16px/600, 44px tap target, ink border and a
 * hard ink shadow. Hover peels it up (shadow 3px to 5px), a press pushes it flat
 * onto the page. Under reduced motion only the shadow changes. The ::after
 * strip covers the 2px it moves, so a pointer on the edge stays over it after
 * the lift instead of flickering hover on and off.
 */
const BASE =
  "relative inline-flex min-h-11 items-center justify-center rounded-full border-2 border-ink px-5 py-[9px] text-[16px] font-semibold whitespace-nowrap shadow-[3px_3px_0_var(--color-ink)] transition-[background-color,color,box-shadow,translate] duration-150 ease-out after:absolute after:-inset-1 hover:shadow-[5px_5px_0_var(--color-ink)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 active:shadow-[0_0_0_var(--color-ink)] active:duration-75 motion-safe:active:translate-x-[3px] motion-safe:active:translate-y-[3px] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-cobalt text-white hover:bg-cobalt-deep",
  ghost: "text-ink hover:bg-white",
  sun: "bg-sun text-ink hover:bg-sun-deep",
  // Project actions, each reserved for one label so a colour always means the
  // same thing: violet is "Try it yourself", tangerine is "Read the case study",
  // lavender is "View the sample report", github is "View source on GitHub".
  violet: "bg-violet text-white hover:bg-violet-deep",
  tangerine: "bg-tangerine text-ink hover:bg-tangerine-deep",
  lavender: "bg-lavender text-ink hover:bg-lavender-deep",
  // White like the plain actions, so the ink shadow still reads; the mark
  // carries GitHub's colour.
  github: "gap-2 bg-white text-ink hover:bg-paper",
  white: "bg-white text-ink hover:bg-paper",
};

type ButtonProps = { variant?: Variant; className?: string } & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

/**
 * One button. With `href` it renders a link: internal pages go through
 * next/link, http(s) URLs open in a new tab with rel hardening.
 */
export function Button({ variant = "primary", className, ...rest }: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], className);
  const props =
    variant === "github"
      ? {
          ...rest,
          children: (
            <>
              <GitHubMark />
              {rest.children}
            </>
          ),
        }
      : rest;

  if (props.href === undefined) {
    return <button {...props} className={classes} />;
  }
  // Internal pages go through next/link; files such as /resume.pdf are not
  // routes, so they get a plain anchor.
  if (props.href.startsWith("/") && !/\.\w+$/.test(props.href)) {
    return <Link {...props} href={props.href} className={classes} />;
  }
  const external = /^https?:\/\//.test(props.href);
  return (
    <a
      {...props}
      className={classes}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    />
  );
}

/** GitHub's mark, in GitHub's dark. Decorative: the label names GitHub. */
function GitHubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-[18px] shrink-0 fill-github">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
