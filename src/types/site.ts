export interface SiteInfo {
  name: string;
  description: string;
  tagline: string;
  footerDescription: string;
  contact: {
    email: string | null;
    emailPlaceholder: string;
  };
  socialLinks: readonly {
    platform: "Facebook" | "TikTok" | "Instagram" | "YouTube" | "LinkedIn";
    url: `https://${string}` | null;
  }[];
}
