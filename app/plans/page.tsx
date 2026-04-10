"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useTenant } from "@/contexts/TenantContext";
import { formatMinorUnits, formatMajorUnits } from "@/lib/formatCurrency";

const GOAL_EMOJIS: Record<string, string> = {
  balanced: "⚖️",
  "high-protein": "🍗",
  "high protein": "🍗",
  "low-carb": "🥑",
  "low carb": "🥑",
  vegetarian: "🥦",
  vegan: "🥦",
  "chef's picks": "👨‍🍳",
  chefs_picks: "👨‍🍳",
  custom: "🏋️",
  "custom macros": "🏋️",
  keto: "🥑",
  lose_weight: "⚖️",
  gain_muscle: "🍗",
  maintain: "⚖️",
};

interface BackendPlan {
  _id: string;
  title: string;
  goalType?: string;
  dietType?: string;
  structure: Record<string, unknown>;
  pricing?: {
    breakfast?: Record<string, number>;
    lunch?: Record<string, number>;
    dinner?: Record<string, number>;
  };
}

interface PlanType {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  style: string;
}

interface Cycle {
  id: string;
  title: string;
  subtext: string;
  priceDisplay: string;
  save: string | null;
  amount: number;
}

const FALLBACK_PLAN_TYPES: PlanType[] = [
  { id: "balanced", title: "Balanced", desc: "Provides the nutrients your body needs to thrive", emoji: "⚖️", style: "default" },
  { id: "custom", title: "Custom Macros", desc: "Designed for athletes and fitness focused individuals", emoji: "🏋️", style: "custom" },
  { id: "chef", title: "Chef's Picks", desc: "Dishes crafted for your cravings, not your fitness goals", emoji: "👨‍🍳", style: "default" },
  { id: "low-carb", title: "Low-Carb", desc: "Low in carbs, but high in healthy fats, and non-starchy veggies", emoji: "🥑", style: "default" },
  { id: "high-protein", title: "High Protein", desc: "Boosts muscle strength and vitality with lean proteins", emoji: "🍗", style: "default" },
  { id: "vegetarian", title: "Vegetarian", desc: "Plant-based dishes with colorful veggies and hearty grains", emoji: "🥦", style: "default" },
];

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const FALLBACK_CYCLES: Cycle[] = [
  { id: "1 week", title: "Weekly", subtext: "Per week", priceDisplay: "/week", save: null, amount: 0 },
  { id: "2 weeks", title: "2 Weeks", subtext: "Per 2 weeks", priceDisplay: "/2 weeks", save: null, amount: 0 },
  { id: "4 weeks", title: "Monthly", subtext: "Per month", priceDisplay: "/month", save: null, amount: 0 },
];

