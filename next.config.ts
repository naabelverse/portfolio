import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

import { resumeAnalyzer } from "./content/ai-resume-analyzer";
import { forgeroom } from "./content/forgeroom";
import * as site from "./content/site";

/** Every string under `value` that contains TODO, as `path: "text"`. */
function findTodos(value: unknown, path: string): string[] {
  if (typeof value === "string") return value.includes("TODO") ? [`${path}: "${value}"`] : [];
  if (Array.isArray(value)) return value.flatMap((item, i) => findTodos(item, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => findTodos(item, `${path}.${key}`));
  }
  return [];
}

export default function config(phase: string): NextConfig {
  // A placeholder must never reach production. Dev is left alone so copy
  // can be edited with TODOs in flight.
  if (phase === PHASE_PRODUCTION_BUILD) {
    const todos = [
      ...findTodos(site, "content/site.ts"),
      ...findTodos(forgeroom, "content/forgeroom.ts forgeroom"),
      ...findTodos(resumeAnalyzer, "content/ai-resume-analyzer.ts resumeAnalyzer"),
    ];
    if (todos.length > 0) {
      throw new Error(
        `Build blocked: ${todos.length} TODO placeholder(s) in site content. Replace or empty each one:\n  ${todos.join("\n  ")}`,
      );
    }
  }
  return {};
}
