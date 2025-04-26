import en from './en';
import ar from './ar';
import fr from './fr';

export type Locale = typeof en;

export const locales: Record<string, Locale> = {
  en,
  ar,
  fr
};

export const defaultLocale = en;