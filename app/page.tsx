import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:px-8">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">
        Ascendant Agents presents
      </p>
      <h1 className="mt-6 font-display text-5xl leading-tight text-white-soft sm:text-6xl md:text-7xl">
        Voyara
      </h1>
      <p className="mt-6 max-w-md font-display text-xl italic text-white-muted sm:text-2xl">
        Your journey. Intelligently planned.
      </p>
      <p className="mt-6 max-w-lg text-sm text-white-muted sm:text-base">
        The full landing experience — a cinematic map, living flight
        routes, and a passage into your itinerary — is still being
        crafted. For now, step straight into the planning journey.
      </p>
      <Link
        href="/plan"
        className="mt-10 rounded-full border border-gold/40 bg-gold/10 px-8 py-3 text-sm tracking-wide text-gold transition-colors hover:bg-gold/20"
      >
        Start Planning Your Journey
      </Link>
    </section>
  );
}
