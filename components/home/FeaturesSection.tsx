import React from "react";

const features = [
  {
    title: "Total Control",
    description:
      "Pause, cancel or change your plan at any time. Address change? No problem. Complete flexibility at your fingertips.",
    iconPath:
      "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  },
  {
    title: "Chef Crafted",
    description:
      "We don't believe in boring diet food. Our rotating menu is designed by chefs and cooked fresh using high quality ingredients.",
    iconPath:
      "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  },
  {
    title: "Daily Fresh Deliveries",
    description:
      "Your meals are prepared fresh and delivered safely to your door or office every morning in temperature-controlled bags.",
    iconPath:
      "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
  },
  {
    title: "Eco-friendly Packaging",
    description:
      "Eat your meals with peace of mind. Our containers are made of bagasse, a compostable byproduct of sugar cane.",
    iconPath:
      "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="border-y border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Why NutriChef
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Total control. Full flexibility.
          </h2>
          <p className="mt-4 text-xl font-semibold text-primary sm:text-2xl">
            Calories and macros that match your goals
          </p>
          <ul className="mt-8 flex flex-col gap-3 text-base font-medium text-foreground sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-2">
            <li className="flex items-center gap-2">
              <span className="text-primary" aria-hidden>
                ✓
              </span>
              Choose what you like.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary" aria-hidden>
                ✓
              </span>
              Swap what you don&apos;t.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary" aria-hidden>
                ✓
              </span>
              Pause. Skip. Change.
            </li>
          </ul>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative bg-surface p-8 transition hover:bg-background sm:p-9"
            >
              <span className="font-heading absolute right-6 top-6 text-5xl font-semibold tabular-nums text-foreground/[0.06] transition group-hover:text-primary/15 sm:text-6xl">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border-subtle bg-bg-light text-primary">
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
                      d={feature.iconPath}
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
