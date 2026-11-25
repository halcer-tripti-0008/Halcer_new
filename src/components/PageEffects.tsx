"use client";

import { useEffect } from "react";

/**
 * Page-level switches the CSS relies on: `js` on <html>, and `is-loaded` on <body> once fonts are ready
 * (or after 1.2s), which starts the load reveal.
 */
export function PageEffects() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    let timer = 0;
    const reveal = () => {
      // A short timeout (not rAF) guarantees the hidden state has painted before the reveal starts.
      timer = window.setTimeout(() => document.body.classList.add("is-loaded"), 50);
    };
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(reveal);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
