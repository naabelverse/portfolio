# Design system — bright identity

The canonical description of how this site looks and why. It began as the
redesign brief that replaced the old dark system; the build-order and
deliverable sections at the end record that history. `redesign-v2-bright.html`
beside this file is the reference prototype.

Implementation lives in `app/globals.css` (tokens), `components/ui/`
(primitives), `components/diagram.tsx` (system diagrams) and `lib/cn.ts`
(which must know every custom token). `/styleguide` shows all of it.

---

## Context

The site previously used a dark, restrained design system (near-black `#010102`
canvas, cyan-teal accent, Inter, hairline borders). It reads as gloomy and
undifferentiated. This document describes the bright identity that replaced it.

The existing project already has:

- `content/site.ts` holding all content
- Section components, a `components/ui/` folder of primitives
- Case study pages at `/projects/forgeroom` and `/projects/ai-resume-analyzer`
- An `/about` page
- Working SEO metadata, an OG image route, sitemap and robots

**None of that structure should be thrown away.** Keep the component boundaries,
the content file, and the routes. Change tokens, typography, and the components'
visual treatment.

---

## Reference

`redesign-v2-bright.html` in this folder is a working prototype of the new
identity. **Open it and read the CSS — it is the source of truth for every
colour, size, radius and border width.** Where this document and the prototype
disagree, the prototype wins.

The prototype covers the home page only. Apply the same system to the case study
pages, the about page, the 404 and the OG image.

---

## Colour tokens

Replace the entire `@theme` block in `app/globals.css`. Nothing from the old
palette survives.

```
Surface
  --color-paper        #FAFAF7    page background
  --color-white        #FFFFFF    panels sitting on tinted washes

Text
  --color-ink          #111318    headings and body
  --color-ink-2        #4A4F5C    secondary prose
  --color-ink-3        #646B7A    labels, captions

Primary
  --color-cobalt       #1F43E6
  --color-cobalt-deep  #132BA6    hover and active
  --color-wash-blue    #E6EBFF    chapter background

Energy
  --color-sun          #FFC93D
  --color-wash-sun     #FFF3D4    chapter background

Alert / failure paths
  --color-rose         #FF4F6E    fills only
  --color-rose-line    #E63655    strokes only (diagram failure paths)
  --color-wash-rose    #FFE7EB    chapter background

Live
  --color-live         #16A34A    the live badge's status dot only (3.3:1 on white)

Rules
  --color-line         #E2E2DC    light dividers
  --color-line-2       #CFCFC7    input borders
```

`ink-3` was originally `#848B9A`, which is 3.27:1 on paper and fails AA for the
15px labels it is meant for. `#646B7A` is the lightest grey of the same hue that
clears 4.5:1 on paper (5.1:1) and on every wash.

On the washes it clears with almost nothing to spare: **4.51:1 on wash-blue and
4.55:1 on wash-rose** (5.12:1 on paper, 5.35:1 on white). It labels the stat
strips in each case study header, which sit on the project's wash. If a wash is
ever darkened, this is the pair that fails first; recheck it before anything else.

`rose-line` exists because `#FF4F6E` as a dashed stroke is 3.0:1 on paper and
2.7:1 on wash-blue. `#E63655` is 4.0:1 on paper, 4.2:1 on white and 3.5:1 on
wash-blue, clearing the 3:1 bar for graphics with margin.

### How the colours are used

- **Cobalt** carries primary buttons, links, the full-bleed contact block, and
  the dot in the wordmark. The hero has no button: two project preview cards
  at its foot lead into the work, each with an arrow that nudges right on hover.
- **Sun** marks the step in each diagram where a model does the work and fills
  the "Try it yourself" button.
- **Rose** means *the failure path*. It is the dashed line in both diagrams.
  It used to fill the live badge, but red reads as an error, so "live" moved
  to green.
- **Live green** is only the pulsing dot in the live project's badge: a white
  pill with an ink border, so the green stays small and never fights a wash.
