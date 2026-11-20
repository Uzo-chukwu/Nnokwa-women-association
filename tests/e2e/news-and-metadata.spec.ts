import { expect, test, type Page } from "@playwright/test";
import { newsEntries } from "../../src/data/news-events";
import { siteInfo } from "../../src/data/site";

const metadata = {
  "/": {
    title: siteInfo.name,
    description: siteInfo.description,
  },
  "/news": {
    title: `News & Events | ${siteInfo.name}`,
    description: "News, event announcements and community updates from the Nnokwa Women Association.",
  },
};

async function expectMetadata(page: Page, path: keyof typeof metadata) {
  await expect(page).toHaveURL(path);
  await expect(page).toHaveTitle(metadata[path].title);
  await expect(page.locator("title"), `${path} has one title`).toHaveCount(1);
  const description = page.locator('meta[name="description"]');
  await expect(description, `${path} has one meta description`).toHaveCount(1);
  await expect(description).toHaveAttribute("content", metadata[path].description);
}

test("News & Events shows the empty state or published entries only", async ({ page }) => {
  const response = await page.goto("/news");
  expect(response?.status()).toBe(200);
  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { name: "News & Events", level: 1 })).toBeVisible();

  const published = newsEntries.filter((entry) => entry.status === "published");
  const empty = main.getByRole("region", { name: "Updates will be published here" });
  if (published.length === 0) {
    await expect(empty).toBeVisible();
    await expect(empty.getByText(/association news and event announcements/i)).toBeVisible();
  } else {
    await expect(empty).toHaveCount(0);
  }
  await expect(main.getByRole("article")).toHaveCount(published.length);
  for (const entry of newsEntries) {
    const heading = main.getByRole("heading", { name: entry.title, exact: true });
    if (entry.status === "published") {
      await expect(heading).toBeVisible();
    } else {
      await expect(heading).toHaveCount(0);
    }
  }

  await main.getByRole("link", { name: "Back to Home" }).click();
  await expect(page).toHaveURL("/");
});

for (const path of ["/", "/news"] as const) {
  test(`a direct load of ${path} serves its own title and one description`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expectMetadata(page, path);
  });
}

test("client navigation replaces the metadata when going to news and back", async ({ page }) => {
  await page.goto("/");
  // Allow the initial render to settle so this exercises the client router.
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((resolve) => requestIdleCallback(() => resolve()));
  });
  const initialDocument = await page.evaluate(() => performance.timeOrigin);
  await expectMetadata(page, "/");

  await page.getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "News & Events" }).click();
  await expectMetadata(page, "/news");
  expect(await page.evaluate(() => performance.timeOrigin), "opening news kept the same document")
    .toBe(initialDocument);

  await page.getByRole("main").getByRole("link", { name: "Back to Home" }).click();
  await expectMetadata(page, "/");
  expect(await page.evaluate(() => performance.timeOrigin), "returning home kept the same document")
    .toBe(initialDocument);
});

test("early navigation to news and back leaves one description per page", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "News & Events" }).click();
  await expectMetadata(page, "/news");
  await page.getByRole("main").getByRole("link", { name: "Back to Home" }).click();
  await expectMetadata(page, "/");
});
