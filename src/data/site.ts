import type { SiteInfo } from "@/types/site";

export const siteInfo: SiteInfo = {
  name: "NNOKWA WOMEN ASSOCIATION",
  description:
    "A registered community-based women's development organization in Anambra State, Nigeria.",
  tagline: "Health, Training and Community Building.",
  footerDescription:
    "Working together to empower women, preserve our cultural heritage and build a healthier, stronger and more sustainable Nnokwa.",
  contact: {
    email: "contact@nnokwawomen.org",
    emailPlaceholder: "Official email address pending.",
  },
  socialLinks: [
    { platform: "YouTube", url: "https://youtube.com/@nnokwawomenassociation" },
    { platform: "Instagram", url: "https://www.instagram.com/nnokwa_women_association/" },
    { platform: "TikTok", url: "https://www.tiktok.com/@nnokwa_women" },
    { platform: "Facebook", url: "https://www.facebook.com/nnokwawomenassociation" },
  ],
};

export async function getSiteInfo(): Promise<SiteInfo> {
  return siteInfo;
}
