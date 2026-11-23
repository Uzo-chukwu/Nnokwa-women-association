import { expect, test, type Locator } from "@playwright/test";

const email = "contact@nnokwawomen.org";
const socialDestinations = {
  YouTube: "https://youtube.com/@nnokwawomenassociation",
  Instagram: "https://www.instagram.com/nnokwa_women_association/",
  TikTok: "https://www.tiktok.com/@nnokwa_women",
  Facebook: "https://www.facebook.com/nnokwawomenassociation",
};

async function expectOfficialSocialLinks(section: Locator) {
  await expect(section.getByRole("link")).toHaveCount(4);
  for (const [platform, url] of Object.entries(socialDestinations)) {
    const link = section.getByRole("link", { name: platform, exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /\bnoopener\b/);
    await expect(link).toHaveAttribute("rel", /\bnoreferrer\b/);
  }
}

test("the Contact page shows official details and links to partnership opportunities", async ({ page }) => {
  const response = await page.goto("/contact");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Contact Us | NNOKWA WOMEN ASSOCIATION");
  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { level: 1, name: "Let's Connect" })).toBeVisible();
  const information = main.getByRole("region", { name: "Contact information" });
  await expect(information.getByText("NNOKWA WOMEN ASSOCIATION", { exact: true })).toBeVisible();
  await expect(information.getByText("Nnokwa, Idemili South LGA, Anambra State, Nigeria", { exact: true })).toBeVisible();
  await expect(information.getByRole("link", { name: email, exact: true })).toHaveAttribute("href", `mailto:${email}`);

  const social = main.getByRole("region", { name: "Connect with us" });
  await expectOfficialSocialLinks(social);
  await social.getByRole("link", { name: "YouTube" }).focus();
  await page.keyboard.press("Tab");
  const instagram = social.getByRole("link", { name: "Instagram" });
  await expect(instagram).toBeFocused();
  await expect(instagram).toHaveCSS("outline-width", "2px");

  await expect(main.getByRole("region", { name: "Enquiries we welcome" }).getByRole("listitem")).toHaveCount(5);
  const more = main.getByRole("navigation", { name: "Learn more about the association" });
  for (const [name, route] of [["About Us", "/about"], ["Our Work", "/our-work"], ["Leadership", "/leadership"], ["Partnerships", "/partnerships"]]) {
    await expect(more.getByRole("link", { name, exact: true })).toHaveAttribute("href", route);
  }
  await main.getByRole("link", { name: "Explore Partnership Opportunities" }).click();
  await expect(page).toHaveURL("/partnerships");
});

test("the shared footer shows official contact details on multiple pages and both navigation menus reach Contact", async ({ page }) => {
  for (const path of ["/", "/about", "/contact"]) {
    await page.goto(path);
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: email, exact: true })).toHaveAttribute("href", `mailto:${email}`);
    await expectOfficialSocialLinks(footer.getByRole("navigation", { name: "Official social media" }));
  }

  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact Us" }).click();
  await expect(page).toHaveURL("/contact");

  await page.goto("/about");
  await page.getByRole("navigation", { name: "Footer Get Involved" }).getByRole("link", { name: "Contact Us" }).click();
  await expect(page).toHaveURL("/contact");

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact Us" }).click();
  await expect(page).toHaveURL("/contact");
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
});

test("copying the official email writes to the clipboard and announces feedback", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async (value: string) => { sessionStorage.setItem("copiedEmail", value); },
      },
    });
  });
  await page.goto("/contact");
  const contact = page.getByRole("region", { name: "Contact information" });
  await contact.getByRole("button", { name: "Copy email address" }).click();
  await expect(contact.getByRole("status")).toHaveText("Email address copied.");
  expect(await page.evaluate(() => sessionStorage.getItem("copiedEmail"))).toBe(email);
});

test("the Contact page fits mobile, tablet and desktop widths", async ({ page }) => {
  await page.goto("/contact");
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `Contact page horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    if (width >= 1024) {
      await expect(nav.getByRole("link", { name: "Contact Us" })).toBeInViewport();
    } else {
      await expect(page.getByRole("button", { name: "Open navigation" })).toBeInViewport();
    }
  }
});

test("email and social links stay readable before motion and can be focused immediately", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 375 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  const main = page.getByRole("main");
  const information = main.getByRole("region", { name: "Contact information" });
  const social = main.getByRole("region", { name: "Connect with us" });
  const socialItem = social.getByRole("listitem").last();
  for (const reveal of [information, socialItem]) {
    await expect(reveal).toHaveAttribute("data-reveal-state", "pending");
    await expect(reveal).toHaveCSS("opacity", "1");
  }
  const mail = information.getByRole("link", { name: email, exact: true });
  const facebook = socialItem.getByRole("link", { name: "Facebook", exact: true });
  await expect(mail).toHaveAttribute("href", `mailto:${email}`);
  await expect(facebook).toHaveAttribute("href", socialDestinations.Facebook);
  await mail.focus();
  await expect(mail).toBeFocused();
  await expect(information).toHaveAttribute("data-reveal-state", "shown");
  await facebook.focus();
  await expect(facebook).toBeFocused();
  await expect(socialItem).toHaveAttribute("data-reveal-state", "shown");
});
