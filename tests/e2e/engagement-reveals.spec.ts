import { expect, test } from "@playwright/test";

const routes = ["/partnerships", "/donate", "/contact"];

for (const width of [320, 360, 375, 390, 430]) {
  test(`Partnerships, Donate and Contact reveal without layout changes at ${width}px`, async ({ page }) => {
    test.setTimeout(55_000);
    await page.setViewportSize({ width, height: 650 });
    await page.emulateMedia({ reducedMotion: "no-preference" });

    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      const main = page.getByRole("main");
      const blocks = main.locator("[data-reveal]");
      await expect(blocks.first()).toHaveAttribute("data-reveal-state", "shown");

      const layout = () => blocks.evaluateAll((elements) => elements.map((element) => {
        const block = element as HTMLElement;
        return [block.offsetTop, block.offsetWidth, block.offsetHeight];
      }));
      const initial = await layout();
      expect(initial.length, route).toBeGreaterThan(5);
      for (const block of await blocks.all()) {
        await block.evaluate((element) => element.scrollIntoView({ block: "center" }));
        await expect(block).toHaveCSS("opacity", "1");
      }
      expect(await layout(), route).toEqual(initial);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBe(width);

      if (route === "/donate") {
        const copy = main.getByRole("button", { name: "Copy account number" });
        expect((await copy.boundingBox())?.height).toBeGreaterThanOrEqual(44);
      }
      if (route === "/contact") {
        const information = main.getByRole("region", { name: "Contact information" });
        const email = await information.getByRole("link", { name: "contact@nnokwawomen.org" }).boundingBox();
        const copy = await information.getByRole("button", { name: "Copy email address" }).boundingBox();
        if (!email || !copy) throw new Error("Missing Contact touch targets");
        expect(email.height).toBeGreaterThanOrEqual(44);
        expect(copy.height).toBeGreaterThanOrEqual(44);
        expect(copy.y - (email.y + email.height)).toBeGreaterThanOrEqual(8);
        const social = main.getByRole("region", { name: "Connect with us" }).getByRole("link");
        for (const link of await social.all()) {
          const bounds = await link.boundingBox();
          expect(bounds?.height).toBeGreaterThanOrEqual(44);
          expect(bounds?.width).toBeGreaterThanOrEqual(44);
        }
      }
    }
  });
}

test("partnership opportunities use short fade-up staggers at phone widths", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 650 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/partnerships", { waitUntil: "domcontentloaded" });
  const opportunities = page.getByRole("region", { name: "Partnership Opportunities" });
  const card = opportunities.getByRole("listitem").last();
  await expect(card).toHaveAttribute("data-reveal-state", "pending");

  const delay = await card.evaluate((element) => new Promise<number>((resolve) => {
    element.addEventListener("animationstart", () => {
      const animation = element.getAnimations().find(
        (item) => item instanceof CSSAnimation && item.animationName === "scroll-reveal",
      );
      resolve(Number(animation?.effect?.getTiming().delay));
    }, { once: true });
    element.scrollIntoView({ block: "center" });
  }));
  expect(delay).toBeCloseTo(36);
  await expect(card).toHaveAttribute("data-reveal-state", "shown");
});

test("the bank information fades from a readable opacity with no stagger delay", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 650 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/donate", { waitUntil: "domcontentloaded" });
  const bank = page.locator('[data-reveal="fade-in"]').filter({
    has: page.getByRole("region", { name: "Bank transfer details" }),
  });
  await expect(bank).toHaveAttribute("data-reveal-state", "pending");
  await expect(bank).toHaveCSS("opacity", "1");
  const motion = await bank.evaluate((element) => new Promise<{ opacity: number; delay: number }>((resolve) => {
    element.addEventListener("animationstart", () => {
      const animation = element.getAnimations().find(
        (item) => item instanceof CSSAnimation && item.animationName === "scroll-reveal",
      );
      const effect = animation?.effect as KeyframeEffect | undefined;
      resolve({
        opacity: Number(effect?.getKeyframes()[0]?.opacity),
        delay: Number(effect?.getTiming().delay),
      });
    }, { once: true });
    element.scrollIntoView({ block: "center" });
  }));
  expect(motion.opacity).toBeCloseTo(0.9);
  expect(motion.delay).toBe(0);
});

test("all three pages remain readable with reduced motion or JavaScript disabled", async ({ page, browser, baseURL }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const staticPage = await context.newPage();
    for (const view of [page, staticPage]) {
      for (const route of routes) {
        await view.goto(route, { waitUntil: "domcontentloaded" });
        const styles = await view.locator("[data-reveal]").evaluateAll((elements) => elements.map((element) => {
          const { opacity, animationName } = getComputedStyle(element);
          return { opacity, animationName };
        }));
        expect(styles.length, route).toBeGreaterThan(5);
        expect(styles.every(({ opacity, animationName }) => opacity === "1" && animationName === "none"), route).toBe(true);
      }
    }
  } finally {
    await context.close();
  }
});