function buildCycles(
  pricing: BackendPlan["pricing"],
  selectedMeals: string[],
  currency: string
): Cycle[] {
  if (!pricing) return FALLBACK_CYCLES;

  const durationKeys = new Set<string>();
  const mealKeys = selectedMeals.map((m) => m.toLowerCase() as keyof NonNullable<BackendPlan["pricing"]>);

  for (const mk of mealKeys) {
    const tierObj = pricing[mk];
    if (tierObj) {
      for (const k of Object.keys(tierObj)) {
        durationKeys.add(k);
      }
    }
  }

  if (durationKeys.size === 0) return FALLBACK_CYCLES;

  const sorted = [...durationKeys].sort((a, b) => {
    const numA = parseInt(a) || 0;
    const numB = parseInt(b) || 0;
    return numA - numB;
  });

  let cheapestPerUnit = Infinity;
  const cycles: Cycle[] = sorted.map((dur) => {
    let total = 0;
    for (const mk of mealKeys) {
      const tierObj = pricing[mk];
      if (tierObj && tierObj[dur] != null) {
        total += tierObj[dur];
      }
    }
    const weeks = parseInt(dur) || 1;
    const perWeek = total / weeks;
    if (perWeek < cheapestPerUnit) cheapestPerUnit = perWeek;

    const perWeekRounded = Math.round(total / weeks);
    return {
      id: dur,
      title: dur.charAt(0).toUpperCase() + dur.slice(1),
      subtext: `${formatMajorUnits(total, currency)} per ${dur}`,
      priceDisplay: `${formatMajorUnits(perWeekRounded, currency)}/week`,
      save: null,
      amount: Math.round(total * 100),
    };
  });

  if (cycles.length > 1) {
    const basePerWeek = cycles[0].amount / 100 / (parseInt(cycles[0].id) || 1);
    for (let i = 1; i < cycles.length; i++) {
      const weeks = parseInt(cycles[i].id) || 1;
      const thisPerWeek = cycles[i].amount / 100 / weeks;
      const saving = Math.round((basePerWeek - thisPerWeek) * weeks);
      if (saving > 0) {
        cycles[i].save = formatMajorUnits(saving, currency, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
      }
    }
  }

  return cycles;
}

export default function PlansPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { isAuthenticated: loggedIn } = useAuth();
  const { currency } = useTenant();

  const [backendPlans, setBackendPlans] = useState<BackendPlan[]>([]);
  const [planTypes, setPlanTypes] = useState<PlanType[]>(FALLBACK_PLAN_TYPES);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedMeals, setSelectedMeals] = useState<string[]>(["Lunch", "Snack"]);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]);
  const [selectedCycle, setSelectedCycle] = useState("");
  const [cycles, setCycles] = useState<Cycle[]>(FALLBACK_CYCLES);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchPlans = useCallback(async () => {
    try {
      const res = await api.get<BackendPlan[]>("/menu/plans");
      const plans = Array.isArray(res.data) ? res.data : [];
      if (plans.length > 0) {
        setBackendPlans(plans);
        const mapped: PlanType[] = plans.map((p) => {
          const key = (p.dietType || p.goalType || p.title || "").toLowerCase();
          return {
            id: p._id,
            title: p.title,
            desc: p.goalType
              ? `${p.goalType}${p.dietType ? ` - ${p.dietType}` : ""}`
              : p.dietType || "Customized meal plan",
            emoji: GOAL_EMOJIS[key] || "🍽️",
            style: key.includes("custom") ? "custom" : "default",
          };
        });
        setPlanTypes(mapped);
        setSelectedPlan(mapped[0].id);
      } else {
        setSelectedPlan(FALLBACK_PLAN_TYPES[0].id);
      }
    } catch {
      setSelectedPlan(FALLBACK_PLAN_TYPES[0].id);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlans();
    }
  }, [isAuthenticated, fetchPlans]);

  useEffect(() => {
    const plan = backendPlans.find((p) => p._id === selectedPlan);
    if (plan?.pricing) {
      const c = buildCycles(plan.pricing, selectedMeals, currency);
      setCycles(c);
      if (c.length > 0 && !c.find((cy) => cy.id === selectedCycle)) {
        setSelectedCycle(c[0].id);
      }
    }
  }, [selectedPlan, selectedMeals, backendPlans, selectedCycle, currency]);

  const toggleMeal = (meal: string) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  const toggleDay = (idx: number) => {
    setSelectedDays((prev) =>
      prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx].sort()
    );
  };

  const getSelectedPlanTitle = () =>
    planTypes.find((p) => p.id === selectedPlan)?.title || "";

  const getCurrentCycle = () => cycles.find((c) => c.id === selectedCycle);

  const handleCheckout = async () => {
    if (!loggedIn) {
      router.push("/auth/login?redirect=/plans");
      return;
    }

    const cycle = getCurrentCycle();
    if (!cycle || cycle.amount <= 0) return;

    setCheckoutLoading(true);
    try {
      const templateId = backendPlans.find((p) => p._id === selectedPlan)?._id || selectedPlan;
      const res = await api.post<{ url: string; orderId: string }>(
        "/checkout/session",
        {
          templateId,
          amount: cycle.amount,
          currency: currency.toLowerCase(),
          productName: `${getSelectedPlanTitle()} - ${cycle.title}`,
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
        },
        { noAuth: true }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      alert(message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background pb-24 pt-28 sm:pt-32">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-14">
          <h1 className="font-heading text-[34px] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[44px]">
            Customize Your
            <br />
            Perfect Meal Plan
          </h1>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-[60px] lg:gap-[80px] relative">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-14">
            {/* Section 1: Plan Preferences */}
            <section>
              <h2 className="font-heading mb-6 text-[26px] font-semibold tracking-tight text-foreground">
                What kind of meals do you prefer?
              </h2>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="min-h-[170px] animate-pulse rounded-[24px] border-2 border-border-subtle bg-bg-light p-[22px]"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                  {planTypes.map((plan) => {
                    const isActive = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative flex min-h-[170px] cursor-pointer flex-col justify-between rounded-[24px] border-2 p-[22px] transition-all ${
                          isActive
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="pr-4">
                            <h3 className="mb-1.5 text-[17px] font-semibold text-foreground">
                              {plan.title}
                            </h3>
                            <p className="pr-1 text-[13px] font-medium leading-[1.4] text-secondary-text">
                              {plan.desc}
                            </p>
                          </div>
                          <div className="text-[42px] leading-none">{plan.emoji}</div>
                        </div>
                        <div className="flex justify-between items-center mt-auto pt-2">
                          <span className="flex items-center gap-1 text-[13px] font-semibold text-primary">
                            Learn More{" "}
                            <span className="text-[12px] font-medium">&rarr;</span>
                          </span>
                          {isActive ? (
                            <div className="flex items-center gap-1.5 rounded-full bg-primary-hover px-3 py-[7px] text-white shadow-sm">
                              <svg
                                className="w-3 h-3 ml-0.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              <span className="text-[11.5px] font-[800] tracking-tight mr-1">
                                Selected
                              </span>
                            </div>
                          ) : plan.style === "custom" ? (
                            <div className="rounded-full bg-primary/10 px-[18px] py-[7px] text-primary">
                              <span className="text-[12px] font-semibold tracking-tight">
                                Build my plan
                              </span>
                            </div>
                          ) : (
                            <div className="rounded-full bg-primary/10 px-[18px] py-[7px] text-primary transition-colors hover:bg-primary/15">
                              <span className="text-[12px] font-[800] tracking-tight">
                                Select Plan
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Section 2: Meal Count */}
            <section>
              <h2 className="font-heading mb-2 text-[26px] font-semibold tracking-tight text-foreground">
                How many meals per day?
              </h2>
              <p className="mb-6 text-[14px] font-medium text-secondary-text">
                Select a minimum of 2 meals, including lunch or dinner.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                {MEAL_TYPES.map((meal) => {
                  const isActive = selectedMeals.includes(meal);
                  return (
                    <div
                      key={meal}
                      onClick={() => toggleMeal(meal)}
                      className={`flex cursor-pointer items-center justify-between rounded-[16px] border-2 px-5 py-[18px] transition-colors ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                      }`}
                    >
                      <span className="text-[15px] font-semibold text-foreground">
                        {meal}
                      </span>
                      {isActive ? (
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary">
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      ) : (
                        <div className="h-6 w-6 flex-shrink-0 rounded-full border-2 border-border-subtle bg-surface" />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 3: Days a Week */}
            <section>
              <h2 className="font-heading mb-2 text-[26px] font-semibold tracking-tight text-foreground">
                How many days a week are you eating
                <br />
                Nutrichef?
              </h2>
              <p className="mb-8 text-[14px] font-medium text-secondary-text">
                Select a minimum of 5 days
              </p>
              <div className="-mx-1 px-1 overflow-x-auto pb-1 [scrollbar-width:thin]">
                <div className="flex w-max gap-2 sm:w-full sm:justify-between sm:gap-3 md:gap-[12px]">
                  {DAYS.map((day, idx) => {
                    const isActive = selectedDays.includes(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleDay(idx)}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold transition-all duration-200 sm:h-[46px] sm:w-[46px] sm:text-[15px] ${
                          isActive
                            ? "bg-primary text-white shadow-sm"
                            : "bg-bg-light text-secondary-text hover:bg-foreground/10"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Section 4: Payment Cycle */}
            <section>
              <h2 className="font-heading mb-[26px] text-[26px] font-semibold tracking-tight text-foreground">
                Payment cycle
              </h2>
              <div className="flex flex-col gap-[18px] mb-[24px]">
                {cycles.map((cycle) => {
                  const isActive = selectedCycle === cycle.id;
                  return (
                    <div
                      key={cycle.id}
                      onClick={() => setSelectedCycle(cycle.id)}
                      className={`flex cursor-pointer items-center justify-between rounded-[16px] border-2 px-6 py-5 transition-colors ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-surface shadow-sm hover:border-foreground/15"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-[12px] mb-1.5">
                          <span className="text-[15px] font-semibold text-foreground">
                            {cycle.title}
                          </span>
                          {cycle.save && (
                            <span className="rounded-full bg-primary px-[10px] py-[3px] text-[10px] font-semibold uppercase tracking-tight text-white">
                              Save {cycle.save}
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] font-semibold tracking-tight text-secondary-text">
                          {cycle.subtext}
                        </span>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <span className="text-[13px] font-semibold text-foreground">
                          {cycle.priceDisplay}
                        </span>
                        {isActive ? (
                          <div className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full border-[5px] border-surface bg-primary ring-1 ring-primary">
                            <div className="h-full w-full rounded-full bg-primary" />
                          </div>
                        ) : (
                          <div className="h-[22px] w-[22px] flex-shrink-0 rounded-full border-2 border-border-subtle bg-surface" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

             
            </section>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="sticky top-28 w-full lg:top-32">
              <div className="mb-6 rounded-[32px] border border-border-subtle bg-bg-light p-7 shadow-[0px_4px_24px_rgba(27,48,34,0.06)]">
                <div className="mb-8 flex items-start justify-between">
                  <div className="flex-1 pr-[18px]">
                    <h3 className="font-heading mb-[14px] text-[20px] font-semibold tracking-tight text-foreground">
                      Your package, your way
                    </h3>
                    <p className="text-[13.5px] font-semibold leading-[1.6] text-secondary-text">
                      {getSelectedPlanTitle()},{" "}
                      {selectedMeals.length} Meal
                      {selectedMeals.length !== 1 ? "s" : ""},{" "}
                      {selectedDays.length} days per week
                    </p>
                  </div>
                  <div className="relative flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[16px] bg-surface font-black shadow-sm">
                    <span className="text-[36px]">🛍️</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex gap-[10px] mb-8">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <svg
                        className="h-[18px] w-[18px] rotate-90 text-secondary-text"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="4" y1="9" x2="20" y2="9"></line>
                        <line x1="4" y1="15" x2="20" y2="15"></line>
                        <line x1="10" y1="3" x2="8" y2="21"></line>
                        <line x1="16" y1="3" x2="14" y2="21"></line>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Add promotion code"
                      className="w-full rounded-[14px] border border-border-subtle bg-surface py-[15px] pl-[38px] pr-4 text-[13px] font-semibold text-foreground placeholder:text-secondary-text/70 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button
                    type="button"
                    className="rounded-[14px] bg-bg-light px-6 py-[15px] text-[13px] font-semibold tracking-tight text-secondary-text transition-colors hover:bg-foreground/10"
                  >
                    Apply
                  </button>
                </div>

                {/* Subscription Coupon */}
                <div className="mb-10 flex items-center justify-between rounded-[14px] border border-dashed border-border-subtle bg-surface p-4">
                  <div className="flex items-center gap-3.5">
                    <div className="mt-1 -rotate-12 transform rounded-sm bg-primary px-[6px] py-[1.5px] text-[8px] font-black italic text-white">
                      🎟️
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-0.5 text-[12.5px] font-semibold leading-[1.3] text-foreground">
                        10% off subscription
                      </span>
                      <span className="text-[11px] font-semibold tracking-tight text-secondary-text">
                        with 6+ days/week on your package.
                      </span>
                    </div>
                  </div>
                  <div className="ml-2 flex h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary/15 text-[18px] font-bold text-primary">
                    +
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="flex flex-col gap-[14px] mb-[28px]">
                  <h4 className="mb-1 text-[14px] font-semibold tracking-tight text-foreground">
                    Payment summary
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold tracking-tight text-secondary-text">
                      Plan price
                    </span>
                    <span className="text-[13px] font-semibold text-foreground">
                      {getCurrentCycle()
                        ? formatMinorUnits(getCurrentCycle()!.amount, currency)
                        : "--"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border-subtle pb-[18px]">
                    <span className="text-[13px] font-semibold tracking-tight text-secondary-text">
                      Delivery fee
                    </span>
                    <span className="text-[13px] font-semibold text-foreground">
                      {formatMinorUnits(0, currency)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-heading text-[16px] font-semibold tracking-tight text-foreground">
                      Total
                    </span>
                    <span className="font-heading text-[16px] font-semibold tracking-tight text-foreground">
                      {getCurrentCycle()
                        ? formatMinorUnits(getCurrentCycle()!.amount, currency)
                        : "--"}
                    </span>
                  </div>
                </div>

                {/* Checkout Btn */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={checkoutLoading || !selectedCycle}
                  className="w-full rounded-full bg-primary py-[16px] text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:bg-primary/60"
                >
                  {checkoutLoading ? "Processing..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
