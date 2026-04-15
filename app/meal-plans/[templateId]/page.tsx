"use client";

import React, { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import {
  type ApiTemplate,
  type ApiRecipe,
  iconForTemplate,
  normalizeDaysMeals,
  mealNumericField,
  mealExtraPrimitives,
  resolveTemplateImage,
  displayMealTitle,
  displayMealImage,
  displayMealDescription,
  sortMealsBySlot,
  formatSlotLabel,
  mergedMealTags,
  recipeNonEmptyLines,
} from "@/lib/mealPlanTemplateDisplay";

function LoadingState() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-[1000px] items-center justify-center px-4 py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#249B60] border-t-transparent" />
    </div>
  );
}

function MealMacroLine({
  meal,
  recipe,
}: {
  meal: Record<string, unknown>;
  recipe: ApiRecipe | undefined;
}) {
  const portion = mealNumericField(meal, "portion");
  const cal = mealNumericField(meal, "calories");
  const p = mealNumericField(meal, "protein");
  const c = mealNumericField(meal, "carbs");
  const f = mealNumericField(meal, "fat");
  const fiberRecipe = recipe?.nutrition?.fiber;
  const fiber =
    typeof fiberRecipe === "number" && Number.isFinite(fiberRecipe) ? fiberRecipe : null;
  const parts: string[] = [];
  if (portion != null) parts.push(`Portion ×${portion}`);
  if (cal != null) parts.push(`${Math.round(cal)} kcal`);
  if (p != null) parts.push(`${Math.round(p)}g protein`);
  if (c != null) parts.push(`${Math.round(c)}g carbs`);
  if (f != null) parts.push(`${Math.round(f)}g fat`);
  if (fiber != null) parts.push(`${Math.round(fiber)}g fiber`);
  if (parts.length === 0) return null;
  return (
    <p className="text-[13px] font-semibold leading-relaxed text-[#5C6370]">{parts.join(" · ")}</p>
  );
}

