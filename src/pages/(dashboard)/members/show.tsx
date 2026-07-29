import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { ShowView } from "@/components/refine-ui/views/show-view.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useBack } from "@refinedev/core";
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
import { Badge } from "@/components/ui/badge.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
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
  Banknote,
  AlertTriangle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { DEFAULT_MEN_AVATAR } from "@/components/Shared/upload/upload-widget.tsx";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MembersShow = () => {
  const back = useBack();
  const { id } = useParams<{ id: string }>();

  const [member, setMember] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([
        fetch(`${BACKEND_BASE_URL}allMembers/${id}`, { credentials: "include" }).then((r) => r.json()),
        fetch(`${BACKEND_BASE_URL}allMembers/${id}/payments`, { credentials: "include" }).then((r) => r.json()),
      ])
        .then(([memberRes, paymentsRes]) => {
          if (memberRes?.data) setMember(memberRes.data);
          if (paymentsRes?.data) {
            setPayments(paymentsRes.data);
            setSummary(paymentsRes.summary || null);
          }
        })
        .catch((err) => console.error("Error fetching member details:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500 min-h-[60vh]">
        <Loader2 className="size-8 animate-spin text-amber-500" />
        <p className="text-sm font-semibold">Loading member profile and payment history...</p>
      </div>
    );
  }

  return (
    <ShowView className="space-y-6">
      <Breadcrumb />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title text-2xl font-bold tracking-tight">Member Overview & Details</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            সদস্যের বিস্তারিত প্রোফাইল, যোগাযোগ ও মাসিক পেমেন্ট লেজার ইতিহাস
          </p>
        </div>
        <Button variant="outline" onClick={back} className="gap-2 shrink-0 cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: MEMBER PROFILE CARD VIEW */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/80 dark:bg-slate-900/50 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-base font-bold">Member Information</CardTitle>
              </div>
              <CardDescription className="text-xs">নিবন্ধিত সদস্যের সংক্ষিপ্ত তথ্য</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              {/* Member Profile Avatar & Header */}
              <div className="flex items-center gap-4">
                <img
                  src={member?.image || DEFAULT_MEN_AVATAR}
                  alt={member?.name || "Member Avatar"}
                  className="size-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shadow-sm shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_MEN_AVATAR;
                  }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                    {member?.name || "Member Name"}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                      {member?.role || "Member"}
                    </Badge>
                    {member?.userStatus && (
                      <Badge className={member.userStatus === "Active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px]" : "bg-amber-500/10 text-amber-500 text-[10px]"}>
                        {member.userStatus}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Details List */}
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">Email Address</p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium truncate">{member?.email || "-"}</p>
                  </div>
                </div>

                {member?.phoneNo && (
                  <div className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Phone Number</p>
                      <p className="text-slate-800 dark:text-slate-200 font-mono font-medium">{member.phoneNo}</p>
                    </div>
                  </div>
                )}

                {(member?.whatsappNo || member?.whatsAppNumber) && (
                  <div className="flex items-start gap-2.5">
                    <MessageSquare className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">WhatsApp Number</p>
                      <p className="text-slate-800 dark:text-slate-200 font-mono font-medium">
                        {member.whatsappNo || member.whatsAppNumber}
                      </p>
                    </div>
                  </div>
                )}

                {member?.location && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Location</p>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">{member.location}</p>
                    </div>
                  </div>
                )}

                {member?.address && (
                  <div className="flex items-start gap-2.5">
                    <Home className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Address</p>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">{member.address}</p>
                    </div>
                  </div>
                )}

                {member?.createdAt && (
                  <div className="flex items-start gap-2.5">
                    <Calendar className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Joined Date</p>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">
                        {new Date(member.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Deposit Summary Card */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm">
            <CardHeader className="bg-slate-50/80 dark:bg-slate-900/50 pb-3 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Banknote className="size-4 text-emerald-500" />
                <span>Financial Deposit Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Total Deposit Paid</p>
                <p className="text-2xl font-extrabold text-amber-500 font-mono">
                  ৳ {(summary?.totalPaid || 0).toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400">Months Paid</p>
                  <Badge className="bg-emerald-500/15 text-emerald-500 font-bold mt-0.5">
                    {summary?.totalMonthsPaid || 0} Months
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Extra Fines Paid</p>
                  <p className="font-mono font-bold text-rose-500 mt-0.5">
                    ৳ {(summary?.totalFines || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: MEMBER PAYMENT HISTORY TABLE */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/80 dark:bg-slate-900/50 pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-amber-500" />
                  <span>Member Payments & Installment Ledger</span>
                </CardTitle>
                <CardDescription className="text-xs">মাসিক কিস্তি জমা ও স্পেসিফিক ট্রানজেকশন তালিকা</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                {payments.length} Payments
              </Badge>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900/60">
                  <TableRow>
                    <TableHead className="text-xs">Month & Year</TableHead>
                    <TableHead className="text-xs">Method</TableHead>
                    <TableHead className="text-xs">Transaction ID</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Extra Fine</TableHead>
                    <TableHead className="text-xs">Total Paid</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.length > 0 ? (
                    payments.map((p: any) => (
                      <TableRow key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 text-xs">
                        <TableCell className="font-bold text-slate-900 dark:text-slate-100">
                          {p.paymentMonth && p.paymentYear
                            ? `${MONTH_NAMES[p.paymentMonth - 1] || p.paymentMonth} ${p.paymentYear}`
                            : "N/A"}
                        </TableCell>
                        <TableCell className="font-medium">{p.paymentMethod}</TableCell>
                        <TableCell className="font-mono text-slate-500">{p.transactionNo || "-"}</TableCell>
                        <TableCell className="font-mono font-semibold">৳ {(parseFloat(p.amount) || 0).toLocaleString()}</TableCell>
                        <TableCell className="font-mono text-rose-500">৳ {(parseFloat(p.extraFine) || 0).toLocaleString()}</TableCell>
                        <TableCell className="font-mono font-bold text-amber-500">৳ {(parseFloat(p.total || p.amount) || 0).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              p.paymentStatus === "Approved"
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : p.paymentStatus === "Rejected"
                                ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            }
                          >
                            {p.paymentStatus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-slate-500 text-xs">
                        No payment records found for this member.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </ShowView>
  );
};

export default MembersShow;
