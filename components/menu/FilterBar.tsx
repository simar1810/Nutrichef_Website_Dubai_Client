"use client";
import React, { useState } from 'react';

const filters = [
  { id: 'all', label: 'All', icon: null },
  { id: 'balanced', label: 'Balanced', icon: '⚖️' },
  { id: 'high-protein', label: 'High Protein', icon: '🍗' },
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥦' },
  { id: 'gut-health', label: 'Gut health', icon: '🥗' },
  { id: 'custom-macros', label: 'Custom Macros', icon: '🏋️' }
];

export const FilterBar = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-10 sticky top-0 bg-white/90 backdrop-blur-md z-40 py-4">
      {/* Pills Container */}
      <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar gap-3 pb-2 md:pb-0">
        {filters.map((filter) => {
          const isActive = activeTab === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveTab(filter.id)}
              className={`whitespace-nowrap flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-[#114B34] text-white shadow-md'
                  : 'bg-[#F5F6F7] text-[#343B42] hover:bg-[#E2E4E6]'
              }`}
            >
              {filter.icon && <span className="mr-2 text-lg">{filter.icon}</span>}
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Type of meal dropdown */}
      <div className="hidden md:flex ml-4">
        <button className="flex items-center justify-between px-6 py-3 rounded-full bg-[#F5F6F7] text-[#343B42] text-sm font-semibold hover:bg-[#E2E4E6] transition-colors w-48">
          <span>Type of meal</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
