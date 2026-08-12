import React from "react";

const pillars = [
  {
    title: "Global Rotation",
    description:
      "New plant-based menu every week, inspired by cuisines from across the world, never the same combo twice.",
    iconPath:
      "M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z",
  },
  {
    title: "Clinical Precision",
    description:
      "Every meal 350–450 cal, macro-balanced, signed off by our Head Nutritionist.",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Total Flexibility",
    description: "Pause, skip, or redirect in seconds. Zero penalties.",
    iconPath:
      "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
  },
  {
    title: "Concierge on WhatsApp",
    description:
      "Real humans, real answers, confirmed the moment you subscribe.",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.2-3.6A7.93 7.93 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
];

export function PillarGrid() {
  return (
    <section className="border-y border-border-subtle bg-bg-light py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2 className="font-heading max-w-xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          Why vegetarian, why NutriChef.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="group relative bg-surface p-8 transition hover:bg-background"
            >
              <span className="font-heading absolute right-6 top-6 text-5xl font-semibold tabular-nums text-foreground/[0.06] transition group-hover:text-gold/20">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border-subtle bg-bg-light text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={pillar.iconPath}
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary-text">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
