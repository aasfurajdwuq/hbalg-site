/* Simple language system with direct object access (NO JSX) */
import { useState, useEffect } from 'react';
import { locales, defaultLocale, type Locale } from '@/locales';

// Define RTL languages
const rtlLanguages = ['ar', 'ar-dz', 'ur'];

// Hard-coded translations for critical UI elements
const hardcodedTranslations: Record<string, Record<string, string>> = {
  'en': {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.investors': 'Investors',
    'nav.contact': 'Contact',
    'home.hero.contactCTA': 'Contact Us',
    'home.hero.investorCTA': 'Investment Opportunities'
  },
  'ar': {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.investors': 'المستثمرين',
    'nav.contact': 'اتصل بنا',
    'home.hero.contactCTA': 'اتصل بنا',
    'home.hero.investorCTA': 'فرص الاستثمار'
  },
  'ar-dz': {
    'nav.home': 'الرئيسية',
    'nav.about': 'علينا',
    'nav.services': 'خدماتنا',
    'nav.investors': 'المستثمرين',
    'nav.contact': 'اتصل بينا',
    'home.hero.contactCTA': 'اتصل بينا',
    'home.hero.investorCTA': 'معلومات المستثمرين'
  },
  'fr': {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.investors': 'Investisseurs',
    'nav.contact': 'Contact',
    'home.hero.contactCTA': 'Contactez-nous',
    'home.hero.investorCTA': 'Opportunités d\'investissement'
  },
  'es': {
    'nav.home': 'Inicio',
    'nav.about': 'Quiénes somos',
    'nav.services': 'Servicios',
    'nav.investors': 'Inversores',
    'nav.contact': 'Contacto',
    'home.hero.contactCTA': 'Contáctenos',
    'home.hero.investorCTA': 'Oportunidades de inversión'
  },
  'it': {
    'nav.home': 'Home',
    'nav.about': 'Chi siamo',
    'nav.services': 'Servizi',
    'nav.investors': 'Investitori',
    'nav.contact': 'Contatti',
    'home.hero.contactCTA': 'Contattaci',
    'home.hero.investorCTA': 'Opportunità di investimento'
  },
  'ur': {
    'nav.home': 'صفحہ اول',
    'nav.about': 'ہمارے بارے میں',
    'nav.services': 'خدمات',
    'nav.investors': 'سرمایہ کار',
    'nav.contact': 'رابطہ کریں',
    'home.hero.contactCTA': 'ہم سے رابطہ کریں',
    'home.hero.investorCTA': 'سرمایہ کاری کے مواقع'
  }
};

// Helper functions for detecting language
function getLanguageFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam && Object.keys(locales).includes(langParam)) {
      return langParam;
    }
  } catch (error) {
    console.error('Error getting language from URL:', error);
  }
  return null;
}

function getLanguageFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && Object.keys(locales).includes(storedLang)) {
      return storedLang;
    }
  } catch (error) {
    console.error('Error getting language from storage:', error);
  }
  return null;
}

// Initial language detection
function detectInitialLanguage(): string {
  const urlLang = getLanguageFromUrl();
  if (urlLang) return urlLang;
  
  const storedLang = getLanguageFromStorage();
  if (storedLang) return storedLang;
  
  return 'en'; // Default to English
}

// Global shared state (no React context)
let _currentLanguage = detectInitialLanguage();
let _currentDirection = rtlLanguages.includes(_currentLanguage) ? 'rtl' : 'ltr';
let _listeners: Array<() => void> = [];

// Update document direction and language
if (typeof document !== 'undefined') {
  document.documentElement.dir = _currentDirection;
  document.documentElement.lang = _currentLanguage;
}

// Translation function
function translateKey(key: string, language: string = _currentLanguage): string {
  // Check hardcoded translations first
  if (hardcodedTranslations[language] && hardcodedTranslations[language][key]) {
    return hardcodedTranslations[language][key];
  }
  
  if (!key) return '';
  
  const keyParts = key.split('.');
  let result: any = locales[language];
  
  // Try to navigate through the nested object
  for (const part of keyParts) {
    if (result && typeof result === 'object' && part in result) {
      result = result[part];
    } else {
      // Key not found in current language, try English
      result = defaultLocale;
      for (const fallbackPart of keyParts) {
        if (result && typeof result === 'object' && fallbackPart in result) {
          result = result[fallbackPart];
        } else {
          return key; // Return key as fallback
        }
      }
      break;
    }
  }
  
  return typeof result === 'string' ? result : key;
}

// Language changing function
function changeLanguage(lang: string): void {
  if (!locales[lang]) return;
  
  _currentLanguage = lang;
  _currentDirection = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
  
  // Update document attributes
  if (typeof document !== 'undefined') {
    document.documentElement.dir = _currentDirection;
    document.documentElement.lang = _currentLanguage;
  }
  
  // Store in localStorage
  try {
    localStorage.setItem('preferredLanguage', lang);
  } catch (e) {
    console.error('Failed to save language preference:', e);
  }
  
  // Update URL without page reload
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url.toString());
  }
  
  // Notify all listeners
  _listeners.forEach(listener => listener());
}

// React hook for using translation in components
export function useLanguage() {
  const [language, setLanguage] = useState(_currentLanguage);
  const [dir, setDir] = useState(_currentDirection);
  
  useEffect(() => {
    // Function to update component when language changes
    const handleLanguageChange = () => {
      setLanguage(_currentLanguage);
      setDir(_currentDirection);
    };
    
    // Register this component as a listener
    _listeners.push(handleLanguageChange);
    
    // Cleanup listener when component unmounts
    return () => {
      _listeners = _listeners.filter(listener => listener !== handleLanguageChange);
    };
  }, []);
  
  // Return the language API for this component
  return {
    language,
    dir,
    locale: locales[language] || defaultLocale,
    changeLanguage,
    t: (key: string) => translateKey(key, language)
  };
}