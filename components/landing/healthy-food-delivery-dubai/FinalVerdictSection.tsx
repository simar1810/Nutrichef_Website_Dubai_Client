import React from "react";
import Link from "next/link";
import { finalVerdict } from "@/content/healthy-food-delivery-dubai";

export function FinalVerdictSection() {
  return (
    <section className="bg-emerald-deep py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
            Verdict
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {finalVerdict.heading}
          </h2>
          <div className="mt-6 space-y-5">
            {finalVerdict.paragraphs.map((p) => (
              <p
                key={p.slice(0, 48)}
                className="text-base leading-relaxed text-white/75 sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={finalVerdict.primaryHref}
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-9 text-base font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              {finalVerdict.primaryCta}
            </Link>
            <Link
              href={finalVerdict.secondaryHref}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/25 px-9 text-base font-semibold text-white transition hover:bg-white/10"
            >
              {finalVerdict.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
