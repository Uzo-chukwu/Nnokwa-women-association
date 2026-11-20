import type { CSSProperties } from "react";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { sdgCommitment, type SustainableDevelopmentGoal } from "@/data/sdg-commitment";

function SdgCard({ goal }: { goal: SustainableDevelopmentGoal }) {
  return (
    <li
      style={{ "--sdg-accent": goal.accent } as CSSProperties}
      className="relative border border-border bg-surface px-5 pt-5 pb-6 hover:border-(--sdg-accent) motion-safe:transition-colors sm:col-span-2 sm:max-lg:last:col-start-2 lg:col-span-1 lg:px-4 xl:px-5"
    >
      <span aria-hidden="true" className="absolute -top-px left-5 h-0.5 w-10 bg-(--sdg-accent) lg:left-4 xl:left-5" />
      <h3>
        <span className="mb-4 flex items-baseline gap-2 text-purple">
          <span className="font-sans text-xs font-semibold tracking-[0.1em]">SDG</span>{" "}
          <span className="text-4xl leading-none font-semibold tabular-nums">{goal.number}</span>
        </span>{" "}
        <span className="block text-xl leading-tight font-semibold text-charcoal lg:min-h-[2.5em] xl:text-[1.375rem]">
          {goal.title}
        </span>
      </h3>
      <p className="mt-2 text-base leading-relaxed text-charcoal/85">{goal.description}</p>
    </li>
  );
}

export function SdgCommitment({
  heading = sdgCommitment.heading,
  description = sdgCommitment.description,
}: { heading?: string; description?: string }) {
  const { label, goals } = sdgCommitment;

  return (
    <section aria-labelledby="sdg-commitment-heading" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
        <div className="max-w-[48rem]">
          <HomeSectionHeading id="sdg-commitment-heading" label={label} heading={heading} />
          <p className="mt-5 max-w-[42rem] text-base leading-[1.75] text-charcoal/85 sm:text-lg">
            {description}
          </p>
        </div>
        <ol role="list" className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-4 lg:grid-cols-5 xl:gap-5">
          {goals.map((goal) => <SdgCard key={goal.number} goal={goal} />)}
        </ol>
      </div>
    </section>
  );
}
