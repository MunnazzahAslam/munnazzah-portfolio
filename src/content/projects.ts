/**
 * The five projects, in the order they appear: the first two prove AI in
 * production, the next two visual and interaction craft, and the last is a
 * live site with both.
 *
 * Each case study is an MDX file in ./work whose frontmatter holds its name,
 * palette, stack, year and media; this file only puts them in order.
 */
import Halverd, { frontmatter as halverd } from "./work/halverd.mdx";
import Oravie, { frontmatter as oravie } from "./work/oravie.mdx";
import Stielvoll, { frontmatter as stielvoll } from "./work/stielvoll.mdx";
import Duneline, { frontmatter as duneline } from "./work/duneline.mdx";
import Aivik, { frontmatter as aivik } from "./work/aivik.mdx";
import { createElement } from "react";
import type { CaseFrontmatter } from "./case";

export type Project = CaseFrontmatter;

export const projects: Project[] = [halverd, oravie, stielvoll, duneline, aivik];

const bodies = { halverd: Halverd, oravie: Oravie, stielvoll: Stielvoll, duneline: Duneline, aivik: Aivik };

export const findProject = (slug: string) => projects.find((p) => p.slug === slug) ?? null;

/** The case study's written sections (brief, what I built, decisions, engineering), ready to render. */
export const caseBody = (slug: Project["slug"]) => createElement(bodies[slug]);

/** The project after this one, wrapping round to the first. */
export const nextProject = (p: Project) => projects[(projects.indexOf(p) + 1) % projects.length];
