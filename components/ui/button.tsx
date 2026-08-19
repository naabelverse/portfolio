import Link from "next/link";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary" | "inverse";
type Size = "sm" | "md" | "lg";

/**
 * DESIGN.md button spec: 8px radius (never pill), 14px/500 label, compact
 * 8px x 14px padding, grown here to a >=40px tap target per the touch rules.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-pressed",
  secondary:
    "bg-surface-1 text-ink border border-hairline hover:bg-surface-2 hover:border-hairline-strong",
  tertiary:
    "bg-transparent text-ink-subtle border border-transparent hover:bg-surface-1 hover:text-ink",
  inverse: "bg-inverse-canvas text-inverse-ink hover:bg-inverse-canvas/90",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3",
  md: "h-10 px-3.5",
  lg: "h-11 px-5",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md text-button whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

export function buttonStyles(variant: Variant = "primary", size: Size = "md") {
  return cn(BASE, VARIANTS[variant], SIZES[size]);
}

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(buttonStyles(variant, size), className)} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = SharedProps & {
  href: string;
  /** Opens in a new tab with the usual rel hardening. */
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({
  href,
  external = false,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonStyles(variant, size), className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
