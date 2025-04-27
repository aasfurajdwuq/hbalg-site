import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { iconLogo } from "@/assets/image-imports";

// Simple language switcher component
const SimpleLanguageSwitcher = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },  // Standard Arabic
    { code: "ar-dz", name: "الدارجة الجزائرية" },  // Algerian Arabic
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "ur", name: "اردو" },  // Urdu
    { code: "it", name: "Italiano" }  // Italian
  ];
  
  // Get current language from URL or localStorage
  const getCurrentLanguage = () => {
    if (typeof window === 'undefined') return 'en';
    
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && languages.some(l => l.code === langParam)) {
      return langParam;
    }
    
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && languages.some(l => l.code === storedLang)) {
      return storedLang;
    }
    
    return 'en';
  };
  
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle language selection
  const handleLanguageSelect = (code: string) => {
    if (code === currentLanguage) {
      setIsOpen(false);
      return;
    }
    
    // Store in localStorage
    localStorage.setItem('preferredLanguage', code);
    setCurrentLanguage(code);
    
    // Create a direct link with language parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', code);
    window.location.href = url.toString();
  };
  
  if (isMobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          className="bg-stone-light rounded w-32 px-3 py-2 text-sm text-charcoal flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{languages.find(lang => lang.code === currentLanguage)?.name}</span>
          <FaChevronDown className="text-xs ml-2" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light ${currentLanguage === lang.code ? 'bg-stone-light' : ''}`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span lang={lang.code}>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 text-sm text-charcoal hover:text-wheat-dark transition pr-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{languages.find(lang => lang.code === currentLanguage)?.name}</span>
        <FaChevronDown className="text-xs ml-1" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light ${currentLanguage === lang.code ? 'bg-stone-light' : ''}`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <span lang={lang.code}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

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

  // Navigation links with direct labels
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/investors", label: "Investments" },
    { href: "/contact", label: "Contact" },
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
            <SimpleLanguageSwitcher />
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
                <SimpleLanguageSwitcher isMobile={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
