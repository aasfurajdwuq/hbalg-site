import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import HeroSection from "@/components/home/HeroSection";
import BadgeStrip from "@/components/home/BadgeStrip";
import Highlights from "@/components/home/Highlights";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import InvestorTeaser from "@/components/home/InvestorTeaser";
import ContactTeaser from "@/components/home/ContactTeaser";

const Home = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("home.meta.title")}</title>
        <meta name="description" content={t("home.meta.description")} />
      </Helmet>
      
      <HeroSection />
      <BadgeStrip />
      <Highlights />
      <AboutTeaser />
      <ServicesTeaser />
      <InvestorTeaser />
      <ContactTeaser />
    </>
  );
};

export default Home;
