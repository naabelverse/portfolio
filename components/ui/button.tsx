import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "sun";

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
};

type ButtonProps = { variant?: Variant; className?: string } & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

/**
 * One button. With `href` it renders a link: internal pages go through
 * next/link, http(s) URLs open in a new tab with rel hardening.
 */
export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], className);

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
