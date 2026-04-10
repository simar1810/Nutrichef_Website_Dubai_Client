"use client";

import React, { useState } from "react";
import { Button } from "../Button";

const faqs = [
  {
    question: "Am I tied into a contract?",
    answer:
      "No, you can pause or cancel your subscription at any time without any hidden fees.",
  },
  {
    question: "Can I exclude ingredients?",
    answer:
      "Yes, you can easily filter meals by allergens or completely exclude specific ingredients from your menu preferences.",
  },
  {
    question: "What if I don't like a meal on my menu?",
    answer:
      "You have full control to swap any meal you don't like with another option from our 80+ weekly changing menu before the cutoff time.",
  },
  {
    question: "Can I enter my own macros?",
    answer:
      "Absolutely. We have custom macro options so you can hit your protein, carb, and fat targets. You can also use our build-your-own flow for exact portions.",
  },
  {
    question: "Up to what point can I make changes to my delivery?",
    answer:
      "You can make changes to your upcoming delivery up to 48 hours in advance through the app.",
  },
  {
    question: "How long do the meals last?",
    answer:
      "Our meals are made fresh daily without preservatives. They are designed to stay fresh in the fridge for up to 3 days.",
  },
  {
    question: "What oils do you cook with?",
    answer:
      "We use high-quality olive oil, coconut oil, and occasionally avocado oil. We never use refined seed oils in our cooking.",
  },
  {
    question: "What type of packaging does your food come in?",
    answer:
      "We use eco-friendly containers made of bagasse (sugar cane byproduct) which are 100% compostable and microwave safe.",
  },
  {
    question: "How do I pause my subscription?",
    answer:
      "You can pause your subscription anytime directly from your dashboard under 'Manage Subscription'.",
  },
  {
    question: "Do you deliver to all areas in Kuwait?",
    answer:
      "We deliver to most areas within Kuwait. You can check if your specific area is covered when entering your address at checkout.",
  },
  {
    question: "What are the delivery times and is weekend delivery available?",
    answer:
      "We deliver daily between 6 AM and 10 AM. Yes, weekend delivery is available depending on your selected plan.",
  },
  {
    question: "Can I swap meals on the menu or change certain ingredients?",
    answer:
      "Yes, you have full control to swap any meal you don't like with another option from our weekly menu.",
  },
  {
    question: "What makes the Nutrichef experience in Kuwait unique?",
    answer:
      "We offer personalized meal plans tuned to your macros, cooked with premium ingredients, and delivered fresh daily.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="border-t border-border-subtle bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:max-w-6xl lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:pt-2">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
              Support
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Still hungry? Checkout our FAQ
            </h2>
          </div>

          <div className="mt-12 border-t border-border-subtle lg:col-span-8 lg:mt-0">
            {faqs.map((faq, idx) => {
              const open = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="border-b border-border-subtle"
                >
                  <button
                    type="button"
                    className="flex w-full items-start gap-4 py-6 text-left transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-6 sm:py-7"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={open}
                  >
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition sm:h-9 sm:w-9 ${
                        open
                          ? "border-primary bg-primary text-white"
                          : "border-border-subtle bg-surface text-secondary-text"
                      }`}
                      aria-hidden
                    >
                      {open ? "−" : "+"}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`font-heading block text-lg font-semibold leading-snug sm:text-xl ${
                          open ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="pt-4 text-[0.9375rem] leading-relaxed text-secondary-text sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-4" aria-hidden />
          <div className="flex justify-center lg:col-span-8 lg:justify-start">
            <Button variant="outline" size="lg">
              Got more questions?
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
