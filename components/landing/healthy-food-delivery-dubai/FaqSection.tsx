"use client";

import Link from "next/link";
import { SeoFaqSection } from "@/components/landing/shared/SeoFaqSection";
import {
  faqFooter,
  faqHeading,
  faqItems,
} from "@/content/healthy-food-delivery-dubai";

export function FaqSection() {
  return (
    <>
      <SeoFaqSection heading={faqHeading} items={faqItems} />
      <div className="border-t border-border-subtle bg-background pb-16 pt-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="max-w-3xl text-sm leading-relaxed text-secondary-text">
            More detailed answers are available on NutriChef&apos;s own{" "}
            <Link
              href={faqFooter.links[0].href}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              FAQ page
            </Link>
            , or you can reach the team directly through the{" "}
            <Link
              href={faqFooter.links[1].href}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
