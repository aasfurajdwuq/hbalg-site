import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

// Get language from URL or use default
const getLanguageFromUrl = (): string | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    
    if (langParam && Object.keys(locales).includes(langParam)) {
      console.log("Using language from URL:", langParam);
      return langParam;
    }
  } catch (error) {
    console.error("Error getting language from URL:", error);
  }
  return null;
};

export const LanguageProvider = (props: {children: ReactNode}) => {
  const detectLanguage = (): string => {
    try {
      // First check URL parameter
      const urlLang = getLanguageFromUrl();
      if (urlLang) return urlLang;
      
      // Then check localStorage
      const storedLang = localStorage.getItem("preferredLanguage");
      console.log("Stored language found:", storedLang);
      
      if (storedLang) {
        // Check if it's a valid language code that we support
        if (Object.keys(locales).includes(storedLang)) {
          console.log("Using stored language:", storedLang);
          return storedLang;
        }
      }
      
      // Otherwise detect from browser
      const browserLang = navigator.language;
      console.log("Browser language detected:", browserLang);
      
      // Try exact match first (e.g., "ar-dz")
      if (Object.keys(locales).includes(browserLang)) {
        return browserLang;
      }
      
      // Try language part only (e.g., "ar" from "ar-DZ")
      const langPart = browserLang.split("-")[0];
      if (Object.keys(locales).includes(langPart)) {
        return langPart;
      }
      
      // Default to English if no match
      console.log("Defaulting to English");
      return "en";
    } catch (error) {
      console.error("Error detecting language:", error);
      return "en";
    }
  };

  const [language, setLanguage] = useState(detectLanguage());
  const [dir, setDir] = useState<"ltr" | "rtl">(rtlLanguages.includes(language) ? "rtl" : "ltr");

  // Set the document dir attribute
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  const changeLanguage = (lang: string) => {
    if (locales[lang]) {
      console.log("Changing language to:", lang);
      
      // Update URL with new language
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.pushState({}, '', url);
      
      // Store in localStorage as backup
      localStorage.setItem("preferredLanguage", lang);
      
      // Update UI language and direction
      setLanguage(lang);
      setDir(rtlLanguages.includes(lang) ? "rtl" : "ltr");
    }
  };

  const t = (key: string): string => {
    if (!key) return '';
    
    console.log(`Getting translation for key: ${key} in language: ${language}`);
    console.log(`Available locales:`, Object.keys(locales));
    console.log(`Current locale object:`, locales[language]);
    
    const keys = key.split('.');
    
    // Try to get the value from the current language
    let currentValue: any = locales[language];
    if (currentValue) {
      let found = true;
      for (const k of keys) {
        console.log(`Looking for key part: ${k} in`, currentValue);
        if (currentValue && currentValue[k] !== undefined) {
          currentValue = currentValue[k];
        } else {
          found = false;
          console.log(`Key part ${k} not found in current language`);
          break;
        }
      }
      
      if (found && typeof currentValue === 'string') {
        console.log(`Found translation: ${currentValue}`);
        return currentValue;
      }
    } else {
      console.log(`Locale for ${language} not found!`);
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
        console.log(`Using default translation: ${defaultValue}`);
        return defaultValue;
      }
    }
    
    // Return the key as fallback
    console.log(`No translation found, returning key: ${key}`);
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
