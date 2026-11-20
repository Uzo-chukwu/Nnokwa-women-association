import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { NewsEventCard } from "@/components/news/news-event-card";
import { ActionLink } from "@/components/ui/action-link";
import { newsEntries, newsEventsPreview } from "@/data/news-events";

export function NewsEventsPreview() {
  const { label, heading, description, action } = newsEventsPreview;

  return (
    <section aria-labelledby="news-events-preview-heading" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[48rem]">
            <HomeSectionHeading id="news-events-preview-heading" label={label} heading={heading} />
            <p className="mt-5 max-w-[42rem] text-base leading-[1.75] text-charcoal/85 sm:text-lg">
              {description}
            </p>
          </div>
          <div className="shrink-0">
            <ActionLink href={action.href} variant="secondary">{action.label}</ActionLink>
          </div>
        </div>
        <ul role="list" className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[1.2fr_1fr] xl:gap-6">
          {newsEntries.map((entry, index) => (
            <li key={entry.id} className={index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : undefined}>
              <NewsEventCard entry={entry} featured={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
