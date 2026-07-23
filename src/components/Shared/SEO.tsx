import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export default function SEO({
  title = "KM09-Capital | Professional Cooperative Investment & Management Platform",
  description = "KM09-Capital is a premier cooperative investment & financial asset management platform. Empowering transparent monthly deposits, member role management, real-time analytics, and secure capital growth.",
  keywords = "KM09, KM09 Capital, Cooperative Investment, Asset Management, Savings, Deposit Management",
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title.includes("KM09-Capital") ? title : `${title} | KM09-Capital`;
    document.title = formattedTitle;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }

    // 3. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      metaKeywords.setAttribute("content", keywords);
      document.head.appendChild(metaKeywords);
    }

    // 4. Update Open Graph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", formattedTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);
  }, [title, description, keywords]);

  return null;
}
