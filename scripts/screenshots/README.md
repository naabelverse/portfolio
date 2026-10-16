# AI Resume Analyzer screenshots and cover

Scripts behind the images in `public/projects/ai-resume-analyzer/`.

- `capture.mjs` takes the app screenshots with Playwright.
- `compose.mjs` builds `cover.webp` (1600x900) from two of them.
- `fixtures/` holds the fictional resume (`jordan-example-resume.pdf`, made from `fictional-resume.html`), the fictional job description and a non-resume file for the error state. None of it is real personal data.

Both scripts use this repo's `playwright-core` and `sharp`, and the Chromium from `npx playwright install chromium`.

## 1. Start the analyzer with empty API keys

In the analyzer repo (`ai-resume-analyzer`), from Git Bash:

```sh
NVIDIA_API_KEY= ANTHROPIC_API_KEY= pnpm dev
```

Empty values in the process environment take precedence over `.env.local`, so no AI provider is called. The startup banner should say `NVIDIA_API_KEY is not set`, and each analysis logs `returning degraded report`. That gives the rule-based fallback report. The results screens come from `/analyze/demo`, the built-in sample report.

## 2. Capture

From the portfolio root, with the analyzer on `localhost:3000`:

```sh
node scripts/screenshots/capture.mjs nokey
```

PNGs land in `scripts/screenshots/out/` (gitignored): desktop at 1440x900 and 1x, mobile at 390x844 and 2x, light theme, reduced motion. Element crops keep a 20px margin. Other modes: `mobilerest` (mobile results and error only), and `live`, `dashboard` and `reshoot`, which need a provider key and a stored session from `nokey`.

Convert the shots you want to keep to webp under the same filenames, so no code changes are needed:

```sh
node -e "require('sharp')('scripts/screenshots/out/05-results-score-desktop.png').webp({quality:85}).toFile('public/projects/ai-resume-analyzer/05-results-score-desktop.webp')"
```

## 3. Regenerate the cover

The browser window shows a full-page capture of `/analyze/demo`, kept here as `13-results-full-page-desktop.webp`, so the cover keeps its original scale. The phone shows `public/projects/ai-resume-analyzer/05-results-score-mobile.webp`. To refresh the desktop half, capture it and convert it as above (output `scripts/screenshots/13-results-full-page-desktop.webp`):

```sh
node scripts/screenshots/capture.mjs cover
```

Then render the cover to `public/projects/ai-resume-analyzer/cover.webp`:

```sh
node scripts/screenshots/compose.mjs
```
