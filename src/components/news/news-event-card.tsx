import { ImageIcon } from "lucide-react";
import Link from "next/link";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";
import { cloudinaryConfig } from "@/config/images";
import type { NewsEntry } from "@/data/news-events";

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function NewsEventCard({ entry, featured = false }: { entry: NewsEntry; featured?: boolean }) {
  const { category, title, excerpt, image } = entry;
  const date = entry.status === "published" ? entry.date : undefined;

  return (
    <article className={`flex h-full flex-col border border-border bg-surface ${featured ? "" : "lg:flex-row"}`}>
      <div className={`relative grid aspect-[16/9] place-items-center overflow-hidden border-border bg-ivory ${featured ? "border-b lg:grow" : "border-b lg:aspect-auto lg:w-2/5 lg:shrink-0 lg:border-r lg:border-b-0"}`}>
        {cloudinaryConfig.cloudName && image?.publicId ? (
          <CloudinaryImage
            src={image.publicId}
            alt={image.alt}
            fill
            sizes={featured ? "(min-width: 1280px) 660px, (min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover"
          />
        ) : (
          <div className={`absolute inset-0 grid place-items-center ${featured ? "bg-gold/15" : "bg-purple/5"}`}>
            <span aria-hidden="true" className={`absolute inset-2 border sm:inset-3 ${featured ? "border-gold/70" : "border-purple/15"}`} />
            <div className="relative grid justify-items-center gap-2 px-4 text-center text-sm font-medium text-purple">
              <ImageIcon size={featured ? 26 : 22} strokeWidth={1.5} aria-hidden="true" />
              <span>Photograph placeholder</span>
            </div>
          </div>
        )}
      </div>
      <div className={`flex min-w-0 grow flex-col items-start p-5 sm:p-6 ${featured ? "lg:grow-0 lg:p-7" : "lg:p-5 xl:p-6"}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <p className="font-semibold text-purple">{category}</p>
          {entry.status === "placeholder" && (
            <span className="rounded-sm bg-ivory px-2 py-0.5 text-xs text-charcoal/85">Sample entry</span>
          )}
        </div>
        <h3 className={`mt-3 leading-tight font-semibold text-charcoal ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
          {title}
        </h3>
        {date && (
          <p className="mt-2 text-sm text-charcoal/85">
            {date.kind === "event" ? "Event date" : "Published"}{" "}
            <time dateTime={date.iso}>{dateFormatter.format(new Date(date.iso))}</time>
          </p>
        )}
        <p className="mt-2 text-base leading-relaxed text-charcoal/85">{excerpt}</p>
        {entry.status === "published" && (
          <Link
            href={entry.href}
            className="mt-4 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-purple underline decoration-gold underline-offset-4 hover:decoration-purple focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
          >
            Read more<span className="sr-only"> about {title}</span>
          </Link>
        )}
      </div>
    </article>
  );
}
