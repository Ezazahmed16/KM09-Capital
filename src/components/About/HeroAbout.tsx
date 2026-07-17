import { PiggyBank, Eye, Handshake, TrendingUp, Quote } from "lucide-react";

const HeroAbout = () => {
    // Mission pillars details for additional features
    const pillars = [
        {
            icon: PiggyBank,
            titleBengali: "শৃঙ্খলিত সঞ্চয়",
            titleEnglish: "DISCIPLINED SAVINGS",
            description: "প্রতিটি সদস্যের নিয়মিত ও নিয়মতান্ত্রিক সঞ্চয়ের মাধ্যমে একটি শক্তিশালী ও স্থায়ী ফান্ডের ভিত্তি তৈরি করা হয়।",
            accentColor: "from-amber-500/20 to-yellow-600/5",
        },
        {
            icon: Eye,
            titleBengali: "স্বচ্ছ ব্যবস্থাপনা",
            titleEnglish: "TRANSPARENT MANAGEMENT",
            description: "রিয়েল-টাইম লেজার ট্র্যাকিং ও উন্মুক্ত হিসাব-নিকাশের মাধ্যমে প্রত্যেক সদস্যের আস্থা ও অধিকার নিশ্চিত করা হয়।",
            accentColor: "from-emerald-500/20 to-teal-600/5",
        },
        {
            icon: Handshake,
            titleBengali: "যৌথ উন্নয়ন",
            titleEnglish: "JOINT DEVELOPMENT",
            description: "সমবায় ও পারস্পরিক সহায়তার মাধ্যমে সকল সদস্যের ব্যবসায়িক ও ব্যক্তিগত আর্থিক প্রবৃদ্ধি নিশ্চিত করা হয়।",
            accentColor: "from-blue-500/20 to-indigo-600/5",
        },
        {
            icon: TrendingUp,
            titleBengali: "স্বনির্ভর ভবিষ্যৎ",
            titleEnglish: "SELF-RELIANT FUTURE",
            description: "ঐক্যবদ্ধ ও দীর্ঘমেয়াদী বিনিয়োগ পরিকল্পনার মাধ্যমে প্রতিটি সদস্যের জন্য একটি স্বনির্ভর আর্থিক ভবিষ্যৎ গড়ে তোলা।",
            accentColor: "from-purple-500/20 to-violet-600/5",
        },
    ];

    return (
        <section
            className="relative min-h-[95vh] flex flex-col justify-between bg-[#071322] overflow-hidden pt-36 pb-20 md:pb-24"
            style={{
                backgroundImage: "url('/AboutBanner.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Dark gradient & Grid Overlay for high visual contrast and premium feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#071322]/90 via-[#071322]/70 to-[#071322] pointer-events-none" />
            <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(186, 152, 83, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(186, 152, 83, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Radial glow background lights */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#BA9853]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#0b1e33]/80 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center items-center">
                {/* Vision Statement Section (Matches user's image content exactly) */}
                <div className="w-full max-w-4xl text-center flex flex-col items-center justify-center mb-16 md:mb-24">
                    {/* Small Gold Badge */}
                    <span className="text-[#BA9853] text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] block mb-6 animate-fade-in">
                        VISION STATEMENT
                    </span>

                    {/* Main Bengali Quote Block */}
                    <div className="relative px-6 md:px-12 animate-fade-in">
                        <Quote className="absolute -top-6 -left-2 size-12 text-[#BA9853]/10 stroke-[2] transform rotate-180 hidden sm:block" />
                        <h1 
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#BA9853] leading-relaxed md:leading-[1.6] tracking-wide filter drop-shadow-[0_2px_15px_rgba(186,152,83,0.1)] mb-8"
                            style={{ textWrap: "balance" }}
                        >
                            “শৃঙ্খলিত সঞ্চয়, স্বচ্ছ ব্যবস্থাপনা ও যৌথ উন্নয়নের মাধ্যমে আমরা গড়ে তুলব একটি স্বনির্ভর আর্থিক ভবিষ্যৎ।”
                        </h1>
                        <Quote className="absolute -bottom-6 -right-2 size-12 text-[#BA9853]/10 stroke-[2] hidden sm:block" />
                    </div>

                    {/* Separator Accent Line */}
                    <div className="flex items-center gap-3 w-40 mb-4 justify-center">
                        <div className="h-[1px] bg-gradient-to-r from-transparent to-[#BA9853]/40 flex-1" />
                        <div className="size-1.5 rounded-full bg-[#BA9853] animate-pulse" />
                        <div className="h-[1px] bg-gradient-to-l from-transparent to-[#BA9853]/40 flex-1" />
                    </div>

                    {/* Signature */}
                    <p className="text-slate-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                        — KM09 CAPITAL Mission
                    </p>
                </div>

                {/* Additional Features: interactive glassmorphic cards for the four pillars */}
                <div className="w-full mt-6">
                    <div className="text-center mb-10">
                        <h2 className="text-white text-lg sm:text-xl font-extrabold tracking-widest uppercase mb-2">
                            আমাদের মূল স্তম্ভসমূহ
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm font-semibold">
                            চারটি সুনির্দিষ্ট স্তম্ভের ওপর ভিত্তি করে পরিচালিত হচ্ছে কেএম০৯ ক্যাপিটাল
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {pillars.map((pillar, idx) => {
                            const Icon = pillar.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group relative bg-[#0b1e33]/20 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 hover:border-[#BA9853]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#BA9853]/5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Glowing top line & gradient background highlights on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#BA9853]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-[#BA9853]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div>
                                        {/* Icon Container */}
                                        <div className="size-11 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#BA9853]/30 transition-all duration-500 shadow-inner">
                                            <Icon className="size-5 text-[#BA9853] stroke-[1.8]" />
                                        </div>

                                        {/* Bengali Title */}
                                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#BA9853] transition-colors duration-300 mb-1">
                                            {pillar.titleBengali}
                                        </h3>

                                        {/* English subtitle */}
                                        <span className="text-[#BA9853]/80 text-[10px] font-extrabold tracking-wider uppercase block mb-3.5">
                                            {pillar.titleEnglish}
                                        </span>

                                        {/* Description text */}
                                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                                            {pillar.description}
                                        </p>
                                    </div>

                                    {/* Small growth accent indicator at bottom of card */}
                                    <div className="w-full bg-slate-800/40 h-1 rounded-full overflow-hidden mt-6">
                                        <div className="h-full bg-[#BA9853] rounded-full w-0 group-hover:w-full transition-all duration-700 ease-out" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroAbout;