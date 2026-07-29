import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Bookmark, Sparkles, TrendingUp, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Sponsorship = () => {
    // Animation presets
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 90,
                damping: 14,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 80,
                damping: 12,
            },
        },
    };

    // Card Milestone data
    const sponsorshipCards = [
        {
            tag: "দীর্ঘমেয়াদী পরিকল্পনা",
            tagEnglish: "Long-term Strategy",
            icon: TrendingUp,
            titleHtml: <>সমমনা বন্ধুদের <span className="text-[#D4AF37] font-extrabold">ছোট ছোট সঞ্চয়কে</span> একত্রিত করে ভবিষ্যতে <span className="text-[#D4AF37] font-extrabold">বড় ও লাভজনক</span> কোনো ব্যবসায়িক প্রতিষ্ঠান যৌথভাবে গড়ে তুলতে আমাদের মূল চালিকাশক্তি হিসেবে কাজ করা।</>,
        },
        {
            tag: "লভ্যাংশ বণ্টন",
            tagEnglish: "Shared Value",
            icon: Sparkles,
            titleHtml: <>আমরা যৌথভাবে যেখানেই ইনভেস্ট করি না কেন, সেটির <span className="text-[#D4AF37] font-extrabold">চূড়ান্ত মালিকানা</span> এবং অর্জিত <span className="text-[#D4AF37] font-extrabold">লভ্যাংশ</span> সবার জমাকৃত মূলধনের অনুপাত অনুযায়ী সমানভাবে বণ্টন করা হবে।</>,
        },
        {
            tag: "যৌথ মালিকানা",
            tagEnglish: "Joint Venture",
            icon: Handshake,
            titleHtml: <>পারস্পরিক বিশ্বাস ও <span className="text-[#D4AF37] font-extrabold">কঠোর আর্থিক শৃঙ্খলা</span> বজায় রেখে একটি স্বচ্ছ ব্যাংক অ্যাকাউন্টিং ব্যবস্থার মাধ্যমে প্রতিটি প্রোজেক্টের <span className="text-[#D4AF37] font-extrabold">শতভাগ জবাবদিহিতা</span> নিশ্চিত করা।</>,
        },
    ];

    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-slate-50 dark:bg-[#071322] text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-900/80 transition-colors duration-300">
            {/* Glowing Ambient Radial Lights in Dark Theme */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#BA9853]/5 rounded-full blur-[140px] pointer-events-none hidden dark:block" />

            {/* Subtle Grid Pattern Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-15"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                
                {/* Typography Header Stack (Blog 2 Inspired) */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16 flex flex-col items-center gap-4 text-center max-w-3xl mx-auto"
                >
                    {/* kicker badge */}
                    <motion.div variants={itemVariants}>
                        <Badge 
                            variant="outline"
                            className="border-[#D4AF37]/50 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#D4AF37] tracking-widest uppercase mb-4 shadow-sm"
                        >
                            স্পন্সরশিপ ও পার্টনারশিপ
                        </Badge>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight max-w-2xl"
                    >
                        যৌথ বিনিয়োগের নতুন দিগন্ত,
                        <br />
                        ব্যবসায়িক সমৃদ্ধির <span className="text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]">অংশীদার</span>।
                    </motion.h2>

                    {/* Sub-heading / Tagline */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-semibold max-w-2xl"
                    >
                        KM09 Capital-এর শক্তিশালী যৌথ মূলধনের সাথে যুক্ত হয়ে আপনার ভবিষ্যৎ ব্যবসায়িক উদ্যোগকে একধাপ এগিয়ে নিন।
                    </motion.p>

                    {/* CTA Link (ArrowUpRight animation) */}
                    <motion.div variants={itemVariants} className="mt-2">
                        <a 
                            href="/contact" 
                            className="group/cta inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-800 hover:border-[#D4AF37]/55 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 px-6 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] shadow-sm hover:shadow transition-all duration-300"
                        >
                            আমাদের সাথে যুক্ত হোন
                            <ArrowUpRight className="size-4 text-[#D4AF37] transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Horizontal Milestones Grid (Blog 2 Card inspired layout) */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
                >
                    {sponsorshipCards.map((card, idx) => {
                        const CardIcon = card.icon;
                        return (
                            <motion.div 
                                key={idx}
                                variants={cardVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="h-full"
                            >
                                <Card className="h-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl rounded-[2rem] p-7 flex flex-col justify-between overflow-hidden relative group">
                                    {/* Top glow lines */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="flex flex-1 flex-col">
                                        {/* Top Section: Tag and bookmark icon slot */}
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 dark:text-white text-sm font-bold tracking-tight">
                                                    {card.tag}
                                                </span>
                                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                                    {card.tagEnglish}
                                                </span>
                                            </div>
                                            <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/20 transition-all duration-300">
                                                <Bookmark className="size-3.5" />
                                            </div>
                                        </div>

                                        {/* Middle Section: Main Title Content (Bengali) */}
                                        <div className="flex-1 flex flex-col justify-center py-4">
                                            <h3 className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed font-semibold tracking-wide">
                                                {card.titleHtml}
                                            </h3>
                                        </div>

                                        {/* Bottom Section: Icon status and Action arrow indicator */}
                                        <div className="border-t border-slate-100 dark:border-slate-900 pt-6 mt-6 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform duration-300">
                                                    <CardIcon className="size-4.5" />
                                                </div>
                                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-extrabold uppercase tracking-widest block">
                                                    KM09 CAPITAL PARTNER
                                                </span>
                                            </div>
                                            
                                            {/* Action Arrow pointing forward */}
                                            <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-white group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
                                                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Sponsorship;