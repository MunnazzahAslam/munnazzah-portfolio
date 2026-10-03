"use client";

import { useEffect, useRef } from "react";

/** How much scroll the palette takes to drain back to black and white. */
const DRAIN_PX = 300;

/**
 * Placed just before "Next project": as this marker scrolls up through the
 * last 300px before it, the case page's palette drains to black and white.
 * The colour belongs to the work, so it leaves when the work ends.
 *
 * It writes --drain (0 to 1) on the case page; the CSS mixes every palette
 * colour towards black or white by that amount. With reduced motion the
 * switch is instant, at the halfway point.
 */
export default function PaletteDrain() {
  const marker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marker.current;
    const page = el?.closest<HTMLElement>("[data-project]");
    if (!el || !page) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      // 0 while the marker is below the bottom of the screen, 1 once it has
      // risen 300px above it.
      const risen = window.innerHeight - el.getBoundingClientRect().top;
      let drain = Math.min(1, Math.max(0, risen / DRAIN_PX));
      if (reduced.matches) drain = drain >= 0.5 ? 1 : 0;
      page.style.setProperty("--drain", drain.toFixed(3));
      page.toggleAttribute("data-drained", drain >= 0.5);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={marker} className="drain-zone" aria-hidden="true" />;
}
