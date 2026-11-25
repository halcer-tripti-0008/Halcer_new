// Hero UI: load reveal, nav pill, magnetic elements,
// custom cursor and the looping background video.

const root = document.documentElement;
const hero = document.querySelector("#hero");
const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------- Reveal */

// A short timeout (not rAF) guarantees the hidden state has painted before the reveal starts.
const reveal = () => setTimeout(() => document.body.classList.add("is-loaded"), 50);
Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 1200))]).then(reveal);

/* ------------------------------------------------- Background video */

const video = document.querySelector(".hero__video");

if (video) {
  const show = () => document.body.classList.add("is-ready");
  if (reducedMotion) {
    // Respect reduced-motion: keep the still poster frame instead of playing.
    video.removeAttribute("autoplay");
    video.pause();
    show();
  } else {
    video.readyState >= 2 ? show() : video.addEventListener("loadeddata", show, { once: true });
    // Some browsers block autoplay until muted is set as a property; retry once data is ready.
    video.muted = true;
    video.play?.().catch(() => video.addEventListener("canplay", () => video.play(), { once: true }));

    // Clean loop: fade the clip out as it nears the end and back in after it restarts,
    // instead of a hard jump cut (the native loop attribute stays as the fallback).
    const SEAM = 0.5; // seconds
    const watch = () => {
      if (video.duration) {
        const left = video.duration - video.currentTime;
        video.classList.toggle("is-seam", left < SEAM);
      }
      requestAnimationFrame(watch);
    };
    requestAnimationFrame(watch);
  }
}

/* ----------------------------------------------------- Nav sliding pill */

const navLinks = document.querySelector(".nav-links");
const indicator = navLinks?.querySelector(".nav-links__indicator");
const activeLink = navLinks?.querySelector(".is-active");

function moveIndicator(link) {
  if (!link || !indicator) return;
  indicator.style.width = `${link.offsetWidth}px`;
  indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  navLinks.querySelectorAll("a").forEach((a) => a.classList.toggle("is-hover", a === link && a !== activeLink));
  navLinks.classList.toggle("is-hovering", link !== activeLink);
  activeLink?.classList.toggle("is-active", link === activeLink);
}

if (navLinks) {
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("pointerenter", () => moveIndicator(a));
    a.addEventListener("focus", () => moveIndicator(a));
  });
  navLinks.addEventListener("pointerleave", () => moveIndicator(activeLink));
  document.fonts?.ready.then(() => moveIndicator(activeLink));
  addEventListener("resize", () => moveIndicator(activeLink));
  moveIndicator(activeLink);
}

/* ------------------------------------------------- Button fill origin */

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("pointerenter", (e) => {
    const r = btn.getBoundingClientRect();
    btn.style.setProperty("--fx", `${e.clientX - r.left}px`);
    btn.style.setProperty("--fy", `${e.clientY - r.top}px`);
  });
});

/* ------------------------------------------- Magnetic + custom cursor */

const cursor = document.querySelector(".cursor");
const cursorText = cursor?.querySelector(".cursor__text");

if (finePointer.matches && !reducedMotion && cursor) {
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const target = { ...pos };
  let magnet = null;

  addEventListener("pointermove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
    cursor.classList.remove("is-hidden");
  });
  document.addEventListener("pointerleave", () => cursor.classList.add("is-hidden"));

  // Magnetic pull: the element drifts toward the pointer, its content a little more.
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const inner = el.querySelector(".roll, svg, .brand-mark");
    const strength = el.classList.contains("btn") ? 0.28 : 0.38;

    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transition = "transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)";
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      if (inner) inner.style.transform = `translate3d(${dx * 0.12}px, ${dy * 0.12}px, 0)`;
      magnet = el;
    });

    el.addEventListener("pointerleave", () => {
      el.style.transition = "transform 0.9s cubic-bezier(0.19, 1, 0.22, 1)";
      el.style.transform = "";
      if (inner) {
        inner.style.transition = "transform 0.9s cubic-bezier(0.19, 1, 0.22, 1)";
        inner.style.transform = "";
      }
      magnet = null;
    });
  });

  // Cursor state: grows over interactive elements, shows a label on [data-cursor].
  document.addEventListener("pointerover", (e) => {
    const labelled = e.target.closest("[data-cursor]");
    const interactive = e.target.closest("a, button");
    cursor.classList.toggle("has-text", !!labelled);
    cursor.classList.toggle("is-hover", !!interactive && !labelled);
    if (labelled) cursorText.textContent = labelled.dataset.cursor;
  });

  const tick = () => {
    pos.x += (target.x - pos.x) * 0.2;
    pos.y += (target.y - pos.y) * 0.2;
    cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    requestAnimationFrame(tick);
  };
  tick();
} else if (cursor) {
  cursor.remove();
}

