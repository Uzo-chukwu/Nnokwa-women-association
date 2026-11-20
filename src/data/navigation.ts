export const homeSectionIds = {
  donationDetails: "donation-bank-details",
  ourWork: "our-work-in-action-heading",
} as const;

export const homeDonationHref = `/#${homeSectionIds.donationDetails}`;
export const donateTransferId = "donate-bank-details";

export const routes = {
  home: "/",
  about: "/about",
  leadership: "/leadership",
  ourWork: "/our-work",
  news: "/news",
  partnerships: "/partnerships",
  donate: "/donate",
  contact: "/contact",
} as const;

const homeLink = { href: routes.home, label: "Home" };
const aboutLink = { href: routes.about, label: "About Us" };
const leadershipLink = { href: routes.leadership, label: "Leadership" };
const ourWorkLink = { href: routes.ourWork, label: "Our Work" };
const partnershipsLink = { href: routes.partnerships, label: "Partnerships" };
const contactLink = { href: routes.contact, label: "Contact Us" };
const workLinks = [
  ourWorkLink,
  { href: routes.news, label: "News & Events" },
  partnershipsLink,
] as const;

export const donateLink = { href: routes.donate, label: "Donate" } as const;
export const navigationLinks = [homeLink, aboutLink, ...workLinks, contactLink] as const;

export const associationLinks = [aboutLink, ourWorkLink, leadershipLink, partnershipsLink] as const;

export const footerNavigation = [
  {
    title: "Explore",
    links: [homeLink, aboutLink, leadershipLink, ...workLinks],
  },
  {
    title: "Get Involved",
    links: [donateLink, contactLink],
  },
] as const;
