import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaChevronDown } from "react-icons/fa";
import { africaIcon } from "@/assets/image-imports";

// Footer language switcher
const FooterLanguageSwitcher = () => {
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
  
  // Get current language
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
    
    // Reload with new language
    const url = new URL(window.location.href);
    url.searchParams.set('lang', code);
    window.location.href = url.toString();
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-full bg-charcoal-light text-stone-dark rounded border border-charcoal-light px-4 py-2 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{languages.find(lang => lang.code === currentLanguage)?.name}</span>
        <FaChevronDown className="text-xs ml-2" />
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg py-1 z-50">
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

const Footer = () => {
  // Quick links for the footer
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/investors", label: "Investments" },
    { href: "/contact", label: "Contact Us" },
  ];
  
  // Legal links
  const legalLinks = [
    { href: "/legal", label: "Terms & Privacy" },
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-wheat flex items-center justify-center rounded-full mr-2">
                <img 
                  src={africaIcon} 
                  alt="Algeria Agricultural Map" 
                  className="w-5 h-5" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Harvest Brothers</span>
                <span className="text-xs font-arabic" lang="ar">حصاد الإخوة</span>
              </div>
            </div>
            <p className="text-stone-dark mb-4">Sustainable Desert Agriculture</p>
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
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-stone-dark hover:text-wheat transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-wheat" />
                <span className="text-stone-dark">Timimoun, Algeria</span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-2 text-wheat" />
                <div className="text-stone-dark">
                  <p>+213 662 67 52 91 (Algeria)</p>
                  <p>+1 347 446 2141 (USA)</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-2 text-wheat" />
                <span className="text-stone-dark">support@hbalg.com</span>
              </li>
            </ul>
          </div>
          
          {/* Language & Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Language</h3>
            <div className="mb-6">
              <FooterLanguageSwitcher />
            </div>
            
            <h3 className="text-lg font-bold mt-6 mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-stone-dark hover:text-wheat transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-charcoal-light mt-8 pt-8 text-center text-stone-dark">
          <p>&copy; {new Date().getFullYear()} Harvest Brothers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
