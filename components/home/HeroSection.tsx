"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../Button';

const MENU_SECTION_ID = 'menu-preview';

function scrollToMenuSection() {
    document.getElementById(MENU_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const HERO_IMAGE = "https://cdncaloapp.com/28e125562515cd84cda748118c399f96ec409f93.webp";

export const HeroSection = () => {
    const router = useRouter();
    return (
        <section className="relative w-full min-h-[100svh] flex flex-col lg:block bg-[#F4F5F7] overflow-hidden">

            {/* Copy — full width on mobile; left half on desktop */}
            <div className="w-full lg:w-1/2 lg:absolute lg:left-0 lg:top-0 lg:h-full flex items-center relative z-10 px-6 lg:pl-[10%] lg:pr-8">
                <div className="max-w-[600px] w-full pt-20 sm:pt-24 lg:pt-16 pb-4 lg:pb-0">
                    <h1 className="text-[2.5rem] sm:text-[52px] md:text-[80px] leading-[1.1] font-bold text-[#343B42] tracking-tight mb-6 mt-4 sm:mt-12 md:mt-24">
                        Healthy Meals <br />
                        To Gain Muscle
                    </h1>
                    <p className="text-[17px] md:text-[20px] text-gray-500 mb-10 max-w-md leading-relaxed">
                        Designed by nutritionists, crafted by chefs, personalized to your goals. Fresh daily. Just heat and eat.
                    </p>

                    <Button
                        type="button"
                        size="lg"
                        onClick={() => router.push('/plans')}
                        className="w-full max-w-[180px] h-[56px] text-[18px] mb-6 sm:mb-8 font-semibold shadow-[0_8px_16px_rgba(36,161,112,0.3)] hover:-translate-y-1 transition-transform"
                    >
                        See plans
                    </Button>

                    <div className="relative lg:top-12 mt-2 lg:mt-0 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center text-[13px] sm:text-[15px] font-bold text-primary">
                        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 min-w-0">
                            <span className="break-words">290K happy customers in Worldwide</span>
                            <span className="text-primary hidden sm:inline">•</span>
                            <span className="break-words">19M meals delivered</span>
                        </div>
                        <button
                            type="button"
                            onClick={scrollToMenuSection}
                            aria-label="Scroll to menu"
                            className="shrink-0 w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:ml-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile hero image */}
            <div className="relative w-full aspect-[5/4] max-h-[min(42vh,320px)] min-h-[200px] lg:hidden shrink-0 mt-2">
                <Image
                    src={HERO_IMAGE}
                    alt="NutriChef freshly prepared meal"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-black/5 opacity-50 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Desktop hero image */}
            <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block z-0">
                <Image
                    src={HERO_IMAGE}
                    alt="NutriChef freshly prepared meal"
                    fill
                    className="object-cover object-center"
                    sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/5 opacity-50 mix-blend-multiply pointer-events-none" />
            </div>

        </section>
    );
};