- **Washes** are chapter backgrounds only, never card fills on white.

---

## Typography

Load through `next/font`, not a stylesheet link.

- **Bricolage Grotesque** — headings. Variable, weights 600/700/800. This face
  carries the personality; do not swap it for Inter or Space Grotesk.
- **Figtree** — body, labels, buttons. Weights 400/500/600.
- **JetBrains Mono** — only where something is literally code or a repo name.
  If you are reaching for mono to make a label look technical, use Figtree.

Scale, all with tight negative tracking on headings:

| Role | Size | Weight | Tracking |
| --- | --- | --- | --- |
| h1 | clamp(42px, 8.2vw, 96px) | 800 | -0.03em |
| home hero h1 | clamp(36px, 6vw, 64px) | 800 | -0.03em |
| h2 | clamp(32px, 5vw, 58px) | 700 | -0.03em |
| h3 | clamp(20px, 2.4vw, 27px) | 600 | -0.02em |
| lede | clamp(18px, 2vw, 22px) | 400 | normal |
| body | 17px | 400 | normal |
| small | 15px | 400 | normal |

Body line length stays under 66 characters.

---

## The chapter system

This is the signature of the redesign and the thing that fixes the monotony.

Each major project becomes a **full-bleed chapter with its own tinted
background**. ForgeRoom sits on `wash-blue`, AI Resume Analyzer on `wash-rose`.
Sections between them sit on plain `paper`. Scrolling moves through colour.

A chapter is structured: a solid pill badge, then `h2`, then a tagline at
`clamp(19px, 2.2vw, 24px)`, then a two-column split — prose on the left,
diagram panel on the right. Below 980px the split becomes one column.

Chapters are full width; the content inside stays within the 1180px wrap.

Do not give every section a wash. The alternation is the point.

A project's wash comes from `tone` on its `Project` in `content/site.ts`. The
home preview card, the home chapter, and the case study's header and
case study page all read it, so a visitor who clicks a card stays in the same
colour. A new project on an existing tone needs only the field. A new tone also
needs a `--color-wash-<name>` token in `app/globals.css` and an entry in
`SECTION_TONES` in `components/ui/primitives.tsx`.

### Case study pages

A case study alternates between its wash and paper, section by section. The
header is on the wash; after it, every even `<section>` is washed and every odd
one is paper. `CaseStudy` in `components/case-study.tsx` derives this from
position with one CSS rule, so no section sets its own tone and adding or
reordering sections needs no tone changes.

- **Edges.** Every boundary fades, as the header does and as the home chapters
  blend. Each section but the last fades into the next one's colour across its
  own bottom padding: a washed section fades to paper, a paper section fades
  into the wash. The fade ends where the next section begins, so the next
  heading keeps its full top padding clear of it (115px at 1280, 72px at 390).
  The last section doesn't fade, because the footer follows.
- **Don't fade both edges inside the wash.** An earlier variant faded each
  washed section's top and bottom over 160px inside the section itself. It
  shrank every band and blurred where it began and ended, so seven boundaries
  read as mush and the alternation was lost. One fade per boundary, in the
  padding of the section above, leaves each band solid from its heading to its
  last block.
- **Padding.** Every boundary is a colour change, so every section keeps its
  full `py-section`. Don't add `pt-0` to a case study section; it only made
  sense when neighbours shared a ground. The first section is the exception,
  set by the same rule: the header's fade already spaces it.
- **Architecture's wash depends on its position.** It is washed because it is
  the second section. Add a section above it and it turns paper, and the
  diagram loses the tinted band it was designed to sit in. If you add one
  there, add another too, or move Architecture, so it stays on an even
  position.
- **The Close block lands where the count puts it.** It is on paper on
  ForgeRoom (seven sections) and on the wash on the Resume Analyzer (eight).
  This is expected, not a bug: the cobalt block works on either ground, and
  forcing a match would mean leaving it out of the count, which is the hand
  placement this rule removed.

