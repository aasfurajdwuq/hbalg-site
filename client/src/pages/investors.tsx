import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import InvestorForm from "@/components/forms/InvestorForm";
import { Card, CardContent } from "@/components/ui/card";
import { FaAward, FaChartLine, FaHandshake, FaGlobeAfrica } from "react-icons/fa";
import AlgeriaOutlineIcon from "@/assets/icons/AlgeriaOutlineIcon";

const Investors = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("investors.meta.title")}</title>
        <meta name="description" content={t("investors.meta.description")} />
      </Helmet>
      
      {/* Hero section */}
      <section className="bg-wheat-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              {t("investors.header.title")}
            </h1>
            
            {/* Badge */}
            <div className="mb-8 inline-block animate-pulse">
              <div className="w-24 h-24 bg-leaf rounded-full flex items-center justify-center shadow-md mb-2">
                <FaAward className="text-4xl text-white" />
              </div>
              <p className="font-medium">{t("badge.timimoun")}</p>
            </div>
            
            {/* Motivation Copy */}
            <p className="text-xl mb-12">
              {t("investors.motivationCopy")}
            </p>
          </div>
        </div>
      </section>
      
      {/* Investment Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            {t("investors.benefits.title")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-wheat rounded-full flex items-center justify-center mb-4">
                  <FaChartLine className="text-3xl text-earth-dark" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">
                  {t("investors.benefits.returns.title")}
                </h3>
                <p>{t("investors.benefits.returns.description")}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-earth rounded-full flex items-center justify-center mb-4">
                  <FaHandshake className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">
                  {t("investors.benefits.partnership.title")}
                </h3>
                <p>{t("investors.benefits.partnership.description")}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-leaf rounded-full flex items-center justify-center mb-4">
                  <FaGlobeAfrica className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">
                  {t("investors.benefits.impact.title")}
                </h3>
                <p>{t("investors.benefits.impact.description")}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Location icon + label */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-20 mb-4">
              <AlgeriaOutlineIcon />
            </div>
            <h3 className="text-xl font-serif font-semibold">
              {t("investors.location")}
            </h3>
          </div>
        </div>
      </section>
      
      {/* Investor Form */}
      <section className="py-16 bg-stone-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md animate-slide-up">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              {t("investors.form.title")}
            </h2>
            <p className="mb-8 text-center text-stone-dark">
              {t("investors.form.description")}
            </p>
            
            <InvestorForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Investors;
