"use client";

import { useEffect, useRef, useState } from "react";
import WorldMapIllustration from "./WorldMapIllustration";
import {
  worldMapCopy,
  worldMapDestinations,
  worldMapRoutes,
} from "@/lib/landingContent";

// Watches the section using the browser's built-in IntersectionObserver
// (no animation library) and triggers the cinematic reveal once, the
// first time the section scrolls into view.
export default function WorldMapScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 py-24 sm:px-8 sm:py-32">
      <div ref={sectionRef} className="mx-auto max-w-5xl">
        <div className="glass-panel relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20">
          <WorldMapIllustration
            destinations={worldMapDestinations}
            routes={worldMapRoutes}
            isRevealed={isRevealed}
          />

          <div
            className={`map-reveal relative mt-10 text-center ${isRevealed ? "is-revealed" : ""}`}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-gold">
              {worldMapCopy.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl text-white-soft sm:text-4xl">
              {worldMapCopy.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white-muted sm:text-base">
              {worldMapCopy.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
