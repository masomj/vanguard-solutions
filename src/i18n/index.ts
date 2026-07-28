import { createI18n } from 'vue-i18n'
import en from './en.json'
import cy from './cy.json'
import { defaultLocale, isSupportedLocale, type AppLocale } from './locales'

const messages = { en, cy } as const

const LOCALE_STORAGE_KEY = 'vds_locale'

export { supportedLocales, defaultLocale, type AppLocale } from './locales'

/**
 * A fresh i18n instance per app.
 *
 * This MUST NOT be a module-level singleton: vite-ssg renders routes
 * concurrently in one process, and a shared instance leaks whichever locale
 * happened to be set last into every other page. That shipped English pages
 * with Welsh titles and body copy.
 */
export function createAppI18n(locale: AppLocale = defaultLocale) {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: defaultLocale,
    messages,
  })
}

export type AppI18n = ReturnType<typeof createAppI18n>

/** Records an explicit user choice, used only as a first-visit redirect hint. */
export function rememberLocale(locale: AppLocale): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Private-mode / storage-disabled browsers: the URL still works, so ignore.
  }
}

/** The last explicitly chosen locale, if any. */
export function getRememberedLocale(): AppLocale | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isSupportedLocale(stored) ? stored : null
  } catch {
    return null
  }
}
