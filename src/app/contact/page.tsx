import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/action-link";
import { CopyText } from "@/components/ui/copy-text";
import { SiteLink } from "@/components/ui/site-link";
import { SocialIcon } from "@/components/ui/social-icon";
import { registration } from "@/data/governance";
import { associationLinks, routes } from "@/data/navigation";
import { getSiteInfo } from "@/data/site";

const introduction =
  "We welcome enquiries from individuals, organizations, institutions and development partners who share an interest in women's empowerment, community development and the progress of Nnokwa.";

export const metadata: Metadata = {
  title: "Contact Us",
  description: introduction,
};

const enquiryCategories = [
  "General enquiries",
  "Community and membership enquiries",
  "Partnership and institutional collaboration",
  "Programme and activity enquiries",
  "Donation-related enquiries",
];

const container = "mx-auto max-w-7xl px-5 sm:px-8 xl:px-12";
const heading = "text-[clamp(2rem,4vw,3rem)] leading-[1.12] font-semibold tracking-[-0.035em]";
const textLink = "rounded-sm font-semibold text-accent underline decoration-gold underline-offset-4 hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default async function ContactPage() {
  const { name, contact, socialLinks } = await getSiteInfo();
  const officialSocialLinks = socialLinks.flatMap(({ platform, url }) => url ? [{ platform, url }] : []);

  return (
    <>
      <section aria-labelledby="contact-heading" className="border-b border-border bg-background">
        <div className={`${container} py-12 sm:py-16 xl:py-20`}>
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            <span aria-hidden="true" className="h-px w-7 bg-gold" />
            Contact Us
          </p>
          <h1 id="contact-heading" className="text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-foreground">
            Let&apos;s Connect
          </h1>
          <p className="mt-5 max-w-[44rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">{introduction}</p>
        </div>
      </section>

      <div className="bg-surface">
        <div className={`${container} grid items-start gap-10 py-12 sm:py-16 md:grid-cols-2 lg:gap-16 xl:py-20`}>
          <section aria-labelledby="contact-information-heading">
            <h2 id="contact-information-heading" className={heading}>Contact information</h2>
            <dl className="mt-6 space-y-5 border-l-2 border-gold bg-background p-5 sm:p-7">
              <div>
                <dt className="text-sm text-foreground/80">Organization</dt>
                <dd className="mt-1 font-semibold">{name}</dd>
              </div>
              <div>
                <dt className="text-sm text-foreground/80">Location</dt>
                <dd className="mt-1">{registration.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-foreground/80">Email</dt>
                <dd className="mt-1">
                  {contact.email ? (
                    <>
                      <a href={`mailto:${contact.email}`} className={`wrap-anywhere ${textLink}`}>{contact.email}</a>
                      <CopyText
                        value={contact.email}
                        label="Copy email address"
                        successMessage="Email address copied."
                        errorMessage="Copy unavailable. You can select and copy the email address above."
                      />
                    </>
                  ) : contact.emailPlaceholder}
                </dd>
              </div>
            </dl>
          </section>

          {officialSocialLinks.length > 0 && (
            <section aria-labelledby="contact-social-heading">
              <h2 id="contact-social-heading" className={heading}>Connect with us</h2>
              <ul role="list" className="mt-6 grid grid-cols-2 gap-3">
                {officialSocialLinks.map(({ platform, url }) => (
                  <li key={platform}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center gap-2 rounded-sm border border-accent/25 px-3 py-3 text-sm font-semibold text-accent hover:border-accent hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:transition-colors sm:px-4"
                    >
                      <SocialIcon platform={platform} className="size-4 shrink-0" />
                      {platform}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className={`${container} grid items-start gap-10 py-12 sm:py-16 md:grid-cols-2 lg:gap-16 xl:py-20`}>
          <section aria-labelledby="enquiry-categories-heading">
            <h2 id="enquiry-categories-heading" className={heading}>Enquiries we welcome</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed text-foreground/85 marker:text-accent">
              {enquiryCategories.map((category) => <li key={category}>{category}</li>)}
            </ul>
          </section>

          <section aria-labelledby="contact-partnership-heading" className="border-t-2 border-gold bg-gold/15 p-5 text-foreground sm:p-8">
            <h2 id="contact-partnership-heading" className={heading}>Interested in Working Together?</h2>
            <p className="mt-4 leading-relaxed text-foreground/85">
              We welcome conversations with organizations, foundations and development partners interested in supporting initiatives that advance women&apos;s empowerment and sustainable community development.
            </p>
            <div className="mt-6">
              <ActionLink href={routes.partnerships}>Explore Partnership Opportunities</ActionLink>
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-border bg-surface">
        <nav aria-labelledby="contact-explore-heading" className={`${container} py-10 sm:py-12`}>
          <h2 id="contact-explore-heading" className="text-2xl font-semibold">Learn more about the association</h2>
          <ul role="list" className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {associationLinks.map(({ href, label }) => (
              <li key={href}>
                <SiteLink href={href} prefetch={false} className={`inline-flex min-h-11 items-center ${textLink}`}>{label}</SiteLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
