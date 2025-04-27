import en from './en';
import ar from './ar';
import arDZ from './ar-dz';
import fr from './fr';
import es from './es';
import it from './it';
import ur from './ur';

export type Locale = typeof en;

export const locales: Record<string, Locale> = {
  en,
  ar,
  'ar-dz': arDZ,
  fr,
  es,
  it,
  ur
};

export const defaultLocale = en;