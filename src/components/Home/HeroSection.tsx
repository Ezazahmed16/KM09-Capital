import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
    // Premium dark grid and glow styles for the luxury aesthetic
    const gridBackgroundStyle = {
        backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
    };

    return (
        <section
            className="relative min-h-[90vh] flex items-center justify-center bg-[#071322] overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28"
            style={gridBackgroundStyle}
        >
            {/* Soft Radial Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(186,152,83,0.1)_0%,transparent_60%),radial-gradient(circle_at_10%_80%,rgba(11,30,51,0.9)_0%,transparent_50%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Title, Description, Buttons */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        {/* Gold Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#BA9853]/30 bg-[#BA9853]/5 px-4 py-1.5 text-xs font-semibold text-[#BA9853] tracking-wider mb-6 animate-fade-in">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#BA9853] animate-pulse"></span>
                            KM09 CAPITAL • বন্ধ সদস্যভিত্তিক সঞ্চয়
                        </div>

                        {/* Heading with Bengali Serif Typography and Custom Word Colors */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black text-white leading-[1.2] sm:leading-[1.15] tracking-tight mb-6">
                            আজকের <span className="text-[#BA9853] drop-shadow-[0_2px_10px_rgba(186,152,83,0.15)]">ছোট</span>
                            <br />
                            <span className="text-[#BA9853] drop-shadow-[0_2px_10px_rgba(186,152,83,0.15)]">ছোট সঞ্চয়</span>,
                            <br />
                            আগামী দিনের <span className="text-[#BA9853] drop-shadow-[0_2px_10px_rgba(186,152,83,0.15)]">বিশাল</span>
                            <br />
                            <span className="text-[#BA9853] drop-shadow-[0_2px_10px_rgba(186,152,83,0.15)]">জয়!</span>
                        </h1>

                        {/* Description Paragraph */}
                        <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
                            শৃঙ্খলা, স্বচ্ছতা ও সম্মিলিত শক্তির উপর গড়ে ওঠা একটি আর্থিক উদ্যোগ — যেখানে প্রতিটি সদস্য একই সঙ্গে অংশীদার ও দায়বদ্ধ।
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#BA9853] hover:bg-[#A3813F] text-slate-950 font-bold px-6 py-3.5 text-base shadow-lg hover:shadow-[#BA9853]/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                            >
                                পোর্টালে প্রবেশ করুন
                                <ArrowRight className="size-4 stroke-[2.5]" />
                            </Link>
                            <Link
                                to="/policies"
                                className="inline-flex items-center justify-center rounded-lg border border-slate-700 hover:border-[#BA9853]/40 bg-slate-900/40 text-white font-bold px-6 py-3.5 text-base transition-all duration-300 hover:bg-slate-800/50 cursor-pointer"
                            >
                                নিয়মাবলী জানুন
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Stats Card Image */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end w-full animate-fade-in">
                        <img
                            src="/HeroBanner_2.png"
                            alt="KM09 Capital Stats"
                            className="w-full max-w-md rounded-2xl shadow-2xl border border-4 border-slate-800/80 object-cover hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
