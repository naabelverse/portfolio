import Link from "next/link";

import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "sun";

/** Prototype `.pill`: fully rounded, 16px/600, 44px tap target, 1px lift. */
const BASE =
  "inline-flex min-h-11 items-center justify-center rounded-full px-[22px] py-[11px] text-[16px] font-semibold whitespace-nowrap transition-[background-color,color,transform] duration-150 hover:-translate-y-px disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-cobalt text-white hover:bg-cobalt-deep",
  ghost: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
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
