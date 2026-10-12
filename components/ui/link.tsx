"use client";

import NextLink from "next/link";

/**
 * next/link that still scrolls when the target is the URL already in the
 * address bar. Next only scrolls a same-route navigation when the hash
 * changes, so a second click on "/#work", or "/" from halfway down the home
 * page, did nothing at all.
 */
export function Link({ onClick, ...props }: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (typeof props.href !== "string") return;

        const url = new URL(props.href, location.href);
        if (url.href !== location.href) return;

        event.preventDefault();
        const target = url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (target) target.scrollIntoView();
        else window.scrollTo({ top: 0 });
      }}
    />
  );
}
