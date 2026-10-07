"use client";

/**
 * Progressive-enhancement effects ported from the original static page:
 *  - reveal-on-scroll (.reveal / .anim-hide)
 *  - animated counters ([data-count])
 *  - scroll-scrub: hero pipeline + $10 → $5 rate bar
 *  - hero particle field (canvas, mouse parallax)
 *
 * Content is fully rendered on the server; nothing here is required for it
 * to be readable. Re-runs on every route change and cleans up after itself.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion, tweenText } from "@/lib/motion";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduced = prefersReducedMotion();
    const scrubOn = !reduced;
    root.classList.toggle("js-scrub", scrubOn);

    const cleanups: Array<() => void> = [];

    /* ---------- Reveal on scroll ---------- */
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const inViewport = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    };
    const unhide = (el: Element) => {
      el.classList.remove("anim-hide");
      el.classList.add("in");
    };
    if (!reduced && "IntersectionObserver" in window) {
      revealEls.forEach((el) => {
        if (!inViewport(el)) el.classList.add("anim-hide");
      });
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              unhide(e.target);
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* ---------- Animated counters ---------- */
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const counted = new WeakSet<HTMLElement>();
    const countEl = (el: HTMLElement) => {
      if (counted.has(el)) return;
      counted.add(el);
      const target = parseFloat(el.dataset.count || "0");
      cleanups.push(
        tweenText(el, 0, target, {
          prefix: el.dataset.prefix || "",
          suffix: el.dataset.suffix || "",
          duration: 1400,
        }),
      );
    };
    if ("IntersectionObserver" in window && !reduced) {
      const cio = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              countEl(e.target as HTMLElement);
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      counters.forEach((el) => cio.observe(el));
      cleanups.push(() => cio.disconnect());
    }

    /* ---------- Never-hidden failsafe ---------- */
    const failsafe = () => {
      revealEls.forEach(unhide);
      counters.forEach((el) => {
        if (!counted.has(el) && inViewport(el)) countEl(el);
      });
    };
    const failsafeTimer = window.setTimeout(failsafe, 3200);
    cleanups.push(() => window.clearTimeout(failsafeTimer));

    /* ---------- Scroll-scrub engine ---------- */
    type Scrub = { apply: (p: number) => void; compute: () => number; last: number };
    const scrubs: Scrub[] = [];
    const trackProgress = (el: Element, band = 0.6) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (r.height > vh * 1.2) return clamp01(-r.top / (r.height - vh));
      const lo = vh * (1 - band / 2);
      const hi = vh * (band / 2);
      return clamp01((lo - (r.top + r.height / 2)) / (lo - hi));
    };
    const registerScrub = (apply: (p: number) => void, compute: () => number) => {
      if (!scrubOn) {
        apply(1); // final state for reduced motion
        return;
      }
      scrubs.push({ apply, compute, last: -1 });
    };

    // GPU → NODE → CLUSTER → AI WORKLOAD
    const pipeline = document.getElementById("pipeline");
    if (pipeline) {
      const nodes = pipeline.querySelectorAll(".node");
      const pulses = pipeline.querySelectorAll(".pulse");
      registerScrub(
        (p) => {
          nodes.forEach((n, i) => n.classList.toggle("lit", p * 4 >= i));
          pulses.forEach((n, j) => n.classList.toggle("lit", p * 4 >= j + 0.6));
        },
        () => clamp01(window.scrollY / ((window.innerHeight || 1) * 0.5)),
      );
    }

    // $10 → $5 rate scrub
    const panel = document.querySelector(".econ-panel");
    const num = document.getElementById("scrub-num");
    const fill = document.getElementById("scrub-fill");
    if (panel && num && fill) {
      registerScrub(
        (p) => {
          num.textContent = "~$" + (10 - 5 * p).toFixed(2);
          fill.style.transform = "scaleX(" + Math.max(0.03, p).toFixed(3) + ")";
        },
        () => trackProgress(panel, 0.8),
      );
    }

    if (scrubOn && scrubs.length) {
      let ticking = false;
      let raf = 0;
      const run = () => {
        ticking = false;
        for (const s of scrubs) {
          const p = s.compute();
          if (Math.abs(p - s.last) > 0.002) {
            s.last = p;
            s.apply(p);
          }
        }
      };
      const schedule = () => {
        if (!ticking) {
          ticking = true;
          raf = requestAnimationFrame(run);
        }
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      schedule();
      cleanups.push(() => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        cancelAnimationFrame(raf);
      });
    }

    /* ---------- Hero particle field ---------- */
    const canvas = document.getElementById("hero-particles") as HTMLCanvasElement | null;
    const hero = document.querySelector<HTMLElement>(".hero");
    const ctx = canvas?.getContext("2d");
    if (canvas && hero && ctx) {
      cleanups.push(startParticles(canvas, hero, ctx, reduced));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}

type Particle = {
  fx: number; fy: number; size: number; spr: "ice" | "blue" | "white";
  vy: number; vx: number; sway: number; swaySp: number; ph: number;
  tw: number; twSp: number; baseA: number; depth: number;
};

