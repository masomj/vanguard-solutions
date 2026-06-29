import { createI18n } from 'vue-i18n'
import en from './en.json'
import cy from './cy.json'

const messages = { en, cy } as const

export type AppLocale = keyof typeof messages

const LOCALE_STORAGE_KEY = 'vds_locale'

export const supportedLocales: AppLocale[] = ['en', 'cy']

function isSupportedLocale(locale: string | null): locale is AppLocale {
  return locale !== null && supportedLocales.includes(locale as AppLocale)
}

function detectBrowserLocale(): AppLocale {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language.toLowerCase().startsWith('cy') ? 'cy' : 'en'
}

function getInitialLocale(): AppLocale {
  if (typeof window === 'undefined') return 'en'

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (isSupportedLocale(stored)) {
    return stored
  }

  return detectBrowserLocale()
}

const initialLocale = getInitialLocale()

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages,
})

export function setLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale

  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  }
}

export function toggleLocale(): void {
  const nextLocale: AppLocale = i18n.global.locale.value === 'en' ? 'cy' : 'en'
  setLocale(nextLocale)
}

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLocale
}
