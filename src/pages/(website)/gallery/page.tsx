import React from "react";
import HeroGallery from "@/components/Gallery/HeroGallery";
import GallerySection from "@/components/Gallery/GallerySection";
import Sponsorship from "@/components/Shared/Sponsorship";
import BottomBanner from "@/components/Home/BottomBanner";
import SEO from "@/components/Shared/SEO";

const GalleryPage: React.FC = () => {
  return (
    <main className="bg-slate-50 dark:bg-[#071322] min-h-screen text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <SEO
        title="গ্যালারি - ইভেন্ট ও মেমোরি সমূহ"
        description="KM09 CAPITAL এর বিভিন্ন ইভেন্ট, সামাজিক আয়োজন এবং ফটো গ্যালারি।"
      />
      {/* Hero Banner */}
      <HeroGallery />

      {/* Main Gallery Section with Shadcn Carousel */}
      <div className="flex-1">
        <GallerySection />
      </div>

      {/* Sponsorship & Bottom Banner */}
      <Sponsorship />
      <BottomBanner />
    </main>
  );
};

export default GalleryPage;
