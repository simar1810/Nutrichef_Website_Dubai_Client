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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-10 sticky top-0 bg-white/90 backdrop-blur-md z-40 py-4">
      <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar gap-3 pb-2 md:pb-0">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`whitespace-nowrap flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-[#114B34] text-white shadow-md"
                  : "bg-[#F5F6F7] text-[#343B42] hover:bg-[#E2E4E6]"
              }`}
            >
              {filter.icon && <span className="mr-2 text-lg">{filter.icon}</span>}
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="hidden md:flex ml-4">
        <button className="flex items-center justify-between px-6 py-3 rounded-full bg-[#F5F6F7] text-[#343B42] text-sm font-semibold hover:bg-[#E2E4E6] transition-colors w-48">
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
