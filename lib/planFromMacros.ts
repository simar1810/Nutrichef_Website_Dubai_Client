export type PlanFilterId = "balanced" | "high-protein" | "low-carb";

export type MacroNutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

/**
 * Classifies a meal for menu filters from macros only (no backend tags).
 * Order: high protein → low carb (grams or % calories from carbs) → balanced.
 */
export function derivePlanFilterIdFromMacros(m: MacroNutrition): PlanFilterId {
  const calories = Math.max(0, Number(m.calories) || 0);
  const p = Math.max(0, Number(m.protein) || 0);
  const c = Math.max(0, Number(m.carbs) || 0);

  if (calories > 0) {
    const pctCalFromProtein = (p * 4) / calories;
    if (p >= 28 || pctCalFromProtein >= 0.26) return "high-protein";

    const pctCalFromCarbs = (c * 4) / calories;
    if (c <= 28 || pctCalFromCarbs <= 0.24) return "low-carb";
  } else {
    if (p >= 30) return "high-protein";
    if (c <= 22) return "low-carb";
  }

  return "balanced";
}
