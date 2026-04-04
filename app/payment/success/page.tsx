"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatMinorUnits } from "@/lib/formatCurrency";

interface SessionData {
  id: string;
  payment_status: string;
  amount_total: number | null;
  currency: string | null;
  status: string;
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="w-8 h-8 border-3 border-[#249B60] border-t-transparent rounded-full animate-spin" /></div>}>
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
          { noAuth: true }
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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-[480px] text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-[#249B60] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#878E99] text-[15px] font-medium">
              Verifying your payment...
            </p>
          </div>
        ) : error ? (
          <>
            <div className="w-[72px] h-[72px] bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1 className="text-[28px] font-extrabold text-[#2F3337] mb-3">
              Something went wrong
            </h1>
            <p className="text-[#878E99] text-[15px] font-medium mb-8">{error}</p>
            <Link
              href="/plans"
              className="inline-block bg-[#249B60] hover:bg-[#1E8351] text-white px-8 py-3.5 rounded-full font-bold text-[15px] transition-colors"
            >
              Back to Plans
            </Link>
          </>
        ) : (
          <>
            <div className="w-[72px] h-[72px] bg-[#EEF3F0] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#249B60]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="text-[28px] font-extrabold text-[#2F3337] mb-3">
              Payment Successful!
            </h1>
            <p className="text-[#878E99] text-[15px] font-medium mb-2">
              Your meal plan has been activated.
            </p>
            {session && session.amount_total != null && (
              <p className="text-[#2F3337] text-[18px] font-extrabold mb-8">
                {formatMinorUnits(session.amount_total, session.currency || "inr")} paid
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Link
                href="/"
                className="bg-[#249B60] hover:bg-[#1E8351] text-white px-8 py-3.5 rounded-full font-bold text-[15px] transition-colors"
              >
                Go to Home
              </Link>
              <Link
                href="/menu"
                className="bg-[#F2F4F7] hover:bg-gray-200 text-[#2F3337] px-8 py-3.5 rounded-full font-bold text-[15px] transition-colors"
              >
                View Menu
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
