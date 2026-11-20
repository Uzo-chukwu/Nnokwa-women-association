import { SiteLink } from "@/components/ui/site-link";
import type { ReactNode } from "react";

const primaryColors = "bg-primary text-charcoal hover:bg-primary-hover";
const variants = {
  primary: `border-accent ${primaryColors} focus-visible:outline-accent`,
  secondary: "border-accent/35 text-accent hover:border-accent hover:bg-accent/5 focus-visible:outline-accent",
  gold: `border-gold ${primaryColors} focus-visible:outline-gold`,
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  onNavigate,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  onNavigate?: () => void;
}) {
  return (
    <SiteLink
      href={href}
      prefetch={false}
      onNavigate={onNavigate}
      className={`inline-flex min-h-11 items-center justify-center rounded-sm border px-5 py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]}`}
    >
      {children}
    </SiteLink>
  );
}
