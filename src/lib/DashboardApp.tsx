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
import { Banknote, ContactIcon, HomeIcon, UserIcon, Layers, Image as ImageIcon, Settings, ShieldUser, BookOpen } from "lucide-react";
import MembersList from "@/pages/(dashboard)/members/list.tsx";
import MembersCreate from "@/pages/(dashboard)/members/create.tsx";
import PaymentList from "@/pages/(dashboard)/payments/list.tsx";
import PaymentCreate from "@/pages/(dashboard)/payments/create.tsx";
import MyAccount from "@/pages/(dashboard)/myaccount/index.tsx";
import AllPaymentsList from "@/pages/(dashboard)/allpayments/list.tsx";
import AllPaymentsEdit from "@/pages/(dashboard)/allpayments/edit.tsx";
import GalleryList from "@/pages/(dashboard)/settings/gallery/list.tsx";
import GalleryCreate from "@/pages/(dashboard)/settings/gallery/create.tsx";
import GalleryEdit from "@/pages/(dashboard)/settings/gallery/edit.tsx";
import RoleManagementList from "@/pages/(dashboard)/settings/role-management/list.tsx";
import BlogList from "@/pages/(dashboard)/settings/blog-management/list.tsx";
import BlogCreate from "@/pages/(dashboard)/settings/blog-management/create.tsx";
import BlogEdit from "@/pages/(dashboard)/settings/blog-management/edit.tsx";
import { useAuth } from "@/providers/auth-context";

import.meta.env.VITE_BACKEND_BASE_URL

import { refineAuthProvider } from "../providers/refine-auth-provider.ts";
import { DashboardGuard, RoleGuard } from "@/components/Shared/route-guards";

export default function DashboardApp() {
    const { user: currentUser } = useAuth();
    const isAdmin = currentUser?.role === "SuperAdmin" || currentUser?.role === "Admin";
    const isSuperAdmin = currentUser?.role === "SuperAdmin";

    const resources: any[] = [
        {
            name: "Dashboard",
            list: "/dashboard",
            meta: { label: "Dashboard", icon: <HomeIcon /> },
        },
        {
            name: "payments",
            list: "/dashboard/payments",
            create: "/dashboard/payments/create",
            meta: { label: "Payments History", icon: <Banknote /> },
        },
        {
            name: "myaccount",
            list: "/dashboard/myaccount",
            meta: { label: "My Account", icon: <UserIcon /> },
        },
    ];

    if (isAdmin) {
        resources.push(
            {
                name: "Members",
                list: "/dashboard/members",
                create: "/dashboard/members/create",
                meta: { label: "All Members", icon: <ContactIcon /> },
            },
            {
                name: "allpayments",
                list: "/dashboard/allpayments",
                edit: "/dashboard/allpayments/edit/:id",
                meta: { label: "All Payments", icon: <Layers /> },
            }
        );
    }

    if (isSuperAdmin) {
        resources.push(
            {
                name: "settings",
                meta: { label: "Settings", icon: <Settings /> },
            },
            {
                name: "gallery",
                list: "/dashboard/settings/gallery",
                create: "/dashboard/settings/gallery/create",
                edit: "/dashboard/settings/gallery/edit/:id",
                meta: { parent: "settings", label: "Gallery", icon: <ImageIcon /> },
            },
            {
                name: "blog-management",
                list: "/dashboard/settings/blog-management",
                create: "/dashboard/settings/blog-management/create",
                edit: "/dashboard/settings/blog-management/edit/:id",
                meta: { parent: "settings", label: "Blog Management", icon: <BookOpen /> },
            },
            {
                name: "role-management",
                list: "/dashboard/settings/role-management",
                meta: { parent: "settings", label: "Role Management", icon: <ShieldUser /> },
            }
        );
    }

    return (
        <RefineKbarProvider>
            <ThemeProvider>
                <DevtoolsProvider>
                    <Refine
                        dataProvider={dataProvider}
                        authProvider={refineAuthProvider}
                        notificationProvider={useNotificationProvider()}
                        routerProvider={routerProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            projectId: "BSZPX4-wXTLjO-kYd6wK",
                        }}
                        resources={resources}
                    >
                        <Routes>
                            <Route element={<DashboardGuard />}>
                                <Route element={<Layout><Outlet /></Layout>}>
                                    {/* Matches URL: /dashboard */}
                                    <Route index element={<Dashboard />} />

                                    {/* Shared routes accessible by any authenticated active user */}
                                    <Route path="myaccount" element={<MyAccount />} />

                                    <Route path="payments">
                                        <Route index element={<PaymentList />} />
                                        <Route path="create" element={<PaymentCreate />} />
                                    </Route>

                                    {/* Restrict Members and AllPayments to SuperAdmin & Admin */}
                                    <Route element={<RoleGuard allowedRoles={["SuperAdmin", "Admin"]} />}>
                                        <Route path="members">
                                            <Route index element={<MembersList />} />
                                            <Route path="create" element={<MembersCreate />} />
                                        </Route>
                                        <Route path="allpayments">
                                            <Route index element={<AllPaymentsList />} />
                                            <Route path="edit/:id" element={<AllPaymentsEdit />} />
                                        </Route>
                                    </Route>

                                    {/* Restrict Settings (Gallery, Blog & Role Management) strictly to SuperAdmin */}
                                    <Route element={<RoleGuard allowedRoles={["SuperAdmin"]} />}>
                                        <Route path="settings/gallery">
                                            <Route index element={<GalleryList />} />
                                            <Route path="create" element={<GalleryCreate />} />
                                            <Route path="edit/:id" element={<GalleryEdit />} />
                                        </Route>
                                        <Route path="settings/blog-management">
                                            <Route index element={<BlogList />} />
                                            <Route path="create" element={<BlogCreate />} />
                                            <Route path="edit/:id" element={<BlogEdit />} />
                                        </Route>
                                        <Route path="settings/role-management">
                                            <Route index element={<RoleManagementList />} />
                                        </Route>
                                    </Route>
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