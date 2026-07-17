import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/providers/auth-context";
import { Loader2 } from "lucide-react";

export function DashboardGuard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.userStatus === "Pending") {
    return <Navigate to="/pending-approval" replace />;
  }

  if (user.userStatus !== "Active") {
    // Treat any other non-active states (Suspended/Inactive) as unauthenticated/blocked
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

type RoleGuardProps = {
  allowedRoles: string[];
};

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If not authorized, redirect back to dashboard index
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
