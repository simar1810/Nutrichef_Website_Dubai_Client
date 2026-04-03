"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { MenuOverlay } from './MenuOverlay';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="absolute top-0 w-full z-40">
                <div className="w-full px-6 lg:px-12 mt-[40px]">
                    <div className="flex justify-between items-center  rounded-full px-8 py-3.5  h-[64px] max-w-[1400px] mx-auto ">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-[#249B60] font-black text-[22px] tracking-[0.1em] uppercase leading-none mt-1">
                                CALO
                            </Link>
                        </div>

                        {/* Hamburger */}
                        <div className="flex items-center space-x-6">
                            <button 
                                onClick={() => setIsMenuOpen(true)}
                                className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white hover:bg-gray-50 transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F3337" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};
