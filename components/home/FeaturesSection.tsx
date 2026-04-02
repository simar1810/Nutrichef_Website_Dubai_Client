import React from 'react';


const features = [
    {
        title: 'Total Control',
        description: 'Pause, cancel or change your plan at any time. Address change? No problem. Complete flexibility at your fingertips.',
        iconPath: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' // Generic credit card/control icon
    },
    {
        title: 'Chef Crafted',
        description: 'We don&#39;t believe in boring diet food. Our rotating menu is designed by chefs and cooked fresh using high quality ingredients.',
        iconPath: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' // Generic chef/adjust icon
    },
    {
        title: 'Daily Fresh Deliveries',
        description: 'Your meals are prepared fresh and delivered safely to your door or office every morning in temperature-controlled bags.',
        iconPath: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' // Generic delivery box
    },
    {
        title: 'Eco-friendly Packaging',
        description: 'Eat your meals with peace of mind. Our containers are made of bagasse, a compostable byproduct of sugar cane.',
        iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' // Generic eco earth icon
    }
];

export const FeaturesSection = () => {
    return (
        <section className="py-24 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[48px] font-bold text-foreground mb-4">
                        Total control. Full flexibility.
                    </h2>
                    <p className="text-2xl font-bold text-primary mb-2">
                        Calories and macros that match your goals
                    </p>
                    <div className="text-xl font-bold text-foreground flex justify-center gap-4 flex-wrap mt-6">
                        <span className="flex items-center"><span className="text-primary mr-2">✓</span>Choose what you like.</span>
                        <span className="flex items-center"><span className="text-primary mr-2">✓</span>Swap what you don&apos;t.</span>
                        <span className="flex items-center"><span className="text-primary mr-2">✓</span>Pause. Skip. Change.</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-[#FDFDFD] rounded-full flex items-center justify-center mb-6 text-primary shadow-sm">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.iconPath} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                            <p className="text-secondary-text leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
