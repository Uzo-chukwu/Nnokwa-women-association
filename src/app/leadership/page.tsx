import type { Metadata } from "next";
import { ExecutiveProfile } from "@/components/leadership/executive-profile";
import { executives, leadershipPreview, presidentGeneral } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Our Leadership",
  description: "Meet the Woman President General and the executive team of the Nnokwa Women Association.",
};

export default function LeadershipPage() {
  const team = executives.filter(({ id }) => id !== presidentGeneral.id);

  return (
    <>
      <section aria-labelledby="leadership-heading" className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 xl:px-12 xl:py-20">
          <div className="mb-8 max-w-[42rem] sm:mb-10">
            <span aria-hidden="true" className="mb-5 block h-px w-10 bg-gold" />
            <h1 id="leadership-heading" className="text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-charcoal">
              Our Leadership
            </h1>
            <p className="mt-4 text-base leading-[1.75] text-charcoal/85 sm:text-lg">{leadershipPreview.description}</p>
          </div>
          <ExecutiveProfile executive={presidentGeneral} featured />
        </div>
      </section>

      <section aria-labelledby="executive-leadership-heading" className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
          <h2 id="executive-leadership-heading" className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-charcoal">
            Executive Leadership
          </h2>
          <ul role="list" className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-4 xl:gap-6">
            {team.map((executive) => (
              <li key={executive.id} className="lg:col-span-2 lg:last:odd:col-start-2">
                <ExecutiveProfile executive={executive} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
