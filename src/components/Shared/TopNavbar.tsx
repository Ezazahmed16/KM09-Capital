import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
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
    { label: "আমাদের কথা", path: "/about" },
    { label: "মিশন ও নিয়মাবলী", path: "/policies" },
    { label: "যোগাযোগ", path: "/contact" },
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
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-outpy",
                isScrolled
                    ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-md border-slate-200/40 dark:border-slate-800/40 h-18"
                    : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-none h-26"
            )}
        >
            <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8 h-full">
                <div className="flex h-full items-center justify-between">

                    {/* 1. LOGO SECTION */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                src={Logo}
                                alt="Logo"
                                className={cn(
                                    "w-auto filter dark:invert transition-all duration-300",
                                    isScrolled ? "h-20 lg:h-24" : "h-28 lg:h-32"
                                )}
                            />
                        </Link>
                    </div>

                    {/* 2. CENTER NAVIGATION MENU (Desktop only) */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "text-base font-bold transition-all duration-200 relative py-1 hover:text-[#BA9853] dark:hover:text-[#BA9853]",
                                    isActive(item.path)
                                        ? "text-[#BA9853] dark:text-[#BA9853] font-extrabold"
                                        : "text-slate-700 dark:text-slate-300"
                                )}
                            >
                                {item.label}
                                {isActive(item.path) && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#BA9853] rounded-full animate-in fade-in duration-300" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* 3. RIGHT ACTION BUTTONS (Desktop only) */}
                    <div className="hidden lg:flex items-center gap-4">
                        <ThemeToggle />

                        {loading ? (
                            <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-full" />
                        ) : user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-base font-bold text-slate-700 dark:text-slate-300 hover:text-[#BA9853] dark:hover:text-[#BA9853] transition-colors"
                                >
                                    ড্যাশবোর্ড
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="rounded-full bg-red-600 hover:bg-red-700 px-5 py-2 text-sm font-bold text-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                                >
                                    <LogOut className="size-4" />
                                    লগআউট
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-base font-bold text-slate-700 dark:text-slate-300 hover:text-[#BA9853] dark:hover:text-[#BA9853] transition-colors"
                                >
                                    লগইন
                                </Link>

                                <Link
                                    to="/register"
                                    className="rounded-full bg-[#BA9853] hover:bg-[#A3813F] px-6 py-2 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    নিবন্ধন
                                </Link>
                            </>
                        )}
                    </div>

                    {/* 4. MOBILE INTERFACE (Theme toggle and Hamburger Sheet) */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <ThemeToggle />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                                >
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[300px] sm:w-[350px] flex flex-col justify-between p-6 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800"
                            >
                                <div>
                                    <SheetHeader className="text-left border-b border-slate-100 dark:border-slate-900 py-4">
                                        <SheetTitle className="flex items-center">
                                            <img
                                                src={Logo}
                                                alt="Logo"
                                                className="h-16 w-auto filter dark:invert"
                                            />
                                            <span className="sr-only">KM09 Capital</span>
                                        </SheetTitle>
                                    </SheetHeader>

                                    <nav className="flex flex-col gap-2 py-6">
                                        {navItems.map((item) => (
                                            <SheetClose asChild key={item.path}>
                                                <Link
                                                    to={item.path}
                                                    className={cn(
                                                        "flex items-center px-4 py-3 rounded-xl text-base font-bold transition-all",
                                                        isActive(item.path)
                                                            ? "bg-[#BA9853]/10 text-[#BA9853]"
                                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                                                    )}
                                                >
                                                    {item.label}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                </div>

                                <div className="border-t border-slate-100 dark:border-slate-900 pt-6 flex flex-col gap-4">
                                    {loading ? (
                                        <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />
                                    ) : user ? (
                                        <>
                                            <SheetClose asChild>
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3 text-base font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                                >
                                                    <LayoutDashboard className="size-4" />
                                                    ড্যাশবোর্ড
                                                </Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-3 text-base font-bold text-white transition-colors cursor-pointer w-full"
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
                                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3 text-base font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                                >
                                                    <LogIn className="size-4" />
                                                    লগইন
                                                </Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link
                                                    to="/register"
                                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#BA9853] hover:bg-[#A3813F] px-4 py-3 text-base font-bold text-white transition-colors text-center shadow-sm"
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

                </div>
            </div>
        </header>
    );
}