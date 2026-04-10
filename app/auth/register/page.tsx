"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { AuthPageShell } from "@/components/AuthPageShell";

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

const chipOn =
  "border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20";
const chipOff =
  "border-border-subtle bg-background text-foreground hover:border-foreground/20";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background pt-28">
          <div className="mx-auto h-10 max-w-[480px] animate-pulse rounded-2xl bg-bg-light" />
        </div>
      }
    >
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
        { noAuth: true },
      );

      const data = res.data;
      await login(data.accessToken, data.refreshToken);
      router.push(redirect);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border-subtle bg-background px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-secondary-text/70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface";

  return (
    <AuthPageShell
      title="Complete your profile"
      subtitle="Tell us a bit about yourself to personalize your experience"
      maxWidthClass="max-w-[480px]"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Enter your name"
            className={inputClass}
            autoFocus
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">
            Gender
          </label>
          <div className="flex gap-3">
            {["male", "female"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => updateField("gender", g)}
                className={`flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition-colors ${
                  form.gender === g ? chipOn : chipOff
                }`}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">
            What&apos;s your goal?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {GOALS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => updateField("goal", g.id)}
                className={`rounded-xl border-2 px-3 py-3 text-xs font-semibold transition-colors sm:text-[13px] ${
                  form.goal === g.id ? chipOn : chipOff
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">
            Activity level
          </label>
          <select
            value={form.activityLevel}
            onChange={(e) => updateField("activityLevel", e.target.value)}
            className={`${inputClass} cursor-pointer appearance-none bg-surface`}
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
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">
            Diet preference
          </label>
          <select
            value={form.dietPreference}
            onChange={(e) => updateField("dietPreference", e.target.value)}
            className={`${inputClass} cursor-pointer appearance-none bg-surface`}
          >
            <option value="">Select preference</option>
            {DIET_PREFERENCES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-primary py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Get started"}
        </button>
      </form>
    </AuthPageShell>
  );
}
