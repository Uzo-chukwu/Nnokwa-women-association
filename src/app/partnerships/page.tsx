import type { Metadata } from "next";
import { ConstitutionCard } from "@/components/governance/constitution-card";
import { SdgCommitment } from "@/components/home/sdg-commitment";
import { WorkActivityCard } from "@/components/home/work-activity-card";
import { ActionLink } from "@/components/ui/action-link";
import { aboutContent } from "@/data/about";
import { legalStatusId, registration } from "@/data/governance";
import { routes } from "@/data/navigation";
import { focusAreas } from "@/data/our-work";
import { partnershipEnquiriesId, partnershipsPage } from "@/data/partnerships";
import { siteInfo } from "@/data/site";
import { ourWork } from "@/data/work-activities";

export const metadata: Metadata = {
  title: partnershipsPage.title,
  description: partnershipsPage.introduction[0],
};

const container = "mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24";
const sectionHeading = "text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-foreground";

export default function PartnershipsPage() {
  const { title, heading, introduction, opportunities, sdgIntroduction, governance, enquiries } = partnershipsPage;
  const { email } = siteInfo.contact;

  return (
    <>
      <section aria-labelledby="partnerships-heading" className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 xl:px-12 xl:py-20">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            <span aria-hidden="true" className="h-px w-7 bg-gold" />
            {title}
          </p>
          <h1 id="partnerships-heading" className="max-w-[50rem] text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-foreground">
            {heading}
          </h1>
          <div className="mt-5 max-w-[44rem] space-y-4 text-base leading-[1.75] text-foreground/85 sm:text-lg">
            {introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-7">
            <ActionLink href={`#${partnershipEnquiriesId}`}>Partnership Enquiries</ActionLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="partnership-profile-heading" className="bg-surface">
        <div className={`${container} grid items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14`}>
          <div>
            <h2 id="partnership-profile-heading" className={sectionHeading}>About the Association</h2>
            <p className="mt-5 max-w-[42rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">{aboutContent.purpose}</p>
            <h3 className="mt-7 text-2xl font-semibold text-foreground">Our Mission</h3>
            <p className="mt-3 max-w-[42rem] text-base leading-[1.75] text-foreground/85">{aboutContent.mission}</p>
          </div>
          <dl className="space-y-5 border-l-2 border-gold bg-background p-5 sm:p-7">
            <div>
              <dt className="text-sm text-foreground/80">Registered name</dt>
              <dd className="mt-1 font-semibold text-foreground">{registration.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-foreground/80">Location</dt>
              <dd className="mt-1 font-semibold text-foreground">{registration.location}</dd>
            </div>
            <div>
              <dt className="text-sm text-foreground/80">CAC registration number</dt>
              <dd className="mt-1 font-semibold text-foreground">{registration.number}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="partnership-priorities-heading" className="border-t border-border bg-background">
        <div className={container}>
          <h2 id="partnership-priorities-heading" className={sectionHeading}>Development Priorities</h2>
          <ul role="list" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {focusAreas.map(({ id, priorityTitle, description }) => (
              <li key={id} className="border-t-2 border-gold bg-surface p-5">
                <h3 className="text-xl leading-tight font-semibold text-foreground">{priorityTitle}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/85">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SdgCommitment heading="Our SDG Alignment" description={sdgIntroduction} />

      <section aria-labelledby="partnership-opportunities-heading" className="border-t border-border bg-surface">
        <div className={`${container} grid items-start gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-14`}>
          <div>
            <h2 id="partnership-opportunities-heading" className={sectionHeading}>Partnership Opportunities</h2>
            <p className="mt-5 max-w-[31rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">
              We welcome potential collaboration in these areas.
            </p>
          </div>
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {opportunities.map((opportunity) => (
              <li key={opportunity} className="bg-background px-5 py-4 text-base leading-relaxed text-foreground">
                {opportunity}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="partnership-activities-heading" className="border-t border-border bg-background">
        <div className={container}>
          <h2 id="partnership-activities-heading" className={sectionHeading}>Community Activities and Experience</h2>
          <ul role="list" className="mt-8 grid gap-4 sm:grid-cols-4 sm:gap-5 lg:grid-cols-6">
            {ourWork.activities.map((activity, index) => (
              <WorkActivityCard key={activity.id} activity={activity} featured={index < 2} showPlaceholder={false} />
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="partnership-governance-heading" className="border-t border-border bg-surface">
        <div className={`${container} grid items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14`}>
          <div>
            <h2 id="partnership-governance-heading" className={sectionHeading}>Governance and Accountability</h2>
            <p className="mt-5 max-w-[37rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">{governance}</p>
            <p className="mt-4 max-w-[37rem] text-base leading-relaxed text-foreground/85">
              The association is registered with the {registration.authority} under registration number {registration.number}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ActionLink href={routes.leadership} variant="secondary">Meet the Executive Team</ActionLink>
              <ActionLink href={`${routes.about}#${legalStatusId}`} variant="secondary">View Registration Details</ActionLink>
            </div>
          </div>
          <ConstitutionCard />
        </div>
      </section>

      <section id={partnershipEnquiriesId} tabIndex={-1} aria-labelledby="partnership-enquiries-heading" className="scroll-mt-5 bg-brand-panel text-ivory">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 xl:px-12">
          <h2 id="partnership-enquiries-heading" className="text-3xl leading-tight font-semibold sm:text-4xl">{enquiries.heading}</h2>
          <p className="mt-4 max-w-[42rem] text-base leading-[1.75] text-ivory/90 sm:text-lg">{enquiries.description}</p>
          {email ? (
            <a href={`mailto:${email}`} className="mt-6 inline-block min-h-11 rounded-sm py-2 font-semibold wrap-anywhere text-gold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              {email}
            </a>
          ) : (
            <p className="mt-6 border-l-2 border-gold pl-4 text-sm font-semibold text-gold">{enquiries.pendingContact}</p>
          )}
        </div>
      </section>
    </>
  );
}
