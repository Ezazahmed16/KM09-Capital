import { Link } from "react-router";
import { MessageSquare, ShieldCheck, HelpCircle } from "lucide-react";

export default function BottomBanner() {
    return (
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 my-16 md:my-24 relative z-10">
            {/* CTA Floating Card Container */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0b1e33] to-[#071322] border border-[#BA9853]/20 p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:border-[#BA9853]/35 transition-all duration-500">
                
                {/* Glowing light sweep behind the card */}
                <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#BA9853]/5 rounded-full blur-[100px] pointer-events-none transition-all duration-500 group-hover:bg-[#BA9853]/10" />

                {/* Left Content Area */}
                <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                        শৃঙ্খলিত সঞ্চয়ের যাত্রা শুরু করুন
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                        আবেদন জমা দিন — সুপার অ্যাডমিন যাচাইয়ের পর অ্যাক্সেস পাবেন।
                    </p>

                    {/* Added Feature: Subtle Trust points below description */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs font-bold text-[#BA9853]/90">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="size-3.5" />
                            নিরাপদ ডেটা এনক্রিপশন
                        </span>
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="size-3.5" />
                            কোনো লুকানো ফি নেই
                        </span>
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="size-3.5" />
                            ২৪/৭ ট্র্যাকিং ব্যবস্থা
                        </span>
                    </div>
                </div>

                {/* Right Buttons Area */}
                <div className="flex flex-col sm:flex-row gap-4 shrink-0 lg:items-center">
                    <Link
                        to="/register"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#BA9853] hover:bg-[#A3813F] text-slate-950 font-bold px-7 py-4 text-base shadow-lg hover:shadow-[#BA9853]/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-center"
                    >
                        এখনই নিবন্ধন করুন
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 hover:border-[#BA9853]/40 bg-slate-900/40 text-white font-bold px-7 py-4 text-base transition-all duration-300 hover:bg-slate-800/50 cursor-pointer text-center"
                    >
                        যোগাযোগ করুন
                        <MessageSquare className="size-4.5 stroke-[1.8] opacity-80" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
