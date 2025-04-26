import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { FaGlobeAfrica } from "react-icons/fa";

const ContactTeaser = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-earth text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <FaGlobeAfrica className="text-5xl" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">{t("contact.teaser.title")}</h2>
          <p className="text-xl mb-8">{t("contact.teaser.description")}</p>
          <Link href="/contact">
            <a className="bg-white text-earth-dark font-bold py-3 px-8 rounded-lg hover:bg-stone-light transition shadow-md inline-block">
              {t("contact.teaser.cta")}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactTeaser;
