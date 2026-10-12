import { expect, test, type Locator, type Page } from "@playwright/test";

import { nav, navCta } from "@/content/site";

/**
 * Clicks every header and footer link from every page, at desktop and at
 * 390px with the mobile menu open, and checks it actually lands: right URL,
 * target heading fully below the sticky header, menu closed. "Repeat" lands
 * on a hash first, scrolls away and clicks again, which is where a link to
 * the current URL once silently did nothing.
 */

type Target = { name: string; place: "header" | "footer"; label?: string; href: string };

const targets: Target[] = [
  { name: "header wordmark", place: "header", href: "/" },
  ...nav.map((item) => ({ name: `header ${item.label}`, place: "header" as const, label: item.label, href: item.href })),
  { name: "header CTA", place: "header", label: navCta.label, href: navCta.href },
  ...nav.map((item) => ({ name: `footer ${item.label}`, place: "footer" as const, label: item.label, href: item.href })),
];

const contexts = [
  { name: "home top", path: "/" },
  { name: "home half", path: "/", half: true },
  { name: "home repeat", path: "/", repeat: true },
  { name: "about", path: "/about" },
  { name: "forgeroom", path: "/projects/forgeroom" },
  { name: "resume analyzer", path: "/projects/ai-resume-analyzer" },
];

function link(page: Page, target: Target, mobile: boolean): Locator {
  if (!target.label) return page.locator('header a[aria-label$="home"]');
  const scope = target.place === "footer" ? page.getByRole("navigation", { name: "Footer" }) : mobile ? page.locator("#mobile-nav") : page.locator("header");
  return scope.getByRole("link", { name: target.label, exact: true }).first();
}

async function click(page: Page, target: Target, mobile: boolean) {
  if (mobile && target.place === "header") await page.getByRole("button", { name: "Menu" }).click();
  await link(page, target, mobile).click();
}

/** Waits until smooth scrolling and any route change have stopped. */
async function settle(page: Page) {
  let last = "";
  for (let stable = 0, i = 0; stable < 4 && i < 60; i++) {
    await page.waitForTimeout(100);
    const now = await page.evaluate(() => `${scrollY}|${location.href}`);
    stable = now === last ? stable + 1 : 0;
    last = now;
  }
}

for (const mobile of [false, true]) {
  test.describe(mobile ? "390px, menu open" : "1280px", () => {
    test.use({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 800 } });

    for (const context of contexts) {
      for (const target of targets) {
        test(`${context.name} → ${target.name}`, async ({ page }) => {
          const errors: string[] = [];
          page.on("pageerror", (error) => errors.push(error.message));
          await page.goto(context.path, { waitUntil: "networkidle" });

          if (context.repeat) {
            // Hashless targets start from /#contact so the click changes something.
            await click(page, target.href.includes("#") ? target : targets.find((t) => t.name === "footer Contact")!, mobile);
            await settle(page);
            if (target.href.includes("#")) await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
            await settle(page);
          }
          if (context.half) {
            await page.evaluate(() => scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) / 2, behavior: "instant" }));
            await settle(page);
          }

          await click(page, target, mobile);
          const [pathname, hash = ""] = target.href.split("#");
          await page.waitForURL((url) => url.pathname === pathname);
          await settle(page);

          const state = await page.evaluate((id) => {
            const section = id ? document.getElementById(id) : null;
            const heading = section && document.getElementById(section.getAttribute("aria-labelledby") ?? "");
            return {
              hash: location.hash.slice(1),
              y: scrollY,
              atBottom: scrollY >= document.documentElement.scrollHeight - innerHeight - 1,
              headerBottom: document.querySelector("header")!.getBoundingClientRect().bottom,
              sectionTop: section?.getBoundingClientRect().top,
              heading: heading?.getBoundingClientRect().toJSON() as DOMRect | undefined,
              viewport: innerHeight,
              menuOpen: !document.getElementById("mobile-nav")!.hidden,
            };
          }, hash);

          expect(state.menuOpen, "mobile menu closed").toBe(false);
          expect(errors, "no page errors").toEqual([]);
          if (!hash) {
            expect(state.y, "landed at the top").toBe(0);
            return;
          }
          expect(state.hash).toBe(hash);
          expect(state.heading, `#${hash} has a labelled heading`).toBeDefined();
          expect(state.heading!.top, "heading clear of the sticky header").toBeGreaterThanOrEqual(state.headerBottom);
          expect(state.heading!.bottom, "heading on screen").toBeLessThanOrEqual(state.viewport);
          // Flush under the header, unless the page ran out of room to scroll.
          if (!state.atBottom) expect(Math.abs(state.sectionTop! - state.headerBottom)).toBeLessThanOrEqual(1);
        });
      }
    }
  });
}
