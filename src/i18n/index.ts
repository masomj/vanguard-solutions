import { createI18n } from 'vue-i18n'
import en from './en.json'
import { defaultLocale } from './locales'

export { defaultLocale, type AppLocale } from './locales'

/**
 * All site copy lives in en.json and is read through `t()`. vue-i18n is kept
 * as a copy store (one place to edit wording, pluralisation, interpolation),
 * not for translation: there is only one locale.
 *
 * A fresh instance per app: vite-ssg renders routes concurrently in one
 * process, so a module-level singleton would be shared across renders.
 */
export function createAppI18n() {
  return createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    messages: { en },
  })
}

export type AppI18n = ReturnType<typeof createAppI18n>
