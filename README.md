# Prof. Pius A. Owolawi — Executive Portfolio

Next.js (App Router) implementation of the navy/gold executive portfolio design. No UI libraries — plain CSS + inline SVG icons, so it deploys to Vercel with zero extra dependencies.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

Push this folder to a Git repo and import it in Vercel — no configuration needed. Or from the CLI: `npx vercel`.

## Things to customize (all placeholders are in one file)

Open `components/data.js`:

- `profile.linkedin`, `profile.portfolio`, `profile.github` — currently `"#"`, replace with real URLs
- `profile.calendar` — add a Calendly (or similar) link for the "Schedule a Call" button
- All text content (experience, programs, awards, etc.) lives in this file too

Other assets:

- `public/headshot.jpg` — currently a low-res crop from the design mockup. **Replace with a high-resolution executive headshot** (portrait orientation, roughly 6:7).
- `public/resume.pdf` — the executive CV; all "Download Resume" buttons point here.
- Program cards use gradient + icon placeholders. To use real photos instead, edit the `programs` section in `components/Sections.jsx` and drop images into `public/`.

## Structure

```
app/
  layout.jsx      — metadata + Inter font
  page.jsx        — assembles the sections
  globals.css     — full design system (colors, cards, timeline, footer)
components/
  data.js         — ALL content in one place
  Icons.jsx       — inline SVG icon set
  Nav.jsx         — sticky nav + mobile menu
  Hero.jsx        — hero with animated tech backdrop
  Sections.jsx    — metrics, about, competencies, experience, programs, credentials, contact
```
