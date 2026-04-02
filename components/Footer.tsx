import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-[#2B3137] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-1 lg:col-span-1">
                        <Image
                            src="https://calo.app/_next/static/media/logo.svg"
                            alt="Calo Logo"
                            width={100}
                            height={40}
                            className="mb-6 brightness-0 invert"
                        />
                        <p className="text-gray-400 text-sm mb-6 max-w-xs">
                            Calo provides meal plans tailored for busy people. It serves delicious food that&#39;s portioned to your requirements and fitness goals.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Icons Placeholders */}
                            {['TikTok', 'Insta', 'X', 'In'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                    <span className="text-xs">{social}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Plans & Packages</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Menu</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">The Cafe</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6">Help</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Download Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Download the App</h3>
                        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black text-xs font-bold text-center">
                                QR<br />Code
                            </div>
                            <p className="text-sm text-gray-300">Scan to download the Calo app</p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Calo Inc. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
