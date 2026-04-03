"use client";

import React from "react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-[480px] text-center">
        <div className="w-[72px] h-[72px] bg-[#FFF4E5] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-[#F59E0B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-[28px] font-extrabold text-[#2F3337] mb-3">
          Payment Cancelled
        </h1>
        <p className="text-[#878E99] text-[15px] font-medium mb-8">
          Your payment was not completed. No charges have been made.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/plans"
            className="bg-[#249B60] hover:bg-[#1E8351] text-white px-8 py-3.5 rounded-full font-bold text-[15px] transition-colors"
          >
            Back to Plans
          </Link>
          <Link
            href="/"
            className="bg-[#F2F4F7] hover:bg-gray-200 text-[#2F3337] px-8 py-3.5 rounded-full font-bold text-[15px] transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
