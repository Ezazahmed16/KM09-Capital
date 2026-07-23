import HeroBanner from "@/components/About/HeroAbout";
import HistoryBackground from "@/components/About/HistoryBackground";
import LegalCompliance from "@/components/About/LegalCompliance";
import MissionVison from "@/components/About/MissionVison";
import BottomBanner from "@/components/Home/BottomBanner";
import Sponsorship from "@/components/Shared/Sponsorship";
import TeamSection from "@/components/Shared/team/team";
import SEO from "@/components/Shared/SEO";

const About = () => {
    return (
        <main>
            <SEO
                title="আমাদের গল্প - KM09 CAPITAL এর মিশন ও ভিশন"
                description="KM09 CAPITAL এর প্রতিষ্ঠা, মিশন, ভিশন এবং নেতৃত্বের পরিচয় জানুন। আমরা একটি স্বচ্ছ ও নিরাপদ সমবায় সামাজিক উদ্যোগ।"
            />
            <HeroBanner />
            <MissionVison />
            <HistoryBackground />
            <TeamSection />
            <LegalCompliance />
            <Sponsorship />
            <BottomBanner />
        </main>
    );
};

export default About;