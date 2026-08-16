export const stepCopy: Record<
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
