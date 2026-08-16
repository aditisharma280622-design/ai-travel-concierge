Voyara
Your journey. Intelligently planned.
A premium, cinematic AI travel companion. Built for a hackathon by team
Ascendant Agents.
Current status: Phase 3A — Cinematic 2D world map
Phase 0 set up the project and the design system. Phase 1 built the
landing page's visual structure. Phase 2 built the planning
questionnaire. Phase 3A replaces the static map placeholder with a real
cinematic 2D world map on the landing page.
What's here right now
A working Next.js app (App Router) written in TypeScript
Tailwind CSS for styling
ESLint for catching mistakes in the code
Voyara's dark, cinematic design system: colours, fonts, and a reusable
"glass panel" look, defined once in `app/globals.css`
A landing page (`/`) built from small, reusable sections:
Hero — the Voyara wordmark and tagline
World map scene — a stylized, low-contrast world map with
glowing destination points (New York, London, Paris, Dubai, Mumbai,
Singapore, Tokyo, Sydney) connected by soft, curved gold flight
routes. The whole scene fades and draws itself in once it scrolls
into view, using the browser's built-in scroll detection — no
animation library. It respects "reduce motion" accessibility
settings by showing everything instantly, without animation, for
anyone who's asked for that.
ScrollQuote — short travel lines, appearing as the page is
scrolled
AboutVoyara — a short explanation of what Voyara does
JourneyCTA — the prominent "Start Planning Your Journey" call
to action
A nine-step travel planning questionnaire at `/plan`
Three routes:
`/` — landing page
`/plan` — the planning questionnaire
`/itinerary` — itinerary placeholder
The world map is hand-drawn as SVG shapes and CSS — there's no map
library, no map tiles, and no external data. The questionnaire on
`/plan` was not touched in this phase.
What's not here yet (on purpose)
The map is still 2D. The rotating 3D globe (which the map will
eventually transform into), real-time flight data, and the animated
travel-vehicle transition into `/plan` are all planned for a later
phase. AI itinerary generation (Claude/Grok) is not connected, and
there is no backend or database.
Running it locally
You'll need Node.js installed (version 20 or
newer is recommended).
Install dependencies:
```bash
   npm install
   ```
Start the development server:
```bash
   npm run dev
   ```
Open http://localhost:3000 in your browser.
The page updates automatically whenever a file is saved.
Other useful commands:
`npm run build` — builds an optimized production version, to check
everything compiles correctly
`npm run lint` — checks the code for common mistakes and style issues
Project structure
```
app/
  layout.tsx        Shared page frame: fonts, nav bar, footer
  globals.css        Design tokens (colours, fonts), shared styles, and
                      the world map's reveal animations
  page.tsx           Landing page ( / ), composed from components/landing
  plan/page.tsx       The planning questionnaire ( /plan )
  itinerary/page.tsx  Itinerary placeholder ( /itinerary )
components/
  NavBar.tsx         Top navigation, shown on every page
  Footer.tsx         Bottom footer, shown on every page
  GlassPanel.tsx     Reusable "frosted glass" card used for content panels
  landing/
    Hero.tsx              Full-screen opening section: wordmark and tagline
    WorldMapScene.tsx      Detects scroll position and triggers the map's
                            cinematic reveal
    WorldMapIllustration.tsx  The SVG artwork: landmasses, destination
                            points, and flight-route curves
    ScrollQuote.tsx        Reusable single-quote section
    AboutVoyara.tsx        "What Voyara does" section
    JourneyCTA.tsx         Prominent call-to-action section
  planning/
    PlanningForm.tsx    Owns the questionnaire's state, step navigation,
                         validation, and the completion screen
    ProgressIndicator.tsx  Current step number and a thin progress line
    QuestionStep.tsx    Renders the question + answer controls for
                         whichever step is active
    ReviewStep.tsx      Scannable summary of all answers, with per-row
                         edit links and the "Create My Journey" button
lib/
  landingContent.ts  Landing page copy, plus the world map's destination
                       and flight-route data
  planningContent.ts  Questionnaire types, step definitions, and all
                       of the option lists (traveller types, budget
                       levels, travel styles, etc.)
```
Design system
Background: deep navy / charcoal (`--navy`, `--ink`)
Accent: champagne gold (`--gold`, `--gold-bright`)
Text: soft white (`--white-soft`) with a muted secondary tone
(`--white-muted`)
Display font: Fraunces (elegant, used for headings)
Interface font: Inter (clean, used for body and UI text)
Signature visual: a soft gold "horizon" line and glow that sits
behind every page, evoking dusk seen from above
All of these are defined once in `app/globals.css` and reused everywhere,
so changing a value there updates the whole app consistently.
