import { BankTransferCard } from "@/components/donations/bank-transfer-card";
import { homeDonationHref, homeSectionIds } from "@/data/navigation";

export function DonationSection() {
  return (
    <section aria-labelledby="donation-heading" className="bg-purple text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-9 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 xl:gap-20 xl:px-12 xl:py-24">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs leading-relaxed font-semibold tracking-[0.14em] text-gold uppercase sm:mb-5">
            <span aria-hidden="true" className="h-px w-7 shrink-0 bg-gold" />
            Support our mission
          </p>
          <h2 id="donation-heading" className="max-w-[36rem] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.035em]">
            Be part of the change we are building.
          </h2>
          <p className="mt-5 max-w-[36rem] text-base leading-[1.75] text-white/90 sm:text-lg">
            Your generosity helps us strengthen community development, support women and families, promote better health, preserve our cultural heritage and create opportunities for a more sustainable future.
          </p>
          <p className="mt-4 max-w-[36rem] text-base leading-relaxed text-white/90">
            Every contribution supports the collective work of the Nnokwa Women Association.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8">
            <a
              href={homeDonationHref}
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-gold px-5 py-2.5 text-center text-sm font-semibold text-charcoal hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-safe:transition-colors"
            >
              Make a Donation
            </a>
            <a
              href={`#${homeSectionIds.ourWork}`}
              className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-white underline decoration-gold underline-offset-4 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-safe:transition-colors"
            >
              Learn More About Our Work
            </a>
          </div>
        </div>

        <BankTransferCard id={homeSectionIds.donationDetails} onDarkBackground>
          <p className="mt-5 text-sm font-semibold text-purple">Thank you for considering a donation.</p>
          <p className="mt-1 text-sm leading-relaxed text-charcoal/85">
            Please contact the association if you need confirmation of a transfer or further information.
          </p>
        </BankTransferCard>
      </div>
    </section>
  );
}
