"use client";
import React from "react";

const DEFAULT_FILTERS = [
  { id: "all", label: "All", icon: null },
  { id: "balanced", label: "Balanced", icon: "⚖️" },
  { id: "high-protein", label: "High Protein", icon: "🍗" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥦" },
  { id: "gut-health", label: "Gut health", icon: "🥗" },
  { id: "custom-macros", label: "Custom Macros", icon: "🏋️" },
];

const CATEGORY_ICONS: Record<string, string> = {
  balanced: "⚖️",
  "high-protein": "🍗",
  "high protein": "🍗",
  vegetarian: "🥦",
  vegan: "🥦",
  "gut-health": "🥗",
  "low-carb": "🥑",
  "low carb": "🥑",
  keto: "🥑",
  breakfast: "🍳",
  lunch: "🥘",
  dinner: "🍽️",
  snack: "🥤",
};

interface FilterBarProps {
  categories?: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterBar = ({
  categories,
  activeFilter,
  onFilterChange,
}: FilterBarProps) => {
  const filters =
    categories && categories.length > 0
      ? [
          { id: "all", label: "All", icon: null },
          ...categories.map((cat) => ({
            id: cat.toLowerCase(),
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
            icon: CATEGORY_ICONS[cat.toLowerCase()] || null,
          })),
        ]
      : DEFAULT_FILTERS;

  return (
    <div className="sticky top-0 z-40 my-10 flex flex-col justify-between gap-4 bg-background/90 py-4 backdrop-blur-md md:flex-row md:items-center">
      <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar gap-3 pb-2 md:pb-0">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-bg-light text-foreground hover:bg-foreground/10"
              }`}
            >
              {filter.icon && <span className="mr-2 text-lg">{filter.icon}</span>}
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="hidden md:flex ml-4">
        <button
          type="button"
          className="flex w-48 items-center justify-between rounded-full bg-bg-light px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/10"
        >
          <span>Type of meal</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
