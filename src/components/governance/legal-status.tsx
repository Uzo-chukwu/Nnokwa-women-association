import Image from "next/image";
import { ConstitutionCard } from "@/components/governance/constitution-card";
import { DocumentLink } from "@/components/governance/document-link";
import { legalStatusId, registration } from "@/data/governance";

export function LegalStatus() {
  const { name, number, authority, date, isoDate, certificate } = registration;

  return (
    <section aria-labelledby={legalStatusId} className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
        <h2 id={legalStatusId} className="scroll-mt-5 text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-charcoal">
          Legal Status &amp; Governance
        </h2>
        <div className="mt-8 grid items-start gap-5 md:grid-cols-[1.2fr_1fr] xl:gap-8">
          <div className="grid gap-5">
            <div className="border border-border bg-surface p-5 sm:p-7">
              <h3 className="text-2xl leading-tight font-semibold text-purple">CAC Registration</h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal/85">
                The association is registered with the {authority}.
              </p>
              <dl className="mt-5 space-y-4 border-t border-border pt-5 text-base">
                <div>
                  <dt className="text-sm text-charcoal/80">Registered name</dt>
                  <dd className="mt-1 font-semibold text-charcoal">{name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-charcoal/80">CAC registration number</dt>
                  <dd className="mt-1 font-semibold text-charcoal">{number}</dd>
                </div>
                <div>
                  <dt className="text-sm text-charcoal/80">Registration date</dt>
                  <dd className="mt-1 font-semibold text-charcoal"><time dateTime={isoDate}>{date}</time></dd>
                </div>
              </dl>
            </div>
            <ConstitutionCard />
          </div>
          <figure className="border border-border bg-surface p-5 sm:p-7">
            <Image
              src={certificate.url}
              alt={certificate.alt}
              width={certificate.width}
              height={certificate.height}
              sizes="(min-width: 768px) 280px, 80vw"
              className="mx-auto h-auto w-full max-w-[17.5rem] border border-border"
            />
            <figcaption className="mt-5 text-center">
              <p className="font-serif text-xl font-semibold text-purple">Certificate of Incorporation</p>
              <p className="mt-2 text-sm text-charcoal/85">Public copy with the tax identification line and QR code redacted.</p>
              <div className="mt-3">
                <DocumentLink href={certificate.url}>View Full Certificate</DocumentLink>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
