# Voyara

**Your journey. Intelligently planned.**

A premium, cinematic AI travel companion. Built for a hackathon by team
**Ascendant Agents**.

## Current status: Phase 3B — Cinematic 2D map → 3D globe transition

Phase 0 set up the project and the design system. Phase 1 built the
landing page's visual structure. Phase 2 built the planning
questionnaire. Phase 3A added the static 2D world map. Phase 3B turns
that map into a scroll-driven experience that transitions into a
slowly rotating 3D globe.

### What's here right now

- A working Next.js app (App Router) written in TypeScript
- Tailwind CSS for styling
- ESLint for catching mistakes in the code
- Voyara's dark, cinematic design system: colours, fonts, and a reusable
  "glass panel" look, defined once in `app/globals.css`
- A landing page (`/`) built from small, reusable sections:
  - **Hero** — the Voyara wordmark and tagline
  - **World map scene** — as the visitor scrolls through this section,
    the 2D map (from Phase 3A) gently fades while a stylized 3D globe
    forms in its place, built with Three.js and React Three Fiber. The
    globe carries over the same destinations (New York, London, Paris,
    Dubai, Mumbai, Singapore, Tokyo, Sydney) and flight routes as the
    flat map, now positioned on a sphere and connected by soft curved
    gold arcs. Once formed, the globe rotates slowly and continuously,
    then recedes gently as the page continues. If a visitor's browser
    doesn't support WebGL, or they've asked their device for reduced
    motion, the scene simply stays as the calm, static 2D map — nothing
    breaks, and nothing spins.
  - **ScrollQuote** — short travel lines, appearing as the page is
    scrolled
  - **AboutVoyara** — a short explanation of what Voyara does
  - **JourneyCTA** — the prominent "Start Planning Your Journey" call
    to action
- A nine-step travel planning questionnaire at `/plan`
- Three routes:
  - `/` — landing page
  - `/plan` — the planning questionnaire
  - `/itinerary` — itinerary placeholder

The globe is built entirely from simple shapes and lines — there's no
map texture, no satellite imagery, and no external map service. Scroll
position drives the whole transition directly (no scroll-animation
library); the globe's rotation and fade also respect the "reduce
motion" accessibility setting.

### What's *not* here yet (on purpose)

The animated travel-vehicle transition into `/plan` is still planned
for a later phase. AI itinerary generation (Claude/Grok) is not
connected, and there is no backend, database, or real-time travel
data.

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
