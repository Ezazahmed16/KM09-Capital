import { ListView } from "@/components/refine-ui/views/list-view.tsx";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { useMemo, useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { PaymentMethodsOptions } from "@/constants";
import { CreateButton } from "@/components/refine-ui/buttons/create.tsx";
import { DataTable } from "@/components/refine-ui/data-table/data-table.tsx";
import { useTable } from "@refinedev/react-table";
import { Payments } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge.tsx";
import { useAuth } from "@/providers/auth-context";

const STATUS_OPTIONS = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "NotFound", label: "Not Found" },
    { value: "Rechecked", label: "Rechecked" },
];

const PaymentList = () => {
    const { user: currentUser } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [selectPaymentMethods, setSelectPaymentMethods] = useState("all");
    const [selectStatus, setSelectStatus] = useState("all");

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

    const paymentTable = useTable<Payments>({
        columns: useMemo<ColumnDef<Payments>[]>(() => {
            const cols: ColumnDef<Payments>[] = [
                {
                    id: "paymentId",
                    accessorKey: "id",
                    size: 150,
                    header: () => <p className='column-title ml-2 '>Payment No</p>,
                    cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
                }
            ];

            cols.push(
                {
                    id: "amount",
                    accessorKey: "amount",
                    size: 50,
                    header: () => <p className='column-title ml-2 '>Amount</p>,
                    cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>
                },
                {
                    id: "extraFees",
                    accessorKey: "extraFine",
                    size: 50,
                    header: () => <p className='column-title ml-2 '>Penalty</p>,
                    cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>
                },
                {
                    id: "totalAmount",
                    accessorKey: "total",
                    size: 50,
                    header: () => <p className='column-title ml-2 '>Total</p>,
                    cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>
                },
                {
                    id: "paymentMethod",
                    accessorKey: "paymentMethod",
                    size: 80,
                    header: () => <p className='column-title ml-2 '>Payment Method</p>,
                    cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>
                },
                {
                    id: "trxNo",
                    accessorKey: "transactionNo",
                    size: 100,
                    header: () => <p className='column-title ml-2 '>Transaction Number</p>,
                    cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>() ?? "-"}</span>,
                    filterFn: 'includesString',
                },
                {
                    id: "paymentStatus",
                    accessorKey: "paymentStatus",
                    size: 50,
                    header: () => <p className='column-title ml-2 '>Status</p>,
                    cell: ({ getValue }) => {
                        const val = getValue<string>();
                        const variant = val === "Approved" ? "default" : val === "Pending" ? "outline" : "destructive";
                        return <Badge variant={variant} className="ml-2">{val}</Badge>;
                    }
                },
                {
                    id: "createdAt",
                    accessorKey: "createdAt",
                    size: 100,
                    header: () => <p className='column-title ml-2 '>Date</p>,
                    cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>() ? new Date(getValue<string>()).toLocaleDateString() : ""}</span>
                }
            );

            return cols;
        }, [currentUser]),
        refineCoreProps: {
            resource: "payments",
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

    const searchPlaceholder = currentUser?.role === "Member"
        ? "Search by Transaction Number"
        : "Search by Transaction Number or Member Name";

    return (
        <>
            <ListView>
                <Breadcrumb />
                <h1 className="page-title text-xl font-bold">Payments Record</h1>
                <div className="intro-row">
                    <p className="text-sm">Quick Access to All Payments Record </p>

                    <div className="actions-row">
                        <div className="search-field">
                            <Search className='search-icon' />
                            <Input
                                type={'text'}
                                placeholder={searchPlaceholder}
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

                            <CreateButton />
                        </div>
                    </div>
                </div>

                <DataTable table={paymentTable} />
            </ListView>
        </>
    );
};

export default PaymentList;
