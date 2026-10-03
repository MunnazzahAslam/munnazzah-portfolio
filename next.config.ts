import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    // Posters are stored once, in colour, as JPEG; visitors get AVIF (or WebP).
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
};

// Case studies are MDX with YAML frontmatter (palette, stack, year, media),
// exported as `frontmatter`. Plugins are named as strings so Turbopack can load them.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
  },
});

export default withMDX(nextConfig);
