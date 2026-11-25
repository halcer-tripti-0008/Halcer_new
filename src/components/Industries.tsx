"use client";

import { useRef } from "react";
import { INDUSTRIES } from "@/data/industries";
import { useInView } from "@/hooks/useInView";
import { useStackingPanels } from "@/hooks/useStackingPanels";
import { cssVars } from "@/lib/css";

/** Six panels that pin and stack while scrolling (CSS sticky; the hook adds the receding-stack effect). */
export function Industries() {
  const [inViewRef, inView] = useInView<HTMLElement>();
  const sectionRef = useRef<HTMLElement | null>(null);
  useStackingPanels(sectionRef);

  return (
    <section
      ref={(el) => {
        inViewRef.current = el;
        sectionRef.current = el;
      }}
      className={`ind${inView ? " is-inview" : ""}`}
      id="industries"
      aria-labelledby="ind-heading"
    >
      <h2 className="ind__heading" id="ind-heading">
        <span>Industries</span>
      </h2>

      <ol className="ind__stack">
        {INDUSTRIES.map((industry, i) => (
          <li key={industry.image} className="ind__card" style={cssVars({ "--i": i })}>
            <div className="ind__copy">
              <span className="ind__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="ind__name">
                {industry.name.map(({ text, muted }) => (
                  <span key={text} className={muted ? "ind__muted" : undefined}>
                    {text}
                  </span>
                ))}
              </h3>
              <p className="ind__desc">{industry.description}</p>
              <a className="ind__link" href="#" aria-label={`Explore ${industry.label}`}>
                <span>Explore</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </a>
            </div>
            <div className="ind__visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="ind__photo"
                src={`/assets/images/industries/${industry.image}.jpg`}
                alt={industry.alt}
                width={industry.width}
                height={industry.height}
                loading="lazy"
                decoding="async"
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
