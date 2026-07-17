import { UserPlus, CalendarClock, LineChart, ChevronRight } from "lucide-react";

export default function HowWork() {
    const steps = [
        {
            number: "০১",
            titleBengali: "মেম্বারশিপ রিকোয়েস্ট",
            titleEnglish: "Join",
            description: "আমাদের প্ল্যাটফর্মে নিবন্ধন সম্পন্ন করুন এবং সুপার অ্যাডমিনের অনুমোদনের জন্য অপেক্ষা করুন।",
            icon: UserPlus,
        },
        {
            number: "০২",
            titleBengali: "সময়ানুবর্তী সঞ্চয়",
            titleEnglish: "Deposit by 10th",
            description: "আমাদের আর্থিক শৃঙ্খল বজায় রাখতে প্রতি মাসের ১০ তারিখের মধ্যে আপনার নির্ধারিত সঞ্চয় জমা নিশ্চিত করুন।",
            icon: CalendarClock,
        },
        {
            number: "০৩",
            titleBengali: "প্রবৃদ্ধি পর্যবেক্ষণ",
            titleEnglish: "Track Growth",
            description: "আপনার পার্সোনাল ড্যাশবোর্ডের মাধ্যমে নিজের সঞ্চয় এবং আমাদের সম্মিলিত পুঁজির বর্তমান অবস্থান ও অগ্রগতি সবসময় ট্র্যাক করুন।",
            icon: LineChart,
        },
    ];

    return (
        <section className="py-20 md:py-28 bg-white dark:bg-[#071322] border-t border-slate-100 dark:border-slate-900 transition-colors duration-300 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#BA9853]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute left-0 top-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-[#BA9853] text-sm md:text-base font-extrabold uppercase tracking-widest block mb-3">
                        কাজের প্রক্রিয়া
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                        সহজ ৩টি ধাপে শুরু করুন
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-bold uppercase tracking-wider">
                        How it works — Start in 3 Simple Steps
                    </p>
                </div>

                {/* Timeline Grid Container */}
                <div className="relative">
                    
                    {/* Desktop Horizontal Connecting Line */}
                    <div className="absolute top-[2.75rem] left-[10%] right-[10%] h-[2px] bg-dashed bg-gradient-to-r from-slate-200 via-[#BA9853]/30 to-slate-200 dark:from-slate-800 dark:via-[#BA9853]/30 dark:to-slate-800 hidden md:block z-0 pointer-events-none">
                        <div className="w-full h-full bg-[linear-gradient(to_right,transparent_50%,white_50%)] dark:bg-[linear-gradient(to_right,transparent_50%,#071322_50%)] bg-[size:16px_100%] animate-[pulse_2s_infinite]" />
                    </div>

                    {/* Step Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 relative z-10">
                        {steps.map((step, idx) => {
                            const IconComponent = step.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group flex flex-col items-center text-center px-4"
                                >
                                    {/* Icon & Step Number Circle container */}
                                    <div className="relative mb-6">
                                        {/* Outer glowing ring */}
                                        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#BA9853]/10 to-[#BA9853]/0 opacity-0 group-hover:opacity-100 blur-sm group-hover:scale-105 transition-all duration-500" />
                                        
                                        {/* Icon Container */}
                                        <div className="w-20 h-20 bg-slate-900 dark:bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-center relative shadow-lg group-hover:border-[#BA9853]/50 transition-colors duration-500">
                                            <IconComponent className="size-8 text-[#BA9853] stroke-[1.8] group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        {/* Step Number Badge */}
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#BA9853] text-slate-950 font-black text-sm flex items-center justify-center shadow-md border-2 border-white dark:border-[#071322] transform group-hover:scale-110 transition-transform duration-500">
                                            {step.number}
                                        </div>
                                    </div>

                                    {/* Title Section */}
                                    <div className="mb-3">
                                        <span className="text-[#BA9853] text-xs font-extrabold uppercase tracking-widest block mb-1">
                                            {step.titleEnglish}
                                        </span>
                                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                            {step.titleBengali}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium max-w-xs">
                                        {step.description}
                                    </p>

                                    {/* Responsive Mobile Divider Arrows */}
                                    {idx < 2 && (
                                        <div className="md:hidden mt-8 flex justify-center text-[#BA9853]/40">
                                            <ChevronRight className="size-6 rotate-90" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
