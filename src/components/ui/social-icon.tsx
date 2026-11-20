import type { SiteInfo } from "@/types/site";

type SocialPlatform = SiteInfo["socialLinks"][number]["platform"];

const icons = {
  YouTube: (
    <path
      fillRule="evenodd"
      d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6 15.8 12 9.6 8.4v7.2Z"
    />
  ),
  Instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
    </g>
  ),
  TikTok: (
    <path d="M16.6 0h-4v16.5a3.4 3.4 0 1 1-3.4-3.4c.4 0 .7.1 1.1.2V9.2a7.5 7.5 0 1 0 6.3 7.3V8.1a9.5 9.5 0 0 0 5.6 1.8V6a5.6 5.6 0 0 1-5.6-6Z" />
  ),
  Facebook: (
    <path d="M13.8 24V13.1h3.7l.6-4.3h-4.3V6c0-1.2.3-2.1 2.2-2.1h2.3V.1A29 29 0 0 0 15 0c-3.3 0-5.6 2-5.6 5.7v3.1H5.7v4.3h3.7V24Z" />
  ),
  LinkedIn: (
    <path d="M1 8h4.5v15H1V8Zm2.3-7a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Zm5.2 7h4.3v2h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.6 3.1 5.6 7.1V23h-4.5v-7.3c0-1.8 0-4-2.5-4s-2.9 1.9-2.9 3.9V23H8.5V8Z" />
  ),
} satisfies Record<SocialPlatform, React.ReactNode>;

export function SocialIcon({ platform, className }: { platform: SocialPlatform; className: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className={className}>
      {icons[platform]}
    </svg>
  );
}
