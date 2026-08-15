"use client";

import type {
  Accommodation,
  PlanningState,
  QuestionStepId,
  TravelStyle,
} from "@/lib/planningContent";
import {
  accommodationOptions,
  budgetOptions,
  paceOptions,
  stepCopy,
  travelStyleOptions,
  travelerTypeOptions,
} from "@/lib/planningContent";

type QuestionStepProps = {
  stepId: QuestionStepId;
  value: PlanningState;
  onChange: (patch: Partial<PlanningState>) => void;
};

// Renders the question heading for the current step, plus whichever
// answer controls that step needs. Kept as one component (rather than
// eight separate files) since each step is a small amount of markup
// that shares the same layout shell.
export default function QuestionStep({
  stepId,
  value,
  onChange,
}: QuestionStepProps) {
  const copy = stepCopy[stepId];

  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-gold">
        {copy.eyebrow}
      </p>
      <h2 className="mt-3 font-display text-2xl text-white-soft sm:text-3xl">
        {copy.question}
      </h2>
      {copy.description && (
        <p className="mt-2 text-sm text-white-muted">{copy.description}</p>
      )}

      <div className="mt-8">
        {stepId === "destination" && (
          <DestinationFields value={value} onChange={onChange} />
        )}
        {stepId === "dates" && <DateFields value={value} onChange={onChange} />}
        {stepId === "travelers" && (
          <TravelerFields value={value} onChange={onChange} />
        )}
        {stepId === "budget" && <BudgetFields value={value} onChange={onChange} />}
        {stepId === "style" && <StyleFields value={value} onChange={onChange} />}
        {stepId === "pace" && <PaceFields value={value} onChange={onChange} />}
        {stepId === "accommodation" && (
          <AccommodationFields value={value} onChange={onChange} />
        )}
        {stepId === "requests" && (
          <RequestsFields value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
}

type FieldsProps = {
  value: PlanningState;
  onChange: (patch: Partial<PlanningState>) => void;
};

function DestinationFields({ value, onChange }: FieldsProps) {
  return (
    <div className="mx-auto max-w-sm space-y-5">
      <input
        type="text"
        value={value.destination}
        onChange={(event) =>
          onChange({
            destination: event.target.value,
            destinationFlexible: false,
          })
        }
        disabled={value.destinationFlexible}
        placeholder="Paris, Japan, the Amalfi Coast…"
        aria-label="Destination"
        className="w-full border-b border-white/15 bg-transparent pb-3 text-center font-display text-xl text-white-soft placeholder:text-white-muted/60 focus:border-gold focus:outline-none disabled:opacity-40 sm:text-2xl"
      />
      <div className="flex justify-center">
        <Chip
          label="I'm open to suggestions"
          selected={value.destinationFlexible}
          onClick={() =>
            onChange({
              destinationFlexible: !value.destinationFlexible,
              destination: "",
            })
          }
        />
      </div>
    </div>
  );
}

function DateFields({ value, onChange }: FieldsProps) {
  const hasRangeError =
    !value.datesFlexible &&
    value.startDate !== "" &&
    value.endDate !== "" &&
    value.endDate < value.startDate;

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-white-muted">
            Start date
          </span>
          <input
            type="date"
            value={value.startDate}
            disabled={value.datesFlexible}
            onChange={(event) => onChange({ startDate: event.target.value })}
            aria-label="Start date"
            className="mt-2 w-full border-b border-white/15 bg-transparent pb-3 text-white-soft focus:border-gold focus:outline-none disabled:opacity-40"
          />
        </label>
        <label className="block text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-white-muted">
            End date
          </span>
          <input
            type="date"
            value={value.endDate}
            disabled={value.datesFlexible}
            onChange={(event) => onChange({ endDate: event.target.value })}
            aria-label="End date"
            className="mt-2 w-full border-b border-white/15 bg-transparent pb-3 text-white-soft focus:border-gold focus:outline-none disabled:opacity-40"
          />
        </label>
      </div>

      {hasRangeError && (
        <p role="alert" className="text-xs text-white-muted">
          The end date should be on or after the start date.
        </p>
      )}

      <div className="flex justify-center">
        <Chip
          label="I'm flexible with dates"
          selected={value.datesFlexible}
          onClick={() =>
            onChange({
              datesFlexible: !value.datesFlexible,
              startDate: "",
              endDate: "",
            })
          }
        />
      </div>
    </div>
  );
}

function TravelerFields({ value, onChange }: FieldsProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-3">
        {travelerTypeOptions.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={value.travelerType === option.value}
            onClick={() => onChange({ travelerType: option.value })}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-6">
        <span className="text-xs uppercase tracking-[0.3em] text-white-muted">
          Travellers
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Decrease traveller count"
            onClick={() =>
              onChange({
                travelerCount: Math.max(1, value.travelerCount - 1),
              })
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white-soft transition-colors hover:border-gold hover:text-gold"
          >
            −
          </button>
          <span className="w-6 text-center font-display text-lg text-white-soft">
            {value.travelerCount}
          </span>
          <button
            type="button"
            aria-label="Increase traveller count"
            onClick={() =>
              onChange({
                travelerCount: Math.min(12, value.travelerCount + 1),
              })
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white-soft transition-colors hover:border-gold hover:text-gold"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function BudgetFields({ value, onChange }: FieldsProps) {
  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {budgetOptions.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={value.budget === option.value}
            onClick={() => onChange({ budget: option.value })}
          />
        ))}
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.3em] text-white-muted">
          Approximate total budget (optional)
        </span>
        <input
          type="text"
          value={value.budgetAmount}
          onChange={(event) =>
            onChange({ budgetAmount: event.target.value })
          }
          placeholder="e.g. $5,000"
          aria-label="Approximate total budget"
          className="mx-auto mt-3 block w-full max-w-xs border-b border-white/15 bg-transparent pb-3 text-center text-white-soft placeholder:text-white-muted/60 focus:border-gold focus:outline-none"
        />
      </label>
    </div>
  );
}

