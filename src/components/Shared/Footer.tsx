import { Link } from "react-router";
import { Facebook, Instagram, Mail, MessageCircle, ChevronRight } from "lucide-react";
import Logo from '@/../public/Logo.png';

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
        { icon: MessageCircle, path: "https://wa.me/xxxxxx", label: "WhatsApp" },
    ];

    return (
        <footer className="bg-[#0b1624] text-slate-300 border-t border-slate-800/80 relative overflow-hidden transition-colors duration-300">
            {/* Glowing ambient light */}
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#BA9853]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-8 py-16 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* Column 1: Logo, Description & Social Links */}
                    <div className="md:col-span-6 flex flex-col items-start gap-5">
                        <Link to="/" className="flex items-center">
                            <img
                                src={Logo}
                                alt="KM09 Capital Logo"
                                className="h-16 w-auto filter dark:invert hover:opacity-90 transition-opacity duration-300"
                            />
                        </Link>
                        
                        <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-md">
                            KM09 CAPITAL — সম্মিলিত সঞ্চয় ও শৃঙ্খলার মাধ্যমে আগামী দিনের বিশাল জয়ের পথে। স্বচ্ছতা, দায়বদ্ধতা ও যৌথ উন্নয়নই আমাদের মূলধন।
                        </p>

                        {/* Social Media icons */}
                        <div className="flex gap-3 mt-2">
                            {socialLinks.map((social, idx) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#BA9853] hover:border-[#BA9853]/40 hover:scale-105 transition-all duration-300 shadow-md"
                                    >
                                        <IconComponent className="size-4.5 stroke-[1.8]" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 2: Pages Quicklinks */}
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
                <div className="mt-12 pt-8 border-t border-slate-800/40 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-medium">
                    <span className="text-center md:text-left">
                        © 2026 KM09 CAPITAL. সর্বস্বত্ব সংরক্ষিত।
                    </span>
                    <p className="text-center md:text-right max-w-xl leading-relaxed text-slate-500">
                        আইনি বিজ্ঞপ্তি: এই প্ল্যাটফর্মটি একটি বন্ধ সদস্যভিত্তিক সঞ্চয় উদ্যোগ। কোনো বিনিয়োগ পরামর্শ বা ব্যাংকিং সেবা প্রদান করা হয় না।
                    </p>
                </div>
            </div>
        </footer>
    );
}
