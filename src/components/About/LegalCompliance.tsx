import { motion } from "framer-motion";
import { ShieldCheck, FileSignature, Lock, FileText, Users, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LegalCompliance = () => {
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

    const blockVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 85,
                damping: 12,
            },
        },
    };

    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-white dark:bg-[#050d18] text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-900/80">
            {/* Glowing Background Radial Highlights (enhanced in dark mode) */}
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#BA9853]/5 rounded-full blur-[130px] pointer-events-none hidden dark:block" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#BA9853]/5 rounded-full blur-[130px] pointer-events-none hidden dark:block" />

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
                
                {/* Header Section */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                    {/* Kicker Badge */}
                    <Badge 
                        variant="outline"
                        className="border-[#D4AF37]/50 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#D4AF37] tracking-widest uppercase mb-6 shadow-sm"
                    >
                        স্বীকৃতি ও অনুমোদন
                    </Badge>

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                        আর্থিক শৃঙ্খলা এবং নীতিমালার প্রতি
                        <br />
                        আমাদের <span className="text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]">অবিচল প্রতিশ্রুতি</span>।
                    </h2>
                </div>

                {/* Announcement Block (Watermelon UI style) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97, y: -15 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-lg shadow-[#D4AF37]/5">
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#D4AF37]" />
                        
                        {/* Glow light indicator */}
                        <div className="absolute top-2 right-2 size-2 rounded-full bg-[#D4AF37] animate-pulse" />

                        {/* Icon */}
                        <div className="size-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
                            <ShieldCheck className="size-6 stroke-[2]" />
                        </div>

                        {/* Content */}
                        <div className="text-center md:text-left flex-1">
                            <span className="text-[#D4AF37] text-[10px] md:text-xs font-extrabold uppercase tracking-widest block mb-1">
                                FOUNDATIONAL COMPLIANCE COVENANT
                            </span>
                            <blockquote className="text-slate-800 dark:text-slate-200 text-base md:text-lg font-bold leading-relaxed">
                                "KM09 Capital-এর সকল সদস্য, পারস্পরিক বিশ্বাস ও ঐকমত্যের ভিত্তিতে এই ফান্ডিং উদ্যোগটি পরিচালনা করছে।"
                            </blockquote>
                        </div>
                    </div>
                </motion.div>

                {/* Grid of Compliance Pillars */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
                >
                    {/* Card 1: Structural Agreement */}
                    <motion.div variants={blockVariants} whileHover={{ y: -6, transition: { duration: 0.3 } }} className="h-full">
                        <Card className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden relative group rounded-2xl">
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <CardHeader className="pb-4">
                                <div className="size-11 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner text-[#D4AF37]">
                                    <FileSignature className="size-5 stroke-[1.8]" />
                                </div>
                                <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                    কাঠামোগত চুক্তিনামা
                                </CardTitle>
                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                    STRUCTURAL AGREEMENT
                                </span>
                            </CardHeader>

                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                    ফান্ডের স্বচ্ছতা, শৃঙ্খলা এবং ধারাবাহিকতা বজায় রাখতে আমরা সর্বসম্মতিক্রমে একটি <span className="text-[#D4AF37] font-semibold">সুনির্দিষ্ট নীতিমালায়</span> একমত পোষণ করেছি। নীতিমালার প্রতিটি পাতা একে অপরের সাথে অবিচ্ছেদ্যভাবে সংযুক্ত এবং সম্পূর্ণ ডকুমেন্টের ধারাবাহিকতা বজায় রাখতে প্রতি পাতায় সকল সদস্যের <span className="text-[#D4AF37] font-semibold">স্বাক্ষর বা টিপসই</span> প্রযোজ্য।
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Card 2: Financial Security */}
                    <motion.div variants={blockVariants} whileHover={{ y: -6, transition: { duration: 0.3 } }} className="h-full">
                        <Card className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden relative group rounded-2xl">
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <CardHeader className="pb-4">
                                <div className="size-11 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner text-[#D4AF37]">
                                    <Lock className="size-5 stroke-[1.8]" />
                                </div>
                                <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                    আর্থিক নিরাপত্তা
                                </CardTitle>
                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                    FINANCIAL SECURITY
                                </span>
                            </CardHeader>

                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                    ফান্ডের সমস্ত লেনদেন "KM09 Capital"-এর নামে বা যৌথভাবে নির্ধারিত একটি নির্দিষ্ট <span className="text-[#D4AF37] font-semibold">ব্যাংক অ্যাকাউন্ট</span> অথবা বিশ্বস্ত উপায়ের মাধ্যমে পরিচালিত হয়। অ্যাকাউন্টের দায়িত্বপ্রাপ্ত বা সিগনেটরি সদস্যদের <span className="text-[#D4AF37] font-semibold">যৌথ স্বাক্ষর বা অনুমতি</span> ছাড়া ফান্ড থেকে কোনো টাকা তোলা বা খরচ করা যায় না।
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Card 3: Transparency & Accountability */}
                    <motion.div variants={blockVariants} whileHover={{ y: -6, transition: { duration: 0.3 } }} className="h-full">
                        <Card className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden relative group rounded-2xl">
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <CardHeader className="pb-4">
                                <div className="size-11 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner text-[#D4AF37]">
                                    <FileText className="size-5 stroke-[1.8]" />
                                </div>
                                <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                    স্বচ্ছতা ও জবাবদিহিতা
                                </CardTitle>
                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                    TRANSPARENCY & ACCOUNTABILITY
                                </span>
                            </CardHeader>

                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                    প্রতি মাসের <span className="text-[#D4AF37] font-semibold">১০ তারিখের পর</span> ফান্ডের মোট জমা, বকেয়া, জরিমানার হিসাব এবং খরচের সম্পূর্ণ হিসাব (<span className="text-[#D4AF37] font-semibold">Statement</span>) গ্রুপের সকল সদস্যের সামনে স্বচ্ছতার সাথে প্রকাশ করা হয়।
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Card 4: Democratic Decision Making */}
                    <motion.div variants={blockVariants} whileHover={{ y: -6, transition: { duration: 0.3 } }} className="h-full">
                        <Card className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden relative group rounded-2xl">
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <CardHeader className="pb-4">
                                <div className="size-11 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner text-[#D4AF37]">
                                    <Users className="size-5 stroke-[1.8]" />
                                </div>
                                <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                    গণতান্ত্রিক সিদ্ধান্ত গ্রহণ
                                </CardTitle>
                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                    DEMOCRATIC DECISION MAKING
                                </span>
                            </CardHeader>

                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                    ফান্ডের টাকা কোথায় ইনভেস্ট করা হবে, বা কোনো ব্যবসা শুরু করা হবে কিনা—এই সংক্রান্ত সকল সিদ্ধান্তে <span className="text-[#D4AF37] font-semibold">সংখ্যাগরিষ্ঠ সদস্যদের মতামতের</span> প্রতি পূর্ণ শ্রদ্ধা প্রদর্শন করা হয়।
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default LegalCompliance;