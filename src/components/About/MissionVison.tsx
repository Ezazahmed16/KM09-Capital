import { motion } from "framer-motion";
import { Target, Compass, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MissionVison = () => {
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 80,
                damping: 12,
            },
        },
    };

    // Mission points
    const missionPoints = [
        "সব বন্ধুদের ছোট ছোট সঞ্চয়কে একত্রিত করে একটি শক্তিশালী ফান্ড তৈরি করা।",
        "এই ফান্ডের মূল উদ্দেশ্য হলো সদস্যদের নিয়মিত জমার মাধ্যমে একটি বড় মূলধন (Capital) তৈরি করা।",
        "পারস্পরিক বিশ্বাসের ওপর ভিত্তি করে কঠোর আর্থিক শৃঙ্খলা এবং স্বচ্ছতার সাথে এই উদ্যোগ পরিচালনা করা।"
    ];

    // Vision points
    const visionPoints = [
        "জমানো এই শক্তিশালী মূলধন দিয়ে ভবিষ্যতে বড় ও লাভজনক কোনো ব্যবসায়িক প্রতিষ্ঠান গড়ে তোলা।",
        "সকল সদস্যের সম্মিলিত সিদ্ধান্ত অনুযায়ী ফান্ডের টাকা লাভজনক কোনো ব্যবসা বা ইনভেস্টমেন্টে খাটানো।",
        "ভবিষ্যতে আমরা যেখানেই ইনভেস্ট করি না কেন, সেটির মালিকানা এবং লভ্যাংশ সবার জমাকৃত মূলধনের অনুপাত অনুযায়ী সমানভাবে বণ্টন করা।"
    ];

    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-slate-50 dark:bg-[#050d18] text-slate-900 dark:text-white border-t border-slate-100 dark:border-slate-900/80">
            {/* Glowing Background Radial Highlights (visible in dark theme) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#BA9853]/5 rounded-full blur-[120px] pointer-events-none hidden dark:block" />
            
            {/* Subtle Grid Pattern Overlay matching the overall site theme */}
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
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                >
                    {/* Left Column: Heading and Taglines */}
                    <motion.div 
                        variants={itemVariants} 
                        className="lg:col-span-5 flex flex-col items-start text-left"
                    >
                        {/* shadcn Badge for kicker subheading */}
                        <Badge 
                            variant="outline" 
                            className="border-[#D4AF37]/50 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#D4AF37] tracking-widest uppercase mb-6 shadow-sm"
                        >
                            আমাদের লক্ষ্য ও উদ্দেশ্য
                        </Badge>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight sm:leading-[1.25] tracking-tight mb-6">
                            আমাদের স্বপ্নের <span className="text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]">যৌথ যাত্রা</span>,
                            <br />
                            আগামী দিনের <span className="text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]">শক্ত মূলধন</span>।
                        </h2>

                        {/* Sub-heading / Tagline */}
                        <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg font-semibold leading-relaxed border-l-2 border-[#D4AF37] pl-4 italic">
                            আজকের <span className="text-[#D4AF37]">ছোট ছোট সঞ্চয়</span>, আগামী দিনের <span className="text-[#D4AF37]">বিশাল জয়</span>!
                        </p>
                    </motion.div>

                    {/* Right Column: Mission and Vision Cards */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                        {/* Card 1: Our Mission */}
                        <motion.div 
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="h-full"
                        >
                            <Card className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden relative group rounded-2xl">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <CardHeader className="pb-4">
                                    <div className="size-11 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                                        <Target className="size-5 text-[#D4AF37] stroke-[1.8]" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        আমাদের লক্ষ্য
                                    </CardTitle>
                                    <span className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest block">
                                        OUR MISSION
                                    </span>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <ul className="space-y-4">
                                        {missionPoints.map((point, index) => (
                                            <li key={index} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                                <CheckCircle2 className="size-4 text-[#D4AF37] shrink-0 mt-0.5" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Card 2: Our Vision */}
                        <motion.div 
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="h-full"
                        >
                            <Card className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden relative group rounded-2xl">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <CardHeader className="pb-4">
                                    <div className="size-11 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                                        <Compass className="size-5 text-[#D4AF37] stroke-[1.8]" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        আমাদের উদ্দেশ্য
                                    </CardTitle>
                                    <span className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest block">
                                        OUR VISION
                                    </span>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <ul className="space-y-4">
                                        {visionPoints.map((point, index) => (
                                            <li key={index} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                                <CheckCircle2 className="size-4 text-[#D4AF37] shrink-0 mt-0.5" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MissionVison;