import { SiteLink } from "@/components/ui/site-link";
import type { ReactNode } from "react";

const variants = {
  primary: "border-purple bg-purple text-white hover:border-charcoal hover:bg-charcoal focus-visible:outline-purple",
  secondary: "border-purple/35 text-purple hover:border-purple hover:bg-purple/5 focus-visible:outline-purple",
  gold: "border-gold bg-gold text-charcoal hover:border-ivory hover:bg-ivory focus-visible:outline-gold",
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
