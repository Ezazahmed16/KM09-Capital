import { ListView } from "@/components/refine-ui/views/list-view.tsx";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { CreateButton } from "@/components/refine-ui/buttons/create.tsx";
import { DataTable } from "@/components/refine-ui/data-table/data-table.tsx";
import { useTable } from "@refinedev/react-table";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useUpdate } from "@refinedev/core";
import { toast } from "sonner";
import { Link } from "react-router";
import { DEFAULT_MEN_AVATAR } from "@/components/Shared/upload/upload-widget";

const STATUS_OPTIONS = [
    { value: "Active", label: "Active" },
    { value: "Pending", label: "Pending" },
    { value: "Inactive", label: "Inactive" },
    { value: "Suspended", label: "Suspended" },
];

const MemberList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectStatus, setSelectStatus] = useState("all");
    const { mutate } = useUpdate();

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await mutate({
                resource: "Members",
                id,
                values: { userStatus: newStatus },
            });
            toast.success("Member status updated successfully!");
        } catch (err) {
            toast.error("Failed to update status.");
        }
    };

    const statusFilters = selectStatus === "all" ? [] : [
        { field: 'status', operator: "eq" as const, value: selectStatus },
    ];

    const searchFilters = searchQuery ? [
        { field: 'name', operator: 'contains' as const, value: searchQuery },
    ] : [];

    const memberTable = useTable<User>({
        columns: useMemo<ColumnDef<User>[]>(() => [
            {
                id: "memberId",
                accessorKey: "id",
                size: 100,
                header: () => <p className='column-title ml-2 '>Member ID</p>,
                cell: ({ getValue }) => <Badge className="text-xs font-mono">{getValue<string>() ? getValue<string>().substring(0, 8) : "-"}</Badge>
            },
            {
                id: "name",
                accessorKey: "name",
                size: 130,
                header: () => <p className='column-title ml-2'>Name</p>,
                cell: ({ row }) => (
                    <div className="flex items-center gap-2.5 ml-2">
                        <img
                            src={row.original.image || DEFAULT_MEN_AVATAR}
                            alt={row.original.name}
                            className="size-8 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                        />
                        <span className='text-foreground font-medium'>
                            {row.original.name}
                        </span>
                    </div>
                )
            },
            {
                id: "email",
                accessorKey: "email",
                header: () => <p className='column-title ml-2'>Email</p>,
                cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>
            },
            {
                id: "role",
                accessorKey: "role",
                header: () => <p className='column-title ml-2'>Role</p>,
                cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>
            },
            {
                id: "userStatus",
                accessorKey: "userStatus",
                header: () => <p className='column-title ml-2'>Status</p>,
                cell: ({ row, getValue }) => {
                    const currentVal = getValue<string>();
                    return (
                        <div className="flex items-center ml-2">
                            <Select
                                value={currentVal}
                                onValueChange={(val) => handleStatusChange(row.original.id, val)}
                            >
                                <SelectTrigger className="h-8 w-[120px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-xs font-semibold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    );
                }
            },
            {
                id: "createdAt",
                accessorKey: "createdAt",
                header: () => <p className='column-title ml-2'>Date</p>,
                cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>() ? new Date(getValue<string>()).toLocaleDateString() : "-"}</span>
            },
            {
                id: "actions",
                size: 80,
                header: () => <p className='column-title text-center'>Actions</p>,
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <Link to={`/dashboard/members/show/${row.original.id}`}>
                            <Badge variant="outline" className="p-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                                <Eye className="h-4 w-4 text-slate-500 hover:text-amber-500" />
                            </Badge>
                        </Link>
                    </div>
                )
            },
        ], [mutate]),
        refineCoreProps: {
            resource: "Members",
            pagination: { pageSize: 10, mode: "server" },
            filters: {
                permanent: [...statusFilters, ...searchFilters],
            },
            sorters: {
                initial: [
                    { field: 'id', order: "desc" }
                ]
            },
        }
    });

    return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title text-xl font-bold">All Members</h1>
            <div className="intro-row">
                <p className="text-sm">Quick Access to All Members Record </p>

                <div className="actions-row">
                    <div className="search-field">
                        <Search className='search-icon' />
                        <Input
                            type={'text'}
                            placeholder={'Search by Name'}
                            className={'search-input pl-10 w-full'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:wauto">
                        <Select
                            value={selectStatus}
                            onValueChange={setSelectStatus}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter By Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                {STATUS_OPTIONS.map(status => (
                                    <SelectItem key={status.value} value={status.value} >
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <CreateButton />
                    </div>
                </div>

            </div>

            <DataTable table={memberTable} />
        </ListView>
    );
};

export default MemberList;
