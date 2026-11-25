/** Label that rolls up on hover (the duplicate text lives in `data-text`; see `.roll` in globals.css). */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span data-text={children}>{children}</span>
    </span>
  );
}
