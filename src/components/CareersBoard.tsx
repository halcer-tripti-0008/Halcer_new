"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  CAREERS_EMAIL,
  CAREERS_HERO,
  DOMAINS,
  DOMAINS_HEAD,
  LOCATIONS,
  PRACTICES,
  ROLES,
  ROLES_HEAD,
  type DomainIcon,
  type Practice,
} from "@/data/careers";
import { cssVars } from "@/lib/css";

type Filter = { q: string; practice: Practice | "all"; location: string };
const EMPTY: Filter = { q: "", practice: "all", location: "any" };

const ICONS: Record<DomainIcon, ReactNode> = {
  monitor: <path d="M4 5h16v11H4zM9 20h6M12 16v4" />,
  layers: <path d="M6 10V8a6 6 0 0 1 12 0v2M5 10h14v10H5zM5 15h14" />,
  cloud: <path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 11.1 3.5 3.5 0 0 0 7 18z" />,
  bolt: <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8z" />,
  doc: <path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4" />,
  shield: <path d="M12 21s-8-4-8-10V6l8-3 8 3v5c0 6-8 10-8 10zM9 12l2 2 4-4" />,
  sliders: <path d="M7 4v16M12 4v16M17 4v16M5 9h4M10 15h4M15 7h4" />,
  server: <path d="M4 5h16v6H4zM4 13h16v6H4zM8 8h.01M8 16h.01" />,
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

/** Case-insensitive match at the start of a word ("rust" finds "Rust", not "zero-trust"). */
const matches = (text: string, q: string) =>
  new RegExp(`(^|[^a-z0-9])${q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(text);

/** Hero search, practice-domain cards and the open-roles list, all driven by one filter. */
export function CareersBoard() {
  const [draft, setDraft] = useState<Filter>(EMPTY); // what the search form shows
  const [filter, setFilter] = useState<Filter>(EMPTY); // what the roles list applies

  const roles = useMemo(
    () =>
      ROLES.filter(
        (r) =>
          (filter.practice === "all" || r.practice === filter.practice) &&
          (filter.location === "any" || matches(r.location, filter.location)) &&
          (!filter.q || matches(`${r.title} ${r.text} ${r.tag} ${r.tier}`, filter.q)),
      ),
    [filter],
  );

  const scrollToRoles = () =>
    document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const apply = (next: Filter, scroll = true) => {
    setDraft(next);
    setFilter(next);
    if (scroll) scrollToRoles();
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    apply(draft);
  };

  const h = CAREERS_HERO;
  return (
    <>
      {/* 1. Hero + search */}
      <section className="cr-hero">
        <h1 className="cr-hero__title reveal" style={cssVars({ "--d": 0 })}>
          {h.title.map((l) => (
            <span key={l}>{l} </span>
          ))}
          <em>{h.accent}</em>
        </h1>
        <p className="cr-hero__lede reveal" style={cssVars({ "--d": 1 })}>
          {h.lede}
        </p>

        <form className="cr-search reveal" style={cssVars({ "--d": 2 })} onSubmit={onSearch} role="search">
          <label className="cr-field cr-field--grow">
            <span>Keyword / role</span>
            <span className="cr-field__input">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                type="search"
                placeholder="e.g. Principal GenAI, Platform"
                value={draft.q}
                onChange={(e) => setDraft({ ...draft, q: e.target.value })}
              />
            </span>
          </label>
          <label className="cr-field">
            <span>Practice domain</span>
            <select
              value={draft.practice}
              onChange={(e) => setDraft({ ...draft, practice: e.target.value as Filter["practice"] })}
            >
              <option value="all">All practices</option>
              {PRACTICES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label className="cr-field">
            <span>Location / model</span>
            <select value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })}>
              <option value="any">Any location</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <button className="cr-btn" type="submit">
            Search <Arrow />
          </button>
        </form>

        <div className="cr-disciplines reveal" style={cssVars({ "--d": 3 })}>
          <span>Active disciplines</span>
          <ul>
            {h.disciplines.map((d) => (
              <li key={d}>
                <button type="button" onClick={() => apply({ ...EMPTY, q: d.split(" ")[0] })}>
                  {d}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Practice domains (light) */}
      <section className="cr-domains">
        <header className="cr-head cr-head--center reveal">
          <h2>{DOMAINS_HEAD.title}</h2>
          <p>{DOMAINS_HEAD.text}</p>
        </header>
        <ul className="cr-domain-grid">
          {DOMAINS.map((d, i) => {
            const count = ROLES.filter((r) => r.domain === d.id).length;
            return (
              <li key={d.id} className="reveal" style={cssVars({ "--d": i % 4 })}>
                <button type="button" className="cr-domain" onClick={() => apply({ ...EMPTY, practice: d.practice })}>
                  <span className="cr-domain__icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {ICONS[d.icon]}
                    </svg>
                  </span>
                  <span className="cr-domain__title">{d.title}</span>
                  <span className="cr-domain__count">
                    {count ? `${String(count).padStart(2, "0")} open position${count > 1 ? "s" : ""}` : "Open applications welcome"}
                  </span>
                  <span className="cr-domain__foot">
                    Explore roles <Arrow />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 3. Open roles (dark) */}
      <section className="cr-roles" id="open-roles">
        <header className="cr-roles__head reveal">
          <div>
            <p className="cr-eyebrow">{ROLES_HEAD.eyebrow}</p>
            <h2>{ROLES_HEAD.title}</h2>
            <p>{ROLES_HEAD.text}</p>
          </div>
          <div className="cr-tabs" role="group" aria-label="Filter roles by practice">
            {[{ id: "all" as const, tab: `All roles (${ROLES.length})` }, ...PRACTICES].map((p) => (
              <button
                key={p.id}
                type="button"
                className={filter.practice === p.id ? "is-on" : undefined}
                aria-pressed={filter.practice === p.id}
                onClick={() => apply({ ...filter, practice: p.id }, false)}
              >
                {p.tab}
              </button>
            ))}
          </div>
        </header>

        {roles.length ? (
          <ul className="cr-role-grid" aria-live="polite">
            {roles.map((r) => (
              <li key={r.title} className="cr-role">
                <div className="cr-role__top">
                  <span className="cr-role__tag">{r.tag}</span>
                  <span className="cr-role__posted">{r.posted}</span>
                </div>
                <h3>{r.title}</h3>
                <p className="cr-role__text">{r.text}</p>
                <p className="cr-role__meta">
                  <span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z" />
                      <circle cx="12" cy="10" r="2" />
                    </svg>
                    {r.location}
                  </span>
                  <span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 8h16v11H4zM9 8V5h6v3" />
                    </svg>
                    {r.type}
                  </span>
                </p>
                <div className="cr-role__foot">
                  <span>{r.tier}</span>
                  <a
                    className="cr-btn cr-btn--small"
                    href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}
                  >
                    View &amp; apply <Arrow />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="cr-empty" aria-live="polite">
            <p>No open roles match this search yet.</p>
            <button type="button" className="cr-link" onClick={() => apply(EMPTY, false)}>
              Clear filters
            </button>
          </div>
        )}

        <p className="cr-roles__note">{ROLES_HEAD.note}</p>
      </section>
    </>
  );
}

/** The careers address as a button that copies it (falls back to opening the mail app). */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CAREERS_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${CAREERS_EMAIL}`;
    }
  };
  return (
    <button type="button" className="cr-copy" onClick={copy} aria-live="polite">
      {copied ? "Copied to clipboard" : CAREERS_EMAIL}
    </button>
  );
}
