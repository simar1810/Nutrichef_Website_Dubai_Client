"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../Button';

const tabs = [
    { id: 'All', label: 'All', icon: null },
    { id: 'High Protein', label: 'High Protein', icon: '🍗' },
    { id: 'Balanced', label: 'Balanced', icon: '⚖️' },
    { id: 'Vegetarian', label: 'Vegetarian', icon: '🥦' },
    { id: 'Chef\'s Picks', label: 'Chef\'s Picks', icon: '👨‍🍳' },
    { id: 'Custom Macros', label: 'Custom Macros', icon: '🧮' },
    { id: 'Low Carb', label: 'Low Carb', icon: '🥑' },
];

const mockMeals = [
    {
        id: 1,
        title: 'Fiesta Chicken Bowl',
        calories: '371',
        protein: 35,
        carbs: 34,
        fat: 10,
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-37.webp'
    },
    {
        id: 2,
        title: 'Mexican Chicken Enchilada',
        calories: '639',
        protein: 37,
        carbs: 58,
        fat: 29,
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-7.webp'
    },
    {
        id: 3,
        title: 'Basil Chicken Alfredo Linguine',
        calories: '641',
        protein: 64,
        carbs: 64,
        fat: 14,
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-9-1.webp'
    },
    {
        id: 4,
        title: 'Koshari',
        calories: '360',
        protein: 13,
        carbs: 65,
        fat: 5,
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-37.webp'
    },
    {
        id: 5,
        title: 'Steak & Mash',
        calories: null,
        customText: 'Customisable macros',
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-9-1.webp'
    },
    {
        id: 6,
        title: 'Beef and Parm Cannelloni',
        calories: '462',
        protein: 33,
        carbs: 23,
        fat: 27,
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-7.webp'
    },
    {
        id: 7,
        title: 'Fettucine al...',
        calories: '351',
        protein: 25,
        carbs: 40,
        fat: 12,
        image: 'https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-37.webp'
    }
];

export const MenuPreview = () => {
    const [activeTab, setActiveTab] = useState('All');

    return (
        <section className="py-24 bg-white overflow-hidden w-full">
            <div className="w-full flex flex-col items-center">
                
                {/* Header Section */}
                <div className="text-center px-4 max-w-3xl mx-auto mb-6">
                    <h2 className="text-[40px] md:text-[56px] leading-[1.1] font-extrabold text-[#2F3337] tracking-tight mb-4">
                        Discover our<br />daily-changing menu
                    </h2>
                    <p className="text-[17px] text-[#6B7280] font-medium mb-10">
                        80+ new meals options every week, you&#39;ll never get bored.
                    </p>

                    <div className="flex justify-center gap-6 md:gap-8 flex-wrap mb-10 text-[11px] uppercase tracking-wider font-bold text-[#6B7280]">
                        <div className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B7280]">
                                <path d="M12 22c-3.1-6-5.4-9.3-8.8-13A6.2 6.2 0 0 1 12 2C15.4 5.7 17.7 9 14.6 15z" />
                                <path d="M12 2C8.6 5.7 6.3 9 9.4 15c3.1 6 5.4 9.3 8.8 13" />
                            </svg>
                            <span>NATURAL INGREDIENTS</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B7280]">
                                <path d="M12 2v20" />
                                <path d="m17 7-5 5" />
                                <path d="m7 7 5 5" />
                                <path d="m20 12-8 5" />
                                <path d="m4 12 8 5" />
                            </svg>
                            <span>ALLERGEN-FRIENDLY</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B7280]">
                                <path d="m2 22 6-6 m-3-3 6 6 m-3-3c2-2 5-2 7 0s2 5 0 7Z" />
                            </svg>
                            <span>VEGETARIAN OPTIONS</span>
                        </div>
                    </div>
                    
                    <Button className="bg-[#249B60] hover:bg-[#1E8351] text-white px-8 rounded-full mb-10 h-11 text-[15px] shadow-sm font-semibold border-none" size="md">
                        See full menu
                    </Button>
                </div>

                {/* Cards Section */}
                <div className="w-full">
                    {/* Centered container but scrollable all the way to edges */}
                    <div className="flex overflow-x-auto gap-4 md:gap-[18px] pb-10 snap-x hide-scrollbar px-6 md:px-12 xl:justify-center w-full max-w-[100vw]">
                        {mockMeals.map((meal) => (
                            <div key={meal.id} className="min-w-[260px] md:min-w-[280px] w-[260px] md:w-[280px] snap-center group cursor-pointer text-left flex flex-col pt-2">
                                <div className="relative h-[260px] md:h-[280px] w-full rounded-[28px] overflow-hidden mb-[14px] bg-[#F7F7F8]">
                                    <Image
                                        src={meal.image}
                                        alt={meal.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        sizes="(max-width: 768px) 260px, 280px"
                                    />
                                    {meal.calories && (
                                        <div className="absolute top-[14px] left-[14px] bg-[#F7F7F8]/90 backdrop-blur-sm px-[10px] py-[4px] rounded-full text-[11px] font-bold text-[#2F3337] tracking-tight">
                                            {meal.calories} kcal
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-[15px] sm:text-[16px] leading-tight font-extrabold text-[#2F3337] mb-[8px] line-clamp-1">{meal.title}</h3>
                                
                                {meal.customText ? (
                                    <div className="flex items-center gap-[6px] text-[11px] font-bold text-[#6B7280]">
                                        <div className="flex space-x-[2px]">
                                            <div className="w-[5px] h-[5px] rounded-full bg-[#8b5cf6]"></div>
                                            <div className="w-[5px] h-[5px] rounded-full bg-[#f59e0b]"></div>
                                            <div className="w-[5px] h-[5px] rounded-full bg-[#3b82f6]"></div>
                                        </div>
                                        <span>{meal.customText}</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap items-center gap-[10px] text-[11px] font-bold text-[#6B7280]">
                                        <div className="flex items-center gap-[4px]">
                                            <div className="w-[5px] h-[5px] rounded-full bg-[#8b5cf6]"></div>
                                            <span>{meal.protein}g Protein</span>
                                        </div>
                                        <div className="flex items-center gap-[4px]">
                                            <div className="w-[5px] h-[5px] rounded-full bg-[#f59e0b]"></div>
                                            <span>{meal.carbs}g Carbs</span>
                                        </div>
                                        <div className="flex items-center gap-[4px]">
                                            <div className="w-[5px] h-[5px] rounded-full bg-[#3b82f6]"></div>
                                            <span>{meal.fat}g Fat</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Tabs */}
                <div className="flex overflow-x-auto gap-[10px] pb-4 hide-scrollbar justify-start xl:justify-center px-6 w-full max-w-[100vw] mt-6">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center h-[42px] px-[20px] rounded-full text-[13px] font-bold whitespace-nowrap transition-colors ${
                                    isActive
                                        ? 'bg-[#1a4a38] text-white shadow-sm'
                                        : 'bg-[#F9FAFB] text-[#2F3337] hover:bg-[#E5E7EB]'
                                }`}
                            >
                                {tab.icon && <span className="mr-[6px] text-[16px]">{tab.icon}</span>}
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

            </div>
        </section>
    );
};

