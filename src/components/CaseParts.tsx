import Image from "next/image";
import type { ReactNode } from "react";

/**
 * The building blocks a case study's MDX is written with. Each one is a
 * section of the page, in the order the brief sets: the brief, what I built,
 * decisions, engineering. They only read colour tokens, never colours.
 */

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="case-section" aria-labelledby={id}>
      <div className="wrap grid case-section-inner">
        <h2 id={id} className="label case-section-title">
          {title}
        </h2>
        <div className="case-section-body">{children}</div>
      </div>
    </section>
  );
}

export function Brief({ children }: { children: ReactNode }) {
  return (
    <Section id="brief" title="The brief">
      <div className="h2 case-brief">{children}</div>
    </Section>
  );
}

export function Features({ children }: { children: ReactNode }) {
  return (
    <Section id="built" title="What I built">
      <ul className="features">{children}</ul>
    </Section>
  );
}

export function Feature({ title, image, alt, children }: { title: string; image: string; alt: string; children: ReactNode }) {
  return (
    <li className="feature">
      <div className="feature-media">
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" />
      </div>
      <h3 className="h3">{title}</h3>
      <div className="muted">{children}</div>
    </li>
  );
}

export function Decisions({ children }: { children: ReactNode }) {
  return (
    <Section id="decisions" title="Decisions">
      <ol className="decisions">{children}</ol>
    </Section>
  );
}

export function Decision({ n, title, tradeoff, children }: { n: string; title: string; tradeoff: string; children: ReactNode }) {
  return (
    <li className="decision">
      <span className="label decision-n">{n}</span>
      <div>
        <h3 className="h3">{title}</h3>
        <div className="body decision-body">{children}</div>
        <p className="body decision-tradeoff">
          <span className="label">Trade-off</span> {tradeoff}
        </p>
      </div>
    </li>
  );
}

/** Stack, a small flow diagram drawn in the palette, and notes (performance and accessibility). */
export function Engineering({ stack, flow, children }: { stack: string[]; flow: string[]; children: ReactNode }) {
  return (
    <Section id="engineering" title="Engineering">
      <ul className="stack label">
        {stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <ol className="flow" aria-label="How a request moves through the system">
        {flow.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="body engineering-notes">{children}</div>
    </Section>
  );
}
