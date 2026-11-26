"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_HREFS, NAV_LINKS } from "@/data/footer";
import { useNavShade } from "@/hooks/useNavShade";
import { cssVars } from "@/lib/css";
import { BrandMark } from "./BrandMark";
import { Button } from "./Button";
import { NavLinks } from "./NavLinks";
import { Roll } from "./Roll";

const CHAT_ICON = "M4 6h16v10H8l-4 3z";

/** Site navigation shared by every page. `active` marks the current page in the nav (null: none, e.g. Contact). */
export function SiteHeader({ active }: { active: (typeof NAV_LINKS)[number] | null }) {
  const navRef = useRef<HTMLElement>(null);
  useNavShade(navRef);

  // Phone/tablet menu: the desktop nav pill is hidden below 900px, so the menu button opens this panel.
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => innerWidth > 900 && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
      <header ref={navRef} className={`nav${menuOpen ? " is-menu-open" : ""}`}>
        <a
          className="pill brand reveal"
          href="/"
          aria-label="Halcer home"
          data-magnetic
          style={cssVars({ "--d": 0 })}
        >
          <BrandMark className="brand-mark" />
          <span>HALCER</span>
        </a>

        <NavLinks active={active} />

        <div className="nav-actions reveal" style={cssVars({ "--d": 2 })}>
          <Button
            label="Contact us"
            href="/contact"
            iconPath={CHAT_ICON}
            variant="primary"
            small
          />
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            data-magnetic
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>

        {/* Always rendered so it can animate both ways; `inert` keeps it out of reach while closed. */}
        <nav
          className="mobile-menu"
          id="mobile-menu"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          {NAV_LINKS.map((label, i) => (
            <a
              key={label}
              href={NAV_HREFS[label]}
              className={label === active ? "is-current" : undefined}
              style={cssVars({ "--i": i })}
              onClick={() => setMenuOpen(false)}
            >
              <Roll>{label}</Roll>
              {label === active && <i className="mobile-menu__dot" aria-hidden="true" />}
              <svg className="mobile-menu__arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          ))}
          <a
            className="mobile-menu__cta"
            href="/contact"
            style={cssVars({ "--i": NAV_LINKS.length })}
            onClick={() => setMenuOpen(false)}
          >
            <Roll>Contact us</Roll>
          </a>
        </nav>
      </header>
  );
}
