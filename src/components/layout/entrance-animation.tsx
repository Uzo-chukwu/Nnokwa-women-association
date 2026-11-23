import { EntranceRouteSignal } from "@/components/layout/entrance-route-signal";
import "./entrance-animation.css";

const logoPath = "/images/nwa-logo.svg";
const routeEvent = "nnokwa:entrance-route";
const overlayId = "homepage-entrance";
export const entranceContentId = "site-content";

export function EntranceAnimation() {
  return (
    <>
      <EntranceRouteSignal eventName={routeEvent} />
      <div id={overlayId} className="homepage-entrance" aria-hidden="true">
        <div className="homepage-entrance-panel homepage-entrance-panel-left" />
        <div className="homepage-entrance-panel homepage-entrance-panel-right" />
        <div className="homepage-entrance-logo" style={{ backgroundImage: `url(${logoPath})` }} />
      </div>
    </>
  );
}

export const startEntranceScript = `
(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let pathname = location.pathname;
  let stop;
  let logoPreloaded = false;

  function playForCurrentRoute() {
    stop?.();
    stop = pathname === "/" && !reducedMotion.matches ? start() : undefined;
  }

  addEventListener(${JSON.stringify(routeEvent)}, (event) => {
    if (pathname === event.detail) return;
    pathname = event.detail;
    playForCurrentRoute();
  });
  addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    pathname = location.pathname;
    playForCurrentRoute();
  });

  function start() {
    const root = document.documentElement;
    const overlayId = ${JSON.stringify(overlayId)};
    const contentId = ${JSON.stringify(entranceContentId)};
    let overlay;
    let content;
    let timeout;
    const observer = new MutationObserver(syncElements);

    function finish() {
      root.removeAttribute("data-home-entrance");
      root.removeAttribute("data-home-entrance-scroll-lock");
      root.style.removeProperty("--entrance-scrollbar-width");
      if (content) content.inert = false;
      observer.disconnect();
      clearTimeout(timeout);
      overlay?.removeEventListener("animationend", onOverlayAnimation);
      overlay?.removeEventListener("animationcancel", onOverlayAnimation);
      reducedMotion.removeEventListener("change", onMotionChange);
      document.removeEventListener("DOMContentLoaded", lockScroll);
      removeEventListener("pagehide", finish);
    }

    function lockScroll() {
      const scrollbarWidth = window.innerWidth - root.clientWidth;
      root.style.setProperty("--entrance-scrollbar-width", scrollbarWidth + "px");
      root.setAttribute("data-home-entrance-scroll-lock", "");
    }

    function onMotionChange() {
      if (reducedMotion.matches) finish();
    }

    function onOverlayAnimation(event) {
      if (event.target === overlay) finish();
    }

    function syncElements() {
      const currentOverlay = document.getElementById(overlayId);
      if (overlay && overlay !== currentOverlay) {
        finish();
        return;
      }
      if (!overlay && currentOverlay) {
        overlay = currentOverlay;
        overlay.addEventListener("animationend", onOverlayAnimation);
        overlay.addEventListener("animationcancel", onOverlayAnimation);
      }

      const currentContent = document.getElementById(contentId);
      if (currentContent && content !== currentContent) {
        content = currentContent;
        content.inert = true;
      }
    }

    root.setAttribute("data-home-entrance", "");
    if (!logoPreloaded) {
      const preload = document.createElement("link");
      preload.rel = "preload";
      preload.as = "image";
      preload.href = ${JSON.stringify(logoPath)};
      document.head.append(preload);
      logoPreloaded = true;
    }

    observer.observe(root, { childList: true, subtree: true });
    syncElements();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", lockScroll, { once: true });
    } else {
      lockScroll();
    }
    reducedMotion.addEventListener("change", onMotionChange);
    addEventListener("pagehide", finish);
    // Release the homepage even when a browser does not dispatch an animation event.
    timeout = setTimeout(finish, 3900);
    return finish;
  }

  playForCurrentRoute();
})();
`;
