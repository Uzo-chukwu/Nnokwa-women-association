"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export function EntranceRouteSignal({ eventName }: { eventName: string }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.dispatchEvent(new CustomEvent(eventName, { detail: pathname }));
  }, [eventName, pathname]);

  return null;
}
