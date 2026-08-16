// All of the written content for the landing page lives here, separate
// from the components that lay it out. Editing the words on the landing
// page should mean editing this file — not hunting through JSX.

export const heroCopy = {
  eyebrow: "Ascendant Agents presents",
  tagline: "Your journey. Intelligently planned.",
  subtext:
    "A premium AI travel companion, built to feel like the beginning of a trip — not another dashboard.",
};

export const worldMapCopy = {
  eyebrow: "Before the planning begins",
  heading: "The world, in motion.",
  body: "Every place you could go is out there, all at once. Voyara narrows that down to the journey that's actually yours, then draws the route to get you there.",
};

// A destination's position on the map, given as a percentage of the
// illustration's width (x) and height (y) — 0,0 is the top-left corner,
// 100,100 is the bottom-right. Kept as percentages so the illustration
// can place them on any size viewBox. "primary" destinations render
// with a slightly stronger glow, marking them as hubs on the map.
export type WorldMapDestination = {
  id: string;
  label: string;
  x: number;
  y: number;
  emphasis?: "primary";
};

export const worldMapDestinations: WorldMapDestination[] = [
  { id: "new-york", label: "New York", x: 29, y: 27 },
  { id: "london", label: "London", x: 50, y: 21, emphasis: "primary" },
  { id: "paris", label: "Paris", x: 51, y: 23 },
  { id: "dubai", label: "Dubai", x: 65, y: 36, emphasis: "primary" },
  { id: "mumbai", label: "Mumbai", x: 70, y: 39 },
  { id: "singapore", label: "Singapore", x: 79, y: 49, emphasis: "primary" },
  { id: "tokyo", label: "Tokyo", x: 89, y: 30 },
  { id: "sydney", label: "Sydney", x: 92, y: 69, emphasis: "primary" },
];

// A flight route just references two destination ids — the illustration
// looks up their positions and draws the curve between them.
export type WorldMapRoute = {
  id: string;
  from: string;
  to: string;
};

export const worldMapRoutes: WorldMapRoute[] = [
  { id: "london-newyork", from: "london", to: "new-york" },
  { id: "paris-dubai", from: "paris", to: "dubai" },
  { id: "dubai-singapore", from: "dubai", to: "singapore" },
  { id: "singapore-sydney", from: "singapore", to: "sydney" },
  { id: "tokyo-sydney", from: "tokyo", to: "sydney" },
  { id: "mumbai-london", from: "mumbai", to: "london" },
];

// Short, unattributed lines written for Voyara — not quotations from any
// existing source. Kept short and few in number on purpose.
export const scrollQuotes = [
  "The journey begins long before you leave.",
  "Somewhere between takeoff and arrival, planning became part of the adventure.",
];

export const aboutCopy = {
  eyebrow: "What Voyara does",
  heading: "Plan a trip like it's already begun",
  body: "Voyara turns a handful of preferences into a complete, personal itinerary, then stays with you as the trip unfolds.",
};

export const pillars = [
  {
    title: "Understand",
    body: "A conversation, not a form — Voyara learns your pace, your budget, and the kind of trip you actually want.",
  },
  {
    title: "Plan",
    body: "Preferences become a real itinerary: routed, timed, and shaped around how you like to travel.",
  },
  {
    title: "Adapt",
    body: "Plans hold up in the real world. When something changes mid-trip, Voyara changes with it.",
  },
];

export const journeyCtaCopy = {
  heading: "Your journey starts here",
  subtext:
    "Answer a few questions and Voyara will shape the rest — routes, stays, and a plan worth boarding.",
  cta: "Start Planning Your Journey",
};
