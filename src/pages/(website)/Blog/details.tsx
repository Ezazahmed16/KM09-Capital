import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  CheckCircle2,
  User,
  Tag,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Sponsorship from "@/components/Shared/Sponsorship";
import BottomBanner from "@/components/Home/BottomBanner";
import { Blog5ArticleCard, Blog5Article } from "@/components/ui/blog-4";
import { BACKEND_BASE_URL } from "@/constants";
import SEO from "@/components/Shared/SEO";

const BLOG_DATABASE: Record<string, Blog5Article & { fullContent: string[]; keyTakeaways: string[] }> = {
  b1: {
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
    imageSrc: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&q=80",
    imageAlt: "Financial growth and smart investment notes",
    keyTakeaways: [
      "প্রতিটি আয়ের অন্তত ২০-৩০% নিয়মিত সমবায় আমানতে জমা রাখা।",
      "ব্যক্তিগত ক্রয়ের পরিবর্তে যৌথ মূলধনে টেকসই সম্পদে বিনিয়োগ।",
      "স্বচ্ছ ডিজিটাল হিসাব ড্যাশবোর্ডের মাধ্যমে সঞ্চয় প্রবৃদ্ধি অনুসরণ।",
    ],
    fullContent: [
      "বর্তমান সময়ে অর্থনৈতিক স্থিতিশীলতা ও ভবিষ্যৎ সুরক্ষার জন্য কেবল সাধারণ ব্যাংক সঞ্চয়ই যথেষ্ট নয়। সঠিক কৌশলগত সমবায় ব্যবস্থার মাধ্যমে মূলধন একত্রিত করে যৌথ বিনিয়োগে অংশ নিলে মুদ্রাস্ফীতিকে অতিক্রম করে উচ্চ মুনাফা অর্জন করা সম্ভব।",
      "কেএম০৯ ক্যাপিটাল সদস্যভিত্তিক একটি আধুনিক ও ডিজিটাল সমবায় প্ল্যাটফর্ম, যা সদস্যদের প্রতিটি জমার সুরক্ষা নিশ্চিত করতে স্বচ্ছ নীতি অনুসরণ করে। এখানে নিয়মিত মাসিক কিস্তির মাধ্যমে তহবিল গঠন এবং সেই তহবিল লাভজনক জমি ও বাণিজ্যিক প্রজেক্টে রূপান্তর করা হয়।",
      "সমবায় ব্যবস্থার অন্যতম মূল শক্তি হলো ঝুঁকিমুক্ত সম্মিলিত উদ্যোগ। যখন বহু সদস্যের সঞ্চয় একসাথে যুক্ত হয়, তখন যেকোনো বড় জমি বা লাভজনক ব্যবসায়িক উদ্যোগে কৌশলগত অগ্রাধিকার বজায় থাকে।",
    ],
  },
  b2: {
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
    imageSrc: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    imageAlt: "Business partnership and handshake",
    keyTakeaways: [
      "একক ব্যক্তির ওপর পুরো আর্থিক ঝুঁকি না রেখে ঝুঁকি সমানভাবে ভাগ করে নেওয়া।",
      "অভিজ্ঞ উদ্যোক্তাদের যৌথ সিদ্ধান্তে বাজারের সঠিক সুযোগ কাজে লাগানো।",
      "বৃহৎ পরিমাণের প্রজেক্টে অর্থনৈতিক স্কেলের সুবিধা লাভ করা।",
    ],
    fullContent: [
      "বাণিজ্যিক বিশ্বে একক বিনিয়োগকারীর জন্য বড় কোনো জমি বা রিয়েল এস্টেট প্রজেক্টে প্রবেশ করা অধিকাংশ সময় চ্যালেঞ্জিং হয়ে দাঁড়ায়। কিন্তু যৌথ বিনিয়োগ ব্যবস্থায় ছোট ছোট সঞ্চয় একসাথে যুক্ত হয়ে একটি বিশাল শক্তিশালী তহবিলে রূপান্তরিত হয়।",
      "যৌথ প্রজেক্টের প্রধান সুবিধা হলো ঝুঁকি বন্টন বা রিস্ক ডাইভারসিফিকেশন। প্রজেক্টে কোনো প্রতিকূল পরিস্থিতি সৃষ্টি হলেও তা পুরো সমবায় কমিটির সমন্বিত পরিকল্পনায় কাটিয়ে ওঠা সম্ভব হয়।",
    ],
  },
  b3: {
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
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    imageAlt: "Modern analytical dashboard on screen",
    keyTakeaways: [
      "২৪/৭ মোবাইল ও পিসি ড্যাশবোর্ড থেকে আমানত ভেরিফিকেশন।",
      "ইনস্ট্যান্ট পেমেন্ট রসিদ ও ট্রানজাকশন হিস্ট্রি ট্র্যাকিং।",
      "অটোমেটেড লেজার গণনায় ম্যানুয়াল ভুলের সুযোগ দূরীকরণ।",
    ],
    fullContent: [
      "প্রথাগত খাতা-কলমের হিসাব সমবায় সদস্যদের মনে সংশয় তৈরি করতে পারে। কেএম০৯ ক্যাপিটাল প্রযুক্তিভিত্তিক ড্যাশবোর্ড ব্যবস্থার মাধ্যমে প্রতিটি সদস্যের জমা টাকা, জরিমানা ভেরিফিকেশন ও মোট ব্যালেন্স রিয়েল-টাইমে আপডেট করে।",
      "নিরাপদ ডাটাবেস ও ক্লাউড প্রযুক্তির সাহায্যে তৈরি ড্যাশবোর্ডে যেকোনো পেমেন্ট যেমন bKash বা ব্যাংক ট্রান্সফার ভেরিফাই করার সাথে সাথেই সদস্য তার অ্যাকাউন্টে জমা দেখতে পান।",
    ],
  },
};

