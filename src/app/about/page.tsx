import type { Metadata } from "next";
import { AboutApproach, AboutGallery, AboutHero, AboutIdea, AboutSpace, AboutValues } from "@/components/About";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import "./about.css";

export const metadata: Metadata = {
  title: "About us — Halcer",
  description: "Halcer designs, builds and runs the systems behind AI and GenAI programmes.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="About" />
      <main className="about" data-nav-image>
        <AboutHero />
        <AboutSpace />
        <AboutIdea />
        <AboutValues />
        <AboutApproach />
        <AboutGallery />
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
