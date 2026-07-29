import React, { useState, useEffect } from "react";
import HeroBlog from "@/components/Blog/HeroBlog";
import Blog4, { Blog5Article } from "@/components/ui/blog-4";
import Sponsorship from "@/components/Shared/Sponsorship";
import BottomBanner from "@/components/Home/BottomBanner";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { BACKEND_BASE_URL } from "@/constants";
import SEO from "@/components/Shared/SEO";

const SAMPLE_ARTICLES: Blog5Article[] = [
  {
    id: "b1",
    category: "সঞ্চয় ও বিনিয়োগ",
    readTime: "৫ মিনিট পঠিত",
    title: "স্মার্ট সঞ্চয় ও সমবায় উদ্যোগে আর্থিক নিরাপত্তা নিশ্চিতকরণ",
    subtitle: "Smart Savings & Cooperative Financial Security",
    date: "২০ জুলাই, ২০২৬",
    description: "দীর্ঘমেয়াদী মূলধন বৃদ্ধি ও পারস্পরিক সহযোগিতার মাধ্যমে পারিবারিক আর্থিক ভিত্তি সুদৃঢ় করার কার্যকরী টিপস ও বাস্তব সমবায় গাইডলাইন।",
    author: {
      name: "Ezaz Ahmed",
      role: "Managing Director",
      avatar: "https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=1160&auto=format&fit=crop",
    },
    href: "/blog/b1",
    accent: "violet",
    imageSrc: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80",
    imageAlt: "Financial growth and smart investment notes",
  },
  {
    id: "b2",
    category: "যৌথ ব্যবসা",
    readTime: "৭ মিনিট পঠিত",
    title: "কেন যৌথ বিনিয়োগ প্রজেক্টে ঝুঁকি কম এবং প্রবৃদ্ধি বেশি?",
    subtitle: "Why Joint Investments Lower Risks & Boost Growth",
    date: "১৫ জুলাই, ২০২৬",
    description: "একক উদ্যোগের পরিবর্তে সম্মিলিত মূলধন ব্যবহারের মাধ্যমে বড় বাণিজ্যিক প্রজেক্টে সফল হওয়ার বাস্তবিক বিশ্লেষণ ও দিকনির্দেশনা।",
    author: {
      name: "Rahim Uddin",
      role: "Senior Member",
      avatar: "https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=1160&auto=format&fit=crop",
    },
    href: "/blog/b2",
    accent: "green",
    imageSrc: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    imageAlt: "Business partnership and handshake",
  },
  {
    id: "b3",
    category: "প্রযুক্তি ও লেজার",
    readTime: "৪ মিনিট পঠিত",
    title: "ডিজিটাল ড্যাশবোর্ডে রিয়েল-টাইম সমবায় হিসাব ট্র্যাকিং",
    subtitle: "Real-Time Ledger Tracking on Digital Dashboard",
    date: "১০ জুলাই, ২০২৬",
    description: "স্বচ্ছতা ও নির্ভরযোগ্যতা বজায় রাখতে সমবায় ব্যবস্থাপনায় আধুনিক ডিজিটাল হিসাব ব্যবস্থার গুরুত্ব ও ব্যবহারবিধি।",
    author: {
      name: "Jane Doe",
      role: "Tech Lead & Admin",
      avatar: "https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=1160&auto=format&fit=crop",
    },
    href: "/blog/b3",
    accent: "blue",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Modern analytical dashboard on screen",
  },
];

const CATEGORIES = ["সকল বিষয়", "সঞ্চয় ও বিনিয়োগ", "যৌথ ব্যবসা", "প্রযুক্তি ও লেজার", "রিয়েল এস্টেট", "সামাজিক কল্যাণ", "আইন ও সমবায় নীতি"] as const;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("সকল বিষয়");
  const [articles, setArticles] = useState<Blog5Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BACKEND_BASE_URL}blogs`)
      .then((res) => res.json())
      .then((resData) => {
        const blogList = resData?.data || (Array.isArray(resData) ? resData : []);
        if (Array.isArray(blogList) && blogList.length > 0) {
          const mapped: Blog5Article[] = blogList.map((item: any, idx: number) => ({
            id: item.id,
            category: item.category || "সঞ্চয় ও বিনিয়োগ",
            readTime: item.readTime || "৫ মিনিট পঠিত",
            title: item.title,
            subtitle: item.subtitle || "",
            date: item.date || "",
            description: item.description || "",
            author: {
              name: item.authorName || "Ezaz Ahmed",
              role: item.authorRole || "Managing Director",
              avatar: item.authorAvatar || "https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=1160&auto=format&fit=crop",
            },
            href: `/blog/${item.id}`,
            accent: (idx % 3 === 0 ? "violet" : idx % 3 === 1 ? "green" : "blue"),
            imageSrc: item.image,
            imageAlt: item.title,
          }));
          setArticles(mapped);
        } else {
          setArticles(SAMPLE_ARTICLES);
        }
      })
      .catch((err) => {
        console.error("Error fetching live blogs from backend:", err);
        setArticles(SAMPLE_ARTICLES);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "সকল বিষয়" || article.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const blogData = {
    badge: "KM09 CAPITAL BLOGS",
    heading: "আমাদের নিবন্ধ ও বিষয়ভিত্তিক আলোচনা",
    description: "কেএম০৯ ক্যাপিটাল-এর ব্যবসায়িক অভিজ্ঞতা, সমবায় ব্যবস্থাপনা, সঞ্চয় উন্নয়ন ও স্মার্ট বিনিয়োগ বিষয়ক বিশেষ নিবন্ধসমূহ।",
    viewAllLabel: "নিবন্ধ তালিকা",
    viewAllHref: "/blog",
    articles: filteredArticles,
  };

  return (
    <div className="bg-slate-50 dark:bg-[#071322] min-h-screen text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <SEO
        title="ব্লগ - সমবায় ও আর্থিক গাইডলাইন নিবন্ধ"
        description="কেএম০৯ ক্যাপিটাল-এর ব্যবসায়িক অভিজ্ঞতা, সমবায় ব্যবস্থাপনা, সঞ্চয় উন্নয়ন ও স্মার্ট বিনিয়োগ বিষয়ক বিষয়ভিত্তিক ব্লগ নিবন্ধসমূহ।"
      />
      {/* Hero Banner */}
      <HeroBlog />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0b1e33]/70 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105"
                    : "bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-500 border border-slate-200/60 dark:border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 w-full md:w-72">
            <Search className="size-4 text-slate-400 shrink-0" />
            <Input
              placeholder="ব্লগ লিখে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 bg-transparent p-0 text-xs sm:text-sm h-auto"
            />
          </div>
        </div>

        {/* Loading Spinner or Blog-4 Section Component */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="size-8 animate-spin text-amber-500" />
            <p className="text-sm font-semibold">লাইভ ব্লগ নিবন্ধসমূহ লোড হচ্ছে...</p>
          </div>
        ) : (
          <Blog4
            data={blogData}
            renderArticleLink={({ href, children }) => (
              <div
                onClick={() => {
                  const id = href.replace("/blog/", "");
                  navigate(`/blog/${id}`);
                }}
                className="cursor-pointer"
              >
                {children}
              </div>
            )}
          />
        )}
      </main>

      {/* Sponsorship & Bottom Banner */}
      <Sponsorship />
      <BottomBanner />
    </div>
  );
}
