import React, { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth-context";
import { BACKEND_BASE_URL } from "@/constants";
import SEO from "@/components/Shared/SEO";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Banknote,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  Loader2,
  ArrowUpRight,
  Filter,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useNavigate } from "react-router";
import { DEFAULT_MEN_AVATAR } from "@/components/Shared/upload/upload-widget";

const AVAILABLE_YEARS = ["2024", "2025", "2026", "2027", "2028"];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isMember = user?.role === "Member";
  const isAdmin = user?.role === "Admin" || user?.role === "SuperAdmin";

  const [loading, setLoading] = useState(true);
  const [memberStats, setMemberStats] = useState<any>(null);
  const [adminStats, setAdminStats] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState<string>(`${new Date().getFullYear()}`);

  // Fetch Member Stats with Year Filter
  useEffect(() => {
    if (isMember) {
      setLoading(true);
      fetch(`${BACKEND_BASE_URL}stats/member?year=${selectedYear}`, { credentials: "include" })
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.data) {
            setMemberStats(resData.data);
          }
        })
        .catch((err) => console.error("Error fetching member stats:", err))
        .finally(() => setLoading(false));
    }
  }, [isMember, selectedYear]);

  // Fetch Admin Stats with Year Filter
  useEffect(() => {
    if (isAdmin) {
      setLoading(true);
      fetch(`${BACKEND_BASE_URL}stats/admin?year=${selectedYear}`, { credentials: "include" })
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.data) {
            setAdminStats(resData.data);
          }
        })
        .catch((err) => console.error("Error fetching admin stats:", err))
        .finally(() => setLoading(false));
    }
  }, [isAdmin, selectedYear]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500 min-h-[60vh]">
        <Loader2 className="size-8 animate-spin text-amber-500" />
        <p className="text-sm font-semibold">Loading dashboard overview...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <SEO title="ড্যাশবোর্ড - সদস্য ও এডমিন ওভারভিউ" />
      <Breadcrumb />

      {/* Header Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-[#0b1e33] p-6 rounded-3xl border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
              {user?.role === "SuperAdmin" ? "Super Admin Dashboard" : user?.role === "Admin" ? "Admin Dashboard" : "Member Portal"}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, <span className="text-amber-500">{user?.name || "Member"}</span>! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {isAdmin
              ? "System overview, active member payments, revenue metrics, and pending fines"
              : "Track your personal deposits, monthly payment status, and next deadline"}
          </p>
        </div>

        {/* Global Year Filter Dropdown */}
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/90 px-4 py-2 rounded-2xl shrink-0 relative z-10">
          <Filter className="size-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-300">Filter Year:</span>
          <Select value={selectedYear} onValueChange={(y) => setSelectedYear(y)}>
            <SelectTrigger className="h-7 w-24 text-xs font-bold border-0 bg-transparent text-amber-400 focus:ring-0 p-0">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_YEARS.map((yr) => (
                <SelectItem key={yr} value={yr} className="text-xs font-bold">
                  {yr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* RENDER MEMBER DASHBOARD */}
      {isMember && (
        <MemberDashboardView
          stats={memberStats}
          selectedYear={selectedYear}
          onYearChange={(y: string) => setSelectedYear(y)}
          onPayNow={() => navigate("/dashboard/payments/create")}
        />
      )}

      {/* RENDER ADMIN / SUPER ADMIN DASHBOARD */}
      {isAdmin && (
        <AdminDashboardView
          stats={adminStats}
          selectedYear={selectedYear}
          onYearChange={(y: string) => setSelectedYear(y)}
          onViewMember={() => navigate(`/dashboard/allpayments`)}
        />
      )}
    </div>
  );
}

{/* =========================================================
    1. MEMBER DASHBOARD VIEW COMPONENT
   ========================================================= */}
