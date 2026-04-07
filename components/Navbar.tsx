"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { NutrichefWordmark } from "@/components/NutrichefWordmark";

const navLinks = [
  { href: "/#menu", label: "Menu" },
  { href: "/#features", label: "Why us" },
  { href: "/#community", label: "Community" },
  { href: "/#faq", label: "FAQ" },
] as const;

const LG = "(min-width: 1024px)";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const panelCloseRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia(LG);
    const closeIfDesktop = () => {
      if (mq.matches) setOpen(false);
    };
    closeIfDesktop();
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => panelCloseRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed top-0 z-50 w-full pt-[env(safe-area-inset-top,0px)]">
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[55] bg-foreground/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed right-0 z-[60] flex w-full max-w-[min(100vw,22rem)] flex-col border-l border-border-subtle bg-surface shadow-2xl shadow-foreground/10 lg:hidden overscroll-contain sm:max-w-[20rem]"
            style={{
              top: "calc(env(safe-area-inset-top, 0px) + 4rem)",
              height:
                "calc(100dvh - env(safe-area-inset-top, 0px) - 4rem - env(safe-area-inset-bottom, 0px))",
            }}
          >
            <div className="flex min-h-14 items-center justify-between border-b border-border-subtle px-4 py-3 sm:px-5">
              <NutrichefWordmark className="text-lg" />
              <button
                ref={panelCloseRef}
                type="button"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border-subtle text-foreground active:bg-bg-light"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-y-contain px-4 py-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:px-5"
              aria-label="Mobile menu"
            >
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex min-h-12 items-center rounded-xl px-4 text-base font-semibold text-foreground active:bg-bg-light sm:text-lg"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/#menu"
                className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 text-base font-semibold text-white active:bg-primary-hover sm:text-lg"
                onClick={() => setOpen(false)}
              >
                See plans
              </Link>
            </nav>
          </div>
        </>
      ) : null}

      <nav
        className={`relative z-[70] mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 border-b px-4 sm:gap-6 sm:px-6 lg:px-10 ${
          open
            ? "border-border-subtle bg-background/95 shadow-sm backdrop-blur-md"
            : "border-border-subtle bg-background/80 backdrop-blur-md"
        }`}
        aria-label="Main"
      >
        <Link
          href="/"
          className="min-h-11 min-w-0 shrink-0 py-2 text-lg sm:text-xl lg:text-2xl"
          onClick={() => setOpen(false)}
        >
          <NutrichefWordmark />
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap text-sm font-semibold text-secondary-text transition hover:text-foreground"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#menu"
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            See plans
          </Link>
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface text-foreground shadow-sm active:border-foreground/20 active:bg-bg-light lg:hidden"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg
              className="h-5 w-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
};
