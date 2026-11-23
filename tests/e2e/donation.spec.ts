import { expect, test, type Page } from "@playwright/test";
import { aboutContent } from "../../src/data/about";
import { donatePage } from "../../src/data/donations";
import { focusAreas } from "../../src/data/our-work";
import { siteInfo } from "../../src/data/site";
import { ourWork } from "../../src/data/work-activities";

const donationAnchor = "/donate#donate-bank-details";

function transferDetails(page: Page) {
  return page.getByRole("region", { name: "Bank transfer details" });
}

async function mockClipboard(page: Page, denyWrite = false) {
  await page.addInitScript((denied) => {
    let copiedText = "";
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        async writeText(value: string) {
          if (denied) throw new DOMException("Clipboard denied by test", "NotAllowedError");
          copiedText = value;
        },
        async readText() {
          return copiedText;
        },
      },
    });
  }, denyWrite);
}

test("global and homepage donation links open Donate and bank details are absent from Home", async ({ page }) => {
  await page.goto("/news");
  await page.getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Donate", exact: true }).click();
  await expect(page).toHaveURL("/donate");
  await expect(page.getByRole("heading", { level: 1, name: donatePage.heading })).toBeVisible();

  await page.goto("/news");
  await page.getByRole("navigation", { name: "Footer Get Involved" })
    .getByRole("link", { name: "Donate", exact: true }).click();
  await expect(page).toHaveURL("/donate");

  for (const name of ["Support Our Work", "Make a Donation"]) {
    await page.goto("/");
    await expect(transferDetails(page)).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Copy account number" })).toHaveCount(0);
    await page.getByRole("main").getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL("/donate");
    await expect(page.getByRole("heading", { level: 1, name: donatePage.heading })).toBeVisible();
  }
});

test("the Donate copy button copies the confirmed number and announces success", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 650 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await mockClipboard(page);
  await page.goto("/donate");
  const details = transferDetails(page);
  const reveal = page.locator("[data-reveal-readable]").filter({ has: details });
  await expect(reveal).toHaveAttribute("data-reveal-state", "pending");
  await expect(reveal).toHaveCSS("opacity", "1");
  const copy = details.getByRole("button", { name: "Copy account number" });
  const value = details.locator("dd").filter({ has: page.getByRole("button", { name: "Copy account number" }) })
    .locator(":scope > span");
  const displayedNumber = (await value.innerText()).trim();
  expect(displayedNumber).toBe("2439636465");
  await copy.press("Enter");
  await expect(copy).toBeFocused();
  await expect(copy).toHaveAttribute("data-copy-result", "success");
  await expect(reveal).toHaveAttribute("data-reveal-state", "shown");
  const feedback = details.getByRole("status");
  await expect(feedback).toHaveAttribute("aria-atomic", "true");
  await expect(feedback).toHaveText("Account number copied.");
  const copiedNumber = await page.evaluate(() => navigator.clipboard.readText());
  expect(copiedNumber === displayedNumber, "mock clipboard matches the displayed value").toBe(true);
});

test("the Donate page shows the confirmed transfer details and fits all requested widths", async ({ page }) => {
  const response = await page.goto("/donate");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(`Donate | ${siteInfo.name}`);
  await expect(page.getByRole("heading", { name: "Be Part of the Change", level: 1 })).toBeVisible();
  const main = page.getByRole("main");
  await expect(main.getByRole("region", { name: "Why Your Support Matters" })
    .getByText(aboutContent.mission, { exact: true })).toBeVisible();
  const priorities = main.getByRole("region", { name: "What Your Support Helps Advance" });
  await expect(priorities.getByRole("listitem")).toHaveCount(5);
  for (const { priorityTitle } of focusAreas) {
    await expect(priorities.getByRole("heading", { name: priorityTitle, exact: true })).toBeVisible();
  }
  const activities = main.getByRole("region", { name: "Our Community Activities" });
  await expect(activities.getByRole("listitem")).toHaveCount(5);
  for (const { heading } of ourWork.activities) {
    await expect(activities.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }
  const details = transferDetails(page);
  const howToDonate = main.getByRole("region", { name: "How to Donate" });
  await expect(howToDonate.getByText(donatePage.instructions, { exact: true })).toBeVisible();
  await expect(details.getByText(donatePage.thanks, { exact: true })).toBeVisible();
  for (const value of ["United Bank for Africa (UBA)", "NNOKWA WOMEN ASSOCIATION", "2439636465"]) {
    await expect(details.getByText(value, { exact: true })).toBeVisible();
  }
  await main.getByRole("link", { name: "Support Our Mission" }).click();
  await expect(page).toHaveURL(donationAnchor);
  await expect(howToDonate.getByText(donatePage.instructions, { exact: true })).toBeInViewport();
  await expect(details).toBeInViewport();

  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `Donate page horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});

test("the institutional and closing calls to action reach Partnerships and Our Work", async ({ page }) => {
  for (const { name, destination } of [
    { name: "Explore Partnership Opportunities", destination: "/partnerships" },
    { name: "Learn About Our Work", destination: "/our-work" },
    { name: "Explore Partnerships", destination: "/partnerships" },
  ]) {
    await page.goto("/donate");
    await page.getByRole("main").getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(destination);
  }
});

test("a denied clipboard write announces the manual-copy fallback", async ({ page }) => {
  await mockClipboard(page, true);
  await page.goto(donationAnchor);
  const details = transferDetails(page);
  const copy = details.getByRole("button", { name: "Copy account number" });
  await copy.click();
  await expect(copy).toHaveAttribute("data-copy-result", "error");
  await expect(details.getByRole("status")).toHaveText(/copy unavailable.*select and copy/i);
});
