import React from 'react';
import Link from 'next/link';
import { GoogleTranslate } from '@/components/GoogleTranslate';

export const Footer = () => {
    return (
        <footer className="bg-white pt-16 pb-12 w-full border-t border-gray-100 mt-auto">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full flex flex-col">
                
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 w-full mb-[80px]">
                    {/* Left Brand and Links */}
                    <div className="flex flex-col gap-[36px] w-full lg:w-auto">
                        <div>
                            <span className="text-[#249B60] font-black text-[32px] tracking-[0.1em] uppercase">NutriChef</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-8 gap-y-3">
                            <Link href="#" className="text-[#878E99] hover:text-[#249B60] font-semibold text-[13px] tracking-tight">Plans & Packages</Link>
                            <Link href="#" className="text-[#878E99] hover:text-[#249B60] font-semibold text-[13px] tracking-tight">Menu</Link>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <GoogleTranslate />
                        </div>
                    </div>

                    {/* Right Download Card */}
                    <div className="border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-[18px] p-4 pr-10 flex items-center gap-[18px] bg-white self-start">
                        <div className="w-[54px] h-[54px] relative shrink-0">
                            {/* Generic QR Code */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nutrichef.com&color=2F3337" alt="QR Code" className="w-full h-full object-contain rounded-md" />
                        </div>
                        <div className="w-[120px]">
                            <p className="text-[11.5px] font-extrabold text-[#2F3337] leading-[1.35]">
                                Scan the QR code to<br/>download app
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
                    {/* Copyright & Legal */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <span className="text-[11.5px] font-semibold text-[#A0A5AE]">© 2026 NutriChef</span>
                        <div className="flex gap-4">
                            <Link href="#" className="text-[11.5px] font-semibold text-[#A0A5AE] hover:text-[#2F3337] transition-colors">Privacy Policy</Link>
                            <Link href="#" className="text-[11.5px] font-semibold text-[#A0A5AE] hover:text-[#2F3337] transition-colors">Terms & Conditions</Link>
                            <Link href="#" className="text-[11.5px] font-semibold text-[#A0A5AE] hover:text-[#2F3337] transition-colors">Cookies</Link>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-5">
                        <span className="text-[12px] font-extrabold text-[#2F3337]">Follow us</span>
                        <div className="flex items-center gap-4">
                             {/* TikTok */}
                             <a href="#" className="text-[#A0A5AE] hover:text-[#2F3337] transition-colors">
                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                             </a>
                             {/* Instagram */}
                             <a href="#" className="text-[#A0A5AE] hover:text-[#2F3337] transition-colors">
                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                             </a>
                             {/* X (Twitter) */}
                             <a href="#" className="text-[#A0A5AE] hover:text-[#2F3337] transition-colors">
                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.15H22l-6.8 7.76 8 10.5h-6.28l-4.9-6.42-5.6 6.42H3.3l7.24-8.25-7.74-10.16h6.43l4.43 5.86 4.96-5.86h.3zm-1.07 16.4h1.72L7.33 3H5.5L17.83 17.55z"/></svg>
                             </a>
                             {/* LinkedIn */}
                             <a href="#" className="text-[#A0A5AE] hover:text-[#2F3337] transition-colors">
                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                             </a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};
