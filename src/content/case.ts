/** The frontmatter every case study (src/content/work/*.mdx) carries. */
export type CaseFrontmatter = {
  slug: "halverd" | "oravie" | "stielvoll" | "duneline" | "aivik";
  number: string;
  name: string;
  /** One line on the home page tile. */
  line: string;
  /** One line under the title on the case page. */
  summary: string;
  role: string;
  year: string;
  stack: string[];
  /** "Concept project", "Video walkthrough", or a live URL. */
  status: string;
  live?: string;
  /**
   * The project's palette, applied as custom properties on the case page.
   * Every text/background pair is checked to 4.5:1 (see the README).
   */
  palette: {
    bg: string;
    ink: string;
    accent: string;
    rule: string;
    muted: string;
    /** Dark palettes swap the ink to black at the halfway point of the drain. */
    dark?: boolean;
    /** Stielvoll: a new flavour per section, with the heading colour that passes on it. */
    flavours?: { bg: string; ink: string }[];
  };
  media: {
    poster: string;
    loop: string;
    hero1080: string;
    hero720: string;
  };
};
