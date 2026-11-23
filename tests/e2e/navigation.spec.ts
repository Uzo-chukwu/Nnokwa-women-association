import { expect, test } from "@playwright/test";
import { navigationLinks } from "../../src/data/navigation";

test("desktop header, footer and homepage preview reach News & Events", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  for (const { label, href } of navigationLinks) {
    await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", href);
  }

  for (const link of [
    nav.getByRole("link", { name: "News & Events", exact: true }),
    page.getByRole("navigation", { name: "Footer Explore" }).getByRole("link", { name: "News & Events" }),
    page.getByRole("main").getByRole("link", { name: "View All Updates" }),
  ]) {
    await link.click();
    await expect(page).toHaveURL("/news");
    await expect(page.getByRole("heading", { name: "News & Events", level: 1 })).toBeVisible();
    await nav.getByRole("link", { name: "Home", exact: true }).click();
    await expect(page).toHaveURL("/");
  }
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 900 } });

  test("the disclosure toggles and its News link opens the news page", async ({ page }) => {
    await page.goto("/");
    const open = page.getByRole("button", { name: "Open navigation" });
    const close = page.getByRole("button", { name: "Close navigation" });
    const nav = page.getByRole("navigation", { name: "Main navigation", includeHidden: true });
    await expect(open).toHaveAttribute("aria-expanded", "false");
    await expect(nav).toBeHidden();
    await open.click();
    await expect(close).toHaveAttribute("aria-expanded", "true");
    await expect(close).toHaveAttribute("aria-controls", (await nav.getAttribute("id")) ?? "");
    await close.click();
    await expect(nav).toBeHidden();
    await open.click();
    await nav.getByRole("link", { name: "News & Events" }).click();
    await expect(page).toHaveURL("/news");
    await expect(open).toHaveAttribute("aria-expanded", "false");
  });

  test("Escape restores toggle focus and Tab closes on both exits", async ({ page }) => {
    await page.goto("/");
    const open = page.getByRole("button", { name: "Open navigation" });
    const close = page.getByRole("button", { name: "Close navigation" });
    const nav = page.getByRole("navigation", { name: "Main navigation" });

    await open.click();
    await page.keyboard.press("Tab");
    await expect(nav.getByRole("link", { name: "Home", exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(open).toBeFocused();
    await expect(open).toHaveAttribute("aria-expanded", "false");

    await open.press("Enter");
    for (const label of [...navigationLinks.map(({ label }) => label), "Donate"]) {
      await page.keyboard.press("Tab");
      await expect(nav.getByRole("link", { name: label, exact: true })).toBeFocused();
    }
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Support Our Work" })).toBeFocused();
    await expect(open).toHaveAttribute("aria-expanded", "false");

    await open.press("Enter");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(close).toBeFocused();
    await expect(close).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Shift+Tab");
    await expect(page.getByRole("banner").getByRole("button", { name: "Dark mode" })).toBeFocused();
    await expect(open).toHaveAttribute("aria-expanded", "false");
  });

  test("the three strokes morph into an X and links stagger in both directions", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/news");
    const toggle = page.getByRole("button", { name: "Open navigation" });
    const menu = page.locator("#primary-navigation");
    const strokes = page.locator(".site-menu-icon > span");
    const items = menu.locator(".site-navigation-item");
    const layout = () => items.evaluateAll((nodes) => nodes.map((node) => {
      const item = node as HTMLElement;
      return [item.offsetTop, item.offsetHeight];
    }));
    const initialLayout = await layout();
    const delays = () => items.evaluateAll((nodes) => nodes.map((node) =>
      Math.round(Number.parseFloat(getComputedStyle(node).transitionDelay) * 1000),
    ));
    await expect(strokes.first()).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -6)");
    await expect(strokes.nth(1)).toHaveCSS("opacity", "1");
    await toggle.press("Enter");
    await expect(menu).toHaveJSProperty("inert", false);
    expect(await delays()).toEqual(Array.from({ length: navigationLinks.length + 1 }, (_, index) => index * 50));
    await expect(strokes.first()).toHaveCSS("transform", "matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)");
    await expect(strokes.nth(1)).toHaveCSS("opacity", "0");
    await expect(strokes.last()).toHaveCSS("transform", "matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, 0)");
    await expect(items.last()).toHaveCSS("opacity", "1");
    expect(await layout()).toEqual(initialLayout);

    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveCSS("outline-width", "2px");
    await expect(menu).toHaveJSProperty("inert", true);
    expect(await delays()).toEqual(Array.from(
      { length: navigationLinks.length + 1 }, (_, index) => (navigationLinks.length - index) * 28,
    ));
    await expect(menu).toBeHidden();
    await expect(strokes.first()).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -6)");
    await expect(strokes.nth(1)).toHaveCSS("opacity", "1");
  });
});

