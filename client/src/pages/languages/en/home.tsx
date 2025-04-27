import { Helmet } from "react-helmet";
import EnglishHeader from "../../../components/layout/languages/en/Header";
import EnglishFooter from "../../../components/layout/languages/en/Footer";
import EnglishHeroSection from "../../../components/home/languages/en/HeroSection";
import EnglishBadgeStrip from "../../../components/home/languages/en/BadgeStrip";
import EnglishHighlights from "../../../components/home/languages/en/Highlights";
import EnglishAboutTeaser from "../../../components/home/languages/en/AboutTeaser";
import EnglishServicesTeaser from "../../../components/home/languages/en/ServicesTeaser";
import EnglishInvestorTeaser from "../../../components/home/languages/en/InvestorTeaser";
import EnglishContactTeaser from "../../../components/home/languages/en/ContactTeaser";

const EnglishHome = () => {
  return (
    <>
      <Helmet>
        <title>Harvest Brothers | Premium Desert Agriculture Investment</title>
        <meta name="description" content="Harvest Brothers offers premium sustainable agricultural investments with innovative farming practices and global distribution." />
      </Helmet>
      
      <EnglishHeader />
      <main>
        <EnglishHeroSection />
        <EnglishBadgeStrip />
        <EnglishHighlights />
        <EnglishAboutTeaser />
        <EnglishServicesTeaser />
        <EnglishInvestorTeaser />
        <EnglishContactTeaser />
      </main>
      <EnglishFooter />
    </>
  );
};

export default EnglishHome;