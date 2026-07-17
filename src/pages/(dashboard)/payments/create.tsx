import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx"
import { CreateView } from "@/components/refine-ui/views/create-view.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { useBack, useGetIdentity } from "@refinedev/core"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "@refinedev/react-hook-form"
import { paymentsSchema } from "@/lib/schema"
import { useMemo, useEffect } from "react"

import { Button } from "@/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx"

const MONTHS = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
];

const METHODS = [
    { label: "bKash", value: "Bkash" },
    { label: "Nagad", value: "Nagad" },
    { label: "Bank", value: "Bank" },
    { label: "Cash", value: "Cash" },
];

const STATUSES = [
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
    { label: "NotFound", value: "NotFound" },
    { label: "Rechecked", value: "Rechecked" },
];

const PaymentCreate = () => {
    const back = useBack();

    // Fetch currently authenticated member info
    const { data: currentUser, isLoading: userLoading } = useGetIdentity<any>();

    const currentYear = new Date().getFullYear();
    const yearOptions = useMemo(() => {
        return [currentYear - 1, currentYear, currentYear + 1].map(y => ({
            label: String(y),
            value: y,
        }));
    }, [currentYear]);

    const form = useForm({
        resolver: zodResolver(paymentsSchema),
        refineCoreProps: {
            resource: 'payments',
            action: 'create',
            redirect: 'list',
        },
        defaultValues: {
            userId: "",
            amount: "",
            extraFine: "0.00",
            total: "",
            paymentMonth: new Date().getMonth() + 1,
            paymentYear: new Date().getFullYear(),
            paymentMethod: "Bkash" as any,
            transactionNo: "",
            paymentStatus: "Pending" as any,
            note: ""
        }
    });

    const {
        refineCore: { onFinish, formLoading },
    } = form;

    const amount = form.watch("amount");
    const extraFine = form.watch("extraFine");
    const paymentMonth = form.watch("paymentMonth");
    const paymentYear = form.watch("paymentYear");

    // Automatically set the userId when authenticated user identity loads
    useEffect(() => {
        if (currentUser?.id) {
            form.setValue("userId", currentUser.id);
        }
    }, [currentUser, form]);

    // Automatically calculate penalty fine (increases by 300 BDT for each month it is overdue)
    useEffect(() => {
        const today = new Date();
        const diffMonths = (today.getFullYear() - paymentYear) * 12 + (today.getMonth() + 1 - paymentMonth);

        let multiplier = 0;
        if (diffMonths > 0) {
            multiplier = diffMonths;
        } else if (diffMonths === 0) {
            if (today.getDate() > 10) {
                multiplier = 1;
            }
        }

        const calculatedFine = (multiplier * 300).toFixed(2);
        form.setValue("extraFine", calculatedFine);
    }, [paymentMonth, paymentYear, form]);

    // Auto-calculate total
    useEffect(() => {
        const amt = parseFloat(amount ?? "") || 0;
        const fine = parseFloat(extraFine ?? "") || 0;
        form.setValue("total", (amt + fine).toFixed(2));
    }, [amount, extraFine, form]);

    const onSubmit = async (values: any) => {
        try {
            await onFinish(values);
        } catch (error) {
            console.error("Creating Payment Error", error);
        }
    }

    return (
        <>
            <CreateView className="class-view">
                <Breadcrumb />
                <h1 className="page-title text-xl font-bold">Payment Approval Form</h1>

                <div className="intro-row flex justify-between items-center my-3">
                    <p className="text-sm">Provide information to confirm the payment.</p>
                    <Button variant="outline" onClick={back}>Go Back</Button>
                </div>

                <Separator />

                <div className="my-4 flex justify-center">
                    <Card className="w-full max-w-4xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Fill out the form
                            </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className="mt-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* LEFT COLUMN */}
                                        <div className="space-y-4">
                                            {/* Member Name */}
                                            <FormField
                                                control={form.control}
                                                name="userId"
                                                render={({ field: _field }) => (
                                                    <FormItem>
                                                        <FormLabel>Member Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                value={userLoading ? "Loading member info..." : (currentUser?.name ?? "")}
                                                                disabled
                                                                className="bg-muted w-full"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Payment Month */}
                                            <FormField
                                                control={form.control}
                                                name="paymentMonth"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Payment Month <span className="text-orange-500">*</span></FormLabel>
                                                        <Select
                                                            onValueChange={(val) => field.onChange(Number(val))}
                                                            value={String(field.value)}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Month" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {MONTHS.map((m) => (
                                                                    <SelectItem key={m.value} value={String(m.value)}>
                                                                        {m.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
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
                                                        <FormLabel>Payment Year <span className="text-orange-500">*</span></FormLabel>
                                                        <Select
                                                            onValueChange={(val) => field.onChange(Number(val))}
                                                            value={String(field.value)}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Year" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {yearOptions.map((y) => (
                                                                    <SelectItem key={y.value} value={String(y.value)}>
                                                                        {y.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
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
                                                        <FormLabel>Payment Method <span className="text-orange-500">*</span></FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Method" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {METHODS.map((m) => (
                                                                    <SelectItem key={m.value} value={m.value}>
                                                                        {m.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* RIGHT COLUMN */}
                                        <div className="space-y-4">
                                            {/* Transaction ID */}
                                            <FormField
                                                control={form.control}
                                                name="transactionNo"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Transaction ID / No</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="e.g. TRX998822" {...field} value={field.value ?? ""} className="w-full" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Amount */}
                                            <FormField
                                                control={form.control}
                                                name="amount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Amount (BDT) <span className="text-orange-500">*</span></FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="e.g. 10000.00" {...field} className="w-full" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Penalty / Fine */}
                                            <FormField
                                                control={form.control}
                                                name="extraFine"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Penalty / Fine (BDT) (Calculated)</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" disabled {...field} className="bg-muted w-full" />
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
                                                        <FormLabel>Total (BDT) (Calculated)</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" disabled {...field} className="bg-muted w-full" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* BOTTOM FULL WIDTH */}
                                    <FormField
                                        control={form.control}
                                        name="note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Notes</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Add any comments or observations regarding this payment approval..." {...field} value={field.value ?? ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* ACTIONS */}
                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button variant="outline" type="button" onClick={back} disabled={formLoading}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={formLoading}>
                                            {formLoading ? "Submitting..." : "Request Approve Payment"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </CreateView>
        </>
    )
}
export default PaymentCreate
