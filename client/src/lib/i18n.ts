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

const rtlLanguages = ["ar", "ur"];

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
    const keys = key.split(".");
    let result: any = locales[language] || defaultLocale;
    
    // Navigate through the nested properties
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        // If key not found in current language, try English
        let fallbackResult = defaultLocale;
        for (const fallbackKey of keys) {
          if (fallbackResult && fallbackResult[fallbackKey] !== undefined) {
            fallbackResult = fallbackResult[fallbackKey];
          } else {
            // If not found in English either, return the key
            return key;
          }
        }
        return typeof fallbackResult === "string" ? fallbackResult : key;
      }
    }

    return typeof result === "string" ? result : key;
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
