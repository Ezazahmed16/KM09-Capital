import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroAllMembers from "@/components/AllMembers/HeroAllMembers";
import Card6 from "@/components/ui/card-6";
import BottomBanner from "@/components/Home/BottomBanner";
import { BACKEND_BASE_URL } from "@/constants";
import { User } from "@/types";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Users, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const AllMembersPage: React.FC = () => {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchMembers = async (search = "") => {
    setLoading(true);
    try {
      const url = new URL(`${BACKEND_BASE_URL}allMembers`);
      url.searchParams.set("limit", "100");
      if (search.trim()) {
        url.searchParams.set("search", search.trim());
      }

      const response = await fetch(url.toString(), {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch members list");
      }

      const result = await response.json();
      if (result && Array.isArray(result.data)) {
        setMembers(result.data);
      } else {
        setMembers([]);
      }
    } catch (err: any) {
      console.error("Error fetching members:", err);
      toast.error("সদস্য তালিকা লোড করতে সমস্যা হয়েছে।");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(searchQuery);
  }, [searchQuery]);

  const handleContact = (member: User) => {
    if (member.email) {
      window.location.href = `mailto:${member.email}`;
    } else {
      toast.info(`${member.name}-এর ইমেইল যোগ করা রয়েছে।`);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#071322] min-h-screen text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Top Hero Banner */}
      <HeroAllMembers />

      {/* Main Members Section */}
      <section className="relative z-10 py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 bg-white/80 dark:bg-[#0b1e33]/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-slate-950/40"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <Users className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">সদস্য তালিকা</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">মোট {members.length} জন নিবন্ধিত সদস্য রয়েছে</p>
            </div>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="নাম দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-100/80 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus-visible:ring-amber-500 h-10 text-sm rounded-xl"
            />
          </div>
        </motion.div>

        {/* Member Cards Grid with Motion */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">সদস্যদের তথ্য লোড হচ্ছে...</p>
          </div>
        ) : members.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {members.map((member) => (
              <motion.div key={member.id} variants={itemVariants}>
                <Card6 member={member} onContactClick={handleContact} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 px-4 bg-white/60 dark:bg-[#0b1e33]/20 border border-slate-200 dark:border-slate-800/60 rounded-2xl text-center"
          >
            <AlertCircle className="h-10 w-10 text-amber-500/60 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">কোন সদস্য পাওয়া যায়নি</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
              আপনার অনুসন্ধানের সাথে মিল রেখে কোন সদস্য পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম লিখে চেষ্টা করুন।
            </p>
          </motion.div>
        )}
      </section>

      {/* Bottom Banner */}
      <BottomBanner />
    </div>
  );
};

export default AllMembersPage;
