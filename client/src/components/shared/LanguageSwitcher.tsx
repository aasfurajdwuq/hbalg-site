import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { FaChevronDown } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const handleLanguageChange = (value: string) => {
    changeLanguage(value);
  };

  // Different styling for footer
  if (isFooter) {
    return (
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className={`w-full bg-charcoal-light text-stone-dark rounded border border-charcoal-light`}>
          <SelectValue placeholder={languages.find(lang => lang.code === language)?.name} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className={language === lang.code ? "bg-charcoal-light" : ""}>
              <span lang={lang.code}>{lang.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // For mobile dropdown
  if (isMobile) {
    return (
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="bg-stone-light rounded w-32 px-2 py-1 text-sm text-charcoal">
          <SelectValue placeholder={languages.find(lang => lang.code === language)?.name} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <span lang={lang.code}>{lang.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // Desktop dropdown - simplified version using Select component instead of custom dropdown
  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto bg-transparent border-none shadow-none hover:text-wheat-dark text-charcoal">
        <SelectValue placeholder={languages.find(lang => lang.code === language)?.name} />
      </SelectTrigger>
      <SelectContent className="w-48 z-50">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}> 
            <span lang={lang.code}>{lang.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
