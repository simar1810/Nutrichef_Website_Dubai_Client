"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { Button } from '../Button';

const plans = [
    {
        id: 'high-protein',
        title: 'High Protein',
        icon: '🍗',
        macros: { protein: 50, carbs: 40, fat: 10 },
        labels: { p: '50% Protein', c: '40% Carbs', f: '10% Fat' },
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-37.webp'
    },
    {
        id: 'balanced',
        title: 'Balanced',
        icon: '⚖️',
        macros: { protein: 35, carbs: 55, fat: 10 },
        labels: { p: '35% Protein', c: '55% Carbs', f: '10% Fat' },
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-7.webp'
    },
    {
        id: 'vegetarian',
        title: 'Vegetarian',
        icon: '🥦',
        macros: { protein: 25, carbs: 55, fat: 20 },
        labels: { p: '25% Protein', c: '55% Carbs', f: '20% Fat' },
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-9-1.webp'
    },
    {
        id: 'chefs-picks',
        title: 'Chef\'s Picks',
        icon: '👨‍🍳',
        macros: { protein: 35, carbs: 55, fat: 10 },
        labels: { p: '35% Protein', c: '55% Carbs', f: '10% Fat' },
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-37.webp'
    },
    {
        id: 'custom',
        title: 'Custom Macros',
        icon: '🧮',
        macros: { protein: 45, carbs: 35, fat: 20 },
        labels: { p: '52g Protein', c: '38g Carbs', f: '29g Fat' },
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-7.webp'
    },
    {
        id: 'low-carb',
        title: 'Low Carb',
        icon: '🥑',
        macros: { protein: 35, carbs: 15, fat: 50 },
        labels: { p: '35% Protein', c: '15% Carbs', f: '50% Fat' },
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-9-1.webp'
    }
];

export const MealPlansSection = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -360 : 360;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-white overflow-hidden w-full">
            {/* Header Area */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full mb-10 lg:mb-12">
                <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#2F3337] mb-2 tracking-tight">
                    Find your perfect meal plan
                </h2>
                <p className="text-[#878E99] font-bold text-[15px] mb-8">
                    Starting at KWD 2.5/meal and KWD 1.5/breakfast
                </p>
                
                <div className="flex justify-between items-center w-full">
                    <Button className="bg-[#249B60] hover:bg-[#1E8351] text-white px-8 rounded-full h-[46px] text-[15px] shadow-sm font-bold border-none">
                        See plans
                    </Button>
                    
                    <div className="flex gap-3 hidden md:flex">
                        {/* Left Arrow */}
                        <button 
                            onClick={() => scroll('left')}
                            className="w-[44px] h-[44px] rounded-full bg-[#EFF8F3] hover:bg-[#DDF0E6] flex items-center justify-center text-[#249B60] transition-colors"
                            aria-label="Scroll left"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        {/* Right Arrow */}
                        <button 
                            onClick={() => scroll('right')}
                            className="w-[44px] h-[44px] rounded-full bg-[#EFF8F3] hover:bg-[#DDF0E6] flex items-center justify-center text-[#249B60] transition-colors"
                            aria-label="Scroll right"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel Area - Full Bleed */}
            <div className="w-full">
                <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none; /* IE and Edge */
                        scrollbar-width: none; /* Firefox */
                    }
                `}</style>
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-[18px] md:gap-[24px] overflow-x-auto no-scrollbar pb-8 snap-x pl-4 sm:pl-6 lg:pl-12 2xl:pl-[calc((100vw-1400px)/2+48px)] pr-4 sm:pr-6 lg:pr-12"
                >
                    {plans.map((plan) => (
                        <div key={plan.id} className="min-w-[280px] md:min-w-[320px] lg:min-w-[340px] snap-start relative rounded-[28px] overflow-hidden aspect-[4/4.5] md:aspect-[4/5] bg-[#F7F7F8] flex-shrink-0 group cursor-pointer shadow-sm">
                            <Image
                                src={plan.image}
                                alt={plan.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 340px"
                            />
                            
                            {/* White Overlay Card */}
                            <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 bg-white/95 backdrop-blur-sm rounded-[24px] p-[14px] md:p-4 flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                                <div className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] shrink-0 bg-[#F7F7F8] rounded-full flex items-center justify-center text-[20px] md:text-[22px] shadow-sm mr-3 md:mr-4 border border-gray-100/50">
                                    {plan.icon}
                                </div>
                                <div className="flex-1 w-full overflow-hidden">
                                    <h3 className="text-[#2F3337] font-extrabold text-[13px] md:text-[14px] mb-[6px] truncate">{plan.title}</h3>
                                    
                                    {/* Bar Chart Segment */}
                                    <div className="flex w-full h-[5px] rounded-full overflow-hidden mb-[6px] gap-[2px] bg-gray-100">
                                        <div style={{width: `${plan.macros.protein}%`}} className="h-full bg-[#8b5cf6]"></div>
                                        <div style={{width: `${plan.macros.carbs}%`}} className="h-full bg-[#f59e0b]"></div>
                                        <div style={{width: `${plan.macros.fat}%`}} className="h-full bg-[#60a5fa]"></div>
                                    </div>
                                    
                                    {/* Legend Segment */}
                                    <div className="flex justify-between w-full text-[8.5px] md:text-[9.5px] font-bold text-[#878E99]">
                                        <span>{plan.labels.p}</span>
                                        <span>{plan.labels.c}</span>
                                        <span>{plan.labels.f}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
