// 1. Import Outlet from react-router
import { Outlet } from "react-router";

// 2. Remove { children } and React.PropsWithChildren
export default function WebsiteLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">

            {/* 1. TOP NAVBAR */}


            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1">
                {/* 3. Replace {children} with <Outlet /> */}
                <Outlet />
            </main>

            {/* 4. FOOTER */}

        </div>
    );
}