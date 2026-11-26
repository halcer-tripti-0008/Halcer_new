"use client";

import { CLIENTS } from "@/data/clients";
import { useInView } from "@/hooks/useInView";
import { cssVars } from "@/lib/css";

/** Logo wall. Logos are CSS masks (`--logo`), so they take the text colour. */
export function Clients() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section ref={ref} className={`clients${inView ? " is-inview" : ""}`} id="clients" aria-labelledby="clients-title">
      <h2 className="clients__title" id="clients-title">
        <span className="line">
          <span>Trusted by remarkable</span>
        </span>
        <span className="line line--last">
          <span>
            <span className="clients__outline">global brands</span>
          </span>
        </span>
      </h2>
      <ul className="clients__grid">
        {CLIENTS.map((client, n) => (
          <li key={client.file} style={cssVars({ "--n": n })}>
            <span
              className="clients__logo"
              role="img"
              aria-label={client.name}
              style={cssVars({
                "--logo": `url('/assets/logos/${client.file}')`,
                "--ar": client.ratio,
                "--w": Math.sqrt(client.ratio).toFixed(3),
              })}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
