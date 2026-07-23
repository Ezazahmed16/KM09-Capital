import HeroSection from "@/components/Home/HeroSection";
import FocusSection from "@/components/Home/FocusSection";
import HowWork from "@/components/Home/HowWork";
import SecuritySection from "@/components/Home/SecuritySection";
import TeamSection from "@/components/Shared/team/team";
import BottomBanner from "@/components/Home/BottomBanner";
import SEO from "@/components/Shared/SEO";

const Page = () => {
    return (
        <main>
            <SEO
                title="হোম - বন্ধ সামাজিক সঞ্চয় ও মূলধন বৃদ্ধি উদ্যোগ"
                description="KM09 CAPITAL একটি বিশ্বস্ত বন্ধ সামাজিক সঞ্চয় উদ্যোগ। আমাদের লক্ষ্য সদস্যদের মূলধন বৃদ্ধি, স্বচ্ছ ব্যবস্থাপনা এবং নিরাপদ আর্থিক ভবিষ্যৎ নিশ্চিত করা।"
            />
            <HeroSection />
            <FocusSection />
            <HowWork />
            <SecuritySection />
            <TeamSection />
            <BottomBanner />
        </main>
    );
};
export default Page;
