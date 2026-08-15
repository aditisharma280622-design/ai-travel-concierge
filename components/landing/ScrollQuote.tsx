type ScrollQuoteProps = {
  quote: string;
};

// A single travel quote, shown as a full section of its own. It appears
// the way any normal page content does — simply by scrolling to it.
// There is no scroll-triggered animation here on purpose (Phase 1 keeps
// motion out entirely); the pacing comes from generous whitespace, not
// from JavaScript or a CSS animation timeline.
export default function ScrollQuote({ quote }: ScrollQuoteProps) {
  return (
    <section className="flex min-h-[55vh] flex-col items-center justify-center px-6 py-20 text-center sm:px-8">
      <span aria-hidden="true" className="h-px w-12 bg-gold/50" />
      <p className="mt-8 max-w-2xl font-display text-2xl italic leading-snug text-white-soft sm:text-3xl md:text-4xl">
        {quote}
      </p>
    </section>
  );
}
