import HeroSection from "@/components/Home/HeroSection"
import FocusSection from "@/components/Home/FocusSection"
import HowWork from "@/components/Home/HowWork"
import SecuritySection from "@/components/Home/SecuritySection"
import TeamSection from "@/components/Shared/team/team"
import BottomBanner from "@/components/Home/BottomBanner"

const Page = () => {
    return (
        <div>
            <HeroSection />
            <FocusSection />
            <HowWork />
            <SecuritySection />
            <TeamSection />
            <BottomBanner />
        </div>
    )
}
export default Page
