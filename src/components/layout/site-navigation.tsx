"use client";

import { SiteLink } from "@/components/ui/site-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { ActionLink } from "@/components/ui/action-link";
import { donateLink, navigationLinks } from "@/data/navigation";

const mobileNavigationQuery = "(width < 64rem)";

function subscribeToMobileNavigation(onChange: () => void) {
  const query = window.matchMedia(mobileNavigationQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMobileNavigation() {
  return window.matchMedia(mobileNavigationQuery).matches;
}

function getServerMobileNavigation() {
  return false;
}

export function SiteNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useSyncExternalStore(subscribeToMobileNavigation, getMobileNavigation, getServerMobileNavigation);
  const navigation = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen || !isMobile) return;

    function closeOnOutsidePress(event: PointerEvent) {
      if (event.target instanceof Node && !navigation.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [isMobile, isOpen]);

  return (
    <div
      ref={navigation}
      className="flex items-center gap-6"
      onBlur={(event) => {
        if (isOpen && isMobile && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
        }
      }}
      onKeyDown={(event) => {
        if (isOpen && isMobile && event.key === "Escape" && toggle.current) {
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
        className="site-menu-toggle grid size-11 cursor-pointer place-items-center rounded-sm text-accent hover:bg-accent/5 active:bg-accent/15 aria-expanded:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:transition-colors lg:hidden"
      >
        <span className="site-menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        data-open={isOpen}
        inert={isMobile && !isOpen}
        style={{ "--menu-last-index": navigationLinks.length } as CSSProperties}
        className="site-navigation-panel absolute inset-x-0 top-full flex max-h-[calc(100dvh-5rem)] flex-col gap-3 overflow-y-auto overscroll-contain border-b border-border bg-surface px-5 pt-2 pb-5 shadow-lg sm:px-8 lg:static lg:max-h-none lg:flex-row lg:items-center lg:gap-5 lg:overflow-visible lg:border-0 lg:p-0 lg:shadow-none xl:gap-8"
      >
        <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-3 xl:gap-6">
          {navigationLinks.map(({ href, label }, index) => (
            <li key={href} className="site-navigation-item" style={{ "--menu-item-index": index } as CSSProperties}>
              <SiteLink
                href={href}
                prefetch={false}
                aria-current={pathname === href ? "page" : undefined}
                onNavigate={isOpen ? closeMenu : undefined}
                className="site-navigation-link relative flex min-h-11 items-center rounded-sm border-b border-border px-1 text-sm font-medium whitespace-nowrap hover:text-accent active:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[current=page]:font-semibold aria-[current=page]:text-accent aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8 motion-safe:transition-colors lg:border-0 lg:aria-[current=page]:no-underline"
              >
                {label}
              </SiteLink>
            </li>
          ))}
        </ul>
        <div className="site-navigation-item self-start lg:self-auto" style={{ "--menu-item-index": navigationLinks.length } as CSSProperties}>
          <ActionLink href={donateLink.href} onNavigate={isOpen ? closeMenu : undefined}>
            {donateLink.label}
          </ActionLink>
        </div>
      </nav>
    </div>
  );
}
