// Usage: node scripts/screenshots/compose.mjs
// Renders public/projects/ai-resume-analyzer/cover.webp from the case-study screenshots.
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const DIR = path.join(import.meta.dirname, '../../public/projects/ai-resume-analyzer/');
const uri = (file) => 'data:image/webp;base64,' + fs.readFileSync(file).toString('base64');
// Full-page /analyze/demo at 1440 wide, from `capture.mjs cover`. Only the cover uses it.
const DESKTOP = path.join(import.meta.dirname, '13-results-full-page-desktop.webp');

// App tokens from the analyzer's app/globals.css
const css = `
*{box-sizing:border-box;margin:0}
body{width:var(--w);height:var(--h);overflow:hidden;font-family:Inter,'Segoe UI',Arial,sans-serif;color:#475069;
  background:
    radial-gradient(62rem 44rem at 6% -14%, rgb(124 58 237 / .16), transparent 62%),
    radial-gradient(54rem 38rem at 98% 0%, rgb(37 99 235 / .13), transparent 60%),
    radial-gradient(48rem 36rem at 78% 98%, rgb(168 85 247 / .11), transparent 64%),
    linear-gradient(180deg,#faf8ff 0%,#f3eefd 48%,#ebe4fb 100%);}
.win{background:#fff;border:1px solid #ddd8f0;border-radius:14px;overflow:hidden;
  box-shadow:0 1px 2px rgb(28 16 66/.07),0 10px 22px -12px rgb(28 16 66/.2),0 30px 56px -34px rgb(28 16 66/.38)}
.bar{height:30px;background:#f5f4fb;border-bottom:1px solid #e9e7f5;display:flex;align-items:center;gap:7px;padding:0 12px}
.bar i{width:10px;height:10px;border-radius:50%;background:#ddd8f0;display:block}
.shot{display:block;width:100%}
`;

const cover = `<!doctype html><html><head><meta charset="utf-8"><style>:root{--w:1600px;--h:900px}${css}
.desk{position:absolute;left:120px;top:90px;width:1180px}
.desk .crop{height:780px;overflow:hidden}
.phone{position:absolute;right:110px;top:190px;width:300px;border-radius:36px;border:10px solid #0b1220;overflow:hidden;background:#fff;
  box-shadow:0 30px 60px -20px rgb(28 16 66/.45)}
.phone .crop{height:600px;overflow:hidden}
</style></head><body>
<div class="win desk"><div class="bar"><i></i><i></i><i></i></div><div class="crop">
  <img class="shot" src="${uri(DESKTOP)}"></div></div>
<div class="phone"><div class="crop"><img class="shot" src="${uri(DIR + '05-results-score-mobile.webp')}"></div></div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.setContent(cover, { waitUntil: 'load' });
  const png = await page.screenshot();
  await browser.close();
  const out = await sharp(png).webp({ quality: 85 }).toFile(DIR + 'cover.webp');
  console.log('saved cover.webp', Math.round(out.size / 1024) + ' KB');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
