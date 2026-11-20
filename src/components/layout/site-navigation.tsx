"use client";

import { Menu, X } from "lucide-react";
import { SiteLink } from "@/components/ui/site-link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ActionLink } from "@/components/ui/action-link";
import { donateLink, navigationLinks } from "@/data/navigation";

export function SiteNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div
      className="flex items-center gap-6"
      onBlur={(event) => {
        if (isOpen && !event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
        }
      }}
      onKeyDown={(event) => {
        if (isOpen && event.key === "Escape" && toggle.current?.getClientRects().length) {
          event.preventDefault();
          closeMenu();
          toggle.current.focus();
        }
      }}
    >
      <button
        ref={toggle}
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen(!isOpen)}
        className="grid size-11 place-items-center rounded-sm border border-border bg-surface text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:hidden"
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        className={`${isOpen ? "flex" : "hidden"} absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] flex-col gap-3 overflow-y-auto border-b border-border bg-surface px-5 pt-2 pb-5 shadow-lg sm:px-8 lg:static lg:flex lg:max-h-none lg:flex-row lg:items-center lg:gap-5 lg:overflow-visible lg:border-0 lg:p-0 lg:shadow-none xl:gap-8`}
      >
        <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-3 xl:gap-6">
          {navigationLinks.map(({ href, label }) => (
            <li key={href}>
              <SiteLink
                href={href}
                prefetch={false}
                aria-current={pathname === href ? "page" : undefined}
                onNavigate={isOpen ? closeMenu : undefined}
                className="flex min-h-11 items-center rounded-sm border-b border-border px-1 text-sm font-medium whitespace-nowrap hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[current=page]:font-semibold aria-[current=page]:text-accent aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8 lg:border-0"
              >
                {label}
              </SiteLink>
            </li>
          ))}
        </ul>
        <div className="self-start lg:self-auto">
          <ActionLink href={donateLink.href} onNavigate={isOpen ? closeMenu : undefined}>
            {donateLink.label}
          </ActionLink>
        </div>
      </nav>
    </div>
  );
}
