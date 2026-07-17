import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { EditView } from "@/components/refine-ui/views/edit-view.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useBack } from "@refinedev/core";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "@refinedev/react-hook-form";
import { paymentsSchema } from "@/lib/schema";
import { useEffect } from "react";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button.tsx";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { toast } from "sonner";

const STATUSES = [
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
    { label: "NotFound", value: "NotFound" },
    { label: "Rechecked", value: "Rechecked" },
];

const editPaymentSchema = z.object({
    paymentStatus: z.enum(["Pending", "Approved", "Rejected", "NotFound", "Rechecked"]),
    userId: z.string().optional(),
    amount: z.string().optional(),
    extraFine: z.string().optional(),
    total: z.string().optional(),
    paymentMonth: z.any().optional(),
    paymentYear: z.any().optional(),
    paymentMethod: z.any().optional(),
    transactionNo: z.string().nullable().optional(),
    note: z.string().nullable().optional(),
});

const AllPaymentsEdit = () => {
    const back = useBack();
    const { id } = useParams<{ id: string }>();

    const form = useForm({
        resolver: zodResolver(editPaymentSchema),
        refineCoreProps: {
            resource: 'allpayments',
            id: id,
            action: 'edit',
            redirect: 'list',
        },
        defaultValues: {
            userId: "",
            amount: "",
            extraFine: "",
            total: "",
            paymentMonth: 1,
            paymentYear: 2026,
            paymentMethod: "Bkash" as any,
            transactionNo: "",
            paymentStatus: "Pending" as any,
            note: ""
        }
    });

    const {
        refineCore,
    } = form;

    const { onFinish, formLoading, queryResult } = refineCore as any;

    // Explicitly sync fetched backend data to the form
    useEffect(() => {
        if (queryResult?.data?.data) {
            const data = queryResult.data.data;
            form.reset({
                userId: data.userId || "",
                amount: String(data.amount || ""),
                extraFine: String(data.extraFine || "0.00"),
                total: String(data.total || ""),
                paymentMonth: data.paymentMonth,
                paymentYear: data.paymentYear,
                paymentMethod: data.paymentMethod,
                transactionNo: data.transactionNo || "",
                paymentStatus: data.paymentStatus || "Pending",
                note: data.note || ""
            });
        }
    }, [queryResult?.data?.data]);

    // Helper to get nested member name from the query result
    const memberName = queryResult?.data?.data?.user?.name || "Loading member name...";
    const memberEmail = queryResult?.data?.data?.user?.email || "";

    const onSubmit = async (values: any) => {
        try {
            // Send update (Admins can only modify the status on the backend)
            await onFinish(values);
            toast.success("Payment status updated successfully!");
        } catch (error) {
            console.error("Updating Status Error", error);
            toast.error("Failed to update status.");
        }
    }

    return (
        <>
            <EditView className="class-view">
                <Breadcrumb />
                <h1 className="page-title text-xl font-bold">Payment Details & Review</h1>

                <div className="intro-row flex justify-between items-center my-3">
                    <p className="text-sm">Review full payment verification details and approve/reject status.</p>
                    <Button variant="outline" onClick={back}>Go Back</Button>
                </div>

                <Separator />

                <div className="my-4 flex justify-center">
                    <Card className="w-full max-w-4xl border-slate-200 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                Payment #{queryResult?.data?.data?.id ? queryResult.data.data.id.substring(0, 8) : ""}
                            </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className="mt-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* LEFT COLUMN - READ-ONLY MEMBER DETAILS */}
                                        <div className="space-y-4">
                                            {/* Member Name */}
                                            <div className="space-y-2">
                                                <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                                                    Member Name
                                                </Label>
                                                <Input
                                                    type="text"
                                                    value={memberEmail ? `${memberName} (${memberEmail})` : memberName}
                                                    disabled
                                                    className="bg-muted text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-800"
                                                />
                                            </div>

                                            {/* Payment Month */}
                                            <FormField
                                                control={form.control}
                                                name="paymentMonth"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Payment Month</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                value={field.value ? new Date(2000, Number(field.value) - 1).toLocaleString('default', { month: 'long' }) : ""}
                                                                disabled
                                                                className="bg-muted text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-800"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Payment Year */}
                                            <FormField
                                                control={form.control}
                                                name="paymentYear"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Payment Year</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                value={field.value ?? ""}
                                                                disabled
                                                                className="bg-muted text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-800"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Payment Method */}
                                            <FormField
                                                control={form.control}
                                                name="paymentMethod"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Payment Method</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                value={field.value ?? ""}
                                                                disabled
                                                                className="bg-muted text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-800"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Transaction ID */}
                                            <FormField
                                                control={form.control}
                                                name="transactionNo"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Transaction ID</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                value={field.value ?? "-"}
                                                                disabled
                                                                className="bg-muted text-slate-500 cursor-not-allowed font-mono border-slate-200 dark:border-slate-800"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* RIGHT COLUMN - FINANCES & STATUS EDIT */}
                                        <div className="space-y-4">
                                            {/* Amount */}
                                            <FormField
                                                control={form.control}
                                                name="amount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Amount (BDT)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                value={field.value ?? ""}
                                                                disabled
                                                                className="bg-muted text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-800"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Penalty Fine */}
                                            <FormField
                                                control={form.control}
                                                name="extraFine"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Penalty Extra Fine (BDT)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                value={field.value ?? ""}
                                                                disabled
                                                                className="bg-muted text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-800"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Total */}
                                            <FormField
                                                control={form.control}
                                                name="total"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Total Sum (BDT)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                value={field.value ?? ""}
                                                                disabled
                                                                className="bg-muted text-amber-500 font-bold cursor-not-allowed border-slate-200 dark:border-slate-800"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Payment Status - EDITABLE BY ADMIN */}
                                            <FormField
                                                control={form.control}
                                                name="paymentStatus"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-semibold text-sm">Payment Verification Status</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value || ""}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="w-full focus:ring-amber-500 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {STATUSES.map(stat => (
                                                                    <SelectItem key={stat.value} value={stat.value}>
                                                                        {stat.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Note */}
                                            <FormField
                                                control={form.control}
                                                name="note"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold text-sm">User Note</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                value={field.value ?? ""}
                                                                disabled
                                                                className="bg-muted text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-800"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4 gap-2">
                                        <Button type="button" variant="outline" onClick={back} className="px-6 cursor-pointer">
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={formLoading} className="px-6 cursor-pointer bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                                            {formLoading ? "Saving..." : "Save Verification Status"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </EditView>
        </>
    );
};

export default AllPaymentsEdit;