**Known coupling:** the home hero fades to a hardcoded `to-wash-blue`
(`components/sections/home-sections.tsx`), on the assumption that ForgeRoom's
blue chapter comes first. It is correct today, but reordering the chapters, or
giving the first project another tone, leaves the hero fading into the wrong
colour. The fix is to read the first chapter's `tone` at render time.

---

## Borders, radius and depth

The old system used 1px hairlines everywhere. This one uses weight.

- Diagram panels: **3px** solid ink border, 18px radius
- Skill cards: **2px** solid ink border, 14px radius
- Badges: **2px** ink border, fully rounded
- Stack lists: no border, no fill, no shape (see below)
- Contact block: no border, 26px radius, cobalt fill
- The hero stat strip: **3px** ink rules top and bottom, nothing else
- Dividers in list rows: 1px `line-2`

**No box shadows anywhere.** Depth comes from border weight and fill, not blur.
Radius varies by element type on purpose — do not normalise it to one value.

### A stack is a list, not a set of objects

A **badge** (`Badge`) is metadata about a project: "Personal project", "Live
and public". There are one or two, and they should stand out: a white pill,
2px ink border, 15px semibold ink text, with a leading mark.

A **stack** (`StackList`) is the technologies a project uses. There can be
ten or more, and they are supporting detail: someone can scan them if they
want, or skip them without feeling they missed something. So they are set as
plain text, 15px medium `ink-2`, with 20px between items and nothing around
them. The gap is what separates multi-word items like "Anthropic Claude", so
don't tighten it. The home chapters, the case study Problem cards and the
experience timeline all use it.

There used to be a `Chip`, first an ink-bordered pill, then a tinted tag. Eleven
of either formed a block that sat above the chapter's buttons, competed with
them, and lost. Any shape around each item brings that back. Don't add
one, and don't reintroduce a chip for a new place: if it is a list of
technologies, it is a `StackList`.

Because the list has no shape at all, it stays distinct from a badge in
greyscale and in print, not only by colour. Because it has no fill, it needs no
variant for the ground it sits on. `ink-2` on each ground:

| Ground | Contrast |
| --- | --- |
| paper | 7.83:1 |
| white | 8.19:1 |
| wash-blue | 6.90:1 |
| wash-rose | 6.97:1 |
| wash-sun | 7.42:1 |

It is deliberately `ink-2`, not `ink-3`: `ink-3` is muted enough but clears
wash-blue by 0.01, the pairing that fails first if a wash is darkened.

---

## Diagrams instead of screenshots

There are no product screenshots and none are coming. Each major project gets a
hand-authored **SVG system diagram** showing what goes in, what processes it,
what comes out, and the dashed failure path in rose.

Both diagrams already exist in the prototype — copy them, then move them into
React components so the content lives alongside the project data.

Rules for the diagrams:

- Boxes: white fill, 2.5px ink stroke, 12px radius. The model step uses `sun`
  fill. The output step uses `wash-blue` fill.
- Arrows: 2.5px ink. Failure path: 2.5px `rose-line`, `stroke-dasharray: 7 6`.
- Label text in Figtree 14px semibold; sub-labels 12.5px in `ink-2`.
- Every diagram carries `role="img"` and a full `aria-label` describing the flow
  in a sentence, because the diagram is content, not decoration.
- Each diagram gets a `figcaption` making a point about the engineering, not
  restating the picture.

If you add a third project later, it gets a diagram in the same grammar: add a
`diagram` object to its entry in `content/site.ts`. No drawing code changes.

### Why diagram text changes size

Text inside an SVG scales with the drawing, so diagram labels do not hold a
fixed size the way body text does. Measured in the browser, labels render at
roughly 14–20px across viewports (authored at 14px):

- Below a 368px-wide panel the narrow 280-unit layout takes over, with labels
  broken at `|` marks in the data, so nothing drops under 12px down to 360px.
- When the split stacks below 980px the panel is capped at 520px, so labels
  stay close to body size instead of ballooning.

