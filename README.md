# Munnazzah Aslam · Portfolio

**Only the work is in colour.**

The site is strictly black and white. The only colour on it is the work: hover a project and it
comes alive in colour; open it and the whole screen takes on that project's palette.

## Status

Built so far, of the five passes in the brief:

1. **Foundations.** Tokens, type, grid, header, footer, the about page, the 404 page, the CV.
2. **Home and tiles.** The work index with its hover, focus, touch and reduced-motion states,
   and the video loading rules.
3. **Case template and colour.** The colour flood, the four palettes, the drain at the end of a
   case, and the next-project handoff.

Still to come: final copy for the case studies (4: the Oravie, Stielvoll and Duneline decisions
are drafts) and the launch pass with share images, structured data and analytics (5).

## The colour rule

One rule governs every screen: **if it is not the work, it is black, white or grey.**

| Token | Value | Used for |
| --- | --- | --- |
| `--ink` | `#0A0A0A` | All text, rules, buttons, focus rings |
| `--paper` | `#FFFFFF` | Page background |
| `--grey-600` | `#595959` | Secondary text (7:1 on paper) |
| `--grey-300` | `#BDBDBD` | Hairlines and borders only, never text |
| `--grey-100` | `#F2F2F2` | Quiet surfaces, placeholders |

These five live at the top of `src/app/globals.css`, and they are the only colour values in the
stylesheet.

- **Allowed to carry colour:** project videos and images, once hovered, focused or opened.
- **Never in colour:** links, buttons, hover states, focus rings, the text selection (ink
  background, white text), the favicon, and the about page, including its portrait.
- **The grey state is a real grayscale** (`filter: grayscale(1) contrast(1.06)`), not a dimmed or
  tinted image. Posters are stored once, in colour, and the grey comes from CSS, so one file
  serves both states.
- **Only one project is in colour at a time.** The active project is held in one place
  (`WorkIndex`), not in each tile.

## How a tile behaves

| State | What happens |
| --- | --- |
| Resting | Grayscale poster. The video has not been downloaded. |
| Pointer rests for 120 ms | Colour rises over 600 ms; the muted loop is fetched and plays from the poster frame. The name gets an ink underline and "View case" appears. |
| Pointer leaves | The video pauses and colour drains over 400 ms. |
| Keyboard focus | The same as hover, plus a 2 px ink ring, offset by 4 px. |
| Touch screens | The tile nearest the middle of the screen is the one in colour as you scroll. A tap opens the case. |
| Reduced motion | No video is fetched. Colour still arrives, as a 150 ms fade on the still frame. |

## Opening a project

Opening a project floods the screen with its palette; the end of the case drains it back to black
and white.

- **The flood.** A click on a tile starts a view transition (React's `<ViewTransition>`, tagged
  `flood-in`). The case page arrives as a circle of its colour growing from the click point to the
  farthest corner of the screen over 700 ms, while the clicked tile grows into the case hero.
  Only the clicked tile is paired with the hero (`transitionState.ts`); other tiles stay put.
- **Back.** The header's name and Work link run it in reverse (`flood-out`): the colour shrinks
  towards the point it came from and the hero shrinks back into its tile. The browser's back
  button swaps pages without the flood.
- **Palettes.** Each case's MDX frontmatter holds its palette. The page sets it as `--p-*`
  properties on `data-project`, and the CSS points the semantic tokens (`--c-bg`, `--c-ink`,
  `--c-rule`…) at them. No component knows about colour.
- **The drain.** Over the last 300 px before "Next project", `PaletteDrain` sets `--drain` from 0
  to 1 and every palette colour is mixed towards black or white. Duneline, the one dark palette,
  switches its text at the halfway point rather than passing through grey on grey.
- **Reduced motion.** No growing tile; the flood becomes a 200 ms cross-fade, and the drain
  switches at the halfway point.

| Project | Background | Ink | Accent | Notes |
| --- | --- | --- | --- | --- |
| Halverd | Pearl `#F7F5F0` | Onyx `#1C1D21` | Gold `#8C6A33`, champagne rules `#B8955A` | |
| Oravie | White | Navy `#0B2545` | Clinic blue `#1F5FBF` | From Oravie's own tokens |
| Stielvoll | A flavour per section | Plum `#2A1630` | | Body text on white stickers: plum on strawberry and blueberry is under 4.5:1 |
| Duneline | Night `#0B0D12` | Warm `#F4EFE6` | Gold `#C9A86A`, dusk rules `#E08A4F` | The only dark page; white focus ring |

## Type, space and grid

- **Type.** Geist for display and body, Geist Mono for labels; both served from the site as
  variable woff2 (through `next/font`). Display, H1, H2, body and label sizes are classes in
  `globals.css` and scale with `clamp()`.
- **Space.** A 4 px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 (`--s-4` … `--s-192`).
- **Grid.** 4 columns with 16 px gutters and 20 px margins on phones; 12 columns with 24 px
  gutters and 48 px margins from 1024 px, up to 1440 px wide.
- **Hairlines.** 1 px ink rules between sections. No cards, no shadows, and no rounded corners
  except the project media (8 px).
- **Motion.** Reserved for colour arriving and leaving. Two curves, `--ease-out` and
  `--ease-in-out`.

## Content

| Path | What |
| --- | --- |
| `src/content/profile.ts` | Everything the site says about Munnazzah: positioning, experience, skills, education, contact. The about page reads it, and the CV PDF will too, so they can't disagree. |
| `src/content/work/*.mdx` | The four case studies: frontmatter (palette, stack, year, media) and the written sections, using the components in `src/components/CaseParts.tsx`. |
| `src/content/projects.ts` | Puts the four case studies in order. |
| `public/work/<project>/` | `poster.jpg` (in colour), `loop.mp4` (7 s, 720p, no audio, starts on the poster frame), `hero-1080.mp4` / `hero-720.mp4` (the full flow) and `feature-*.jpg`. |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Built with Next.js (App Router, static pages) and plain CSS custom properties.
