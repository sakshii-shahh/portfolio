# Sakshi Shah — Portfolio

A static portfolio site for [Sakshi Shah](https://www.linkedin.com/in/sakshiishahh/), product designer at Northwestern McCormick.

🌐 **Live:** [portfolio-sakshi-shah.vercel.app](https://portfolio-sakshi-shah.vercel.app)

---

## Stack

- **Vanilla HTML / CSS / JavaScript** — no framework, no build step
- **Vercel** for static hosting (`vercel.json` for asset headers + clean URLs)
- **Google Fonts**: Bricolage Grotesque (display), Fraunces (serif italic), Geist (sans), Geist Mono
- Decorative SVGs hand-extracted from a single Adobe Illustrator master

To run locally: just open `index.html` in a browser. No `npm install`, no dev server required.

---

## Structure

```
portfolio/
├── index.html                       Splash / welcome page (watercolor hero)
├── home.html                        Main work page — sidebar nav, projects, testimonials, footer
├── about.html                       About me — bio, communities, fun facts
├── ai.html                          AI Practices — agents, stack, process
├── playground.html                  Personal playground / experiments
├── plant.html                       Visitor's Lawn — pick a flower & plant it
├── lawn.html                        Garden game canvas (full-screen)
├── 404.html                         Custom 404 page
│
├── case-ibm-deal-registration.html  Case study: IBM Deal Registration
├── case-ai-accelerator.html         Case study: CGI AI Adoption Accelerator
├── case-mosaic.html                 Case study: Mosaic (concept, care tech)
├── case-money20.html                Case study: Money20 (coming soon)
├── case-khaana-daan.html            Case study: Khaana Daan (coming soon)
├── case-dp-house.html               Case study: DP House of Media (coming soon)
│
├── assets/
│   ├── avatar.png                   Pixel-art logo (favicon + sidebar)
│   ├── floral-elements.svg          Master watercolor flower set
│   ├── garden-mb-v2.svg             Watercolor hero used on the splash page
│   ├── flowers.js                   Flower data for the garden game
│   ├── page-transition.js           Cross-fade between pages
│   ├── tulips/                      6 tulips + 3 leaves, extracted with tight viewBoxes
│   ├── about/                       Photos for the About page (communities + fun facts)
│   ├── mosaic/                      Mosaic case-study assets
│   └── ai-accelerator/              CGI case-study assets
│
├── docs/                            Source copy + handoff docs (not deployed)
│   ├── Sakshi-Site-Copy.md          Markdown of every line of copy on the site
│   ├── Sakshi-Site-Copy.docx        Same in docx form
│   └── HANDOFF.md                   Original site handoff notes
│
├── vercel.json                      SVG content-type headers + clean URLs
└── .gitignore
```

---

## Notable details

- **Pixel-art avatar** (`assets/avatar.png`) is the favicon and the sidebar logo across all pages. CSS uses `image-rendering: pixelated` so it stays crisp at any device pixel ratio. The avatar wobbles gently (`-3°` ↔ `+3°` over 4s, paused on hover), with a `prefers-reduced-motion` exception.
- **Tulip + leaf decoration band** sits above the footer on home, about, ai, playground, and all 6 case studies. 19 elements (15 tulips + 4 leaves) with `:nth-child` height variation, gentle tilts, and responsive hide-every-other below 600px.
- **Custom dot cursor** on hover-capable devices, auto-disabled on touch via `@media (hover: hover)`.
- **Tablet + mobile breakpoints**: shell collapses single-column at 980px, custom case-study grids fall to 1-col at 760px, footer + main padding step down further at 600px / 480px. `body { overflow-x: clip }` defends against horizontal scroll.

---

## Open follow-ups

- Some photos are large (16 MB FOP Mumbai, 12 MB baking, 7.8 MB experience). Re-exporting at ~1600 px wide JPEG would cut load times significantly on mobile without visible quality loss.
- 3 placeholder case studies (Money20, Khaana Daan, DP House) and 1 placeholder community (none — all 3 now have photos) and 0 placeholder fun facts — all four have photos.

---

Built between May 2026 and now, iteratively, with [Claude Code](https://claude.com/code).
