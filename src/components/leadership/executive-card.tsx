import { ExecutivePortrait } from "@/components/leadership/executive-portrait";
import type { Executive } from "@/data/leadership";

export function ExecutiveCard({ executive }: { executive: Executive }) {
  const { id, name, position, portrait } = executive;
  const headingId = `${id}-preview-heading`;

  return (
    <article aria-labelledby={headingId} className="border border-gold bg-background">
      <div className="relative aspect-[4/5] overflow-hidden border-b border-gold/60 bg-gold/15">
        <ExecutivePortrait
          portrait={portrait}
          sizes="(min-width: 640px) 382px, calc(100vw - 42px)"
        />
      </div>
      <div className="grid min-w-0 content-start gap-2 p-3 sm:p-5">
        <h3 id={headingId} className="text-lg leading-snug font-semibold wrap-anywhere text-foreground sm:text-xl xl:text-2xl">
          {name}
        </h3>
        <p className="text-sm font-semibold text-accent">
          {position}
        </p>
      </div>
    </article>
  );
}
