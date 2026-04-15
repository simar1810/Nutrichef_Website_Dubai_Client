"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { RegisterOnboardingShell } from "@/components/auth/register/RegisterOnboardingShell";
import {
  REGISTER_TOTAL_STEPS,
  buildRegisterBody,
  defaultRegisterWizardState,
  RegisterWizardState,
} from "@/lib/registerApiMapping";
import {
  Step10Review,
  Step11Legal,
  Step12Submit,
  Step1NameEmail,
  Step2Vitals,
  Step3Gender,
  Step4Goals,
  Step5BmiRecap,
  Step6TargetWeight,
  Step7Activity,
  Step8Health,
  Step9Nutrition,
} from "@/components/auth/register/WizardSteps";

type Props = {
  registrationToken: string;
  redirect: string;
};

function validateEmail(email: string): boolean {
  if (!email.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function RegisterWizard({ registrationToken, redirect }: Props) {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<RegisterWizardState>(defaultRegisterWizardState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goToStep = useCallback((n: number) => {
    setError("");
    setStep(Math.min(REGISTER_TOTAL_STEPS, Math.max(1, n)));
  }, []);

  const validateStep = useCallback(
    (s: number): string | null => {
      switch (s) {
        case 1:
          if (!state.name.trim()) return "Please enter your name";
          if (!validateEmail(state.email)) return "Please enter a valid email";
          return null;
        case 3:
          if (!state.gender) return "Please select your gender";
          return null;
        case 4:
          if (!state.goal) return "Please choose a goal";
          return null;
        case 7:
          if (!state.activityLevel) return "Please select your activity level";
          return null;
        case 9:
          if (!state.dietPreference) return "Please select a dietary preference";
          return null;
        case 11:
          if (!state.termsAccepted) return "Please confirm to continue";
          return null;
        default:
          return null;
      }
    },
    [state],
  );

  const submit = useCallback(async () => {
    const v =
      validateStep(1) ||
      validateStep(3) ||
      validateStep(4) ||
      validateStep(7) ||
      validateStep(9) ||
      validateStep(11);
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const body = buildRegisterBody(registrationToken, state);
      const res = await api.post<{
        accessToken: string;
        refreshToken: string;
        user: { _id: string };
      }>("/auth/register", body, { noAuth: true });
      await login(res.data.accessToken, res.data.refreshToken);
      router.push(redirect);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [login, redirect, registrationToken, router, state, validateStep]);

  const onContinue = () => {
    const v = validateStep(step);
    if (v) {
      setError(v);
      return;
    }
    setError("");
    if (step >= REGISTER_TOTAL_STEPS) {
      void submit();
      return;
    }
    setStep((x) => x + 1);
  };

  const onBack = () => {
    setError("");
    setStep((x) => Math.max(1, x - 1));
  };

  const primaryLabel =
    step >= REGISTER_TOTAL_STEPS ? "Create account" : "Continue";

  return (
    <RegisterOnboardingShell step={step}>
      {step === 1 ? (
        <Step1NameEmail state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 2 ? (
        <Step2Vitals state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 3 ? (
        <Step3Gender state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 4 ? (
        <Step4Goals state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 5 ? (
        <Step5BmiRecap state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 6 ? (
        <Step6TargetWeight state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 7 ? (
        <Step7Activity state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 8 ? (
        <Step8Health state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 9 ? (
        <Step9Nutrition state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 10 ? (
        <Step10Review state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 11 ? (
        <Step11Legal state={state} setState={setState} goToStep={goToStep} />
      ) : null}
      {step === 12 ? <Step12Submit /> : null}

      <div className="mt-10 flex flex-col gap-3">
        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row-reverse sm:gap-3">
          <button
            type="button"
            onClick={onContinue}
            disabled={loading}
            className="w-full rounded-2xl bg-foreground py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "Creating account…" : primaryLabel}
          </button>
          {step > 1 ? (
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className="w-full rounded-2xl border-2 border-border-subtle bg-transparent py-4 text-sm font-semibold text-foreground transition hover:border-foreground/25 disabled:opacity-50"
            >
              Back
            </button>
          ) : null}
        </div>

        {step === 8 ? (
          <button
            type="button"
            onClick={() => {
              setError("");
              setStep(9);
            }}
            className="w-full py-2 text-center text-sm font-medium text-secondary-text underline-offset-2 hover:underline"
          >
            Skip for now
          </button>
        ) : null}

        {step < 12 ? (
          <p className="text-center text-xs text-secondary-text/90">
            Don&apos;t worry, your data is secure with us.
          </p>
        ) : null}
      </div>
    </RegisterOnboardingShell>
  );
}
