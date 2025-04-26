import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { FaAward } from "react-icons/fa";

const InvestorTeaser = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block animate-pulse">
            <div className="w-24 h-24 bg-leaf rounded-full flex items-center justify-center shadow-md">
              <FaAward className="text-4xl text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">{t("investors.teaser.title")}</h2>
          <p className="text-xl mb-8">{t("investors.teaser.description")}</p>
          <Link href="/investors">
            <a className="bg-wheat text-charcoal-dark font-bold py-3 px-8 rounded-lg hover:bg-wheat-dark transition shadow-md inline-block">
              {t("investors.teaser.cta")}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestorTeaser;
