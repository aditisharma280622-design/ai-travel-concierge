"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { WorldMapDestination, WorldMapRoute } from "@/lib/landingContent";

type GlobeProps = {
  destinations: WorldMapDestination[];
  routes: WorldMapRoute[];
  // A shared, mutable value (not React state) holding the current
  // scroll progress, 0 to 1. Reading it inside useFrame lets the globe
  // respond to scrolling on every rendered frame without triggering a
  // React re-render each time — important for animation performance.
  progressRef: MutableRefObject<number>;
  reduceMotion: boolean;
};

const RADIUS = 1.6;

// The destinations in lib/landingContent.ts were originally placed using
// an equirectangular map projection (x/y as 0-100 percentages). Rather
// than adding a second, parallel set of coordinates for the globe, this
// converts those same percentages back into longitude/latitude, so both
// the flat map and the globe are always positioned from one shared
// source of truth.
function destinationToLonLat(destination: { x: number; y: number }) {
  const lon = (destination.x / 100) * 360 - 180;
  const lat = 90 - (destination.y / 100) * 180;
  return { lon, lat };
}

function lonLatToVector3(lon: number, lat: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

// A gentle arc between two points on the sphere's surface, lifted
// outward at the midpoint so it reads as a flight path rather than a
// line drawn straight through the globe.
function buildRouteCurve(start: THREE.Vector3, end: THREE.Vector3) {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const liftAmount = RADIUS * (0.18 + start.distanceTo(end) * 0.05);
  mid.normalize().multiplyScalar(RADIUS + liftAmount);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

// A restrained lat/long graticule standing in for continents — a
// schematic "atlas" treatment rather than an attempt at realistic
// coastlines, built procedurally so no texture asset is needed.
function Graticule() {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 48;

    for (let lat = -60; lat <= 60; lat += 30) {
      for (let i = 0; i <= segments; i += 1) {
        const lon = (i / segments) * 360 - 180;
        points.push(lonLatToVector3(lon, lat, RADIUS + 0.002));
      }
      points.push(new THREE.Vector3(NaN, NaN, NaN));
    }

    for (let lon = -180; lon < 180; lon += 30) {
      for (let i = 0; i <= segments; i += 1) {
        const lat = (i / segments) * 180 - 90;
        points.push(lonLatToVector3(lon, lat, RADIUS + 0.002));
      }
      points.push(new THREE.Vector3(NaN, NaN, NaN));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#c9a868" transparent opacity={0.14} />
    </lineSegments>
  );
}

function DestinationMarkers({
  destinations,
}: {
  destinations: WorldMapDestination[];
}) {
  return (
    <group>
      {destinations.map((destination) => {
        const { lon, lat } = destinationToLonLat(destination);
        const position = lonLatToVector3(lon, lat, RADIUS + 0.01);
        const isPrimary = destination.emphasis === "primary";

        return (
          <group key={destination.id} position={position}>
            <mesh>
              <sphereGeometry args={[isPrimary ? 0.024 : 0.018, 12, 12]} />
              <meshBasicMaterial color="#e8d3a0" />
            </mesh>
            <mesh>
              <sphereGeometry args={[isPrimary ? 0.05 : 0.036, 12, 12]} />
              <meshBasicMaterial
                color="#c9a868"
                transparent
                opacity={0.22}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function RouteArcs({
  destinations,
  routes,
}: {
  destinations: WorldMapDestination[];
  routes: WorldMapRoute[];
}) {
  const destinationsById = useMemo(
    () => new Map(destinations.map((destination) => [destination.id, destination])),
    [destinations],
  );

  // Built as real THREE.Line objects (rather than the JSX <line>
  // element) and rendered via <primitive>. TypeScript's DOM types
  // already define an SVG <line> element, which otherwise collides
  // with React Three Fiber's own <line> — using <primitive> sidesteps
  // that name clash entirely.
  const lines = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: "#c9a868",
      transparent: true,
      opacity: 0.55,
    });

    const built: { id: string; line: THREE.Line }[] = [];

    for (const route of routes) {
      const from = destinationsById.get(route.from);
      const to = destinationsById.get(route.to);
      if (!from || !to) continue;

      const fromLonLat = destinationToLonLat(from);
      const toLonLat = destinationToLonLat(to);
      const start = lonLatToVector3(fromLonLat.lon, fromLonLat.lat, RADIUS);
      const end = lonLatToVector3(toLonLat.lon, toLonLat.lat, RADIUS);
      const curve = buildRouteCurve(start, end);
      const points = curve.getPoints(32);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      built.push({ id: route.id, line: new THREE.Line(geometry, material) });
    }

    return built;
  }, [routes, destinationsById]);

  return (
    <group>
      {lines.map(({ id, line }) => (
        <primitive key={id} object={line} />
      ))}
    </group>
  );
}

function GlobeScene({ destinations, routes, progressRef, reduceMotion }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Globe scale/opacity follow scroll progress directly (stage B
    // forming, stage C dominant, stage D receding) — read from the
    // shared ref rather than React state, so this runs every frame
    // without causing a re-render.
    const progress = progressRef.current;
    const formAmount = THREE.MathUtils.clamp(
      (progress - 0.25) / 0.3,
      0,
      1,
    );
    const recedeAmount = THREE.MathUtils.clamp(
      (progress - 0.8) / 0.2,
      0,
      1,
    );
    const scale = THREE.MathUtils.lerp(0.72, 1, formAmount) * (1 - recedeAmount * 0.12);
    group.scale.setScalar(scale);

    // Slow, continuous rotation once the globe has substantially
    // formed. Disabled for anyone who prefers reduced motion.
    if (!reduceMotion && formAmount > 0.05) {
      group.rotation.y += delta * 0.06 * formAmount;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshStandardMaterial
          color="#0f1622"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      <Graticule />
      <DestinationMarkers destinations={destinations} />
      <RouteArcs destinations={destinations} routes={routes} />
      <mesh>
        <sphereGeometry args={[RADIUS * 1.04, 32, 32]} />
        <meshBasicMaterial
          color="#c9a868"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function Globe(props: GlobeProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.4], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 2, 4]} intensity={0.9} color="#f2efe7" />
      <GlobeScene {...props} />
    </Canvas>
  );
}
