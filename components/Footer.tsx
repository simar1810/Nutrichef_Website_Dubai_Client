import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NutrichefLogo } from "@/components/NutrichefLogo";
import { GoogleTranslate } from "@/components/GoogleTranslate";

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
            <div className="mt-8 flex flex-wrap gap-2">
              {["TikTok", "Insta", "X", "In"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="rounded-lg border border-background/15 px-3 py-2 text-xs font-medium text-background/80 transition hover:border-primary hover:text-background"
                >
                  {social}
                </a>
              ))}
            </div>
            <div className="mt-8 max-w-[280px] rounded-xl border border-background/15 bg-background/[0.06] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-background/50">
                Language
              </p>
              <GoogleTranslate />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
            <div>
              <h3 className="font-heading mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Plans & Packages",
                  "Menu",
                  "The Cafe",
                  "Careers",
                  "Blog",
                ].map((label) => (
                  <li key={label}>
                    <Link
                      href="#"
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
                    href="#"
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
              <div className="flex items-start gap-4 rounded-2xl border border-background/10 bg-background/[0.06] p-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-background">
                  <Image
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nutrichef.com&color=1b3022"
                    alt="Download app QR code"
                    width={64}
                    height={64}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <p className="pt-1 text-sm leading-relaxed text-background/70">
                  Scan to download the Nutrichef app
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-background/10 pt-10 text-sm text-background/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Nutrichef. All rights reserved.</p>
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
