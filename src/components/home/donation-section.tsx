import { ActionLink } from "@/components/ui/action-link";
import { homeSectionIds, routes } from "@/data/navigation";

export function DonationSection() {
  return (
    <section aria-labelledby="donation-heading" className="border-t border-gold/45 bg-brand-panel text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
        <p className="mb-4 flex items-center gap-3 text-xs leading-relaxed font-semibold tracking-[0.14em] text-gold uppercase sm:mb-5">
          <span aria-hidden="true" className="h-px w-7 shrink-0 bg-gold" />
          Support our mission
        </p>
        <h2 id="donation-heading" className="max-w-[36rem] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.035em]">
          Be part of the change we are building.
        </h2>
        <p className="mt-5 max-w-[36rem] text-base leading-[1.75] text-ivory/90 sm:text-lg">
          Your generosity helps us strengthen community development, support women and families, promote better health, preserve our cultural heritage and create opportunities for a more sustainable future.
        </p>
        <p className="mt-4 max-w-[36rem] text-base leading-relaxed text-ivory/90">
          Every contribution supports the collective work of the Nnokwa Women Association.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8">
          <ActionLink href={routes.donate} variant="gold">Make a Donation</ActionLink>
          <a
            href={`#${homeSectionIds.ourWork}`}
            className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-white underline decoration-gold underline-offset-4 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-safe:transition-colors"
          >
            Learn More About Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
