"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader } from "@/utils/cloudinary";

type CloudinaryImageProps = Omit<ImageProps, "loader" | "src"> & {
  src: string;
  cloudName?: string;
};

export function CloudinaryImage({ alt, cloudName, ...props }: CloudinaryImageProps) {
  return <Image {...props} alt={alt} loader={(options) => cloudinaryLoader(options, cloudName)} />;
}
