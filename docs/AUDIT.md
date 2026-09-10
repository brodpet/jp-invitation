# Audit: clyde-kathy-invitation.vercel.app

Audited 2026-09-10 against the live deployment (Next.js 16 / Turbopack, Tailwind v4).

## Concept (what the site is)

A single-page wedding invitation for Clyde Ivan Dolores and Kathy Jane Londres, July 25, 2026, Talisay City, Cebu. Theme: 1920s "Peaky Blinders" — coal black, charcoal, oxblood, brass. Fonts declared: Cinzel (display) and Cormorant Garamond (body).

Page flow: cinematic intro overlay (match-flare, smoke, "Skip") → Hero → Our Story → Details (ceremony 2:00 PM San Isidro Labrador Parish, reception 4:30 PM Kishanta Clubhouse) → Dress Code (palette swatches + open-air venue notice) → Entourage → Sponsors (principal + secondary) → Gallery (6 photos) → Gift message → RSVP (token-based personal links, no public form) → Footer with Shelby quote.

## Findings

### Broken / bugs
| # | Severity | Finding |
|---|----------|---------|
| 1 | High | `/gallery/hero.jpg` returns 404. Hero background and the intro fallback layer both reference it. Console error on every load. |
| 2 | High | Web fonts never load. `document.fonts` is empty, no `@font-face` or Google Fonts link exists. `.font-cinzel` classes have no CSS rule. Every heading renders in Georgia fallback. The whole typographic identity is missing in production. |
| 3 | Medium | `photo-5.jpg` and `intro-bg.jpg` are byte-identical (1,848,706 bytes). Likely a copy mistake. |

### Performance
| # | Severity | Finding |
|---|----------|---------|
| 4 | High | Gallery images are full-resolution JPEGs (2048px, 0.3–4.3 MB each, ~14.4 MB total). Served as plain `<img>`, not `next/image`, no `srcset`, no WebP/AVIF. |
| 5 | High | All 6 gallery photos are `<link rel="preload">`-ed in `<head>`, forcing ~14 MB download before the user scrolls anywhere near the gallery. |
| 6 | Medium | Static assets served with `Cache-Control: max-age=0, must-revalidate`. Repeat visits re-validate every multi-MB image. |
| 7 | Low | Section content is rendered with `opacity:0` until an IntersectionObserver fires. With JS disabled or failed, the page is blank below the hero. |

### Accessibility
| # | Severity | Finding |
|---|----------|---------|
| 8 | High | 36 text nodes render below 11px on mobile; swatch labels are 8px, "scroll" is 8.8px, section eyebrows are 9.6–10.4px. |
| 9 | Medium | Two `<h1>` elements (one per name). Should be one `<h1>` containing both. |
| 10 | Medium | `maximum-scale=1` in the viewport meta blocks pinch-zoom. |
| 11 | Medium | No `prefers-reduced-motion` handling. Intro animation, smoke, flicker and pulsing red leaks all run unconditionally. |
| 12 | Medium | No navigation and zero `<a>` links on the page: no anchor nav, no map links for venues, no calendar link, no skip link. |
| 13 | Low | Muted text `#8a7e70` on `#141210` is ~4.6:1, passing AA only at normal size; at the 9–10px sizes used it does not meet AA. |
| 14 | Low | Image alt text is generic ("Clyde & Kathy — photo 1"). |

### UX / content
| # | Severity | Finding |
|---|----------|---------|
| 15 | Medium | RSVP section has no action for a guest who lands on the public URL: "Use the personal link sent to you." No fallback contact or form. |
| 16 | Low | Venue names have no addresses or map links. "Talisay City, Cebu" is the only location detail. |
| 17 | Low | No add-to-calendar action for the date. |
| 18 | Low | `robots.txt` absent (fine for a private invite, but explicit `noindex` would be safer than relying on obscurity). |

### What works well
- Strong, committed art direction (dark, cinematic, brass rules, corner ornaments).
- Complete OpenGraph / Twitter metadata with generated images.
- Mobile layout has no horizontal overflow at 390px.
- 44px minimum touch target on the Skip button; 52px on inputs and buttons.
- Semantic `<main>` and `<footer>` present.

## Carried into the restyle

Same concept and content structure, new style. Every finding above is addressed in the new build:
- Real self-hosted/Google web fonts with `font-display: swap`.
- One `<h1>`, sticky anchor nav, skip link, map + calendar links.
- Minimum 12px text, zoom allowed, `prefers-reduced-motion` respected.
- Images lazy-loaded with `srcset` slots; no head preloads except the hero.
- Content visible without JS (reveal is progressive enhancement).
- RSVP form works on the public URL, with guest-name prefill via `?guest=`.
