"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/css";

const SEAM = 0.5; // seconds of fade at the end of each loop

/**
 * Background video: fades the page in once data is ready (`is-ready` on <body>), keeps the still poster
 * for reduced motion, and dips the clip to black just before it loops so the restart is not a jump cut.
 */
export function useHeroVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const show = () => document.body.classList.add("is-ready");

    if (prefersReducedMotion()) {
      video.removeAttribute("autoplay");
      video.pause();
      show();
      return;
    }

    if (video.readyState >= 2) show();
    else video.addEventListener("loadeddata", show, { once: true });

    // Some browsers block autoplay until muted is set as a property; retry once data is ready.
    video.muted = true;
    video.play().catch(() => video.addEventListener("canplay", () => void video.play(), { once: true }));

    let frame = 0;
    const watch = () => {
      if (video.duration) video.classList.toggle("is-seam", video.duration - video.currentTime < SEAM);
      frame = requestAnimationFrame(watch);
    };
    frame = requestAnimationFrame(watch);

    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("loadeddata", show);
    };
  }, [videoRef]);
}
