import type { MDXComponents } from "mdx/types";
import { Brief, Decision, Decisions, Engineering, Feature, Features } from "@/components/CaseParts";

const components: MDXComponents = { Brief, Features, Feature, Decisions, Decision, Engineering };

export function useMDXComponents(): MDXComponents {
  return components;
}
