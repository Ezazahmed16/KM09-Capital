import { Link } from "react-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Logo from '@/../public/Logo.png';

export default function TopNavbar() {
    return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b-[6px] border-[#0f172a] shadow-sm transition-all duration-300">
        {/* max-w-7xl ensures the content doesn't stretch too wide on huge screens */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">

                {/* 1. LOGO SECTION */}
                <div className="flex items-start gap-3">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={Logo} alt="Logo" className="h-36 w-auto" />
                    </Link>
                </div>

                {/* 2. CENTER NAVIGATION MENU */}
                <div className="hidden lg:block">
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-2 xl:gap-6">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-base font-bold text-slate-700 hover:text-slate-900 bg-transparent hover:bg-slate-100`}>
                                    <Link to="/">হোম</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-base font-bold text-slate-700 hover:text-slate-900 bg-transparent hover:bg-slate-100`}>
                                    <Link to="/about">আমাদের কথা</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-base font-bold text-slate-700 hover:text-slate-900 bg-transparent hover:bg-slate-100`}>
                                    <Link to="/policies">মিশন ও নিয়মাবলী</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-base font-bold text-slate-700 hover:text-slate-900 bg-transparent hover:bg-slate-100`}>
                                    <Link to="/contact">যোগাযোগ</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* 3. RIGHT ACTION BUTTONS */}
                <div className="hidden lg:flex items-center gap-6">
                    <Link
                        to="/login"
                        className="text-base font-bold text-slate-800 hover:text-slate-600 transition-colors"
                    >
                        লগইন
                    </Link>

                    {/* Custom Golden Button */}
                    <Link
                        to="/register"
                        className="rounded bg-[#BA9853] px-6 py-2.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#b38526]"
                    >
                        নিবন্ধন
                    </Link>
                </div>

                {/* MOBILE HAMBURGER MENU (Visible only on small screens) */}
                <div className="flex items-center lg:hidden">
                    <button className="text-slate-900 p-2">
                        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    </header>
);
}