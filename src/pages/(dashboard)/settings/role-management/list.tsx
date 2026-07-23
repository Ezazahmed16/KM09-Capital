import { ListView } from "@/components/refine-ui/views/list-view.tsx";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { ShieldUser, Shield, Users, Search, Loader2, Mail, Phone } from "lucide-react";
import { useList, useUpdate } from "@refinedev/core";
import { User, Role } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { DEFAULT_MEN_AVATAR } from "@/components/Shared/upload/upload-widget";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
    { value: "Admin", label: "Admin" },
    { value: "Member", label: "Member" },
];

export default function RoleManagementList() {
    const [searchQuery, setSearchQuery] = useState("");
    const { mutate: updateRoleMutate, mutation } = useUpdate();

    const { result, query } = useList<User>({
        resource: "allMembers",
        pagination: { mode: "off" },
    });

    const allUsers = result?.data || [];
    const isLoading = query?.isLoading;
    const isUpdating = mutation?.isPending;

    const filteredUsers = allUsers.filter((u: User) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.phoneNo?.toLowerCase().includes(q) ||
            u.role?.toLowerCase().includes(q)
        );
    });

    const handleRoleChange = (userId: string, newRole: Role) => {
        updateRoleMutate(
            {
                resource: "allMembers",
                id: userId,
                values: { role: newRole },
            },
            {
                onSuccess: () => {
                    toast.success("User role updated successfully!");
                },
                onError: (err: any) => {
                    toast.error(err.message || "Failed to update user role.");
                },
            }
        );
    };

    return (
        <ListView className="class-view space-y-6">
            <Breadcrumb />

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="page-title text-2xl font-bold tracking-tight">Role Management</h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage and assign user roles (Admin & Member privileges - SuperAdmin Only)
                    </p>
                </div>
            </div>

            {/* Search Filter Bar */}
            <div className="flex items-center gap-3 bg-white dark:bg-[#0b1e33]/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
                <Search className="size-4 text-slate-400 shrink-0" />
                <Input
                    placeholder="Search members by name, email, or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 bg-transparent p-0 text-sm"
                />
            </div>

            {/* Data Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                        <TableRow>
                            <TableHead className="w-16">Avatar</TableHead>
                            <TableHead>Member Details</TableHead>
                            <TableHead>Contact Info</TableHead>
                            <TableHead>Current Role</TableHead>
                            <TableHead className="text-right">Assign New Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="size-5 animate-spin text-amber-500" />
                                        <span>Loading member list...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length > 0 ? (
                            filteredUsers.map((u: User) => (
                                <TableRow key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                                    <TableCell>
                                        <img
                                            src={u.image || u.img || DEFAULT_MEN_AVATAR}
                                            alt={u.name}
                                            className="size-10 rounded-full object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-0.5">
                                            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                                                {u.name}
                                            </p>
                                            <Badge variant="outline" className="text-[10px] font-mono text-slate-400">
                                                ID: {u.id?.substring(0, 8)}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                                        <div className="flex items-center gap-1.5">
                                            <Mail className="size-3 text-slate-400 shrink-0" />
                                            <span>{u.email}</span>
                                        </div>
                                        {u.phoneNo && (
                                            <div className="flex items-center gap-1.5">
                                                <Phone className="size-3 text-amber-500 shrink-0" />
                                                <span>{u.phoneNo}</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {u.role === "SuperAdmin" ? (
                                            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold gap-1">
                                                <ShieldUser className="size-3" />
                                                <span>Super Admin</span>
                                            </Badge>
                                        ) : u.role === "Admin" ? (
                                            <Badge className="bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-bold gap-1">
                                                <Shield className="size-3" />
                                                <span>Admin</span>
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20 text-xs font-semibold gap-1">
                                                <Users className="size-3" />
                                                <span>Member</span>
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {u.role === "SuperAdmin" ? (
                                            <span className="text-xs text-slate-400 font-mono italic">Primary SuperAdmin</span>
                                        ) : (
                                            <div className="flex items-center justify-end">
                                                <Select
                                                    value={u.role}
                                                    onValueChange={(val: Role) => handleRoleChange(u.id, val)}
                                                    disabled={isUpdating}
                                                >
                                                    <SelectTrigger className="w-32 h-8 text-xs font-semibold bg-slate-50/80 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-amber-500">
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {ROLE_OPTIONS.map((opt) => (
                                                            <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                                                {opt.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                                    No members found matching your search.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </ListView>
    );
}
