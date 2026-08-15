import { mapPlaceholderCopy } from "@/lib/landingContent";

// Reserves the visual space where the living world map, flight routes,
// and the eventual map -> globe transformation will go. Everything in
// this component is static: a handful of dashed SVG paths and dots,
// standing in for routes and destinations. No animation, no Three.js,
// no Mapbox — just an intentional placeholder so the page's rhythm and
// proportions are already correct when the real map is built later.
export default function MapPlaceholder() {
  return (
    <section className="px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="glass-panel relative overflow-hidden px-8 py-20 sm:px-12 sm:py-28">
          <svg
            viewBox="0 0 800 400"
            className="absolute inset-0 h-full w-full opacity-40"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <g
              style={{ stroke: "var(--gold)" }}
              strokeWidth={1}
              fill="none"
              strokeDasharray="4 6"
            >
              <path d="M60 320 Q 260 60 480 180 T 740 90" />
              <path d="M120 80 Q 340 260 620 300" />
              <path d="M40 200 Q 300 340 700 220" />
            </g>
            <g style={{ fill: "var(--gold)" }}>
              <circle cx="60" cy="320" r="3" />
              <circle cx="480" cy="180" r="3" />
              <circle cx="740" cy="90" r="3" />
              <circle cx="120" cy="80" r="3" />
              <circle cx="620" cy="300" r="3" />
              <circle cx="700" cy="220" r="3" />
            </g>
          </svg>

          <div className="relative text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">
              {mapPlaceholderCopy.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl text-white-soft sm:text-4xl">
              {mapPlaceholderCopy.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white-muted sm:text-base">
              {mapPlaceholderCopy.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
