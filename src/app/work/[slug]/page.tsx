import type { CSSProperties } from "react";
import { ViewTransition } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseHero from "@/components/CaseHero";
import PaletteDrain from "@/components/PaletteDrain";
import WorkIndex from "@/components/WorkIndex";
import { caseBody, findProject, nextProject, projects, type Project } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project ? { title: `${project.name}, case study`, description: project.summary } : {};
}

/** The project's palette as custom properties; the CSS maps them onto the page's colour tokens. */
function paletteStyle({ palette }: Project): CSSProperties {
  const vars: Record<string, string> = {
    "--p-bg": palette.bg,
    "--p-ink": palette.ink,
    "--p-accent": palette.accent,
    "--p-rule": palette.rule,
    "--p-muted": palette.muted,
  };
  palette.flavours?.forEach((f, i) => {
    vars[`--flavour-${i + 1}`] = f.bg;
    vars[`--flavour-${i + 1}-ink`] = f.ink;
  });
  return vars as CSSProperties;
}

/**
 * A case study. The whole page wears the project's palette (set on
 * data-project, read through tokens), arrives as a flood of colour from the
 * click, and drains back to black and white before the next project.
 */
export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const project = findProject((await params).slug);
  if (!project) notFound();
  const body = caseBody(project.slug);
  const next = nextProject(project);

  return (
    <ViewTransition
      enter={{ "flood-in": "flood-in", "flood-out": "flood-under", default: "none" }}
      exit={{ "flood-in": "flood-under", "flood-out": "flood-out", default: "none" }}
      default="none"
    >
      <div className="project" data-project={project.slug} data-dark={project.palette.dark ? "" : undefined} style={paletteStyle(project)}>
        <Header current="work" inCase={project.slug} />
        <main id="main">
          <section className="case-section case-title" aria-labelledby="case-name">
            <div className="wrap">
              <p className="label">{project.number}</p>
              <h1 id="case-name" className="display">
                {project.name}
              </h1>
              <p className="h2 case-summary">{project.summary}</p>
              <ul className="case-meta label">
                <li>{project.role}</li>
                <li>{project.year}</li>
                <li>{project.stack.join(" · ")}</li>
                <li>{project.live ? <a href={project.live} className="link">Live site</a> : project.status}</li>
              </ul>
            </div>
          </section>

          <CaseHero project={project} />

          {body}

          <PaletteDrain />

          <section className="wrap next-project" aria-labelledby="next-title">
            <div className="rule work-head label">
              <h2 id="next-title" className="label">
                Next project
              </h2>
              <span className="muted">{next.number}</span>
            </div>
            <WorkIndex projects={[next]} className="tiles-single" />
          </section>
        </main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
