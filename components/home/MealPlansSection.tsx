"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../Button';
import { api } from '@/lib/api';
import { useTenant } from '@/contexts/TenantContext';
import { formatMajorUnits } from '@/lib/formatCurrency';

const GOAL_EMOJIS: Record<string, string> = {
    balanced: '⚖️',
    'high-protein': '🍗',
    'high protein': '🍗',
    'low-carb': '🥑',
    'low carb': '🥑',
    vegetarian: '🥦',
    vegan: '🥦',
    "chef's picks": '👨‍🍳',
    chefs_picks: '👨‍🍳',
    custom: '🧮',
    'custom macros': '🧮',
    keto: '🥑',
};

interface ApiTemplate {
    _id: string;
    title: string;
    goalType?: string;
    dietType?: string;
    structure: Record<string, unknown>;
    /** Set by API when a meal-plan cover image is uploaded */
    coverImageUrl?: string;
}

interface PlanCard {
    id: string;
    title: string;
    icon: string;
    image: string | null;
    macros: { protein: number; carbs: number; fat: number };
    labels: { p: string; c: string; f: string };
    useGramLabels: boolean;
}

function iconForTemplate(t: Pick<ApiTemplate, 'title' | 'goalType' | 'dietType'>): string {
    const keys = [t.dietType, t.goalType, t.title].filter(Boolean).map((k) => String(k).toLowerCase());
    for (const k of keys) {
        if (GOAL_EMOJIS[k]) return GOAL_EMOJIS[k];
    }
    for (const k of keys) {
        for (const [pattern, emoji] of Object.entries(GOAL_EMOJIS)) {
            if (k.includes(pattern)) return emoji;
        }
    }
    return '🍽️';
}

function extractImage(structure: Record<string, unknown>): string | null {
    if (typeof structure.coverImage === 'string') return structure.coverImage;
    if (typeof structure.heroImage === 'string') return structure.heroImage;
    if (Array.isArray(structure.media) && typeof structure.media[0] === 'string') {
        return structure.media[0];
    }
    return null;
}

function resolveTemplateImage(t: ApiTemplate): string | null {
    const url = t.coverImageUrl?.trim();
    if (url) return url;
    return extractImage(t.structure ?? {});
}

/** Aggregate protein/carbs/fat grams from meal rows that include inline macros. */
function sumInlineMealMacros(structure: Record<string, unknown>): {
    p: number;
    c: number;
    f: number;
} | null {
    const n = structure.nutrition as { protein?: number; carbs?: number; fat?: number } | undefined;
    if (n && (n.protein != null || n.carbs != null || n.fat != null)) {
        const p = n.protein ?? 0;
        const c = n.carbs ?? 0;
        const f = n.fat ?? 0;
        if (p + c + f <= 0) return null;
        return { p, c, f };
    }

    const days = (structure.days as Array<{ meals?: Array<Record<string, unknown>> }>) ?? [];
    let p = 0;
    let c = 0;
    let f = 0;
    for (const day of days) {
        for (const meal of day.meals ?? []) {
            const mult = typeof meal.portion === 'number' ? meal.portion : 1;
            const mp = Number(meal.protein ?? 0) * mult;
            const mc = Number(meal.carbs ?? 0) * mult;
            const mf = Number(meal.fat ?? 0) * mult;
            if (mp === 0 && mc === 0 && mf === 0) continue;
            p += mp;
            c += mc;
            f += mf;
        }
    }
    if (p + c + f <= 0) return null;
    return { p, c, f };
}

function gramsToDisplay(g: { p: number; c: number; f: number }): {
    macros: { protein: number; carbs: number; fat: number };
    labels: { p: string; c: string; f: string };
    useGramLabels: boolean;
} {
    const total = g.p + g.c + g.f;
    const maxG = Math.max(g.p, g.c, g.f);
    const useGramLabels = maxG >= 35;

    if (useGramLabels) {
        return {
            macros: {
                protein: Math.min(100, Math.round((g.p / total) * 100)),
                carbs: Math.min(100, Math.round((g.c / total) * 100)),
                fat: Math.min(100, Math.round((g.f / total) * 100)),
            },
            labels: {
                p: `${Math.round(g.p)}g Protein`,
                c: `${Math.round(g.c)}g Carbs`,
                f: `${Math.round(g.f)}g Fat`,
            },
            useGramLabels: true,
        };
    }

    const pp = Math.round((g.p / total) * 100);
    const pc = Math.round((g.c / total) * 100);
    let pf = Math.round((g.f / total) * 100);
    const drift = 100 - (pp + pc + pf);
    if (drift !== 0) {
        pf += drift;
    }

    return {
        macros: { protein: pp, carbs: pc, fat: pf },
        labels: {
            p: `${pp}% Protein`,
            c: `${pc}% Carbs`,
            f: `${pf}% Fat`,
        },
        useGramLabels: false,
    };
}

function templateToCard(t: ApiTemplate): PlanCard {
    const struct = t.structure ?? {};
    const grams = sumInlineMealMacros(struct);
    const image = resolveTemplateImage(t);

    if (!grams) {
        return {
            id: t._id,
            title: t.title,
            icon: iconForTemplate(t),
            image,
            macros: { protein: 34, carbs: 33, fat: 33 },
            labels: { p: '—', c: '—', f: '—' },
            useGramLabels: false,
        };
    }

    const { macros, labels, useGramLabels } = gramsToDisplay(grams);
    return {
        id: t._id,
        title: t.title,
        icon: iconForTemplate(t),
        image,
        macros,
        labels,
        useGramLabels,
    };
}

