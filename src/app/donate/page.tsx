import type { Metadata } from "next";
import { BankTransferCard } from "@/components/donations/bank-transfer-card";
import { WorkActivityCard } from "@/components/home/work-activity-card";
import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SiteLink } from "@/components/ui/site-link";
import { aboutContent } from "@/data/about";
import { donatePage } from "@/data/donations";
import { donateTransferId, routes } from "@/data/navigation";
import { focusAreas } from "@/data/our-work";
import { ourWork } from "@/data/work-activities";

export const metadata: Metadata = {
  title: donatePage.title,
  description: donatePage.introduction,
};

const container = "mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24";
const sectionHeading = "text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-foreground";

export default function DonatePage() {
  const { heading, introduction, instructions, thanks, institutionalSupport } = donatePage;

  return (
    <>
      <section aria-labelledby="donate-heading" className="bg-brand-panel text-ivory">
        <Reveal animateIfVisible className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 xl:px-12 xl:py-20">
          <span aria-hidden="true" className="mb-5 block h-px w-10 bg-gold" />
          <h1 id="donate-heading" className="text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.045em]">
            {heading}
          </h1>
          <p className="mt-5 max-w-[42rem] text-base leading-[1.75] text-ivory/90 sm:text-lg">{introduction}</p>
          <div className="mt-7">
            <ActionLink href={`#${donateTransferId}`} variant="gold">Support Our Mission</ActionLink>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="why-support-heading" className="bg-surface">
        <div className={`${container} grid items-start gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-14`}>
          <Reveal>
            <h2 id="why-support-heading" className={sectionHeading}>Why Your Support Matters</h2>
            <p className="mt-5 max-w-[32rem] text-base leading-relaxed text-foreground/85">
              Donations help the association continue its work with women and families in Nnokwa.
            </p>
          </Reveal>
          <Reveal className="border-l-2 border-gold pl-4 sm:pl-6">
            <h3 className="text-2xl font-semibold text-foreground">Our Mission</h3>
            <p className="mt-3 max-w-[43rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">{aboutContent.mission}</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="donation-priorities-heading" className="border-t border-border bg-background">
        <Reveal className={container}>
          <h2 id="donation-priorities-heading" className={sectionHeading}>What Your Support Helps Advance</h2>
          <ul role="list" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {focusAreas.map(({ id, priorityTitle, description }) => (
              <li key={id} className="border-t-2 border-gold bg-surface p-5">
                <h3 className="text-xl leading-tight font-semibold text-foreground">{priorityTitle}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/85">{description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="donation-activities-heading" className="border-t border-border bg-surface">
        <Reveal className={container}>
          <h2 id="donation-activities-heading" className={sectionHeading}>Our Community Activities</h2>
          <ul role="list" className="mt-8 grid gap-4 sm:grid-cols-4 sm:gap-5 lg:grid-cols-6">
            {ourWork.activities.map((activity, index) => (
              <WorkActivityCard key={activity.id} activity={activity} featured={index < 2} showPlaceholder={false} />
            ))}
          </ul>
        </Reveal>
      </section>

      <section id={donateTransferId} tabIndex={-1} aria-labelledby="how-to-donate-heading" className="border-y border-border bg-background focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent">
        <div className={`${container} grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14 xl:gap-20`}>
          <Reveal variant="fade-in" keepVisible>
            <h2 id="how-to-donate-heading" className={sectionHeading}>How to Donate</h2>
            <p className="mt-5 max-w-[37rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">{instructions}</p>
          </Reveal>
          <Reveal variant="fade-in" keepVisible>
            <BankTransferCard id="donate-transfer-card">
              <p className="mt-5 text-sm leading-relaxed text-foreground/85">{thanks}</p>
            </BankTransferCard>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="institutional-support-heading" className="bg-surface">
        <Reveal className={container}>
          <h2 id="institutional-support-heading" className={sectionHeading}>Institutional and Partnership Support</h2>
          <p className="mt-5 max-w-[42rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">{institutionalSupport}</p>
          <div className="mt-6">
            <ActionLink href={routes.partnerships} variant="secondary">Explore Partnership Opportunities</ActionLink>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="donation-closing-heading" className="bg-brand-panel text-ivory">
        <Reveal className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 xl:px-12">
          <h2 id="donation-closing-heading" className="text-3xl leading-tight font-semibold sm:text-4xl">Together, We Can Strengthen Our Community</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionLink href={routes.ourWork} variant="gold">Learn About Our Work</ActionLink>
            <SiteLink href={routes.partnerships} prefetch={false} className="inline-flex min-h-11 items-center rounded-sm px-2 text-sm font-semibold underline decoration-gold underline-offset-4 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              Explore Partnerships
            </SiteLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
