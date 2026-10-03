"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/content/projects";
import FloodLink from "./FloodLink";
import { mediaName, transitionState } from "./transitionState";

/** A passing cursor does nothing: colour only starts after the pointer has rested this long. */
const HOVER_INTENT_MS = 120;

/**
 * The work index: four grey projects waiting to be touched.
 *
 * Only ever one project is in colour at a time, so the active project is held
 * here, not in each tile. Hover (after a short delay), keyboard focus and, on
 * touch screens, being nearest the middle of the screen all do the same thing:
 * make that one project active. An active tile turns to colour and plays its
 * muted loop; its video is not downloaded before that.
 */
export default function WorkIndex({ projects, className = "" }: { projects: Project[]; className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  // Which loops have been asked for. A tile renders no <source> until then.
  const [wanted, setWanted] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState<Record<string, boolean>>({});
  const [reducedMotion, setReducedMotion] = useState(false);

  // Read once, as the page renders after a "back" navigation.
  const [returning, setReturning] = useState(() => transitionState.returningTo);
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tiles = useRef<Record<string, HTMLElement | null>>({});
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});

  const activate = useCallback((slug: string | null) => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = null;
    setActive(slug);
    // The first time a project becomes active, its loop is asked for.
    if (slug) setWanted((w) => (w[slug] ? w : { ...w, [slug]: true }));
  }, []);

  const hover = (slug: string) => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = setTimeout(() => activate(slug), HOVER_INTENT_MS);
  };

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Touch screens have no hover, so the tile nearest the middle of the screen
  // is the active one as you scroll.
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    let frame = 0;
    const pick = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let best: string | null = null;
      let bestDistance = Infinity;
      for (const [slug, el] of Object.entries(tiles.current)) {
        const media = el?.querySelector(".tile-media");
        if (!media) continue;
        const box = media.getBoundingClientRect();
        // Only a tile that covers the middle band of the screen counts.
        if (box.bottom < window.innerHeight * 0.25 || box.top > window.innerHeight * 0.75) continue;
        const distance = Math.abs(box.top + box.height / 2 - middle);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = slug;
        }
      }
      activate(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [activate]);

  // Play the active loop from its first frame (the poster frame); pause the rest.
  useEffect(() => {
    for (const [slug, video] of Object.entries(videos.current)) {
      if (!video) continue;
      if (slug === active && !reducedMotion) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [active, reducedMotion, wanted]);

  useEffect(() => () => void (intent.current && clearTimeout(intent.current)), []);

  // Once the way back has played, the tile drops its name again.
  useEffect(() => {
    if (!returning) return;
    transitionState.returningTo = null;
    const t = setTimeout(() => setReturning(null), 1000);
    return () => clearTimeout(t);
  }, [returning]);

  return (
    <ol className={`grid tiles ${className}`}>
      {projects.map((p, i) => (
        <li
          key={p.slug}
          className="tile"
          data-active={active === p.slug}
          ref={(el) => {
            tiles.current[p.slug] = el;
          }}
          onPointerEnter={(e) => e.pointerType === "mouse" && hover(p.slug)}
          onPointerLeave={(e) => e.pointerType === "mouse" && activate(null)}
        >
          {/*
            Coming back from this project's case study, its tile is the one the
            hero shrinks into (see transitionState). Otherwise tiles are unnamed
            until clicked.
          */}
          <div
            className="tile-media"
            style={returning === p.slug ? { viewTransitionName: mediaName(p.slug), viewTransitionClass: "morph" } : undefined}
          >
            <Image
              src={p.media.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              // The first tile is near the top of the page on most screens.
              loading={i === 0 ? "eager" : "lazy"}
            />
            <video
              ref={(el) => {
                videos.current[p.slug] = el;
              }}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              data-ready={!!ready[p.slug]}
              onPlaying={() => setReady((r) => (r[p.slug] ? r : { ...r, [p.slug]: true }))}
            >
              {/* With reduced motion there is no autoplay, so the loop is never fetched. */}
              {wanted[p.slug] && !reducedMotion && <source src={p.media.loop} type="video/mp4" />}
            </video>
          </div>
          <div className="tile-label">
            <span className="label">{p.number}</span>
            <h3 className="h3 tile-name">
              {/*
                The link is the project's name, read as "Halverd, case study". It
                stretches over the whole tile (see .tile-link::after), so the
                media and the label are all one click target.
              */}
              <FloodLink
                direction="in"
                project={p.slug}
                href={`/work/${p.slug}`}
                className="tile-link"
                onFocus={(e) => e.currentTarget.matches(":focus-visible") && activate(p.slug)}
                onBlur={() => activate(null)}
              >
                {p.name}
                <span className="sr-only">, case study</span>
              </FloodLink>
            </h3>
            <span className="label">{p.year}</span>
            <span className="tile-line muted">{p.line}</span>
            <span className="tile-foot">
              <span className="label muted">{p.stack.join(" · ")}</span>
              <span className="label tile-view" aria-hidden="true">
                View case →
              </span>
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
