import { ShieldCheck, Scale, TrendingUp } from "lucide-react";

export default function FocusSection() {
    const pillars = [
        {
            icon: ShieldCheck,
            titleBengali: "স্বচ্ছতা",
            titleEnglish: "TRANSPARENCY",
            description: "সম্পূর্ণ স্বচ্ছ লেজার ব্যবস্থা। নিজের জমার হিসাব এবং সম্মিলিত পুঁজির বর্তমান অবস্থান সবসময় আপনার হাতের মুঠোয়।",
        },
        {
            icon: Scale,
            titleBengali: "শৃঙ্খলা",
            titleEnglish: "DISCIPLINE",
            description: "শৃঙ্খলাই আমাদের সাফল্যের চাবিকাঠি। সময়ের প্রতি আমাদের আপসহীন প্রতিশ্রুতিই নিশ্চিত করে আমাদের যৌথ প্রবৃদ্ধি।",
        },
        {
            icon: TrendingUp,
            titleBengali: "প্রবৃদ্ধি",
            titleEnglish: "GROWTH",
            description: "কৌশলগত বিনিয়োগ এবং বুদ্ধিমত্তাসম্পন্ন ব্যবস্থাপনার মাধ্যমে প্রতিটি সদস্যের সঞ্চয়কে আমরা রূপান্তর করি দীর্ঘমেয়াদী সম্পদে।",
        },
    ];

    return (
        <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-[#071322]/80 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                    <span className="text-[#BA9853] text-sm md:text-base font-extrabold uppercase tracking-widest block mb-3">
                        আমাদের মূলনীতি
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                        তিনটি স্তম্ভ, একটি লক্ষ্য
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-bold uppercase tracking-wider">
                        Core Pillars of KM09 CAPITAL
                    </p>
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {pillars.map((pillar, idx) => {
                        const IconComponent = pillar.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-white dark:bg-[#0b1e33]/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-8 shadow-md hover:shadow-xl dark:hover:shadow-[#BA9853]/5 hover:border-[#BA9853]/30 dark:hover:border-[#BA9853]/30 hover:-translate-y-2 transition-all duration-500 flex flex-col items-start"
                            >
                                {/* Subtle Top Glow on Hover */}
                                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-[#BA9853]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon Wrapper */}
                                <div className="w-14 h-14 bg-slate-900 dark:bg-slate-950 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <IconComponent className="size-6 text-[#BA9853] stroke-[1.8]" />
                                </div>

                                {/* Title (Bengali) */}
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                                    {pillar.titleBengali}
                                </h3>

                                {/* Subtitle (English, Gold) */}
                                <span className="text-[#BA9853] text-[11px] sm:text-xs font-extrabold tracking-widest uppercase block mb-4">
                                    {pillar.titleEnglish}
                                </span>

                                {/* Description */}
                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                                    {pillar.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
