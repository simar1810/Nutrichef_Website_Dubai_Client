"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatMinorUnits } from "@/lib/formatCurrency";
import { AuthPageShell } from "@/components/AuthPageShell";

interface SessionData {
  id: string;
  payment_status: string;
  amount_total: number | null;
  currency: string | null;
  status: string;
}

function LoadingSpinner() {
  return (
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
      aria-hidden
    />
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background pt-24">
          <LoadingSpinner />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const res = await api.get<SessionData>(
          `/checkout/session/${sessionId}`,
          { noAuth: true },
        );
        setSession(res.data);
      } catch {
        setError("Could not verify payment. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  return (
    <AuthPageShell maxWidthClass="max-w-[480px]">
      <div className="text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <LoadingSpinner />
            <p className="text-sm font-medium text-secondary-text">
              Verifying your payment...
            </p>
          </div>
        ) : error ? (
          <>
            <div className="mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-red-50">
              <svg
                className="h-8 w-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1 className="font-heading mb-3 text-2xl font-semibold text-foreground">
              Something went wrong
            </h1>
            <p className="mb-8 text-sm font-medium text-secondary-text">
              {error}
            </p>
            <Link
              href="/plans"
              className="inline-block rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Back to plans
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-primary/15">
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="font-heading mb-3 text-2xl font-semibold text-foreground">
              Payment successful
            </h1>
            <p className="mb-2 text-sm font-medium text-secondary-text">
              Your meal plan has been activated.
            </p>
            {session && session.amount_total != null ? (
              <p className="mb-8 font-heading text-lg font-semibold text-foreground">
                {formatMinorUnits(
                  session.amount_total,
                  session.currency || "inr",
                )}{" "}
                paid
              </p>
            ) : (
              <div className="mb-8" />
            )}
            <div className="mt-2 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="rounded-xl bg-primary px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
              >
                Go to home
              </Link>
              <Link
                href="/menu"
                className="rounded-xl border border-border-subtle bg-background px-8 py-3.5 text-center text-sm font-semibold text-foreground transition hover:bg-bg-light"
              >
                View menu
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthPageShell>
  );
}
