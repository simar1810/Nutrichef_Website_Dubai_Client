import React from 'react';
import Image from 'next/image';

const communityPosts = [
    { id: 1, handle: '@sultanfalasi', img: 'https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2FRectangle-6495.webp&w=1200&q=100' },
    { id: 2, handle: '@khadija.chahmoud', img: 'https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2FRectangle-6496.webp&w=1200&q=100' },
    { id: 3, handle: '@laurazaraa', img: 'https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-37.webp&w=1200&q=100' },
    { id: 4, handle: '@s_mozakzak', img: 'https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-7.webp&w=1200&q=100' },
];

export const CommunitySection = () => {
    return (
        <section className="py-24 bg-[#F8F9FA] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[48px] font-bold text-foreground mb-4">
                        From The Community
                    </h2>
                    <p className="text-secondary-text text-lg">
                        Real results, real stories
                    </p>
                </div>

                <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x justify-start md:justify-center">
                    {communityPosts.map((post) => (
                        <div key={post.id} className="min-w-[280px] md:min-w-[300px] snap-center group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-[400px]">
                            <Image
                                src={post.img}
                                alt={`Community post by ${post.handle}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-6 left-6 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                                {post.handle}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
