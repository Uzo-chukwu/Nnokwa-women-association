import { expect, test, type Locator, type Page } from "@playwright/test";
import { aboutContent } from "../../src/data/about";
import { registration } from "../../src/data/governance";
import { focusAreas } from "../../src/data/our-work";
import { partnershipEnquiriesId, partnershipsPage } from "../../src/data/partnerships";
import { sdgCommitment } from "../../src/data/sdg-commitment";
import { siteInfo } from "../../src/data/site";
import { ourWork } from "../../src/data/work-activities";

const driveUrl = "https://drive.google.com/file/d/1M2fSPlyiSS_XP6MYXcIMLQaKhKFpIR4b/view?usp=drivesdk";

async function expectConstitutionLink(section: Locator) {
  const link = section.getByRole("link", { name: "View Our Constitution", exact: true });
  await expect(link).toHaveAttribute("href", driveUrl);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /\bnoopener\b/);
  await expect(link).toHaveAttribute("rel", /\bnoreferrer\b/);
}

async function expectResponsive(page: Page) {
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${new URL(page.url()).pathname} horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
}

test("About presents the verified CAC details, a redacted certificate and the constitution", async ({ page, request }) => {
  const response = await page.goto("/about");
  expect(response?.status()).toBe(200);
  const legal = page.getByRole("region", { name: "Legal Status & Governance" });
  await expect(legal.getByText("NNOKWA WOMEN ASSOCIATION", { exact: true })).toBeVisible();
  await expect(legal.getByText("9686878", { exact: true })).toBeVisible();
  await expect(legal.getByText("16 July 2026", { exact: true })).toBeVisible();
  await expect(legal.getByText(/Corporate Affairs Commission \(CAC\), Nigeria/)).toBeVisible();

  const preview = legal.getByRole("img", { name: registration.certificate.alt });
  await preview.scrollIntoViewIfNeeded();
  await expect.poll(() => preview.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

  const full = legal.getByRole("link", { name: "View Full Certificate" });
  await expect(full).toHaveAttribute("href", registration.certificate.url);
  await expect(full).toHaveAttribute("target", "_blank");
  const imageResponse = await request.get(registration.certificate.url);
  expect(imageResponse.status()).toBe(200);
  expect(imageResponse.headers()["content-type"]).toMatch(/^image\//);
  await expectConstitutionLink(legal);
  await expectResponsive(page);
});

test("Partnerships shows shared content, potential opportunities and an enquiries destination", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Partnerships" }).click();
  await expect(page).toHaveURL("/partnerships");
  await expect(page).toHaveTitle(`Partnerships | ${siteInfo.name}`);
  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { level: 1, name: partnershipsPage.heading })).toBeVisible();
  const profile = main.getByRole("region", { name: "About the Association" });
  await expect(profile.getByText(aboutContent.mission, { exact: true })).toBeVisible();
  for (const value of [registration.name, registration.location, "9686878"]) {
    await expect(profile.getByText(value, { exact: true })).toBeVisible();
  }

  const priorities = main.getByRole("region", { name: "Development Priorities" });
  await expect(priorities.getByRole("listitem")).toHaveCount(5);
  for (const { description } of focusAreas) {
    await expect(priorities.getByText(description, { exact: true })).toBeVisible();
  }
  const alignment = main.getByRole("region", { name: "Our SDG Alignment" });
  for (const { number, title } of sdgCommitment.goals) {
    await expect(alignment.getByRole("heading", { name: `SDG ${number} ${title}`, exact: true })).toBeVisible();
  }
  const opportunities = main.getByRole("region", { name: "Partnership Opportunities" });
  await expect(opportunities.getByRole("listitem")).toHaveCount(8);
  const activities = main.getByRole("region", { name: "Community Activities and Experience" });
  await expect(activities.getByRole("listitem")).toHaveCount(5);
  for (const { heading } of ourWork.activities) {
    await expect(activities.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }

  const governance = main.getByRole("region", { name: "Governance and Accountability" });
  await expectConstitutionLink(governance);
  await expect(governance.getByRole("link", { name: "Meet the Executive Team" })).toHaveAttribute("href", "/leadership");
  await expect(governance.getByRole("link", { name: "View Registration Details" }))
    .toHaveAttribute("href", "/about#legal-status-and-governance");
  const enquiries = main.getByRole("region", { name: partnershipsPage.enquiries.heading });
  if (siteInfo.contact.email) {
    await expect(enquiries.getByRole("link", { name: siteInfo.contact.email }))
      .toHaveAttribute("href", `mailto:${siteInfo.contact.email}`);
  } else {
    await expect(enquiries.getByText(partnershipsPage.enquiries.pendingContact, { exact: true })).toBeVisible();
    await expect(enquiries.getByRole("link")).toHaveCount(0);
  }

  await main.getByRole("link", { name: "Partnership Enquiries" }).click();
  await expect(page).toHaveURL(`/partnerships#${partnershipEnquiriesId}`);
  await expect(enquiries).toBeInViewport();
  await expectResponsive(page);
  await page.getByRole("navigation", { name: "Footer Explore" }).getByRole("link", { name: "Partnerships" }).click();
  await expect(page).toHaveURL("/partnerships");

  await governance.getByRole("link", { name: "Meet the Executive Team" }).click();
  await expect(page).toHaveURL("/leadership");
  await expect(main.getByRole("heading", { level: 1, name: "Our Leadership" })).toBeVisible();

  await page.goto("/partnerships");
  await governance.getByRole("link", { name: "View Registration Details" }).click();
  await expect(page).toHaveURL("/about#legal-status-and-governance");
  await expect(main.getByRole("heading", { name: "Legal Status & Governance" })).toBeInViewport();
});
