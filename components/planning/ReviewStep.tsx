import type { PlanningState, QuestionStepId } from "@/lib/planningContent";
import {
  QUESTION_STEPS,
  accommodationOptions,
  budgetOptions,
  paceOptions,
  travelStyleOptions,
  travelerTypeOptions,
} from "@/lib/planningContent";

type ReviewStepProps = {
  state: PlanningState;
  onEdit: (stepIndex: number) => void;
  onSubmit: () => void;
};

function labelFor<T extends { value: string; label: string }>(
  options: T[],
  value: string | null,
) {
  return options.find((option) => option.value === value)?.label ?? "—";
}

function labelsFor<T extends { value: string; label: string }>(
  options: T[],
  values: string[],
) {
  if (values.length === 0) return "—";
  return values
    .map(
      (value) =>
        options.find((option) => option.value === value)?.label ?? value,
    )
    .join(", ");
}

export default function ReviewStep({
  state,
  onEdit,
  onSubmit,
}: ReviewStepProps) {
  const rows: { label: string; value: string; stepId: QuestionStepId }[] = [
    {
      label: "Destination",
      value: state.destinationFlexible
        ? "Open to suggestions"
        : state.destination || "—",
      stepId: "destination",
    },
    {
      label: "Dates",
      value: state.datesFlexible
        ? "Flexible"
        : state.startDate && state.endDate
          ? `${state.startDate} – ${state.endDate}`
          : "—",
      stepId: "dates",
    },
    {
      label: "Travellers",
      value: `${labelFor(travelerTypeOptions, state.travelerType)} · ${state.travelerCount} traveller${state.travelerCount === 1 ? "" : "s"}`,
      stepId: "travelers",
    },
    {
      label: "Budget",
      value:
        labelFor(budgetOptions, state.budget) +
        (state.budgetAmount ? ` · approx ${state.budgetAmount}` : ""),
      stepId: "budget",
    },
    {
      label: "Travel style",
      value: labelsFor(travelStyleOptions, state.travelStyles),
      stepId: "style",
    },
    {
      label: "Pace",
      value: labelFor(paceOptions, state.pace),
      stepId: "pace",
    },
    {
      label: "Accommodation",
      value: labelsFor(accommodationOptions, state.accommodation),
      stepId: "accommodation",
    },
    {
      label: "Special requests",
      value: state.specialRequests || "—",
      stepId: "requests",
    },
  ];

  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-gold">Review</p>
      <h2 className="mt-3 font-display text-2xl text-white-soft sm:text-3xl">
        Your journey, so far
      </h2>
      <p className="mt-2 text-sm text-white-muted">
        Everything look right? You can still make changes below.
      </p>

      <dl className="mt-8 divide-y divide-white/10 text-left">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-white-muted">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm text-white-soft sm:text-base">
                {row.value}
              </dd>
            </div>
            <button
              type="button"
              onClick={() => onEdit(QUESTION_STEPS.indexOf(row.stepId))}
              className="self-start text-xs uppercase tracking-[0.25em] text-white-muted transition-colors hover:text-gold sm:self-center"
            >
              Edit
            </button>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onSubmit}
        className="mt-10 w-full rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-wide text-navy transition-colors hover:bg-gold-bright sm:w-auto"
      >
        Create My Journey
      </button>
    </div>
  );
}
