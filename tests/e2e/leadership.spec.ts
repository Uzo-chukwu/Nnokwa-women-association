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
  await page.emulateMedia({ reducedMotion: "reduce" });
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
    await expect(image).toHaveCSS("object-fit", "cover");
    await expect(image).toHaveCSS("object-position", "50% 0%");
    for (const paragraph of biography) {
      await expect(profile.getByText(paragraph, { exact: true })).toBeVisible();
    }
  }

  for (const width of [320, 360, 375, 390, 430, 640, 768, 1024, 1440]) {
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
      expect(image.width / image.height, `${name}'s portrait keeps its aspect ratio at ${width}px`).toBeCloseTo(4 / 5);
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

for (const width of [320, 360, 375, 390, 430]) {
  test(`the Leadership introduction and profiles reveal without layout shifts at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 750 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/leadership", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const intro = page.getByRole("region", { name: "Our Leadership", exact: true });
    const heading = intro.locator('[data-reveal="fade-up"]').first();
    const feature = intro.locator('[data-reveal="fade-up"]').filter({
      has: page.getByRole("article", { name: presidentGeneral.name, exact: true }),
    });
    const portrait = feature.locator('[data-reveal="scale"]');
    for (const element of [heading, feature, portrait]) {
      await expect(element).toHaveAttribute("data-reveal-state", "shown");
    }
    await expect(feature).toHaveCSS("transform", "none");
    await expect(portrait).toHaveCSS("transform", "none");

    const team = page.getByRole("region", { name: "Executive Leadership" });
    const teamHeading = team.locator('[data-reveal="fade-up"]').first();
    await teamHeading.scrollIntoViewIfNeeded();
    await expect(teamHeading).toHaveAttribute("data-reveal-state", "shown");
    const cards = team.getByRole("listitem");
    await expect(cards).toHaveCount(7);
    const originalLayout = await cards.evaluateAll((elements) => elements.map(
      (card) => [(card as HTMLElement).offsetTop, (card as HTMLElement).offsetHeight],
    ));
    for (const card of await cards.all()) {
      await card.evaluate((element) => element.scrollIntoView({ block: "center" }));
      await expect(card).toHaveAttribute("data-reveal-state", "shown");
    }
    const finalLayout = await cards.evaluateAll((elements) => elements.map(
      (card) => [(card as HTMLElement).offsetTop, (card as HTMLElement).offsetHeight],
    ));
    expect(finalLayout).toEqual(originalLayout);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  });
}

test("Leadership profiles use short mobile stagger delays and reveal immediately on focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 650 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/leadership", { waitUntil: "domcontentloaded" });
  const cards = page.getByRole("region", { name: "Executive Leadership" }).getByRole("listitem");
  const first = cards.first();
  await expect(first).toHaveAttribute("data-reveal-state", "pending");
  const article = first.getByRole("article");
  await article.evaluate((element: HTMLElement) => {
    element.tabIndex = -1;
    element.focus();
  });
  await expect(article).toBeFocused();
  await expect(first).toHaveAttribute("data-reveal-state", "shown");
  await expect(first).toHaveCSS("opacity", "1");

  const last = cards.last();
  await expect(last).toHaveAttribute("data-reveal-state", "pending");
  const delay = await last.evaluate((element) => new Promise<number>((resolve) => {
    element.addEventListener("animationstart", () => {
      const animation = element.getAnimations().find(
        (item) => item instanceof CSSAnimation && item.animationName === "scroll-reveal",
      );
      resolve(Number(animation?.effect?.getTiming().delay));
    }, { once: true });
    element.scrollIntoView({ block: "center" });
  }));
  expect(delay).toBeCloseTo(88);
  await expect(last).toHaveAttribute("data-reveal-state", "shown");
});

test("the Leadership page is readable with reduced motion and without JavaScript", async ({ page, browser, baseURL }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/leadership", { waitUntil: "domcontentloaded" });
  const reveals = await page.locator("[data-reveal]").evaluateAll((elements) => elements.map((element) => {
    const { opacity, animationName } = getComputedStyle(element);
    return { opacity, animationName };
  }));
  expect(reveals).toHaveLength(11);
  expect(reveals.every(({ opacity, animationName }) => opacity === "1" && animationName === "none")).toBe(true);

  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const staticPage = await context.newPage();
    await staticPage.goto("/leadership");
    const profiles = staticPage.getByRole("main").getByRole("article");
    await expect(profiles).toHaveCount(8);
    await expect(profiles.first().getByRole("heading", { name: presidentGeneral.name })).toBeVisible();
    const contentVisible = await staticPage.locator("[data-reveal]").evaluateAll((elements) =>
      elements.every((element) => getComputedStyle(element).opacity === "1")
    );
    expect(contentVisible).toBe(true);
  } finally {
    await context.close();
  }
});
