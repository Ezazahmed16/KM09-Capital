import DocumentDownload from "@/components/ServicesTerms/DocumentDownload";
import PolicyDocument from "@/components/ServicesTerms/PolicyDocument";
import Services from "@/components/ServicesTerms/Services";
import SEO from "@/components/Shared/SEO";

const ServicesTerms = () => {
  return (
    <main>
      <SEO
        title="কার্যক্রম ও নিয়মাবলী - সমবায় নীতিমালা ও গাইডলাইন"
        description="KM09 CAPITAL এর কার্যক্রম, পরিচালন নীতিমালা, মাসিক কিস্তি সংক্রান্ত নিয়মাবলী এবং সমবায় নীতিমালা।"
      />
      <Services />
      <DocumentDownload />
      <PolicyDocument />
    </main>
  );
};

export default ServicesTerms;