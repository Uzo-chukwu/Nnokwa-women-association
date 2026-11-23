import type { CSSProperties } from "react";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { Reveal } from "@/components/motion/reveal";
import { sdgCommitment, type SustainableDevelopmentGoal } from "@/data/sdg-commitment";

function SdgCard({ goal, revealIndex }: { goal: SustainableDevelopmentGoal; revealIndex?: number }) {
  const className = "relative border border-border bg-surface px-5 pt-5 pb-6 hover:border-(--sdg-accent) motion-safe:transition-colors sm:col-span-2 sm:max-lg:last:col-start-2 lg:col-span-1 lg:px-4 xl:px-5";
  const style = { "--sdg-accent": goal.accent } as CSSProperties;
  const content = (
    <>
      <span aria-hidden="true" className="absolute -top-px left-5 h-0.5 w-10 bg-(--sdg-accent) lg:left-4 xl:left-5" />
      <h3>
        <span className="mb-4 flex items-baseline gap-2 text-accent">
          <span className="font-sans text-xs font-semibold tracking-[0.1em]">SDG</span>{" "}
          <span className="text-4xl leading-none font-semibold tabular-nums">{goal.number}</span>
        </span>{" "}
        <span className="block text-xl leading-tight font-semibold text-foreground lg:min-h-[2.5em] xl:text-[1.375rem]">
          {goal.title}
        </span>
      </h3>
      <p className="mt-2 text-base leading-relaxed text-foreground/85">{goal.description}</p>
    </>
  );

  return revealIndex === undefined ? (
    <li className={className} style={style}>{content}</li>
  ) : (
    <Reveal as="li" className={className} style={style} staggerIndex={revealIndex}>{content}</Reveal>
  );
}

export function SdgCommitment({
  heading = sdgCommitment.heading,
  description = sdgCommitment.description,
  reveal = false,
}: { heading?: string; description?: string; reveal?: boolean }) {
  const { label, goals } = sdgCommitment;
  const Introduction = reveal ? Reveal : "div";

  return (
    <section aria-labelledby="sdg-commitment-heading" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
        <Introduction className="max-w-[48rem]">
          <HomeSectionHeading id="sdg-commitment-heading" label={label} heading={heading} />
          <p className="mt-5 max-w-[42rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">
            {description}
          </p>
        </Introduction>
        <ol role="list" className={`mt-8 grid gap-4 sm:mt-10 sm:grid-cols-4 lg:grid-cols-5 xl:gap-5${reveal ? " reveal-stagger-group" : ""}`}>
          {goals.map((goal, index) => <SdgCard key={goal.number} goal={goal} revealIndex={reveal ? index : undefined} />)}
        </ol>
      </div>
    </section>
  );
}
