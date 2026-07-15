import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { Outlet, Route, Routes } from "react-router";

import { Toaster } from "../components/refine-ui/notification/toaster.tsx";
import { useNotificationProvider } from "../components/refine-ui/notification/use-notification-provider.tsx";
import { ThemeProvider } from "../components/refine-ui/theme/theme-provider.tsx";
import { dataProvider } from "../providers/data.ts";
import { Layout } from "@/components/refine-ui/layout/layout.tsx";

import Dashboard from "@/pages/(dashboard)/dashboard.tsx";
import {Banknote, ContactIcon, HomeIcon} from "lucide-react";
import MembersList from "@/pages/(dashboard)/members/list.tsx";
import MembersCreate from "@/pages/(dashboard)/members/create.tsx";
import PaymentList from "@/pages/(dashboard)/payments/list.tsx";
import PaymentCreate from "@/pages/(dashboard)/payments/create.tsx";

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
                            // Note: Absolute paths in the Refine resources array are perfectly fine.
                            {
                                name: "Dashboard",
                                list: "/dashboard",
                                meta: { label: "Dashboard", icon: <HomeIcon /> },
                            },
                            {
                                name: "Members",
                                list: "/dashboard/members",
                                meta: { label: "All Members", icon: <ContactIcon /> },
                            },
                            {
                                name: "Payments History",
                                list: "/dashboard/payments",
                                create: "/dashboard/payments/create",
                                meta: { label: "Payments", icon: <Banknote /> },
                            },
                        ]}
                    >
                        <Routes>
                            <Route element={<Layout><Outlet /></Layout>}>

                                {/* Matches URL: /dashboard */}
                                <Route index element={<Dashboard />} />
                                <Route path="members">
                                    <Route index element={<MembersList />}/>
                                    <Route path="create" element={<MembersCreate />}/>
                                </Route>
                                <Route path="payments">
                                    <Route index element={<PaymentList />}/>
                                    <Route path="create" element={<PaymentCreate />}/>
                                </Route>

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