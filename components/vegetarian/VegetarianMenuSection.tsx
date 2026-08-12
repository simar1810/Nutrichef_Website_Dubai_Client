"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

const FALLBACK_IMAGE =
  "https://cdn.calo.app/food/46cfb754-32c1-4f59-93fa-026430ae9918/square@3x.jpg";

interface ApiRecipe {
  _id: string;
  title: string;
  nutrition?: { calories?: number; protein?: number; carbs?: number; fat?: number };
  tags?: string[];
  media?: string[];
}

/** Reuses the homepage menu card's dark-card visual language, hard-filtered
 * to recipes tagged "vegetarian" (no meat, fish, poultry, or eggs — dairy
 * allowed, matching the dietary-preference definition already used at
 * registration). No "All" tab — this section is vegetarian only. */
export function VegetarianMenuSection() {
  const [recipes, setRecipes] = useState<ApiRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = useCallback(async () => {
    try {
      const res = await api.get<{ recipes: ApiRecipe[] }>("/menu/list?type=recipes", {
        noAuth: true,
      });
      setRecipes(res.data?.recipes ?? []);
    } catch {
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRecipes();
  }, [fetchRecipes]);

  const vegDishes = useMemo(
    () => recipes.filter((r) => r.tags?.includes("vegetarian")).slice(0, 8),
    [recipes],
  );

  return (
    <section
      id="vegetarian-menu"
      className="relative overflow-hidden bg-emerald-deep py-20 text-white sm:py-24"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(28,107,69,0.35), rgba(28,107,69,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-heading text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
            This week&rsquo;s{" "}
            <em className="not-italic bg-gradient-to-r from-gold-soft to-[#f3e7c3] bg-clip-text text-transparent">
              vegetarian menu.
            </em>
          </h2>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-2.5">
                <div className="aspect-[4/5] animate-pulse rounded-2xl bg-white/[0.07]" />
              </div>
            ))}
          </div>
        ) : vegDishes.length === 0 ? (
          <p className="mt-10 text-center text-base text-white/55">
            This week&rsquo;s vegetarian dishes are loading slowly — see the{" "}
            <Link href="/menu?filter=vegetarian" className="font-semibold text-gold-soft underline-offset-4 hover:underline">
              full menu
            </Link>
            .
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {vegDishes.map((dish) => {
              const calories =
                dish.nutrition?.calories != null ? Math.round(dish.nutrition.calories) : null;
              return (
                <article
                  key={dish._id}
                  className="group w-full will-change-transform"
                >
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-2.5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold/35 hover:bg-white/[0.08] hover:shadow-[0_36px_70px_-24px_rgba(0,0,0,0.7)]">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/[0.04]">
                      <Image
                        src={dish.media?.[0] || FALLBACK_IMAGE}
                        alt={`${dish.title} — vegetarian meal plan Dubai dish from NutriChef's weekly rotation`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-emerald-deep/85 via-transparent to-transparent"
                        aria-hidden
                      />
                      {calories != null ? (
                        <span className="absolute left-3 top-3 rounded-full bg-emerald-deep/80 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-gold-soft backdrop-blur">
                          {calories} kcal
                        </span>
                      ) : null}
                      <h3 className="font-heading absolute inset-x-3 bottom-3 text-base font-semibold leading-snug text-white drop-shadow sm:inset-x-4 sm:bottom-4 sm:text-xl">
                        {dish.title}
                      </h3>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/menu?filter=vegetarian"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-gold-soft px-9 text-base font-semibold text-emerald-deep transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            See the full menu
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
