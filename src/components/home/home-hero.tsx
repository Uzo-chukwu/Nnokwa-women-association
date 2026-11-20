import { ImageIcon } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";
import { cloudinaryConfig } from "@/config/images";
import { homeHero } from "@/data/home";
import "./home-hero.css";

export function HomeHero() {
  const { headline, description, primaryAction, secondaryAction, image } = homeHero;

  return (
    <section aria-labelledby="home-hero-heading" className="bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-12 pb-12 sm:px-8 sm:pt-16 sm:pb-16 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:py-20 xl:gap-16 xl:px-12">
        <div>
          <h1 id="home-hero-heading" className="home-hero-heading">
            {headline.map((line, index) => (
              <span key={line} className="block last:text-purple">
                {line}{index < headline.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[34rem] text-base leading-[1.75] text-charcoal/85 sm:mt-7 sm:text-lg">
            {description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <ActionLink href={primaryAction.href}>{primaryAction.label}</ActionLink>
            <ActionLink href={secondaryAction.href} variant="secondary">
              {secondaryAction.label}
            </ActionLink>
          </div>
        </div>

        <div className="home-hero-image">
          {cloudinaryConfig.cloudName && image.publicId ? (
            <CloudinaryImage
              src={image.publicId}
              alt={image.alt}
              fill
              preload
              sizes="(min-width: 1280px) 525px, (min-width: 1024px) 45vw, 92vw"
              className="object-cover"
            />
          ) : (
            <div className="home-hero-placeholder">
              <div className="home-hero-placeholder-label">
                <ImageIcon size={22} strokeWidth={1.5} aria-hidden="true" />
                <span>Community photograph placeholder</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
