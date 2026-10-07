export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function formatNumber(n: number, prefix = "", suffix = ""): string {
  return prefix + n.toLocaleString("en-US", { maximumFractionDigits: 0 }) + suffix;
}

/**
 * Ease-out-cubic tween of an element's text from `from` to `to`.
 * Returns a cancel function.
 */
export function tweenText(
  el: HTMLElement,
  from: number,
  to: number,
  opts: { prefix?: string; suffix?: string; duration: number },
): () => void {
  const { prefix = "", suffix = "", duration } = opts;
  if (prefersReducedMotion() || duration <= 0) {
    el.textContent = formatNumber(to, prefix, suffix);
    return () => {};
  }
  let start: number | null = null;
  let raf = 0;
  const step = (ts: number) => {
    if (start === null) start = ts;
    const p = Math.min(1, (ts - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = formatNumber(Math.round(from + (to - from) * eased), prefix, suffix);
    if (p < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}
