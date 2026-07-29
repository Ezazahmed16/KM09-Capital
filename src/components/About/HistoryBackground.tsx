import { motion } from "framer-motion";
import { Calendar, Goal, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HistoryBackground = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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

    const milestoneVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 80,
                damping: 12,
            },
        },
    };

    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-white dark:bg-[#071322] text-slate-900 dark:text-white border-t border-slate-100 dark:border-slate-900/80">
            {/* Glowing Accent Ambient Lights (only visible or enhanced in dark mode) */}
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#BA9853]/5 rounded-full blur-[120px] pointer-events-none hidden dark:block" />
            <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-[#0b1e33]/40 rounded-full blur-[100px] pointer-events-none hidden dark:block" />

            {/* Subtle Grid Pattern Overlay matching the overall site theme */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-15"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '45px 45px',
                }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                >
                    {/* Left Column: Narrative Heading & Details */}
                    <motion.div 
                        variants={itemVariants}
                        className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-start text-left"
                    >
                        {/* shadcn Badge */}
                        <Badge 
                            variant="outline"
                            className="border-[#D4AF37]/50 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#D4AF37] tracking-widest uppercase mb-6 shadow-sm"
                        >
                            আমাদের ইতিহাস
                        </Badge>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
                            পারস্পরিক বিশ্বাস ও
                            <br />
                            ঐক্যের ভিত্তিতে <span className="text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]">আমাদের পথচলা</span>।
                        </h2>

                        {/* Subheading / Tagline */}
                        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg font-semibold border-l-2 border-[#D4AF37] pl-4 italic mb-8">
                            একতাই বল, যৌথ উদ্যোগই সাফল্য।
                        </p>

                        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                            কেএম০৯ ক্যাপিটাল সমমনা ও দায়িত্বশীল বন্ধুদের নিয়ে গঠিত একটি যৌথ ভবিষ্যৎ রূপরেখা। কঠোর নিয়মতান্ত্রিক সঞ্চয়ের ধারা বজায় রেখে আমরা এগিয়ে চলেছি একটি যৌথ স্বপ্নের দিকে।
                        </p>
                    </motion.div>

                    {/* Right Column: Timeline Milestones */}
                    <div className="lg:col-span-7 relative pl-8 md:pl-12">
                        {/* Timeline Connector Line */}
                        <div className="absolute left-3.5 md:left-5 top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800/80 pointer-events-none" />

                        {/* Milestones Loop */}
                        <div className="space-y-12">
                            {/* Card 1 */}
                            <motion.div variants={milestoneVariants} className="relative group">
                                {/* Timeline Indicator Dot */}
                                <div className="absolute -left-[27px] md:-left-[35px] top-5 size-5 rounded-full border-[3px] border-white dark:border-[#071322] bg-[#D4AF37] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(212,175,55,0.3)] z-10" />

                                <Card className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl relative rounded-2xl overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#D4AF37]">
                                                <Calendar className="size-4.5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                                    সূচনালগ্ন ও প্রেরণা
                                                </CardTitle>
                                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                                    INCEPTION & INSPIRATION
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                            আমাদের এই যৌথ যাত্রার শুরু হয় বন্ধুদের ছোট ছোট সঞ্চয়কে একত্রিত করে একটি শক্তিশালী ফান্ড তৈরি করার লক্ষ্য থেকে। উদ্যোক্তা <span className="text-[#D4AF37] font-bold">ওমর হিশাম জুয়েল</span> এবং <span className="text-[#D4AF37] font-bold">বেলাল হোসেন রাতুল</span>-এর তত্ত্বাবধানে সমমনা বন্ধুদের নিয়ে এই উদ্যোগের ভিত্তিপ্রস্তর স্থাপিত হয়।
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div variants={milestoneVariants} className="relative group">
                                {/* Timeline Indicator Dot */}
                                <div className="absolute -left-[27px] md:-left-[35px] top-5 size-5 rounded-full border-[3px] border-white dark:border-[#071322] bg-[#D4AF37] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(212,175,55,0.3)] z-10" />

                                <Card className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl relative rounded-2xl overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <CardHeader className="pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#D4AF37]">
                                                <Clock className="size-4.5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                                    মূল ভিত্তি ও অঙ্গীকার
                                                </CardTitle>
                                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                                    FOUNDATION & COMMITMENT
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                            KM09 Capital-এর কার্যক্রম পারস্পরিক বিশ্বাস এবং ঐকমত্যের ওপর প্রতিষ্ঠিত। আমরা শুরু থেকেই প্রতিটি লেনদেনে <span className="text-[#D4AF37] font-bold">স্বচ্ছতা</span> এবং নির্ধারিত সময়ে জমা দেওয়ার <span className="text-[#D4AF37] font-bold">কঠোর আর্থিক শৃঙ্খলা</span> বজায় রাখার নীতি গ্রহণ করেছি।
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div variants={milestoneVariants} className="relative group">
                                {/* Timeline Indicator Dot */}
                                <div className="absolute -left-[27px] md:-left-[35px] top-5 size-5 rounded-full border-[3px] border-white dark:border-[#071322] bg-[#D4AF37] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(212,175,55,0.3)] z-10" />

                                <Card className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl relative rounded-2xl overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <CardHeader className="pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#D4AF37]">
                                                <Goal className="size-4.5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                                    ধারাবাহিক যাত্রার রূপরেখা
                                                </CardTitle>
                                                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                                    ROADMAP OF OUR JOURNEY
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                            আমাদের এই উদ্যোগ একটি সুনির্দিষ্ট <span className="text-[#D4AF37] font-bold">৩-বছরের লক্ষ্যমাত্রাকে</span> সামনে রেখে পরিচালিত হচ্ছে। প্রতি মাসে <span className="text-[#D4AF37] font-bold">১০,০০০ টাকা</span> জমার এই ধারাবাহিক সঞ্চয়ই ধীরে ধীরে আমাদের ভবিষ্যতের বড় ব্যবসায়িক মূলধন তৈরি করছে।
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HistoryBackground;