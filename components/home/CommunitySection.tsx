import React from 'react';
import Image from 'next/image';

const reviews = [
    {
        name: 'Safa Ebrahim',
        avatar: 'https://i.pravatar.cc/150?u=safa',
        text: "As a busy mom, I've been subscribed to Calo for over a year and a half now, and I can't imagine being without it! I reached my goal weight, but I decided to keep my subscription. I like the meal variety and choices, but most of all, I love the flexibility and the outstanding customer service."
    },
    {
        name: 'Thomas George',
        avatar: 'https://i.pravatar.cc/150?u=thomas',
        text: "Before, I found it hard to eat right even though I exercised regularly. But with CALO, that changed. Their tasty food made dieting easier and more enjoyable. Thanks to CALO, I lost 12kg! They really helped me eat better and get healthier."
    },
    {
        name: 'Ali Alsadeq',
        avatar: 'https://i.pravatar.cc/150?u=ali',
        text: "Over the past three years I've tried several meal plans, and I would say one of the best meal plans I've tried! Food is delicious and I get lots of choosing my meals out of a few options. Highly recommended!"
    },
    {
        name: 'Sara M.',
        avatar: 'https://i.pravatar.cc/150?u=sara',
        text: "Calo is life-changing! The meals are so fresh and flavorful. I never feel like I'm on a diet. It's effortless to stick to my calorie goals and maintain my shape."
    },
    {
        name: 'Michael T.',
        avatar: 'https://i.pravatar.cc/150?u=michael',
        text: "The sheer convenience of having chef-cooked meals tailored to my macros delivered daily is unbeatable. Plus, the eco-friendly packaging is very neat and clean."
    },
    {
        name: 'Nour El-Din',
        avatar: 'https://i.pravatar.cc/150?u=nour',
        text: "Finally, a meal plan that actually tastes good! I've lost 5kg in two months without feeling deprived or hungry. Calo handles everything perfectly."
    },
    {
        name: 'Emily Watson',
        avatar: 'https://i.pravatar.cc/150?u=emily',
        text: "Being a vegetarian, finding good meal prep was hard. Calo's vegetarian options are phenomenal, packed with flavor and plant based protein!"
    },
    {
        name: 'Fahad K.',
        avatar: 'https://i.pravatar.cc/150?u=fahad',
        text: "Customer support is top notch. Skipping a day or swapping meals is so easy on the app. It perfectly adapts to my chaotic work schedule and travel."
    },
    {
        name: 'Linda J.',
        avatar: 'https://i.pravatar.cc/150?u=linda',
        text: "The portions are incredibly accurate regarding macros. As someone serious about fitness, this gives me the absolute peace of mind that I need."
    },
    {
        name: 'Ahmed Y.',
        avatar: 'https://i.pravatar.cc/150?u=ahmed',
        text: "Delicious, fresh, and perfectly balanced. The fact that the menu changes constantly means I never get bored of eating healthy every single week."
    }
];

const ReviewCard = ({ review }: { review: any }) => (
    <div className="bg-white rounded-[24px] p-6 lg:p-8 w-[340px] md:w-[380px] lg:w-[420px] shadow-sm flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-200">
                <Image src={review.avatar} alt={review.name} fill className="object-cover" />
            </div>
            <span className="font-extrabold text-[#2F3337] text-[15px]">{review.name}</span>
        </div>
        <p className="text-[13px] text-[#878E99] font-medium leading-[1.6]">
            {review.text}
        </p>
    </div>
);

export const CommunitySection = () => {
    return (
        <>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 50s linear infinite;
                }
            `}</style>
            
            {/* Top Massive Banner Section */}
            <section className="bg-[#2B9D65] w-full py-24 md:py-36 flex justify-center items-center px-4">
                <h2 className="text-white text-[48px] md:text-[64px] lg:text-[76px] font-black uppercase text-center leading-[1.05] tracking-[-0.02em] shrink-0">
                    Slammed schedule?<br />
                    Personalised meals.<br />
                    Ready to eat.
                </h2>
            </section>

            {/* Bottom Testimonials Section */}
            <section className="bg-[#EFF4F1] w-full pt-20 pb-28 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-10">
                    <p className="text-[#2B9D65] font-extrabold text-[12px] uppercase tracking-wider mb-2">
                        290K happy customers in Worldwide . 19M meals delivered
                    </p>
                    <h2 className="text-[#2F3337] font-extrabold text-[36px] md:text-[44px] tracking-tight">
                        Real results, real stories
                    </h2>
                </div>

                {/* Infinite Marquee Container */}
                <div className="flex w-full overflow-hidden pointer-events-none select-none relative">
                    <div className="flex w-max shrink-0 animate-marquee items-center gap-6 pr-6 pl-4 md:pl-12 lg:pl-12">
                        {reviews.map((r, i) => <ReviewCard key={`first-${i}`} review={r} />)}
                    </div>
                    {/* Exact Duplicate for seamless loop */}
                    <div className="flex w-max shrink-0 animate-marquee items-center gap-6 pr-6">
                        {reviews.map((r, i) => <ReviewCard key={`second-${i}`} review={r} />)}
                    </div>
                </div>
            </section>
        </>
    );
};
