import { motion } from "framer-motion";
import { Coins, TrendingUp, Percent, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Services = () => {
    // Animation presets
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
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
        hidden: { opacity: 0, scale: 0.96, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 85,
                damping: 13,
            },
        },
    };

    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-slate-50 dark:bg-[#071322] text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-900/80 transition-colors duration-300">
            {/* Glowing Ambient Radial Highlight (Only in dark theme) */}
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
                
                {/* Header Block */}
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
                            className="border-[#D4AF37]/50 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#D4AF37] tracking-widest uppercase mb-4 shadow-sm animate-pulse"
                        >
                            আমাদের কার্যক্রম
                        </Badge>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight"
                    >
                        যৌথ উদ্যোগে আর্থিক সমৃদ্ধি ও
                        <br />
                        নিরাপদ <span className="text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]">বিনিয়োগ</span>।
                    </motion.h2>

                    {/* Sub-heading / Tagline */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-semibold max-w-xl"
                    >
                        আপনার ছোট ছোট সঞ্চয়কে একটি সুরক্ষিত কাঠামোর মাধ্যমে লাভজনক খাতে রূপান্তর করার সম্পূর্ণ প্রক্রিয়া।
                    </motion.p>
                </motion.div>

                {/* Bento Grid Layout */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-auto"
                >
                    {/* Card 1: Capital Pooling (Large - Spans 2 Rows on md) */}
                    <motion.div 
                        variants={cardVariants}
                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        className="md:row-span-2 md:col-span-1 h-full"
                    >
                        <Card className="h-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between overflow-hidden relative group rounded-3xl p-7 min-h-[380px] md:min-h-[460px]">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    {/* Icon Container */}
                                    <div className="size-11 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-inner text-[#D4AF37]">
                                        <Coins className="size-5 stroke-[1.8]" />
                                    </div>
                                    
                                    <CardTitle className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        যৌথ মূলধন গঠন
                                    </CardTitle>
                                    <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-6">
                                        CAPITAL POOLING
                                    </span>
                                    
                                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                                        সকল বন্ধুদের <span className="text-[#D4AF37] font-semibold">ছোট ছোট সঞ্চয়কে</span> একত্রিত করে একটি বড় মূলধন (Capital) তৈরি করা আমাদের প্রধান কাজ। এই ফান্ডের মাধ্যমে একক সঞ্চয়ের সীমাবদ্ধতা কাটিয়ে আমরা একটি শক্তিশালী <span className="text-[#D4AF37] font-semibold">যৌথ আর্থিক ভিত্তি</span> গড়ে তুলি।
                                    </p>
                                </div>
                                
                                {/* Structural accent indicator */}
                                <div className="mt-8 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    <span>Pillar 01</span>
                                    <span className="size-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Card 2: Profitable Investments (Standard) */}
                    <motion.div 
                        variants={cardVariants}
                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        className="md:col-span-1 h-full"
                    >
                        <Card className="h-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between overflow-hidden relative group rounded-3xl p-7 min-h-[220px]">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner text-[#D4AF37]">
                                        <TrendingUp className="size-4.5 stroke-[1.8]" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                        লাভজনক ব্যবসায়িক বিনিয়োগ
                                    </CardTitle>
                                    <span className="text-slate-400 dark:text-slate-500 text-[9px] font-bold uppercase tracking-wider block mb-4">
                                        PROFITABLE INVESTMENTS
                                    </span>
                                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                        আমাদের জমানো টাকা পরবর্তীতে সকলের <span className="text-[#D4AF37] font-semibold">সম্মিলিত সিদ্ধান্ত</span> অনুযায়ী লাভজনক কোনো ব্যবসা বা <span className="text-[#D4AF37] font-semibold">ইনভেস্টমেন্টে</span> খাটানো হবে।
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    <span>Pillar 02</span>
                                    <span className="size-1.5 rounded-full bg-[#D4AF37]" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Card 3: Profit Sharing (Standard) */}
                    <motion.div 
                        variants={cardVariants}
                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        className="md:col-span-1 h-full"
                    >
                        <Card className="h-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between overflow-hidden relative group rounded-3xl p-7 min-h-[220px]">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner text-[#D4AF37]">
                                        <Percent className="size-4.5 stroke-[1.8]" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                        লভ্যাংশ বণ্টন
                                    </CardTitle>
                                    <span className="text-slate-400 dark:text-slate-500 text-[9px] font-bold uppercase tracking-wider block mb-4">
                                        PROFIT SHARING
                                    </span>
                                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                        ভবিষ্যতে এই ফান্ড থেকে যে ব্যবসা বা বিনিয়োগ করা হবে, তার <span className="text-[#D4AF37] font-semibold">লাভ অথবা ক্ষতি</span> সকল সদস্যের মাঝে তাদের জমাকৃত মূলধনের অনুপাত অনুযায়ী <span className="text-[#D4AF37] font-semibold">সমানভাবে বণ্টন</span> করা হবে।
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    <span>Pillar 03</span>
                                    <span className="size-1.5 rounded-full bg-[#D4AF37]" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Card 4: Transparent Financial Management (Wide - Spans 2 Columns on md) */}
                    <motion.div 
                        variants={cardVariants}
                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        className="md:col-span-2 h-full"
                    >
                        <Card className="h-full bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between overflow-hidden relative group rounded-3xl p-7 min-h-[220px]">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner text-[#D4AF37]">
                                        <Eye className="size-4.5 stroke-[1.8]" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                                        স্বচ্ছ আর্থিক ব্যবস্থাপনা
                                    </CardTitle>
                                    <span className="text-slate-400 dark:text-slate-500 text-[9px] font-bold uppercase tracking-wider block mb-4">
                                        TRANSPARENT FINANCIAL MANAGEMENT
                                    </span>
                                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                        ফান্ডের সমস্ত লেনদেন "KM09 Capital"-এর নামে নির্ধারিত একটি <span className="text-[#D4AF37] font-semibold">নির্দিষ্ট ব্যাংক অ্যাকাউন্ট</span> অথবা বিশ্বস্ত উপায়ের মাধ্যমে পরিচালিত হয়। প্রতি মাসের ১০ তারিখের পর ফান্ডের সম্পূর্ণ হিসাব সদস্যদের সামনে <span className="text-[#D4AF37] font-semibold">স্বচ্ছতার সাথে প্রকাশ</span> করা হয়।
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    <span>Pillar 04</span>
                                    <span className="size-1.5 rounded-full bg-[#D4AF37]" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;