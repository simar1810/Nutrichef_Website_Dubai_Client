import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NutrichefLogo } from "@/components/NutrichefLogo";
import { GoogleTranslate } from "@/components/GoogleTranslate";

const companyLinks: { label: string; href: string }[] = [
  { label: "Plans & Packages", href: "/plans" },
  { label: "Menu", href: "/menu" },
  { label: "The Cafe", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border-subtle bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="mb-8 inline-block">
              <NutrichefLogo onDark />
            </Link>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-background/70">
              NutriChef provides meal plans tailored for busy people. It serves
              delicious food that&apos;s portioned to your requirements and
              fitness goals.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GoogleTranslate />
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <a
                href="#"
                className="text-background/60 transition hover:text-primary"
                aria-label="TikTok"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-background/60 transition hover:text-primary"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-background/60 transition hover:text-primary"
                aria-label="X"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M18.9 1.15H22l-6.8 7.76 8 10.5h-6.28l-4.9-6.42-5.6 6.42H3.3l7.24-8.25-7.74-10.16h6.43l4.43 5.86 4.96-5.86h.3zm-1.07 16.4h1.72L7.33 3H5.5L17.83 17.55z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-background/60 transition hover:text-primary"
                aria-label="LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
            <div>
              <h3 className="font-heading mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                {companyLinks.map(({ label, href }) => (
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
                <li>
                  <Link
                    href="#"
                    className="text-background/75 transition hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
                Download the App
              </h3>
              <div className="flex max-w-sm items-start gap-4 rounded-2xl border border-background/10 bg-background/[0.06] p-4">
                <div className="relative h-[54px] w-[54px] shrink-0">
                  <Image
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nutrichef.com&color=ffffff"
                    alt="QR code to download app"
                    width={54}
                    height={54}
                    unoptimized
                    className="rounded-md object-contain"
                  />
                </div>
                <p className="pt-1 text-sm leading-relaxed text-background/70">
                  Scan the QR code to download the NutriChef app
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-background/10 pt-10 text-sm text-background/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NutriChef. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="#" className="transition hover:text-background">
              Privacy Policy
            </Link>
            <Link href="#" className="transition hover:text-background">
              Terms & Conditions
            </Link>
            <Link href="#" className="transition hover:text-background">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
