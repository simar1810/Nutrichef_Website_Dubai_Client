"use client";

import React from "react";
import Link from "next/link";
import { AuthPageShell } from "@/components/AuthPageShell";

export default function PaymentCancelPage() {
  return (
    <AuthPageShell maxWidthClass="max-w-[480px]">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-amber-50">
          <svg
            className="h-8 w-8 text-amber-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="font-heading mb-3 text-2xl font-semibold text-foreground">
          Payment cancelled
        </h1>
        <p className="mb-8 text-sm font-medium text-secondary-text">
          Your payment was not completed. No charges have been made.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/plans"
            className="rounded-xl bg-primary px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
          >
            Back to plans
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-border-subtle bg-background px-8 py-3.5 text-center text-sm font-semibold text-foreground transition hover:bg-bg-light"
          >
            Go to home
          </Link>
        </div>
      </div>
    </AuthPageShell>
  );
}
