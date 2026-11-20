import { expect, test } from "@playwright/test";
import { executives, leadershipPreview, leadershipPortraitCloudName, presidentGeneral } from "../../src/data/leadership";
import { siteInfo } from "../../src/data/site";

test("the homepage features only the President General and links to the full leadership page", async ({ page }) => {
  await page.goto("/");
  const preview = page.getByRole("region", { name: leadershipPreview.heading });
  await expect(preview.getByRole("article")).toHaveCount(1);
  await expect(preview.getByRole("article", { name: presidentGeneral.name })
    .getByRole("img", { name: presidentGeneral.portrait.alt }))
    .toHaveAttribute("src", new RegExp(`/${presidentGeneral.portrait.publicId}$`));

  await preview.getByRole("link", { name: "Meet the Full Leadership Team" }).click();
  await expect(page).toHaveURL("/leadership");
  await expect(page.getByRole("heading", { name: "Our Leadership", level: 1 })).toBeVisible();
  await expect(page.getByRole("main").getByRole("article")).toHaveCount(8);
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

  for (const width of [320, 375, 390, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `Leadership horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
    const featuredPortrait = await main.getByRole("img", { name: presidentGeneral.portrait.alt, exact: true }).boundingBox();
    if (!featuredPortrait) throw new Error(`Missing President General portrait at ${width}px`);

    for (const { id, name, portrait, biography } of executives) {
      const profile = main.getByRole("article", { name, exact: true });
      const image = await profile.getByRole("img", { name: portrait.alt }).boundingBox();
      const heading = await profile.getByRole("heading", { name, exact: true }).boundingBox();
      if (!image || !heading) throw new Error(`Missing profile layout for ${name} at ${width}px`);
      if (id !== presidentGeneral.id) {
        expect(image.width, `${name}'s portrait is smaller than the President General's at ${width}px`)
          .toBeLessThan(featuredPortrait.width);
      }

      if (width < 640) {
        const card = await profile.boundingBox();
        const bio = await profile.getByText(biography[0], { exact: true }).boundingBox();
        if (!card || !bio) throw new Error(`Missing card or biography for ${name} at ${width}px`);
        expect(image.width, `${name}'s portrait fills the card at ${width}px`).toBeGreaterThanOrEqual(card.width * 0.85);
        expect(heading.y, `${name}'s heading starts below the portrait at ${width}px`).toBeGreaterThan(image.y + image.height);
        expect(bio.y, `${name}'s biography follows the heading at ${width}px`).toBeGreaterThan(heading.y + heading.height);
      } else {
        expect(image.width, `${name}'s portrait is at least 160px wide at ${width}px`).toBeGreaterThanOrEqual(160);
        expect(heading.x, `${name}'s heading sits beside the portrait at ${width}px`).toBeGreaterThan(image.x + image.width);
      }
    }
  }
});
