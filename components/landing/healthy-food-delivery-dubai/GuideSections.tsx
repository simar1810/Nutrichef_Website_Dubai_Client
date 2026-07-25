import React from "react";
import Link from "next/link";
import {
  comparison,
  cost,
  delivery,
  finePrint,
  halal,
  healthNeeds,
  introduction,
  pathOne,
  pathTwo,
  pickPath,
  quickAnswers,
  reviews,
  sustainability,
} from "@/content/healthy-food-delivery-dubai";

function SectionShell({
  children,
  tone = "surface",
  id,
}: {
  children: React.ReactNode;
  tone?: "surface" | "light";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`border-b border-border-subtle py-20 sm:py-24 lg:py-28 ${
        tone === "light" ? "bg-bg-light" : "bg-surface"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">{children}</div>
    </section>
  );
}

function Heading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <>
      {eyebrow ? (
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
    </>
  );
}

export function GuideSections() {
  return (
    <>
      <SectionShell tone="surface">
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="Guide" title={introduction.heading} />
          <div className="mt-6 space-y-5">
            {introduction.paragraphs.map((p) => (
              <p
                key={p.slice(0, 48)}
                className="text-base leading-relaxed text-secondary-text sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="light">
        <div className="max-w-3xl">
          <Heading eyebrow="Start here" title={pickPath.heading} />
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {pickPath.intro}
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {pickPath.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm sm:p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text">
                {card.body}
              </p>
              {card.ctaHref && card.ctaLabel ? (
                <Link
                  href={card.ctaHref}
                  className="mt-5 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {card.ctaLabel} →
                </Link>
              ) : null}
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-secondary-text sm:text-lg">
          {pickPath.closing}
        </p>
      </SectionShell>

      <SectionShell tone="surface" id="quick-answers">
        <div className="max-w-3xl">
          <Heading eyebrow="At a glance" title={quickAnswers.heading} />
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {quickAnswers.items.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-border-subtle bg-bg-light p-6 sm:p-8"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                {item.question}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell tone="light">
        <div className="max-w-3xl">
          <Heading eyebrow="Path one" title={pathOne.heading} />
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {pathOne.intro}
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-surface p-6 shadow-sm sm:p-10">
          <h3 className="font-heading text-2xl font-semibold text-foreground">
            {pathOne.nutrichef.heading}
          </h3>
          <div className="mt-5 space-y-5">
            {pathOne.nutrichef.paragraphs.map((p) => (
              <p
                key={p.slice(0, 48)}
                className="text-base leading-relaxed text-secondary-text"
              >
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {pathOne.nutrichef.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex h-11 items-center rounded-full border border-border-subtle bg-bg-light px-5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
          <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
            {pathOne.others.heading}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-secondary-text sm:text-lg">
            {pathOne.others.paragraph}
          </p>
        </div>
      </SectionShell>

      <SectionShell tone="surface">
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="Path two" title={pathTwo.heading} />
          <div className="mt-6 space-y-5">
            {pathTwo.paragraphs.map((p) => (
              <p
                key={p.slice(0, 48)}
                className="text-base leading-relaxed text-secondary-text sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="light">
        <div className="max-w-3xl">
          <Heading eyebrow="Compare" title={comparison.heading} />
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {comparison.intro}
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {comparison.columns.map((col) => (
            <article
              key={col.title}
              className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm sm:p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[0.9375rem] leading-relaxed text-secondary-text"
                  >
                    <span className="mt-1 text-primary" aria-hidden>
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-secondary-text sm:text-lg">
          {comparison.closing}
        </p>
      </SectionShell>

      <SectionShell tone="surface">
        <div className="max-w-3xl">
          <Heading eyebrow="Specific needs" title={healthNeeds.heading} />
          <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
            {healthNeeds.intro}
          </p>
        </div>
        <div className="mt-12 space-y-6">
          {healthNeeds.items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border-subtle bg-bg-light p-6 sm:p-8"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary-text sm:text-base">
                {item.body}
              </p>
              {"sourceHref" in item && item.sourceHref ? (
                <a
                  href={item.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Source: {item.sourceLabel} →
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell tone="light">
        <div className="mx-auto max-w-3xl">
          <Heading title={halal.heading} />
          <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg">
            {halal.paragraph}
          </p>
        </div>
      </SectionShell>

      <SectionShell tone="surface">
        <div className="mx-auto max-w-3xl">
          <Heading title={cost.heading} />
          <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg">
            {cost.paragraph}
          </p>
          <Link
            href={cost.ctaHref}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
          >
            {cost.ctaLabel}
          </Link>
        </div>
      </SectionShell>

      <SectionShell tone="light">
        <div className="mx-auto max-w-3xl">
          <Heading title={finePrint.heading} />
          <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg">
            {finePrint.paragraph}
          </p>
          <Link
            href={finePrint.ctaHref}
            className="mt-6 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {finePrint.ctaLabel} →
          </Link>
        </div>
      </SectionShell>

      <SectionShell tone="surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Heading title={delivery.heading} />
            <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg">
              {delivery.paragraph}
            </p>
            <a
              href={delivery.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Source: {delivery.sourceLabel} →
            </a>
          </div>
          <ul className="grid grid-cols-2 gap-3 lg:col-span-5">
            {delivery.zones.map((zone) => (
              <li
                key={zone}
                className="rounded-xl border border-border-subtle bg-bg-light px-4 py-3 text-center text-sm font-medium text-foreground"
              >
                {zone}
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>

      <SectionShell tone="light">
        <div className="mx-auto max-w-3xl">
          <Heading title={reviews.heading} />
          <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg">
            {reviews.paragraph}
          </p>
        </div>
      </SectionShell>

      <SectionShell tone="surface">
        <div className="mx-auto max-w-3xl">
          <Heading title={sustainability.heading} />
          <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg">
            {sustainability.paragraph}
          </p>
        </div>
      </SectionShell>
    </>
  );
}
