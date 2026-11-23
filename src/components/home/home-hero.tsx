import { HomeHeroCarousel } from "@/components/home/home-hero-carousel";
import { ActionLink } from "@/components/ui/action-link";
import { homeHero } from "@/data/home";
import "./home-hero.css";

export function HomeHero() {
  const { headline, description, primaryAction, secondaryAction } = homeHero;

  return (
    <section aria-labelledby="home-hero-heading" className="home-hero relative isolate overflow-hidden text-ivory">
      <div className="relative z-20 mx-auto flex min-h-[34rem] max-w-7xl items-center px-5 pt-14 pb-21 sm:min-h-[36rem] sm:px-8 lg:min-h-[39rem] lg:py-24 xl:px-12">
        <div className="max-w-[46rem]">
          <h1 id="home-hero-heading" className="home-hero-heading">
            {headline.map((line, index) => (
              <span key={line} className="block last:text-gold">
                {line}{index < headline.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[34rem] text-base leading-[1.75] text-ivory/95 sm:mt-7 sm:text-lg">
            {description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <ActionLink href={primaryAction.href} variant="gold">{primaryAction.label}</ActionLink>
            <ActionLink href={secondaryAction.href} variant="onDark">
              {secondaryAction.label}
            </ActionLink>
          </div>
        </div>
      </div>
      <HomeHeroCarousel />
    </section>
  );
}
