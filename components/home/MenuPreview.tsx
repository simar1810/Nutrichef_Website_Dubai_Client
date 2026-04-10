"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../Button";
import { api } from "@/lib/api";

const tabs = [
  { id: "All", label: "All", icon: null },
  { id: "High Protein", label: "High Protein", icon: "🍗" },
  { id: "Balanced", label: "Balanced", icon: "⚖️" },
  { id: "Vegetarian", label: "Vegetarian", icon: "🥦" },
  { id: "Chef's Picks", label: "Chef's Picks", icon: "👨‍🍳" },
  { id: "Custom Macros", label: "Custom Macros", icon: "🧮" },
  { id: "Low Carb", label: "Low Carb", icon: "🥑" },
] as const;

const chips = [
  "NATURAL INGREDIENTS",
  "ALLERGEN-FRIENDLY",
  "VEGETARIAN OPTIONS",
];

const FALLBACK_IMAGE =
  "https://cdn.calo.app/food/46cfb754-32c1-4f59-93fa-026430ae9918/square@3x.jpg";

interface ApiRecipe {
  _id: string;
  title: string;
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  tags?: string[];
  media?: string[];
}

interface PreviewMeal {
  id: string;
  title: string;
  image: string;
  calories: string | null;
  protein?: number;
  carbs?: number;
  fat?: number;
  customText?: string;
  tags: string[];
}

function mapRecipeToMeal(recipe: ApiRecipe): PreviewMeal {
  const n = recipe.nutrition;
  const hasCalories = n?.calories != null && Number.isFinite(n.calories);
  const p = n?.protein;
  const c = n?.carbs;
  const f = n?.fat;
  const hasP = p != null && Number.isFinite(p);
  const hasC = c != null && Number.isFinite(c);
  const hasF = f != null && Number.isFinite(f);
  const hasAnyMacro = hasP || hasC || hasF;

  return {
    id: recipe._id,
    title: recipe.title,
    image: recipe.media?.[0] || FALLBACK_IMAGE,
    calories: hasCalories ? String(Math.round(n!.calories!)) : null,
    protein: hasP ? p : undefined,
    carbs: hasC ? c : undefined,
    fat: hasF ? f : undefined,
    customText: !hasAnyMacro ? "Macros on request" : undefined,
    tags: recipe.tags ?? [],
  };
}

function mealMatchesTab(meal: PreviewMeal, tabId: string): boolean {
  if (tabId === "All") return true;
  const tags = meal.tags.map((t) => t.toLowerCase().replace(/\s+/g, "-"));
  switch (tabId) {
    case "High Protein":
      return tags.some(
        (t) => t === "high-protein" || t.includes("high-protein"),
      );
    case "Balanced":
      return tags.includes("balanced");
    case "Vegetarian":
      return tags.includes("vegetarian") || tags.includes("veggie");
    case "Chef's Picks":
      return (
        tags.includes("chefs-pick") ||
        tags.includes("chef-pick") ||
        tags.includes("chefs-picks")
      );
    case "Custom Macros":
      return tags.includes("custom-macros") || tags.includes("custom");
    case "Low Carb":
      return tags.includes("low-carb") || tags.includes("lowcarb");
    default:
      return true;
  }
}

export const MenuPreview = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [meals, setMeals] = useState<PreviewMeal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<{
        recipes: ApiRecipe[];
        templates?: unknown[];
      }>("/menu/list?type=recipes", { noAuth: true });
      const recipes = res.data?.recipes ?? [];
      setMeals(recipes.map(mapRecipeToMeal));
    } catch {
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRecipes();
  }, [fetchRecipes]);

  const visibleMeals = useMemo(
    () => meals.filter((m) => mealMatchesTab(m, activeTab)),
    [meals, activeTab],
  );

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-foreground py-20 text-background sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-background/50">
              Weekly rotation
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Discover our daily-changing menu
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-background/65">
              80+ new meals options every week, you&apos;ll never get bored.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {chips.map((label) => (
              <span
                key={label}
                className="rounded-lg border border-background/20 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-background/85"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 overflow-x-auto pb-1 hide-scrollbar">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex w-max gap-1 rounded-xl border border-background/15 bg-background/[0.06] p-1"
          >
            {tabs.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:px-5 sm:text-[0.9375rem] ${
                    selected
                      ? "bg-background text-foreground shadow-sm"
                      : "text-background/55 hover:text-background"
                  }`}
                >
                  {tab.icon ? (
                    <span className="mr-1.5 inline">{tab.icon}</span>
                  ) : null}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[min(100%,280px)] shrink-0 animate-pulse sm:w-[300px] lg:w-[min(24vw,320px)]"
              >
                <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface p-2">
                  <div className="aspect-[5/6] rounded-xl bg-bg-light" />
                  <div className="px-2 pb-3 pt-4">
                    <div className="h-4 w-3/4 rounded bg-bg-light" />
                    <div className="mt-2 h-3 w-1/2 rounded bg-bg-light" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : visibleMeals.length === 0 ? (
          <p className="mt-10 text-center text-[0.9375rem] font-medium text-background/65">
            {meals.length === 0
              ? "No recipes in the menu yet."
              : "No dishes match this filter."}
          </p>
        ) : (
          <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 hide-scrollbar lg:gap-6">
            {visibleMeals.map((meal) => (
              <article
                key={meal.id}
                className="w-[min(100%,280px)] shrink-0 snap-start sm:w-[300px] lg:w-[min(24vw,320px)]"
              >
                <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface p-2 shadow-lg shadow-black/20">
                  <div className="relative aspect-[5/6] overflow-hidden rounded-xl bg-bg-light">
                    <Image
                      src={meal.image}
                      alt={meal.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-[1.03]"
                      sizes="320px"
                    />
                    {meal.calories ? (
                      <div className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-bold text-foreground backdrop-blur-sm">
                        {meal.calories} kcal
                      </div>
                    ) : null}
                  </div>
                  <div className="px-2 pb-3 pt-4">
                    <h3 className="font-heading line-clamp-2 text-lg font-semibold leading-snug text-foreground">
                      {meal.title}
                    </h3>
                    {meal.customText ? (
                      <p className="mt-3 text-sm font-medium text-secondary-text">
                        {meal.customText}
                      </p>
                    ) : (
                      <div className="mt-3 flex flex-wrap gap-2 text-sm">
                        {meal.protein != null && (
                          <span className="rounded-md bg-bg-light px-2.5 py-1 font-medium text-foreground">
                            {Math.round(meal.protein)}g P
                          </span>
                        )}
                        {meal.carbs != null && (
                          <span className="rounded-md bg-bg-light px-2.5 py-1 font-medium text-foreground">
                            {Math.round(meal.carbs)}g C
                          </span>
                        )}
                        {meal.fat != null && (
                          <span className="rounded-md bg-bg-light px-2.5 py-1 font-medium text-foreground">
                            {Math.round(meal.fat)}g F
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center lg:justify-start">
          <Button
            variant="onDark"
            size="lg"
            type="button"
            onClick={() => router.push("/menu")}
          >
            See full menu
          </Button>
        </div>
      </div>
    </section>
  );
};
