import { preload } from "react-dom";
import type { Project } from "@/content/projects";
import { mediaName } from "./transitionState";

/**
 * The case study's hero: the full flow, full bleed, in colour, muted, with the
 * browser's own play and pause controls. It shares its name with the project's
 * tile on the home page, so the tile grows into it.
 */
export default function CaseHero({ project }: { project: Project }) {
  // The poster is the largest thing on first paint, so it goes through the
  // image optimiser (AVIF) and is fetched early, rather than as the raw JPEG.
  const poster = `/_next/image?url=${encodeURIComponent(project.media.poster)}&w=1920&q=75`;
  preload(poster, { as: "image", fetchPriority: "high" });

  return (
    <div className="case-hero" style={{ viewTransitionName: mediaName(project.slug), viewTransitionClass: "morph" }}>
        <video controls muted playsInline preload="metadata" poster={poster} width={1920} height={1080} aria-label={`${project.name}: the full flow, without sound`}>
          {/* Phones get the 720p file. */}
          <source src={project.media.hero720} type="video/mp4" media="(max-width: 820px)" />
          <source src={project.media.hero1080} type="video/mp4" />
        </video>
    </div>
  );
}
