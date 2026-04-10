"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../Button';

const faqs = [
    {
        question: "Am I tied into a contract?",
        answer: "No, you can pause or cancel your subscription at any time without any hidden fees."
    },
    {
        question: "Can I enter my own macros?",
        answer: "Absolutely. We have a special custom macros plan for this. You enter your goal macros and we get working on a menu that matches them."
    },
    {
        question: "Up to what point can I make changes to my delivery?",
        answer: "You can make changes to your upcoming delivery up to 48 hours in advance through the app."
    },
    {
        question: "How long do the meals last?",
        answer: "Our meals are made fresh daily without preservatives. They are designed to stay fresh in the fridge for up to 3 days."
    },
    {
        question: "What oils do you cook with?",
        answer: "We use high-quality olive oil, coconut oil, and occasionally avocado oil. We never use refined seed oils in our cooking."
    },
    {
        question: "What type of packaging does your food come in?",
        answer: "We use eco-friendly containers made of bagasse (sugar cane byproduct) which are 100% compostable and microwave safe."
    },
    {
        question: "How do I pause my subscription?",
        answer: "You can pause your subscription anytime directly from your dashboard under 'Manage Subscription'."
    },
    {
        question: "Do you deliver to all areas in Kuwait?",
        answer: "We deliver to most areas within Kuwait. You can check if your specific area is covered when entering your address at checkout."
    },
    {
        question: "What are the delivery times and is weekend delivery available?",
        answer: "We deliver daily between 6 AM and 10 AM. Yes, weekend delivery is available depending on your selected plan."
    },
    {
        question: "Can I swap meals on the menu or change certain ingredients?",
        answer: "Yes, you have full control to swap any meal you don't like with another option from our weekly menu."
    },
    {
        question: "What makes the NutriChef experience in Kuwait unique?",
        answer: "We offer completely personalized meal plans tuned to your unique macros, cooked with premium ingredients, and delivered fresh daily."
    }
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(1); // Default open second item to match image

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-white w-full">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                {/* Left Side: FAQ List */}
                <div className="w-full lg:flex-1">
                    <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#2F3337] mb-10 leading-[1.1] tracking-tight">
                        Still hungry?<br />Checkout our FAQ
                    </h2>

                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`transition-all duration-300 rounded-[16px] border ${isOpen ? 'bg-white border-gray-200' : 'bg-[#F7F7F8] border-transparent hover:bg-gray-100'} cursor-pointer`}
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <div className="w-full flex justify-between items-center text-left py-[18px] px-6 select-none">
                                        <span className="text-[15px] font-extrabold text-[#2F3337] pr-4">
                                            {faq.question}
                                        </span>
                                        <span className="flex-shrink-0 text-[#249B60] text-[28px] font-light leading-none flex items-center justify-center">
                                            {isOpen ? '−' : '+'}
                                        </span>
                                    </div>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 px-6 ${isOpen ? 'max-h-96 pb-[22px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <p className="text-[#878E99] font-medium text-[13px] leading-[1.6]">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Sticky Support Card */}
                

            </div>
        </section>
    );
};
