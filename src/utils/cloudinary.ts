import type { ImageLoaderProps } from "next/image";
import { cloudinaryConfig } from "@/config/images";

export function cloudinaryLoader(
  { src, width, quality }: ImageLoaderProps,
  cloudName = cloudinaryConfig.cloudName,
): string {
  const { origin } = cloudinaryConfig;

  if (!cloudName) {
    throw new Error("Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to use Cloudinary images.");
  }

  const publicId = src.split("/").map(encodeURIComponent).join("/");
  const transformations = `c_scale,w_${width}/q_${quality ?? "auto"}/f_auto`;

  return `${origin}/${encodeURIComponent(cloudName)}/image/upload/${transformations}/v1/${publicId}`;
}
