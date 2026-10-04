import type { CaseFile } from "../types";
import { chrome } from "./chrome";
import { jobSearch } from "./job-search";
import { opencam } from "./opencam";
import { wallet } from "./wallet";

// Single list of golden cases, in reading order. The evidence home and each case route both read
// from here, so card copy and case pages cannot drift apart.
export const GOLDEN_CASES: CaseFile[] = [chrome, wallet, opencam, jobSearch];

export function goldenCase(slug: string): CaseFile {
  const c = GOLDEN_CASES.find((x) => x.slug === slug);
  if (!c) throw new Error(`No golden case for slug: ${slug}`);
  return c;
}
