"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';

const navLinks = [
    { name: 'Homepage', href: '/', hasChild: false },
    { name: 'Plans & Packages', href: '/plans', hasChild: false },
    { name: 'Menu', href: '/menu', hasChild: false },
];

export const MenuOverlay = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <div 
            className={`fixed inset-0 z-[100] flex transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="w-full h-full bg-white flex flex-col lg:flex-row">
                
                {/* LEFT SIDE (Hidden on mobile) */}
                <div className="hidden lg:flex lg:w-[60%] xl:w-[65%] h-full relative flex-col border-r border-gray-100/50 shadow-xl z-10">
                    {/* The large image taking remaining space above the green bar */}
                    <div className="flex-1 relative overflow-hidden bg-[#F6F4F1]">
                        {/* Generic Unsplash Image imitating the two users in the screenshot */}
                        <Image 
                            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop" 
                            alt="People eating" 
                            fill 
                            className="object-cover object-center" 
                            unoptimized
                        />
                        {/* NutriChef logo overlay */}
                        <div className="absolute top-[42px] left-12">
                            <span className="text-white font-black text-[32px] tracking-[0.12em] uppercase drop-shadow-md">NUTRICHEF</span>
                        </div>
                    </div>
                    
                    {/* Green Footer bar */}
                    <div className="bg-[#2B9D65] h-[160px] relative px-12 py-8 flex flex-col justify-end shrink-0">
                        {/* Float Join Us badge */}
                        <div className="absolute top-[-18px] left-12 bg-[#2B9D65] text-white pl-3.5 pr-4 py-2 rounded-full flex items-center gap-1.5 text-[12px] font-extrabold shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-bl-none z-10">
                           <span className="text-[14px]">✨</span> Join us
                        </div>
                        
                        <div className="flex justify-between items-center w-full pb-2">
                           <h2 className="text-white text-[28px] font-bold tracking-tight">Download app</h2>
                           <div className="flex gap-4">
                               {/* App Store Mock */}
                               <div className="border border-white/40 rounded-xl px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm2.7 13.9c-.8 0-1.8-.4-2.5-.4s-1.8.4-2.6.4c-1.2 0-2.3-1.1-3-2.1-1.3-1.9-1.3-5 .1-6.9.7-1 1.7-1.5 2.8-1.5 1 0 1.9.5 2.5.5s1.6-.6 2.7-.6c1.1 0 2.2.6 2.7 1.6-2.2 1.3-1.8 4.2.5 5.3-.6 1.4-1.6 3.1-3.2 3.7zM14.9 6c-.2 1.3-1.1 2.3-2.3 2.5-.2-1.3.9-2.5 2.1-2.9.1.1.2 0 .2.4z"/></svg>
                                   <div className="flex flex-col items-start translate-y-[-2px]">
                                       <span className="text-[9px] text-white font-medium">Download on the</span>
                                       <span className="text-[16px] text-white font-bold leading-none mt-1">App Store</span>
                                   </div>
                               </div>
                               {/* Play Store Mock */}
                               <div className="border border-white/40 rounded-xl px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M3.6 20.4L18.8 12 3.6 3.6v16.8z" fillOpacity=".8"/><path d="M18.8 12L3.6 20.4 12 12l-8.4-8.4L18.8 12z" fillOpacity=".5"/></svg>
                                   <div className="flex flex-col items-start translate-y-[-2px]">
                                       <span className="text-[9px] text-white font-medium">GET IT ON</span>
                                       <span className="text-[16px] text-white font-bold leading-none mt-1">Google Play</span>
                                   </div>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:w-[40%] xl:w-[35%] h-full bg-white relative flex flex-col pt-[84px] px-12 lg:px-14 pb-[42px] overflow-y-auto">
                    
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="fixed top-12 right-12 text-[#2F3337] hover:bg-gray-100 p-2 rounded-full transition-colors z-[110]"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    {/* Links List */}
                    <div className="flex flex-col gap-[28px] mt-2">
                        {navLinks.map((link, idx) => (
                            <Link key={idx} href={link.href} onClick={onClose} className="flex items-center text-[#2F3337] hover:text-[#2B9D65] transition-colors group">
                                <span className="text-[14px] font-[800] tracking-tight">{link.name}</span>
                                {link.hasChild && (
                                    <svg className="ml-2 w-3.5 h-3.5 text-[#2F3337] group-hover:text-[#2B9D65] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Bottom Area */}
                    <div className="mt-auto pt-16 flex justify-end self-end">
                       <button className="flex items-center gap-2 text-[#2F3337] hover:opacity-70 transition-opacity">
                           <span className="text-[12px] font-[800]">Language / اللغة</span>
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                       </button>
                    </div>

                </div>

            </div>
        </div>,
        document.body
    );
};
