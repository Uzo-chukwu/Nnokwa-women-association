import type { ReactNode } from "react";

export function DocumentLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center rounded-sm border border-purple/35 px-5 py-2.5 text-sm font-semibold text-purple hover:border-purple hover:bg-purple/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
    >
      {children}
    </a>
  );
}
