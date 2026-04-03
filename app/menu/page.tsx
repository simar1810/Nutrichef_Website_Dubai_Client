import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { FilterBar } from '../../components/menu/FilterBar';
import { MenuCard } from '../../components/menu/MenuCard';
import { menuItems } from './data';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white text-[#343B42]">
      {/* Header logic reusing Navbar, but needs to be in-flow or relative for the page */}
      {/* Real Calo has sticky nav, so we'll just render Navbar */}
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#EAF5F0] text-[#114B34] text-sm font-bold mb-6">
              <span className="mr-2">📅</span>
              29 Mar - 4 Apr
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#343B42] mb-3 tracking-tight">
              Check out this week's menu
            </h1>
            <p className="text-lg text-gray-500">
              Here's a taste of what's included when you subscribe to Calo
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <button className="bg-[#24A170] hover:bg-[#1E8C61] text-white px-8 py-3.5 rounded-full font-bold text-base transition-colors shadow-[0_4px_14px_0_rgba(36,161,112,0.39)]">
              Order Now
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 mt-8">
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
