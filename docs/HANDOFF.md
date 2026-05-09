# Step-by-step: push to code & deploy

Follow these in order. Total time: ~10 minutes for steps 1–4.

---

## Step 1 · Open Terminal

Open Terminal app on macOS (Spotlight: ⌘ + Space → "Terminal").

```bash
cd ~/Desktop/Portfolio
```

You should see the prompt change to show you're in the Portfolio folder.

To verify you're in the right place:

```bash
ls
```

You should see `index.html`, `home.html`, etc.

---

## Step 2 · Test it works locally

```bash
python3 -m http.server 8000
```

Open browser → http://localhost:8000

Click through Welcome → step inside → home → about → ai → playground → case studies. Make sure everything works, testimonials scroll continuously, the "kind words below" hint shows between projects and testimonials.

When done, press **Ctrl + C** in Terminal to stop the server.

---

## Step 3 · Push to GitHub

### 3a. Create a GitHub repo

1. Go to https://github.com/new
2. Repo name: `portfolio`
3. Description: "Sakshi Shah — product designer portfolio"
4. **Public** (so you can deploy from it)
5. Do NOT check "Initialize with README"
6. Click "Create repository"
7. Copy the URL it gives you — looks like `https://github.com/sakshiishahh/portfolio.git`

### 3b. Push your folder up

In Terminal (still in `~/Desktop/Portfolio`):

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/sakshiishahh/portfolio.git
git push -u origin main
```

(Replace the URL with the one you copied. If it asks for credentials, use a GitHub Personal Access Token instead of password — go to GitHub Settings → Developer settings → Tokens → Generate.)

---

## Step 4 · Deploy to Vercel

The easiest, fastest path:

1. Go to https://vercel.com/new
2. Sign in with GitHub (one click)
3. Click "Import" next to your `portfolio` repo
4. Leave all settings as default — Vercel auto-detects static site
5. Click "Deploy"

In ~30 seconds you'll get a live URL like `portfolio-sakshiishahh.vercel.app`. You can attach a custom domain later in Vercel settings.

**Every time you push to GitHub from now on, Vercel auto-redeploys.**

---

## Step 5 · Open in Claude Code (for further edits)

Install Claude Code if you haven't: https://claude.com/claude-code

Then in Terminal:

```bash
cd ~/Desktop/Portfolio
claude
```

Claude Code will open. Give it any of these first prompts:

### Best opening prompts

**"Read README.md and tell me what's in this folder."**
→ Gets Claude oriented to the design system, file structure, conventions.

**"Extract all the shared CSS from the 11 HTML files into a new `assets/styles.css` and link it from every page. Keep page-specific styles inline. Don't break the visuals."**
→ Removes the biggest bit of duplication. Makes future styling changes one-edit instead of eleven.

**"Open Sakshi-Site-Copy.md, find section [N], and apply that copy back to [filename].html. Show me a diff before saving."**
→ Wires refined copy from your Google Doc back into the site.

**"Search the codebase for `[TODO]`, `[Refine`, and `[Community` and list everywhere that needs my input."**
→ Punch list of what copy still needs your voice.

**"Build a sixth case study page using `case-ibm-deal-registration.html` as a template. Project: [name], tags: [tags], lede: [text]. Use the same TOC sidebar, hero, banner, sections."**
→ New case study scaffolded in one prompt.

**"Apply the changes I just made in [filename] to all the other case study pages in this folder."**
→ Sync a tweak across the case template.

---

## Step 6 · Connect a custom domain (optional, when ready)

In Vercel → your project → Settings → Domains → Add. Vercel walks you through DNS records. Most domain registrars (Namecheap, Squarespace, etc.) take ~10 min to propagate.

---

## Common gotchas

**The welcome page (index.html) shows a blank scene after deploying.**
→ Check `assets/garden-mb.svg` was uploaded to the host. The SVG is now external (was base64-embedded during dev).

**Fonts look wrong / unstyled.**
→ Confirm the Google Fonts `<link>` is loading. Some corporate networks block fontsapis.com.

**Project hover meta panel "shifts" the wrong column.**
→ Confirm `.grid-col-left` and `.grid-col-right` are wrapping the cards (not just listed flat in `.grid`). The two columns must be independent flex containers.

**Cursor stays as default arrow.**
→ Custom cursor only fires on hover devices with fine pointers. On trackpads/mouse it should work; on touch devices it's hidden by design.

---

## What's where (tldr)

| File | Purpose |
|---|---|
| `index.html` | Welcome scene (door transition into plant flow) |
| `home.html` | Main work page |
| `about.html` | About me |
| `ai.html` | AI Practices |
| `plant.html` | Visitor's Lawn (planting flow) |
| `playground.html` | Coming-soon scene |
| `case-*.html` | 5 project case studies (IBM, Money20, CGI, DP, Khaana) |
| `assets/garden-mb.svg` | Welcome page watercolor |
| `Sakshi-Site-Copy.docx` | Local copy doc |
| `Sakshi-Site-Copy.md` | Markdown twin |
| `README.md` | This-but-longer (design system, animations, conventions) |

Live Google Doc: https://docs.google.com/document/d/1dNGaNrpSeKSBtlcIyvYlwA60nY4ZjVceCyEP0G8vbUM/edit
