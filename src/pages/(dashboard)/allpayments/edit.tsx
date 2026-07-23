import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { EditView } from "@/components/refine-ui/views/edit-view.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useBack } from "@refinedev/core";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BACKEND_BASE_URL } from "@/constants";

import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Badge } from "@/components/ui/badge.tsx";
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
import {
  User as UserIcon,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Home,
  FileText,
  Shield,
  CreditCard,
  Calendar,
  Receipt,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_MEN_AVATAR } from "@/components/Shared/upload/upload-widget.tsx";

const STATUSES = [
  { label: "Pending", value: "Pending", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" },
  { label: "Approved", value: "Approved", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
  { label: "Rejected", value: "Rejected", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30" },
  { label: "NotFound", value: "NotFound", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30" },
  { label: "Rechecked", value: "Rechecked", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
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
      resource: "allpayments",
      id: id,
      action: "edit",
      redirect: "list",
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
      note: "",
    },
  });

  const { refineCore } = form;
  const { onFinish, formLoading, queryResult } = refineCore as any;

  const [directPaymentRecord, setDirectPaymentRecord] = useState<any>(null);
  const [fetchedUser, setFetchedUser] = useState<any>(null);

  // Fetch payment record directly from backend API to guarantee full payload & joined user data
  useEffect(() => {
    if (id) {
      fetch(`${BACKEND_BASE_URL}allpayments/${id}`, { credentials: "include" })
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.data) {
            setDirectPaymentRecord(resData.data);
          }
        })
        .catch((err) => console.error("Error fetching direct payment record:", err));
    }
  }, [id]);

  // Extract payment and user data supporting direct, queryResult, and fallback sources
  const rawData = directPaymentRecord || queryResult?.data?.data || queryResult?.data;
  const userData = rawData?.user || fetchedUser;

  // Secondary fallback fetch for member details if missing
  useEffect(() => {
    if (rawData?.userId && (!userData || !userData?.name)) {
      fetch(`${BACKEND_BASE_URL}allMembers/${rawData.userId}`, { credentials: "include" })
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.data) {
            setFetchedUser(resData.data);
          }
        })
        .catch((err) => console.error("Error fetching fallback member info:", err));
    }
  }, [rawData?.userId, userData]);

  useEffect(() => {
    if (rawData) {
      form.reset({
        userId: rawData.userId || "",
        amount: String(rawData.amount || ""),
        extraFine: String(rawData.extraFine || "0.00"),
        total: String(rawData.total || ""),
        paymentMonth: rawData.paymentMonth,
        paymentYear: rawData.paymentYear,
        paymentMethod: rawData.paymentMethod,
        transactionNo: rawData.transactionNo || "",
        paymentStatus: rawData.paymentStatus || "Pending",
        note: rawData.note || "",
      });
    }
  }, [rawData]);

  const onSubmit = async (values: any) => {
    try {
      await onFinish(values);
      toast.success("পেমেন্ট ভেরিফিকেশন স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে!");
    } catch (error) {
      console.error("Updating Status Error", error);
      toast.error("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।");
    }
  };

  const getMonthName = (m: number) => {
    if (!m) return "";
    return new Date(2000, Number(m) - 1).toLocaleString("default", { month: "long" });
  };

  return (
    <EditView className="class-view space-y-6">
      <Breadcrumb />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title text-2xl font-bold tracking-tight">Payment Verification & Audit</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            সদস্যের পেমেন্ট তথ্য পর্যালোচনা ও অনুমোদন প্রক্রিয়া
          </p>
        </div>
        <Button variant="outline" onClick={back} className="gap-2 shrink-0 cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: USER DATA CARD VIEW */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/80 dark:bg-slate-900/50 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-base font-bold">Member Information</CardTitle>
              </div>
              <CardDescription className="text-xs">নিবন্ধিত সদস্যের সংক্ষিপ্ত প্রোফাইল</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              {/* Member Profile Avatar & Header */}
              <div className="flex items-center gap-4">
                <img
                  src={userData?.image || DEFAULT_MEN_AVATAR}
                  alt={userData?.name || "Member Avatar"}
                  className="size-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shadow-sm shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_MEN_AVATAR;
                  }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                    {userData?.name || "Loading member..."}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                      {userData?.role || "Member"}
                    </Badge>
                    {userData?.userStatus && (
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px]">
                        {userData?.userStatus}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Details List */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">Email Address</p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium truncate">{userData?.email || "-"}</p>
                  </div>
                </div>

                {userData?.phoneNo && (
                  <div className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Phone Number</p>
                      <p className="text-slate-800 dark:text-slate-200 font-mono font-medium">{userData.phoneNo}</p>
                    </div>
                  </div>
                )}

                {(userData?.whatsappNo || userData?.whatsAppNumber) && (
                  <div className="flex items-start gap-2.5">
                    <MessageSquare className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">WhatsApp Number</p>
                      <p className="text-slate-800 dark:text-slate-200 font-mono font-medium">
                        {userData.whatsappNo || userData.whatsAppNumber}
                      </p>
                    </div>
                  </div>
                )}

                {userData?.location && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Location</p>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">{userData.location}</p>
                    </div>
                  </div>
                )}

                {userData?.address && (
                  <div className="flex items-start gap-2.5">
                    <Home className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Address</p>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">{userData.address}</p>
                    </div>
                  </div>
                )}

                {userData?.note && (
                  <div className="flex items-start gap-2.5 pt-1">
                    <FileText className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">User Account Note</p>
                      <p className="text-slate-700 dark:text-slate-300 italic text-xs leading-relaxed">
                        "{userData.note}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: PAYMENT DETAILS & VERIFICATION FORM */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm">
            <CardHeader className="bg-slate-50/80 dark:bg-slate-900/50 pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-amber-500" />
                  <span>Payment Summary</span>
                </CardTitle>
                <CardDescription className="text-xs">জমা দেওয়া পেমেন্টের বিস্তারিত ও স্ট্যাটাস নির্ধারণ</CardDescription>
              </div>
              {rawData?.id && (
                <Badge variant="outline" className="font-mono text-xs">
                  ID: #{rawData.id.substring(0, 8)}
                </Badge>
              )}
            </CardHeader>

            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Payment Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Payment Month */}
                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                      <Label className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-amber-500" />
                        <span>Payment Month</span>
                      </Label>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {getMonthName(form.watch("paymentMonth")) || "-"}
                      </p>
                    </div>

                    {/* Payment Year */}
                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                      <Label className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-amber-500" />
                        <span>Payment Year</span>
                      </Label>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {form.watch("paymentYear") || "-"}
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                      <Label className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1.5">
                        <CreditCard className="h-3.5 w-3.5 text-amber-500" />
                        <span>Payment Method</span>
                      </Label>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {form.watch("paymentMethod") || "-"}
                      </p>
                    </div>

                    {/* Transaction ID */}
                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                      <Label className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1.5">
                        <Receipt className="h-3.5 w-3.5 text-amber-500" />
                        <span>Transaction Number (TRX)</span>
                      </Label>
                      <p className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                        {form.watch("transactionNo") || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Financial Breakdown Section */}
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                    <h4 className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                      Financial Breakdown
                    </h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <p className="text-[11px] text-slate-400 font-semibold uppercase">Deposit Amount</p>
                        <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                          ৳{form.watch("amount") || "0"}
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <p className="text-[11px] text-slate-400 font-semibold uppercase">Extra Fine</p>
                        <p className="text-sm sm:text-base font-bold text-rose-500 mt-0.5">
                          ৳{form.watch("extraFine") || "0.00"}
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <p className="text-[11px] text-slate-400 font-semibold uppercase">Total Sum</p>
                        <p className="text-sm sm:text-base font-extrabold text-amber-500 mt-0.5">
                          ৳{form.watch("total") || "0"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Proof Image Preview if available */}
                  {rawData?.proofImage && (
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-400 font-semibold uppercase">Payment Proof Image</Label>
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-60 bg-slate-950/20 flex items-center justify-center">
                        <img
                          src={rawData.proofImage}
                          alt="Payment Proof"
                          className="max-h-60 object-contain w-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Note if submitted by user */}
                  {form.watch("note") && (
                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                      <Label className="text-xs text-slate-400 font-semibold uppercase">Submission Note</Label>
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic">"{form.watch("note")}"</p>
                    </div>
                  )}

                  <Separator />

                  {/* Editable Verification Status Dropdown */}
                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-amber-500" />
                          <span>Verification Status</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="w-full h-11 focus:ring-amber-500 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 font-bold">
                              <SelectValue placeholder="Select verification status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STATUSES.map((stat) => (
                              <SelectItem key={stat.value} value={stat.value} className="cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <Badge className={stat.color}>{stat.label}</Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button type="button" variant="outline" onClick={back} className="px-6 cursor-pointer">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={formLoading}
                      className="px-6 cursor-pointer bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md transition-all"
                    >
                      {formLoading ? "Saving..." : "Update Verification Status"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </EditView>
  );
};

export default AllPaymentsEdit;
