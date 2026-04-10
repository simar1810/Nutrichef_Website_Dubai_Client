import React from 'react';
import Image from 'next/image';

export const FeaturesSection = () => {
    return (
        <section className="py-24 bg-[#FAFAFA] w-full">
            <div className="max-w-[1400px] mx-auto">
                <div className="px-4 sm:px-6 lg:px-12 w-full">
                    {/* Split Layout */}
                    <div className="flex flex-col lg:flex-row mb-24 md:mb-32">
                        {/* Left Column */}
                        <div className="w-full lg:w-1/2 pr-0 lg:pr-12 xl:pr-32 flex flex-col justify-center max-w-2xl mx-auto lg:mx-0 xl:ml-auto">
                            <h2 className="text-[40px] md:text-[56px] font-extrabold text-[#2F3337] leading-[1.05] tracking-tight mb-16">
                                Total control.<br />Full flexibility.
                            </h2>
                            
                            <div className="flex flex-col space-y-12 pl-2">
                                <p className="text-[16px] md:text-[17px] font-extrabold text-[#878E99]">
                                    Calories and macros that match your goals
                                </p>
                                
                                <p className="text-[16px] md:text-[17px] font-extrabold text-[#878E99]">
                                    Choose what you like. Swap what you don&#39;t.
                                </p>
                                
                                <div className="bg-white p-7 md:p-8 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] w-full lg:max-w-[440px] -ml-2">
                                    <h3 className="text-[16px] md:text-[17px] font-extrabold text-[#2F3337] mb-2">Pause. Skip. Change. Anytime.</h3>
                                    <p className="text-[13px] md:text-[14px] font-bold text-[#878E99] leading-[1.6]">
                                        Life changes and your plan can too. Adjust up to 24 hours before delivery with no hassle.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Column */}
                        <div className="w-full lg:w-1/2 mt-16 lg:mt-0 relative aspect-[4/3] lg:aspect-[1.25/1] overflow-hidden">
                            <Image
                                src="https://api-blog.calo.app/wp-content/uploads/2025/10/imaghe-37.webp" 
                                alt="NutriChef meals bag"
                                fill
                                className="object-cover object-center" 
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* The white prompt overlay */}
                            <div className="absolute top-[35%] left-0 bg-white py-6 md:py-8 px-6 md:px-10 w-[260px] md:w-[320px] shadow-sm">
                                <h4 className="text-[20px] md:text-[24px] font-extrabold text-[#2F3337] leading-[1.2] tracking-tight">
                                    Which days do you<br/>want NutriChef meals?
                                </h4>
                            </div>
                            {/* The pause button overlay */}
                            <div className="absolute bottom-8 left-8 w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer hover:scale-105 transition-transform">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#2F3337]">
                                    <rect x="5" y="3" width="4.5" height="18" rx="1" />
                                    <rect x="14.5" y="3" width="4.5" height="18" rx="1" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};
