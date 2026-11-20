import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { ExecutiveCard } from "@/components/leadership/executive-card";
import { ActionLink } from "@/components/ui/action-link";
import { executives, leadershipPreview } from "@/data/leadership";

export function LeadershipPreview() {
  const { label, heading, description, action } = leadershipPreview;

  return (
    <section aria-labelledby="leadership-preview-heading" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[48rem]">
            <HomeSectionHeading id="leadership-preview-heading" label={label} heading={heading} />
            <p className="mt-5 max-w-[42rem] text-base leading-[1.75] text-charcoal/85 sm:text-lg">
              {description}
            </p>
          </div>
          <div className="shrink-0">
            <ActionLink href={action.href} variant="secondary">{action.label}</ActionLink>
          </div>
        </div>
        <ul role="list" className="mt-8 grid gap-3 min-[380px]:grid-cols-2 min-[380px]:gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-4 xl:gap-6">
          {executives.map((executive) => <ExecutiveCard key={executive.id} executive={executive} />)}
        </ul>
      </div>
    </section>
  );
}
