import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

type LanguageSwitcherSimpleProps = {
  isMobile?: boolean;
  isFooter?: boolean;
};

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },  // Standard Arabic
  { code: "ar-dz", name: "الدارجة الجزائرية" },  // Algerian Arabic
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "ur", name: "اردو" },  // Urdu
  { code: "it", name: "Italiano" }  // Italian
];

/**
 * Language switcher that uses direct links to switch languages.
 * This is a dead simple implementation that forces a full page reload.
 */
const LanguageSwitcherSimple = ({ isMobile = false, isFooter = false }: LanguageSwitcherSimpleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Detect current language
  const getCurrentLanguage = (): string => {
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

  // Create a direct href link that forces page reload with the language parameter
  const createLanguageLink = (code: string): string => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', code);
    return url.toString();
  };
  
  // Handle language selection
  const handleLanguageSelect = (code: string) => {
    if (code === currentLanguage) {
      setIsOpen(false);
      return;
    }
    
    // Store in localStorage
    localStorage.setItem('preferredLanguage', code);
    setCurrentLanguage(code);
    
    // Force page reload to apply new language
    window.location.href = createLanguageLink(code);
  };

  // Different styling for footer
  if (isFooter) {
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
  }

  // For mobile dropdown
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

  // Desktop dropdown
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

export default LanguageSwitcherSimple;