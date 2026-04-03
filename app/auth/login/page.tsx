"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api, TENANT_ID } from "@/lib/api";

const COUNTRY_CODES = [
  { code: "+91", label: "IN +91" },
  { code: "+971", label: "AE +971" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+965", label: "KW +965" },
  { code: "+966", label: "SA +966" },
  { code: "+973", label: "BH +973" },
  { code: "+974", label: "QA +974" },
];

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
  const [countryCode, setCountryCode] = useState("+91");
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

    try {
      await api.post(
        "/auth/otp",
        {
          phone: phone.trim(),
          countryCode: countryCode.replace("+", ""),
          tenantId: TENANT_ID,
        },
        { noAuth: true }
      );

      const params = new URLSearchParams({
        phone: phone.trim(),
        countryCode: countryCode.replace("+", ""),
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
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-[110px] border border-gray-200 rounded-[14px] px-3 py-3.5 text-[14px] font-bold text-[#2F3337] bg-white focus:outline-none focus:ring-2 focus:ring-[#249B60] appearance-none cursor-pointer"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
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
