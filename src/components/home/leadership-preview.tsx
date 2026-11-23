import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { ExecutiveCard } from "@/components/leadership/executive-card";
import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { leadershipPreview, presidentGeneral } from "@/data/leadership";

export function LeadershipPreview() {
  const { label, heading, description, action } = leadershipPreview;

  return (
    <section aria-labelledby="leadership-preview-heading" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:grid-rows-[auto_1fr] lg:gap-x-16">
          <Reveal className="max-w-[48rem]">
            <HomeSectionHeading id="leadership-preview-heading" label={label} heading={heading} />
            <p className="mt-5 max-w-[42rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">
              {description}
            </p>
          </Reveal>
          <Reveal staggerIndex={1} className="sm:max-w-sm lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ExecutiveCard executive={presidentGeneral} />
          </Reveal>
          <div>
            <ActionLink href={action.href} variant="secondary">{action.label}</ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
