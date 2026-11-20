import { CloudinaryImage } from "@/components/ui/cloudinary-image";
import { leadershipPortraitCloudName, type Executive } from "@/data/leadership";

export function ExecutivePortrait({ portrait, sizes }: { portrait: Executive["portrait"]; sizes: string }) {
  return (
    <CloudinaryImage
      src={portrait.publicId}
      alt={portrait.alt}
      cloudName={leadershipPortraitCloudName}
      fill
      sizes={sizes}
      className="object-cover object-top"
    />
  );
}
