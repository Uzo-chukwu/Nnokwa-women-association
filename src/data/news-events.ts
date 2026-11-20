import { routes } from "@/data/navigation";

type NewsEntryContent = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image?: { publicId: string; alt: string };
};

export type NewsEntry = NewsEntryContent & (
  | { status: "placeholder" }
  | {
      status: "published";
      href: `/${string}`;
      date?: { kind: "publication" | "event"; iso: string };
    }
);

export const newsEventsPreview = {
  label: "Stories from our community",
  heading: "Stay connected with our work.",
  description:
    "Explore updates, activities and stories from the Nnokwa Women Association as we continue working towards a healthier, stronger and more empowered community.",
  action: { href: routes.news, label: "View All Updates" },
} as const;

export const newsEntries: readonly NewsEntry[] = [
  {
    id: "sample-community-news",
    status: "placeholder",
    category: "News",
    title: "Community News",
    excerpt: "News and stories from the Nnokwa community will appear here.",
  },
  {
    id: "sample-association-updates",
    status: "placeholder",
    category: "Updates",
    title: "Association Updates",
    excerpt: "Announcements and updates from the association will be shared here.",
  },
  {
    id: "sample-upcoming-events",
    status: "placeholder",
    category: "Events",
    title: "Upcoming Events",
    excerpt: "Details of community events will be posted here once confirmed.",
  },
];