/* ------------------------------------------- Section entrance reveals */

// Each section animates in when landed on and resets once fully off-screen,
// so the entrance plays again on every visit.
document.querySelectorAll(".who, .clients, .work, .journey, .why, .ind, .foot").forEach((section) => {
  if (reducedMotion || !("IntersectionObserver" in window)) {
    section.classList.add("is-inview");
    return;
  }
  // Tall sections (e.g. the stacked industries panels) can never reach 25% visible,
  // so the test is "a quarter of the section, or a quarter of the window, is on screen".
  const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
  new IntersectionObserver(
    ([entry]) => {
      const need = Math.min(entry.boundingClientRect.height * 0.25, innerHeight * 0.25);
      if (entry.isIntersecting && entry.intersectionRect.height >= need) section.classList.add("is-inview");
      else if (!entry.isIntersecting) section.classList.remove("is-inview");
    },
    { threshold: thresholds },
  ).observe(section);
});

/* ------------------------------------------- Journey: grid <-> stack */

// Offsets of each card in the overlapping stack, measured from the reference:
// [x, y] as a fraction of card width, rotation in degrees.
const STACK = [
  [0.26, 0.28, -8.4],
  [0, -0.03, 0],
  [-0.19, 0.24, 9.2],
  [0.17, -0.33, -20],
  [0.02, -0.42, 19],
];
// Cycle (seconds): grid hold, gather, stack hold, spread.
const PHASES = { grid: 1.1, gather: 0.55, stack: 0.45, spread: 0.6 };
const CYCLE = PHASES.grid + PHASES.gather + PHASES.stack + PHASES.spread;
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function stackAmount(t) {
  const { grid, gather, stack, spread } = PHASES;
  t = ((t % CYCLE) + CYCLE) % CYCLE;
  if (t < grid) return 0;
  if (t < grid + gather) return easeInOut((t - grid) / gather);
  if (t < grid + gather + stack) return 1;
  return 1 - easeInOut(Math.min(1, (t - grid - gather - stack) / spread));
}

const journey = document.querySelector(".journey");
const jcards = journey ? [...journey.querySelectorAll(".jcard")] : [];

if (journey && jcards.length === STACK.length && !reducedMotion) {
  const wide = matchMedia("(min-width: 1001px)");
  let visible = false;
  let running = false;
  let time = 0;
  let last = 0;

  const reset = () => jcards.forEach((c) => (c.style.transform = ""));

  const tick = (now) => {
    if (!visible || !wide.matches || document.hidden) {
      running = false;
      reset();
      return;
    }
    time += Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    const w = jcards[0].offsetWidth;
    const cont = jcards[0].parentElement;
    const gap = parseFloat(getComputedStyle(cont).columnGap) || 0;
    jcards.forEach((card, k) => {
      const p = stackAmount(time - k * 0.03); // slight stagger keeps it organic
      const [x, y, r] = STACK[k];
      const drift = Math.sin(time * 2.2 + k * 1.7) * 0.6 * p; // gentle sway while stacked
      // The stack offsets were measured for two small cards centred in the bottom row. The bottom
      // cards are now wider and fill the row, so shift them back to where those small cards sat.
      let fix = 0;
      let scale = 1;
      if (k >= 3) {
        scale = 1 + (w / card.offsetWidth - 1) * 0.65 * p; // wide cards shrink toward the others' size
        const oldCenter = cont.offsetWidth / 2 + (k === 3 ? -1 : 1) * (w + gap) / 2;
        fix = oldCenter - (card.offsetLeft - cont.offsetLeft + card.offsetWidth / 2);
      }
      card.style.transform =
        `translate3d(${(x * w * p + fix * p).toFixed(2)}px, ${(y * w * p).toFixed(2)}px, 0) rotate(${(r * p + drift).toFixed(3)}deg) scale(${scale.toFixed(4)})`;
    });
    requestAnimationFrame(tick);
  };

  const start = () => {
    if (running || !visible || !wide.matches) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(tick);
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      time = 0; // every visit starts from the organised grid
      start();
    }
  }).observe(journey.querySelector(".journey__cards"));

  wide.addEventListener("change", () => (wide.matches ? start() : reset()));
  document.addEventListener("visibilitychange", () => !document.hidden && start());
}

