import React from 'react';
import Image from 'next/image';
import { Button } from '../Button';

export const HeroSection = () => {
    return (
        <section className="relative w-full h-[100vh] min-h-[700px] flex mx-auto bg-[#F4F5F7] overflow-hidden">

            {/* Left Content (50%) */}
            <div className="w-full lg:w-1/2 flex items-center h-full relative z-10 pl-6 lg:pl-[10%]">
                <div className="max-w-[600px] w-full pt-16">
                    <h1 className="text-[52px] md:text-[80px] leading-[1.1] font-bold text-[#343B42] tracking-tight mb-6 mt-12 md:mt-24">
                        Healthy Meals <br />
                        To Gain Muscle
                    </h1>
                    <p className="text-[18px] md:text-[20px] text-gray-500 mb-10 max-w-md leading-relaxed">
                        Designed by nutritionists, crafted by chefs, personalized to your goals. Fresh daily. Just heat and eat.
                    </p>

                    <Button size="lg" className="w-[180px] h-[56px] text-[18px] mb-8 font-semibold shadow-[0_8px_16px_rgba(36,161,112,0.3)] hover:-translate-y-1 transition-transform">
                        See plans
                    </Button>

                    {/* Sticky Stats Bottom Left */}
                    <div className="absolute bottom-12 left-6 lg:left-[10%] flex items-center space-x-2 text-[15px] font-bold text-primary">
                        <span>290K happy customers in Worldwide</span>
                        <span className="text-primary">•</span>
                        <span>19M meals delivered</span>
                        <div className="ml-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Background Image (50% bleed) */}
            <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block z-0">
                <Image
                    src="https://calo.app/_next/image?url=https%3A%2F%2Fcdncaloapp.com%2F28e125562515cd84cda748118c399f96ec409f93.webp&w=2048&q=75"
                    alt="Calo freshly prepared meal"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Subtle shadow overlay to mimic depth */}
                <div className="absolute inset-0 bg-black/5 opacity-50 mix-blend-multiply"></div>
            </div>

        </section>
    );
};
