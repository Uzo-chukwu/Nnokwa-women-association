export const cloudinaryConfig = {
  origin: "https://res.cloudinary.com",
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim(),
};

export const associationLogoUrl =
  `${cloudinaryConfig.origin}/drbd1c7ub/image/upload/c_crop,w_800,h_800,g_center/c_scale,w_160/f_webp/v1795172822/NWA-Logo_ovd3tx.svg`;
