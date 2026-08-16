// Types and written content for the /plan questionnaire. Kept together
// because the option lists below are what define the union types above
// them — following the same "content lives in lib/" pattern already
// used for the landing page in lib/landingContent.ts.

export type TravelerType = "solo" | "couple" | "family" | "friends" | "other";

export type BudgetLevel = "essential" | "comfortable" | "premium" | "luxury";

export type TravelStyle =
  | "slow"
  | "culture"
  | "food"
  | "adventure"
  | "nature"
  | "beach"
  | "art"
  | "nightlife"
  | "wellness"
  | "shopping";

export type Pace = "slow" | "balanced" | "full";

export type Accommodation =
  | "boutique"
  | "luxury"
  | "resorts"
  | "design"
  | "apartments"
  | "flexible";

// The full shape of what the questionnaire collects. Lives only in
// client-side component state for Phase 2 — nothing here is sent
// anywhere.
export interface PlanningState {
  destination: string;
  destinationFlexible: boolean;
  startDate: string;
  endDate: string;
  datesFlexible: boolean;
  travelerType: TravelerType | null;
  travelerCount: number;
  budget: BudgetLevel | null;
  budgetAmount: string;
  travelStyles: TravelStyle[];
  pace: Pace | null;
  accommodation: Accommodation[];
  specialRequests: string;
}

export const initialPlanningState: PlanningState = {
  destination: "",
  destinationFlexible: false,
  startDate: "",
  endDate: "",
  datesFlexible: false,
  travelerType: null,
  travelerCount: 1,
  budget: null,
  budgetAmount: "",
  travelStyles: [],
  pace: null,
  accommodation: [],
  specialRequests: "",
};

// The eight question steps, in order. The review step comes after the
// last of these, so the total step count is QUESTION_STEPS.length + 1.
export const QUESTION_STEPS = [
  "destination",
  "dates",
  "travelers",
  "budget",
  "style",
  "pace",
  "accommodation",
  "requests",
] as const;

export type QuestionStepId = (typeof QUESTION_STEPS)[number];

export const stepCopy: Record
  QuestionStepId,
  { eyebrow: string; question: string; description?: string }
> = {
  destination: {
    eyebrow: "Destination",
    question: "Where would you like to go?",
    description: "A place, a region, or a feeling — we'll take it from there.",
  },
  dates: {
    eyebrow: "Dates",
    question: "When are you planning to travel?",
  },
  travelers: {
    eyebrow: "Travellers",
    question: "Who are you travelling with?",
  },
  budget: {
    eyebrow: "Budget",
    question: "What kind of trip are you imagining?",
  },
  style: {
    eyebrow: "Travel style",
    question: "What should this journey feel like?",
    description: "Choose as many as speak to you.",
  },
  pace: {
    eyebrow: "Pace",
    question: "How do you like to travel?",
  },
  accommodation: {
    eyebrow: "Accommodation",
    question: "Where would you like to stay?",
  },
  requests: {
    eyebrow: "Special requests",
    question: "Anything else Voyara should know?",
  },
};

export const travelerTypeOptions: { value: TravelerType; label: string }[] = [
  { value: "solo", label: "Solo" },
  { value: "couple", label: "Couple" },
  { value: "family", label: "Family" },
  { value: "friends", label: "Friends" },
  { value: "other", label: "Other" },
];

export const budgetOptions: {
  value: BudgetLevel;
  label: string;
  description: string;
}[] = [
  {
    value: "essential",
    label: "Essential",
    description: "Smart, comfortable, and mindful of cost.",
  },
  {
    value: "comfortable",
    label: "Comfortable",
    description: "A relaxed balance of comfort and value.",
  },
  {
    value: "premium",
    label: "Premium",
    description: "Elevated stays and experiences throughout.",
  },
  {
    value: "luxury",
    label: "Luxury",
    description: "The very best, without compromise.",
  },
];

export const travelStyleOptions: { value: TravelStyle; label: string }[] = [
  { value: "slow", label: "Slow & restorative" },
  { value: "culture", label: "Culture & history" },
  { value: "food", label: "Food & wine" },
  { value: "adventure", label: "Adventure" },
  { value: "nature", label: "Nature" },
  { value: "beach", label: "Beach & relaxation" },
  { value: "art", label: "Art & design" },
  { value: "nightlife", label: "Nightlife" },
  { value: "wellness", label: "Wellness" },
  { value: "shopping", label: "Shopping" },
];

export const paceOptions: {
  value: Pace;
  label: string;
  description: string;
}[] = [
  {
    value: "slow",
    label: "Slow and unhurried",
    description: "Fewer stops, more time to settle in.",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "A comfortable mix of rest and exploration.",
  },
  {
    value: "full",
    label: "Full days and lots to explore",
    description: "Make the most of every hour.",
  },
];

export const accommodationOptions: { value: Accommodation; label: string }[] = [
  { value: "boutique", label: "Boutique hotels" },
  { value: "luxury", label: "Luxury hotels" },
  { value: "resorts", label: "Resorts" },
  { value: "design", label: "Design hotels" },
  { value: "apartments", label: "Apartments & villas" },
  { value: "flexible", label: "Flexible — let Voyara decide" },
];

export const planningIntro = {
  eyebrow: "Plan your journey",
  heading: "Tell us how you want to travel.",
  body: "Give Voyara a sense of what matters to you. We'll use this brief to shape the journey.",
};

export const completionCopy = {
  eyebrow: "Journey brief",
  heading: "Your journey brief is ready.",
  body: "Voyara's planning intelligence will turn this into a full itinerary in a later phase. For now, your answers are saved for this session.",
  primaryCta: "Back to Home",
  secondaryCta: "View Journey Brief",
};
