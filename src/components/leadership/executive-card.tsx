import { ExecutivePortrait } from "@/components/leadership/executive-portrait";
import { presidentGeneral, type Executive } from "@/data/leadership";

export function ExecutiveCard({ executive }: { executive: Executive }) {
  const { name, position, portrait } = executive;
  const isPresident = executive.id === presidentGeneral.id;

  return (
    <li className={`flex flex-col border max-[380px]:flex-row max-[380px]:items-center max-[380px]:p-2 ${isPresident ? "border-gold bg-ivory" : "border-border bg-surface"}`}>
      <div className={`relative grid aspect-[4/5] place-items-center overflow-hidden border-b max-[380px]:w-20 max-[380px]:shrink-0 max-[380px]:border-b-0 ${isPresident ? "border-gold/60 bg-gold/15" : "border-border bg-purple/5"}`}>
        <ExecutivePortrait
          portrait={portrait}
          sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 380px) 50vw, 80px"
        />
      </div>
      <div className="grid min-w-0 content-start gap-2 p-3 sm:p-5">
        <h3 className="text-lg leading-snug font-semibold wrap-anywhere text-charcoal sm:text-xl xl:text-2xl">
          {name}
        </h3>
        <p className={`text-sm text-purple ${isPresident ? "font-semibold" : "font-medium"}`}>
          {position}
        </p>
      </div>
    </li>
  );
}
