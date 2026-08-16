import type { WorldMapDestination, WorldMapRoute } from "@/lib/landingContent";

type WorldMapIllustrationProps = {
  destinations: WorldMapDestination[];
  routes: WorldMapRoute[];
  isRevealed: boolean;
};

// The illustration's own coordinate space — a 2:1 box, matching the
// usual world-map aspect ratio. Destination positions (given as 0-100
// percentages in lib/landingContent.ts) are converted into this space.
const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 500;

function toPoint(destination: { x: number; y: number }) {
  return {
    x: (destination.x / 100) * VIEW_WIDTH,
    y: (destination.y / 100) * VIEW_HEIGHT,
  };
}

// Builds a gently curved path between two points, always bowing toward
// the top of the map — the same soft arc a flight-route line on a
// travel-brand map traditionally uses. The curve is computed from the
// two endpoints rather than hand-drawn, so it stays correct no matter
// where a destination's position is set.
function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy) || 1;
  const bow = distance * 0.18;

  let normalX = -dy / distance;
  let normalY = dx / distance;

  // Flip the curve if it would bow downward, so every route arcs
  // upward the same way.
  if (midY + normalY * bow > midY) {
    normalX = -normalX;
    normalY = -normalY;
  }

  const controlX = midX + normalX * bow;
  const controlY = midY + normalY * bow;

  return `M${x1},${y1} Q${controlX},${controlY} ${x2},${y2}`;
}

// Deliberately simplified continent silhouettes — an impression of the
// world's landmasses rather than accurate coastlines, kept very low
// contrast so the gold routes and destination points stay the focus.
const LANDMASSES = [
  "M130,90 C180,70 240,75 270,110 C300,140 290,180 260,205 C230,225 190,230 160,210 C120,185 100,140 130,90 Z",
  "M230,240 C260,230 290,250 300,290 C310,340 300,390 270,420 C250,440 225,420 220,380 C215,330 210,270 230,240 Z",
  "M470,95 C510,80 550,90 565,120 C575,145 555,165 520,170 C495,172 465,160 460,135 C458,118 460,105 470,95 Z",
  "M480,190 C520,180 560,195 575,230 C595,280 590,340 565,390 C545,425 505,430 480,400 C455,365 450,300 460,250 C465,225 470,205 480,190 Z",
  "M580,80 C650,60 740,70 800,100 C850,125 860,170 830,200 C790,235 730,220 690,240 C650,260 610,250 590,210 C570,170 565,120 580,80 Z",
  "M810,340 C850,330 890,345 905,375 C915,400 895,420 860,420 C830,420 805,405 800,380 C798,365 800,350 810,340 Z",
];

export default function WorldMapIllustration({
  destinations,
  routes,
  isRevealed,
}: WorldMapIllustrationProps) {
  const revealClass = isRevealed ? "is-revealed" : "";
  const destinationsById = new Map(
    destinations.map((destination) => [destination.id, destination]),
  );

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className="relative mx-auto w-full max-w-3xl"
      role="img"
      aria-label="Stylized world map with glowing flight routes connecting Voyara's featured destinations"
    >
      <defs>
        <radialGradient id="atmosphereGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        className={`map-atmosphere ${revealClass}`}
        cx={VIEW_WIDTH / 2}
        cy={VIEW_HEIGHT / 2}
        rx={VIEW_WIDTH * 0.5}
        ry={VIEW_HEIGHT * 0.55}
        fill="url(#atmosphereGlow)"
      />

      <g
        className={`map-landmass ${revealClass} fill-white-soft/5 stroke-white-soft/10`}
        strokeWidth="1"
      >
        {LANDMASSES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <g>
        {routes.map((route, index) => {
          const from = destinationsById.get(route.from);
          const to = destinationsById.get(route.to);
          if (!from || !to) return null;

          const start = toPoint(from);
          const end = toPoint(to);
          const d = arcPath(start.x, start.y, end.x, end.y);
          const delay = { transitionDelay: `${index * 0.12}s` };

          return (
            <g key={route.id}>
              <path
                d={d}
                fill="none"
                className={`map-route-glow ${revealClass} stroke-gold/15`}
                strokeWidth="3"
                strokeLinecap="round"
                style={delay}
              />
              <path
                d={d}
                fill="none"
                className={`map-route ${revealClass} stroke-gold/65`}
                strokeWidth="1.1"
                strokeLinecap="round"
                style={delay}
              />
            </g>
          );
        })}
      </g>

      <g>
        {destinations.map((destination, index) => {
          const point = toPoint(destination);
          const isPrimary = destination.emphasis === "primary";
          const glowRadius = isPrimary ? 16 : 11;
          const delay = { transitionDelay: `${0.5 + index * 0.08}s` };

          return (
            <g
              key={destination.id}
              className={`map-node ${revealClass}`}
              style={delay}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r={glowRadius}
                fill="url(#nodeGlow)"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={isPrimary ? 2.6 : 2.1}
                className="fill-gold-bright"
              />
              <text
                x={point.x}
                y={point.y - glowRadius - 6}
                textAnchor="middle"
                className="fill-white-muted font-sans text-[11px]"
                style={{ letterSpacing: "0.02em" }}
              >
                {destination.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
