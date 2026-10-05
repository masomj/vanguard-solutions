// The site is English only (en-GB). The Welsh tree under /cy was removed in
// the 2026 redesign; scripts/generate-sitemap.mjs writes redirect stubs for
// the old /cy URLs so existing links and search results land on English.

export const defaultLocale = 'en' as const

export type AppLocale = typeof defaultLocale

/** `lang` attribute value and og:locale for every page. */
export const htmlLang = 'en-GB'
export const openGraphLocale = 'en_GB'
