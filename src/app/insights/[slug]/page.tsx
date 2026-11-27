import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { BrandMark } from "@/components/BrandMark";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { ARTICLES, getArticle } from "@/data/articles";
import { cssVars } from "@/lib/css";
import "../insights.css";
import "./article.css";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article ? { title: `${article.title} — Halcer Insights`, description: article.summary } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const latest = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <SiteHeader active="Insights" />
      {/* `insights` class: shares the Insights page's light header and article-card styles */}
      <main className="insights ar">
        <article className="ar-wrap">
          <nav className="ar-crumb reveal" aria-label="Breadcrumb" style={cssVars({ "--d": 0 })}>
            <Link href="/insights">Insights</Link>
            <span aria-hidden="true">/</span>
            <span>{article.topic}</span>
          </nav>
          <h1 className="ar-title reveal" style={cssVars({ "--d": 1 })}>
            {article.title}
          </h1>

          <div className="ar-grid">
            <div className="ar-main">
              <div className="ar-img reveal" style={cssVars({ "--d": 2 })}>
                <span style={{ backgroundImage: `url(${article.image})` }} />
              </div>

              <div className="ar-body reveal" style={cssVars({ "--d": 3 })}>
                {article.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {article.sections.map((s, i) => (
                  <section key={s.heading}>
                    <h2>
                      <span>{i + 1}.</span> {s.heading}
                    </h2>
                    {s.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </section>
                ))}
                {article.closing && <p className="ar-closing">{article.closing}</p>}
              </div>
            </div>

            <aside className="ar-side reveal" style={cssVars({ "--d": 3 })}>
              <div className="ar-side__block">
                <p className="ar-side__label">Category</p>
                <ul className="ar-tags">
                  <li>{article.kind}</li>
                  <li>{article.topic}</li>
                </ul>
              </div>
              <div className="ar-side__block">
                <p className="ar-side__label">Written by</p>
                <div className="ar-author">
                  <span className="ar-author__mark" aria-hidden="true">
                    <BrandMark className="ar-author__svg" />
                  </span>
                  <span>
                    <strong>Halcer Insights</strong>
                    <small>Editorial team</small>
                  </span>
                </div>
              </div>
              <div className="ar-side__block">
                <p className="ar-side__label">Published</p>
                <p className="ar-side__value">
                  {article.date} · {article.read} read
                </p>
              </div>
              <Link href="/insights" className="ar-back">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 12H6M11 6l-6 6 6 6" />
                </svg>
                All articles
              </Link>
            </aside>
          </div>
        </article>

        <section className="ar-latest" aria-labelledby="ar-latest-title">
          <div className="ar-latest__head reveal">
            <div>
              <p className="ar-latest__eyebrow">Blog and articles</p>
              <h2 id="ar-latest-title">Latest insights and trends</h2>
            </div>
            <Link href="/insights" className="ar-latest__all">
              View all articles
            </Link>
          </div>
          <ul className="in-grid">
            {latest.map((a, i) => (
              <li key={a.slug} className="in-card reveal" style={cssVars({ "--d": i })}>
                <ArticleCard
                  slug={a.slug}
                  title={a.title}
                  text={a.summary}
                  topic={a.topic}
                  kind={a.kind}
                  date={a.date}
                  read={a.read}
                  image={a.image}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
