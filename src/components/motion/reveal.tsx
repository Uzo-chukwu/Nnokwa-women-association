"use client";

import { useEffect, useRef, type AriaAttributes, type CSSProperties, type ReactNode } from "react";
import "./reveal.css";

type RevealVariant = "fade-up" | "fade-in" | "scale";
type RevealTag = "div" | "li" | "section" | "article" | "figure";

const motionQuery = "(prefers-reduced-motion: reduce)";
let revealObserver: IntersectionObserver | undefined;

function observeReveal(element: HTMLElement, animateIfVisible: boolean) {
  if (
    typeof IntersectionObserver === "undefined" ||
    matchMedia(motionQuery).matches ||
    element.contains(document.activeElement) ||
    element.dataset.revealState === "shown"
  ) return;

  const { top, bottom } = element.getBoundingClientRect();
  const startsInView = top < window.innerHeight && bottom > 0;
  if (bottom <= 0 || (startsInView && !animateIfVisible)) return;

  const observer = revealObserver ??= new IntersectionObserver((entries, observer) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting || !(target instanceof HTMLElement) || target.dataset.revealState !== "pending") continue;
      observer.unobserve(target);
      target.dataset.revealState = matchMedia(motionQuery).matches ? "shown" : "entering";
    }
  });

  function showImmediately() {
    observer.unobserve(element);
    element.dataset.revealState = "shown";
  }

  function finishAnimation(event: AnimationEvent) {
    if (event.target === element && event.animationName === "scroll-reveal") showImmediately();
  }

  element.addEventListener("focusin", showImmediately);
  element.addEventListener("animationend", finishAnimation);
  element.addEventListener("animationcancel", finishAnimation);
  if (startsInView) {
    element.dataset.revealState = "entering-visible";
  } else {
    element.dataset.revealState = "pending";
    observer.observe(element);
  }

  return () => {
    observer.unobserve(element);
    element.removeEventListener("focusin", showImmediately);
    element.removeEventListener("animationend", finishAnimation);
    element.removeEventListener("animationcancel", finishAnimation);
    if (element.dataset.revealState !== "shown") delete element.dataset.revealState;
  };
}

export function Reveal({
  as: Tag = "div",
  variant = "fade-up",
  animateIfVisible = false,
  keepVisible = false,
  staggerIndex = 0,
  "aria-labelledby": labelledBy,
  className,
  style,
  children,
}: Pick<AriaAttributes, "aria-labelledby"> & {
  as?: RevealTag;
  variant?: RevealVariant;
  animateIfVisible?: boolean;
  keepVisible?: boolean;
  staggerIndex?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const delay = Math.min(4, Math.max(0, staggerIndex)) * 55;

  useEffect(() => {
    const element = ref.current;
    if (element) return observeReveal(element, animateIfVisible);
  }, [animateIfVisible]);

  return (
    <Tag
      ref={(element: HTMLElement | null) => { ref.current = element; }}
      data-reveal={variant}
      data-reveal-readable={keepVisible ? "" : undefined}
      aria-labelledby={labelledBy}
      className={className}
      style={delay ? { ...style, "--reveal-delay": `${delay}ms` } as CSSProperties : style}
    >
      {children}
    </Tag>
  );
}
