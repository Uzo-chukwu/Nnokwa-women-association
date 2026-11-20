import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { WorkActivityCard } from "@/components/home/work-activity-card";
import { ourWork } from "@/data/work-activities";
import { homeSectionIds } from "@/data/navigation";

export function OurWorkInAction() {
  const { label, heading, description, activities } = ourWork;

  return (
    <section aria-labelledby={homeSectionIds.ourWork} className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
        <div className="grid items-end gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-14 xl:gap-20">
          <div className="max-w-[38rem]">
            <HomeSectionHeading id={homeSectionIds.ourWork} label={label} heading={heading} />
          </div>
          <p className="max-w-[34rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">
            {description}
          </p>
        </div>

        <ul className="mt-9 grid gap-5 sm:mt-12 sm:grid-cols-4 lg:grid-cols-6 xl:gap-6">
          {activities.map((activity, index) => (
            <WorkActivityCard key={activity.id} activity={activity} featured={index < 2} />
          ))}
        </ul>
      </div>
    </section>
  );
}
