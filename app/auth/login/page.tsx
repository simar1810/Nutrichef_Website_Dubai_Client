"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api, TENANT_ID } from "@/lib/api";
import { CountryCodeSelect } from "@/components/CountryCodeSelect";
import {
  DEFAULT_COUNTRY_CODE_SELECTION,
  DEFAULT_DIAL_CODE,
  dialCodeForApi,
  findRowBySelection,
} from "@/lib/countryCodes";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [phone, setPhone] = useState("");
  const [countrySelection, setCountrySelection] = useState(DEFAULT_COUNTRY_CODE_SELECTION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }

    setLoading(true);
    setError("");

    const row = findRowBySelection(countrySelection);
    const countryCodeDigits = dialCodeForApi(row?.dialCode ?? DEFAULT_DIAL_CODE);

    try {
      await api.post(
        "/auth/otp",
        {
          phone: phone.trim(),
          countryCode: countryCodeDigits,
          tenantId: TENANT_ID,
        },
        { noAuth: true }
      );

      const params = new URLSearchParams({
        phone: phone.trim(),
        countryCode: countryCodeDigits,
        redirect,
      });
      router.push(`/auth/verify?${params.toString()}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to send OTP. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="text-[#249B60] font-black text-[28px] tracking-[0.1em] uppercase inline-block mb-6"
          >
            NUTRICHEF
          </Link>
          <h1 className="text-[28px] font-extrabold text-[#2F3337] tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-[#878E99] text-[15px] font-medium">
            Enter your phone number to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[13px] font-bold text-[#2F3337] mb-2">
              Phone Number
            </label>
            <div className="flex gap-3">
              <CountryCodeSelect value={countrySelection} onChange={setCountrySelection} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter phone number"
                className="flex-1 border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-[#2F3337] placeholder:text-[#A0A5AE] focus:outline-none focus:ring-2 focus:ring-[#249B60]"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-[13px] font-medium bg-red-50 px-4 py-2.5 rounded-[12px]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#249B60] hover:bg-[#1E8351] disabled:bg-[#249B60]/60 text-white font-extrabold text-[15px] py-4 rounded-full transition-colors shadow-[0_4px_14px_0_rgba(36,161,112,0.3)]"
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>

        <p className="text-center text-[13px] text-[#878E99] font-medium mt-8">
          We&apos;ll send you a verification code via WhatsApp
        </p>
      </div>
    </div>
  );
}
