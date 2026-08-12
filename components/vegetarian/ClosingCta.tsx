import React from "react";
import Link from "next/link";
import { whatsappLink, STARTING_PRICE_PER_MEAL_AED } from "@/lib/site-config";

/** Closing conversion band — matches the site-wide "Your chef is ready…"
 * pattern with vegetarian-specific copy and dual CTA. */
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-emerald-deep py-20 text-white sm:py-24">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[360px] w-[640px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(28,107,69,0.4), rgba(28,107,69,0) 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          Your chef is ready. Your plate is plant-based.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
          A dedicated vegetarian rotation, chef-cooked and nutritionist-signed
          — from AED {STARTING_PRICE_PER_MEAL_AED} a meal.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/plans"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-10 text-base font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            Start my plan
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden
            >
              →
            </span>
          </Link>
          <a
            href={whatsappLink(
              "Hi NutriChef, I'd like to know more about the vegetarian meal plan.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-white/85 underline-offset-4 transition hover:text-white hover:underline"
          >
            Talk to concierge
          </a>
        </div>
        <p className="mt-7 text-sm text-white/45">Pause anytime. No lock-in.</p>
      </div>
    </section>
  );
}
