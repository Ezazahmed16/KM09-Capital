import { useNavigate } from "react-router";
import { useAuth } from "@/providers/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ShieldAlert, LogOut, ArrowLeft } from "lucide-react";
import Logo from "@/../public/Logo.png";

export default function PendingApproval() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-radial from-slate-900 via-slate-950 to-black px-4 py-12 dark:from-slate-950 dark:via-black dark:to-black">
      {/* Background ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] h-[80%] w-[60%] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute -bottom-[40%] -right-[20%] h-[80%] w-[60%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8 animate-fade-in">
          <img src={Logo} alt="KM09 Capital Logo" className="h-28 w-auto filter drop-shadow-[0_4px_20px_rgba(186,152,83,0.15)]" />
        </div>

        <Card className="border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <CardHeader className="space-y-4 text-center pb-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 animate-pulse">
              <Clock className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-extrabold tracking-tight text-white">
                অনুমোদনের অপেক্ষায় রয়েছে
              </CardTitle>
              <CardDescription className="text-amber-400 font-semibold text-sm">
                Awaiting Admin Approval
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-center py-4 space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              KM09 Capital-এ নিবন্ধনের জন্য আপনাকে ধন্যবাদ, <span className="font-bold text-white">{user?.name}</span>!
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              আপনার অ্যাকাউন্টটি বর্তমানে অ্যাডমিন অনুমোদনের অপেক্ষায় রয়েছে। অ্যাডমিন আপনার অ্যাকাউন্টটি সক্রিয় (Active) করার পর আপনি ড্যাশবোর্ড এবং সকল মেম্বার ফিচারসমূহ অ্যাক্সেস করতে পারবেন।
            </p>
            <div className="flex items-center gap-2 justify-center rounded-lg border border-slate-800 bg-slate-950/40 p-3 text-left text-xs text-slate-500">
              <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500" />
              <span>নিরাপত্তা নিশ্চিত করতে অ্যাডমিন যাচাইকরণ প্রয়োজন। সাধারণত ২৪ ঘণ্টার মধ্যে এটি সম্পন্ন হয়।</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 pt-4 border-t border-slate-800/60">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-red-900/50 hover:bg-red-950/20 text-red-400 hover:text-red-300 font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> লগআউট করুন (Log Out)
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="w-full text-slate-400 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> মূল ওয়েবসাইটে ফিরে যান
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
