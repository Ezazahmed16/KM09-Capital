import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, LayoutDashboard, LogIn, UserPlus } from "lucide-react";
import Logo from '@/../public/Logo.png';
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { useAuth } from "@/providers/auth-context";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "হোম", path: "/" },
    { label: "আমাদের গল্প", path: "/about" },
    { label: "সকল সদস্যবৃন্দ", path: "/allmembers" },
    { label: "গ্যালারি", path: "/gallery" },
    { label: "কার্যক্রম ও নিয়মাবলী", path: "/policies" },
    { label: "যোগাযোগ", path: "/contact" },
    { label: "ব্লগ", path: "/blog" },
];

export default function TopNavbar() {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check scroll state initially

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await signOut();
        navigate("/");
    };

    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-2 sm:top-3 md:top-4 left-0 right-0 z-50 px-2 sm:px-4 md:px-6 w-full pointer-events-none"
        >
            {/* Full-width Glassmorphic Animated Capsule Bar */}
            <motion.div
                animate={{
                    borderColor: isScrolled
                        ? "rgba(186, 152, 83, 0.4)"
                        : "rgba(148, 163, 184, 0.2)",
                    boxShadow: isScrolled
                        ? "0 20px 30px -10px rgba(0, 0, 0, 0.2), 0 0 25px rgba(186, 152, 83, 0.15)"
                        : "0 8px 20px -5px rgba(0, 0, 0, 0.05)",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={cn(
                    "w-full rounded-full transition-all duration-500 ease-in-out pointer-events-auto border flex items-center justify-between shadow-lg",
                    isScrolled
                        ? "bg-white/85 dark:bg-[#071322]/85 backdrop-blur-xl py-2 px-3 sm:px-6 md:px-8"
                        : "bg-white/95 dark:bg-[#071322]/75 backdrop-blur-md py-2.5 px-4 sm:px-7 md:px-9"
                )}
            >
                {/* 1. LOGO SECTION */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <motion.img
                            src={Logo}
                            alt="Logo"
                            className={cn(
                                "w-auto filter dark:invert transition-all duration-300",
                                isScrolled ? "h-10 sm:h-12 md:h-13" : "h-12 sm:h-14 md:h-16"
                            )}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                        />
                    </Link>
                </div>

                {/* 2. CENTER NAVIGATION MENU (Full Width & Reduced Text Size) */}
                <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5 relative h-full">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "text-xs xl:text-sm font-bold transition-all duration-300 relative py-1.5 px-3 xl:px-4 rounded-full flex items-center justify-center tracking-tight",
                                isActive(item.path)
                                    ? "text-[#BA9853] dark:text-[#BA9853]"
                                    : "text-slate-800 dark:text-slate-200 hover:text-[#BA9853] dark:hover:text-[#BA9853]"
                            )}
                        >
                            <span className="relative z-10">{item.label}</span>
                            {isActive(item.path) && (
                                <motion.span
                                    layoutId="activeNavIndicator"
                                    className="absolute inset-0 bg-[#BA9853]/12 dark:bg-[#BA9853]/20 rounded-full border border-[#BA9853]/30 z-0"
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* 3. RIGHT ACTION BUTTONS (Desktop only - Compact Text Size) */}
                <div className="hidden lg:flex items-center gap-2.5">
                    <ThemeToggle className="border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 size-8" />

                    {loading ? (
                        <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-full" />
                    ) : user ? (
                        <>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/dashboard"
                                    className="text-xs xl:text-sm font-bold text-slate-900 dark:text-slate-200 hover:text-[#BA9853] dark:hover:text-[#BA9853] transition-colors py-1.5 px-3 rounded-full"
                                >
                                    ড্যাশবোর্ড
                                </Link>
                            </motion.div>

                            <motion.button
                                onClick={handleLogout}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full border border-red-500/40 text-red-500 hover:bg-red-500/10 px-4 py-1.5 text-xs xl:text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1"
                            >
                                <LogOut className="size-3.5" />
                                <span>লগআউট</span>
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/login"
                                    className="text-xs xl:text-sm font-bold text-slate-900 dark:text-slate-200 hover:text-[#BA9853] dark:hover:text-[#BA9853] transition-colors py-1.5 px-3 rounded-full"
                                >
                                    লগইন
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.04, boxShadow: "0px 4px 15px rgba(186, 152, 83, 0.4)" }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <Link
                                    to="/register"
                                    className="rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8A2E] hover:from-[#E5C048] hover:to-[#BB9B3D] px-4 xl:px-5 py-1.5 text-xs xl:text-sm font-extrabold text-slate-950 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5"
                                >
                                    <UserPlus className="size-3.5" />
                                    <span>নিবন্ধন</span>
                                </Link>
                            </motion.div>
                        </>
                    )}
                </div>

                {/* 4. MOBILE INTERFACE (Theme toggle and Hamburger Sheet) */}
                <div className="flex items-center gap-2 lg:hidden">
                    <ThemeToggle className="border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 size-8" />

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer rounded-full size-8"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[300px] sm:w-[350px] flex flex-col justify-between p-6 bg-white dark:bg-[#071322] border-l border-slate-200 dark:border-slate-800"
                        >
                            <div>
                                <SheetHeader className="text-left border-b border-slate-100 dark:border-slate-900 py-4">
                                    <SheetTitle className="flex items-center">
                                        <img
                                            src={Logo}
                                            alt="Logo"
                                            className="h-14 w-auto filter dark:invert"
                                        />
                                        <span className="sr-only">KM09 Capital</span>
                                    </SheetTitle>
                                </SheetHeader>

                                <nav className="flex flex-col gap-1.5 py-6">
                                    {navItems.map((item) => (
                                        <SheetClose asChild key={item.path}>
                                            <Link
                                                to={item.path}
                                                className={cn(
                                                    "flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all",
                                                    isActive(item.path)
                                                        ? "bg-[#BA9853]/15 text-[#BA9853]"
                                                        : "text-slate-900 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </div>

                            <div className="border-t border-slate-100 dark:border-slate-900 pt-6 flex flex-col gap-3">
                                {loading ? (
                                    <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />
                                ) : user ? (
                                    <>
                                        <SheetClose asChild>
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                            >
                                                <LayoutDashboard className="size-4" />
                                                ড্যাশবোর্ড
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer w-full"
                                            >
                                                <LogOut className="size-4" />
                                                লগআউট
                                            </button>
                                        </SheetClose>
                                    </>
                                ) : (
                                    <>
                                        <SheetClose asChild>
                                            <Link
                                                to="/login"
                                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                            >
                                                <LogIn className="size-4" />
                                                লগইন
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link
                                                to="/register"
                                                className="flex items-center justify-center gap-2 rounded-xl bg-[#BA9853] hover:bg-[#A3813F] px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors text-center shadow-sm"
                                            >
                                                <UserPlus className="size-4" />
                                                নিবন্ধন
                                            </Link>
                                        </SheetClose>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </motion.div>
        </motion.header>
    );
}