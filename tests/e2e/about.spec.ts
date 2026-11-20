import { expect, test } from "@playwright/test";
import { aboutContent } from "../../src/data/about";
import { siteInfo } from "../../src/data/site";

test("About Us is reachable from the header, footer, and homepage", async ({ page }) => {
  await page.goto("/");
  for (const link of [
    page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About Us" }),
    page.getByRole("navigation", { name: "Footer Explore" }).getByRole("link", { name: "About Us" }),
    page.getByRole("main").getByRole("link", { name: "Discover Our Story" }).first(),
  ]) {
    await link.click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { level: 1, name: "About Us" })).toBeVisible();
    await expect(page).toHaveTitle(`About Us | ${siteInfo.name}`);
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveCount(1);
    await expect(description).toHaveAttribute("content", aboutContent.introduction);
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Home", exact: true }).click();
    await expect(page).toHaveURL("/");
  }
});

test("About Us renders each section and fits all requested widths", async ({ page }) => {
  const response = await page.goto("/about");
  expect(response?.status()).toBe(200);
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const main = page.getByRole("main");

  for (const name of ["Who We Are", "Our Mission", "Our Vision", "Our Core Pillars", "Our Motto", "Our History"]) {
    await expect(main.getByRole("region", { name, exact: true })).toBeVisible();
  }
  const mission = main.getByRole("region", { name: "Our Mission" });
  await expect(mission.getByText(aboutContent.mission, { exact: true })).toBeVisible();
  const vision = main.getByRole("region", { name: "Our Vision" });
  await expect(vision.getByText(aboutContent.vision, { exact: true })).toBeVisible();
  const pillars = main.getByRole("region", { name: "Our Core Pillars" });
  await expect(pillars.getByRole("listitem")).toHaveCount(4);
  for (const name of ["Cultural Preservation", "Capacity Building", "Health Advocacy", "SDG Alignment"]) {
    await expect(pillars.getByRole("heading", { name, exact: true })).toBeVisible();
  }
  for (const { description } of aboutContent.pillars) {
    await expect(pillars.getByText(description, { exact: true })).toBeVisible();
  }
  await expect(main.getByRole("region", { name: "Our Motto" }))
    .toContainText("Health, training and community building.");
  const history = main.getByRole("region", { name: "Our History" });
  await expect(history.getByRole("heading", { level: 3 })).toHaveCount(2);
  for (const { title, introduction, sections } of aboutContent.histories) {
    const account = history.getByRole("article", { name: title, exact: true });
    await expect(account.getByText(introduction, { exact: true })).toBeVisible();
    for (const { heading, body } of sections) {
      await expect(account.getByRole("heading", { name: heading, exact: true, level: 4 })).toBeVisible();
      await expect(account.getByText(body, { exact: true })).toBeVisible();
    }
  }

  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth - root.clientWidth;
    });
    expect(overflow, `About Us horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});
