"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MenuOverlay } from './MenuOverlay';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, isAuthenticated, logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const initials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "U";

    return (
        <>
            <nav className="absolute top-0 w-full z-40">
                <div className="w-full px-6 lg:px-12 mt-[40px]">
                    <div className="flex justify-between items-center  rounded-full px-8 py-3.5  h-[64px] max-w-[1400px] mx-auto ">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-[#249B60] font-black text-[22px] tracking-[0.1em] uppercase leading-none mt-1">
                                NUTRICHEF
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center gap-2 bg-[#249B60] text-white px-3 py-1.5 rounded-full hover:bg-[#1E8351] transition-colors"
                                    >
                                        <div className="w-[28px] h-[28px] rounded-full bg-white/20 flex items-center justify-center text-[12px] font-extrabold">
                                            {initials}
                                        </div>
                                        <span className="text-[13px] font-bold hidden sm:inline max-w-[100px] truncate">
                                            {user?.name || "Account"}
                                        </span>
                                        <svg
                                            className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-[200px] bg-white rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-[13px] font-extrabold text-[#2F3337] truncate">
                                                    {user?.name || "User"}
                                                </p>
                                                <p className="text-[11px] text-[#878E99] font-medium truncate">
                                                    {user?.email || (user?.phone ? `+${user.countryCode} ${user.phone}` : "")}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    className="bg-[#249B60] hover:bg-[#1E8351] text-white px-5 py-2 rounded-full text-[13px] font-extrabold transition-colors shadow-sm"
                                >
                                    Sign Up
                                </Link>
                            )}

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
