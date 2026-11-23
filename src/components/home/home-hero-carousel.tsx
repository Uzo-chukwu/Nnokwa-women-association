"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";
import { homeHeroCloudName, homeHeroSlides } from "@/data/home";

const slideDurationMs = 5500;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
type SlideStatus = Partial<Record<number, "ready" | "failed">>;

function subscribeToMotionPreference(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotion() {
  return true;
}

function getNextSlide(active: number, status: SlideStatus) {
  for (let offset = 1; offset < homeHeroSlides.length; offset += 1) {
    const index = (active + offset) % homeHeroSlides.length;
    if (status[index] !== "failed") return index;
  }
  return -1;
}

export function HomeHeroCarousel() {
  const [frame, setFrame] = useState<{ active: number; previous: number | null }>({ active: 0, previous: null });
  const [status, setStatus] = useState<SlideStatus>({});
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, getReducedMotion, getServerReducedMotion);
  const deadline = useRef(0);
  const { active, previous } = frame;
  const next = getNextSlide(active, status);
  const activeSettled = Boolean(status[active]);
  const nextReady = status[next] === "ready";
  const playing = !reducedMotion && !paused && next !== -1;

  useEffect(() => {
    if (playing && activeSettled) deadline.current = performance.now() + slideDurationMs;
  }, [active, activeSettled, playing]);

  useEffect(() => {
    if (!playing || !activeSettled || !nextReady) return;
    // Keep the current photo visible if the next one takes longer than the display interval.
    const delay = Math.max(0, deadline.current - performance.now());
    const timer = window.setTimeout(() => setFrame({ active: next, previous: active }), delay);
    return () => window.clearTimeout(timer);
  }, [active, activeSettled, next, nextReady, playing]);

  return (
    <>
      <div className="home-hero-backdrop" aria-hidden="true">
        {homeHeroSlides.map(({ publicId, position }, index) => {
          const isActive = index === active;
          const layer = isActive ? "active" : index === previous ? "previous" : "hidden";
          const prepareNext = !reducedMotion && activeSettled && index === next;

          if (!isActive && !status[index] && !prepareNext) return null;

          return (
            <div key={publicId} className="home-hero-slide" data-layer={layer}>
              <CloudinaryImage
                src={publicId}
                alt=""
                cloudName={homeHeroCloudName}
                fill
                sizes="100vw"
                loading="eager"
                fetchPriority={index === 0 ? "high" : "low"}
                className="object-cover"
                style={{ objectPosition: position }}
                onLoad={() => setStatus((current) => ({ ...current, [index]: "ready" }))}
                onError={() => setStatus((current) => ({ ...current, [index]: "failed" }))}
              />
            </div>
          );
        })}
      </div>
      {!reducedMotion && next !== -1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 mx-auto flex max-w-7xl justify-end px-5 sm:px-8 xl:px-12">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Play background slideshow" : "Pause background slideshow"}
            className="pointer-events-auto grid size-11 cursor-pointer place-items-center rounded-sm border border-ivory/70 bg-charcoal/80 text-ivory hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
          </button>
        </div>
      )}
    </>
  );
}
