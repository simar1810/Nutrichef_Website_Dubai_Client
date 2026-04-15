/**
 * Meal-plan templates expose per-slot pricing with duration keys "7", "14", "28"
 * (string keys in JSON) — calendar days for 1, 2, and 4 weeks.
 */

export const PLAN_DURATION_DAY_KEYS = ["7", "14", "28"] as const;
export type PlanDurationDayKey = (typeof PLAN_DURATION_DAY_KEYS)[number];

const SUPPORTED = new Set<string>(PLAN_DURATION_DAY_KEYS);

export function isPlanDurationDayKey(key: string): key is PlanDurationDayKey {
  return SUPPORTED.has(key);
}

/** Billing period length in weeks (1, 2, or 4) for a supported API key. */
export function billingWeeksForDurationKey(key: string): number | null {
  if (!isPlanDurationDayKey(key)) return null;
  const days = parseInt(key, 10);
  if (!Number.isFinite(days) || days <= 0 || days % 7 !== 0) return null;
  return days / 7;
}

/** Fixed display order for tier pickers / price tables. */
export function supportedDurationKeysPresent(rawKeys: Iterable<string>): PlanDurationDayKey[] {
  const raw = new Set<string>();
  for (const k of rawKeys) {
    if (typeof k === "string" && k.trim()) raw.add(k.trim());
  }
  return PLAN_DURATION_DAY_KEYS.filter((k) => raw.has(k));
}

export function planDurationListTitle(key: PlanDurationDayKey): string {
  switch (key) {
    case "7":
      return "1 week";
    case "14":
      return "2 weeks";
    case "28":
      return "4 weeks";
    default:
      return key;
  }
}

export function planDurationShortTitle(key: PlanDurationDayKey): string {
  switch (key) {
    case "7":
      return "Weekly";
    case "14":
      return "2 weeks";
    case "28":
      return "Monthly";
    default:
      return key;
  }
}

export function planDurationPeriodPhrase(key: PlanDurationDayKey): string {
  switch (key) {
    case "7":
      return "per week";
    case "14":
      return "per 2 weeks";
    case "28":
      return "per 4 weeks";
    default:
      return `per ${key} days`;
  }
}

/** All duration keys present on pricing rows for the selected meal slots (including legacy). */
export function collectRawDurationKeysFromPricing(
  pricing: { [slot: string]: Record<string, number> | undefined } | undefined,
  mealKeysLower: string[],
): Set<string> {
  const durationKeys = new Set<string>();
  if (!pricing) return durationKeys;
  for (const mk of mealKeysLower) {
    const tierObj = pricing[mk];
    if (tierObj) {
      for (const k of Object.keys(tierObj)) {
        if (k.trim()) durationKeys.add(k.trim());
      }
    }
  }
  return durationKeys;
}
