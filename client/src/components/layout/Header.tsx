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

  // Navigation links with custom labels
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/investors", label: "Investors" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className={`bg-white sticky top-0 z-50 ${isScrolled ? "shadow-md" : "shadow-sm"} transition-shadow duration-300`}>
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo and Site Title */}
          <Link href="/" className="flex items-center group cursor-pointer">
            <img 
              src={iconLogo} 
              alt="Harvest Brothers Logo" 
              className="w-10 h-10 mr-3 group-hover:rotate-6 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-800 to-green-700 bg-clip-text text-transparent drop-shadow-sm group-hover:scale-105 transition-transform duration-300">Harvest Brothers</span>
              <span className="text-sm font-arabic text-earth tracking-wider font-semibold drop-shadow group-hover:text-amber-700 transition-colors duration-300" lang="ar">إخوة الحصاد</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href}
                className={`${location === link.href ? "text-wheat-dark" : "text-charcoal"} ${index > 4 ? "text-sm text-stone-dark" : "font-medium"} hover:text-wheat-dark transition`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Language Switcher - Desktop */}
          <div className="hidden md:block">
            <div className="inline-block relative group">
              <button className="flex items-center space-x-1 text-sm text-charcoal hover:text-wheat-dark transition">
                <span>Language</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a href="/?lang=en" className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light">English</a>
                <a href="/?lang=ar" className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light">العربية</a>
                <a href="/?lang=ar-dz" className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light">الدارجة الجزائرية</a>
                <a href="/?lang=fr" className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light">Français</a>
                <a href="/?lang=es" className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light">Español</a>
                <a href="/?lang=it" className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light">Italiano</a>
                <a href="/?lang=ur" className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light">اردو</a>
              </div>
            </div>
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
                <Link 
                  key={index} 
                  href={link.href}
                  className={`${location === link.href ? "text-wheat-dark" : "text-charcoal"} ${index > 4 ? "text-sm" : "font-medium"} hover:text-wheat-dark transition px-4 py-2 hover:bg-stone-light rounded`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-stone pt-3 px-4">
              <div className="flex flex-col space-y-3">
                <span className="text-sm text-charcoal font-semibold">Language / اللغة</span>
                <div className="grid grid-cols-2 gap-2">
                  <a href="/?lang=en" className="block w-full text-center px-2 py-1 text-sm text-charcoal hover:bg-stone-light border rounded">English</a>
                  <a href="/?lang=ar" className="block w-full text-center px-2 py-1 text-sm text-charcoal hover:bg-stone-light border rounded">العربية</a>
                  <a href="/?lang=ar-dz" className="block w-full text-center px-2 py-1 text-sm text-charcoal hover:bg-stone-light border rounded">الدارجة الجزائرية</a>
                  <a href="/?lang=fr" className="block w-full text-center px-2 py-1 text-sm text-charcoal hover:bg-stone-light border rounded">Français</a>
                  <a href="/?lang=es" className="block w-full text-center px-2 py-1 text-sm text-charcoal hover:bg-stone-light border rounded">Español</a>
                  <a href="/?lang=it" className="block w-full text-center px-2 py-1 text-sm text-charcoal hover:bg-stone-light border rounded">Italiano</a>
                  <a href="/?lang=ur" className="block w-full text-center px-2 py-1 text-sm text-charcoal hover:bg-stone-light border rounded">اردو</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
