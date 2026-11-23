import Image from "next/image";
import { SiteLink } from "@/components/ui/site-link";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { associationLogoUrl } from "@/config/images";
import { routes } from "@/data/navigation";
import "./site-navigation.css";

export function SiteHeader() {
  return (
    <header className="relative z-10 border-b border-border bg-surface">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-2 px-5 sm:gap-5 sm:px-8 xl:min-h-[5.5rem] xl:px-12">
        <SiteLink
          href={routes.home}
          className="group inline-flex shrink-0 items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-3"
        >
          <Image
            src={associationLogoUrl}
            alt=""
            width={160}
            height={160}
            unoptimized
            loading="eager"
            className="size-11 rounded-full bg-ivory group-hover:brightness-[1.06] group-active:brightness-95 motion-safe:transition-[filter,scale] motion-safe:group-active:scale-[0.97] sm:size-14"
          />
          <span className="flex flex-col gap-1">
            <span className="font-serif text-xl leading-none font-bold tracking-wide text-brand-detail group-hover:text-accent group-active:text-accent motion-safe:transition-colors">Nnokwa</span>
            <span className="text-[0.625rem] leading-none font-semibold tracking-[0.08em] uppercase sm:tracking-[0.12em]">Women Association</span>
          </span>
        </SiteLink>
        <div className="flex items-center gap-1 sm:gap-4">
          <ThemeToggle />
          <SiteNavigation />
        </div>
      </div>
    </header>
  );
}
