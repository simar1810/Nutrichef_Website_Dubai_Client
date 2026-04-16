"use client";

import React from "react";

/** Plan-style filters only (no veg / chef picks / custom macros). */
export const MENU_FILTERS = [
  { id: "all", label: "All", icon: null as string | null },
  { id: "balanced", label: "Balanced", icon: "⚖️" },
  { id: "high-protein", label: "High Protein", icon: "🍗" },
  { id: "low-carb", label: "Low carb", icon: "🥑" },
] as const;

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <div className="sticky top-0 z-40 my-10 flex flex-col justify-between gap-4 bg-background/90 py-4 backdrop-blur-md md:flex-row md:items-center">
      <div className="no-scrollbar flex w-full gap-3 overflow-x-auto pb-2 md:w-auto md:pb-0">
        {MENU_FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={`flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-bg-light text-foreground hover:bg-foreground/10"
              }`}
            >
              {filter.icon ? <span className="mr-2 text-lg">{filter.icon}</span> : null}
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="ml-4 hidden md:flex">
        <button
          type="button"
          className="flex w-48 items-center justify-between rounded-full bg-bg-light px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/10"
        >
          <span>Type of meal</span>
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
