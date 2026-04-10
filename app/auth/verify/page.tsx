"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, TENANT_ID } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { AuthPageShell } from "@/components/AuthPageShell";

const OTP_LENGTH = 6;

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background pt-28">
          <div className="mx-auto h-10 max-w-[440px] animate-pulse rounded-2xl bg-bg-light" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const phone = searchParams.get("phone") || "";
  const countryCode = searchParams.get("countryCode") || "971";
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
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
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
        { noAuth: true },
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
        { noAuth: true },
      );
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const digitClass =
    "h-14 w-12 rounded-xl border-2 border-border-subtle bg-background text-center text-lg font-semibold text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 sm:h-[3.5rem] sm:w-[3.25rem] sm:text-xl";

  return (
    <AuthPageShell
      title="Verify your number"
      subtitle={
        <>
          Enter the code sent to{" "}
          <span className="font-semibold text-foreground">
            +{countryCode} {phone}
          </span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={digitClass}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm font-medium text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="text-sm font-semibold text-primary hover:underline disabled:opacity-50"
        >
          {resending ? "Resending..." : "Resend code"}
        </button>
      </div>
    </AuthPageShell>
  );
}
