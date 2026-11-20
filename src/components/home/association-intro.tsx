import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { ActionLink } from "@/components/ui/action-link";
import { AssociationPhoto } from "@/components/ui/association-photo";
import { associationIntro } from "@/data/home";

export function AssociationIntro() {
  const { label, heading, body, action, image } = associationIntro;

  return (
    <section aria-labelledby="association-intro-heading" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-9 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14 xl:gap-24 xl:px-12 xl:py-24">
        <div className="lg:col-start-2 lg:row-start-1">
          <HomeSectionHeading id="association-intro-heading" label={label} heading={heading} />
          <p className="mt-5 max-w-[36rem] text-base leading-[1.75] text-charcoal/85 sm:mt-6 sm:text-lg">
            {body}
          </p>
          <div className="mt-7 sm:mt-8">
            <ActionLink href={action.href} variant="secondary">{action.label}</ActionLink>
          </div>
        </div>

        <AssociationPhoto image={image} className="lg:col-start-1 lg:row-start-1" />
      </div>
    </section>
  );
}
