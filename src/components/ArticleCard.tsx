import Link from "next/link";
import type { Ref } from "react";
import { BrandMark } from "./BrandMark";

export interface ArticleCardProps {
  slug: string;
  title: string;
  text?: string;
  topic: string;
  kind: string;
  date: string;
  read: string;
  image: string;
  linkRef?: Ref<HTMLAnchorElement>;
}

/** Insights article card: rounded image, topic, title with arrow, summary and a date line. Links to the article. */
export function ArticleCard({ slug, title, text, topic, kind, date, read, image, linkRef }: ArticleCardProps) {
  return (
    <Link href={`/insights/${slug}`} className="in-card__link" ref={linkRef}>
      <span className="in-card__img">
        <span style={{ backgroundImage: `url(${image})` }} />
      </span>
      <span className="in-card__topic">{topic}</span>
      <span className="in-card__title">
        <h3>{title}</h3>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
      {text && <p className="in-card__text">{text}</p>}
      <span className="in-card__meta">
        <span className="in-card__mark" aria-hidden="true">
          <BrandMark className="in-card__mark-svg" />
        </span>
        {kind} • {date} • {read} read
      </span>
    </Link>
  );
}