function startParticles(
  canvas: HTMLCanvasElement,
  hero: HTMLElement,
  ctx: CanvasRenderingContext2D,
  reduced: boolean,
): () => void {
  let W = 0, H = 0, raf = 0, visible = true, lastFrame = 0;
  let parts: Particle[] = [];
  const t0 = performance.now();
  let mx = 0, my = 0, sx = 0, sy = 0;

  const makeSprite = (rgb: number[]) => {
    const s = document.createElement("canvas");
    s.width = s.height = 64;
    const c = s.getContext("2d")!;
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, `rgba(${rgb.join(",")},0.9)`);
    g.addColorStop(0.35, `rgba(${rgb.join(",")},0.42)`);
    g.addColorStop(1, `rgba(${rgb.join(",")},0)`);
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
    return s;
  };
  const sprites = {
    ice: makeSprite([189, 239, 255]),
    blue: makeSprite([92, 169, 255]),
    white: makeSprite([255, 255, 255]),
  };

  const seed = () => {
    parts = [];
    const n = Math.max(36, Math.min(110, Math.round((W * H) / 20000)));
    for (let i = 0; i < n; i++) {
      const r = Math.random();
      const kind = r < 0.6 ? "dust" : r < 0.78 ? "glow" : "snow";
      parts.push({
        fx: Math.random(),
        fy: Math.random(),
        size: kind === "dust" ? 2 + Math.random() * 4.5 : kind === "glow" ? 9 + Math.random() * 14 : 4 + Math.random() * 8,
        spr: kind === "snow" ? "white" : Math.random() < 0.55 ? "ice" : "blue",
        vy: kind === "snow" ? 0.01 + Math.random() * 0.022 : -(0.006 + Math.random() * 0.02),
        vx: (Math.random() - 0.5) * 0.012,
        sway: 6 + Math.random() * 16,
        swaySp: 0.25 + Math.random() * 0.7,
        ph: Math.random() * Math.PI * 2,
        tw: Math.random() * Math.PI * 2,
        twSp: 0.6 + Math.random() * 2,
        baseA: kind === "dust" ? 0.22 + Math.random() * 0.34 : kind === "glow" ? 0.15 + Math.random() * 0.2 : 0.16 + Math.random() * 0.28,
        depth: 0.35 + Math.random() * 0.65,
      });
    }
  };

  const frame = (now: number, still: boolean) => {
    const t = (now - t0) / 1000;
    let dt = (now - (lastFrame || now)) / 1000;
    lastFrame = now;
    if (!(dt > 0) || dt > 0.05) dt = 0.016;
    ctx.clearRect(0, 0, W, H);
    sx += (mx - sx) * 0.05;
    sy += (my - sy) * 0.05;
    for (const p of parts) {
      if (!still) {
        p.fy += p.vy * dt;
        p.fx += p.vx * dt;
        if (p.fy < -0.06) p.fy += 1.12; else if (p.fy > 1.06) p.fy -= 1.12;
        if (p.fx < -0.06) p.fx += 1.12; else if (p.fx > 1.06) p.fx -= 1.12;
      }
      const x = p.fx * W + Math.sin(t * p.swaySp + p.ph) * p.sway + sx * p.depth * 46;
      const y = p.fy * H + Math.cos(t * p.swaySp * 0.8 + p.ph) * p.sway * 0.5 + sy * p.depth * 32;
      let a = p.baseA + Math.sin(t * p.twSp + p.tw) * (p.baseA * 0.55);
      a = Math.max(0.02, Math.min(0.95, a));
      ctx.globalAlpha = a;
      ctx.drawImage(sprites[p.spr], x - p.size, y - p.size, p.size * 2, p.size * 2);
    }
    ctx.globalAlpha = 1;
  };

  const loop = (now: number) => {
    if (!visible || document.hidden) {
      raf = 0;
      return;
    }
    frame(now, false);
    raf = requestAnimationFrame(loop);
  };
  const kick = () => {
    if (!raf && !reduced) raf = requestAnimationFrame(loop);
  };
  const resize = () => {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    if (reduced) frame(t0 + 600, true);
  };

  const onMove = (e: MouseEvent) => {
    const r = hero.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width - 0.5;
    my = (e.clientY - r.top) / r.height - 0.5;
  };
  const onLeave = () => { mx = 0; my = 0; };
  const onVisibility = () => { if (!document.hidden) kick(); };
  let rt = 0;
  const onResize = () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(resize, 180);
  };

  hero.addEventListener("mousemove", onMove);
  hero.addEventListener("mouseleave", onLeave);
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  const io = new IntersectionObserver(
    (es) => {
      visible = es[0].isIntersecting;
      if (visible) kick();
    },
    { threshold: 0 },
  );
  io.observe(hero);

  resize();
  kick();

  return () => {
    cancelAnimationFrame(raf);
    raf = 0;
    window.clearTimeout(rt);
    io.disconnect();
    hero.removeEventListener("mousemove", onMove);
    hero.removeEventListener("mouseleave", onLeave);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}