function StyleFields({ value, onChange }: FieldsProps) {
  function toggle(style: TravelStyle) {
    const isSelected = value.travelStyles.includes(style);
    onChange({
      travelStyles: isSelected
        ? value.travelStyles.filter((item) => item !== style)
        : [...value.travelStyles, style],
    });
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {travelStyleOptions.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={value.travelStyles.includes(option.value)}
          onClick={() => toggle(option.value)}
        />
      ))}
    </div>
  );
}

function PaceFields({ value, onChange }: FieldsProps) {
  return (
    <div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-3">
      {paceOptions.map((option) => (
        <OptionCard
          key={option.value}
          label={option.label}
          description={option.description}
          selected={value.pace === option.value}
          onClick={() => onChange({ pace: option.value })}
        />
      ))}
    </div>
  );
}

function AccommodationFields({ value, onChange }: FieldsProps) {
  function toggle(option: Accommodation) {
    const isSelected = value.accommodation.includes(option);
    onChange({
      accommodation: isSelected
        ? value.accommodation.filter((item) => item !== option)
        : [...value.accommodation, option],
    });
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {accommodationOptions.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={value.accommodation.includes(option.value)}
          onClick={() => toggle(option.value)}
        />
      ))}
    </div>
  );
}

function RequestsFields({ value, onChange }: FieldsProps) {
  return (
    <textarea
      value={value.specialRequests}
      onChange={(event) =>
        onChange({ specialRequests: event.target.value })
      }
      placeholder="Tell us about anything that would make this trip feel especially yours…"
      aria-label="Special requests"
      rows={6}
      className="mx-auto block w-full max-w-xl resize-none rounded-xl border border-white/15 bg-transparent p-4 text-left text-sm text-white-soft placeholder:text-white-muted/60 focus:border-gold focus:outline-none sm:text-base"
    />
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-5 py-2 text-sm tracking-wide transition-colors ${
        selected
          ? "border-gold bg-gold/15 text-gold"
          : "border-white/15 text-white-muted hover:border-gold/40 hover:text-gold"
      }`}
    >
      {label}
    </button>
  );
}

function OptionCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-2xl border px-5 py-5 text-left transition-colors ${
        selected
          ? "border-gold bg-gold/10"
          : "border-white/15 hover:border-gold/40"
      }`}
    >
      <span
        className={`block font-display text-base ${
          selected ? "text-gold" : "text-white-soft"
        }`}
      >
        {label}
      </span>
      <p className="mt-1 text-xs text-white-muted">{description}</p>
    </button>
  );
}
