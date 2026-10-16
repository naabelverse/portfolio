// Usage: node scripts/screenshots/capture.mjs nokey | mobilerest | live | dashboard | reshoot
// Captures the AI Resume Analyzer running on localhost:3000 into scripts/screenshots/out/.
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-core';

const S = path.join(import.meta.dirname, 'out') + '/';
const R = path.join(import.meta.dirname, 'fixtures') + '/';
const BASE = 'http://localhost:3000';
const STORAGE = S + 'session-storage.json';
const JD = fs.readFileSync(R + 'fictional-job-description.txt', 'utf8');
fs.mkdirSync(S, { recursive: true });

const VPS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

async function newContext(browser, vp, storage) {
  const ctx = await browser.newContext({ ...VPS[vp], reducedMotion: 'reduce', colorScheme: 'light' });
  // Hide the Next.js dev-tools badge so screenshots look like production.
  await ctx.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style');
      s.textContent = 'nextjs-portal{display:none!important} body{background-attachment:scroll!important}';
      document.head.appendChild(s);
    });
  });
  // Restore real records saved from an earlier run of this script.
  if (storage) {
    await ctx.addInitScript((data) => {
      if (sessionStorage.getItem('ara:index')) return;
      for (const [k, v] of Object.entries(data)) sessionStorage.setItem(k, v);
    }, storage);
  }
  return ctx;
}

async function settle(page, ms = 700) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(ms);
}

async function shot(page, name, opts = {}) {
  await page.screenshot({ path: S + name + '.png', ...opts });
  console.log('saved', name);
}

// One element with a margin of page canvas around it.
async function shotEl(page, locator, name, margin = 20) {
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const r = await locator.evaluate((e) => {
    const b = e.getBoundingClientRect();
    return { x: b.x + scrollX, y: b.y + scrollY, w: b.width, h: b.height };
  });
  const m = Math.min(margin, r.x);
  await shot(page, name, {
    fullPage: true,
    clip: { x: r.x - m, y: r.y - m, width: r.w + 2 * m, height: r.h + 2 * m },
  });
}

const card = (page, title) =>
  page.locator('.card').filter({ has: page.locator('h2', { hasText: new RegExp('^' + title + '$') }) }).first();


async function selectResumeAndJd(page, file) {
  await page.setInputFiles('input[type=file]', R + file);
  await page.waitForFunction(() =>
    [...document.querySelectorAll('button')].some((b) => b.textContent.includes('Analyse resume') && !b.disabled),
  );
  await page.getByText('Paste the job description (optional)').click();
  await page.locator('textarea').fill(JD);
  await settle(page, 400);
}

async function nokey(browser) {
  for (const vp of ['desktop', 'mobile']) {
    const ctx = await newContext(browser, vp);
    const page = await ctx.newPage();

    // 1. Landing
    await page.goto(BASE + '/');
    await settle(page);
    await shot(page, `01-landing-${vp}`);

    // 2. Drag-and-drop state, triggered with a synthetic dragenter
    const zone = page.locator('label.dropzone');
    await zone.scrollIntoViewIfNeeded();
    const dt = await page.evaluateHandle(() => new DataTransfer());
    await zone.dispatchEvent('dragenter', { dataTransfer: dt });
    await zone.dispatchEvent('dragover', { dataTransfer: dt });
    await page.waitForTimeout(300);
    await shot(page, `02-upload-dragover-${vp}`);
    await zone.dispatchEvent('dragleave', { dataTransfer: dt });

    // 3. Extracted text preview, job description filled
    await selectResumeAndJd(page, 'jordan-example-resume.pdf');
    await page.evaluate(() => scrollTo(0, 0));
    if (vp === 'mobile') await page.locator('.quote-well').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, `03-text-preview-${vp}`);

    // 4. Loading: hold the response so the staged bar is visible
    await page.route('**/api/analyze', async (route) => {
      await new Promise((r) => setTimeout(r, 26_000));
      await route.continue();
    });
    await page.getByRole('button', { name: 'Analyse resume' }).click();
    await page.waitForTimeout(19_000);
    await page.locator('[role=progressbar]').first().scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollBy(0, 160));
    await page.waitForTimeout(300);
    await shot(page, `04-loading-progress-${vp}`);

    // 11. Rule-based fallback report (no API key on this server)
    await page.waitForURL(/\/analyze\//, { timeout: 60_000 });
    await settle(page, 1000);
    await shot(page, `11-fallback-report-${vp}`);
    if (vp === 'desktop') {
      await shot(page, `11-fallback-report-full-desktop`, { fullPage: true });
      const storage = await page.evaluate(() => Object.fromEntries(Object.entries(sessionStorage)));
      fs.writeFileSync(STORAGE, JSON.stringify(storage, null, 2));
      console.log('stored', Object.keys(storage));
    }

    await rest(page, vp);
    await ctx.close();
  }
}

