"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import WorldMapIllustration from "./WorldMapIllustration";
import {
worldMapCopy,
worldMapDestinations,
worldMapRoutes,
} from "@/lib/landingContent";

// The globe needs the browser's WebGL/canvas APIs, so it's loaded only
// on the client, after the page has mounted — never during server
// rendering. This avoids any server/client mismatch.
const Globe = dynamic(() => import("./Globe"), { ssr: false });

function supportsWebGL() {
try {
const canvas = document.createElement("canvas");
return Boolean(
window.WebGLRenderingContext &&
(canvas.getContext("webgl") ||
canvas.getContext("experimental-webgl")),
);
} catch {
return false;
}
}

export default function WorldMapScene() {
const sectionRef = useRef<HTMLDivElement>(null);
const mapLayerRef = useRef<HTMLDivElement>(null);
const globeLayerRef = useRef<HTMLDivElement>(null);
const progressRef = useRef(0);

const [isRevealed, setIsRevealed] = useState(false);
const [canRenderGlobe, setCanRenderGlobe] = useState(false);
const [reduceMotion, setReduceMotion] = useState(false);

// One-time checks, run after mount (never during server rendering,
// where `window` and `document` don't exist): does this browser
// support WebGL, and has the visitor asked for reduced motion?
useEffect(() => {
// WebGL support can't change during a page's lifetime, so this is
// deliberately a one-time client-only capability check.
// eslint-disable-next-line react-hooks/set-state-in-effect
setCanRenderGlobe(supportsWebGL());

```
const query = window.matchMedia("(prefers-reduced-motion: reduce)");
setReduceMotion(query.matches);

const handleChange = (event: MediaQueryListEvent) =>
  setReduceMotion(event.matches);

query.addEventListener("change", handleChange);

return () => query.removeEventListener("change", handleChange);
```

}, []);

// Reveals the supporting copy once, the first time the section
// scrolls into view.
useEffect(() => {
const node = sectionRef.current;
if (!node) return;

```
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
```

}, []);

// Drives the unified map -> globe composition as the visitor scrolls.
// Both layers remain in the same visual stage. The map never disappears
// completely while the globe forms; instead, it becomes a quieter
// background layer while the globe becomes the dimensional focal point.
useEffect(() => {
if (!canRenderGlobe || reduceMotion) return;

```
let frameId: number;

const tick = () => {
  const section = sectionRef.current;

  if (section) {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const total = viewportHeight + rect.height || 1;
    const raw = (viewportHeight - rect.top) / total;
    const progress = Math.min(1, Math.max(0, raw));

    progressRef.current = progress;

    // Globe forms during the middle portion of the section.
    const formAmount = Math.min(
      1,
      Math.max(0, (progress - 0.25) / 0.3),
    );

    // Both map and globe gently recede together near the end.
    const recedeAmount = Math.min(
      1,
      Math.max(0, (progress - 0.8) / 0.2),
    );

    // Keep the map visible throughout the globe transition.
    // At maximum formation the map settles around 30% opacity
    // instead of disappearing completely.
    const mapBaseOpacity = 1 - formAmount * 0.7;

    // Shared composition fade keeps the two layers visually unified
    // as the visitor leaves the section.
    const compositionFade = 1 - recedeAmount * 0.25;

    const mapOpacity = mapBaseOpacity * compositionFade;

    // The globe becomes dominant but remains part of the same
    // composition instead of replacing the map.
    const globeOpacity =
      formAmount * (1 - recedeAmount * 0.4) * compositionFade;

    if (mapLayerRef.current) {
      mapLayerRef.current.style.opacity = String(mapOpacity);

      // Keep the map almost full-size so it remains an atmospheric
      // background rather than feeling like it is being removed.
      mapLayerRef.current.style.transform = `scale(${
        1 - formAmount * 0.04
      })`;
    }

    if (globeLayerRef.current) {
      globeLayerRef.current.style.opacity = String(globeOpacity);
    }
  }

  frameId = requestAnimationFrame(tick);
};

frameId = requestAnimationFrame(tick);

return () => cancelAnimationFrame(frameId);
```

}, [canRenderGlobe, reduceMotion]);

// With reduced motion (or no WebGL), skip the animated transition:
// the existing 2D map remains the calm static representation.
const showGlobeLayer = canRenderGlobe && !reduceMotion;

return ( <section className="px-6 py-24 sm:px-8 sm:py-32"> <div ref={sectionRef} className="mx-auto max-w-5xl"> <div className="glass-panel relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20">
{/* One shared visual stage for both the 2D map and 3D globe. */} <div className="relative mx-auto aspect-[2/1] w-full max-w-3xl">
{/* Background atlas layer */}
<div
ref={mapLayerRef}
className="absolute inset-0"
style={{ transition: "opacity 0.2s linear" }}
> <WorldMapIllustration
             destinations={worldMapDestinations}
             routes={worldMapRoutes}
             isRevealed={isRevealed}
           /> </div>

```
        {/* Dimensional globe layer occupying the exact same visual stage */}
        {showGlobeLayer && (
          <div
            ref={globeLayerRef}
            className="pointer-events-none absolute inset-0"
            style={{ opacity: 0 }}
            aria-hidden="true"
          >
            <Globe
              destinations={worldMapDestinations}
              routes={worldMapRoutes}
              progressRef={progressRef}
              reduceMotion={reduceMotion}
            />
          </div>
        )}
      </div>

      <div
        className={`map-reveal relative mt-10 text-center ${
          isRevealed ? "is-revealed" : ""
        }`}
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
```

);
}
