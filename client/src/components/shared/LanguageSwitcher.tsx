import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { FaChevronDown } from "react-icons/fa";

type LanguageSwitcherProps = {
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

const LanguageSwitcher = ({ isMobile = false, isFooter = false }: LanguageSwitcherProps) => {
  const { language, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleLanguageChange = (code: string) => {
    console.log("Changing language to:", code);
    changeLanguage(code);
    setIsOpen(false);
    
    // Force page reload to ensure all components update with the new language
    window.location.reload();
  };

  // Different styling for footer
  if (isFooter) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          className="w-full bg-charcoal-light text-stone-dark rounded border border-charcoal-light px-4 py-2 flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{languages.find(lang => lang.code === language)?.name}</span>
          <FaChevronDown className="text-xs ml-2" />
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg py-1 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light ${language === lang.code ? 'bg-stone-light' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
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
          <span>{languages.find(lang => lang.code === language)?.name}</span>
          <FaChevronDown className="text-xs ml-2" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light ${language === lang.code ? 'bg-stone-light' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
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
        <span>{languages.find(lang => lang.code === language)?.name}</span>
        <FaChevronDown className="text-xs ml-1" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-stone-light ${language === lang.code ? 'bg-stone-light' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span lang={lang.code}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
