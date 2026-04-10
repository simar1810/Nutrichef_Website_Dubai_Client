"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../Button";

const MENU_SECTION_ID = "menu";

function scrollToMenuSection() {
  document
    .getElementById(MENU_SECTION_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const HERO_IMAGE =
  "https://cdncaloapp.com/28e125562515cd84cda748118c399f96ec409f93.webp";

export const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-20 lg:min-h-screen lg:pb-24">
      <div
        className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl lg:top-32 lg:h-[520px] lg:w-[520px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-5 xl:col-span-5">
            <p className="font-heading mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
              Fresh daily · Heat &amp; eat
            </p>
            <h1 className="font-heading text-[2.65rem] font-semibold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
              Healthy Meals
              <br />
              <span className="text-primary">To Gain Muscle</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-secondary-text sm:text-xl">
              Designed by nutritionists, crafted by chefs, personalized to your
              goals. Fresh daily. Just heat and eat.
            </p>
            <div className="mt-10">
              <Button
                type="button"
                size="lg"
                onClick={() => router.push("/plans")}
              >
                See plans
              </Button>
            </div>
            <dl className="mt-14 grid max-w-lg gap-6 border-t border-border-subtle pt-10 sm:grid-cols-2 sm:gap-8">
              <div>
                <dt className="sr-only">Customers</dt>
                <dd className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                  290K
                </dd>
                <dd className="mt-1 text-sm leading-snug text-secondary-text">
                  happy customers in Worldwide
                </dd>
              </div>
              <div>
                <dt className="sr-only">Meals</dt>
                <dd className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                  19M
                </dd>
                <dd className="mt-1 text-sm leading-snug text-secondary-text">
                  meals delivered
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToMenuSection}
                aria-label="Scroll to menu"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-secondary-text shadow-sm ring-1 ring-border-subtle transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
              <span className="text-sm font-semibold text-primary">
                Scroll to today&apos;s menu
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-7 xl:col-span-7">
            <div className="relative mx-auto aspect-[5/6] w-full max-w-md sm:max-w-none sm:aspect-[16/11] lg:aspect-[11/10] lg:max-w-none">
              <div className="absolute -inset-3 -z-10 rounded-[2.25rem] bg-gradient-to-br from-primary/25 via-transparent to-foreground/10 blur-2xl" />
              <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-border-subtle bg-surface shadow-[0_24px_80px_-24px_rgba(18,24,22,0.35)] sm:rounded-[2rem]">
                <Image
                  src={HERO_IMAGE}
                  alt="NutriChef freshly prepared meal"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