/* ------------------------------------------ Industries: stacking panels */

// Panels pin via CSS (position: sticky). As each panel slides over the one
// before, that one shrinks slightly (from its top edge) and dims, in
// proportion to how far it is covered, as in the reference.
const indCards = [...document.querySelectorAll(".ind__card")];

if (indCards.length > 1 && !reducedMotion) {
  const PEEK = 16; // matches the per-panel sticky offset in styles.css
  let ticking = false;

  // How far each panel has slid over the one before it (0 = still below, 1 = fully on top, eased).
  const ease = (t) => t * t * (3 - 2 * t);
  const update = () => {
    ticking = false;
    const arrived = indCards.map((card, i) => {
      if (i === 0) return 0;
      const prev = indCards[i - 1].getBoundingClientRect();
      const cur = card.getBoundingClientRect();
      return ease(1 - Math.min(1, Math.max(0, (cur.top - prev.top - PEEK) / cur.height)));
    });
    indCards.forEach((card, i) => {
      // Depth = how many panels are (partly) stacked on top of this one. Every panel that is buried
      // shrinks a little more and dims, so the pile reads as a receding stack of narrower slivers.
      let depth = 0;
      for (let k = i + 1; k < indCards.length; k++) depth += arrived[k];
      const d = Math.min(depth, 3);
      card.style.transform = d > 0.001 ? `scale(${(1 - d * 0.045).toFixed(4)})` : "";
      card.style.filter = d > 0.001 ? `brightness(${(1 - d * 0.2).toFixed(3)})` : "";
      const copy = card.querySelector(".ind__copy");
      if (copy) copy.style.opacity = (1 - Math.min(1, depth) * 0.55).toFixed(3);
    });
  };

  const section = document.querySelector(".ind");
  let visible = false;
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) update();
  }).observe(section);

  addEventListener("scroll", () => {
    if (visible && !ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  addEventListener("resize", update);
}

/* ------------------------------------------ Why Halcer: expanding cards */

// In each row, the card under the pointer (or focused) becomes the active, expanded one.
// CSS does the rest (widths, colour, photo); the first card is active by default.
document.querySelectorAll(".why__row").forEach((row) => {
  const cards = [...row.querySelectorAll(".why__card")];
  const activate = (i) => {
    row.dataset.active = i;
    cards.forEach((c, k) => c.classList.toggle("is-active", k === i));
  };
  cards.forEach((card, i) => {
    card.addEventListener("pointerenter", () => activate(i));
    card.addEventListener("focus", () => activate(i));
  });
});

/* ------------------------------------ Why Halcer: scroll-drawn rule */

// The hairline above the header extends from the left as the section scrolls into view.
const whyHead = document.querySelector(".why__head");
if (whyHead && !reducedMotion) {
  let queued = false;
  const drawRule = () => {
    queued = false;
    const top = whyHead.getBoundingClientRect().top;
    const p = (innerHeight * 0.95 - top) / (innerHeight * 0.55); // 0 when entering, 1 about mid-screen
    whyHead.style.setProperty("--rule", Math.min(1, Math.max(0, p)).toFixed(3));
  };
  const queue = () => !queued && ((queued = true), requestAnimationFrame(drawRule));
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  drawRule();
}

// Respect reduced-motion: the Who-we-are video stays on its first frame.
if (reducedMotion) document.querySelector(".who__video")?.pause();

root.classList.add("js");
