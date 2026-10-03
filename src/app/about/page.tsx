import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: "Experience, skills, education and contact for Munnazzah Aslam, senior frontend engineer.",
};

/** About: pure black and white, set like a well-made CV. The page a recruiter prints. */
export default function About() {
  return (
    <>
      <Header current="about" />
      <main id="main" className="wrap">
        <h1 className="h1" style={{ paddingTop: "var(--s-48)" }}>
          About
        </h1>

        <section className="grid about-intro" aria-label="Introduction">
          {/* The one photo on the site, and it stays grey (see .portrait). */}
          <div className="portrait">
            <Image src="/about/munnazzah-aslam-portrait.jpg" alt="Munnazzah Aslam" fill sizes="(min-width: 1024px) 420px, 100vw" preload />
          </div>
          <div className="about-copy">
            {profile.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "h2" : "body"} style={i === 1 ? { marginTop: "var(--s-32)" } : undefined}>
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="grid about-section rule" aria-labelledby="experience">
          <h2 id="experience" className="label">
            Experience
          </h2>
          <ol className="rows about-body">
            {profile.experience.map((e) => (
              <li key={e.company}>
                <span className="label row-years">{e.years}</span>
                <div>
                  <p className="row-what">
                    {e.company} <span className="muted">· {e.title}</span>
                  </p>
                  <p className="muted body">{e.impact}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid about-section rule" aria-labelledby="skills">
          <h2 id="skills" className="label">
            Skills
          </h2>
          <ul className="skills about-body">
            {profile.skills.map((s) => (
              <li key={s.name}>
                <h3 className="row-what">{s.name}</h3>
                <p className="muted">{s.items.join(", ")}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid about-section rule" aria-labelledby="education">
          <h2 id="education" className="label">
            Education
          </h2>
          <ol className="rows about-body">
            {profile.education.map((e) => (
              <li key={e.what}>
                <span className="label row-years">{e.years}</span>
                <div>
                  <p className="row-what">{e.what}</p>
                  <p className="muted">{e.where}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid about-section rule" aria-labelledby="languages">
          <h2 id="languages" className="label">
            Languages
          </h2>
          <p className="about-body">{profile.languages.join(", ")}</p>
        </section>

        <section className="grid about-section rule" aria-labelledby="contact">
          <h2 id="contact" className="label">
            Contact
          </h2>
          <div className="about-body">
            <ul className="contact-list">
              <li>
                <a href={`mailto:${profile.email}`} className="link">
                  {profile.email}
                </a>
              </li>
              {profile.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link" rel="me noopener">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="/cv.pdf" className="button">
              Download CV
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
