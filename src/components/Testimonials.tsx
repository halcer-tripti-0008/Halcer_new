"use client";

import { useRef } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import { useInView } from "@/hooks/useInView";
import { useJourneyStack } from "@/hooks/useJourneyStack";

/**
 * Testimonial cards move between a grid and an overlapping stack.
 * PLACEHOLDER CONTENT: see data/testimonials.ts.
 */
export function Testimonials() {
  const [ref, inView] = useInView<HTMLElement>();
  const cardsRef = useRef<HTMLOListElement>(null);
  useJourneyStack(cardsRef);

  return (
    <section
      ref={ref}
      className={`journey${inView ? " is-inview" : ""}`}
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <header className="journey__head">
        <h2 className="journey__title" id="testimonials-title">
          <span className="line">
            <span>Trusted by</span>
          </span>
          <span className="line line--last">
            <span>
              <span className="journey__outline">our clients</span>
            </span>
          </span>
        </h2>
      </header>

      <ol className="journey__cards" ref={cardsRef}>
        {TESTIMONIALS.map(({ quote, tone }) => (
          <li key={quote} className={`jcard jcard--${tone}`}>
            <span className="jcard__quote" aria-hidden="true">
              &rdquo;
            </span>
            <blockquote>
              <p>&ldquo;{quote}&rdquo;</p>
            </blockquote>
            <span className="jcard__rule" aria-hidden="true" />
            <span className="jcard__client">
              <strong>Client name</strong>
              <small>Role, Company</small>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
