import { expect, test } from "@playwright/test";
import { associationIntro, corePillars, homeHero } from "../../src/data/home";
import { leadershipPreview, presidentGeneral } from "../../src/data/leadership";
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

for (const width of [320, 375, 390, 768, 1440]) {
  test(`home and the President General preview fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const leadership = page.getByRole("region", { name: leadershipPreview.heading });
    const card = leadership.getByRole("article", { name: presidentGeneral.name, exact: true });
    await expect(card).toBeVisible();
    await expect(card.getByText(presidentGeneral.position, { exact: true })).toBeVisible();
    const box = await card.boundingBox();
    if (!box) throw new Error("Missing President General preview layout");
    const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(box.x, "preview should start inside the viewport").toBeGreaterThanOrEqual(0);
    expect(box.x + box.width, "preview should fit inside the viewport").toBeLessThanOrEqual(viewportWidth + 1);
    if (width < 640) {
      const portrait = await card.getByRole("img").boundingBox();
      expect(portrait?.width, "the portrait should span its mobile card").toBeGreaterThanOrEqual(box.width - 2);
    }

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth - root.clientWidth;
    });
    expect(overflow, `homepage horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  });
}
