import React from "react";
import Link from "next/link";

export interface LegalSection {
  id: string;
  heading: string;
  body: React.ReactNode;
}

/**
 * Shared shell for Privacy Policy / Terms & Conditions: hero band, a
 * desktop jump-to-section nav, and consistent prose styling. Content is
 * passed in as sections so both pages share one visual system.
 */
export function LegalPageLayout({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border-subtle bg-emerald-deep pt-32 pb-16 text-white sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
            {eyebrow}
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {intro}
          </p>
          <p className="mt-6 text-sm font-semibold text-white/45">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[240px_1fr] lg:gap-16 lg:px-10">
          {/* Jump-to nav — desktop only */}
          <nav
            aria-label="Sections"
            className="hidden lg:block lg:sticky lg:top-28 lg:h-fit"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary-text">
              On this page
            </p>
            <ul className="space-y-2.5 border-l border-border-subtle pl-4 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-secondary-text transition hover:text-primary"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="min-w-0 max-w-3xl">
            <div className="space-y-12">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                    {s.heading}
                  </h2>
                  <div className="prose-legal mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-secondary-text">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-border-subtle bg-bg-light p-7 sm:p-8">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Questions about this page?
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary-text">
                Reach our concierge team any time —{" "}
                <Link
                  href="/contact-us"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  contact us
                </Link>{" "}
                or message us directly on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
