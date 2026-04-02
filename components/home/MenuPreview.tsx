"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../Button';

const tabs = ['High Protein', 'Balanced', 'Vegetarian', "Chef's Picks", 'Personalize', 'Low Carb'];

const mockMeals = [
    {
        id: 1,
        title: 'Fiesta Chicken Bowl',
        calories: '450 Cal',
        macros: '35g P | 40g C | 15g F',
        image: 'https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-37.webp&w=2048&q=75'
    },
    {
        id: 2,
        title: 'Mexican Chicken Enchilada',
        calories: '520 Cal',
        macros: '42g P | 38g C | 18g F',
        image: 'https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-7.webp&w=2048&q=75'
    },
    {
        id: 3,
        title: 'Basil Chicken Alfredo',
        calories: '480 Cal',
        macros: '38g P | 45g C | 16g F',
        image: 'https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-9-1.webp&w=2048&q=75'
    },
    {
        id: 4,
        title: 'Beef Stroganoff',
        calories: '550 Cal',
        macros: '45g P | 30g C | 22g F',
        image: 'https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-37.webp&w=2048&q=75' // Fallback
    }
];

export const MenuPreview = () => {
    const [activeTab, setActiveTab] = useState('High Protein');

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h2 className="text-[32px] md:text-[48px] font-bold text-foreground mb-4">
                        Discover our daily-changing menu
                    </h2>
                    <p className="text-lg text-secondary-text mb-8">
                        80+ new meals options every week, you&#39;ll never get bored.
                    </p>

                    <div className="flex justify-center gap-4 flex-wrap mb-8 text-sm font-bold text-foreground">
                        <span className="bg-gray-100 py-2 px-4 rounded-full">NATURAL INGREDIENTS</span>
                        <span className="bg-gray-100 py-2 px-4 rounded-full">ALLERGEN-FRIENDLY</span>
                        <span className="bg-gray-100 py-2 px-4 rounded-full">VEGETARIAN OPTIONS</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar justify-start md:justify-center">
                    <div className="flex space-x-2 border-b-2 border-gray-100 min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-6 font-bold text-lg whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-secondary-text hover:text-foreground'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Carousel/Grid of Meals */}
                <div className="flex overflow-x-auto gap-6 pb-8 snap-x hide-scrollbar">
                    {mockMeals.map((meal) => (
                        <div key={meal.id} className="min-w-[280px] md:min-w-[320px] snap-center group cursor-pointer">
                            <div className="relative h-[240px] w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <Image
                                    src={meal.image}
                                    alt={meal.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{meal.title}</h3>
                            <div className="flex items-center text-sm font-medium text-secondary-text">
                                <span className="bg-gray-100 py-1 px-3 rounded-md mr-2 text-foreground">{meal.calories}</span>
                                <span>{meal.macros}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Button variant="outline" size="lg">See full menu</Button>
                </div>

            </div>
        </section>
    );
};
