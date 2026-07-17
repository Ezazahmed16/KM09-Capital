import { motion } from "framer-motion";
import { ShieldAlert, ChevronDown, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const PolicyDocument = () => {
    // Accordion Clauses data
    const clauses = [
        {
            value: "clause-1",
            title: "১. ফান্ডের উদ্দেশ্য ও লক্ষ্য",
            titleEnglish: "Fund Objectives & Goal",
            content: <>এই ফান্ডের মূল উদ্দেশ্য হলো সকল বন্ধুদের <span className="text-[#D4AF37] font-semibold">ছোট ছোট সঞ্চয়কে</span> একত্রিত করে একটি <span className="text-[#D4AF37] font-semibold">বড় মূলধন (Capital)</span> তৈরি করা। এই জমানো টাকা পরবর্তীতে সকলের সিদ্ধান্ত অনুযায়ী <span className="text-[#D4AF37] font-semibold">লাভজনক কোনো ব্যবসা বা ইনভেস্টমেন্টে</span> খাটানো হবে।</>,
        },
        {
            value: "clause-2",
            title: "২. মাসিক চাঁদা, জমার নিয়ম, জরিমানা ও সদস্যপদ বাতিল",
            titleEnglish: "Monthly Installment, Dues, Fine & Cancellation",
            content: <>প্রত্যেক সদস্যকে প্রতি মাসে বাধ্যতামূলকভাবে <span className="text-[#D4AF37] font-semibold">১০,০০০/- টাকা</span> জমা দিতে হবে (১ থেকে ১০ তারিখের মধ্যে)। যৌক্তিক কারণ ছাড়া ১০ তারিখের মধ্যে জমা দিতে ব্যর্থ হলে পরবর্তী জমার সাথে <span className="text-[#D4AF37] font-semibold">৩০০/- টাকা</span> জরিমানা প্রদান করতে হবে। পরপর <span className="text-[#D4AF37] font-semibold">৩ মাস</span> জমা দিতে ব্যর্থ হলে সদস্যপদ স্বয়ংক্রিয়ভাবে বাতিল বলে গণ্য হতে পারে।</>,
        },
        {
            value: "clause-3",
            title: "৩. ব্যাংক অ্যাকাউন্ট ও আর্থিক পরিচালনা",
            titleEnglish: "Bank Account & Financial Operations",
            content: <>ফান্ডের সমস্ত লেনদেন "KM09 Capital"-এর নামে একটি নির্দিষ্ট <span className="text-[#D4AF37] font-semibold">ব্যাংক অ্যাকাউন্ট</span> বা বিশ্বস্ত উপায়ের মাধ্যমে পরিচালিত হবে। সিগনেটরি সদস্যদের <span className="text-[#D4AF37] font-semibold">যৌথ স্বাক্ষর</span> ছাড়া ফান্ড থেকে কোনো টাকা তোলা যাবে না। প্রতি মাসের ১০ তারিখের পর হিসাবের <span className="text-[#D4AF37] font-semibold">Statement</span> সকল সদস্যের সামনে প্রকাশ করতে হবে।</>,
        },
        {
            value: "clause-4",
            title: "৪. সিদ্ধান্ত গ্রহণ প্রক্রিয়া ও চূড়ান্ত ক্ষমতা",
            titleEnglish: "Decision Making Process & Ultimate Authority",
            content: <>যেকোনো সিদ্ধান্তে <span className="text-[#D4AF37] font-semibold">সংখ্যাগরিষ্ঠ সদস্যদের মতামতের</span> প্রতি পূর্ণ শ্রদ্ধা প্রদর্শন করা হবে। তবে ফান্ডের বৃহত্তর স্বার্থে, সঠিক দিকনির্দেশনা এবং ব্যবসায়িক স্থিতিশীলতা বজায় রাখতে <span className="text-[#D4AF37] font-semibold">উদ্যোক্তাদের (Founders) গৃহীত সিদ্ধান্তই চূড়ান্ত</span> ও সর্বসম্মত বলে গণ্য হবে।</>,
        },
        {
            value: "clause-5",
            title: "৫. লাভ-ক্ষতি বণ্টন",
            titleEnglish: "Profit-Loss Distribution",
            content: <>ভবিষ্যতে এই ফান্ড থেকে যে ব্যবসা বা বিনিয়োগ করা হবে, তার <span className="text-[#D4AF37] font-semibold">লাভ অথবা ক্ষতি</span> সকল সদস্যের মাঝে তাদের জমাকৃত মূলধনের <span className="text-[#D4AF37] font-semibold">অনুপাত (Ratio)</span> অনুযায়ী সমানভাবে বণ্টন করা হবে।</>,
        },
        {
            value: "clause-6",
            title: "৬. ফান্ড থেকে অব্যাহতি বা লিভ নেওয়ার নিয়ম",
            titleEnglish: "Leaving or Fund Exiting Policy",
            content: <>ফান্ড থেকে নাম প্রত্যাহার করতে চাইলে <span className="text-[#D4AF37] font-semibold">অন্তত ২ মাস আগে</span> গ্রুপে তা আলোচনা করতে হবে। সদস্যপদ বাতিলের ক্ষেত্রে <span className="text-[#D4AF37] font-semibold">আসল টাকা ফেরত দেওয়ার</span> প্রক্রিয়া গ্রুপের বাকি সদস্যদের আলোচনার মাধ্যমে নির্ধারিত হবে।</>,
        },
        {
            value: "clause-7",
            title: "৭. নীতিমালার পরিবর্তন",
            titleEnglish: "Amendment of Policies",
            content: <>ভবিষ্যতের প্রয়োজনে এই নীতিমালার যেকোনো ধারা পরিবর্তন বা পরিবর্ধন করার অধিকার সকল সদস্যের <span className="text-[#D4AF37] font-semibold">যৌথ আলোচনার</span> মাধ্যমে থাকবে। তবে ব্যবসায়িক স্থিতিশীলতা বজায় রাখতে <span className="text-[#D4AF37] font-semibold">উদ্যোক্তাদের (Founders) গৃহীত সিদ্ধান্তই চূড়ান্ত</span> বলে গণ্য হবে।</>,
        },
    ];

    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-white dark:bg-[#050d18] text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-900/80 transition-colors duration-300">

            {/* Top subtle radial gradient glow to anchor the section in dark mode */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#BA9853]/5 to-transparent rounded-full blur-[120px] pointer-events-none hidden dark:block" />

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

            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8">

                {/* Header Typography Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    {/* kicker badge */}
                    <Badge
                        variant="outline"
                        className="border-[#D4AF37]/50 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#D4AF37] tracking-widest uppercase mb-4 shadow-sm"
                    >
                        নীতিমালা
                    </Badge>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                        ফান্ডিং ও যৌথ উদ্যোগের <span className="text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]">নীতিমালা</span>
                    </h2>

                    {/* Tagline */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-semibold max-w-2xl">
                        আমরা, KM09 Capital-এর সকল সদস্য, পারস্পরিক বিশ্বাস ও ঐকমত্যের ভিত্তিতে ভবিষ্যতে একটি সফল ব্যবসায়িক প্রতিষ্ঠান গড়ার লক্ষ্যে এই শর্তাবলীতে একমত পোষণ করছি।
                    </p>
                </motion.div>

                {/* Special Clause Alert Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <Alert className="border-[#D4AF37]/45 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 text-slate-900 dark:text-slate-100 shadow-md">
                        <ShieldAlert className="size-5 text-[#D4AF37]" />
                        <AlertTitle className="text-sm font-extrabold text-[#D4AF37] tracking-wider uppercase">
                            বিশেষ শর্ত
                        </AlertTitle>
                        <AlertDescription className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mt-1 font-medium">
                            এই নীতিমালার বা চুক্তিনামার প্রতিটি পাতা একে অপরের সাথে অবিচ্ছেদ্যভাবে সংযুক্ত থাকবে এবং সম্পূর্ণ ডকুমেন্টের ধারাবাহিকতা বজায় রাখতে প্রতি পাতায় সকল সদস্যের স্বাক্ষর/টিপসই প্রযোজ্য হবে।
                        </AlertDescription>
                    </Alert>
                </motion.div>

                {/* Accordion List for the 7 legal clauses */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {clauses.map((clause, idx) => (
                            <AccordionItem
                                key={idx}
                                value={clause.value}
                                className="border border-slate-200 dark:border-slate-850 rounded-xl px-5 bg-white dark:bg-slate-900/30 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 transition-colors duration-300"
                            >
                                <AccordionTrigger className="text-[#D4AF37] hover:text-[#D4AF37]/80 hover:no-underline font-bold text-sm sm:text-base leading-snug flex items-center justify-between py-5 cursor-pointer w-full text-left">
                                    <div className="flex flex-col gap-1 pr-4">
                                        <span>{clause.title}</span>
                                        <span className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider block font-sans">
                                            {clause.titleEnglish}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm pt-2 pb-5 font-medium border-t border-slate-100 dark:border-slate-900/80">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="size-4 text-[#D4AF37] shrink-0 mt-0.5" />
                                        <p>{clause.content}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
};

export default PolicyDocument;