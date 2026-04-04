"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { FilterBar } from "../../components/menu/FilterBar";
import { MenuCard } from "../../components/menu/MenuCard";
import { fallbackMenuItems, type MenuItem } from "./data";
import { api } from "@/lib/api";

interface BackendRecipe {
  _id: string;
  title: string;
  category?: string;
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  tags?: string[];
  media?: string[];
  status?: string;
}

function mapRecipeToMenuItem(recipe: BackendRecipe): MenuItem {
  return {
    id: recipe._id,
    title: recipe.title,
    description: recipe.category || "",
    calories: recipe.nutrition?.calories || 0,
    macros: {
      protein: recipe.nutrition?.protein || 0,
      carbs: recipe.nutrition?.carbs || 0,
      fat: recipe.nutrition?.fat || 0,
    },
    isNew: recipe.tags?.includes("new") || false,
    imageUrl:
      recipe.media?.[0] ||
      "https://cdn.calo.app/food/46cfb754-32c1-4f59-93fa-026430ae9918/square@3x.jpg",
    category: recipe.category,
    tags: recipe.tags,
  };
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  const fetchMenu = useCallback(async () => {
    try {
      const res = await api.get<{ recipes: BackendRecipe[] }>("/menu/list?type=recipes", {
        noAuth: true,
      });
      const recipes = res.data?.recipes || [];
      if (recipes.length > 0) {
        const items = recipes.map(mapRecipeToMenuItem);
        setMenuItems(items);

        const cats = [...new Set(items.map((i) => i.category).filter(Boolean))] as string[];
        setCategories(cats);
      } else {
        setMenuItems(fallbackMenuItems);
      }
    } catch {
      setMenuItems(fallbackMenuItems);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(
        menuItems.filter(
          (item) =>
            item.category?.toLowerCase() === activeFilter.toLowerCase() ||
            item.tags?.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
        )
      );
    }
  }, [activeFilter, menuItems]);

  return (
    <div className="min-h-screen bg-white text-[#343B42]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#EAF5F0] text-[#114B34] text-sm font-bold mb-6">
              <span className="mr-2">📅</span>
              This Week&apos;s Menu
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#343B42] mb-3 tracking-tight">
              Check out this week&apos;s menu
            </h1>
            <p className="text-lg text-gray-500">
              Here&apos;s a taste of what&apos;s included when you subscribe
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <button className="bg-[#24A170] hover:bg-[#1E8C61] text-white px-8 py-3.5 rounded-full font-bold text-base transition-colors shadow-[0_4px_14px_0_rgba(36,161,112,0.39)]">
              Order Now
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Menu Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col animate-pulse">
                <div className="w-full aspect-square bg-gray-200 rounded-[32px] mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 mx-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 mt-8">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#878E99] text-lg font-medium">
              No dishes found for this filter.
            </p>
          </div>
        )}
      </main>

      {/* <Footer /> */}
    </div>
  );
}
