import { createI18n } from 'vue-i18n'
import { en } from './locales/en'
import { th } from './locales/th'

const messages = {
  en,
  th,
}

export type Locale = keyof typeof messages

const STORAGE_KEY = 'app_locale'
export const DEFAULT_LOCALE: Locale = 'en'

export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null
  if (savedLocale && savedLocale in messages) {
    return savedLocale
  }

  const browserLang = navigator.language.slice(0, 2).toLowerCase() as Locale
  if (browserLang in messages) {
    return browserLang
  }

  return DEFAULT_LOCALE
}

const initialLocale = getInitialLocale()

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLocale
}

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

export function setAppLocale(targetLocale: Locale) {
  if (!(targetLocale in messages)) return

  const localeRef = i18n.global.locale
  if (typeof localeRef === 'string') {
    ;(i18n.global.locale as unknown as string) = targetLocale
  } else {
    localeRef.value = targetLocale
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, targetLocale)
    document.documentElement.lang = targetLocale
  }
}
