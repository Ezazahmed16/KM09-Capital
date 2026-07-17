import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth-context";
import { BACKEND_BASE_URL } from "@/constants";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Mail, Shield, ToggleLeft, Save } from "lucide-react";
import { toast } from "sonner";

export default function MyAccount() {
  const { user, refreshSession } = useAuth();
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || name.trim() === "") {
      toast.error("Name is required");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}myaccount`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update profile details");
      }

      await refreshSession();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setUpdating(false);
    }
  };

  const getInitials = (name = "") => {
    const names = name.split(" ");
    let initials = names[0]?.substring(0, 1).toUpperCase() || "";
    if (names.length > 1) {
      initials += names[names.length - 1]?.substring(0, 1).toUpperCase() || "";
    }
    return initials || "U";
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <Breadcrumb />

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">My Account</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Manage your personal details, role configurations, and credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24 border-2 border-amber-500/30">
                {user?.image && <AvatarImage src={user.image} alt={user.name} />}
                <AvatarFallback className="text-2xl font-bold bg-amber-500/10 text-amber-500">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {user?.name}
            </CardTitle>
            <CardDescription className="text-slate-400 dark:text-slate-500 text-xs">
              Joined on {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Role</span>
              <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                {user?.role}
              </Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Status</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-0 font-semibold">
                {user?.userStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="md:col-span-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <User className="h-5 w-5 text-amber-500" /> Account Profile
            </CardTitle>
            <CardDescription className="text-slate-400 dark:text-slate-500 text-xs">
              Update your public display information and check your user metadata.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={updating}
                    className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus-visible:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-slate-400" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-slate-100/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-slate-400" /> Security Role
                  </Label>
                  <Input
                    value={user?.role || ""}
                    disabled
                    className="bg-slate-100/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                    <ToggleLeft className="h-4 w-4 text-slate-400" /> Account Status
                  </Label>
                  <Input
                    value={user?.userStatus || ""}
                    disabled
                    className="bg-slate-100/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={updating}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  {updating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
