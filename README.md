# Portfolio — Muhammad Nabil

Personal portfolio for internship applications. Next.js 16 (App Router),
TypeScript, Tailwind v4, statically rendered, deployed on Vercel.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Before you deploy

Search the project for `TODO(nabil)` and work through each one. They are the
facts only you can supply.

| What | Where |
|---|---|
| Internship intake / availability | `content/site.ts` → `hero.availability`, `about.lookingFor.details` |
| CGPA, dates, any work experience | `content/site.ts` → `timeline` |
| Your CV | drop the PDF at `public/resume.pdf`, then set `links.resume = "/resume.pdf"` |
| GitHub URLs for IMS and TinyTots | `content/site.ts` → `otherWork[].repo` |
| ForgeRoom timeline | `content/forgeroom.ts` → `meta` |
| Real app screenshots | `components/mockups/forgeroom.tsx` — see the note at the top |
| Contact form | create a form at [formspree.io](https://formspree.io), then set `NEXT_PUBLIC_FORMSPREE_ID` |
| Live URL | `content/site.ts` → `siteUrl`, once Vercel assigns the domain |

While `links.resume` is `null`, every "Download CV" button is replaced with a
working alternative instead of a link that 404s. While `NEXT_PUBLIC_FORMSPREE_ID`
is unset, the contact form degrades to a `mailto:` link. Neither is a broken
state — but both are worth finishing.

## How it's organised

```
app/                 routes — home, /about, /projects/forgeroom, /styleguide, 404
  globals.css        the entire design system, as Tailwind v4 @theme tokens
  opengraph-image.tsx  social card, generated at build
components/
  ui/                buttons and the token primitives everything else composes
  layout/            sticky nav and footer
  sections/          the home page, section by section
  mockups/           the ForgeRoom app screens, drawn in code
content/
  site.ts            every fact and sentence on the site
  forgeroom.ts       the case study
design/              the design system (DESIGN.md) and the reference prototype
```

**All copy lives in `content/`.** To change what the site says, edit those two
files — you should never need to open a component to fix a typo.

## Design

Near-black canvas (`#010102`), a four-step surface ladder, hairline borders, and
a single cyan-teal accent used in exactly four places. Read
[design/DESIGN.md](design/DESIGN.md) before changing anything visual, and check `/styleguide`
afterwards — it renders every token on one page.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run test:links
```

`npm run test:links` builds the site, then clicks every header and footer link
from every page, at desktop width and at 390px with the menu open, and fails if
one lands in the wrong place or behind the sticky header. Run it after adding a
nav link, a section, or anything that changes the header's height. First time
only: `npx playwright install chromium`, or skip the download and use Edge with
`PW_CHANNEL=msedge npm run test:links`.

## Deploy

The repo has no GitHub remote yet, and the `gh` CLI isn't installed on this
machine, so create the repository in the browser:

1. New repository at <https://github.com/new> — name it `portfolio`, public, and
   don't let GitHub add a README (this one already exists).
2. ```bash
   git remote add origin https://github.com/naabelverse/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Import the repo at <https://vercel.com/new>. Framework detection handles the
   build; there are no settings to change.
4. In Vercel → Settings → Environment Variables, add `NEXT_PUBLIC_FORMSPREE_ID`,
   then redeploy so the contact form goes live.
5. Copy the assigned URL into `siteUrl` in `content/site.ts` and push again, so
   the sitemap, canonical URLs, and social cards point at the real domain.
