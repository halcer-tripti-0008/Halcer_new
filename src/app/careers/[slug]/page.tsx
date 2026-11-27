import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { JobApplyForm, ShareJob } from "@/components/JobApplyForm";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { CAREERS_EMAIL, JOB_DETAILS, PRACTICES, ROLES, getRole } from "@/data/careers";
import { cssVars } from "@/lib/css";
import "../careers.css";
import "./job.css";

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const role = getRole((await params).slug);
  return role ? { title: `${role.title} — Careers at Halcer`, description: role.text } : {};
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const role = getRole((await params).slug);
  if (!role) notFound();
  const detail = JOB_DETAILS[role.slug];
  const practice = PRACTICES.find((p) => p.id === role.practice)?.label ?? role.tag;

  return (
    <>
      <SiteHeader active="Careers" />
      <main className="careers jb" data-nav-image>
        {/* banner photo */}
        <div className="jb-banner" aria-hidden="true" />

        <div className="jb-wrap">
          <span className="jb-logo" aria-hidden="true">
            <BrandMark className="jb-logo__svg" />
          </span>

          <div className="jb-grid">
            <article className="jb-main">
              <nav className="jb-crumb reveal" aria-label="Breadcrumb" style={cssVars({ "--d": 0 })}>
                <Link href="/careers">Careers</Link>
                <span aria-hidden="true">/</span>
                <span>{practice}</span>
              </nav>
              <p className="jb-company reveal" style={cssVars({ "--d": 0 })}>
                Halcer
              </p>
              <h1 className="jb-title reveal" style={cssVars({ "--d": 1 })}>
                {role.title}
              </h1>
              <div className="jb-chips reveal" style={cssVars({ "--d": 2 })}>
                <span className="jb-chip">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 8h16v11H4zM9 8V5h6v3" />
                  </svg>
                  {role.type}
                </span>
                <span className="jb-chip">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z" />
                    <circle cx="12" cy="10" r="2" />
                  </svg>
                  {role.location}
                </span>
                <span className="jb-chip jb-chip--blue">{practice}</span>
                <span className="jb-chip">{role.tier}</span>
                <ShareJob title={role.title} />
              </div>

              <div className="jb-body reveal" style={cssVars({ "--d": 3 })}>
                <p>{role.text}</p>
                {detail?.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}

                {detail && (
                  <>
                    <h2>What you&rsquo;ll do</h2>
                    <ul>
                      {detail.responsibilities.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <h2>What we look for</h2>
                    <ul>
                      {detail.requirements.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    {detail.niceToHave && (
                      <>
                        <h2>Nice to have</h2>
                        <ul>
                          {detail.niceToHave.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </>
                )}

                <h2>What you get</h2>
                <ul>
                  <li>Competitive equity participation and private healthcare.</li>
                  <li>A custom workstation budget and generous lab compute for R&amp;D.</li>
                  <li>Time for open-source contributions, patents and research.</li>
                </ul>
                <p className="jb-note">
                  Questions about the role? Email{" "}
                  <a href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Question: ${role.title}`)}`}>
                    {CAREERS_EMAIL}
                  </a>
                  .
                </p>
              </div>
            </article>

            <aside className="jb-side reveal" style={cssVars({ "--d": 2 })} aria-label="Apply for this role">
              <JobApplyForm role={role.slug} roleTitle={role.title} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
