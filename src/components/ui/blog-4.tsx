"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  Bookmark,
  Heart,
  type LucideIcon,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Blog4Accent = "violet" | "green" | "blue";

export interface Blog5Article {
  id?: string;
  category: string;
  readTime: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  href?: string;
  accent: Blog4Accent;
  imageSrc: string;
  imageAlt: string;
  icon?: LucideIcon;
}

export interface Blog4Data {
  badge: string;
  heading: string;
  description: string;
  viewAllLabel: string;
  viewAllHref: string;
  articles: Blog5Article[];
  activeSlide?: number;
  slideCount?: number;
}

export interface Blog4Props {
  data?: Blog4Data;
  className?: string;
  renderViewAllLink?: (props: {
    href: string;
    children: ReactNode;
  }) => ReactNode;
  renderArticleLink?: (props: {
    href: string;
    children: ReactNode;
  }) => ReactNode;
}

const accentClasses: Record<
  Blog4Accent,
  {
    dot: string;
    iconTile: string;
    icon: string;
    cta: string;
    ctaText: string;
  }
> = {
  violet: {
    dot: "bg-amber-500",
    iconTile: "bg-amber-100 dark:bg-amber-500/20",
    icon: "text-[#BA9853] dark:text-[#BA9853]",
    cta: "bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/10 dark:hover:bg-amber-500/20",
    ctaText: "text-[#BA9853]",
  },
  green: {
    dot: "bg-emerald-500",
    iconTile: "bg-emerald-100 dark:bg-emerald-500/20",
    icon: "text-emerald-700 dark:text-emerald-300",
    cta: "bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20",
    ctaText: "text-emerald-700 dark:text-emerald-300",
  },
  blue: {
    dot: "bg-sky-500",
    iconTile: "bg-sky-100 dark:bg-sky-500/20",
    icon: "text-sky-700 dark:text-sky-300",
    cta: "bg-sky-50 hover:bg-sky-100 dark:bg-sky-500/10 dark:hover:bg-sky-500/20",
    ctaText: "text-sky-700 dark:text-sky-300",
  },
};

const defaultBlog4Data: Blog4Data = {
  badge: "KM09 CAPITAL BLOGS",
  heading: "আমাদের নিবন্ধ ও বিষয়ভিত্তিক আলোচনা",
  description:
    "কেএম০৯ ক্যাপিটাল-এর ব্যবসায়িক অভিজ্ঞতা, সমবায় ব্যবস্থাপনা, সঞ্চয় উন্নয়ন ও স্মার্ট বিনিয়োগ বিষয়ক বিশেষ নিবন্ধসমূহ।",
  viewAllLabel: "সকল নিবন্ধ দেখুন",
  viewAllHref: "/blog",
  activeSlide: 0,
  slideCount: 3,
  articles: [
    {
      id: "b1",
      category: "সঞ্চয় ও বিনিয়োগ",
      readTime: "৫ মিনিট পঠিত",
      title: "স্মার্ট সঞ্চয় ও সমবায় উদ্যোগে আর্থিক নিরাপত্তা নিশ্চিতকরণ",
      subtitle: "Smart Savings & Cooperative Financial Security",
      date: "২০ জুলাই, ২০২৬",
      description: "দীর্ঘমেয়াদী মূলধন বৃদ্ধি ও পারস্পরিক সহযোগিতার মাধ্যমে পারিবারিক আর্থিক ভিত্তি সুদৃঢ় করার কার্যকরী টিপস।",
      author: {
        name: "Ezaz Ahmed",
        role: "Managing Director",
        avatar: "https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=1160&auto=format&fit=crop",
      },
      href: "/blog/b1",
      accent: "violet",
      imageSrc:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80",
      imageAlt: "Financial growth and smart investment notes",
    },
    {
      id: "b2",
      category: "যৌথ ব্যবসা",
      readTime: "৭ মিনিট পঠিত",
      title: "কেন যৌথ বিনিয়োগ প্রজেক্টে ঝুঁকি কম এবং প্রবৃদ্ধি বেশি?",
      subtitle: "Why Joint Investments Lower Risks & Boost Growth",
      date: "১৫ জুলাই, ২০২৬",
      description: "একক উদ্যোগের পরিবর্তে সম্মিলিত মূলধন ব্যবহারের মাধ্যমে বড় প্রজেক্টে সফল হওয়ার বাস্তবিক বিশ্লেষণ।",
      author: {
        name: "Rahim Uddin",
        role: "Senior Member",
        avatar: "https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=1160&auto=format&fit=crop",
      },
      href: "/blog/b2",
      accent: "green",
      imageSrc:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
      imageAlt: "Business partnership and handshake",
    },
    {
      id: "b3",
      category: "প্রযুক্তি ও লেজার",
      readTime: "৪ মিনিট পঠিত",
      title: "ডিজিটাল ড্যাশবোর্ডে রিয়েল-টাইম সমবায় হিসাব ট্র্যাকিং",
      subtitle: "Real-Time Ledger Tracking on Digital Dashboard",
      date: "১০ জুলাই, ২০২৬",
      description: "স্বচ্ছতা ও নির্ভরযোগ্যতা বজায় রাখতে সমবায় ব্যবস্থাপনায় আধুনিক প্রযুক্তি ব্যবহারের গুরুত্ব।",
      author: {
        name: "Jane Doe",
        role: "Tech Lead & Admin",
        avatar: "https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=1160&auto=format&fit=crop",
      },
      href: "/blog/b3",
      accent: "blue",
      imageSrc:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      imageAlt: "Modern analytical dashboard on screen",
    },
  ],
};

