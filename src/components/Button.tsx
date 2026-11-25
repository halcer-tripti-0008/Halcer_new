"use client";

import type { PointerEvent, ReactNode } from "react";
import { Roll } from "./Roll";

interface ButtonProps {
  label: string;
  /** SVG path data for the 24x24 icon. */
  iconPath: string;
  variant: "primary" | "ghost";
  small?: boolean;
}

/** Hero button: a fill grows from the point where the pointer entered. */
export function Button({ label, iconPath, variant, small }: ButtonProps): ReactNode {
  const onEnter = (e: PointerEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    btn.style.setProperty("--fx", `${e.clientX - r.left}px`);
    btn.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };
  const classes = ["btn", `btn--${variant}`, variant === "primary" ? "btn--light" : "", small ? "btn--sm" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} href="#" data-magnetic onPointerEnter={onEnter}>
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d={iconPath} />
        </svg>
      </span>
      <Roll>{label}</Roll>
    </a>
  );
}
