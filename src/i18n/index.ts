// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEN from './locales/en/common.json';
import authEN from './locales/en/auth.json';
import aboutYouEN from './locales/en/aboutYou.json';
import creditlineEN from './locales/en/creditline.json';
import licensingEN from './locales/en/licensing.json';
import taxexemptEN from './locales/en/taxexempt.json';
import advantageEN from './locales/en/advantage.json';
import reviewEN from './locales/en/review.json';

/**
 * i18n Configuration with Namespacing
 * 
 * Namespaces:
 * - common: Shared translations (buttons, validation, etc.)
 * - auth: Authentication pages (login, register, create-password)
 * - aboutYou: About You and Your Practice form
 * - creditline: Credit Line application page
 * - licensing: Practitioner Licensing page
 * - taxexempt: Tax Exempt page
 * - advantage: Patterson Advantage page
 * - review: Review and Finalize page
 * 
 * Usage in components:
 * const { t } = useTranslation(['aboutYou', 'common']);
 * <button>{t('common:buttons.save')}</button>
 * <h1>{t('aboutYou:sections.practitioner')}</h1>
 */

const resources = {
  en: {
    common: commonEN,
    auth: authEN,
    aboutYou: aboutYouEN,
    creditline: creditlineEN,
    licensing: licensingEN,
    taxexempt: taxexemptEN,
    advantage: advantageEN,
    review: reviewEN,
  },
  // Add more languages here later:
  // es: {
  //   common: commonES,
  //   auth: authES,
  // },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    
    // Default language
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || 'en',
    
    // Default namespace (used when no namespace specified)
    defaultNS: 'common',
    
    // Namespaces to load
    ns: ['common', 'auth', 'aboutYou', 'creditline', 'licensing', 'taxexempt', 'advantage', 'review'],
    
    interpolation: {
      escapeValue: false, // React already escapes
    },
    
    // Debug mode (set to false in production)
    debug: process.env.REACT_APP_ENABLE_DEBUG === 'true',
    
    // Detection options
    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator'],
      // Cache user language
      caches: ['localStorage'],
    },
  });

export default i18n;