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
    await expect(page.getByRole("banner").getByRole("link", { name: /Nnokwa Women Association/i })).toBeFocused();
    await expect(open).toHaveAttribute("aria-expanded", "false");
  });
});
