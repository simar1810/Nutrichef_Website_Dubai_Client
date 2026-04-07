"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../Button";

const tabs = [
  "High Protein",
  "Balanced",
  "Vegetarian",
  "Chef's Picks",
  "Personalize",
  "Low Carb",
];

const mockMeals = [
  {
    id: 1,
    title: "Fiesta Chicken Bowl",
    calories: "450 Cal",
    macros: "35g P | 40g C | 15g F",
    image:
      "https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-37.webp&w=2048&q=75",
  },
  {
    id: 2,
    title: "Mexican Chicken Enchilada",
    calories: "520 Cal",
    macros: "42g P | 38g C | 18g F",
    image:
      "https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-7.webp&w=2048&q=75",
  },
  {
    id: 3,
    title: "Basil Chicken Alfredo",
    calories: "480 Cal",
    macros: "38g P | 45g C | 16g F",
    image:
      "https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-9-1.webp&w=2048&q=75",
  },
  {
    id: 4,
    title: "Beef Stroganoff",
    calories: "550 Cal",
    macros: "45g P | 30g C | 22g F",
    image:
      "https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-37.webp&w=2048&q=75",
  },
];

const chips = [
  "NATURAL INGREDIENTS",
  "ALLERGEN-FRIENDLY",
  "VEGETARIAN OPTIONS",
];

export const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState("High Protein");

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
              const selected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:px-5 sm:text-[0.9375rem] ${
                    selected
                      ? "bg-background text-foreground shadow-sm"
                      : "text-background/55 hover:text-background"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 hide-scrollbar lg:gap-6">
          {mockMeals.map((meal) => (
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
                </div>
                <div className="px-2 pb-3 pt-4">
                  <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">
                    {meal.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-md bg-bg-light px-2.5 py-1 font-medium text-foreground">
                      {meal.calories}
                    </span>
                    <span className="text-secondary-text">{meal.macros}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:justify-start">
          <Button variant="onDark" size="lg">
            See full menu
          </Button>
        </div>
      </div>
    </section>
  );
};
