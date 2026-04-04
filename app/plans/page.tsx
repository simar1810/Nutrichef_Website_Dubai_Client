"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useAuth } from "@/contexts/AuthContext";

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

function buildCycles(pricing: BackendPlan["pricing"], selectedMeals: string[]): Cycle[] {
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

    return {
      id: dur,
      title: dur.charAt(0).toUpperCase() + dur.slice(1),
      subtext: `${total} per ${dur}`,
      priceDisplay: `${Math.round(total / weeks)}/week`,
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
        cycles[i].save = `${saving}`;
      }
    }
  }

  return cycles;
}

export default function PlansPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { isAuthenticated: loggedIn } = useAuth();

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
      const c = buildCycles(plan.pricing, selectedMeals);
      setCycles(c);
      if (c.length > 0 && !c.find((cy) => cy.id === selectedCycle)) {
        setSelectedCycle(c[0].id);
      }
    }
  }, [selectedPlan, selectedMeals, backendPlans, selectedCycle]);

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
          currency: "inr",
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#249B60] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-[140px] pb-24 w-full">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-[34px] md:text-[44px] font-extrabold text-[#2F3337] leading-[1.05] tracking-tight">
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
              <h2 className="text-[26px] font-extrabold text-[#2F3337] mb-6 tracking-tight">
                What kind of meals do you prefer?
              </h2>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-[24px] p-[22px] border-2 border-gray-100 min-h-[170px] animate-pulse bg-gray-50" />
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
                        className={`relative rounded-[24px] p-[22px] border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[170px] ${
                          isActive
                            ? "border-[#249B60] bg-[#EEF3F0] shadow-sm"
                            : "border-gray-100 bg-white hover:border-gray-200 shadow-sm"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="pr-4">
                            <h3 className="text-[17px] font-extrabold text-[#2F3337] mb-1.5">
                              {plan.title}
                            </h3>
                            <p className="text-[13px] text-[#878E99] font-medium leading-[1.4] pr-1">
                              {plan.desc}
                            </p>
                          </div>
                          <div className="text-[42px] leading-none">{plan.emoji}</div>
                        </div>
                        <div className="flex justify-between items-center mt-auto pt-2">
                          <span className="text-[#249B60] font-bold text-[13px] flex items-center gap-1">
                            Learn More{" "}
                            <span className="text-[12px] font-medium">&rarr;</span>
                          </span>
                          {isActive ? (
                            <div className="bg-[#1E8351] text-white px-3 py-[7px] rounded-full flex items-center gap-1.5 shadow-sm">
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
                            <div className="bg-[#EEF3F0] text-[#249B60] px-[18px] py-[7px] rounded-full">
                              <span className="text-[12px] font-[800] tracking-tight">
                                Build my plan
                              </span>
                            </div>
                          ) : (
                            <div className="bg-[#EEF3F0] text-[#249B60] px-[18px] py-[7px] rounded-full hover:bg-[#E2ECE6] transition-colors">
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
              <h2 className="text-[26px] font-extrabold text-[#2F3337] mb-2 tracking-tight">
                How many meals per day?
              </h2>
              <p className="text-[#878E99] font-medium text-[14px] mb-6">
                Select a minimum of 2 meals, including lunch or dinner.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                {MEAL_TYPES.map((meal) => {
                  const isActive = selectedMeals.includes(meal);
                  return (
                    <div
                      key={meal}
                      onClick={() => toggleMeal(meal)}
                      className={`rounded-[16px] px-5 py-[18px] border-2 cursor-pointer transition-colors flex justify-between items-center ${
                        isActive
                          ? "border-[#249B60] bg-[#EEF3F0]"
                          : "border-gray-100 bg-white hover:border-gray-200 shadow-sm"
                      }`}
                    >
                      <span className="text-[#2F3337] font-extrabold text-[15px]">
                        {meal}
                      </span>
                      {isActive ? (
                        <div className="w-6 h-6 rounded-full bg-[#249B60] flex flex-shrink-0 items-center justify-center border-2 border-[#249B60]">
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
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex-shrink-0 bg-white"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 3: Days a Week */}
            <section>
              <h2 className="text-[26px] font-extrabold text-[#2F3337] mb-2 tracking-tight">
                How many days a week are you eating
                <br />
                NutriChef?
              </h2>
              <p className="text-[#878E99] font-medium text-[14px] mb-8">
                Select a minimum of 5 days
              </p>
              <div className="flex gap-[12px]">
                {DAYS.map((day, idx) => {
                  const isActive = selectedDays.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleDay(idx)}
                      className={`w-[46px] h-[46px] rounded-full flex items-center justify-center text-[15px] font-[800] transition-all duration-200 ${
                        isActive
                          ? "bg-[#249B60] text-white shadow-sm"
                          : "bg-[#F2F4F7] text-[#878E99] hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Section 4: Payment Cycle */}
            <section>
              <h2 className="text-[26px] font-extrabold text-[#2F3337] mb-[26px] tracking-tight">
                Payment Cycle
              </h2>
              <div className="flex flex-col gap-[18px] mb-[24px]">
                {cycles.map((cycle) => {
                  const isActive = selectedCycle === cycle.id;
                  return (
                    <div
                      key={cycle.id}
                      onClick={() => setSelectedCycle(cycle.id)}
                      className={`rounded-[16px] px-6 py-5 border-2 cursor-pointer transition-colors flex justify-between items-center ${
                        isActive
                          ? "border-[#249B60] bg-[#EEF3F0]"
                          : "border-gray-100 bg-white hover:border-gray-200 shadow-sm"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-[12px] mb-1.5">
                          <span className="text-[#2F3337] font-extrabold text-[15px]">
                            {cycle.title}
                          </span>
                          {cycle.save && (
                            <span className="bg-[#249B60] text-white text-[10px] font-extrabold px-[10px] py-[3px] rounded-full uppercase tracking-tight">
                              Save {cycle.save}
                            </span>
                          )}
                        </div>
                        <span className="text-[#A0A5AE] text-[12px] font-semibold tracking-tight">
                          {cycle.subtext}
                        </span>
                      </div>
                      <div className="flex items-center gap-[14px]">
                        <span className="text-[#2F3337] font-extrabold text-[13px]">
                          {cycle.priceDisplay}
                        </span>
                        {isActive ? (
                          <div className="w-[22px] h-[22px] rounded-full bg-[#249B60] flex flex-shrink-0 items-center justify-center border-[5px] border-white ring-1 ring-[#249B60]">
                            <div className="w-full h-full bg-[#249B60] rounded-full"></div>
                          </div>
                        ) : (
                          <div className="w-[22px] h-[22px] rounded-full border-2 border-gray-200 flex-shrink-0 bg-white"></div>
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
            <div className="sticky top-[140px] w-full">
              <div className="bg-[#FCFCFC] rounded-[32px] p-7 mb-6 shadow-[0px_4px_24px_rgba(0,0,0,0.04)] ring-1 ring-gray-100">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1 pr-[18px]">
                    <h3 className="text-[20px] font-[800] text-[#2F3337] tracking-tight mb-[14px]">
                      Your package, your way
                    </h3>
                    <p className="text-[#878E99] text-[13.5px] font-semibold leading-[1.6]">
                      {getSelectedPlanTitle()},{" "}
                      {selectedMeals.length} Meal
                      {selectedMeals.length !== 1 ? "s" : ""},{" "}
                      {selectedDays.length} days per week
                    </p>
                  </div>
                  <div className="w-[64px] h-[64px] shrink-0 bg-[#F2F4F7] rounded-[16px] relative flex items-center justify-center font-black">
                    <span className="text-[36px]">🛍️</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex gap-[10px] mb-8">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <svg
                        className="w-[18px] h-[18px] text-[#A0A5AE] rotate-90"
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
                      className="w-full border border-gray-200 text-[13px] font-bold rounded-[14px] pl-[38px] pr-4 py-[15px] placeholder:text-[#A0A5AE] focus:outline-none focus:ring-2 focus:ring-[#2B9D65] transition-shadow bg-white"
                    />
                  </div>
                  <button className="bg-[#F2F4F7] text-[#A0A5AE] font-extrabold tracking-tight text-[13px] px-6 py-[15px] rounded-[14px] hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>

                {/* Subscription Coupon */}
                <div className="border border-gray-200 border-dashed rounded-[14px] p-4 bg-white mb-10 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="bg-[#249B60] text-white text-[8px] font-black italic px-[6px] py-[1.5px] rounded-sm transform -rotate-12 mt-1">
                      🎟️
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12.5px] text-[#2F3337] font-[800] leading-[1.3] mb-0.5">
                        10% off subscription
                      </span>
                      <span className="text-[11px] text-[#878E99] font-semibold tracking-tight">
                        with 6+ days/week on your package.
                      </span>
                    </div>
                  </div>
                  <div className="w-[30px] h-[30px] rounded-full bg-[#EEF3F0] text-[#2B9D65] flex items-center justify-center font-bold text-[18px] cursor-pointer shrink-0 ml-2">
                    +
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="flex flex-col gap-[14px] mb-[28px]">
                  <h4 className="text-[14px] font-[800] text-[#2F3337] mb-1 tracking-tight">
                    Payment summary
                  </h4>
                  <div className="flex justify-between items-center">
                    <span className="text-[#878E99] text-[13px] font-semibold tracking-tight">
                      Plan price
                    </span>
                    <span className="text-[#2F3337] text-[13px] font-[800]">
                      {getCurrentCycle()
                        ? `₹${(getCurrentCycle()!.amount / 100).toFixed(0)}`
                        : "--"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-[18px]">
                    <span className="text-[#878E99] text-[13px] font-semibold tracking-tight">
                      Delivery fee
                    </span>
                    <span className="text-[#2F3337] text-[13px] font-[800]">₹0</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[#2F3337] text-[16px] font-black tracking-tight">
                      Total
                    </span>
                    <span className="text-[#2F3337] text-[16px] font-black tracking-tight">
                      {getCurrentCycle()
                        ? `₹${(getCurrentCycle()!.amount / 100).toFixed(0)}`
                        : "--"}
                    </span>
                  </div>
                </div>

                {/* Checkout Btn */}
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading || !selectedCycle}
                  className="w-full bg-[#2B9D65] hover:bg-[#1E8351] disabled:bg-[#2B9D65]/60 text-white font-[800] text-[15px] py-[16px] rounded-full transition-colors shadow-[0_4px_12px_rgba(36,155,96,0.2)]"
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
