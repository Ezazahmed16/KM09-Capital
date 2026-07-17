import HeroBanner from "@/components/About/HeroAbout"
import HistoryBackground from "@/components/About/HistoryBackground"
import LegalCompliance from "@/components/About/LegalCompliance"
import MissionVison from "@/components/About/MissionVison"
import BottomBanner from "@/components/Home/BottomBanner"
import Sponsorship from "@/components/Shared/Sponsorship"
import TeamSection from "@/components/Shared/team/team"

const About = () => {
    return (
        <>
            <HeroBanner />
            <MissionVison />
            <HistoryBackground />
            <TeamSection />
            <LegalCompliance />
            <Sponsorship />
            <BottomBanner />
        </>
    )
}

export default About