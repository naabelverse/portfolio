import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * Frames a real product screenshot on the dark canvas. The captures come from
 * a light UI, so a hairline border and a surface-1 edge contain them instead
 * of letting a bright rectangle bleed into the page. Full-viewport captures
 * get a window bar; cropped cards don't, because they aren't windows.
 */
export function BrowserFrame({
  src,
  width,
  height,
  alt,
  caption,
  viewport = false,
  sizes = "(min-width: 1024px) 640px, 100vw",
  className,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  viewport?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={cn("w-full", className)}>
      <div className="panel-edge overflow-hidden rounded-lg border border-hairline bg-surface-1">
        {viewport && (
          <div
            aria-hidden="true"
            className="flex h-7 items-center gap-1.5 border-b border-hairline bg-surface-2 px-3"
          >
            <span className="size-2 rounded-pill bg-surface-4 ring-1 ring-hairline-strong" />
            <span className="size-2 rounded-pill bg-surface-4 ring-1 ring-hairline-strong" />
            <span className="size-2 rounded-pill bg-surface-4 ring-1 ring-hairline-strong" />
          </div>
        )}
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={sizes}
          className="block h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-caption text-ink-subtle">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
