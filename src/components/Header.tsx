import Link from "next/link";
import { profile } from "@/content/profile";
import FloodLink from "./FloodLink";

/**
 * The same minimal header on every page: her name on the left; Work, About and
 * CV on the right. On a case study, the name and Work lead back to the work
 * index and run the colour flood in reverse.
 */
export default function Header({ current, inCase }: { current?: "work" | "about"; inCase?: string }) {
  return (
    <header className="wrap">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="header">
        <HomeLink inCase={inCase} href="/" className="header-name">
          {profile.name}
        </HomeLink>
        <nav aria-label="Main">
          <ul>
            <li>
              <HomeLink inCase={inCase} href="/#work" aria-current={current === "work" ? "page" : undefined}>
                Work
              </HomeLink>
            </li>
            <li>
              <Link href="/about" aria-current={current === "about" ? "page" : undefined}>
                About
              </Link>
            </li>
            <li>
              {/* A plain link: the CV is a PDF, not a page. */}
              <a href="/cv.pdf">CV</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/** A link home. From a case study it runs the colour flood in reverse, back into that project's tile. */
function HomeLink({ inCase, ...props }: React.ComponentProps<typeof Link> & { inCase?: string }) {
  return inCase ? <FloodLink direction="out" project={inCase} {...props} /> : <Link {...props} />;
}