Removing the swing entirely means building the diagrams in HTML and CSS,
where text reflows. That was judged not worth it: the variation is bounded,
every size is legible, and the SVG keeps the drawing exact.

---

## Hero

Two columns: headline, lede and buttons on the left; an abstract SVG composition
on the right. Below 980px the composition moves above the text and caps at
380px wide.

The hero is deliberately full-height: at least one screen minus the 68px
header, with the content centred vertically, so the composition has room and
the first chapter (ForgeRoom) starts below the fold. Its background fades from
paper into the first chapter's blue wash. Behind it sits a faint grid of
four-point stars (`HeroDots`); the stars near a mouse pointer turn cobalt. The
glow is pointer-only: touch and pen never trigger it, and under reduced motion
no listener is attached, so the grid stays at rest.

The composition is a ring, two thick arcs in cobalt and sun, a rounded cobalt
square, and two circles. On load the strokes draw themselves over about 1.4s,
then the solid shapes pop in at 0.45s, 0.6s and 0.75s.

**This is the only non-user-triggered motion on the entire site.** No
scroll-reveal fades on sections. No hover lift on every card. Movement that
answers a click or a hover is fine; ambient movement is not.

Two exceptions play once on first sight and never again: the footer reveal,
and the skill terminals. Each skill group is drawn as a terminal window (ink
title bar, mint body, JetBrains Mono, since it is literally a shell). Its
`ls` command types out behind a cobalt block caret, then the note (as a
`#` comment), the items and a final prompt print in one by one (`RevealEach`,
`.term-char` / `.term-line` / `.term-cursor`). The prompt's cursor then keeps
blinking, the one piece of ambient motion besides the badge cap and gap stars.
All of it is static under reduced motion.

**Known issue: hero h1 too close to h2 on wide screens.** The hero h1 has its own
`clamp(36px, 6vw, 64px)` so the headline fits on three lines at 1280px, but h2
tops out at 58px, so on wide screens the hero is only 1.10× the section
headings (1.2× at 980 and 720px). This predates the headline change and is left
for separate work. Two ways of fixing it were measured and set aside: a smaller
site-wide h2 changes every section heading unseen, and anything above 64px puts
the hero back on four lines in its 1.4fr column. On phones the 36px floor
against h2's 32px (1.13×) is accepted, because the two are never on screen
together and a higher floor costs a fifth line at 360px.

---

## Content still to fill in

These are gaps, not bugs. Each field is empty on purpose rather than holding a
placeholder (the build fails on any content string containing TODO), and each
renders cleanly while empty.

| Field | What it is | What renders while empty |
| --- | --- | --- |
| `content/site.ts` → `timeline[0].period` | Degree date range | The degree row's date column is blank |
| `content/site.ts` → `timeline[0].description` | CGPA, if published | No description line under the degree |
| `content/site.ts` → `timeline[3].period` | ForgeRoom year | The ForgeRoom row's date column is blank |
| `content/forgeroom.ts` → `forgeroom.meta[2].value` | Case study timeline | The fact strip shows Role, Type and Status only |
| `public/resume.pdf`, then `links.resume` in `content/site.ts` set to `"/resume.pdf"` | The CV | No Download CV button on /about and no CV row in the contact block |
| Repo links for the Inventory and TinyTots rows | Public repos, once they exist | Title, context and description only, no link |

Timeline indexes count from the top of the `timeline` array and shift if an
entry is added above. The repo links are the one gap that needs code: the
"Smaller and earlier" rows have no `repo` field or link yet, so filling them in
means adding both.

---

## Future items

Measured after the redesign: First Load JS for `/` is 184 KB gzipped, of
which about 174 KB is the Next.js and React runtime. Two changes would save
roughly 10 KB, judged not worth doing yet:

- **Nav as a server component.** Only the Menu toggle needs client state.
  Moving the rest to the server keeps `cn` and tailwind-merge (9.8 KB) out of
  the client bundle.
- **Contact form as plain HTML.** Formspree accepts a normal form post, so the
  form can work with no JavaScript at all.

