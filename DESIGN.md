# Design system

This site implements the near-black product system documented in
`DESIGN-linear.app.md` (an analysis of linear.app's marketing design), with one
deliberate substitution: **the lavender accent `#5e6ad2` is replaced by
cyan-teal `#2dd4bf`**, so the result reads as Nabil's rather than as a copy of
Linear's identity. Everything else — the canvas, the surface ladder, the
hairlines, the type scale, the radius scale, the elevation rules — follows the
source document.

The tokens live in one place: [`app/globals.css`](app/globals.css), inside the
Tailwind v4 `@theme` block. Components consume them as utilities
(`bg-surface-1`, `text-ink-subtle`, `rounded-lg`, `text-display-xl`) and never
hard-code a hex value. `/styleguide` renders every token — check it after any
change to the theme.

## Colour

| Token | Value | Use |
|---|---|---|
| `canvas` | `#010102` | Page background. Near-black with a faint blue tint — never `#000000`. |
| `surface-1` | `#0f1011` | Cards, panels, screenshot frames. |
| `surface-2` | `#141516` | Featured or hovered cards, badges. |
| `surface-3` | `#18191a` | Nested surfaces inside a lifted panel. |
| `surface-4` | `#191a1b` | Deepest lift. |
| `hairline` | `#23252a` | Default 1px border. |
| `hairline-strong` | `#34343a` | Borders on level-2 surfaces, hover states. |
| `hairline-tertiary` | `#3e3e44` | Nested and decorative strokes. |
| `ink` | `#f7f8f8` | Headlines and emphasised body. 19.4:1 on canvas. |
| `ink-muted` | `#d0d6e0` | Body copy. 13.6:1. |
| `ink-subtle` | `#8a8f98` | Secondary copy, labels, captions. 6.4:1. |
| `ink-tertiary` | `#62666d` | **3.6:1 — fails AA for normal text.** Decorative marks and mockup-internal UI only. |
| `accent` | `#2dd4bf` | See the scarcity rule below. |
| `accent-hover` | `#5eead4` | Hovered primary button. |
| `accent-pressed` | `#14b8a6` | Active primary button. |
| `on-accent` | `#010102` | Text on an accent fill. 10.4:1. |
| `success` | `#27a644` | The only semantic colour on the site. |

### The scarcity rule

The accent appears in exactly four roles, and nowhere else:

1. the brand mark in the nav and footer,
2. primary CTA buttons,
3. focus rings,
4. link emphasis and small list markers.

It is never a section background, never a card fill, and never joined by a
second chromatic colour.

## Type

Inter for everything, JetBrains Mono for code and identifiers, both self-hosted
through `next/font`. Tracking is expressed in `em` rather than `px` so the
negative tracking scales correctly with the `clamp()` ramps.

| Token | Size | Weight | Tracking |
|---|---|---|---|
| `display-xl` | `clamp(2.25rem, 1.2rem + 5.2vw, 5rem)` | 600 | -0.0375em |
| `display-lg` | `clamp(2rem, 1.1rem + 3.4vw, 3.5rem)` | 600 | -0.032em |
| `display-md` | `clamp(1.75rem, 1.1rem + 2.2vw, 2.5rem)` | 600 | -0.025em |
| `headline` | `clamp(1.5rem, 1.15rem + 1.2vw, 1.75rem)` | 600 | -0.021em |
| `card-title` | 22px | 500 | -0.018em |
| `subhead` | 20px | 400 | -0.01em |
| `body-lg` | 18px | 400 | -0.006em |
| `body` | 16px | 400 | -0.003em |
| `body-sm` | 14px | 400 | 0 |
| `caption` | 12px | 400 | 0 |
| `button` | 14px | 500 | 0 |
| `eyebrow` | 13px | 500 | **+0.03em** |
| `mono` | 13px | 400 | 0 |

Display weight never exceeds 600. The eyebrow is the only step with positive
tracking — that contrast is what marks it as taxonomy rather than content.

## Shape and depth

Radius: `xs` 4 · `sm` 6 · `md` 8 · `lg` 12 · `xl` 16 · `xxl` 24 · `pill` 9999.

- Buttons and inputs are **8px**. Never pill — that is an explicit rule.
- Cards are 12px. Screenshot panels are 16px. Pill is for badges only.

There are **no drop shadows**. Depth is a step up the surface ladder, plus a 1px
hairline, plus the `panel-edge` utility — an inset `0 1px 0 rgb(255 255 255 /
0.045)` top highlight that makes a panel read as rendered rather than painted.

## Layout

1280px max width, 24px gutters growing to 32px at `md`. Section rhythm is the
96px `section` token, eased to 64px below `md`. Card grids run 3-up at desktop,
2-up at 1024px, 1-up below 768px, and the nav collapses to a hamburger at the
same 768px break.

## Motion

A single pattern: `components/reveal.tsx` fades and lifts a block the first time
it enters the viewport, then disconnects its observer. No animation library.
Everything collapses to a no-op under `prefers-reduced-motion: reduce`.

## Working in this system

1. Change tokens in `app/globals.css`, never in a component.
2. Open `/styleguide` and confirm the change against the tables above.
3. If you need a value the scale doesn't have, add a token — don't reach for an
   arbitrary class. The one sanctioned exception is
   `components/mockups/forgeroom.tsx`, which imitates a phone UI and therefore
   uses its own much smaller type sizes.
4. Re-check the accent scarcity rule before shipping. It is the easiest rule to
   break and the one that keeps the page calm.
