import type { CSSProperties } from "react";

/** Inline style that sets CSS custom properties (e.g. `--d`, `--n`) next to normal properties. */
export const cssVars = (vars: Record<string, string | number>): CSSProperties => vars as CSSProperties;

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
