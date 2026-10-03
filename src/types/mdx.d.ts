declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { CaseFrontmatter } from "@/content/case";

  export const frontmatter: CaseFrontmatter;
  export default function MDXContent(props: MDXProps): React.JSX.Element;
}
