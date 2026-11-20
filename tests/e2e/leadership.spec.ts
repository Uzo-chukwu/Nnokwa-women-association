import { expect, test } from "@playwright/test";
import { executives, leadershipPreview, leadershipPortraitCloudName, presidentGeneral } from "../../src/data/leadership";
import { siteInfo } from "../../src/data/site";

test("the homepage preview and footer open the full leadership page", async ({ page }) => {
  await page.goto("/");
  const preview = page.getByRole("region", { name: leadershipPreview.heading });
  for (const executive of executives) {
    const card = preview.getByRole("listitem").filter({
      has: page.getByRole("heading", { name: executive.name, exact: true }),
    });
    await expect(card.getByRole("img", { name: executive.portrait.alt }))
      .toHaveAttribute("src", new RegExp(`/${executive.portrait.publicId}$`));
  }

  await preview.getByRole("link", { name: "Meet the Full Leadership Team" }).click();
  await expect(page).toHaveURL("/leadership");
  await expect(page.getByRole("heading", { name: "Our Leadership", level: 1 })).toBeVisible();
  await page.goto("/");
  await page.getByRole("navigation", { name: "Footer Explore" }).getByRole("link", { name: "Leadership" }).click();
  await expect(page).toHaveURL("/leadership");
});

test("leadership renders eight complete profiles with mapped portraits at all requested widths", async ({ page }) => {
  const response = await page.goto("/leadership");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(`Our Leadership | ${siteInfo.name}`);
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const main = page.getByRole("main");
  await expect(main.getByRole("article")).toHaveCount(8);
  const team = main.getByRole("region", { name: "Executive Leadership" });
  await expect(team.getByRole("article")).toHaveCount(7);
  await expect(main.getByRole("heading", { name: presidentGeneral.name, level: 2 })).toBeVisible();

  for (const { name, position, portrait, biography } of executives) {
    const profile = main.getByRole("article", { name, exact: true });
    await expect(profile).toHaveCount(1);
    await expect(profile.getByText(position, { exact: true })).toBeVisible();
    const image = profile.getByRole("img", { name: portrait.alt, exact: true });
    await expect(image).toHaveAttribute("src", new RegExp(`^https://res\\.cloudinary\\.com/${leadershipPortraitCloudName}/image/upload/.+/${portrait.publicId}$`));
    await expect(image).toHaveAttribute("srcset", /\d+w/);
    for (const paragraph of biography) {
      await expect(profile.getByText(paragraph, { exact: true })).toBeVisible();
    }
  }

  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `Leadership horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});