function MemberDashboardView({
  stats,
  selectedYear,
  onYearChange,
  onPayNow,
}: {
  stats: any;
  selectedYear: string;
  onYearChange: (y: string) => void;
  onPayNow: () => void;
}) {
  const totalAmount = stats?.totalAmount || 0;
  const totalMonths = stats?.totalMonths || 0;
  const totalPenalty = stats?.totalPenalty || 0;
  const accountStatus = stats?.accountStatus || "Active";
  const monthlyDepositChart = stats?.monthlyDepositChart || [];
  const pendingMonthsTable = stats?.pendingMonthsTable || [];

  const pieData = [
    { name: "Paid Months", value: totalMonths || 1, color: "#10b981" },
    { name: "Pending Months", value: pendingMonthsTable.length, color: "#ef4444" },
  ];

  return (
    <div className="space-y-8">
      {/* 4 CARD METRICS VIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Amount */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm relative overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Amount Paid</CardTitle>
            <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Banknote className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ৳ {totalAmount.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="size-3" />
              <span>Cumulative deposit balance</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Total Month */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm relative overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Months Paid</CardTitle>
            <div className="size-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <Calendar className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {totalMonths} Months
            </div>
            <p className="text-[11px] text-sky-600 dark:text-sky-400 font-medium mt-1">
              Approved monthly payments
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Total Penalty */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm relative overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Penalty / Fines</CardTitle>
            <div className="size-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <AlertTriangle className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
              ৳ {totalPenalty.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Late payment penalty charges
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Account Status */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm relative overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400">Account Status</CardTitle>
            <div className="size-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <ShieldCheck className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-sm font-bold">
                {accountStatus}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Verified active member standing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* DEDICATED NEXT PAYMENT SCHEDULE SECTION */}
      <Card className="border-[#BA9853]/40 bg-gradient-to-r from-amber-500/10 via-[#BA9853]/10 to-amber-500/5 dark:from-[#0b1e33] dark:to-slate-900 shadow-md p-6 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="size-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shrink-0">
              <Calendar className="size-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-extrabold uppercase tracking-wider">
                  Upcoming Billing Schedule
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Next Payment Date: <span className="text-amber-500">{stats?.nextPaymentDate || "10th August 2026"}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                <span className="font-semibold text-amber-600 dark:text-amber-400">Joining Date Rule:</span> Active monthly installments are calculated based on your account joining date. For accounts created after the 10th, the first active billing cycle starts from the 10th of the next month. Installments completed after the 10th incur a ৳300 late fee penalty.
              </p>
            </div>
          </div>

          <Button onClick={onPayNow} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold gap-2 px-6 py-6 rounded-2xl cursor-pointer shadow-lg shrink-0 text-sm">
            <CreditCard className="size-5" />
            <span>Pay Installment Now</span>
          </Button>
        </div>
      </Card>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Deposit Growth (Area Chart with Year Filter) */}
        <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Monthly Deposit Growth ({selectedYear})</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Your monthly deposit payments history (৳)</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <Filter className="size-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Year:</span>
              <Select value={selectedYear} onValueChange={onYearChange}>
                <SelectTrigger className="h-6 w-20 text-xs font-bold border-0 bg-transparent text-amber-500 focus:ring-0 p-0">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_YEARS.map((yr) => (
                    <SelectItem key={yr} value={yr} className="text-xs font-bold">
                      {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyDepositChart}>
                <defs>
                  <linearGradient id="colorDeposit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#BA9853" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#BA9853" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#071322",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="deposit" stroke="#BA9853" strokeWidth={3} fillOpacity={1} fill="url(#colorDeposit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Payment Status Distribution (Pie Chart) */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Payment Status</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ratio of paid vs pending months</p>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* PENDING MONTHS TABLE */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/80 dark:bg-slate-900/50 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div>
            <CardTitle className="text-base font-bold">Pending Months & Penalty Breakdown ({selectedYear})</CardTitle>
            <CardDescription className="text-xs">Unpaid monthly installments and fine assessment based on joining date</CardDescription>
          </div>
          <Button onClick={onPayNow} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold gap-2 text-xs cursor-pointer shadow-md">
            <CreditCard className="size-4" />
            <span>Make Payment</span>
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Monthly Fee</TableHead>
                <TableHead>Penalty / Fine</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingMonthsTable.length > 0 ? (
                <>
                  {pendingMonthsTable.map((item: any, idx: number) => (
                    <TableRow key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                      <TableCell className="font-bold text-slate-900 dark:text-slate-100">{item.month}</TableCell>
                      <TableCell className="text-xs text-slate-500 font-mono">{item.dueDate}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold">৳ {item.amount.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold text-rose-500">
                        {item.fine > 0 ? `৳ ${item.fine.toLocaleString()}` : "৳ 0"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={item.status === "Overdue" ? "bg-rose-500/10 text-rose-500 border-rose-500/20 font-bold text-xs" : "bg-amber-500/10 text-amber-500 border-amber-500/20 font-semibold text-xs"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" onClick={onPayNow} className="h-7 text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold gap-1 cursor-pointer shadow-sm">
                          <span>Pay ৳{(item.amount + item.fine).toLocaleString()}</span>
                          <ChevronRight className="size-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Summary Footer Row */}
                  <TableRow className="bg-slate-100/70 dark:bg-slate-900/80 font-bold">
                    <TableCell colSpan={2} className="text-slate-900 dark:text-slate-100">
                      Grand Total Outstanding Due
                    </TableCell>
                    <TableCell className="font-mono text-amber-600 dark:text-amber-400">
                      ৳ {pendingMonthsTable.reduce((sum: number, i: any) => sum + i.amount, 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-mono text-rose-500">
                      ৳ {pendingMonthsTable.reduce((sum: number, i: any) => sum + i.fine, 0).toLocaleString()}
                    </TableCell>
                    <TableCell colSpan={2} className="text-right font-mono text-emerald-600 dark:text-emerald-400">
                      Total Payable: ৳ {pendingMonthsTable.reduce((sum: number, i: any) => sum + i.amount + i.fine, 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-slate-500 font-medium">
                    🎉 Outstanding payments clear for {selectedYear}! All monthly installments are up to date.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

{/* =========================================================
    2. ADMIN & SUPER ADMIN DASHBOARD VIEW COMPONENT
   ========================================================= */}
function AdminDashboardView({
  stats,
  selectedYear,
  onYearChange,
  onViewMember,
}: {
  stats: any;
  selectedYear: string;
  onYearChange: (y: string) => void;
  onViewMember: () => void;
}) {
  const totalUsers = stats?.totalUsers || 0;
  const activeMonthRevenue = stats?.activeMonthRevenue || 0;
  const pendingPenalties = stats?.pendingPenalties || 0;
  const activeMembersCount = stats?.activeMembersCount || 0;
  const pendingMembersCount = stats?.pendingMembersCount || 0;
  const monthlyActivePaymentsChart = stats?.monthlyActivePaymentsChart || [];
  const pendingPaymentsOfUsers = stats?.pendingPaymentsOfUsers || [];

  const statusDonutData = [
    { name: "Active Members", value: activeMembersCount, color: "#10b981" },
    { name: "Pending / Blocked", value: pendingMembersCount, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-8">
      {/* 4 CARD METRICS VIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Users */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm relative overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total System Members</CardTitle>
            <div className="size-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Users className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {totalUsers} Members
            </div>
            <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
              Registered cooperative accounts
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Active Revenue */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm relative overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Collected Revenue</CardTitle>
            <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Banknote className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ৳ {activeMonthRevenue.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="size-3" />
              <span>Approved deposit funds</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Pending Penalties */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm relative overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending System Penalties</CardTitle>
            <div className="size-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <AlertTriangle className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
              ৳ {pendingPenalties.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Total overdue late fees across members
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Account Status Health */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm relative overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Account Ratio</CardTitle>
            <div className="size-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <ShieldCheck className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {totalUsers > 0 ? Math.round((activeMembersCount / totalUsers) * 100) : 100}% Active
            </div>
            <p className="text-[11px] text-sky-600 dark:text-sky-400 font-medium mt-1">
              {activeMembersCount} Active / {pendingMembersCount} Pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS SECTION (WITH YEAR FILTER) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Monthly Active Members & Payments (Bar Chart with Year Filter) */}
        <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Monthly Active Members Payments ({selectedYear})</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Active member payment counts and revenue collection</p>
            </div>
            {/* Year Filter Dropdown */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <Filter className="size-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Year:</span>
              <Select value={selectedYear} onValueChange={onYearChange}>
                <SelectTrigger className="h-6 w-20 text-xs font-bold border-0 bg-transparent text-amber-500 focus:ring-0 p-0">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_YEARS.map((yr) => (
                    <SelectItem key={yr} value={yr} className="text-xs font-bold">
                      {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyActivePaymentsChart}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#071322",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="activeMembers" name="Active Paying Members" fill="#BA9853" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: System Account Status Distribution */}
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Member Status Distribution</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active vs Pending cooperative accounts</p>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusDonutData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusDonutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* PENDING PAYMENTS OF USERS TABLE */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/80 dark:bg-slate-900/50 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div>
            <CardTitle className="text-base font-bold">Pending Payments of Users & Penalty ({selectedYear})</CardTitle>
            <CardDescription className="text-xs">Members with overdue installment months and fine calculations</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Pending Months</TableHead>
                <TableHead>Pending Amount</TableHead>
                <TableHead>Penalty / Fine</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPaymentsOfUsers.length > 0 ? (
                pendingPaymentsOfUsers.map((item: any) => (
                  <TableRow key={item.userId} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.userAvatar || DEFAULT_MEN_AVATAR}
                          alt={item.userName}
                          className="size-9 rounded-full object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.userName}</p>
                          <Badge variant="outline" className="text-[10px] text-slate-400 font-mono">
                            {item.userRole}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                      <p>{item.userEmail}</p>
                      {item.userPhone && <p className="font-mono text-amber-500">{item.userPhone}</p>}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-rose-500/10 text-rose-500 border border-rose-500/20 text-xs font-bold">
                        {item.pendingMonthsCount} Months Pending
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
                      ৳ {item.totalPendingAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-bold text-rose-500">
                      ৳ {item.totalPenalty.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={item.userStatus === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}>
                        {item.userStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={onViewMember} className="h-7 text-xs font-bold gap-1 cursor-pointer">
                        <span>View Payments</span>
                        <ArrowUpRight className="size-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-slate-500 font-medium">
                    🎉 Excellent! All member accounts have completed their monthly installment payments for {selectedYear}.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
