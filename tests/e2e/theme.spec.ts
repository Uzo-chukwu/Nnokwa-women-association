import { expect, test } from "@playwright/test";

test("the theme starts with the system preference and a keyboard choice persists across routes and reloads", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/news", { waitUntil: "domcontentloaded" });
  const toggle = page.getByRole("button", { name: "Dark mode" });
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  const sun = toggle.locator(".site-theme-sun");
  const moon = toggle.locator(".site-theme-moon");
  await expect(sun).toHaveCSS("opacity", "1");
  await expect(moon).toHaveCSS("opacity", "0");
  const darkSurface = await page.getByRole("banner").evaluate((banner) => getComputedStyle(banner).backgroundColor);
  const darkText = await page.getByRole("heading", { level: 1 }).evaluate((heading) => getComputedStyle(heading).color);
  await toggle.press("Space");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(sun).toHaveCSS("opacity", "0");
  await expect(moon).toHaveCSS("opacity", "1");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
  await expect(page.getByRole("banner")).not.toHaveCSS("background-color", darkSurface);
  await expect(page.getByRole("heading", { level: 1 })).not.toHaveCSS("color", darkText);

  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Home", exact: true }).click();
  await expect(page).toHaveURL("/");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test("the dark theme and mobile menu are usable at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  const toggle = page.getByRole("button", { name: "Dark mode" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 248)");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(27, 25, 22)");
  await expect(page.getByRole("banner")).toHaveCSS("background-color", "rgb(37, 33, 29)");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", "rgb(246, 239, 227)");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const menu = page.getByRole("navigation", { name: "Main navigation" });
  await expect(menu).toBeVisible();
  await expect(menu).toHaveCSS("background-color", "rgb(37, 33, 29)");
  await expect(menu.getByRole("link", { name: "Donate", exact: true }))
    .toHaveCSS("background-color", "rgb(214, 180, 106)");
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(27, 25, 22)");
});

test("the page colors follow changes to the system theme until a choice is saved", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 248)");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(27, 25, 22)");
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 248)");
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 248)");
});
