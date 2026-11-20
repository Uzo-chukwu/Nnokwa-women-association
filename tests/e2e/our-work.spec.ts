import { expect, test } from "@playwright/test";
import { focusAreas, ourWorkPage } from "../../src/data/our-work";
import { sdgCommitment } from "../../src/data/sdg-commitment";
import { siteInfo } from "../../src/data/site";
import { ourWork } from "../../src/data/work-activities";

test("desktop and footer navigation open Our Work and its donation link opens Donate", async ({ page }) => {
  for (const group of ["Main navigation", "Footer Explore"]) {
    await page.goto("/");
    await page.getByRole("navigation", { name: group }).getByRole("link", { name: "Our Work", exact: true }).click();
    await expect(page).toHaveURL("/our-work");
    await expect(page.getByRole("heading", { name: "Our Work", level: 1 })).toBeVisible();
  }

  const support = page.getByRole("region", { name: "Support our work" });
  const donate = support.getByRole("link", { name: "Make a Donation" });
  await expect(donate).toHaveAttribute("href", "/donate");
  await donate.click();
  await expect(page).toHaveURL("/donate");
  await expect(page.getByRole("region", { name: "Bank transfer details" })).toBeVisible();
});

test("Our Work shows all focus areas, activities and goals and fits all requested widths", async ({ page }) => {
  const response = await page.goto("/our-work");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(`Our Work | ${siteInfo.name}`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", ourWorkPage.introduction);
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const main = page.getByRole("main");
  const focus = main.getByRole("region", { name: "Our Focus Areas" });
  const activities = main.getByRole("region", { name: "Our Community Activities" });
  const sdgs = main.getByRole("region", { name: "Our SDG Commitment" });

  await expect(focus.getByRole("listitem")).toHaveCount(5);
  for (const { title, description, goal } of focusAreas) {
    const area = focus.getByRole("listitem").filter({ has: page.getByRole("heading", { name: title, exact: true }) });
    await expect(area.getByText(description, { exact: true })).toBeVisible();
    await expect(area.getByText(`SDG ${goal}`, { exact: true })).toBeVisible();
  }

  await expect(activities.getByRole("listitem")).toHaveCount(5);
  for (const { heading, description } of ourWork.activities) {
    const activity = activities.getByRole("listitem").filter({ has: page.getByRole("heading", { name: heading, exact: true }) });
    await expect(activity.getByText(description, { exact: true })).toBeVisible();
  }
  await expect(activities.getByText("Photograph placeholder", { exact: true })).toHaveCount(0);

  await expect(sdgs.getByRole("listitem")).toHaveCount(5);
  for (const { number, title } of sdgCommitment.goals) {
    await expect(sdgs.getByRole("heading", { name: `SDG ${number} ${title}`, exact: true })).toBeVisible();
  }

  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `Our Work horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});
