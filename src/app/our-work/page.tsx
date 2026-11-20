import type { Metadata } from "next";
import { SdgCommitment } from "@/components/home/sdg-commitment";
import { WorkActivityCard } from "@/components/home/work-activity-card";
import { ActionLink } from "@/components/ui/action-link";
import { focusAreas, ourWorkPage } from "@/data/our-work";
import { ourWork } from "@/data/work-activities";

export const metadata: Metadata = {
  title: ourWorkPage.title,
  description: ourWorkPage.introduction,
};

const headingClass = "text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-charcoal";

export default function OurWorkPage() {
  const { title, introduction, sdgIntroduction, support } = ourWorkPage;

  return (
    <>
      <section aria-labelledby="our-work-heading" className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 xl:px-12 xl:py-20">
          <span aria-hidden="true" className="mb-5 block h-px w-10 bg-gold" />
          <h1 id="our-work-heading" className="text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-charcoal">
            {title}
          </h1>
          <p className="mt-5 max-w-[40rem] text-base leading-[1.75] text-charcoal/85 sm:text-lg">{introduction}</p>
        </div>
      </section>

      <section aria-labelledby="focus-areas-heading" className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_2fr] xl:gap-16 xl:px-12 xl:py-24">
          <h2 id="focus-areas-heading" className={headingClass}>Our Focus Areas</h2>
          <ul role="list" className="divide-y divide-border border-y border-border">
            {focusAreas.map(({ id, title, description, goal }) => (
              <li key={id} className="py-5">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-xl leading-tight font-semibold text-purple sm:text-2xl">{title}</h3>
                  <span className="text-xs font-semibold tracking-wider text-purple">SDG {goal}</span>
                </div>
                <p className="mt-2 text-base leading-relaxed text-charcoal/85">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="community-activities-heading" className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
          <h2 id="community-activities-heading" className={headingClass}>Our Community Activities</h2>
          <ul role="list" className="mt-8 grid gap-4 sm:grid-cols-4 sm:gap-5 lg:grid-cols-6">
            {ourWork.activities.map((activity, index) => (
              <WorkActivityCard key={activity.id} activity={activity} featured={index < 2} showPlaceholder={false} />
            ))}
          </ul>
        </div>
      </section>

      <SdgCommitment heading="Our SDG Commitment" description={sdgIntroduction} />

      <section aria-labelledby="support-our-work-heading" className="bg-purple text-ivory">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between xl:px-12">
          <div>
            <h2 id="support-our-work-heading" className="font-serif text-3xl leading-tight font-semibold sm:text-4xl">
              {support.heading}
            </h2>
            <p className="mt-3 max-w-[36rem] text-base leading-relaxed text-ivory/90">{support.description}</p>
          </div>
          <ActionLink href={support.action.href} variant="gold">{support.action.label}</ActionLink>
        </div>
      </section>
    </>
  );
}
