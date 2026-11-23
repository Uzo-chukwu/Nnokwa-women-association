import { ExecutivePortrait } from "@/components/leadership/executive-portrait";
import { Reveal } from "@/components/motion/reveal";
import type { Executive } from "@/data/leadership";

export function ExecutiveProfile({ executive, featured = false }: { executive: Executive; featured?: boolean }) {
  const { id, name, position, portrait, biography } = executive;
  const headingId = `${id}-heading`;
  const Heading = featured ? "h2" : "h3";
  const PortraitFrame = featured ? Reveal : "div";
  const portraitMotion = featured ? { variant: "scale" as const, animateIfVisible: true, staggerIndex: 1 } : {};

  return (
    <article
      aria-labelledby={headingId}
      className={`grid grid-cols-1 gap-y-5 border bg-surface p-4 sm:gap-x-6 sm:p-6 ${featured ? "border-gold/70 sm:grid-cols-[12rem_minmax(0,1fr)] md:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-10 lg:p-8" : "h-full border-border sm:grid-cols-[10rem_minmax(0,1fr)] md:grid-cols-[11rem_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1fr)]"}`}
    >
      <PortraitFrame {...portraitMotion} className={`relative aspect-[4/5] self-start overflow-hidden bg-accent/5 ${featured ? "max-sm:-mx-4 max-sm:-mt-4 sm:row-span-2" : ""}`}>
        <ExecutivePortrait
          portrait={portrait}
          sizes={featured
            ? "(min-width: 768px) 256px, (min-width: 640px) 192px, calc(100vw - 42px)"
            : "(min-width: 1024px) 192px, (min-width: 768px) 176px, (min-width: 640px) 160px, calc(100vw - 74px)"}
        />
      </PortraitFrame>
      <div className={featured ? "self-center sm:self-end" : "self-center"}>
        <Heading id={headingId} className={`leading-tight font-semibold text-foreground ${featured ? "text-xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"}`}>
          {name}
        </Heading>
        <p className="mt-2 text-sm leading-relaxed font-semibold text-accent sm:text-base">{position}</p>
      </div>
      <div className={`space-y-4 text-base leading-[1.7] text-foreground/85 ${featured ? "max-w-[45rem] sm:col-start-2" : "sm:col-span-2"}`}>
        {biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </article>
  );
}
