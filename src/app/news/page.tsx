import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { NewsEventCard } from "@/components/news/news-event-card";
import { ActionLink } from "@/components/ui/action-link";
import { routes } from "@/data/navigation";
import { newsEntries, newsEventsPreview } from "@/data/news-events";

export const metadata: Metadata = {
  title: "News & Events",
  description: "News, event announcements and community updates from the Nnokwa Women Association.",
};

export default function NewsPage() {
  const publishedEntries = newsEntries.filter((entry) => entry.status === "published");

  return (
    <>
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-end lg:justify-between xl:px-12 xl:py-20">
          <div className="max-w-[42rem]">
            <span aria-hidden="true" className="mb-5 block h-px w-10 bg-gold" />
            <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-charcoal">
              News &amp; Events
            </h1>
            <p className="mt-4 text-base leading-[1.75] text-charcoal/85 sm:text-lg">
              {newsEventsPreview.description}
            </p>
          </div>
          <div className="shrink-0">
            <ActionLink href={routes.home} variant="secondary">Back to Home</ActionLink>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 xl:px-12">
        {publishedEntries.length > 0 ? (
          <section aria-labelledby="latest-updates-heading">
            <h2 id="latest-updates-heading" className="text-3xl leading-tight font-semibold text-charcoal">Latest updates</h2>
            <ul role="list" className="mt-6 grid gap-5 sm:grid-cols-2 xl:gap-6">
              {publishedEntries.map((entry) => (
                <li key={entry.id}><NewsEventCard entry={entry} /></li>
              ))}
            </ul>
          </section>
        ) : (
          <section aria-labelledby="news-empty-heading" className="border border-border bg-surface px-5 py-10 text-center sm:px-8 sm:py-14">
            <div className="mx-auto mb-5 grid size-12 place-items-center rounded-sm bg-gold/20 text-purple">
              <CalendarDays size={24} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h2 id="news-empty-heading" className="text-2xl leading-tight font-semibold text-purple sm:text-3xl">
              Updates will be published here
            </h2>
            <p className="mx-auto mt-3 max-w-[32rem] text-base leading-relaxed text-charcoal/85">
              Check back for association news and event announcements.
            </p>
          </section>
        )}
      </div>
    </>
  );
}
