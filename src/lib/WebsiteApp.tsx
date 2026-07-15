import { Outlet } from "react-router";
import TopNavbar from "@/components/Shared/TopNavbar.tsx";

export default function WebsiteApp() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">

            {/* 1. TOP NAVBAR */}
            <TopNavbar />

            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1">
                {/* 3. Replace {children} with <Outlet /> */}
                <Outlet />
            </main>

            {/* 4. FOOTER */}

        </div>
    );
}