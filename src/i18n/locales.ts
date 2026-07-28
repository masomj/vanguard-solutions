// Locale constants and URL helpers.
//
// The URL is the single source of truth for locale: English lives at the root
// (`/services`) and Welsh under a prefix (`/cy/services`). localStorage is only
// ever a first-visit hint, never authoritative -- otherwise a shared Welsh link
// would open in English and the Welsh pages would stay unindexable.

export const supportedLocales = ['en', 'cy'] as const

export type AppLocale = (typeof supportedLocales)[number]

export const defaultLocale: AppLocale = 'en'

/** URL prefix per locale. The default locale is unprefixed. */
export const localePrefixes: Record<AppLocale, string> = {
  en: '',
  cy: '/cy',
}

/** `en_GB` style values for og:locale. */
export const openGraphLocales: Record<AppLocale, string> = {
  en: 'en_GB',
  cy: 'cy_GB',
}

export function isSupportedLocale(value: string | null | undefined): value is AppLocale {
  return value != null && (supportedLocales as readonly string[]).includes(value)
}

/** Removes any locale prefix, returning the locale-agnostic path (always leading-slashed). */
export function stripLocalePrefix(path: string): string {
  for (const locale of supportedLocales) {
    const prefix = localePrefixes[locale]
    if (!prefix) continue
    if (path === prefix) return '/'
    if (path.startsWith(`${prefix}/`)) return path.slice(prefix.length) || '/'
  }
  return path || '/'
}

/** Reads the locale a path belongs to, based on its prefix. */
export function localeFromPath(path: string): AppLocale {
  for (const locale of supportedLocales) {
    const prefix = localePrefixes[locale]
    if (!prefix) continue
    if (path === prefix || path.startsWith(`${prefix}/`)) return locale
  }
  return defaultLocale
}

/** Rewrites any path into the given locale's tree. */
export function localisePath(path: string, locale: AppLocale): string {
  const base = stripLocalePrefix(path)
  const prefix = localePrefixes[locale]
  if (!prefix) return base
  return base === '/' ? prefix : `${prefix}${base}`
}