---

## Remove from the current site

These are template tells that the current design is full of:

- Every ALL-CAPS eyebrow label above a heading ("WORK", "SKILLS", "BACKGROUND").
  Delete them. The headings carry the section.
- Meta strings joined by middle dots — `Flutter · Node.js · MongoDB`,
  `Malaysia · UTHM`. Rewrite as plain phrases: "Flutter, Node.js and MongoDB".
- Arrows appended to link and button text.
- The "Primary stack / Also builds in" framing in the hero strip. Replace with
  the four facts from the prototype's stat strip.

---

## Content corrections

The live site currently renders six `TODO(nabil)` strings to visitors, including
one in the hero badge. While you are in the files, fix them:

1. Hero badge — remove the TODO; the availability line is now part of the stat
   strip, so delete the badge from the hero entirely.
2. Education entry — no dates. Leave the field empty-string in `site.ts` and
   make the component skip the date column when it is empty, rather than
   printing a placeholder.
3. The CGPA note, the two project years, and the blank work-experience entry:
   same treatment. **Empty content must render as nothing, never as a label.**

Add a check to the build: if any string in `content/site.ts` contains `TODO`,
fail the build with a clear message. A placeholder should never be able to reach
production again.

---

## Accessibility and responsive

- Contrast: cobalt on paper, ink on every wash, white on cobalt, and `ink-3` on
  paper and every wash all pass 4.5:1. Verify after any colour change. `sun` is
  a background only — never set text in it.
- Focus ring: 3px solid cobalt, 3px offset.
- Tap targets at least 44px; form inputs 46px with 16px text so iOS does not
  zoom.
- Semantic landmarks, real `<label>` on every input, `aria-expanded` and
  `aria-controls` on the menu button.
- `prefers-reduced-motion: reduce` disables the hero animation and renders the
  composition in its final state. It also turns off the star grid's cursor
  glow entirely.
- Breakpoints: 980px collapses two-column splits and the hero; 720px switches
  the nav to a menu button and makes list rows single-column.
- The header nav has four links: Work, Skills, Experience, About. Contact is
  footer-only (`headerNav` in `content/site.ts`), because the "Hire me for an
  internship" button already goes to `#contact`. At 721px the row has 54px
  spare: content width minus logo, nav and button, minus the two 20px gaps
  between them, with every gap at its 20px minimum. A fifth link of Contact's
  length (about 80px with its gap) overflows up to about 750px. Re-measure at
  721px after any nav change.

---

## Do not add

- 3D, WebGL, three.js, or a particle background. For a software engineering
  internship these shift the read from "engineer" to "trying to impress", and
  they cost load time that a fifteen-second scan does not have.
- Scroll-jacking, a custom cursor, or a preloader.
- An animation library. The CSS in the prototype is the whole motion budget.
- Percentage bars or star ratings on skills.
- Testimonials, client logos, or counters like "120+ projects". This is a
  student applying for an internship; invented metrics invite questions that
  cannot be answered.
- A light/dark toggle. The site is light now. Pick one and commit.

---

## Deliverables

1. `npm run dev` runs clean; `npm run build` passes with no TypeScript errors
2. The home page matches the prototype at desktop, tablet and mobile widths
3. Case study pages, `/about`, and the 404 use the new system
4. The OG image route regenerated in the new palette and typeface
5. No `TODO` string renders anywhere, and the build guard is in place
6. Report the First Load JS after building

---

## Build order

Pause after each step so I can review.

1. Read `redesign-v2-bright.html` fully, then replace the tokens and type scale
   in `app/globals.css` and wire the new fonts in `app/layout.tsx`
2. Rebuild the `components/ui/` primitives: button, badge, stack list, panel, card
3. Nav, hero and the SVG composition
4. The two project chapters, with the diagrams as components
5. Smaller work, skills, background, contact
6. Case study pages, about, 404, OG image
7. The TODO build guard, then a final pass on contrast and mobile
