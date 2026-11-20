import { ExecutivePortrait } from "@/components/leadership/executive-portrait";
import type { Executive } from "@/data/leadership";

export function ExecutiveProfile({ executive, featured = false }: { executive: Executive; featured?: boolean }) {
  const { id, name, position, portrait, biography } = executive;
  const headingId = `${id}-heading`;
  const Heading = featured ? "h2" : "h3";

  return (
    <article
      aria-labelledby={headingId}
      className={`grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-5 border bg-surface p-4 sm:gap-x-6 sm:p-6 ${featured ? "border-gold/70 sm:grid-cols-[12rem_minmax(0,1fr)] md:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-10 lg:p-8" : "h-full border-border sm:grid-cols-[7rem_minmax(0,1fr)]"}`}
    >
      <div className={`relative aspect-[4/5] self-start overflow-hidden bg-purple/5 ${featured ? "sm:row-span-2" : ""}`}>
        <ExecutivePortrait portrait={portrait} sizes={featured ? "(min-width: 768px) 256px, (min-width: 640px) 192px, 88px" : "(min-width: 640px) 112px, 88px"} />
      </div>
      <div className={featured ? "self-center sm:self-end" : "self-center"}>
        <Heading id={headingId} className={`leading-tight font-semibold text-charcoal ${featured ? "text-xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"}`}>
          {name}
        </Heading>
        <p className="mt-2 text-sm leading-relaxed font-semibold text-purple sm:text-base">{position}</p>
      </div>
      <div className={`col-span-2 space-y-4 text-base leading-[1.7] text-charcoal/85 ${featured ? "max-w-[45rem] sm:col-span-1 sm:col-start-2" : ""}`}>
        {biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </article>
  );
}
