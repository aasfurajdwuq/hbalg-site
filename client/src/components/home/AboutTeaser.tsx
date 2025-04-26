import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { FaArrowRight } from "react-icons/fa";
import { useScrollAnimation } from "@/lib/animations";

const AboutTeaser = () => {
  const { t } = useLanguage();
  const { elementRef, className } = useScrollAnimation("animate-fade-in");

  return (
    <section ref={elementRef} className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80" 
                alt={t("about.imageAlt")} 
                className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-serif font-bold mb-4">{t("about.title")}</h2>
            <p className="mb-4">{t("about.paragraph1")}</p>
            <p className="mb-4">{t("about.paragraph2")}</p>
            <p className="mb-6">{t("about.paragraph3")}</p>
            <Link href="/about">
              <a className="inline-flex items-center text-earth-dark font-medium hover:text-earth group">
                {t("about.learnMore")}
                <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
