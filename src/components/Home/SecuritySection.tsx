import { ShieldCheck, Lock, ScrollText, Key, Fingerprint, History, Database, EyeOff } from "lucide-react";

export default function SecuritySection() {
    const securityFeatures = [
        {
            icon: Lock,
            titleBengali: "ব্যাংক-গ্রেড এনক্রিপশন",
            titleEnglish: "BANK-GRADE ENCRYPTION",
            description: "প্রতিটি লেনদেন ও সদস্য তথ্য এন্ড-টু-এন্ড এনক্রিপ্টেড — পরিবহন ও সঞ্চয় উভয় স্তরে সুরক্ষিত।",
        },
        {
            icon: ScrollText,
            titleBengali: "অপরিবর্তনীয় লেজার",
            titleEnglish: "IMMUTABLE LEDGERS",
            description: "প্রতিটি এন্ট্রি টাইমস্ট্যাম্পসহ অপরিবর্তনীয়। মুছে ফেলা নয় — সংশোধন কেবল অডিট-ট্রেইলসহ।",
        },
        {
            icon: Key,
            titleBengali: "ভূমিকা-ভিত্তিক অ্যাক্সেস",
            titleEnglish: "ROLE-BASED ACCESS CONTROL",
            description: "সদস্য কেবল নিজের লেজার দেখেন; অ্যাডমিনের রয়েছে পূর্ণ দৃশ্যমানতা ও অডিট নিয়ন্ত্রণ।",
        },
    ];

    const complianceMetrics = [
        {
            icon: Fingerprint,
            text: "২৫৬-বিট এনক্রিপশন",
        },
        {
            icon: History,
            text: "রিয়েল-টাইম অডিট ট্রেইল",
        },
        {
            icon: Database,
            text: "স্বয়ংক্রিয় দৈনিক ব্যাকআপ",
        },
        {
            icon: EyeOff,
            text: "কঠোর গোপনীয়তা নীতি",
        },
    ];

    return (
        <section className="py-20 md:py-28 bg-[#050d18] text-white overflow-hidden relative border-t border-slate-900">
            {/* Glowing Background Radial Highlights */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#BA9853]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    {/* Header Shield Box */}
                    <div className="w-16 h-16 rounded-2xl border border-[#BA9853]/40 bg-[#BA9853]/5 flex items-center justify-center mb-6 shadow-lg shadow-[#BA9853]/5 hover:scale-105 hover:rotate-3 transition-transform duration-500">
                        <ShieldCheck className="size-8 text-[#BA9853] stroke-[1.8]" />
                    </div>

                    <span className="text-[#BA9853] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-3">
                        ENTERPRISE SECURITY GUARANTEE
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                        এন্টারপ্রাইজ-গ্রেড নিরাপত্তা
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base font-semibold max-w-xl leading-relaxed">
                        আপনার পুঁজি সুরক্ষিত — কঠোর প্রকৌশল ও নিয়মতান্ত্রিক তদারকির মাধ্যমে।
                    </p>
                </div>

                {/* Grid of Security Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {securityFeatures.map((feature, idx) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-[#0b1e33]/30 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 hover:border-[#BA9853]/30 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#BA9853]/5 transition-all duration-500 flex flex-col items-start"
                            >
                                {/* Glowing Top Line on Hover */}
                                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-[#BA9853]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon container */}
                                <div className="w-12 h-12 bg-slate-900/80 border border-slate-800/60 rounded-xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 group-hover:border-[#BA9853]/40 transition-all duration-500">
                                    <IconComponent className="size-5 text-[#BA9853] stroke-[2]" />
                                </div>

                                {/* Title (Bengali) */}
                                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                                    {feature.titleBengali}
                                </h3>

                                {/* Subtitle (English, Gold) */}
                                <span className="text-[#BA9853] text-[10px] sm:text-xs font-extrabold tracking-widest uppercase block mb-4">
                                    {feature.titleEnglish}
                                </span>

                                {/* Description */}
                                <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Added Trust & Compliance Section (Small Section) */}
                <div className="mt-20 pt-12 border-t border-slate-800/40">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
                        {complianceMetrics.map((metric, idx) => {
                            const MetricIcon = metric.icon;
                            return (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 justify-center md:justify-start px-2 py-3 rounded-xl hover:bg-slate-900/20 transition-colors duration-300"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-slate-900/60 flex items-center justify-center border border-slate-800">
                                        <MetricIcon className="size-4.5 text-[#BA9853]" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-300">
                                        {metric.text}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
