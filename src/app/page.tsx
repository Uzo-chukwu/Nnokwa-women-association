import type { Metadata } from "next";
import { AssociationIntro } from "@/components/home/association-intro";
import { CorePillars } from "@/components/home/core-pillars";
import { DonationSection } from "@/components/home/donation-section";
import { HomeHero } from "@/components/home/home-hero";
import { LeadershipPreview } from "@/components/home/leadership-preview";
import { NewsEventsPreview } from "@/components/home/news-events-preview";
import { OurWorkInAction } from "@/components/home/our-work-in-action";
import { SdgCommitment } from "@/components/home/sdg-commitment";
import { siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: siteInfo.name },
  description: siteInfo.description,
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <AssociationIntro />
      <CorePillars />
      <OurWorkInAction />
      <SdgCommitment />
      <LeadershipPreview />
      <NewsEventsPreview />
      <DonationSection />
    </>
  );
}
