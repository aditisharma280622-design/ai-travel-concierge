# Voyara

**Your journey. Intelligently planned.**

A premium, cinematic AI travel companion. Built for a hackathon by team
**Ascendant Agents**.

## Current status: Phase 0 — Foundation

This is the very first phase of Voyara. It sets up the project and the
visual design system, with three placeholder pages. None of the "smart"
features (AI planning, maps, live data, etc.) exist yet — those are built
in later phases, one at a time.

### What's here right now

- A working Next.js app (App Router) written in TypeScript
- Tailwind CSS for styling
- ESLint for catching mistakes in the code
- Voyara's dark, cinematic design system: colours, fonts, and a reusable
  "glass panel" look, defined once in `app/globals.css`
- Three routes:
  - `/` — landing page placeholder
  - `/plan` — journey builder placeholder
  - `/itinerary` — itinerary placeholder

### What's *not* here yet (on purpose)

Flight maps, the 3D globe, animations, the travel questionnaire, Claude
and Grok integration, Supabase, external travel APIs, currency
conversion, translation, the AI concierge, and weather/flight data all
come in later phases.

## Running it locally

You'll need [Node.js](https://nodejs.org) installed (version 20 or
newer is recommended).

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

The page updates automatically whenever a file is saved.

Other useful commands:

- `npm run build` — builds an optimized production version, to check
  everything compiles correctly
- `npm run lint` — checks the code for common mistakes and style issues

## Project structure

```
app/
  layout.tsx        Shared page frame: fonts, nav bar, footer
  globals.css        Design tokens (colours, fonts) and shared styles
  page.tsx           Landing page ( / )
  plan/page.tsx       Journey builder placeholder ( /plan )
  itinerary/page.tsx  Itinerary placeholder ( /itinerary )
components/
  NavBar.tsx         Top navigation, shown on every page
  Footer.tsx         Bottom footer, shown on every page
  GlassPanel.tsx     Reusable "frosted glass" card used for content panels
```

## Design system

- **Background:** deep navy / charcoal (`--navy`, `--ink`)
- **Accent:** champagne gold (`--gold`, `--gold-bright`)
- **Text:** soft white (`--white-soft`) with a muted secondary tone
  (`--white-muted`)
- **Display font:** Fraunces (elegant, used for headings)
- **Interface font:** Inter (clean, used for body and UI text)
- **Signature visual:** a soft gold "horizon" line and glow that sits
  behind every page, evoking dusk seen from above

All of these are defined once in `app/globals.css` and reused everywhere,
so changing a value there updates the whole app consistently.
