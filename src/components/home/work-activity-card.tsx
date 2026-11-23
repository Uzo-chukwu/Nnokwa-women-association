import { ImageIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";
import { cloudinaryConfig } from "@/config/images";
import type { WorkActivity } from "@/data/work-activities";

export function WorkActivityCard({
  activity,
  featured,
  showPlaceholder = true,
  revealIndex,
}: {
  activity: WorkActivity;
  featured: boolean;
  showPlaceholder?: boolean;
  revealIndex?: number;
}) {
  const { heading, description } = activity;
  const image = cloudinaryConfig.cloudName && activity.image?.publicId ? activity.image : undefined;
  const sizes = featured
    ? "(min-width: 1280px) 580px, (min-width: 640px) 50vw, 100vw"
    : "(min-width: 1280px) 380px, (min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw";

  const className = `group border border-border bg-surface hover:border-gold/80 motion-safe:transition-colors sm:col-span-2 sm:max-lg:last:col-start-2 ${featured ? "lg:col-span-3" : "lg:col-span-2"}`;
  const content = (
    <>
      {(image || showPlaceholder) && (
        <div className="relative grid aspect-[3/2] place-items-center overflow-hidden border-b border-border bg-background">
          {image ? (
            <CloudinaryImage
              src={image.publicId}
              alt={image.alt}
              fill
              sizes={sizes}
              className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-accent/5 group-odd:bg-gold/15">
              <div aria-hidden="true" className="absolute inset-3 border border-accent/15 sm:inset-4" />
              <div className="relative grid justify-items-center gap-2 px-5 text-center text-sm font-medium text-accent">
                <ImageIcon size={24} strokeWidth={1.5} aria-hidden="true" />
                <span>Photograph placeholder</span>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="p-5 sm:p-6">
        <h3 className="text-2xl leading-tight font-semibold text-foreground">{heading}</h3>
        <p className="mt-2 max-w-[36rem] text-base leading-relaxed text-foreground/85">{description}</p>
      </div>
    </>
  );

  return revealIndex === undefined ? (
    <li className={className}>{content}</li>
  ) : (
    <Reveal as="li" className={className} staggerIndex={revealIndex}>{content}</Reveal>
  );
}