export default function Blog4({
  data = defaultBlog4Data,
  className,
  renderViewAllLink,
  renderArticleLink,
}: Blog4Props) {
  const viewAll = (
    <Button
      asChild
      variant="ghost"
      className="text-foreground h-auto rounded-none border-b border-amber-500/50 px-0 pb-3 text-lg font-semibold hover:bg-transparent hover:text-amber-500 transition-colors"
    >
      <span>
        {data.viewAllLabel}
        <ArrowRight className="ml-4 size-5 text-amber-500" />
      </span>
    </Button>
  );

  return (
    <section className={cn("bg-transparent w-full py-12", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BA9853]/15 border border-[#BA9853]/35 text-[#BA9853] text-xs font-bold tracking-widest uppercase mb-4">
              {data.badge}
            </div>

            <h2 className="text-slate-900 dark:text-slate-100 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl leading-tight">
              {data.heading}
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-xl text-base sm:text-lg leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="pt-0 lg:pt-16">
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm sm:text-base leading-relaxed">
              ব্যবসা সম্প্রসারণ, সঞ্চয় কৌশল ও সমবায় আইন সম্পর্কে আমাদের অভিজ্ঞ সদস্যদের জ্ঞান ও দিকনির্দেশনা মূলক ব্লগ নিবন্ধ।
            </p>
            <div className="mt-6 w-fit">
              {renderViewAllLink ? (
                renderViewAllLink({
                  href: data.viewAllHref,
                  children: viewAll,
                })
              ) : (
                <a href={data.viewAllHref}>{viewAll}</a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {data.articles.map((article) => (
            <Blog5ArticleCard
              key={`${article.category}-${article.title}`}
              article={article}
              renderArticleLink={renderArticleLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blog5ArticleCard({
  article,
  renderArticleLink,
}: {
  article: Blog5Article;
  renderArticleLink?: Blog4Props["renderArticleLink"];
}) {
  const accent = accentClasses[article.accent || "violet"];

  const card = (
    <Card className="group border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/80 flex h-full flex-col overflow-hidden rounded-2xl p-0 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950">
        <img
          src={article.imageSrc}
          alt={article.imageAlt}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        <div className="bg-slate-950/80 text-amber-500 hover:bg-slate-950 absolute top-4 right-4 flex size-10 items-center justify-center rounded-full shadow-md backdrop-blur-md transition-colors">
          <Bookmark className="size-4" strokeWidth={1.8} />
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className={cn("size-2 rounded-full", accent.dot)} />
            <span className="text-amber-500">{article.category}</span>
          </div>
          <span className="text-slate-400 shrink-0 text-xs font-medium">
            {article.readTime}
          </span>
        </div>

        <h3 className="text-slate-900 dark:text-slate-100 text-lg sm:text-xl font-bold tracking-tight group-hover:text-amber-500 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {article.description}
          </p>
        )}

        {/* Author Details */}
        {article.author && (
          <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="size-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div className="text-xs">
              <p className="font-bold text-slate-900 dark:text-slate-200">{article.author.name}</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">{article.author.role}</p>
            </div>
            {article.date && (
              <span className="ml-auto text-[11px] text-slate-400 font-mono">{article.date}</span>
            )}
          </div>
        )}

        <div className="mt-auto pt-2">
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold group-hover:gap-2 transition-all">
            <span>বিস্তারিত পড়ুন</span>
            <ArrowRight className="size-3.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (renderArticleLink && article.href) {
    return renderArticleLink({ href: article.href, children: card });
  }

  if (article.href) {
    return (
      <a
        href={article.href}
        className="focus-visible:ring-ring block rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {card}
      </a>
    );
  }

  return card;
}
