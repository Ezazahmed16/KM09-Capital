import React from "react";
import { Camera, Sparkles } from "lucide-react";

const HeroGallery = () => {
  return (
    <section
      className="relative min-h-[45vh] md:min-h-[55vh] flex flex-col justify-center bg-gradient-to-b from-[#050e18] via-[#071322] to-[#0b1e33] overflow-hidden pt-32 pb-14 md:pb-20 border-b border-[#BA9853]/20 transition-colors duration-300"
    >
      {/* Signature Brand Color Ambient Glow Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#BA9853]/20 via-[#D4AF37]/15 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[250px] bg-[#0b1e33] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[300px] h-[200px] bg-[#BA9853]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Dynamic Gold Geometric Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(186, 152, 83, 0.12) 0%, transparent 60%),
            linear-gradient(to right, rgba(186, 152, 83, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(186, 152, 83, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 45px 45px, 45px 45px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center">
        {/* Gold Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BA9853]/15 border border-[#BA9853]/40 text-[#BA9853] text-xs font-extrabold tracking-[0.25em] uppercase mb-6 shadow-md shadow-[#BA9853]/5 backdrop-blur-md">
          <Camera className="size-3.5 text-[#BA9853]" />
          <span>KM09 CAPITAL GALLERY</span>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-[#BA9853] leading-tight tracking-tight filter drop-shadow-[0_4px_20px_rgba(186,152,83,0.25)] mb-5 max-w-3xl"
          style={{ textWrap: "balance" }}
        >
          আমাদের মুহূর্ত ও ছবি গ্যালারি
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed mb-8">
          কেএম০৯ ক্যাপিটাল-এর বিশেষ আয়োজন, বাৎসরিক মিলনমেলা, সভা ও পরিচালনা পরিষদের বিভিন্ন যৌথ উদ্যোগের স্মরনীয় মুহূর্তসমূহ।
        </p>

        {/* Separator Accent Line */}
        <div className="flex items-center gap-3 w-40 justify-center">
          <div className="h-[1.5px] bg-gradient-to-r from-transparent to-[#BA9853] flex-1" />
          <div className="size-2 rounded-full bg-[#BA9853] shadow-md shadow-[#BA9853]/50 animate-pulse" />
          <div className="h-[1.5px] bg-gradient-to-l from-transparent to-[#BA9853] flex-1" />
        </div>
      </div>
    </section>
  );
};

export default HeroGallery;