test.describe("phone touch targets", () => {
  test.use({ hasTouch: true });

  for (const width of [320, 360, 375, 390, 430]) {
    test(`the mobile menu and footer controls are usable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 375 });
      await page.goto("/news", { waitUntil: "domcontentloaded" });
      const toggle = page.getByRole("button", { name: "Open navigation" });
      const menu = page.locator("#primary-navigation");
      for (const control of [toggle, page.getByRole("button", { name: "Dark mode" })]) {
        const bounds = await control.boundingBox();
        expect(bounds?.width).toBeGreaterThanOrEqual(44);
        expect(bounds?.height).toBeGreaterThanOrEqual(44);
        await expect(control).toHaveCSS("border-top-width", "0px");
      }
      await toggle.tap();
      await expect(menu).toHaveJSProperty("inert", false);
      await expect(menu).toHaveCSS("opacity", "1");
      const links = menu.getByRole("link");
      for (const link of await links.all()) {
        expect((await link.boundingBox())?.height).toBeGreaterThanOrEqual(44);
      }
      await menu.tap({ position: { x: width / 2, y: 3 } });
      await expect(page.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
      expect(await menu.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);

      await page.touchscreen.tap(4, 4);
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(menu).toHaveJSProperty("inert", true);
      await expect(menu).toBeHidden();

      const footer = page.getByRole("contentinfo");
      for (const link of await footer.getByRole("link").all()) {
        expect((await link.boundingBox())?.height).toBeGreaterThanOrEqual(44);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    });
  }
});

test("the menu and shared buttons respect reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 750 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/news");
  const menu = page.locator("#primary-navigation");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(menu).toHaveCSS("transition-duration", "0s");
  await expect(menu).toHaveCSS("transform", "none");
  await expect(menu.locator(".site-navigation-item").last()).toHaveCSS("transition-delay", "0s");
  for (const icon of [page.locator(".site-menu-icon > span").first(), page.locator(".site-theme-sun")]) {
    await expect(icon).toHaveCSS("transition-duration", "0s");
  }
  await expect(menu.getByRole("link", { name: "Donate" })).toHaveCSS("transition-duration", "0s");
  await page.getByRole("button", { name: "Close navigation" }).click();
  await expect(menu).toBeHidden();
});

test("desktop navigation underlines and Donate button respond to hover and press", async ({ page }) => {
  await page.goto("/news");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  const about = nav.getByRole("link", { name: "About Us", exact: true });
  const current = nav.getByRole("link", { name: "News & Events", exact: true });
  await expect(current).toHaveAttribute("aria-current", "page");
  expect(await current.evaluate((link) => getComputedStyle(link, "::after").transform)).toBe("matrix(1, 0, 0, 1, 0, 0)");
  const initialLayout = await about.boundingBox();
  const underline = () => about.evaluate((link) => getComputedStyle(link, "::after").transform);
  await expect.poll(underline).toBe("matrix(0, 0, 0, 1, 0, 0)");
  await about.hover();
  await expect.poll(underline).toBe("matrix(1, 0, 0, 1, 0, 0)");
  expect(await about.boundingBox()).toEqual(initialLayout);

  const donate = nav.getByRole("link", { name: "Donate", exact: true });
  await donate.hover();
  await expect(donate).toHaveCSS("background-color", "rgb(230, 202, 137)");
  await page.mouse.down();
  try {
    await expect(donate).toHaveCSS("background-color", "rgb(200, 163, 84)");
  } finally {
    await page.mouse.move(0, 0);
    await page.mouse.up();
  }
  await expect(page).toHaveURL("/news");
});
