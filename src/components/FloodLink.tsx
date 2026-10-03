"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { nameForTransition, transitionState } from "./transitionState";

/**
 * A link that opens or leaves a case study with the colour flood.
 *
 * The flood is a circle growing from the click point (see "Colour flood" in
 * globals.css), so the point is written to the page as --flood-x / --flood-y
 * just before React starts the view transition. Leaving a case study shrinks
 * the colour back towards the point the visitor came from, kept for the visit.
 */
type Props = ComponentProps<typeof Link> & {
  direction: "in" | "out";
  /** The project opened (in) or left (out), so its tile and hero can be paired. */
  project?: string;
};

const KEY = "flood-origin";

export function setFloodOrigin(x: string, y: string) {
  const root = document.documentElement.style;
  root.setProperty("--flood-x", x);
  root.setProperty("--flood-y", y);
  // The circle ends exactly at the farthest corner of the screen, so the
  // colour is still visibly spreading for the whole 700ms.
  const px = (v: string, size: number) => (v.endsWith("%") ? (parseFloat(v) / 100) * size : parseFloat(v));
  const cx = px(x, window.innerWidth);
  const cy = px(y, window.innerHeight);
  const r = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
  root.setProperty("--flood-r", `${Math.ceil(r)}px`);
}

export default function FloodLink({ direction, project, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      transitionTypes={[direction === "in" ? "flood-in" : "flood-out"]}
      onClick={(e) => {
        if (direction === "in") {
          // A keyboard "click" has no pointer position; flood from the link itself.
          const box = e.currentTarget.getBoundingClientRect();
          const x = e.clientX || box.left + box.width / 2;
          const y = e.clientY || box.top + box.height / 2;
          const origin = { x: `${Math.round(x)}px`, y: `${Math.round(y)}px` };
          setFloodOrigin(origin.x, origin.y);
          try {
            sessionStorage.setItem(KEY, JSON.stringify(origin));
          } catch {}
          // Only the clicked tile is paired with the hero it grows into.
          if (project) nameForTransition(e.currentTarget.closest(".tile")?.querySelector<HTMLElement>(".tile-media"), project);
        } else {
          let origin = { x: "50%", y: "40%" };
          try {
            origin = JSON.parse(sessionStorage.getItem(KEY) ?? "") ?? origin;
          } catch {}
          setFloodOrigin(origin.x, origin.y);
          // The home page names this project's tile as it renders, so the hero shrinks back into it.
          transitionState.returningTo = project ?? null;
        }
        onClick?.(e);
      }}
    />
  );
}
