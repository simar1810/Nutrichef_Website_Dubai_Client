import type { Metadata } from "next";
import { HeroSection } from "@/components/vegetarian/HeroSection";
import { VegetarianMenuSection } from "@/components/vegetarian/VegetarianMenuSection";
import { PillarGrid } from "@/components/vegetarian/PillarGrid";
import { TestimonialsSection } from "@/components/vegetarian/TestimonialsSection";
import { ClosingCta } from "@/components/vegetarian/ClosingCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PricingSection } from "@/components/home/PricingSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { VEGETARIAN_FAQ_ITEMS } from "@/lib/faqs";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Vegetarian Meal Plan Dubai | Plant-Based, Chef-Crafted | NutriChef",
  description:
    "Chef-crafted vegetarian meal plans delivered fresh across Dubai, Abu Dhabi & Sharjah before 10 AM. Nutritionist-signed, 350–450 cal per meal, new global menu weekly. Pause anytime. From AED 45/meal.",
  path: "/vegetarian-meal-plan-dubai",
  keywords: [
    "vegetarian meal plan Dubai",
    "vegetarian meal delivery Dubai",
    "plant based meal plan UAE",
    "vegetarian food delivery Dubai",
  ],
});

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VEGETARIAN_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function VegetarianMealPlanDubaiPage() {
  return (
    <>
      <FaqSchema />
      <div className="flex min-h-screen flex-col">
        <HeroSection />
        <VegetarianMenuSection />
        <PillarGrid />
        <HowItWorks />

        <div className="bg-background pt-20 sm:pt-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3.5 text-sm text-foreground">
              <span aria-hidden>🌱</span>
              <span>
                Vegetarian isn&rsquo;t a separate plan — it&rsquo;s a rotation
                included in every programme below. Pick your goal, we handle
                the plant-based menu.
              </span>
            </div>
          </div>
        </div>
        <PricingSection />

        <TestimonialsSection />

        <section
          id="faq"
          className="border-t border-border-subtle bg-background py-20 sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:max-w-6xl lg:px-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4 lg:pt-2">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
                  Support
                </p>
                <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                  Frequently asked questions
                </h2>
              </div>
              <div className="mt-12 lg:col-span-8 lg:mt-0">
                <FAQAccordion items={VEGETARIAN_FAQ_ITEMS} defaultOpenIndex={0} />
              </div>
            </div>
          </div>
        </section>

        <ClosingCta />
      </div>
    </>
  );
}
