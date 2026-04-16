import type { MenuItem } from "@/app/menu/data";
import { derivePlanFilterIdFromMacros } from "@/lib/planFromMacros";

export function menuItemMatchesFilter(item: MenuItem, filterId: string): boolean {
  if (filterId === "all") return true;
  const plan =
    item.planFilterId ??
    derivePlanFilterIdFromMacros({
      calories: item.calories,
      protein: item.macros.protein,
      carbs: item.macros.carbs,
      fat: item.macros.fat,
    });
  return plan === filterId;
}
