import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/lib/site-config";

/**
 * TODO: replace with NutriChef's own vegetarian dish photography once the
 * 3 client-provided photos are saved into the repo (e.g. public/new_assets/
 * vegetarian/) — they were shared in chat only, so they aren't on disk yet.
 * Sourced live from Unsplash's vegetarian/buddha-bowl search results.
 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1602881916963-5daf2d97c06e?auto=format&fit=crop&w=1800&q=80";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden"
    >
      <Image
        src={HERO_IMAGE}
        alt="Vegetarian meal plan Dubai — plant-based buddha bowl with tofu, avocado and greens from NutriChef's vegetarian rotation"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/35 to-black/60 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/40 sm:to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/45 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-20 sm:px-8 sm:pt-36 sm:pb-24 lg:px-10 lg:pt-40 lg:pb-28">
        <div className="max-w-2xl">
          <p className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-xs">
            <span>Nutritionist-signed</span>
            <span className="text-white/35" aria-hidden>
              ·
            </span>
            <span>New global menu weekly</span>
            <span className="text-white/35" aria-hidden>
              ·
            </span>
            <span>350–450 cal/meal</span>
          </p>
          <h1 className="font-heading text-[2rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.85rem] xl:text-[3.15rem]">
            Plant-powered. Chef-crafted.
            <br />
            Yours by 10 AM.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            A genuine vegetarian rotation, not a single dish on repeat.
            Nutritionist-signed, chef-cooked fresh every morning, and
            delivered across Dubai, Abu Dhabi &amp; Sharjah before 10 AM.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/plans"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Start my vegetarian plan →
            </Link>
            <a
              href={whatsappLink(
                "Hi NutriChef, I'd like to know more about the vegetarian meal plan.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-white/35 bg-transparent px-8 text-base font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Talk to concierge on WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm text-white/70">
            From AED 45/meal · Pause anytime · No lock-in
          </p>
        </div>
      </div>
    </section>
  );
}
