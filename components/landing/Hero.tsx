import { heroCopy } from "@/lib/landingContent";

// The opening moment of Voyara. Branding only — the prominent call to
// action lives further down the page, in <JourneyCTA />, once the visitor
// has seen what Voyara does. The cinematic backdrop (the "horizon" glow)
// is applied globally in app/globals.css, so this section inherits it
// automatically rather than defining its own background.
export default function Hero() {
  return (
    <section className="flex min-h-[92vh] flex-col items-center justify-center px-6 text-center sm:px-8">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">
        {heroCopy.eyebrow}
      </p>
      <h1 className="mt-6 font-display text-6xl leading-[0.95] text-white-soft sm:text-7xl md:text-8xl">
        Voyara
      </h1>
      <p className="mt-6 max-w-md font-display text-xl italic text-white-muted sm:text-2xl">
        {heroCopy.tagline}
      </p>
      <p className="mt-8 max-w-lg text-sm leading-relaxed text-white-muted sm:text-base">
        {heroCopy.subtext}
      </p>

      <div className="mt-16 flex flex-col items-center gap-2 text-white-muted">
        <span className="text-[0.65rem] uppercase tracking-[0.35em]">
          Scroll to begin
        </span>
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          className="text-gold"
          aria-hidden="true"
        >
          <path
            d="M7 1V19M7 19L1 13M7 19L13 13"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
