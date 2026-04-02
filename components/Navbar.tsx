import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav className="absolute top-0 w-full z-50">
            <div className="w-full px-6 lg:px-12">
                <div className="flex justify-between items-center h-28">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-primary font-bold text-3xl tracking-widest uppercase">
                            CALO
                        </Link>
                    </div>

                    {/* Desktop Right Actions (Hamburger only) */}
                    <div className="flex items-center space-x-6">
                        <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
                            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
