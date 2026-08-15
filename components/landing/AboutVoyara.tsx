import { aboutCopy, pillars } from "@/lib/landingContent";

export default function AboutVoyara() {
  return (
    <section className="px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">
          {aboutCopy.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-3xl text-white-soft sm:text-4xl">
          {aboutCopy.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white-muted sm:text-base">
          {aboutCopy.body}
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="glass-panel px-6 py-8 text-center"
          >
            <h3 className="font-display text-lg text-gold">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white-muted">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
