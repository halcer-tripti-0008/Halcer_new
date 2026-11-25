"use client";

import { useRef } from "react";
import { useHeroVideo } from "@/hooks/useHeroVideo";
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

  return (
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
          poster="/assets/images/hero/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/assets/video/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero__shade" aria-hidden="true" />

        <header className="nav">
          <a className="pill brand reveal" href="#" aria-label="Halcer home" data-magnetic style={cssVars({ "--d": 0 })}>
            <BrandMark className="brand-mark" />
            <span>HALCER</span>
          </a>

          <NavLinks />

          <div className="nav-actions reveal" style={cssVars({ "--d": 2 })}>
            <Button label="Contact us" iconPath={CHAT_ICON} variant="primary" small />
            <button className="menu-button" type="button" aria-label="Open menu" data-magnetic>
              <span />
              <span />
            </button>
          </div>
        </header>

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
            Halcer <strong>designs, builds and runs</strong> the systems behind AI and GenAI programmes: the software,
            cloud, data and security work that decides whether they <strong>succeed in production.</strong>
          </p>

          <div className="actions reveal" style={cssVars({ "--d": 8 })}>
            <Button label="Speak with a specialist" iconPath={ARROW_ICON} variant="primary" />
            <Button label="Explore our services" iconPath={PLAY_ICON} variant="ghost" />
          </div>
        </section>
      </section>
    </div>
  );
}
