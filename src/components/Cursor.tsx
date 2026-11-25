"use client";

import { useRef } from "react";
import { usePointerEffects } from "@/hooks/usePointerEffects";

/** Custom pointer: follows the mouse with easing; also wires the magnetic pull for [data-magnetic] elements. */
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const enabled = usePointerEffects(cursorRef, textRef);

  if (!enabled) return null;
  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      <span className="cursor__text" ref={textRef} />
    </div>
  );
}
