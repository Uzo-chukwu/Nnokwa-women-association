"use client";

import Link from "next/link";
import { useEffect, type ComponentProps } from "react";
import { routes } from "@/data/navigation";

type SiteLinkProps = Pick<ComponentProps<typeof Link>, "className" | "children" | "onNavigate" | "aria-current" | "prefetch"> & {
  href: string;
};

let initialRenderSettled = false;

function markInitialRenderSettled() {
  initialRenderSettled = true;
}

export function SiteLink({ href, onNavigate, ...props }: SiteLinkProps) {
  const needsHydrationFallback = href === routes.home || href === routes.about ||
    href === routes.news || href === routes.leadership || href === routes.ourWork ||
    href === routes.partnerships || href === routes.donate || href === routes.contact;

  useEffect(() => {
    if (!needsHydrationFallback || initialRenderSettled) return;

    // Give the initial App Router render a chance to claim the server-rendered head.
    if (typeof window.requestIdleCallback !== "function") {
      let frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(markInitialRenderSettled);
      });
      return () => window.cancelAnimationFrame(frame);
    }
    const id = window.requestIdleCallback(markInitialRenderSettled);
    return () => window.cancelIdleCallback(id);
  }, [needsHydrationFallback]);

  return (
    <Link
      {...props}
      href={href}
      onNavigate={(event) => {
        // A direct load keeps the route metadata intact if a link hydrates before the document head.
        if (!initialRenderSettled && needsHydrationFallback) {
          event.preventDefault();
          window.location.assign(href);
          return;
        }

        onNavigate?.(event);
      }}
    />
  );
}
