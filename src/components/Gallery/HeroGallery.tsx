import React from "react";
import { Camera, Sparkles } from "lucide-react";

const HeroGallery = () => {
  return (
    <section
      className="relative min-h-[45vh] md:min-h-[55vh] flex flex-col justify-center bg-[#071322] bg-none md:bg-[url('/AboutBanner.png')] md:bg-cover md:bg-center md:bg-no-repeat overflow-hidden pt-32 pb-14 md:pb-20 border-b border-slate-200/50 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Dark gradient & Grid Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071322]/90 via-[#071322]/80 to-[#071322] dark:from-[#071322]/90 dark:via-[#071322]/85 dark:to-[#071322] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(186, 152, 83, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(186, 152, 83, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial glow background light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-[#BA9853]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center">
        {/* Gold Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BA9853]/15 border border-[#BA9853]/35 text-[#BA9853] text-xs font-extrabold tracking-[0.25em] uppercase mb-6 shadow-sm backdrop-blur-md">
          <Camera className="size-3.5" />
          <span>KM09 CAPITAL GALLERY</span>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-[#BA9853] leading-tight tracking-tight filter drop-shadow-[0_2px_15px_rgba(186,152,83,0.15)] mb-5 max-w-3xl"
          style={{ textWrap: "balance" }}
        >
          আমাদের মুহূর্ত ও ছবি গ্যালারি
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed mb-8">
          কেএম০৯ ক্যাপিটাল-এর বিশেষ আয়োজন, বাৎসরিক মিলনমেলা, সভা ও পরিচালনা পর্ষদের বিভিন্ন যৌথ উদ্যোগের স্মরনীয় মুহূর্তসমূহ।
        </p>

        {/* Separator Accent Line */}
        <div className="flex items-center gap-3 w-40 justify-center">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-[#BA9853]/50 flex-1" />
          <div className="size-2 rounded-full bg-[#BA9853] animate-pulse" />
          <div className="h-[1px] bg-gradient-to-l from-transparent to-[#BA9853]/50 flex-1" />
        </div>
      </div>
    </section>
  );
};

export default HeroGallery;
