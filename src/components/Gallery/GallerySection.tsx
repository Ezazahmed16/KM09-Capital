import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Play,
  Pause,
  Maximize2,
  Calendar,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
} from "lucide-react";

import { BACKEND_BASE_URL } from "@/constants";

export interface GalleryItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  date?: string;
  location?: string;
  description?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "কেএম০৯ ক্যাপিটাল বাৎসরিক সাধারণ সভা ২০২৬",
    subtitle: "Annual General Assembly 2026",
    category: "সদস্য সভা",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    date: "১৫ জানুয়ারি, ২০২৬",
    location: "ঢাকা, বাংলাদেশ",
    description: "সকল সক্রিয় সদস্যের উপস্থিতিতে ২০২৬ সালের বার্ষিক কর্মপরিকল্পনা ও সঞ্চয় প্রবৃদ্ধি বিষয়ক বিশেষ সভা।",
  },
  {
    id: "g2",
    title: "ব্যবসা সম্প্রসারণ ও যৌথ বিনিয়োগ সেমিনার",
    subtitle: "Joint Investment Summit",
    category: "বিনিয়োগ আয়োজন",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    date: "১০ মার্চ, ২০২৬",
    location: "কক্সবাজার, বাংলাদেশ",
    description: "পারস্পরিক ব্যবসায়িক উদ্যোগ প্রসার ও নতুন বিনিয়োগ প্রকল্পের সম্ভাব্যতা পর্যালোচনা সেমিনার।",
  },
  {
    id: "g3",
    title: "কেএম০৯ সদস্য পরিবার মিলনমেলা",
    subtitle: "Members & Family Get-Together",
    category: "বার্ষিক মিলনমেলা",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
    date: "২৫ এপ্রিল, ২০২৬",
    location: "গাজীপুর রিসোর্ট",
    description: "কেএম০৯ পরিবারের সকল সদস্য ও তাদের স্বজনদের নিয়ে আয়োজিত মনোরম বাৎসরিক মিলনমেলা ও আনন্দ আয়োজন।",
  },
  {
    id: "g4",
    title: "সামাজিক কল্যাণ ও আর্থিক সহায়তা প্রকল্প",
    subtitle: "CSR & Social Welfare Initiative",
    category: "সামাজিক উদ্যোগ",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
    date: "১২ মে, ২০২৬",
    location: "সিলেট, বাংলাদেশ",
    description: "কেএম০৯ ফাউন্ডেশন তহবিলের মাধ্যমে প্রান্তিক সমবায়ীদের পাশে দাঁড়ানোর বিশেষ সামাজিক সহায়তা কর্মসূচি।",
  },
  {
    id: "g5",
    title: "রিয়েল-টাইম লেজার ও প্রযুক্তি প্রশিক্ষণ কর্মশালা",
    subtitle: "FinTech & Ledger Workshop",
    category: "সদস্য সভা",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    date: "০৫ জুন, ২০২৬",
    location: "ঢাকা কার্যালয়",
    description: "সদস্যদের সুবিধার্থে কেএম০৯ ডিজিটাল ড্যাশবোর্ড ও স্বচ্ছ হিসাব ট্র্যাকিং বিষয়ক কর্মশালা।",
  },
  {
    id: "g6",
    title: "নতুন ল্যান্ড প্রজেক্ট সফর ও ফিজিবিলিটি ট্রিপ",
    subtitle: "Site Visit & Feasibility Tour",
    category: "বিনিয়োগ আয়োজন",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    date: "১৮ জুলাই, ২০২৬",
    location: "পূর্বাঞ্চল, ঢাকা",
    description: "নতুন যৌথ জমি ক্রয় ও দীর্ঘমেয়াদী বিনিয়োগ প্রকল্পের বাস্তব জমি দর্শন ও কারিগরি পরিদর্শন।",
  },
];

