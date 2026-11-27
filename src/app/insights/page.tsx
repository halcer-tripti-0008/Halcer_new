import type { Metadata } from "next";
import Link from "next/link";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { InsightsBriefs } from "@/components/InsightsBriefs";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { DESK, INSIGHTS_HERO, LEAD_STORY, OUTLOOK } from "@/data/insights";
import "./insights.css";

export const metadata: Metadata = {
  title: "Insights — Halcer",
  description: "Client stories and industry briefs from AI and GenAI programmes that have to ship.",
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export default function InsightsPage() {
  return (
    <>
      <SiteHeader active="Insights" />
      <main className="insights" data-nav-image>
        <section className="in-desk" id="recent">
          {/* Page title for screen readers and search engines (the visible page opens on the featured story) */}
          <h1 className="sr-only">{INSIGHTS_HERO.title}</h1>
          {/* Featured story: large photo card with the text over it */}
          <Link href={`/insights/${LEAD_STORY.slug}`} className="in-featured reveal">
            <span className="in-featured__bg" style={{ backgroundImage: `url(${LEAD_STORY.image})` }} aria-hidden="true" />
            <span className="in-featured__body">
              <span className="in-featured__tag">
                Featured · {LEAD_STORY.section}
              </span>
              <h2>{LEAD_STORY.title}</h2>
              <span className="in-featured__text">{LEAD_STORY.text}</span>
              <span className="in-featured__meta">
                {LEAD_STORY.kind} • {LEAD_STORY.date} • {LEAD_STORY.read} read
              </span>
            </span>
            <span className="in-featured__arrow" aria-hidden="true">
              <Arrow />
            </span>
          </Link>

          <header className="in-desk__head reveal">
            <h2>{DESK.heading}</h2>
            <p>{DESK.note}</p>
          </header>

          <InsightsBriefs />
        </section>

        <section className="in-outlook">
          <div className="in-outlook__copy reveal">
            <p className="in-eyebrow">
              <span>{OUTLOOK.eyebrow}</span>
            </p>
            <h2>{OUTLOOK.title}</h2>
            <p>{OUTLOOK.text}</p>
            <blockquote>{OUTLOOK.quote}</blockquote>
            <a href="mailto:hello@halcer.com?subject=Request%20the%20Outlook%202026%20briefing" className="in-cta">
              {OUTLOOK.cta} <Arrow />
            </a>
          </div>
          <div className="in-outlook__img reveal">
            <span style={{ backgroundImage: `url(${OUTLOOK.image})` }} />
          </div>
        </section>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
