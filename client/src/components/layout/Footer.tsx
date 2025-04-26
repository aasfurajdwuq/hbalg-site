import { Link } from "wouter";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n";
import { FaWheatAwn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { t } = useLanguage();
  
  // Quick links for the footer
  const quickLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/investors", label: t("nav.investors") },
    { href: "/contact", label: t("nav.contact") },
  ];
  
  // Legal links
  const legalLinks = [
    { href: "/privacy", label: t("nav.privacy") },
    { href: "/terms", label: t("nav.terms") },
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-wheat flex items-center justify-center rounded-full mr-2">
                <FaWheatAwn className="text-earth-dark" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">{t("site.title")}</span>
                <span className="text-xs font-arabic" lang="ar">{t("site.titleArabic")}</span>
              </div>
            </div>
            <p className="text-stone-dark mb-4">{t("site.tagline")}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-dark hover:text-wheat transition" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="text-stone-dark hover:text-wheat transition" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="text-stone-dark hover:text-wheat transition" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-stone-dark hover:text-wheat transition" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-stone-dark hover:text-wheat transition">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-wheat" />
                <span className="text-stone-dark">{t("contact.address")}</span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-2 text-wheat" />
                <div className="text-stone-dark">
                  <p>{t("contact.phoneAlgeria")}</p>
                  <p>{t("contact.phoneUSA")}</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-2 text-wheat" />
                <span className="text-stone-dark">{t("contact.email")}</span>
              </li>
            </ul>
          </div>
          
          {/* Language & Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("language.title")}</h3>
            <div className="mb-6">
              <LanguageSwitcher isFooter />
            </div>
            
            <h3 className="text-lg font-bold mt-6 mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-stone-dark hover:text-wheat transition">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-charcoal-light mt-8 pt-8 text-center text-stone-dark">
          <p>&copy; {new Date().getFullYear()} {t("site.title")}. {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
