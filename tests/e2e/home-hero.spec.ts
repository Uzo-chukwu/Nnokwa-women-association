import { expect, test, type Locator, type Page } from "@playwright/test";
import { homeHero } from "../../src/data/home";

const slideFiles = ["hero1_x2tuv0.jpg", "hero2_njw1sw.jpg", "hero3_i8gbxv.jpg", "hero4_fewvyi.jpg"];

async function openHero(page: Page) {
  const time = new Date("2026-11-23T09:00:00Z");
  await page.clock.install({ time });
  await page.clock.pauseAt(new Date("2026-11-23T09:01:00Z"));
  await page.route("https://res.cloudinary.com/drbd1c7ub/image/upload/**/hero*.jpg", (route) =>
    route.fulfill({
      contentType: "image/svg+xml",
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#b1a899"/></svg>',
    })
  );
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator("#homepage-entrance").dispatchEvent("animationend");
  await expect(page.locator("#site-content")).toHaveJSProperty("inert", false);

  return page.getByRole("region", { name: homeHero.headline.join(" "), exact: true });
}

function activeSlide(hero: Locator) {
  return hero.locator('[data-layer="active"]');
}

async function expectSlide(hero: Locator, file: string) {
  await expect(activeSlide(hero).locator("img")).toHaveAttribute("src", new RegExp(`/${file.replace(".", "\\.")}$`));
}

async function expectPrepared(hero: Locator, file: string) {
  const image = hero.locator(`img[src$="/${file}"]`);
  await expect(image).toBeAttached();
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
}

test("the hero starts with the highest-priority image and crossfades through the four photos in order", async ({ page }) => {
  const hero = await openHero(page);
  const first = activeSlide(hero).locator("img");
  await expectSlide(hero, slideFiles[0]);
  await expect(first).toHaveAttribute("fetchpriority", "high");
  await expect(first).toHaveAttribute("loading", "eager");
  await expect(activeSlide(hero)).toHaveCSS("transition-duration", "0.85s");

  await expectPrepared(hero, slideFiles[1]);
  await expect(hero.locator("img")).toHaveCount(2);
  await page.clock.runFor(5400);
  await expectSlide(hero, slideFiles[0]);

  const heroLayout = await hero.boundingBox();
  await page.clock.runFor(200);
  await expectSlide(hero, slideFiles[1]);
  await expect(hero.locator('[data-layer="previous"] img'))
    .toHaveAttribute("src", /\/hero1_x2tuv0\.jpg$/);

  for (const next of [slideFiles[2], slideFiles[3], slideFiles[0]]) {
    await expectPrepared(hero, next);
    await page.clock.runFor(5500);
    await expectSlide(hero, next);
  }
  expect(await hero.boundingBox()).toEqual(heroLayout);
});

test("the homepage hero stays full-width and can be paused on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 850 });
  const hero = await openHero(page);
  await expectPrepared(hero, slideFiles[1]);
  const pause = hero.getByRole("button", { name: "Pause background slideshow" });
  await pause.press("Enter");
  const resume = hero.getByRole("button", { name: "Play background slideshow" });
  await expect(resume).toBeFocused();
  await page.clock.runFor(11000);
  await expectSlide(hero, slideFiles[0]);
  expect(await hero.evaluate((element) => element.getBoundingClientRect().width)).toBe(375);
  await resume.press("Enter");
  await page.clock.runFor(5600);
  await expectSlide(hero, slideFiles[1]);
  await expect(hero.getByText(homeHero.description, { exact: true })).toBeVisible();
  for (const { href, label } of [homeHero.primaryAction, homeHero.secondaryAction]) {
    const action = hero.getByRole("link", { name: label });
    await expect(action).toBeVisible();
    await expect(action).toHaveAttribute("href", href);
  }
});

test("reduced motion keeps the first photo still and skips the other downloads", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const hero = await openHero(page);
  await expectPrepared(hero, slideFiles[0]);
  await page.clock.runFor(16500);
  await expectSlide(hero, slideFiles[0]);
  await expect(hero.locator("img")).toHaveCount(1);
  await expect(activeSlide(hero)).toHaveCSS("transition-duration", "0s");
  await expect(hero.getByRole("button")).toHaveCount(0);
});
