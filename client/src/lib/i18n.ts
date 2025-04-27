import { createContext, useContext, useState, ReactNode } from "react";
import React from "react";
import { locales, defaultLocale, type Locale } from "@/locales";

type LanguageContextType = {
  language: string;
  locale: Locale;
  dir: "ltr" | "rtl";
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const rtlLanguages = ["ar", "ar-dz", "ur"];

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  locale: defaultLocale,
  dir: "ltr",
  changeLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = (props: {children: ReactNode}) => {
  const detectBrowserLanguage = (): string => {
    // First check if we have a stored preference
    const storedLang = localStorage.getItem("preferredLanguage");
    if (storedLang && locales[storedLang]) {
      return storedLang;
    }
    
    // Otherwise detect from browser
    const browserLang = navigator.language.split("-")[0];
    return locales[browserLang] ? browserLang : "en";
  };

  const [language, setLanguage] = useState(detectBrowserLanguage());
  const [dir, setDir] = useState<"ltr" | "rtl">(rtlLanguages.includes(language) ? "rtl" : "ltr");

  const changeLanguage = (lang: string) => {
    if (locales[lang]) {
      setLanguage(lang);
      localStorage.setItem("preferredLanguage", lang);
      setDir(rtlLanguages.includes(lang) ? "rtl" : "ltr");
    }
  };

  const t = (key: string): string => {
    if (!key) return '';
    
    const keys = key.split('.');
    
    // Try to get the value from the current language
    let currentValue: any = locales[language];
    if (currentValue) {
      let found = true;
      for (const k of keys) {
        if (currentValue && currentValue[k] !== undefined) {
          currentValue = currentValue[k];
        } else {
          found = false;
          break;
        }
      }
      
      if (found && typeof currentValue === 'string') {
        return currentValue;
      }
    }
    
    // Try to get the value from the default language
    let defaultValue: any = defaultLocale;
    if (defaultValue) {
      let found = true;
      for (const k of keys) {
        if (defaultValue && defaultValue[k] !== undefined) {
          defaultValue = defaultValue[k];
        } else {
          found = false;
          break;
        }
      }
      
      if (found && typeof defaultValue === 'string') {
        return defaultValue;
      }
    }
    
    // Return the key as fallback
    return key;
  };

  return React.createElement(
    LanguageContext.Provider,
    { 
      value: {
        language,
        locale: locales[language] || defaultLocale,
        dir,
        changeLanguage,
        t
      } 
    },
    props.children
  );
};

export const useLanguage = () => useContext(LanguageContext);
