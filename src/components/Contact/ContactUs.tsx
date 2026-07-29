import { motion } from "framer-motion";
import { Phone, Mail, Users, Send, BellRing } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 85,
                damping: 13,
            },
        },
    };

    const handleSubmitContact = (e: React.FormEvent) => {
        e.preventDefault();
        // Contact submission logic (simulated)
    };

    const handleSubmitSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Newsletter subscription logic (simulated)
    };

    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-slate-50 dark:bg-[#020817] text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-900/80 transition-colors duration-300">
            {/* Subtle Glowing Radial Background Highlight in Dark Mode */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#BA9853]/5 rounded-full blur-[140px] pointer-events-none hidden dark:block" />

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
                <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
                >
                    {/* kicker badge */}
                    <Badge 
                        variant="outline"
                        className="border-[#D4AF37]/50 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#D4AF37] tracking-widest uppercase mb-4 shadow-sm"
                    >
                        যোগাযোগ
                    </Badge>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                        আমাদের সাথে <span className="text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]">যুক্ত হোন</span>।
                    </h2>

                    {/* Tagline */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-semibold max-w-2xl">
                        যেকোনো জিজ্ঞাসা, পার্টনারশিপ বা ফান্ডের বিস্তারিত তথ্য জানতে আমাদের সাথে সরাসরি যোগাযোগ করুন।
                    </p>
                </motion.div>

                {/* Top Section Split Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch mb-16">
                    
                    {/* Left: Contact Form Column (Spans 8/12 on lg) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 13 }}
                        className="lg:col-span-8 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-sm dark:shadow-2xl flex flex-col justify-between"
                    >
                        <form onSubmit={handleSubmitContact} className="space-y-6">
                            {/* Row 1: Full Name */}
                            <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                                    সম্পূর্ণ নাম
                                </label>
                                <Input 
                                    type="text" 
                                    placeholder="আপনার নাম লিখুন" 
                                    required
                                    className="bg-slate-100/70 dark:bg-slate-800/40 border-0 focus-visible:ring-1 focus-visible:ring-[#D4AF37]/50 rounded-xl px-4 py-6 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-inner"
                                />
                            </div>

                            {/* Row 2: Email & Phone Split */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                                        ইমেইল
                                    </label>
                                    <Input 
                                        type="email" 
                                        placeholder="আপনার ইমেইল" 
                                        required
                                        className="bg-slate-100/70 dark:bg-slate-800/40 border-0 focus-visible:ring-1 focus-visible:ring-[#D4AF37]/50 rounded-xl px-4 py-6 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-inner"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                                        ফোন নম্বর
                                    </label>
                                    <Input 
                                        type="tel" 
                                        placeholder="ফোন নম্বর" 
                                        required
                                        className="bg-slate-100/70 dark:bg-slate-800/40 border-0 focus-visible:ring-1 focus-visible:ring-[#D4AF37]/50 rounded-xl px-4 py-6 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-inner"
                                    />
                                </div>
                            </div>

                            {/* Row 3: Textarea Assistance */}
                            <div className="space-y-2">
                                <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                                    আপনি কীভাবে আমাদের সাহায্য পেতে পারেন?
                                </label>
                                <Textarea 
                                    rows={4}
                                    placeholder="আপনার বার্তা বা জিজ্ঞাসা এখানে লিখুন..."
                                    required
                                    className="bg-slate-100/70 dark:bg-slate-800/40 border-0 focus-visible:ring-1 focus-visible:ring-[#D4AF37]/50 rounded-xl p-4 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-inner resize-none leading-relaxed"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full sm:w-auto bg-[#BA9853] hover:bg-[#A3813F] text-slate-950 font-bold px-8 py-5 rounded-xl shadow-lg hover:shadow-[#BA9853]/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                বার্তা পাঠান
                                <Send className="size-4 stroke-[2.2]" />
                            </Button>
                        </form>
                    </motion.div>

                    {/* Right: Highlight Subscription Card (Spans 4/12 on lg) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 13, delay: 0.15 }}
                        className="lg:col-span-4"
                    >
                        <Card className="bg-[#0b1e33] dark:bg-slate-900/60 border border-[#D4AF37]/35 text-white rounded-3xl p-8 flex flex-col justify-between h-full relative group overflow-hidden shadow-xl dark:shadow-2xl">
                            {/* Radial Glow lines within card */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/15 transition-colors duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="space-y-6">
                                <div className="size-11 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center text-[#D4AF37] shadow-inner mb-2">
                                    <BellRing className="size-5 stroke-[1.8] animate-pulse" />
                                </div>

                                <div className="space-y-2">
                                    <CardTitle className="text-xl md:text-2xl font-black text-white tracking-tight">
                                        KM09 Capital আপডেট পান
                                    </CardTitle>
                                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                        নতুন বিনিয়োগ বা ব্যবসায়িক উদ্যোগের সর্বশেষ খবরাখবর জানতে আপনার ইমেইল যুক্ত করুন।
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmitSubscribe} className="space-y-4 mt-8">
                                <Input 
                                    type="email" 
                                    placeholder="আপনার ইমেইল ঠিকানা" 
                                    required
                                    className="bg-slate-950/80 border border-slate-800/80 focus-visible:ring-1 focus-visible:ring-[#D4AF37]/50 rounded-xl px-4 py-5 text-white placeholder:text-slate-500 shadow-inner"
                                />
                                <Button 
                                    type="submit" 
                                    className="w-full bg-[#D4AF37] hover:bg-[#Bfa032] text-slate-950 font-bold py-5 rounded-xl shadow-md transition-colors duration-300 cursor-pointer"
                                >
                                    সাবস্ক্রাইব
                                </Button>
                            </form>
                        </Card>
                    </motion.div>

                </div>

                {/* Bottom Section: 3-Column Info Cards */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
                >
                    {/* Card 1: Phone */}
                    <motion.div variants={cardVariants} whileHover={{ y: -6, transition: { duration: 0.3 } }} className="h-full">
                        <Card className="h-full bg-white dark:bg-slate-900/30 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-sm hover:shadow-xl rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="space-y-4">
                                <div className="size-9 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform duration-300 shadow-inner">
                                    <Phone className="size-4.5 stroke-[1.8]" />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                        হেল্পলাইন
                                    </CardTitle>
                                    <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                        HELPLINE PHONE
                                    </span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold tracking-normal leading-relaxed">
                                    <span className="text-[#D4AF37]">+880 1718 361010</span> (Juel) <br />
                                    <span className="text-[#D4AF37]">+880 1715 558282</span> (Ratul)
                                </p>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-medium border-t border-slate-100 dark:border-slate-900/80 pt-4 mt-4">
                                Available for WhatsApp & direct calls.
                            </p>
                        </Card>
                    </motion.div>

                    {/* Card 2: Email */}
                    <motion.div variants={cardVariants} whileHover={{ y: -6, transition: { duration: 0.3 } }} className="h-full">
                        <Card className="h-full bg-white dark:bg-slate-900/30 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-sm hover:shadow-xl rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="space-y-4">
                                <div className="size-9 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform duration-300 shadow-inner">
                                    <Mail className="size-4.5 stroke-[1.8]" />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                        ইমেইল
                                    </CardTitle>
                                    <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                        EMAIL SUPPORT
                                    </span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold tracking-normal leading-relaxed text-wrap">
                                    <a href="mailto:km09capital@gmail.com" className="hover:text-[#D4AF37] transition-colors break-all">
                                        km09capital@gmail.com
                                    </a>
                                </p>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-medium border-t border-slate-100 dark:border-slate-900/80 pt-4 mt-4">
                                Drop us an email anytime. We typically reply within 24 hours.
                            </p>
                        </Card>
                    </motion.div>

                    {/* Card 3: Management */}
                    <motion.div variants={cardVariants} whileHover={{ y: -6, transition: { duration: 0.3 } }} className="h-full">
                        <Card className="h-full bg-white dark:bg-slate-900/30 backdrop-blur-xl border border-slate-200 dark:border-slate-850 hover:border-[#D4AF37]/45 dark:hover:border-[#D4AF37]/35 transition-all duration-300 shadow-sm hover:shadow-xl rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="space-y-4">
                                <div className="size-9 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform duration-300 shadow-inner">
                                    <Users className="size-4.5 stroke-[1.8]" />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                        ব্যবস্থাপনা
                                    </CardTitle>
                                    <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                                        GOVERNING BODY
                                    </span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold tracking-normal leading-relaxed">
                                    Managed by: <br />
                                    <span className="text-[#D4AF37]">Omar Hisham Juel</span> & <br />
                                    <span className="text-[#D4AF37]">Belal Hossain Ratul</span>
                                </p>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-medium border-t border-slate-100 dark:border-slate-900/80 pt-4 mt-4">
                                Founders & Lead Organizers.
                            </p>
                        </Card>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default ContactUs;