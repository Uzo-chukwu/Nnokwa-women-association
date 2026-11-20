import Image from "next/image";
import { SiteLink } from "@/components/ui/site-link";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { associationLogoUrl } from "@/config/images";
import { routes } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="relative z-10 border-b border-border bg-surface">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 xl:min-h-[5.5rem] xl:px-12">
        <SiteLink
          href={routes.home}
          className="inline-flex shrink-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
        >
          <Image
            src={associationLogoUrl}
            alt=""
            width={160}
            height={160}
            unoptimized
            loading="eager"
            className="size-14 rounded-full"
          />
          <span className="flex flex-col gap-1">
            <span className="font-serif text-xl leading-none font-bold tracking-wide text-purple">Nnokwa</span>
            <span className="text-[0.625rem] leading-none font-semibold tracking-[0.12em] uppercase">Women Association</span>
          </span>
        </SiteLink>
        <SiteNavigation />
      </div>
    </header>
  );
}
