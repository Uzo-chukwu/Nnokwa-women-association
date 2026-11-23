import type { Metadata } from "next";
import { LegalStatus } from "@/components/governance/legal-status";
import { Reveal } from "@/components/motion/reveal";
import { AssociationPhoto } from "@/components/ui/association-photo";
import { aboutContent } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutContent.introduction,
};

const sectionHeading = "text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-foreground";

export default function AboutPage() {
  const { introduction, purpose, mission, vision, motto, image, pillars, histories } = aboutContent;

  return (
    <>
      <section aria-labelledby="about-heading" className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-14 xl:gap-20 xl:px-12 xl:py-20">
          <Reveal animateIfVisible className="max-w-[36rem]">
            <h1 id="about-heading" className="text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-foreground">
              About Us
            </h1>
            <p className="mt-5 text-base leading-[1.75] text-foreground/85 sm:text-lg">{introduction}</p>
          </Reveal>
          <AssociationPhoto image={image} />
        </div>
      </section>

      <div className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-14 xl:gap-20 xl:px-12 xl:py-24">
          <Reveal as="section" aria-labelledby="about-identity-heading">
            <h2 id="about-identity-heading" className={sectionHeading}>Who We Are</h2>
            <p className="mt-5 max-w-[36rem] text-base leading-[1.75] text-foreground/85 sm:text-lg">{purpose}</p>
          </Reveal>
          <div className="divide-y divide-border border border-border bg-background">
            <Reveal as="section" aria-labelledby="about-mission-heading" className="border-l-2 border-gold p-5 sm:p-7">
              <h2 id="about-mission-heading" className="text-2xl font-semibold text-foreground sm:text-3xl">Our Mission</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">{mission}</p>
            </Reveal>
            <Reveal as="section" aria-labelledby="about-vision-heading" className="p-5 sm:p-7">
              <h2 id="about-vision-heading" className="text-2xl font-semibold text-foreground sm:text-3xl">Our Vision</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">{vision}</p>
            </Reveal>
          </div>
        </div>
      </div>

      <section aria-labelledby="about-pillars-heading" className="border-y border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
          <Reveal>
            <h2 id="about-pillars-heading" className={sectionHeading}>Our Core Pillars</h2>
          </Reveal>
          <ul role="list" className="reveal-stagger-group mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {pillars.map(({ id, heading, description }, index) => (
              <Reveal as="li" key={id} staggerIndex={index} className="relative border border-border bg-surface p-5 sm:p-6">
                <span aria-hidden="true" className="absolute top-0 left-5 h-0.5 w-9 bg-gold sm:left-6" />
                <h3 className="text-2xl leading-tight font-semibold text-foreground">{heading}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/85">{description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-motto-heading" className="border-y border-gold/40 bg-gold/15 text-foreground">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 xl:px-12">
          <h2 id="about-motto-heading" className="font-sans text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            Our Motto
          </h2>
          <p className="mt-4 max-w-[52rem] font-serif text-[clamp(1.875rem,5vw,3.5rem)] leading-tight font-semibold tracking-[-0.035em]">
            {motto}
          </p>
        </div>
      </section>

      <LegalStatus />

      <section aria-labelledby="about-history-heading" className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 xl:px-12 xl:py-24">
          <Reveal>
            <h2 id="about-history-heading" className={sectionHeading}>Our History</h2>
          </Reveal>
          <div className="reveal-stagger-group mt-8 grid items-start gap-4 md:grid-cols-2 md:gap-5">
            {histories.map(({ id, title, introduction, sections }, index) => (
              <Reveal as="article" key={id} aria-labelledby={id} staggerIndex={index} className="border-l-2 border-gold bg-background p-5 sm:p-7">
                <h3 id={id} className="text-2xl leading-tight font-semibold wrap-anywhere text-foreground">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/85">{introduction}</p>
                <div className="mt-5 space-y-5 border-t border-border pt-5">
                  {sections.map(({ heading, body }) => (
                    <div key={heading}>
                      <h4 className="text-lg font-semibold text-foreground">{heading}</h4>
                      <p className="mt-2 text-base leading-relaxed text-foreground/85">{body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
