import { extendTailwindMerge } from "tailwind-merge";

/**
 * Joins class names and resolves Tailwind conflicts, so a caller's class
 * beats a component's built-in one (`hidden` over a Button's `inline-flex`).
 *
 * tailwind-merge only knows Tailwind's default scales. Every custom token in
 * globals.css @theme is registered here; without that it reads `text-lede`
 * as a colour and drops it in favour of `text-ink-2`. Add new tokens here
 * when you add them there.
 */
export const cn = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "paper", "white", "ink", "ink-2", "ink-3", "cobalt", "cobalt-deep",
        "wash-blue", "sun", "sun-deep", "wash-sun", "rose", "rose-line",
        "wash-rose", "violet", "violet-deep", "tangerine", "tangerine-deep", "lavender", "lavender-deep", "live", "line", "line-2",
      ],
      font: ["display", "sans", "mono"],
      text: ["tagline", "lede", "body", "small"],
      radius: ["input", "diagram", "card", "panel", "block"],
      spacing: ["gutter", "section"],
      container: ["wrap", "measure", "lede", "tagline"],
    },
  },
});
