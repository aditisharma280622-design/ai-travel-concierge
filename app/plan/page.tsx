import GlassPanel from "@/components/GlassPanel";

export default function PlanPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 sm:px-8">
      <GlassPanel className="w-full max-w-xl px-8 py-12 text-center sm:px-12">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">
          Journey builder
        </p>
        <h1 className="mt-4 font-display text-3xl text-white-soft sm:text-4xl">
          Tell Voyara where you&apos;re headed
        </h1>
        <p className="mt-4 text-sm text-white-muted sm:text-base">
          This is where your travel questionnaire, preferences, and
          AI-assisted planning will live. It&apos;s being crafted in an
          upcoming phase — for now, this page marks its place.
        </p>
      </GlassPanel>
    </section>
  );
}