const RELATED_BLOGS: Blog5Article[] = [
  BLOG_DATABASE.b1,
  BLOG_DATABASE.b2,
  BLOG_DATABASE.b3,
];

export default function BlogDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liveArticle, setLiveArticle] = useState<any>(null);

  useEffect(() => {
    if (id && !id.startsWith("b")) {
      fetch(`${BACKEND_BASE_URL}blogs/${id}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.data) {
            const item = resData.data;
            setLiveArticle({
              id: item.id,
              category: item.category || "সঞ্চয় ও বিনিয়োগ",
              readTime: item.readTime || "৫ মিনিট পঠিত",
              title: item.title,
              subtitle: item.subtitle,
              date: item.date,
              description: item.description,
              author: {
                name: item.authorName || "Ezaz Ahmed",
                role: item.authorRole || "Managing Director",
                avatar: item.authorAvatar || "https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=1160&auto=format&fit=crop",
              },
              href: `/blog/${item.id}`,
              accent: "violet",
              imageSrc: item.image,
              imageAlt: item.title,
              keyTakeaways: Array.isArray(item.keyTakeaways) ? item.keyTakeaways : [],
              fullContent: item.fullContent
                ? item.fullContent.split("\n").filter((p: string) => p.trim().length > 0)
                : (item.description ? [item.description] : [""]),
            });
          }
        })
        .catch((err) => console.error("Error fetching single blog details:", err));
    }
  }, [id]);

  const defaultArticle = (id && BLOG_DATABASE[id]) ? BLOG_DATABASE[id] : BLOG_DATABASE.b1;
  const article = liveArticle || defaultArticle;

  return (
    <div className="bg-slate-50 dark:bg-[#071322] min-h-screen text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <SEO
        title={article.title}
        description={article.description || article.subtitle || article.title}
      />
      {/* Top Banner & Navigation */}
      <section className="bg-[#071322] pt-32 pb-14 border-b border-slate-800 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 relative z-10">
          <Button
            variant="outline"
            onClick={() => navigate("/blog")}
            className="gap-2 bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 border-slate-700 text-slate-200 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>ব্লগ তালিকায় ফিরুন</span>
          </Button>

          <div className="flex items-center gap-3 flex-wrap">
            <Badge className="bg-amber-500 text-slate-950 font-bold border-0 text-xs">
              {article.category}
            </Badge>
            <span className="flex items-center gap-1 text-slate-400 text-xs">
              <Calendar className="size-3 text-amber-500" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400 text-xs">
              <Clock className="size-3 text-amber-500" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-500 leading-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-slate-400 text-xs sm:text-sm font-mono tracking-wide">
              {article.subtitle}
            </p>
          )}

          {/* Author Card */}
          {article.author && (
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="size-10 rounded-full object-cover border border-amber-500/40 shrink-0"
              />
              <div>
                <p className="text-sm font-bold text-white">{article.author.name}</p>
                <p className="text-xs text-amber-500">{article.author.role}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Article Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 space-y-10">
        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-[16/9]">
          <img
            src={article.imageSrc}
            alt={article.title}
            className="size-full object-cover"
          />
        </div>

        {article.keyTakeaways && (
          <Card className="border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl">
            <CardContent className="p-6 space-y-3">
              {/* Article Body Content */}
              <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                {article.fullContent.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}



        {/* Social Share & Action Bar */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0b1e33]/70 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Share2 className="size-4 text-amber-500" />
            <span>নিবন্ধটি শেয়ার করুন</span>
          </span>
          <Button
            size="sm"
            onClick={() => navigate("/blog")}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold gap-2 cursor-pointer shadow-md text-xs"
          >
            <BookOpen className="size-3.5" />
            <span>আরও ব্লগ পড়ুন</span>
          </Button>
        </div>

        {/* Related Articles */}
        {/* <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">সম্পর্কিত অন্যান্য ব্লগ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED_BLOGS.map((rel) => (
              <Blog5ArticleCard
                key={rel.id}
                article={rel}
                renderArticleLink={({ href, children }) => (
                  <div
                    onClick={() => {
                      const id = href.replace("/blog/", "");
                      navigate(`/blog/${id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="cursor-pointer"
                  >
                    {children}
                  </div>
                )}
              />
            ))}
          </div>
        </div> */}
      </main>

      {/* Sponsorship & Bottom Banner */}
      <BottomBanner />
    </div>
  );
}
