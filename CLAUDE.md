# Agathus Labs — Project Rules

Agathus Labs: Medical 3D & E-manufacturing. Next.js (App Router, TypeScript) + Tailwind CSS v4 + Framer Motion, exported as a static site. UI tested with Playwright.

Visual direction: **Clinical Cyberpunk / High-Tech Laboratory** — a slicer or medical-device interface, not a SaaS template.

These rules are mandatory for every UI change. When two rules conflict, the more restrictive one wins.

## Commands

- `npm run dev` — local dev server
- `npm run build` — static export to `./out`
- `npm run preview` — serve `./out` on port 3210
- `npm test` — build, serve the export, run the Playwright suite (Chromium, desktop + mobile)
- `npm run test:ui` / `test:headed` / `test:report` — Playwright UI mode, headed run, last HTML report

Run `npm test` after any UI change. `tests/design-rules.spec.js` enforces the hard constraints below; do not weaken it to make a change pass.

## Structure

- `app/` — `layout.tsx` (fonts, metadata), `page.tsx` (section order), `globals.css` (design tokens)
- `components/` — one file per section or primitive (`Hero`, `DivisionSection`, `MediaSlot`, `Reveal`, `Parallax`, …)
- `content/site.ts` — **all copy and media slots.** Components lay content out; they do not contain it.
- `public/media/` — videos and screenshots referenced from `content/site.ts`
- `legacy/index.html` — the previous static prototype, kept for reference only

## 1. Palette (60 / 30 / 10)

Colours exist only as tokens in `app/globals.css` (`@theme`). Tailwind's default palette is reset, so `bg-blue-600` etc. do not compile. Never use arbitrary colour values; add a token and update the test's `PALETTE` list if the palette genuinely changes.

- **60% — void:** `void` is the page background. Surfaces are `void` / `carbon` only. Lines are `steel` (default) and `steel-light` (emphasis).
- **30% — clinical + surgical:** `clinical` for primary text, `muted` for secondary text and labels. `surgical` (green) marks medical / trust elements only: the segmentation service, status marks.
- **10% — neon:** `neon` (violet) for numerals, interactive states, focus, scan lines and HUD accents; `neon-deep` for the CTA fill. Never for body text or large text blocks.
- **Neon is flat.** No glow: no `box-shadow`, `text-shadow`, `drop-shadow`, `filter` or `backdrop-filter` anywhere. The effect comes from sharp 1px violet lines on the void.
- **Border radius: 0–2px max.** Chamfered corners (`chamfer` utility, 6px) are for buttons only.
- **No gradients, no glassmorphism, no blur, no decorative blobs, no emoji as icons.**

## 2. Typography

- **Space Grotesk** (`font-sans`, 500/700) for display headings only: bold, `tracking-tight`, sentence case.
- **IBM Plex Mono** (`font-mono`, 400/500) for everything else: body, labels, data, indices, nav. Labels are uppercase with `tracking-widest`; body is `leading-relaxed`.
- No third family. Fonts load through `next/font` in `app/layout.tsx`.

## 3. Structure

- **Asymmetrical 12-column grid** with unequal splits (7/5, 2/5/5, 2/6/4, 2/7/3). Avoid 6/6 and equal thirds.
- **1px lines and 01–04 numbering order the page,** not cards or shadows. Use `<Rule />` for structural lines.
- **Air:** sections use `py-24` / `lg:py-32`. Whitespace is structural.
- **Tailwind scale values only** — no arbitrary spacing unless aligning to a hairline.
- **One focal point per viewport;** three hierarchy levels max per section: label → heading → body/data.
- **Semantic HTML:** one `h1`, ordered headings, landmarks, `lang` set.
- **Content is real and direct:** name the service plainly ("Segmentación de Imágenes Médicas", "Diseño CAD Paramétrico", "Impresión 3D Industrial"). No invented specs, tolerances or client claims; if a fact is unknown, leave it out or mark it pending.

## 4. Media zones

- Every video or screenshot goes through `<MediaSlot>` with a fixed aspect ratio (`4/3`, `16/9`, `4/5`), a HUD overlay and a caption.
- A slot with no `src` renders a labelled placeholder; the layout must be final before the file exists.
- Videos are muted, looping, `playsInline`, with a poster, and stay paused under `prefers-reduced-motion`.
- Screenshots of patient studies must be anonymised before they are added.

## 5. Motion (cinematic, but disciplined)

- **Framer Motion** for reveals, scroll-linked motion and layout animation; plain CSS transitions for hover/focus/active.
- **Animate only `transform`, `opacity` and `clip-path`** (plus colour for state changes). Never layout properties.
- **Entrances:** `<Reveal>` (clip-path wipe + 24px lift, 0.7s) and `<Rule>` (scaleX), eased with `cubic-bezier(0.23, 1, 0.32, 1)`, staggered 0.08s. No springs that overshoot, no bounce.
- **Scroll-linked:** `<Parallax>` drift of 16–40px and the top progress line. Nothing scroll-jacks or pins the page.
- **UI feedback stays fast:** 120–200ms for hover/focus/press. `active:scale-[0.98]` on buttons. Name transition properties; never `transition-all`.
- **Reduced motion and no-JS must show all content at rest** (see `globals.css` and the `<noscript>` block in `layout.tsx`).
- **Never observe a clipped element** with IntersectionObserver: a fully clipped target reports ratio 0. Observe an unclipped wrapper (as `Reveal` does).

## 6. Interaction & accessibility

- Every interactive element has hover, focus-visible and active states.
- **Focus:** 1px `neon` outline with offset, square corners. On chamfered buttons the outline sits on the unclipped wrapper.
- Hit targets ≥ 40px, cursor matches affordance, no layout shift on hover.
- WCAG AA contrast, keyboard-reachable everything, alt text / `aria-label` on meaningful media.
