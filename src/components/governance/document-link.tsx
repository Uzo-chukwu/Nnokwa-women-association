import type { ReactNode } from "react";

export function DocumentLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center rounded-sm border border-accent/35 px-5 py-2.5 text-sm font-semibold text-accent hover:border-accent hover:bg-accent/5 active:bg-accent/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:transition-colors"
    >
      {children}
    </a>
  );
}