async function rest(page, vp) {
    // 12. Friendly error: unsupported file type
    await page.goto(BASE + '/');
    await settle(page);
    await page.setInputFiles('input[type=file]', R + 'unsupported-file.txt');
    await settle(page, 1500);
    if (vp === 'mobile') await page.getByText('Resumes must be a PDF').first().scrollIntoViewIfNeeded();
    await shot(page, `12-error-unsupported-file-${vp}`);

    // 5-9. Results, from the built-in demo report
    await page.goto(BASE + '/analyze/demo');
    await settle(page, 1000);
    await shot(page, `05-results-score-${vp}`);
    await shotEl(page, card(page, 'Section breakdown'), `06-results-sections-${vp}`);
    await shotEl(page, card(page, 'AI feedback'), `06b-results-ai-feedback-${vp}`);
    await shotEl(page, card(page, 'Things to fix'), `07-results-things-to-fix-${vp}`);
    await shotEl(page, card(page, 'Suggested bullet rewrites'), `08-results-bullet-rewrites-${vp}`);
    await shotEl(page, card(page, 'Keyword match'), `09-results-keyword-match-${vp}`);
    if (vp === 'desktop') {
      await page.evaluate(() => scrollTo(0, 0));
      await shot(page, '13-results-full-page-desktop', { fullPage: true });
    }
}

async function mobilerest(browser) {
  const ctx = await newContext(browser, 'mobile');
  const page = await ctx.newPage();
  await rest(page, 'mobile');
  await ctx.close();
}

// One real analysis of the fictional resume. Needs a provider key on the server.
async function live(browser) {
  const storage = JSON.parse(fs.readFileSync(STORAGE, 'utf8'));
  const ctx = await newContext(browser, 'desktop', storage);
  const page = await ctx.newPage();
  await page.goto(BASE + '/');
  await settle(page);
  await selectResumeAndJd(page, 'jordan-example-resume.pdf');
  const t0 = Date.now();
  await page.getByRole('button', { name: 'Analyse resume' }).click();
  await page.waitForURL(/\/analyze\//, { timeout: 300_000 });
  console.log('analysis wall time ms', Date.now() - t0);
  await settle(page, 1200);
  console.log('degraded?', (await page.getByText('What we found').count()) > 0);
  await shot(page, '14-real-analysis-desktop');
  await shot(page, '14-real-analysis-full-desktop', { fullPage: true });
  const all = await page.evaluate(() => Object.fromEntries(Object.entries(sessionStorage)));
  fs.writeFileSync(STORAGE, JSON.stringify(all, null, 2));
  await ctx.close();
}

async function dashboard(browser) {
  const storage = JSON.parse(fs.readFileSync(STORAGE, 'utf8'));
  for (const vp of ['desktop', 'mobile']) {
    const ctx = await newContext(browser, vp, storage);
    const page = await ctx.newPage();
    await page.goto(BASE + '/dashboard');
    await settle(page, 1000);
    await shot(page, `10-history-dashboard-${vp}`);
    await ctx.close();
  }
}

async function reshoot(browser) {
  const storage = JSON.parse(fs.readFileSync(STORAGE, 'utf8'));
  const index = JSON.parse(storage['ara:index']);
  console.log(JSON.stringify(index));
  for (const vp of ['desktop', 'mobile']) {
    const ctx = await newContext(browser, vp, storage);
    const page = await ctx.newPage();
    await rest(page, vp);
    for (const e of index) {
      const rec = JSON.parse(storage['ara:analysis:' + e.id]);
      const name = rec.meta.degraded ? '11-fallback-report' : '14-real-analysis';
      await page.goto(BASE + '/analyze/' + e.id);
      await settle(page, 1000);
      await shot(page, `${name}-${vp}`);
      if (vp === 'desktop') await shot(page, `${name}-full-desktop`, { fullPage: true });
    }
    await ctx.close();
  }
}

(async () => {
  const browser = await chromium.launch();
  try {
    await { nokey, mobilerest, live, dashboard, reshoot }[process.argv[2]](browser);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
