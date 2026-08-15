"use client";

import { useState } from "react";
import Link from "next/link";
import ProgressIndicator from "./ProgressIndicator";
import QuestionStep from "./QuestionStep";
import ReviewStep from "./ReviewStep";
import {
  QUESTION_STEPS,
  completionCopy,
  initialPlanningState,
  planningIntro,
  type PlanningState,
  type QuestionStepId,
} from "@/lib/planningContent";

const TOTAL_STEPS = QUESTION_STEPS.length + 1; // question steps + review

function isStepValid(stepId: QuestionStepId, state: PlanningState): boolean {
  switch (stepId) {
    case "destination":
      return state.destination.trim() !== "" || state.destinationFlexible;
    case "dates":
      if (state.datesFlexible) return true;
      return (
        state.startDate !== "" &&
        state.endDate !== "" &&
        state.endDate >= state.startDate
      );
    case "travelers":
      return state.travelerType !== null;
    case "budget":
      return state.budget !== null;
    case "style":
      return state.travelStyles.length > 0;
    case "pace":
      return state.pace !== null;
    case "accommodation":
      return state.accommodation.length > 0;
    case "requests":
      return true;
    default:
      return true;
  }
}

export default function PlanningForm() {
  const [state, setState] = useState<PlanningState>(initialPlanningState);
  const [stepIndex, setStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const isReview = stepIndex === QUESTION_STEPS.length;
  const currentStepId = isReview ? null : QUESTION_STEPS[stepIndex];
  const canContinue = currentStepId
    ? isStepValid(currentStepId, state)
    : true;

  function updateState(patch: Partial<PlanningState>) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function goNext() {
    setStepIndex((index) => Math.min(index + 1, QUESTION_STEPS.length));
  }

  function goBack() {
    setStepIndex((index) => Math.max(index - 1, 0));
  }

  if (isComplete) {
    return (
      <div className="mx-auto w-full max-w-xl px-6 py-24 text-center sm:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">
          {completionCopy.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-3xl text-white-soft sm:text-4xl">
          {completionCopy.heading}
        </h1>
        <p className="mt-4 text-sm text-white-muted sm:text-base">
          {completionCopy.body}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full border border-gold/40 bg-gold/10 px-8 py-3 text-sm tracking-wide text-gold transition-colors hover:bg-gold/20"
          >
            {completionCopy.primaryCta}
          </Link>
          <Link
            href="/itinerary"
            className="text-sm tracking-wide text-white-muted transition-colors hover:text-gold"
          >
            {completionCopy.secondaryCta}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-20 sm:px-8 sm:py-28">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">
          {planningIntro.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-3xl text-white-soft sm:text-4xl md:text-5xl">
          {planningIntro.heading}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-white-muted sm:text-base">
          {planningIntro.body}
        </p>
      </div>

      <div className="mt-12">
        <ProgressIndicator currentStep={stepIndex + 1} totalSteps={TOTAL_STEPS} />
      </div>

      <div className="glass-panel mt-8 px-6 py-10 sm:px-10 sm:py-12">
        {isReview ? (
          <ReviewStep
            state={state}
            onEdit={setStepIndex}
            onSubmit={() => setIsComplete(true)}
          />
        ) : (
          currentStepId && (
            <QuestionStep
              stepId={currentStepId}
              value={state}
              onChange={updateState}
            />
          )
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="text-sm tracking-wide text-white-muted transition-colors hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-white-muted"
        >
          Back
        </button>

        {!isReview && (
          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue}
            className="rounded-full border border-gold/40 bg-gold/10 px-8 py-3 text-sm tracking-wide text-gold transition-colors hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-gold/10"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
