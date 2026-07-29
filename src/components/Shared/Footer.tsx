import { Link } from "react-router";
import { Facebook, Instagram, Mail, MessageCircle, ChevronRight } from "lucide-react";
import Logo from '@/../public/Logo-w.png';

export default function Footer() {
    const pageLinks = [
        { label: "হোম", path: "/" },
        { label: "আমাদের কথা", path: "/about" },
        { label: "মিশন ও নিয়মাবলী", path: "/policies" },
        { label: "যোগাযোগ", path: "/contact" },
    ];

    const portalLinks = [
        { label: "সদস্য লগইন", path: "/login" },
        { label: "নিবন্ধন করুন", path: "/register" },
        { label: "ড্যাশবোর্ড", path: "/dashboard" },
    ];

    const socialLinks = [
        { icon: Facebook, path: "https://facebook.com", label: "Facebook" },
        { icon: Instagram, path: "https://instagram.com", label: "Instagram" },
        { icon: Mail, path: "mailto:info@km09capital.com", label: "Email" },
        { icon: MessageCircle, path: "https://wa.me/8801329570482", label: "WhatsApp" },
    ];

    return (
        <footer className="bg-[#0b1624] text-slate-300 border-t border-slate-800/80 relative overflow-hidden transition-colors duration-300">
            {/* Glowing ambient light */}
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#BA9853]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                    {/* Column 1: Brand Info */}
                    <div className="md:col-span-6 flex flex-col gap-5">
                        <Link to="/" className="inline-block">
                            <img
                                src={Logo}
                                alt="KM09 CAPITAL Logo"
                                className="h-12 sm:h-14 w-auto filter dark:invert"
                            />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-md font-normal">
                            KM09 CAPITAL একটি বিশ্বস্ত বন্ধ সামাজিক সঞ্চয় উদ্যোগ। আমাদের লক্ষ্য সদস্যদের মূলধন বৃদ্ধি, স্বচ্ছ ব্যবস্থাপনা এবং নিরাপদ আর্থিক ভবিষ্যৎ নিশ্চিত করা।
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={item.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.label}
                                        className="size-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-[#BA9853] hover:border-[#BA9853]/50 hover:bg-slate-800/50 transition-all duration-300"
                                    >
                                        <Icon className="size-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 2: Page Links */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <h4 className="text-[#BA9853] text-sm font-bold tracking-wider uppercase">
                            পেজসমূহ
                        </h4>
                        <ul className="flex flex-col gap-3 text-sm font-semibold">
                            {pageLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={link.path}
                                        className="inline-flex items-center gap-1 group text-slate-400 hover:text-[#BA9853] hover:translate-x-1.5 transition-all duration-300"
                                    >
                                        <ChevronRight className="size-3.5 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#BA9853]" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Portal Quicklinks */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <h4 className="text-[#BA9853] text-sm font-bold tracking-wider uppercase">
                            পোর্টাল
                        </h4>
                        <ul className="flex flex-col gap-3 text-sm font-semibold">
                            {portalLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={link.path}
                                        className="inline-flex items-center gap-1 group text-slate-400 hover:text-[#BA9853] hover:translate-x-1.5 transition-all duration-300"
                                    >
                                        <ChevronRight className="size-3.5 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#BA9853]" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Subfooter */}
                <div className="mt-12 pt-8 border-t border-slate-800/40 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-medium">
                    <div className="flex flex-col gap-1 text-center lg:text-left">
                        <span>© 2026 KM09 CAPITAL. সর্বস্বত্ব সংরক্ষিত।</span>
                        <p className="max-w-xl text-[11px] leading-relaxed text-slate-500">
                            আইনি বিজ্ঞপ্তি: এই প্ল্যাটফর্মটি একটি বন্ধ সদস্যভিত্তিক সঞ্চয় উদ্যোগ। কোনো বিনিয়োগ পরামর্শ বা ব্যাংকিং সেবা প্রদান করা হয় না।
                        </p>
                    </div>

                    {/* Developed By Section (Sleek Card View Design) */}
                    <div className="bg-gradient-to-br from-slate-900/95 via-[#0c1929] to-slate-900 border border-slate-800/90 hover:border-[#BA9853]/40 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300 group hover:shadow-2xl hover:shadow-[#BA9853]/5 shrink-0 w-full sm:w-auto">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-2">
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#BA9853] bg-[#BA9853]/10 px-2 py-0.5 rounded-md border border-[#BA9853]/20">
                                    Developed By
                                </span>
                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>

                            <a
                                href="https://wa.me/8801329570482"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-4 group/card"
                            >
                                <img
                                    src="/logo_full.png"
                                    alt="NexBot BD Logo"
                                    className="h-10 w-auto object-contain transition-transform group-hover/card:scale-105"
                                />

                                <div className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm">
                                    <MessageCircle className="size-3.5 fill-emerald-500 text-slate-950" />
                                    <span className="font-mono text-xs">+8801329570482</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
