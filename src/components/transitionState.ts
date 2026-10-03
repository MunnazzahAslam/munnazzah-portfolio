/**
 * Which project's tile and hero should be paired in the next page transition.
 *
 * Every page could have several tiles on screen, and a case page also shows
 * the next project as a tile, so naming them all would pair the wrong ones
 * (a tile on the home page would fly into the "next project" slot of a case
 * page). Instead only one element is named per transition: the tile that was
 * clicked, or, coming back, the tile of the case being left.
 */
export const transitionState = { returningTo: null as string | null };

export const mediaName = (slug: string) => `media-${slug}`;

/** Name one element for the coming transition; the shared-element morph pairs it with the hero. */
export function nameForTransition(el: HTMLElement | null | undefined, slug: string) {
  if (!el) return;
  el.style.viewTransitionName = mediaName(slug);
  el.style.setProperty("view-transition-class", "morph");
}
