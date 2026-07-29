import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/providers/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";
import Logo from '@/../public/Logo.png';
import SEO from "@/components/Shared/SEO";

export default function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your email and password.");
    } finally {
      setSubmitting(false);
    }
  };

  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
    `,
    backgroundSize: '36px 36px',
  };

  return (
    <>
      <SEO
        title="লগইন - KM09 CAPITAL"
        description="KM09 CAPITAL মেম্বার পোর্টালে প্রবেশ করুন এবং আপনার সঞ্চয় ও অ্যাকাউন্ট স্ট্যাটাস পর্যবেক্ষণ করুন।"
      />
      <div
        className="relative flex min-h-screen items-center justify-center bg-white dark:bg-[#071322] px-4 pt-28 md:pt-36 pb-20 overflow-hidden transition-colors duration-300"
        style={gridBackgroundStyle}
      >
        {/* Soft Ambient Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(186,152,83,0.12)_0%,transparent_55%),radial-gradient(circle_at_15%_75%,rgba(241,245,249,0.9)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_25%,rgba(186,152,83,0.12)_0%,transparent_55%),radial-gradient(circle_at_15%_75%,rgba(11,30,51,0.95)_0%,transparent_50%)] pointer-events-none" />

        {/* Animated ambient backdrop elements */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#BA9853]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-md z-10">
          {/* Top Brand Badge & Logo */}
          <div className="flex flex-col items-center mb-6 text-center">
            <Link to="/" className="group mb-3">
              <img
                src={Logo}
                alt="KM09 Capital Logo"
                className="h-20 sm:h-24 w-auto filter dark:invert drop-shadow-md dark:drop-shadow-[0_4px_25px_rgba(186,152,83,0.25)] transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BA9853]/40 bg-[#BA9853]/10 px-3.5 py-1 text-xs font-semibold text-[#BA9853] tracking-wider shadow-sm">
              <Sparkles className="size-3.5 text-[#BA9853] animate-pulse" />
              KM09 CAPITAL • মেম্বার পোর্টাল
            </div>
          </div>

          {/* Login Card */}
          <Card className="relative border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0b1e33]/70 backdrop-blur-2xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#BA9853]/40 rounded-3xl overflow-hidden p-2 sm:p-4">
            {/* Top Gold Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BA9853] to-transparent opacity-80" />

            <CardHeader className="space-y-1.5 text-center pb-4 pt-4">
              <CardTitle className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                পোর্টালে <span className="text-[#BA9853]">প্রবেশ</span> করুন
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium">
                আপনার ইমেইল ও পাসওয়ার্ড দিয়ে মেম্বার পোর্টালে সাইন-ইন করুন
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="border-red-500/30 dark:border-red-900/40 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 rounded-xl animate-fade-in">
                    <AlertDescription className="text-xs font-semibold">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Email Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[#BA9853]" /> ইমেইল ঠিকানা
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-[#BA9853]/40 focus-visible:border-[#BA9853] h-11 rounded-xl transition-all"
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-[#BA9853]" /> পাসওয়ার্ড
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-[#BA9853]/40 focus-visible:border-[#BA9853] h-11 rounded-xl transition-all pr-10"
                      disabled={submitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#BA9853] dark:hover:text-[#BA9853] transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-[#BA9853] to-[#AA8A2E] hover:from-[#E5C048] hover:to-[#BB9B3D] text-slate-950 font-black h-11 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#BA9853]/25 active:scale-[0.98] cursor-pointer mt-2"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> যাচাই করা হচ্ছে...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 text-sm sm:text-base tracking-wide">
                      লগইন করুন <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 text-center border-t border-slate-100 dark:border-slate-800/60 pt-4 pb-2">
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                অ্যাকাউন্ট নেই?{" "}
                <Link to="/register" className="font-bold text-[#BA9853] hover:text-[#E5C048] transition-colors underline underline-offset-4 ml-1">
                  নতুন নিবন্ধন করুন
                </Link>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-500 text-xs font-semibold pt-1">
                <ShieldCheck className="size-3.5 text-[#BA9853]" />
                <span>নিরাপদ ২৫৬-বিট এনক্রিপ্টেড সেশন</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

