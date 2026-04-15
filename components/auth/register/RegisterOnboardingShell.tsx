"use client";

import Link from "next/link";
import { NutrichefLogo } from "@/components/NutrichefLogo";
import { OnboardingProgress } from "@/components/auth/register/OnboardingProgress";

type Props = {
  children: React.ReactNode;
  step: number;
};

export function RegisterOnboardingShell({ children, step }: Props) {
  return (
    <div className="relative min-h-screen bg-background px-4 pb-28 pt-20 sm:pt-24">
      <div
        className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-primary/[0.08] blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[480px]">
        <div className="mb-6 flex justify-center">
          <Link
            href="/"
            className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <NutrichefLogo className="!h-8 sm:!h-9" priority />
          </Link>
        </div>
        <OnboardingProgress step={step} />
        {children}
      </div>
    </div>
  );
}
