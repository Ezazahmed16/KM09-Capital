import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Mail, Phone, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_MEN_AVATAR } from "@/components/Shared/upload/upload-widget";

export interface TeamMemberSocial {
    type: "email" | "phone" | "facebook";
    href: string;
}

export interface TeamMember {
    id: string;
    name: string;
    batch: string;
    role: string;
    image: string;
    socials: TeamMemberSocial[];
}

const defaultMembers: TeamMember[] = [
    {
        id: "U1",
        name: "ওমর হিশাম জুয়েল",
        batch: "কে এম ০৯ ব্যাচ",
        role: "Founder | Account Holder",
        image: "/Members/U1.jpeg",
        socials: [
            { type: "email", href: "mailto:russell@km09capital.com" },
            { type: "phone", href: "tel:+8801700000000" },
            { type: "facebook", href: "https://facebook.com" },
        ],
    },
    {
        id: "U2",
        name: "বিল্লাল হোসেন রাতুল",
        batch: "কে এম ০৯ ব্যাচ",
        role: "Founder | Account Holder",
        image: "/Members/U2.jpeg",
        socials: [
            { type: "email", href: "mailto:russell@km09capital.com" },
            { type: "phone", href: "tel:+8801700000000" },
            { type: "facebook", href: "https://facebook.com" },
        ],
    },
    {
        id: "U3",
        name: "রুম্মান আহম্মেদ",
        batch: "কে এম ০৯ ব্যাচ",
        role: "Account Holder",
        image: "/Members/U6.jpeg",
        socials: [
            { type: "email", href: "mailto:russell@km09capital.com" },
            { type: "phone", href: "tel:+8801700000000" },
            { type: "facebook", href: "https://facebook.com" },
        ],
    },
    {
        id: "U4",
        name: "মুহাম্মাদ রাজু",
        batch: "কে এম ০৯ ব্যাচ",
        role: "Account Holder",
        image: "/Members/U5.jpeg",
        socials: [
            { type: "email", href: "mailto:russell@km09capital.com" },
            { type: "phone", href: "tel:+8801700000000" },
            { type: "facebook", href: "https://facebook.com" },
        ],
    },
    {
        id: "U5",
        name: "সাদ্দাম ফরাজি",
        batch: "কে এম ০৯ ব্যাচ",
        role: "supervisor",
        image: "/Members/U3.jpeg",
        socials: [
            { type: "email", href: "mailto:russell@km09capital.com" },
            { type: "phone", href: "tel:+8801700000000" },
            { type: "facebook", href: "https://facebook.com" },
        ],
    },
    {
        id: "U6",
        name: "শাহজালাল বাবু",
        batch: "কে এম ০৯ ব্যাচ",
        role: "supervisor",
        image: "/Members/U4.jpeg",
        socials: [
            { type: "email", href: "mailto:russell@km09capital.com" },
            { type: "phone", href: "tel:+8801700000000" },
            { type: "facebook", href: "https://facebook.com" },
        ],
    }
];

export default function TeamSection() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelectedId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="py-20 md:py-28 bg-slate-50/30 dark:bg-[#071322]/40 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

                {/* Header Row */}
                <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                    <div>
                        <span className="text-[#BA9853] text-sm font-extrabold uppercase tracking-widest block mb-2">
                            আমাদের নেতৃত্ব
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
                            নেতৃত্ব ও পরিচালনা পরিষদ
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                            Leadership & Governing Board of KM09 CAPITAL
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            aria-label="Previous"
                            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#BA9853] dark:hover:text-[#BA9853] hover:border-[#BA9853]/40 dark:hover:border-[#BA9853]/40 transition-colors duration-300 cursor-pointer"
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                        <button
                            aria-label="Next"
                            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#BA9853] dark:hover:text-[#BA9853] hover:border-[#BA9853]/40 dark:hover:border-[#BA9853]/40 transition-colors duration-300 cursor-pointer"
                        >
                            <ChevronRight className="size-5" />
                        </button>
                    </div>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
                    {defaultMembers.map((member) => (
                        <MemberCard
                            key={member.id}
                            member={member}
                            isSelected={selectedId === member.id}
                            onSelect={() => handleSelect(member.id)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

function MemberCard({
    member,
    isSelected,
    onSelect,
}: {
    member: TeamMember;
    isSelected: boolean;
    onSelect: () => void;
}) {
    return (
        <div
            onClick={onSelect}
            className="group flex flex-col gap-y-4 cursor-pointer select-none"
        >
            {/* Image Box */}
            <div className="relative overflow-hidden rounded-2xl max-w-[260px] sm:max-w-none mx-auto w-full aspect-[4/5] max-h-[280px] sm:max-h-none bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850/80 shadow-md">
                <img
                    src={member.image || DEFAULT_MEN_AVATAR}
                    alt={member.name}
                    className={cn(
                        "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
                        isSelected ? "grayscale" : "grayscale-0 group-hover:grayscale"
                    )}
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_MEN_AVATAR;
                    }}
                />

                {/* Hover Slide-up Social Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {member.socials.map((social, sIdx) => {
                            let SocialIcon = Mail;
                            if (social.type === "phone") SocialIcon = Phone;
                            if (social.type === "facebook") SocialIcon = Facebook;

                            return (
                                <a
                                    key={sIdx}
                                    href={social.href}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-[#BA9853] hover:border-[#BA9853]/50 hover:scale-105 transition-all duration-200"
                                    aria-label={`${member.name} ${social.type}`}
                                >
                                    <SocialIcon className="size-4" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Member Details */}
            <div className="flex items-start justify-between px-1">
                <div className="flex flex-col">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight group-hover:text-[#BA9853] transition-colors duration-300">
                        {member.name}
                    </h3>
                    {member.batch && (
                        <span className="text-[#BA9853] text-xs font-bold mt-0.5">
                            {member.batch}
                        </span>
                    )}
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mt-0.5">
                        {member.role}
                    </p>
                </div>

                {/* Arrow indicator */}
                <button
                    aria-label={`More info about ${member.name}`}
                    className="text-slate-400 dark:text-slate-500 group-hover:text-[#BA9853] mt-1 transition-colors duration-300 cursor-pointer"
                >
                    <ArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
            </div>
        </div>
    );
}