const CATEGORIES = ["সকল ছবি", "বার্ষিক মিলনমেলা", "সদস্য সভা", "বিনিয়োগ আয়োজন", "সামাজিক উদ্যোগ"] as const;

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>("সকল ছবি");
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}gallery`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.data && Array.isArray(resData.data) && resData.data.length > 0) {
          setItems(resData.data);
        }
      })
      .catch((err) => console.error("Error fetching live gallery items:", err));
  }, []);

  const filteredItems = selectedCategory === "সকল ছবি"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    if (!api) return;

    setCurrentSlide(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const toggleAutoplay = () => {
    const autoplay = plugin.current;
    if (!autoplay) return;

    if (isPlaying) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105"
                  : "bg-white/80 dark:bg-[#0b1e33]/60 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-500 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* FEATURE SHADCN CAROUSEL */}
      <div className="relative mb-14 bg-slate-900/60 rounded-3xl p-3 sm:p-5 border border-slate-200/50 dark:border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{ loop: true, align: "center" }}
          className="w-full"
        >
          <CarouselContent>
            {filteredItems.map((item) => (
              <CarouselItem key={item.id}>
                <div className="relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[480px] md:min-h-[560px] group flex flex-col justify-end bg-slate-950">
                  {/* Slide Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                  {/* Slide Content */}
                  <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-amber-500 text-slate-950 font-bold border-0 text-xs">
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-slate-300 text-xs font-semibold bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                        <Calendar className="size-3 text-amber-500" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300 text-xs font-semibold bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                        <MapPin className="size-3 text-rose-400" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                      {item.title}
                    </h2>

                    {item.subtitle && (
                      <p className="text-amber-500/90 text-xs sm:text-sm font-mono font-bold tracking-wide uppercase">
                        {item.subtitle}
                      </p>
                    )}

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {item.description}
                    </p>

                    <div className="pt-2 flex items-center gap-3">
                      <Button
                        onClick={() => setActiveLightboxItem(item)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                      >
                        <Maximize2 className="size-4" />
                        <span>Full Image View</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Custom Overlay Controls */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl">
            {/* Slide Index Counter */}
            <span className="px-3 text-xs font-mono font-bold text-amber-500">
              {currentSlide + 1} / {filteredItems.length}
            </span>

            {/* Play / Pause Toggle */}
            <button
              onClick={toggleAutoplay}
              aria-label={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
              className="p-2 rounded-xl text-slate-300 hover:text-amber-500 hover:bg-slate-800/80 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
          </div>

          {/* Nav Buttons */}
          <CarouselPrevious className="left-4 sm:left-8 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 border-slate-800 size-10 rounded-xl" />
          <CarouselNext className="right-4 sm:right-8 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 border-slate-800 size-10 rounded-xl" />
        </Carousel>
      </div>

      {/* THUMBNAIL GALLERY GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="size-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">সবগুলো ছবি ও গ্যালারি সংগ্রহ</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">ছবি বড় করে দেখতে যেকোনো ইমেজে ক্লিক করুন</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              onClick={() => {
                api?.scrollTo(idx);
                setActiveLightboxItem(item);
              }}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 font-bold border-0 text-[10px]">
                  {item.category}
                </Badge>
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="size-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Maximize2 className="size-5" />
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3 text-amber-500" />
                    <span>{item.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3 text-rose-400" />
                    <span>{item.location}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX FULLSCREEN DIALOG */}
      <Dialog open={!!activeLightboxItem} onOpenChange={() => setActiveLightboxItem(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-slate-950 border-slate-800 text-white rounded-3xl">
          <DialogTitle className="sr-only">
            {activeLightboxItem?.title || "Gallery Preview"}
          </DialogTitle>
          {activeLightboxItem && (
            <div className="relative flex flex-col">
              {/* Close Button */}
              <DialogClose className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 cursor-pointer">
                <X className="size-5" />
              </DialogClose>

              {/* High Res Image */}
              <div className="relative w-full max-h-[70vh] overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              {/* Info Description */}
              <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500 text-slate-950 font-bold border-0 text-xs">
                    {activeLightboxItem.category}
                  </Badge>
                  <span className="text-slate-400 text-xs">{activeLightboxItem.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{activeLightboxItem.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{activeLightboxItem.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
