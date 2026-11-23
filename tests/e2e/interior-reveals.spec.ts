import { expect, test } from "@playwright/test";
import { constitution, registration } from "../../src/data/governance";

const pages = [
  { route: "/about", heading: "About Us", sections: ["Who We Are", "Our Mission", "Our Vision", "Our Core Pillars", "Legal Status & Governance", "Our History"] },
  { route: "/our-work", heading: "Our Work", sections: ["Our Focus Areas", "Our Community Activities", "Our SDG Commitment"] },
];

for (const width of [320, 360, 375, 390, 430]) {
  test(`About and Our Work reveal their sections without layout changes at ${width}px`, async ({ page }) => {
    test.setTimeout(50_000);
    await page.setViewportSize({ width, height: 650 });
    await page.emulateMedia({ reducedMotion: "no-preference" });

    for (const { route, heading, sections } of pages) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      const intro = page.getByRole("region", { name: heading, exact: true }).locator('[data-reveal="fade-up"]');
      await expect(intro).toHaveAttribute("data-reveal-state", "shown");

      const main = page.getByRole("main");
      const layout = () => main.locator("[data-reveal]").evaluateAll((elements) => (
        elements.map((element) => {
          const block = element as HTMLElement;
          return [block.offsetTop, block.offsetWidth, block.offsetHeight];
        })
      ));
      const originalLayout = await layout();

      for (const name of sections) {
        const section = main.getByRole("region", { name, exact: true });
        const blocks = section.locator("[data-reveal]").or(section.and(page.locator("[data-reveal]")));
        expect(await blocks.count(), name).toBeGreaterThan(0);
        for (const block of await blocks.all()) {
          await block.evaluate((element) => element.scrollIntoView({ block: "center" }));
          await expect(block).toHaveCSS("opacity", "1");
        }
      }
      expect(await layout()).toEqual(originalLayout);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBe(width);
    }
  });
}

test("focusing either governance document reveals it immediately and preserves its destination", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 650 });
  await page.emulateMedia({ reducedMotion: "no-preference" });

  for (const [label, url] of [
    ["View Our Constitution", constitution.url],
    ["View Full Certificate", registration.certificate.url],
  ]) {
    await page.goto("/about", { waitUntil: "domcontentloaded" });
    const governance = page.getByRole("region", { name: "Legal Status & Governance" });
    const link = governance.getByRole("link", { name: label, exact: true });
    const card = governance.locator('[data-reveal="fade-in"]').filter({
      has: page.getByRole("link", { name: label, exact: true }),
    });
    await expect(link).toHaveAttribute("href", url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(card).toHaveAttribute("data-reveal-state", "pending");
    await link.focus();
    await expect(link).toBeFocused();
    await expect(card).toHaveAttribute("data-reveal-state", "shown");
    await expect(card).toHaveCSS("animation-name", "none");
    await expect(card).toHaveCSS("opacity", "1");
  }
});

test("Our Work activity cards keep the short mobile stagger", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 650 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/our-work", { waitUntil: "domcontentloaded" });
  const activity = page.getByRole("region", { name: "Our Community Activities" }).getByRole("listitem").last();
  await expect(activity).toHaveAttribute("data-reveal-state", "pending");
  const delay = await activity.evaluate((element) => new Promise<number>((resolve) => {
    element.addEventListener("animationstart", () => {
      const animation = element.getAnimations().find(
        (item) => item instanceof CSSAnimation && item.animationName === "scroll-reveal",
      );
      resolve(Number(animation?.effect?.getTiming().delay));
    }, { once: true });
    element.scrollIntoView({ block: "center" });
  }));
  expect(delay).toBeCloseTo(88);
  await expect(activity).toHaveAttribute("data-reveal-state", "shown");
});

test("About and Our Work remain readable with reduced motion or JavaScript disabled", async ({ page, browser, baseURL }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const staticPage = await context.newPage();
    for (const view of [page, staticPage]) {
      for (const { route, heading } of pages) {
        await view.goto(route, { waitUntil: "domcontentloaded" });
        await expect(view.getByRole("heading", { level: 1, name: heading })).toBeVisible();
        const styles = await view.locator("[data-reveal]").evaluateAll((elements) => elements.map((element) => {
          const { opacity, animationName } = getComputedStyle(element);
          return { opacity, animationName };
        }));
        expect(styles.length).toBeGreaterThan(10);
        expect(styles.every(({ opacity, animationName }) => opacity === "1" && animationName === "none")).toBe(true);
      }
    }
  } finally {
    await context.close();
  }
});
