import type { Metadata } from "next";
import { CareersBoard, CopyEmail } from "@/components/CareersBoard";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { CAREERS_EMAIL, OPEN_APPLICATION, OPERATE, OPERATE_HEAD } from "@/data/careers";
import { cssVars } from "@/lib/css";
import "./careers.css";

export const metadata: Metadata = {
  title: "Careers — Halcer",
  description: "High-impact engineering and leadership roles across AI & GenAI, platforms, cloud and delivery.",
};

export default function CareersPage() {
  const o = OPEN_APPLICATION;
  return (
    <>
      <SiteHeader active="Careers" />
      <main className="careers" data-nav-image>
        <CareersBoard />

        {/* 4. How we operate (light) */}
        <section className="cr-operate">
          <header className="cr-head cr-head--center reveal">
            <p className="cr-eyebrow">{OPERATE_HEAD.eyebrow}</p>
            <h2>{OPERATE_HEAD.title}</h2>
            <p>{OPERATE_HEAD.text}</p>
          </header>
          <ul className="cr-operate__grid">
            {OPERATE.map((c, i) => (
              <li key={c.n} className="cr-principle reveal" style={cssVars({ "--d": i })}>
                <span className="cr-principle__n">{c.n}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="cr-principle__tag">{c.tag}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Open application (dark) */}
        <section className="cr-open">
          <div className="cr-open__card reveal">
            <div>
              <p className="cr-eyebrow">{o.eyebrow}</p>
              <h2>{o.title}</h2>
              <p>{o.text}</p>
            </div>
            <div className="cr-open__actions">
              <a
                className="cr-btn"
                href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Open application")}`}
              >
                {o.cta}
              </a>
              <CopyEmail />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
