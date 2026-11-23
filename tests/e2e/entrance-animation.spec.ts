import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`the gold entrance covers the viewport and releases the homepage at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const overlay = page.locator("#homepage-entrance");
    const shell = page.locator("#site-content");
    await expect(overlay).toBeVisible();
    await expect(shell).toHaveJSProperty("inert", true);
    expect(await overlay.boundingBox()).toEqual({ x: 0, y: 0, width, height: 850 });
    const layoutWidth = (await shell.boundingBox())?.width;
    await expect(overlay.locator(".homepage-entrance-panel-left")).toHaveCSS("background-color", "rgb(214, 180, 106)");
    const logo = overlay.locator(".homepage-entrance-logo");
    await expect.poll(async () => Number(await logo.evaluate((element) => getComputedStyle(element).opacity)))
      .toBeGreaterThan(0.5);
    const ctaCanFocus = await shell.locator('main a[href="/donate"]').first().evaluate((link: HTMLAnchorElement) => {
      link.focus();
      return document.activeElement === link;
    });
    expect(ctaCanFocus).toBe(false);

    await expect(overlay).toBeHidden({ timeout: 6000 });
    await expect(shell).toHaveJSProperty("inert", false);
    await expect(page.locator("html")).not.toHaveAttribute("data-home-entrance");
    expect((await shell.boundingBox())?.width).toBe(layoutWidth);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);

    const cta = page.getByRole("link", { name: "Support Our Work", exact: true });
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page).toHaveURL("/donate");
    await expect(overlay).toBeHidden();

    await page.getByRole("banner").getByRole("link", { name: "Nnokwa Women Association" }).click();
    await expect(page).toHaveURL("/");
    await expect(overlay).toBeVisible();
    await expect(overlay).toBeHidden({ timeout: 6000 });
  });
}

test("refreshing and opening another tab both replay the entrance", async ({ page, context }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#homepage-entrance")).toBeVisible();
  await expect(page.locator("#homepage-entrance")).toBeHidden({ timeout: 6000 });
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("#homepage-entrance")).toBeVisible();

  const tab = await context.newPage();
  try {
    await tab.goto("/", { waitUntil: "domcontentloaded" });
    await expect(tab.locator("#homepage-entrance")).toBeVisible();
    await expect(tab.locator("#homepage-entrance")).toBeHidden({ timeout: 6000 });
    await expect(tab.getByRole("heading", { level: 1 })).toBeVisible();
  } finally {
    await tab.close();
  }
});

test("reduced motion opens the homepage immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#homepage-entrance")).toBeHidden();
  await expect(page.locator("#site-content")).toHaveJSProperty("inert", false);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("a client-side navigation from another page starts the entrance only on Home", async ({ page }) => {
  await page.goto("/news");
  await expect(page.locator("#homepage-entrance")).toBeHidden();
  await page.evaluate(() => new Promise<void>((resolve) => requestIdleCallback(() => resolve())));
  await page.evaluate(() => Reflect.set(window, "entranceTestDocument", true));
  await page.getByRole("banner").getByRole("link", { name: "Nnokwa Women Association" }).click();
  await expect(page).toHaveURL("/");
  expect(await page.evaluate(() => Reflect.get(window, "entranceTestDocument"))).toBe(true);
  await expect(page.locator("#homepage-entrance")).toBeVisible();
  await expect(page.locator("#homepage-entrance")).toBeHidden({ timeout: 6000 });
});

test("removing the overlay during playback restores homepage interaction", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const overlay = page.locator("#homepage-entrance");
  await expect(overlay).toBeVisible();
  await overlay.evaluate((element) => element.remove());
  await expect(page.locator("html")).not.toHaveAttribute("data-home-entrance");
  await expect(page.locator("#site-content")).toHaveJSProperty("inert", false);
  await expect(page.getByRole("link", { name: "Support Our Work", exact: true })).toBeVisible();
});
