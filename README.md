# Voyara

**Your journey. Intelligently planned.**

A premium, cinematic AI travel companion. Built for a hackathon by team
**Ascendant Agents**.

## Current status: Phase 1 — Landing page visual structure

Phase 0 set up the project and the design system. Phase 1 builds out the
full visual structure of the landing page: layout, hierarchy, typography,
and spacing for every section it will eventually need — using elegant
static placeholders wherever an advanced feature (the live map, the 3D
globe) will go later. `/plan` and `/itinerary` are still the Phase 0
placeholders.

### What's here right now

- A working Next.js app (App Router) written in TypeScript
- Tailwind CSS for styling
- ESLint for catching mistakes in the code
- Voyara's dark, cinematic design system: colours, fonts, and a reusable
  "glass panel" look, defined once in `app/globals.css`
- A landing page (`/`) built from small, reusable sections:
  - **Hero** — the Voyara wordmark and tagline
  - **MapPlaceholder** — reserved, styled space for the future living
    world map and map → globe transformation
  - **ScrollQuote** — short travel lines, appearing as the page is
    scrolled (no animation — they're just part of the normal page)
  - **AboutVoyara** — a short explanation of what Voyara does
  - **JourneyCTA** — the prominent "Start Planning Your Journey" call
    to action, with a reserved area for the future travel-vehicle
    transition into `/plan`
- Three routes:
  - `/` — landing page
  - `/plan` — journey builder placeholder
  - `/itinerary` — itinerary placeholder

### What's *not* here yet (on purpose)

The 3D globe, the live/animated world map, real flight routes, scroll-
triggered animation, the travel-vehicle transition, the travel
questionnaire, Claude and Grok integration, Supabase, external travel
APIs, currency conversion, translation, the AI concierge, and
weather/flight data all come in later phases.

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
  page.tsx           Landing page ( / ), composed from components/landing
  plan/page.tsx       Journey builder placeholder ( /plan )
  itinerary/page.tsx  Itinerary placeholder ( /itinerary )
components/
  NavBar.tsx         Top navigation, shown on every page
  Footer.tsx         Bottom footer, shown on every page
  GlassPanel.tsx     Reusable "frosted glass" card used for content panels
  landing/
    Hero.tsx          Full-screen opening section: wordmark and tagline
    MapPlaceholder.tsx Reserved space for the future world map / globe
    ScrollQuote.tsx    Reusable single-quote section
    AboutVoyara.tsx    "What Voyara does" section
    JourneyCTA.tsx     Prominent call-to-action section
lib/
  landingContent.ts  Landing page copy (quotes, headings, body text),
                      kept separate from layout so it's easy to edit
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
