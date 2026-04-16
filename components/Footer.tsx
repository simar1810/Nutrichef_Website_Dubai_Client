import React from "react";
import Link from "next/link";
import { NutrichefLogo } from "@/components/NutrichefLogo";
import { GoogleTranslate } from "@/components/GoogleTranslate";

const companyLinks = [
  { href: "/plans", label: "Plans & Packages" },
  { href: "/menu", label: "Menu" },
] as const;

export const Footer = () => {
  return (
    <footer className="border-t border-border-subtle bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="mb-8 inline-block">
              <NutrichefLogo onDark />
            </Link>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-background/70">
              Nutrichef provides meal plans tailored for busy people. It serves
              delicious food that&apos;s portioned to your requirements and
              fitness goals.
            </p>
            <div className="mt-8 max-w-[280px] rounded-xl border border-background/15 bg-background/[0.06] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-background/50">
                Language
              </p>
              <GoogleTranslate />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:max-w-xl lg:grid-cols-2">
            <div>
              <h3 className="font-heading mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                {companyLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-background/75 transition hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
                Help
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/#faq"
                    className="text-background/75 transition hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-background/10 pt-10 text-sm text-background/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Nutrichef. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
