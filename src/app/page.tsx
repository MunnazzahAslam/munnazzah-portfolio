import { ViewTransition } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkIndex from "@/components/WorkIndex";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

/** Home: her name, one sentence, and four grey projects waiting to be touched. */
export default function Home() {
  return (
    // Opening a project floods its colour over this page, which stays still
    // underneath; coming back, the colour shrinks away to reveal it again.
    <ViewTransition
      enter={{ "flood-out": "flood-under", default: "none" }}
      exit={{ "flood-in": "flood-under", default: "none" }}
      default="none"
    >
      <div className="page">
      <Header />
      <main id="main">
        <section className="wrap hero">
          {/* Two fixed lines: left to wrap, the name broke differently before and after the font loaded. */}
          <h1 className="display">
            {profile.name.split(" ").map((word) => (
              <span key={word} className="display-line">
                {word}
              </span>
            ))}
          </h1>
          <p className="h2 hero-line">{profile.positioning}</p>
          <ul className="hero-meta label">
            {profile.status.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        {/* Names only: logos would bring in colour. */}
        <section className="wrap" aria-label="Previously at">
          <div className="rule previously label">
            <span className="muted">Previously</span>
            <span>{profile.previously.join(", ")}</span>
          </div>
        </section>

        <section className="wrap section" id="work" aria-labelledby="work-title">
          <div className="rule work-head label">
            <h2 id="work-title" className="label">
              Work
            </h2>
            <span className="muted">01 – {String(projects.length).padStart(2, "0")}</span>
          </div>
          <WorkIndex projects={projects} />
        </section>

        <section className="wrap" aria-label="Strengths">
          <ul className="grid strengths">
            {profile.strengths.map((s) => (
              <li key={s.name}>
                <h2 className="h2">{s.name}</h2>
                <p className="muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      </div>
    </ViewTransition>
  );
}
