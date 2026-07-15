
import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { Outlet, Route, Routes } from "react-router";

import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import { Layout } from "@/components/refine-ui/layout/layout.tsx";

import Dashboard from "@/pages/(dashboard)/dashboard.tsx";
import { HomeIcon } from "lucide-react";

export default function DashboardApp() {
    return (
        <RefineKbarProvider>
            <ThemeProvider>
                <DevtoolsProvider>
                    <Refine
                        dataProvider={dataProvider}
                        notificationProvider={useNotificationProvider()}
                        routerProvider={routerProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            projectId: "BSZPX4-wXTLjO-kYd6wK",
                        }}
                        resources={[
                            {
                                name: "Dashboard",
                                list: "/dashboard",
                                meta: { label: "Dashboard", icon: <HomeIcon /> },
                            },
                        ]}
                    >
                        <Routes>
                            <Route element={<Layout><Outlet /></Layout>}>

                                <Route index element={<Dashboard />} />

                            </Route>
                        </Routes>

                        <Toaster />
                        <RefineKbar />
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                    <DevtoolsPanel />
                </DevtoolsProvider>
            </ThemeProvider>
        </RefineKbarProvider>
    );
}