import React from "react";
import { motion } from "framer-motion";
import { Download, FileText, FileCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DocumentDownload: React.FC = () => {
  const handleDownloadForm = () => {
    toast.success("মেম্বারশিপ ফর্ম ডাউনলোড শুরু হয়েছে...");
    const link = document.createElement("a");
    link.href = "/Membership-Form.pdf";
    link.download = "Membership-Form.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTerms = () => {
    toast.success("নীতিমালা পিডিএফ ডাউনলোড শুরু হয়েছে...");
    const link = document.createElement("a");
    link.href = "/Terms-Conditions.pdf";
    link.download = "Terms-Conditions.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative py-16 md:py-24 bg-slate-50 dark:bg-[#071322] text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-slate-900/80 transition-colors duration-300 overflow-hidden">
      {/* Background Accent Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#BA9853]/10 rounded-full blur-[130px] pointer-events-none hidden dark:block" />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-white dark:bg-[#0b1e33]/90 rounded-3xl p-8 sm:p-12 md:p-14 border border-slate-200/90 dark:border-[#BA9853]/30 shadow-xl dark:shadow-2xl dark:shadow-slate-950/50 text-center backdrop-blur-md overflow-hidden"
        >
          {/* Top Decorative Gold Accent Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-transparent via-[#BA9853] to-transparent rounded-full" />

          {/* Vertical Stack: Badge -> Heading -> Paragraph */}
          <div className="flex flex-col items-center max-w-2xl mx-auto mb-8 sm:mb-10">
            {/* Section Badge / Kicker */}
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#BA9853]/40 bg-[#BA9853]/10 text-[#BA9853] dark:text-[#D4AF37] font-semibold text-xs tracking-wider uppercase mb-5 shadow-xs"
            >
              <FileCheck className="size-3.5 text-[#BA9853]" />
              <span>প্রয়োজনীয় ডকুমেন্টস (Essential Documents)</span>
            </Badge>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug mb-4">
              সদস্যপদ গ্রহণ এবং নীতিমালার কপি সংগ্রহ করুন।
            </h2>

            {/* Sub-heading / Tagline */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
              KM09 Capital-এর অংশ হতে এবং আমাদের ফান্ডের বিস্তারিত নিয়মাবলী জানতে
              নিচের বাটন থেকে ফর্ম ও নীতিমালার পিডিএফ কপিটি ডাউনলোড করুন।
            </p>
          </div>

          {/* Download Buttons Flex Container */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 w-full max-w-xl mx-auto">
            {/* Primary Download Button */}
            <Button
              onClick={handleDownloadForm}
              className="w-full sm:w-auto min-w-[240px] h-13 px-6 rounded-xl bg-[#020817] hover:bg-[#0f172a] text-white dark:bg-[#BA9853] dark:hover:bg-[#a58444] dark:text-slate-950 font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group"
            >
              <Download className="size-5 transition-transform duration-300 group-hover:scale-110" />
              <span>মেম্বারশিপ ফর্ম ডাউনলোড</span>
            </Button>

            {/* Secondary Outline Download Button */}
            <Button
              variant="outline"
              onClick={handleDownloadTerms}
              className="w-full sm:w-auto min-w-[220px] h-13 px-6 rounded-xl border-2 border-[#BA9853]/60 dark:border-[#BA9853]/50 text-slate-800 dark:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-[#BA9853]/15 font-bold text-base shadow-xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group"
            >
              <FileText className="size-5 text-[#BA9853] transition-transform duration-300 group-hover:scale-110" />
              <span>নীতিমালা (Terms & Conditions)</span>
            </Button>
          </div>

          {/* Small Decorative Footer Note */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="size-3.5 text-[#BA9853]" />
            <span>সকল পিডিএফ ডকুমেন্টস আপডেট করা রয়েছে (PDF Format)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentDownload;
