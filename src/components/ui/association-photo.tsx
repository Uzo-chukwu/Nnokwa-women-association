import { ImageIcon } from "lucide-react";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";
import { cloudinaryConfig } from "@/config/images";

export function AssociationPhoto({
  image,
  className = "",
}: {
  image: { publicId?: string; alt: string };
  className?: string;
}) {
  return (
    <div className={`border border-border bg-ivory p-3 sm:p-4 ${className}`}>
      <div className="relative isolate grid aspect-[5/4] place-items-center bg-purple/5">
        {cloudinaryConfig.cloudName && image.publicId ? (
          <CloudinaryImage
            src={image.publicId}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 500px, (min-width: 1024px) 45vw, 92vw"
            className="object-cover"
          />
        ) : (
          <>
            <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-purple/15 sm:inset-5" />
            <div className="relative mx-6 grid justify-items-center gap-3 text-center text-sm font-medium text-purple">
              <span className="grid size-12 place-items-center rounded-full border border-gold bg-ivory">
                <ImageIcon size={21} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>Association photograph placeholder</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
