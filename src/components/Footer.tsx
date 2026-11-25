"use client";

import { FOOTER_COLUMNS } from "@/data/footer";
import { useInView } from "@/hooks/useInView";
import { BrandMark } from "./BrandMark";
import { Roll } from "./Roll";

const SOCIALS: { label: string; icon: React.ReactNode }[] = [
  {
    label: "Discord",
    icon: (
      <path d="M19.3 5.4A16.5 16.5 0 0 0 15.2 4l-.5 1a15 15 0 0 0-5.4 0l-.5-1a16.5 16.5 0 0 0-4.1 1.4C2 9.3 1.3 13.1 1.7 16.8a16.7 16.7 0 0 0 5 2.5l1.1-1.8a11 11 0 0 1-1.7-.8l.4-.3a11.8 11.8 0 0 0 10.1 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.8a16.7 16.7 0 0 0 5-2.5c.5-4.3-.7-8-3-11.4zM8.7 14.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
    ),
  },
  {
    label: "Instagram",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.8" cy="7.2" r="1.1" />
      </>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z" />
    ),
  },
  {
    label: "X",
    icon: (
      <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.2 4.7H5.4l11.3 14.5z" />
    ),
  },
];

/**
 * CTA band (nested chevrons + glow) and the footer bar.
 * PLACEHOLDER: link targets and social URLs must be replaced with Halcer's real ones before publishing.
 */
export function Footer() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <footer ref={ref} className={`foot${inView ? " is-inview" : ""}`} id="contact">
      <section className="foot__cta" aria-labelledby="foot-title">
        <svg className="foot__chevrons" viewBox="0 0 2576 758" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <radialGradient id="foot-glow" cx="50%" cy="100%" r="60%">
              <stop offset="0" stopColor="#1d4f99" stopOpacity="0.75" />
              <stop offset="0.55" stopColor="#0d2550" stopOpacity="0.45" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="2576" height="758" fill="url(#foot-glow)" />
          <g className="foot__tris">
            <polygon points="1287,-296 85,758 2489,758" />
            <polygon points="1287,-55 360,758 2214,758" />
            <polygon points="1287,186 635,758 1939,758" />
            <polygon points="1287,427 910,758 1664,758" />
            <polygon points="1287,638 1150,758 1424,758" />
          </g>
        </svg>
        <div className="foot__cta-inner">
          <h2 className="foot__title" id="foot-title">
            Have a product to
            <br />
            build or rethink?
          </h2>
          <p className="foot__sub">
            Tell us where the product is today, what you are trying to achieve and what is getting in the way.
          </p>
          <a className="foot__btn" href="#" data-magnetic>
            <span className="foot__btn-fill" aria-hidden="true" />
            <Roll>Get in touch</Roll>
          </a>
        </div>
      </section>

      <div className="foot__bar">
        <div className="foot__main">
          <div className="foot__about">
            <a className="foot__brand" href="#" aria-label="Halcer home">
              <BrandMark className="foot__mark" />
              <span>HALCER</span>
            </a>
            <p className="foot__blurb">
              Discover HALCER, a leading studio specializing in AI optimization and systems architecture. Enhance your
              computational infrastructure with our tailored strategies.
            </p>
            <p className="foot__visit">Visit us on:</p>
            <div className="foot__socials">
              {SOCIALS.map(({ label, icon }) => (
                <a key={label} className="foot__social" href="#" aria-label={label} data-magnetic>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="foot__cols">
            {FOOTER_COLUMNS.map(({ title, links }) => (
              <nav key={title} className="foot__col" aria-label={title}>
                <h3>{title}</h3>
                <ul>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#">
                        <Roll>{link}</Roll>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="foot__copy">Copyright &copy; 2026 HALCER. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
