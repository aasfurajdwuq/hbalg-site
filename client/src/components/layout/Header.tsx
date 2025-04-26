import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n";
import { FaBars, FaTimes } from "react-icons/fa";
import { iconLogo } from "@/assets/image-imports";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useLanguage();

  // Close mobile menu when changing pages
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/investors", label: t("nav.investors") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className={`bg-white sticky top-0 z-50 ${isScrolled ? "shadow-md" : "shadow-sm"} transition-shadow duration-300`}>
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo and Site Title */}
          <Link href="/">
            <div className="flex items-center group cursor-pointer">
              <img 
                src={iconLogo} 
                alt="Harvest Brothers Logo" 
                className="w-10 h-10 mr-3"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-charcoal">{t("site.title")}</span>
                <span className="text-xs font-arabic text-earth" lang="ar">{t("site.titleArabic")}</span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <a className={`${location === link.href ? "text-wheat-dark" : "text-charcoal"} ${index > 4 ? "text-sm text-stone-dark" : "font-medium"} hover:text-wheat-dark transition`}>
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
          
          {/* Language Switcher - Desktop */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-charcoal hover:text-wheat-dark transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </nav>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white pb-4">
            <div className="flex flex-col space-y-3 pt-2 pb-3">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <a className={`${location === link.href ? "text-wheat-dark" : "text-charcoal"} ${index > 4 ? "text-sm" : "font-medium"} hover:text-wheat-dark transition px-4 py-2 hover:bg-stone-light rounded`}>
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
            <div className="border-t border-stone pt-3 px-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal">{t("language.title")}</span>
                <LanguageSwitcher isMobile />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
