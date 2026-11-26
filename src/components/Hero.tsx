"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/data/footer";
import { useHeroVideo } from "@/hooks/useHeroVideo";
import { useNavShade } from "@/hooks/useNavShade";
import { cssVars } from "@/lib/css";
import { BrandMark } from "./BrandMark";
import { Button } from "./Button";
import { NavLinks } from "./NavLinks";
import { Roll } from "./Roll";

const CHAT_ICON = "M4 6h16v10H8l-4 3z";
const ARROW_ICON = "M5 12h13M13 6l6 6-6 6";
const PLAY_ICON = "M7 5l11 7-11 7z";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useHeroVideo(videoRef);
  const navRef = useRef<HTMLElement>(null);
  useNavShade(navRef);

  // Phone/tablet menu: the desktop nav pill is hidden below 900px, so the menu button opens this panel.
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    const onResize = () => innerWidth > 900 && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Outside the hero so the sticky phone bar is never covered by later sections. */}
      <header ref={navRef} className={`nav${menuOpen ? " is-menu-open" : ""}`}>
        <a
          className="pill brand reveal"
          href="#"
          aria-label="Halcer home"
          data-magnetic
          style={cssVars({ "--d": 0 })}
        >
          <BrandMark className="brand-mark" />
          <span>HALCER</span>
        </a>

        <NavLinks />

        <div className="nav-actions reveal" style={cssVars({ "--d": 2 })}>
          <Button
            label="Contact us"
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

        <nav
          className="mobile-menu"
          id="mobile-menu"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {NAV_LINKS.map((label) => (
            <a key={label} href="#" onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="mobile-menu__cta"
            href="#"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </a>
        </nav>
      </header>
      <div className="hero-track">
        <section className="hero" id="hero" aria-label="Introduction">
          <div className="hero__bg" aria-hidden="true" />
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/images/hero/hero-poster.jpg?v=hd3"
            aria-hidden="true"
          >
            <source src="/assets/video/hero-loop.mp4?v=hd3" type="video/mp4" />
          </video>
          <div className="hero__shade" aria-hidden="true" />

          <section className="hero__content" aria-labelledby="hero-title">
            <h1 id="hero-title" className="headline">
              <span className="line">
                <span style={cssVars({ "--d": 0 })}>Intelligence has</span>
              </span>
              <span className="line">
                <span style={cssVars({ "--d": 1 })}>changed the terms.</span>
              </span>
              <span className="line">
                <span style={cssVars({ "--d": 2 })}>
                  Build <em>accordingly.</em>
                </span>
              </span>
            </h1>

            <p className="lede reveal" style={cssVars({ "--d": 6 })}>
              Halcer <strong>designs, builds and runs</strong> the systems
              behind AI and GenAI programmes: the software, cloud, data and
              security work that decides whether they{" "}
              <strong>succeed in production.</strong>
            </p>

            <div className="actions reveal" style={cssVars({ "--d": 8 })}>
              <Button
                label="Speak with a specialist"
                iconPath={ARROW_ICON}
                variant="primary"
              />
              <Button
                label="Explore our services"
                iconPath={PLAY_ICON}
                variant="ghost"
              />
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
