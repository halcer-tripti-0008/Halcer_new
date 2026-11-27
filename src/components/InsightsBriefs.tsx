"use client";

import { useEffect, useRef, useState } from "react";
import { BRIEFS, BRIEFS_INITIAL, BRIEFS_STEP } from "@/data/insights";
import { ArticleCard } from "./ArticleCard";

/** Insights article grid (3 per row): shows the first row, "Load more" reveals the next batch. */
export function InsightsBriefs() {
  const [shown, setShown] = useState(Math.min(BRIEFS_INITIAL, BRIEFS.length));
  const [revealFrom, setRevealFrom] = useState<number | null>(null);
  const firstNew = useRef<HTMLAnchorElement | null>(null);
  const left = BRIEFS.length - shown;

  // After revealing, move keyboard focus to the first new article so it's announced and reachable.
  useEffect(() => {
    if (revealFrom !== null) firstNew.current?.focus({ preventScroll: true });
  }, [revealFrom]);

  const more = () => {
    setRevealFrom(shown);
    setShown((n) => Math.min(n + BRIEFS_STEP, BRIEFS.length));
  };

  return (
    <>
      <ul className="in-grid">
        {BRIEFS.slice(0, shown).map((b, i) => {
          const isNew = revealFrom !== null && i >= revealFrom;
          return (
            <li
              key={b.n}
              className={`in-card${i < BRIEFS_INITIAL ? " reveal" : ""}${isNew ? " is-new" : ""}`}
              style={
                isNew
                  ? { animationDelay: `${(i - revealFrom) * 110}ms` }
                  : ({ "--d": i % 3 } as React.CSSProperties)
              }
            >
              <ArticleCard
                slug={b.slug}
                title={b.title}
                text={b.text}
                topic={b.topic ?? b.kind}
                kind={b.kind}
                date={b.date}
                read={b.read}
                image={b.image}
                linkRef={i === revealFrom ? firstNew : undefined}
              />
            </li>
          );
        })}
      </ul>

      {left > 0 && (
        <div className="in-more">
          <button type="button" className="in-more__btn" onClick={more}>
            Load more articles
          </button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {revealFrom !== null ? `Showing ${shown} of ${BRIEFS.length} articles` : ""}
      </p>
    </>
  );
}
