import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  defaultLocale,
  localeFromPath,
  localisePath,
  stripLocalePrefix,
  supportedLocales,
  type AppLocale,
} from '../i18n/locales'
import { rememberLocale } from '../i18n'

/**
 * Locale awareness derived from the current route.
 *
 * `localePath` must wrap every internal link target, otherwise a Welsh visitor
 * clicking a nav item would silently fall back into the English tree.
 */
export function useLocale() {
  const route = useRoute()

  const locale = computed<AppLocale>(
    () => (route.meta.locale as AppLocale | undefined) ?? localeFromPath(route.path)
  )

  /** The locale-agnostic path of the current page, e.g. `/services`. */
  const basePath = computed(() => stripLocalePrefix(route.path))

  /** The locale the toggle switches to. Two locales, so it's just "the other one". */
  const otherLocale = computed<AppLocale>(
    () => supportedLocales.find((candidate) => candidate !== locale.value) ?? defaultLocale
  )

  /** Same page, other language. */
  const alternatePath = computed(() => localisePath(basePath.value, otherLocale.value))

  /** Every locale's URL for the current page, for hreflang alternates. */
  const alternatePaths = computed(
    () =>
      Object.fromEntries(
        supportedLocales.map((candidate) => [candidate, localisePath(basePath.value, candidate)])
      ) as Record<AppLocale, string>
  )

  /** Rewrites an internal link into the active locale's tree. */
  function localePath(path: string): string {
    return localisePath(path, locale.value)
  }

  /** Called when the user actively picks a language, so we can honour it next visit. */
  function rememberChoice(): void {
    rememberLocale(otherLocale.value)
  }

  return {
    locale,
    otherLocale,
    basePath,
    alternatePath,
    alternatePaths,
    localePath,
    rememberChoice,
  }
}
