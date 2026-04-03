"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const GOALS = [
  { id: "lose_weight", label: "Lose Weight" },
  { id: "gain_muscle", label: "Gain Muscle" },
  { id: "maintain", label: "Maintain Weight" },
  { id: "eat_healthy", label: "Eat Healthy" },
];

const ACTIVITY_LEVELS = [
  { id: "sedentary", label: "Sedentary" },
  { id: "lightly_active", label: "Lightly Active" },
  { id: "moderately_active", label: "Moderately Active" },
  { id: "very_active", label: "Very Active" },
];

const DIET_PREFERENCES = [
  { id: "none", label: "No Preference" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "keto", label: "Keto" },
  { id: "low_carb", label: "Low Carb" },
  { id: "high_protein", label: "High Protein" },
];

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const registrationToken = searchParams.get("registrationToken") || "";
  const redirect = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    goal: "",
    activityLevel: "",
    dietPreference: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!registrationToken) {
      router.replace("/auth/login");
    }
  }, [registrationToken, router]);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Please enter your name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post<{
        accessToken: string;
        refreshToken: string;
        user: { _id: string };
      }>(
        "/auth/register",
        {
          registrationToken,
          name: form.name.trim(),
          email: form.email.trim() || undefined,
          gender: form.gender || undefined,
          goal: form.goal || undefined,
          activityLevel: form.activityLevel || undefined,
          dietPreference: form.dietPreference || undefined,
        },
        { noAuth: true }
      );

      const data = res.data;
      await login(data.accessToken, data.refreshToken);
      router.push(redirect);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-[480px]">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="text-[#249B60] font-black text-[28px] tracking-[0.1em] uppercase inline-block mb-6"
          >
            NUTRICHEF
          </Link>
          <h1 className="text-[28px] font-extrabold text-[#2F3337] tracking-tight mb-2">
            Complete your profile
          </h1>
          <p className="text-[#878E99] text-[15px] font-medium">
            Tell us a bit about yourself to personalize your experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[13px] font-bold text-[#2F3337] mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-[#2F3337] placeholder:text-[#A0A5AE] focus:outline-none focus:ring-2 focus:ring-[#249B60]"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#2F3337] mb-2">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-[#2F3337] placeholder:text-[#A0A5AE] focus:outline-none focus:ring-2 focus:ring-[#249B60]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#2F3337] mb-2">
              Gender
            </label>
            <div className="flex gap-3">
              {["male", "female"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => updateField("gender", g)}
                  className={`flex-1 py-3 rounded-[14px] text-[14px] font-bold border-2 transition-colors ${
                    form.gender === g
                      ? "border-[#249B60] bg-[#EEF3F0] text-[#249B60]"
                      : "border-gray-200 text-[#2F3337] hover:border-gray-300"
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#2F3337] mb-2">
              What&apos;s your goal?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => updateField("goal", g.id)}
                  className={`py-3 px-4 rounded-[14px] text-[13px] font-bold border-2 transition-colors ${
                    form.goal === g.id
                      ? "border-[#249B60] bg-[#EEF3F0] text-[#249B60]"
                      : "border-gray-200 text-[#2F3337] hover:border-gray-300"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#2F3337] mb-2">
              Activity Level
            </label>
            <select
              value={form.activityLevel}
              onChange={(e) => updateField("activityLevel", e.target.value)}
              className="w-full border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-[#2F3337] bg-white focus:outline-none focus:ring-2 focus:ring-[#249B60] appearance-none cursor-pointer"
            >
              <option value="">Select activity level</option>
              {ACTIVITY_LEVELS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#2F3337] mb-2">
              Diet Preference
            </label>
            <select
              value={form.dietPreference}
              onChange={(e) => updateField("dietPreference", e.target.value)}
              className="w-full border border-gray-200 rounded-[14px] px-4 py-3.5 text-[14px] font-medium text-[#2F3337] bg-white focus:outline-none focus:ring-2 focus:ring-[#249B60] appearance-none cursor-pointer"
            >
              <option value="">Select preference</option>
              {DIET_PREFERENCES.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-[13px] font-medium bg-red-50 px-4 py-2.5 rounded-[12px]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#249B60] hover:bg-[#1E8351] disabled:bg-[#249B60]/60 text-white font-extrabold text-[15px] py-4 rounded-full transition-colors shadow-[0_4px_14px_0_rgba(36,161,112,0.3)] mt-2"
          >
            {loading ? "Creating account..." : "Get Started"}
          </button>
        </form>
      </div>
    </div>
  );
}
