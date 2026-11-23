import { routes } from "@/data/navigation";

export const homeHero = {
  headline: [
    "Empowering Women.",
    "Strengthening Communities.",
    "Preserving Our Heritage.",
  ],
  description:
    "Through education, health advocacy, cultural preservation and community development, we work towards a stronger and more sustainable Nnokwa.",
  primaryAction: { href: routes.donate, label: "Support Our Work" },
  secondaryAction: { href: routes.about, label: "Discover Our Story" },
  image: {
    publicId: process.env.NEXT_PUBLIC_CLOUDINARY_HERO_PUBLIC_ID?.trim(),
    alt: process.env.NEXT_PUBLIC_CLOUDINARY_HERO_ALT?.trim() || "Community photograph from Nnokwa",
  },
} as const;

export const homeHeroCloudName = "drbd1c7ub";

export const homeHeroSlides = [
  { publicId: "hero1_x2tuv0.jpg", position: "center 43%" },
  { publicId: "hero2_njw1sw.jpg", position: "54% bottom" },
  { publicId: "hero3_i8gbxv.jpg", position: "60% bottom" },
  { publicId: "hero4_fewvyi.jpg", position: "64% bottom" },
] as const;

export const associationIntro = {
  label: "Who we are",
  heading: "Building a stronger community through empowered women.",
  body: "The Nnokwa Women Association brings women together to advance community development, preserve our cultural heritage and create opportunities for a healthier, more empowered society. Through education, mentorship, health advocacy and collective action, we work to improve lives and build a sustainable future for Nnokwa.",
  action: homeHero.secondaryAction,
  image: {
    publicId: process.env.NEXT_PUBLIC_CLOUDINARY_INTRO_PUBLIC_ID?.trim(),
    alt: process.env.NEXT_PUBLIC_CLOUDINARY_INTRO_ALT?.trim() || "Association photograph from Nnokwa",
  },
} as const;

export const corePillars = {
  label: "What drives us",
  heading: "Our commitment is built on four pillars.",
  items: [
    {
      id: "cultural-preservation",
      heading: "Cultural Preservation",
      description: "Safeguarding our cultural heritage, traditions and shared community identity.",
    },
    {
      id: "capacity-building",
      heading: "Capacity Building",
      description: "Equipping women through skills training, mentorship, education and strategic collaboration.",
    },
    {
      id: "health-advocacy",
      heading: "Health Advocacy",
      description: "Promoting women's health rights and supporting access to healthcare and wellness education.",
    },
    {
      id: "community-development",
      heading: "Community Development",
      description: "Working collectively to address poverty, hunger and other basic community needs.",
    },
  ],
} as const;
