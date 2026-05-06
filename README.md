# Sakshi Shah — Portfolio Site

Static HTML/CSS/JS portfolio. No build step. No dependencies. Opens directly in any browser.

---

## What's here

```
Portfolio/
├── index.html                       Welcome — full-bleed watercolor garden, door transition
├── home.html                        Main work page (sidebar + projects + testimonials + footer)
├── about.html                       About me
├── ai.html                          AI Practices
├── plant.html                       Visitor's Lawn — pick a flower & plant it
├── playground.html                  Coming-soon twilight scene
├── case-ibm-deal-registration.html  Case study (full template — TOC, hero, banner, sections,
│                                    interactive mockup, impact stats, light testimonial, next link)
├── case-money20.html                Same template, different content
├── case-ai-accelerator.html         Same template (CGI — homepage card shows "Coming soon" on hover)
├── case-dp-house.html               Same template
├── case-khaana-daan.html            Same template
│
├── assets/                          Watercolor SVGs (used by index.html via base64 embed)
│   ├── garden-mb.svg                The active welcome SVG (13 MB)
│   └── garden-mb.b64                Base64-encoded version embedded into index.html
│
├── Sakshi-Site-Copy.docx            Site-wide copy doc (every line of text on the site)
└── Sakshi-Site-Copy.md              Markdown twin of the docx
```

A live Google Doc copy of the same content lives at:
https://docs.google.com/document/d/1dNGaNrpSeKSBtlcIyvYlwA60nY4ZjVceCyEP0G8vbUM/edit

---

## Design system (single source of truth)

These CSS variables live at the top of every HTML file. Change them in one place per file (or extract to a shared stylesheet — see "Things to clean up" below).

```css
:root {
  --bg:         #f0e8d2;   /* paper cream */
  --bg-elev:    #f6efdb;
  --bg-card:    #e8e0c5;
  --ink:        #3a2818;   /* warm chocolate, not black */
  --ink-soft:   #5a4632;
  --ink-mute:   #8a7a5e;
  --rule:       #cdc0a0;
  --rule-strong:#b8a988;
  --accent:     #ec6478;   /* coral pink — primary brand */
  --accent-soft:#f7d4dc;
  --accent-deep:#b13e58;
  --secondary:  #5e8a4f;   /* sage */
  --leaf:       #4ea862;
  --leaf-deep:  #3d6b2c;
  --footer-bg:  #2c4a36;   /* deep mossy green */

  --display: "Bricolage Grotesque", system-ui, sans-serif;  /* big titles, names */
  --serif:   "Fraunces", Georgia, serif;                    /* italics, case study titles, footer quote */
  --sans:    "Geist", "Inter", system-ui, sans-serif;       /* body */
  --mono:    "Geist Mono", ui-monospace, monospace;         /* labels, eyebrows, nav */

  --r-md: 12px;
  --r-lg: 18px;
  --r-xl: 22px;
  --ease: cubic-bezier(.22,.61,.36,1);
}
```

Fonts loaded from Google Fonts in every `<head>`.

---

## Run locally

```bash
cd ~/Desktop/Portfolio
open index.html              # macOS — opens in default browser
# OR
python3 -m http.server 8000  # then visit http://localhost:8000
```

The Python server avoids any `file://` permission quirks (some macOS versions block local file access for image assets).

---

## Push to GitHub + deploy

### Quick path — Vercel drag-and-drop (no Git needed)

1. Go to https://vercel.com/new
2. Drag the entire `Portfolio` folder onto the page
3. Live URL in 30 seconds

### Git path

```bash
cd ~/Desktop/Portfolio
git init
git add .
git commit -m "Initial portfolio commit"

# Create empty repo on GitHub first, then:
git remote add origin https://github.com/sakshiishahh/portfolio.git
git branch -M main
git push -u origin main
```

Then on Vercel/Netlify: connect the repo, deploy. Both auto-detect static sites.

---

## Open in Claude Code

```bash
cd ~/Desktop/Portfolio
claude
```

Then ask Claude to do anything — it'll have full context on every file.

**Useful first prompts to give Claude Code:**

- *"Read README.md and home.html and tell me how the design system is structured."*
- *"Extract all `:root` CSS variables into a shared `assets/styles.css` and link it from every HTML file."*
- *"Replace the embedded base64 SVG in index.html with an `<img src="assets/garden-mb.svg">` reference and slim the file down to under 50 KB."*
- *"Apply the copy from Sakshi-Site-Copy.md section [N] back into [filename].html."*
- *"Build a sixth case study page using the same template as case-ibm-deal-registration.html for [project name]."*

---

## Things to clean up before final ship

These are quality-of-life fixes for a professional public deploy:

1. ~~Slim down index.html.~~ ✅ Done — was 17 MB, now 16 KB. Welcome SVG is now external at `assets/garden-mb.svg`.

2. **Extract shared CSS into `assets/styles.css`.** Every HTML file repeats the design-system variables, font links, sidebar styles, footer styles. Pull common rules into one stylesheet and link from each page. ~40% smaller per-file. **(Recommended first task in Claude Code.)**

3. **Wire up real "Coming soon" / Plant flow data.** Plant flow currently just stores to `localStorage`. If you want the visitor's lawn to feel inhabited from day one, populate `SEED_PLANTS` in plant.html with names you'd actually want to show up.

4. **Replace placeholder copy.** Search the codebase for `[TODO`, `[Refine`, or `[Community` to find the brackets where copy still needs your voice. The Google Doc has the same markers in matching positions.

5. **Add a 404 page** if you're deploying to a subpath.

6. **Add a `<meta name="description">`** + Open Graph tags on each page for social previews.

7. **Verify external SVG loads on production host.** `index.html` now references `assets/garden-mb.svg`. Test on Vercel/Netlify after deploying — if the welcome scene shows blank, the host may need an explicit MIME type for SVG.

---

## Known interaction notes (so a fresh dev doesn't break them)

- **Welcome → plant.html transition.** Click "step inside" triggers `body.exiting-wash` + `.page.exiting`, doors swing open, cream wash floods, then nav fires after 1.5s. Don't add `e.preventDefault()` to skip the wait.
- **Project hover scope.** `.grid-col-left` and `.grid-col-right` are independent flex columns. Hovering a card grows that column only — the other column doesn't shift.
- **CGI card cursor.** `.card.coming-soon` triggers `body.cursor-soon` (neutral dark "Coming soon") instead of the default coral "View case study" pill. JS in home.html handles this via a class check.
- **Visitor's Lawn nav item.** The hover-vocab swap uses `:has(.hover-label)`, so items without a `.hover-label` span (only Visitor's Lawn) keep their text on hover.
- **Case study mockup.** Hovering each feature card on a case study sets `.is-active` on a sibling `.screen` — phone-frame UI swaps. Pure CSS+JS, no library.

---

## Who to ask for what

- Real copy refinement → edit the Google Doc (link above) and tell me which sections to apply
- Add a new project → use `case-ibm-deal-registration.html` as the template and tell me the content
- New page entirely → describe it, I'll scaffold from existing patterns
- Visual tweaks → name the page + section, I'll dial it in
