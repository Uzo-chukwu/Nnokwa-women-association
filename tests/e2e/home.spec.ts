import { expect, test } from "@playwright/test";
import { associationIntro, corePillars, homeHero } from "../../src/data/home";
import { executives, leadershipPreview, presidentGeneral } from "../../src/data/leadership";
import { newsEventsPreview } from "../../src/data/news-events";
import { sdgCommitment } from "../../src/data/sdg-commitment";
import { ourWork } from "../../src/data/work-activities";

test("the homepage loads and renders every main section", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(homeHero.headline.join(" "));
  for (const heading of [
    associationIntro.heading,
    corePillars.heading,
    ourWork.heading,
    sdgCommitment.heading,
    leadershipPreview.heading,
    newsEventsPreview.heading,
    "Be part of the change we are building.",
  ]) {
    await expect(main.getByRole("region", { name: heading, exact: true })).toBeVisible();
  }
});

for (const width of [320, 375, 768, 1440]) {
  test(`home and all eight leadership cards fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const leadership = page.getByRole("region", { name: leadershipPreview.heading });
    const cards = leadership.getByRole("listitem");
    await expect(cards).toHaveCount(8);
    const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
    for (const { name, position } of executives) {
      const card = cards.filter({ has: page.getByRole("heading", { name, exact: true }) });
      await expect(card).toBeVisible();
      await expect(card.getByText(position, { exact: true })).toBeVisible();
      const box = await card.boundingBox();
      expect(box?.x, `${position} should start inside the viewport`).toBeGreaterThanOrEqual(0);
      expect(box ? box.x + box.width : Infinity, `${position} should fit inside the viewport`)
        .toBeLessThanOrEqual(viewportWidth + 1);
    }

    const president = cards.filter({ has: page.getByRole("heading", { name: presidentGeneral.name, exact: true }) });
    const otherCard = cards.filter({ has: page.getByText("Vice President", { exact: true }) });
    const ordinaryBorder = await otherCard.evaluate((card) => getComputedStyle(card).borderTopColor);
    await expect(president, "the President has a distinct border").not.toHaveCSS("border-top-color", ordinaryBorder);

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth - root.clientWidth;
    });
    expect(overflow, `homepage horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  });
}
