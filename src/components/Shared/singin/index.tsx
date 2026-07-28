import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/providers/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";
import Logo from '@/../public/Logo.png';

export default function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      // Success: redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your email and password.");
    } finally {
      setSubmitting(false);
    }
  };

  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-[#071322] px-4 py-12 overflow-hidden"
      style={gridBackgroundStyle}
    >
      {/* Background ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(186,152,83,0.08)_0%,transparent_60%),radial-gradient(circle_at_10%_80%,rgba(11,30,51,0.9)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        <div className="flex justify-center mb-8 animate-fade-in pt-30">
          <Link to="/">
            <img src={Logo} alt="KM09 Capital Logo" className="h-32 w-auto filter drop-shadow-[0_4px_20px_rgba(186,152,83,0.15)] transition-all hover:scale-105" />
          </Link>
        </div>

        <Card className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-[0_8px_40px_rgba(186,152,83,0.06)] hover:border-[#BA9853]/35 rounded-2xl">
          <CardHeader className="space-y-2 text-center pb-4">
            <CardTitle className="text-3xl font-black tracking-tight bg-gradient-to-r from-[#BA9853] via-[#cda75c] to-[#BA9853] bg-clip-text text-transparent">
              লগইন করুন
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm font-semibold">
              KM09 Capital মেম্বার পোর্টালে প্রবেশ করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="border-red-900/30 bg-red-950/20 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-sm font-bold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#BA9853]" /> ইমেইল ঠিকানা
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-slate-800 bg-slate-950/50 text-white placeholder-slate-600 focus-visible:ring-[#BA9853]/40 focus-visible:border-[#BA9853]/40 focus:border-[#BA9853]/50"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300 text-sm font-bold flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#BA9853]" /> পাসওয়ার্ড
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-slate-800 bg-slate-950/50 text-white focus-visible:ring-[#BA9853]/40 focus-visible:border-[#BA9853]/40 focus:border-[#BA9853]/50"
                  disabled={submitting}
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#BA9853] hover:bg-[#A3813F] text-slate-950 font-black h-11 transition-all duration-300 shadow-lg hover:shadow-[#BA9853]/20 active:scale-[0.98] cursor-pointer mt-2 rounded-xl"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" /> প্রক্রিয়াকরণ হচ্ছে...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5 text-base">
                    লগইন করুন <ArrowRight className="h-4 w-4 ml-0.5" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center border-t border-slate-800/40 pt-6">
            <div className="text-sm text-slate-400 font-semibold">
              অ্যাকাউন্ট নেই?{" "}
              <Link to="/register" className="font-bold text-[#BA9853] hover:text-[#A3813F] transition-colors underline underline-offset-4">
                নিবন্ধন করুন
              </Link>
            </div>
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors font-bold">
              ← হোমপেজে ফিরে যান
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

