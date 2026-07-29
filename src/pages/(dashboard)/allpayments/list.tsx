import { ListView } from "@/components/refine-ui/views/list-view.tsx";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { useMemo, useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { PaymentMethodsOptions } from "@/constants";
import { DataTable } from "@/components/refine-ui/data-table/data-table.tsx";
import { useTable } from "@refinedev/react-table";
import { Payments } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge.tsx";
import { useUpdate, useLink } from "@refinedev/core";
import { toast } from "sonner";

const STATUS_OPTIONS = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "NotFound", label: "Not Found" },
    { value: "Rechecked", label: "Rechecked" },
];

const AllPaymentsList = () => {
    const Link = useLink();
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [selectPaymentMethods, setSelectPaymentMethods] = useState("all");
    const [selectStatus, setSelectStatus] = useState("all");
    const { mutate } = useUpdate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const paymentFilters = selectPaymentMethods === "all" ? [] : [
        { field: 'paymentMethod', operator: "eq" as const, value: selectPaymentMethods },
    ];

    const statusFilters = selectStatus === "all" ? [] : [
        { field: 'status', operator: "eq" as const, value: selectStatus },
    ];

    const searchFilters = debouncedSearchQuery ? [
        { field: 'trxNo', operator: 'contains' as const, value: debouncedSearchQuery },
    ] : [];

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await mutate({
                resource: "allpayments",
                id,
                values: { paymentStatus: newStatus },
            });
            toast.success("Payment status updated successfully!");
        } catch (err) {
            toast.error("Failed to update status.");
        }
    };

    const paymentTable = useTable<Payments>({
        columns: useMemo<ColumnDef<Payments>[]>(() => [
            {
                id: "paymentId",
                accessorKey: "id",
                size: 200,
                header: () => <p className='column-title ml-2 '>Payment No</p>,
                cell: ({ getValue }) => <Badge className="text-xs">{getValue<string>()}</Badge>
            },
            {
                id: "memberName",
                size: 120,
                header: () => <p className='column-title ml-2 '>Member Name</p>,
                cell: ({ row }) => {
                    const usr = (row.original as any).user;
                    return <span className='text-foreground font-semibold ml-2'>{usr?.name || "-"}</span>;
                }
            },
            {
                id: "amount",
                accessorKey: "amount",
                size: 60,
                header: () => <p className='column-title ml-2 '>Amount</p>,
                cell: ({ getValue }) => <span className='text-foreground font-medium'>{getValue<string>()} BDT</span>
            },
            {
                id: "paymentMethod",
                accessorKey: "paymentMethod",
                size: 80,
                header: () => <p className='column-title ml-2 '>Method</p>,
                cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>
            },
            {
                id: "trxNo",
                accessorKey: "transactionNo",
                size: 120,
                header: () => <p className='column-title ml-2 '>TRX. No.</p>,
                cell: ({ getValue }) => <span className='text-foreground font-mono'>{getValue<string>() || "-"}</span>,
            },
            {
                id: "paymentStatus",
                accessorKey: "paymentStatus",
                size: 130,
                header: () => <p className='column-title ml-2 '>Status</p>,
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
                size: 100,
                header: () => <p className='column-title ml-2 '>Date</p>,
                cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>() ? new Date(getValue<string>()).toLocaleDateString() : ""}</span>
            },
            {
                id: "actions",
                size: 60,
                header: () => <p className='column-title text-center'>Actions</p>,
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <Link to={`/dashboard/allpayments/edit/${row.original.id}`}>
                            <Badge variant="outline" className="p-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                                <Eye className="h-4 w-4 text-slate-500 hover:text-amber-500" />
                            </Badge>
                        </Link>
                    </div>
                )
            }
        ], [mutate]),
        refineCoreProps: {
            resource: "allpayments",
            pagination: { pageSize: 10, mode: "server" },
            filters: {
                permanent: [...paymentFilters, ...statusFilters, ...searchFilters],
            },
            sorters: {
                initial: [
                    { field: 'id', order: "desc" }
                ]
            },
        }
    });

    return (
        <>
            <ListView>
                <Breadcrumb />
                <h1 className="page-title text-xl font-bold">All Payments Record</h1>
                <div className="intro-row">
                    <p className="text-sm">Manage, search, and update payment status values for all registered members.</p>

                    <div className="actions-row">
                        <div className="search-field">
                            <Search className='search-icon' />
                            <Input
                                type={'text'}
                                placeholder="Search by Transaction Number or Member Name"
                                className={'search-input pl-10 w-full'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            {/* Method Filter */}
                            <Select
                                value={selectPaymentMethods}
                                onValueChange={setSelectPaymentMethods}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Methods</SelectItem>
                                    {PaymentMethodsOptions.map(methods => (
                                        <SelectItem key={methods.value} value={methods.value} >
                                            {methods.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Status Filter */}
                            <Select
                                value={selectStatus}
                                onValueChange={setSelectStatus}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    {STATUS_OPTIONS.map(status => (
                                        <SelectItem key={status.value} value={status.value} >
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                </div>

                <DataTable table={paymentTable} />
            </ListView>
        </>
    );
};

export default AllPaymentsList;
