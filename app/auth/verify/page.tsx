"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api, TENANT_ID } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const OTP_LENGTH = 6;

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerifyContent />
    </Suspense>
  );
}

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const phone = searchParams.get("phone") || "";
  const countryCode = searchParams.get("countryCode") || "91";
  const redirect = searchParams.get("redirect") || "/";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!phone) {
      router.replace("/auth/login");
    }
  }, [phone, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const newOtp = [...otp];
    for (let i = 0; i < text.length; i++) {
      newOtp[i] = text[i];
    }
    setOtp(newOtp);
    const nextIndex = Math.min(text.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 4) {
      setError("Please enter the full verification code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.put<{
        isNewUser: boolean;
        accessToken?: string;
        refreshToken?: string;
        registrationToken?: string;
        user?: { _id: string };
      }>(
        "/auth/otp",
        {
          phone,
          countryCode,
          otp: otpString,
          tenantId: TENANT_ID,
        },
        { noAuth: true }
      );

      const data = res.data;

      if (data.isNewUser && data.registrationToken) {
        const params = new URLSearchParams({
          registrationToken: data.registrationToken,
          redirect,
        });
        router.push(`/auth/register?${params.toString()}`);
      } else if (data.accessToken && data.refreshToken) {
        await login(data.accessToken, data.refreshToken);
        router.push(redirect);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid OTP. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    try {
      await api.post(
        "/auth/otp",
        {
          phone,
          countryCode,
          tenantId: TENANT_ID,
        },
        { noAuth: true }
      );
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setResending(false);
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
            Verify your number
          </h1>
          <p className="text-[#878E99] text-[15px] font-medium">
            Enter the code sent to{" "}
            <span className="text-[#2F3337] font-bold">
              +{countryCode} {phone}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-[50px] h-[56px] text-center text-[20px] font-extrabold text-[#2F3337] border-2 border-gray-200 rounded-[14px] focus:outline-none focus:border-[#249B60] focus:ring-2 focus:ring-[#249B60]/20 transition-all"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-[13px] font-medium bg-red-50 px-4 py-2.5 rounded-[12px] text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#249B60] hover:bg-[#1E8351] disabled:bg-[#249B60]/60 text-white font-extrabold text-[15px] py-4 rounded-full transition-colors shadow-[0_4px_14px_0_rgba(36,161,112,0.3)]"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-[#249B60] font-bold text-[14px] hover:underline disabled:opacity-50"
          >
            {resending ? "Resending..." : "Resend code"}
          </button>
        </div>
      </div>
    </div>
  );
}
