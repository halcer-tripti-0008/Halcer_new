"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { prefersReducedMotion } from "@/lib/css";

export function Who() {
  const [ref, inView] = useInView<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reduced motion: the video stays on its first frame.
  useEffect(() => {
    if (prefersReducedMotion()) videoRef.current?.pause();
  }, []);

  return (
    <section ref={ref} className={`who${inView ? " is-inview" : ""}`} id="who" aria-labelledby="who-title">
      <span className="who__frame who__frame--top" aria-hidden="true" />
      <span className="who__frame who__frame--left" aria-hidden="true" />
      <span className="who__frame who__frame--right" aria-hidden="true" />
      <span className="who__frame who__frame--bottom" aria-hidden="true" />

      <div className="who__inner">
        <div className="who__copy">
          <h2 className="who__title" id="who-title">
            <span className="line">
              <span>Who we</span>
            </span>
            <span className="line line--last">
              <span>
                <span className="who__outline">are ?</span>
              </span>
              <Link className="who__arrow" href="/services" aria-label="Explore our services" data-magnetic>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 7l10 10M17 8v9H8" />
                </svg>
              </Link>
            </span>
          </h2>

          <p className="who__tagline">
            Consulting <span aria-hidden="true">|</span> Engineering <span aria-hidden="true">|</span> Training
          </p>

          <div className="who__text">
            <p>
              We are living in a fundamentally New World &ndash; a world where AI is changing not only the rules of the
              game, but the game itself in real time.
            </p>
            <p>
              At Halcer, AI is in our DNA. We lead with responsible AI to shape a future grounded in a deep commitment
              to the human experience, driven by our core values. We collaborate with our clients and across our partner
              ecosystem to enable bold industry disruptions, accelerate innovation, deliver operational excellence, and
              secure sustainable competitive advantage. Through our Consulting, Software Engineering, and Training
              expertise, we help businesses be AI-first and future-ready.
            </p>
          </div>
        </div>

        <div className="who__visual">
          <span className="who__block" aria-hidden="true">
            <video
              ref={videoRef}
              className="who__video"
              src="/assets/video/who-video-hd.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="who__photo"
            src="/assets/images/who/who-photo.jpg"
            alt="Hands typing on a laptop showing a grid of images"
            width={1400}
            height={824}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
