/** Public asset paths for blog images. Filename slug should match the related H2/H3 heading. */
export function blogImagePath(slugFolder: string, filename: string): string {
  return `/blogs/${slugFolder}/${filename}`;
}

export const TOP5_BLOG_ASSETS = {
  slugFolder: "top-5-healthy-meal-delivery-services-in-dubai",
  /** H1 / title — Top 5 Healthy Meal Delivery Services */
  hero: blogImagePath(
    "top-5-healthy-meal-delivery-services-in-dubai",
    "top-5-healthy-meal-delivery-services.webp",
  ),
  /** H2 — 1. NutriChef — Best Overall Healthy Meal Delivery in Dubai */
  nutrichef: blogImagePath(
    "top-5-healthy-meal-delivery-services-in-dubai",
    "1-nutrichef-best-overall-healthy-meal-delivery-in-dubai.webp",
  ),
  /** H3 — Ramadan Meal Plans in Dubai */
  ramadan: blogImagePath(
    "top-5-healthy-meal-delivery-services-in-dubai",
    "ramadan-meal-plans-in-dubai.webp",
  ),
} as const;

export const OFFICE_BLOG_ASSETS = {
  slugFolder: "office-meal-delivery-dubai",
  hero: "/HeroSection.jpeg",
} as const;

export const KCAL_ALTERNATIVE_BLOG_ASSETS = {
  slugFolder: "best-alternative-to-kcal-dubai",
  /** H1 / title */
  hero: blogImagePath(
    "best-alternative-to-kcal-dubai",
    "best-alternative-to-kcal-in-dubai-why-more-people-are-switching-to-nutrichef.webp",
  ),
  /** H2 — What to Actually Look for in a Kcal Alternative */
  lookFor: blogImagePath(
    "best-alternative-to-kcal-dubai",
    "what-to-actually-look-for-in-a-kcal-alternative.webp",
  ),
  /** H2 — Real Cost Comparison */
  costComparison: blogImagePath(
    "best-alternative-to-kcal-dubai",
    "real-cost-comparison.webp",
  ),
} as const;
