import { createI18n } from 'vue-i18n'
import { en as appEn } from './locales/en'
import { th as appTh } from './locales/th'
import { en as sharedEn } from '../../../shared/i18n/en'
import { th as sharedTh } from '../../../shared/i18n/th'
import { en as toastEn } from '../../../shared/toast/i18n/en'
import { th as toastTh } from '../../../shared/toast/i18n/th'
import { en as confirmEn } from '../../../shared/confirm/i18n/en'
import { th as confirmTh } from '../../../shared/confirm/i18n/th'
import { en as authEn } from '../../../feature/auth/i18n/en'
import { th as authTh } from '../../../feature/auth/i18n/th'
import { en as dashboardEn } from '../../../feature/dashboard/i18n/en'
import { th as dashboardTh } from '../../../feature/dashboard/i18n/th'
import { en as devEn } from '../../../feature/dev/i18n/en'
import { th as devTh } from '../../../feature/dev/i18n/th'
import {
  assertLocaleModuleParity,
  mergeLocaleMessages,
  type LocaleMessageModule,
} from './mergeLocaleMessages'

const enModules: LocaleMessageModule[] = [
  { source: 'app', namespace: [], messages: appEn },
  { source: 'shared', namespace: ['shared'], messages: sharedEn },
  { source: 'shared/toast', namespace: ['shared', 'toast'], messages: toastEn },
  { source: 'shared/confirm', namespace: ['shared', 'confirm'], messages: confirmEn },
  { source: 'feature/auth', namespace: ['features', 'auth'], messages: authEn },
  { source: 'feature/dashboard', namespace: ['features', 'dashboard'], messages: dashboardEn },
  ...(import.meta.env.DEV
    ? [{ source: 'feature/dev', namespace: ['features', 'dev'], messages: devEn }]
    : []),
]

const thModules: LocaleMessageModule[] = [
  { source: 'app', namespace: [], messages: appTh },
  { source: 'shared', namespace: ['shared'], messages: sharedTh },
  { source: 'shared/toast', namespace: ['shared', 'toast'], messages: toastTh },
  { source: 'shared/confirm', namespace: ['shared', 'confirm'], messages: confirmTh },
  { source: 'feature/auth', namespace: ['features', 'auth'], messages: authTh },
  { source: 'feature/dashboard', namespace: ['features', 'dashboard'], messages: dashboardTh },
  ...(import.meta.env.DEV
    ? [{ source: 'feature/dev', namespace: ['features', 'dev'], messages: devTh }]
    : []),
]

assertLocaleModuleParity(enModules, thModules, 'en', 'th')

const messages = {
  en: mergeLocaleMessages(enModules),
  th: mergeLocaleMessages(thModules),
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

if (typeof document !== 'undefined') {
  document.title = i18n.global.t('app.documentTitle')
}

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
    document.title = i18n.global.t('app.documentTitle')
  }
}
