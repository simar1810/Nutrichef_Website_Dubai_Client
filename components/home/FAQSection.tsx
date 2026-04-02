"use client";
import React, { useState } from 'react';
import { Button } from '../Button';

const faqs = [
    {
        question: "Am I tied into a contract?",
        answer: "No, you can pause or cancel your subscription at any time without any hidden fees."
    },
    {
        question: "Can I exclude ingredients?",
        answer: "Yes, you can easily filter meals by allergens or completely exclude specific ingredients from your menu preferences."
    },
    {
        question: "What if I don't like a meal on my menu?",
        answer: "You have full control to swap any meal you don't like with another option from our 80+ weekly changing menu before the cutoff time."
    },
    {
        question: "Can I enter my own macros?",
        answer: "Yes! Our build-your-own feature allows you to customize the exact portions of protein, carbs, and fats to hit your specific goals."
    },
    {
        question: "How long do the meals last?",
        answer: "Our meals are made fresh daily without preservatives. They are designed to stay fresh in the fridge for up to 3 days."
    },
    {
        question: "What type of packaging does your food come in?",
        answer: "We use eco-friendly containers made of bagasse (sugar cane byproduct) which are 100% compostable and microwave safe."
    }
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[48px] font-bold text-foreground mb-6">
                        Still hungry? Checkout our FAQ
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`border-b border-gray-100 pb-4 transition-all duration-300 ${openIndex === idx ? 'bg-gray-50 rounded-2xl p-6 border-b-0' : 'p-4'}`}
                        >
                            <button
                                className="w-full flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                                onClick={() => toggleFaq(idx)}
                            >
                                <span className={`text-lg font-bold ${openIndex === idx ? 'text-primary' : 'text-foreground'}`}>
                                    {faq.question}
                                </span>
                                <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            <div
                                className={`mt-4 text-secondary-text leading-relaxed transition-all duration-300 overflow-hidden ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button variant="outline" className="font-bold">Got more questions?</Button>
                </div>

            </div>
        </section>
    );
};