export const MealPlansSection = () => {
    const router = useRouter();
    const { currency } = useTenant();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [plans, setPlans] = useState<PlanCard[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTemplates = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get<{ templates: ApiTemplate[] }>('/menu/list?type=templates', {
                noAuth: true,
            });
            const list = res.data?.templates ?? [];
            setPlans(list.map((t) => templateToCard(t)));
        } catch {
            setPlans([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchTemplates();
    }, [fetchTemplates]);

    const hasPlans = plans.length > 0;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -360 : 360;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-white overflow-hidden w-full">
            {/* Header Area */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full mb-10 lg:mb-12">
                <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#2F3337] mb-2 tracking-tight">
                    Find your perfect meal plan
                </h2>
                <p className="text-[#878E99] font-bold text-[15px] mb-8">
                    Starting at {formatMajorUnits(2.5, currency, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                    /meal and {formatMajorUnits(1.5, currency, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                    /breakfast
                </p>
                
                <div className="flex justify-between items-center w-full">
                    <Button
                        type="button"
                        onClick={() => router.push('/plans')}
                        className="bg-[#249B60] hover:bg-[#1E8351] text-white px-8 rounded-full h-[46px] text-[15px] shadow-sm font-bold border-none"
                    >
                        See plans
                    </Button>
                    
                    <div className="flex gap-3 hidden md:flex">
                        <button 
                            onClick={() => scroll('left')}
                            className="w-[44px] h-[44px] rounded-full bg-[#EFF8F3] hover:bg-[#DDF0E6] flex items-center justify-center text-[#249B60] transition-colors"
                            aria-label="Scroll left"
                            type="button"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            className="w-[44px] h-[44px] rounded-full bg-[#EFF8F3] hover:bg-[#DDF0E6] flex items-center justify-center text-[#249B60] transition-colors"
                            aria-label="Scroll right"
                            type="button"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel Area - Full Bleed */}
            <div className="w-full">
                <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
                {loading ? (
                    <div className="flex gap-[18px] md:gap-[24px] overflow-hidden pl-4 sm:pl-6 lg:pl-12 pr-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="min-w-[280px] md:min-w-[320px] lg:min-w-[340px] h-[360px] rounded-[28px] bg-[#E5E7EB] animate-pulse shrink-0"
                            />
                        ))}
                    </div>
                ) : !hasPlans ? (
                    <p className="text-center text-[15px] text-[#878E99] font-medium px-6 pb-8">
                        No meal plan templates yet.
                    </p>
                ) : (
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-[18px] md:gap-[24px] overflow-x-auto no-scrollbar pb-8 snap-x pl-4 sm:pl-6 lg:pl-12 2xl:pl-[calc((100vw-1400px)/2+48px)] pr-4 sm:pr-6 lg:pr-12"
                >
                    {plans.map((plan) => (
                        <div key={plan.id} className="min-w-[280px] md:min-w-[320px] lg:min-w-[340px] snap-start relative rounded-[28px] overflow-hidden aspect-[4/4.5] md:aspect-[4/5] bg-[#F7F7F8] flex-shrink-0 group cursor-pointer shadow-sm">
                            {plan.image ? (
                            <Image
                                src={plan.image}
                                alt={plan.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 340px"
                            />
                            ) : (
                            <div
                                className="absolute inset-0 bg-[#ECEFF1]"
                                aria-hidden
                            />
                            )}
                            
                            <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 bg-white/95 backdrop-blur-sm rounded-[24px] p-[14px] md:p-4 flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                                <div className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] shrink-0 bg-[#F7F7F8] rounded-full flex items-center justify-center text-[20px] md:text-[22px] shadow-sm mr-3 md:mr-4 border border-gray-100/50">
                                    {plan.icon}
                                </div>
                                <div className="flex-1 w-full overflow-hidden">
                                    <h3 className="text-[#2F3337] font-extrabold text-[13px] md:text-[14px] mb-[6px] truncate">{plan.title}</h3>
                                    
                                    <div className="flex w-full h-[5px] rounded-full overflow-hidden mb-[6px] gap-[2px] bg-gray-100">
                                        <div style={{ width: `${plan.macros.protein}%` }} className="h-full bg-[#8b5cf6]" />
                                        <div style={{ width: `${plan.macros.carbs}%` }} className="h-full bg-[#f59e0b]" />
                                        <div style={{ width: `${plan.macros.fat}%` }} className="h-full bg-[#60a5fa]" />
                                    </div>
                                    
                                    <div
                                        className={`flex w-full text-[8.5px] md:text-[9.5px] font-bold text-[#878E99] ${
                                            plan.labels.p === '—' ? 'justify-center' : 'justify-between'
                                        }`}
                                    >
                                        {plan.labels.p === '—' ? (
                                            <span className="text-[9px]">Macros on request</span>
                                        ) : (
                                            <>
                                                <span className={plan.useGramLabels ? 'truncate min-w-0 mr-0.5' : ''}>{plan.labels.p}</span>
                                                <span className={plan.useGramLabels ? 'truncate min-w-0 mx-0.5 text-center' : ''}>{plan.labels.c}</span>
                                                <span className={plan.useGramLabels ? 'truncate min-w-0 ml-0.5 text-right' : ''}>{plan.labels.f}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </section>
    );
};
