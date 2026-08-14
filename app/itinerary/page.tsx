import GlassPanel from "@/components/GlassPanel";

export default function ItineraryPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 sm:px-8">
      <GlassPanel className="w-full max-w-xl px-8 py-12 text-center sm:px-12">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">
          Your itinerary
        </p>
        <h1 className="mt-4 font-display text-3xl text-white-soft sm:text-4xl">
          Your trip, laid out for you
        </h1>
        <p className="mt-4 text-sm text-white-muted sm:text-base">
          Maps, day-by-day plans, and your AI travel concierge will appear
          here once a journey has been planned. This page is only a
          placeholder for now.
        </p>
      </GlassPanel>
    </section>
  );
}
