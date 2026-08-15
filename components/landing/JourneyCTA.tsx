import Link from "next/link";
import { journeyCtaCopy } from "@/lib/landingContent";

export default function JourneyCTA() {
  return (
    <section className="px-6 py-24 text-center sm:px-8 sm:py-32">
      <h2 className="font-display text-3xl text-white-soft sm:text-4xl">
        {journeyCtaCopy.heading}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-white-muted sm:text-base">
        {journeyCtaCopy.subtext}
      </p>
      <Link
        href="/plan"
        className="mt-10 inline-block rounded-full border border-gold/40 bg-gold/10 px-10 py-4 text-sm tracking-wide text-gold transition-colors hover:bg-gold/20"
      >
        {journeyCtaCopy.cta}
      </Link>

      {/* Reserved for the future travel-vehicle transition (e.g. a plane
          that carries the visitor from the landing page into /plan).
          For Phase 1 this is a static icon and hairline only. */}
      <div className="mx-auto mt-24 flex max-w-md items-center gap-3 text-white-muted">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-gold"
          aria-hidden="true"
        >
          <path
            d="M2 16l19-7-7 19-3-8-9-4z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <span aria-hidden="true" className="h-px flex-1 bg-gold/30" />
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">
          Your journey continues
        </span>
      </div>
    </section>
  );
}
