type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mx-auto max-w-md">
      <div className="flex items-baseline justify-center gap-1 font-display text-sm tracking-[0.2em] text-white-muted">
        <span className="text-gold">{pad(currentStep)}</span>
        <span>/ {pad(totalSteps)}</span>
      </div>
      <div className="mt-3 h-px w-full bg-white/10">
        <div
          className="h-px bg-gold transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