function MealCard({
  meal,
  recipe,
  index,
}: {
  meal: Record<string, unknown>;
  recipe: ApiRecipe | undefined;
  index: number;
}) {
  const title = displayMealTitle(meal, recipe);
  const imageUrl = displayMealImage(meal, recipe);
  const desc = displayMealDescription(meal, recipe);
  const tags = mergedMealTags(meal, recipe);
  const slotLabel = formatSlotLabel(meal.slot);
  const ingredients = recipeNonEmptyLines(recipe?.ingredients);
  const steps = recipeNonEmptyLines(recipe?.steps);
  const allergens = (recipe?.allergenFlags ?? []).filter(
    (a): a is string => typeof a === "string" && a.trim().length > 0,
  );

  const handled = new Set([
    "title",
    "name",
    "recipeTitle",
    "dishName",
    "description",
    "desc",
    "notes",
    "summary",
    "image",
    "photo",
    "media",
    "tags",
    "recipe",
    "protein",
    "carbs",
    "fat",
    "calories",
    "portion",
    "recipeId",
    "slot",
  ]);
  const extras = mealExtraPrimitives(meal, handled);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E8EAED] bg-white shadow-[0_4px_24px_rgba(47,51,55,0.06)] transition hover:border-[#249B60]/25 hover:shadow-[0_8px_32px_rgba(36,155,96,0.12)]">
      <div className="relative aspect-[16/10] w-full bg-[#F7F7F8]">
        {slotLabel ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#249B60] shadow-sm backdrop-blur-sm">
            {slotLabel}
          </span>
        ) : null}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 480px"
            priority={index < 2}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-[#C5CAD1]" aria-hidden>
            🍽️
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="font-heading text-lg font-semibold leading-snug text-[#2F3337]">{title}</h3>
        <div className="mt-2">
          <MealMacroLine meal={meal} recipe={recipe} />
        </div>
        {desc ? (
          <p className="mt-3 text-[14px] leading-relaxed text-[#5C6370]">{desc}</p>
        ) : null}
        {allergens.length > 0 ? (
          <p className="mt-2 text-[12px] font-medium text-[#878E99]">
            Allergens: {allergens.join(", ")}
          </p>
        ) : null}
        {tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-[#EFF8F3] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#249B60]"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
        {ingredients.length > 0 ? (
          <div className="mt-4 border-t border-[#F0F2F4] pt-4">
            <h4 className="text-[12px] font-bold uppercase tracking-wide text-[#878E99]">Ingredients</h4>
            <ul className="mt-2 list-inside list-disc space-y-1 text-[13px] text-[#5C6370]">
              {ingredients.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {steps.length > 0 ? (
          <div className="mt-4 border-t border-[#F0F2F4] pt-4">
            <h4 className="text-[12px] font-bold uppercase tracking-wide text-[#878E99]">Steps</h4>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-[13px] text-[#5C6370]">
              {steps.map((line, i) => (
                <li key={`${i}-${line.slice(0, 20)}`}>{line}</li>
              ))}
            </ol>
          </div>
        ) : null}
        {extras.length > 0 ? (
          <dl className="mt-4 space-y-1 border-t border-[#F0F2F4] pt-4 text-[13px] text-[#5C6370]">
            {extras.map(({ key, value }) => (
              <div key={key} className="flex gap-2">
                <dt className="shrink-0 font-semibold capitalize text-[#878E99]">{key}</dt>
                <dd className="min-w-0 break-words">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </article>
  );
}

function MealPlanDetailInner() {
  const params = useParams();
  const templateId = typeof params.templateId === "string" ? params.templateId : "";

  const [template, setTemplate] = useState<ApiTemplate | null>(null);
  const [recipes, setRecipes] = useState<ApiRecipe[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const recipeById = useMemo(() => {
    const m = new Map<string, ApiRecipe>();
    for (const r of recipes) {
      m.set(r._id, r);
    }
    return m;
  }, [recipes]);

  const load = useCallback(async () => {
    if (!templateId) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);
    setNotFound(false);
    try {
      const res = await api.get<{ recipes?: ApiRecipe[]; templates?: ApiTemplate[] }>("/menu/list", {
        noAuth: true,
      });
      const list = res.data?.templates ?? [];
      const t = list.find((x) => x._id === templateId) ?? null;
      if (!t) {
        setNotFound(true);
        setTemplate(null);
        setRecipes([]);
      } else {
        setTemplate(t);
        setRecipes(res.data?.recipes ?? []);
      }
    } catch {
      setError(true);
      setTemplate(null);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[560px] px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-semibold text-[#2F3337]">Something went wrong</h1>
        <p className="mt-3 text-[15px] text-[#5C6370]">We couldn&apos;t load this meal plan. Please try again.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-[#249B60] px-8 py-3 text-[15px] font-bold text-white hover:bg-[#1E8351]"
        >
          Back to home
        </Link>
      </div>
    );
  }

  if (notFound || !template) {
    return (
      <div className="mx-auto max-w-[560px] px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-semibold text-[#2F3337]">Meal plan not found</h1>
        <p className="mt-3 text-[15px] text-[#5C6370]">This plan may have been removed or the link is invalid.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-[#249B60] px-8 py-3 text-[15px] font-bold text-white hover:bg-[#1E8351]"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const cover = resolveTemplateImage(template);
  const daysRaw = normalizeDaysMeals(template.structure ?? {});
  const days = daysRaw.map((d) => ({
    label: d.label,
    meals: sortMealsBySlot(d.meals),
  }));
  const icon = iconForTemplate(template);
  const goalLine = [template.goalType, template.dietType].filter(Boolean).join(" · ");

  return (
    <div className="bg-white pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
        <nav className="mb-8 text-[14px] font-medium text-[#878E99]">
          <Link href="/" className="hover:text-[#249B60]">
            Home
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-[#2F3337]">Meal plan</span>
        </nav>

        <header className="mb-12">
          <div className="relative mb-6 aspect-[21/9] overflow-hidden rounded-[28px] bg-[#F7F7F8] md:aspect-[21/8]">
            {cover ? (
              <Image
                src={cover}
                alt={template.title}
                fill
                className="object-cover"
                sizes="(max-width: 1000px) 100vw, 1000px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl" aria-hidden>
                {icon}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F7F7F8] text-2xl shadow-sm">
              {icon}
            </div>
            <div>
              <h1 className="font-heading text-[32px] font-extrabold leading-tight tracking-tight text-[#2F3337] md:text-[40px]">
                {template.title}
              </h1>
              {goalLine ? (
                <p className="mt-2 text-[15px] font-semibold text-[#878E99]">{goalLine}</p>
              ) : null}
              <p className="mt-4 text-[15px] leading-relaxed text-[#5C6370]">
                All dishes included in this plan are listed below. Individual dish prices are not shown.
              </p>
            </div>
          </div>
        </header>

        {days.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFBFC] p-8 text-center text-[15px] text-[#878E99]">
            Detailed meals for this plan aren&apos;t available yet. Please check back later or explore our plans.
          </p>
        ) : (
          <div className="space-y-14">
            {days.map((day) => (
              <section key={day.label}>
                <h2 className="mb-6 border-b border-[#EEF0F2] pb-3 font-heading text-xl font-semibold text-[#2F3337]">
                  {day.label}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {day.meals.map((meal, i) => {
                    const rid = typeof meal.recipeId === "string" ? meal.recipeId.trim() : "";
                    const recipe = rid ? recipeById.get(rid) : undefined;
                    return (
                      <MealCard
                        key={`${day.label}-${rid || i}-${i}`}
                        meal={meal}
                        recipe={recipe}
                        index={i}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <Link
            href="/plans"
            className="inline-flex items-center justify-center rounded-full bg-[#249B60] px-8 py-3.5 text-[15px] font-bold text-white shadow-sm hover:bg-[#1E8351]"
          >
            Subscribe to this style
          </Link>
          <Link
            href="/#menu"
            className="inline-flex items-center justify-center rounded-full border border-[#E0E4E8] bg-white px-8 py-3.5 text-[15px] font-bold text-[#2F3337] hover:bg-[#F7F7F8]"
          >
            Browse full menu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MealPlanTemplatePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <MealPlanDetailInner />
    </Suspense>
  );
}
