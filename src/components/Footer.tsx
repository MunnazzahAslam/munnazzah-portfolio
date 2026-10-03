import { profile } from "@/content/profile";

/** Contact sits at the foot of every page; there is no separate contact page. */
export default function Footer() {
  return (
    <footer className="wrap">
      <div className="rule footer">
        <h2 className="h1">Let&rsquo;s talk</h2>
        <a href={`mailto:${profile.email}`} className="footer-email link">
          {profile.email}
        </a>
        <div className="footer-links rule">
          <ul>
            {profile.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="link" rel="me noopener">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="label muted">
            {profile.name} · {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
