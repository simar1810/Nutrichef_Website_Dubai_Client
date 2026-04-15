"use client";

import { REGISTER_TOTAL_STEPS } from "@/lib/registerApiMapping";

type Props = {
  step: number;
};

export function OnboardingProgress({ step }: Props) {
  const safe = Math.min(REGISTER_TOTAL_STEPS, Math.max(1, step));
  const pct = (safe / REGISTER_TOTAL_STEPS) * 100;

  return (
    <div className="mb-6" aria-current="step">
      <p className="mb-2.5 font-heading text-2xl font-semibold tracking-tight text-foreground">
        Step {safe}
        <span className="text-base font-medium text-secondary-text/80">
          {" "}
          /{REGISTER_TOTAL_STEPS}
        </span>
      </p>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-[#e2edd1]"
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={1}
        aria-valuemax={REGISTER_TOTAL_STEPS}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
