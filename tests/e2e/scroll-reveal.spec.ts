import { expect, test, type Page } from "@playwright/test";
import { associationIntro, corePillars } from "../../src/data/home";
import { leadershipPreview } from "../../src/data/leadership";
import { newsEntries, newsEventsPreview } from "../../src/data/news-events";
import { sdgCommitment } from "../../src/data/sdg-commitment";
import { ourWork } from "../../src/data/work-activities";

const additionalSections = [
  { heading: ourWork.heading, reveals: 1 + ourWork.activities.length },
  { heading: sdgCommitment.heading, reveals: 1 + sdgCommitment.goals.length },
  { heading: leadershipPreview.heading, reveals: 2 },
  { heading: newsEventsPreview.heading, reveals: 1 + newsEntries.length },
  { heading: "Be part of the change we are building.", reveals: 1 },
];

async function openHomepage(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  // The entrance animation has its own browser tests.
  await page.locator("#homepage-entrance").dispatchEvent("animationend");
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
}

test("the introduction reveals once without moving the surrounding layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 475 });
  await openHomepage(page);
  const intro = page.getByRole("region", { name: associationIntro.heading });
  const copy = intro.locator('[data-reveal="fade-up"]');
  const photo = intro.locator('[data-reveal="scale"]');
  await expect(copy).toHaveAttribute("data-reveal-state", "pending");
  await expect(photo).toHaveAttribute("data-reveal-state", "pending");
  await expect(copy).toHaveCSS("opacity", "0");

  await copy.evaluate((element) => {
    element.addEventListener("animationstart", () => {
      element.setAttribute("data-test-animation-count", String(Number(element.getAttribute("data-test-animation-count")) + 1));
    });
  });
  const initialLayout = await copy.evaluate((element: HTMLElement) => [element.offsetTop, element.offsetHeight]);
  await copy.scrollIntoViewIfNeeded();
  await expect(copy).toHaveAttribute("data-reveal-state", "shown");
  expect(await copy.evaluate((element: HTMLElement) => [element.offsetTop, element.offsetHeight])).toEqual(initialLayout);

  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute("data-reveal-state", "shown");
  await page.evaluate(() => window.scrollTo(0, 0));
  await copy.scrollIntoViewIfNeeded();
  await expect(copy).toHaveCSS("opacity", "1");
  await expect(copy).toHaveAttribute("data-test-animation-count", "1");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});

test("the pillar heading fades in and the cards use short ordered delays", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 625 });
  await openHomepage(page);
  const pillars = page.getByRole("region", { name: corePillars.heading });
  const heading = pillars.locator('[data-reveal="fade-in"]');
  const cards = pillars.getByRole("listitem");
  await expect(heading).toHaveAttribute("data-reveal-state", "pending");
  await expect(cards.first()).toHaveAttribute("data-reveal-state", "pending");

  await expect(cards).toHaveCount(4);
  const delays = await cards.evaluateAll((nodes) => nodes.map((card) => {
    const delay = getComputedStyle(card).getPropertyValue("--reveal-delay").trim();
    return Number.parseFloat(delay) * (delay.endsWith("ms") ? 1 : 1000);
  }));
  expect(delays).toEqual([0, 55, 110, 165]);

  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveAttribute("data-reveal-state", "shown");
  await cards.last().scrollIntoViewIfNeeded();
  await expect(pillars.locator('[data-reveal-state="shown"]')).toHaveCount(5);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
});

test("keyboard focus reveals the introduction link immediately", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 475 });
  await openHomepage(page);
  const intro = page.getByRole("region", { name: associationIntro.heading });
  const copy = intro.locator('[data-reveal="fade-up"]');
  await expect(copy).toHaveAttribute("data-reveal-state", "pending");
  const link = intro.getByRole("link", { name: associationIntro.action.label });
  await link.focus();
  await expect(link).toBeFocused();
  await expect(copy).toHaveAttribute("data-reveal-state", "shown");
  await expect(copy).toHaveCSS("opacity", "1");
});

for (const width of [320, 360, 375, 390, 430]) {
  test(`every new homepage reveal becomes visible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 650 });
    await openHomepage(page);

    for (const { heading, reveals } of additionalSections) {
      const section = page.getByRole("region", { name: heading, exact: true });
      const blocks = section.locator("[data-reveal]");
      await expect(blocks).toHaveCount(reveals);
      for (const block of await blocks.all()) {
        await block.evaluate((element) => element.scrollIntoView({ block: "center" }));
        await expect(block).toHaveCSS("opacity", "1");
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth), heading).toBe(width);
    }
  });
}

test("a late activity card uses a shorter stagger on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 650 });
  await openHomepage(page);
  const activity = page.getByRole("region", { name: ourWork.heading }).getByRole("listitem").last();
  await expect(activity).toHaveAttribute("data-reveal-state", "pending");
  const timing = await activity.evaluate((element) => new Promise<{ delay: number; duration: number }>((resolve) => {
    element.addEventListener("animationstart", () => {
      const animation = element.getAnimations().find(
        (item) => item instanceof CSSAnimation && item.animationName === "scroll-reveal",
      );
      const timing = animation?.effect?.getTiming();
      resolve({ delay: Number(timing?.delay), duration: Number(timing?.duration) });
    }, { once: true });
    element.scrollIntoView({ block: "center" });
  }));
  expect(timing.delay).toBeCloseTo(88);
  expect(timing.duration).toBe(520);
});

test("reduced motion keeps every revealed section visible without animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const reveals = page.getByRole("main").locator("[data-reveal]");
  const styles = await reveals.evaluateAll((elements) => elements.map((element) => {
    const { opacity, animationName } = getComputedStyle(element);
    return { opacity, animationName };
  }));
  expect(styles).toHaveLength(7 + additionalSections.reduce((total, section) => total + section.reveals, 0));
  expect(styles.every(({ opacity, animationName }) => opacity === "1" && animationName === "none")).toBe(true);
});

test("the homepage content is readable with JavaScript disabled", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("/");
    const intro = page.getByRole("region", { name: associationIntro.heading });
    await expect(intro.locator("[data-reveal]").first()).toHaveCSS("opacity", "1");
    await expect(intro.getByRole("link", { name: associationIntro.action.label })).toBeVisible();
    const pillars = page.getByRole("region", { name: corePillars.heading });
    await expect(pillars.getByRole("listitem")).toHaveCount(4);
    await expect(pillars.getByRole("listitem").last()).toHaveCSS("opacity", "1");
    const reveals = page.getByRole("main").locator("[data-reveal]");
    expect(await reveals.evaluateAll((elements) => elements.every(
      (element) => getComputedStyle(element).opacity === "1",
    ))).toBe(true);
  } finally {
    await context.close();
  }
});
