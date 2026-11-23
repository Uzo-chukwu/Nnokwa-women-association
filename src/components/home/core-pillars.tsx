import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { Reveal } from "@/components/motion/reveal";
import { corePillars } from "@/data/home";

export function CorePillars() {
  const { label, heading, items } = corePillars;

  return (
    <section aria-labelledby="core-pillars-heading" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
        <Reveal variant="fade-in" className="max-w-[39rem]">
          <HomeSectionHeading id="core-pillars-heading" label={label} heading={heading} />
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5">
          {items.map(({ id, heading, description }, index) => (
            <Reveal as="li" key={id} staggerIndex={index} className="relative flex flex-col border border-border bg-surface px-5 pt-6 pb-7 hover:border-gold/80 motion-safe:transition-colors xl:px-6">
              <span aria-hidden="true" className="absolute top-0 left-5 h-0.5 w-9 bg-gold xl:left-6" />
              <h3 className="text-[1.375rem] leading-tight font-semibold text-foreground lg:min-h-[2.75em] xl:text-2xl">
                {heading}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-foreground/85">{description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
