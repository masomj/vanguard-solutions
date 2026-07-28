import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { openGraphLocales, supportedLocales, type AppLocale } from '../i18n/locales'
import { useLocale } from './useLocale'

const SITE_ORIGIN = 'https://vanguarddigitalsolutions.co.uk'

export function useSeoMeta() {
  const route = useRoute()
  const { t } = useI18n()
  const { locale, alternatePaths } = useLocale()

  const seoBaseKey = computed(() => {
    const key = route.meta.seoKey
    return key ? `seo.${key}` : null
  })

  const title = computed(() => {
    if (!seoBaseKey.value) return t('seo.fallbackTitle')
    return t(`${seoBaseKey.value}.title`)
  })

  const description = computed(() => {
    if (!seoBaseKey.value) return ''
    return t(`${seoBaseKey.value}.description`)
  })

  const ogTitle = computed(() => {
    if (!seoBaseKey.value) return t('seo.fallbackTitle')
    return t(`${seoBaseKey.value}.ogTitle`)
  })

  const ogDescription = computed(() => {
    if (!seoBaseKey.value) return ''
    return t(`${seoBaseKey.value}.ogDescription`)
  })

  const canonical = computed(() => `${SITE_ORIGIN}${alternatePaths.value[locale.value]}`)

  // hreflang alternates plus x-default, so each locale tree is discoverable
  // rather than depending on client-side state.
  const alternateLinks = computed(() => [
    ...supportedLocales.map((candidate) => ({
      rel: 'alternate',
      hreflang: candidate === 'en' ? 'en-GB' : candidate,
      href: `${SITE_ORIGIN}${alternatePaths.value[candidate]}`,
    })),
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${SITE_ORIGIN}${alternatePaths.value.en}`,
    },
  ])

  const ogLocaleAlternates = computed(() =>
    supportedLocales
      .filter((candidate) => candidate !== locale.value)
      .map((candidate: AppLocale) => ({
        property: 'og:locale:alternate',
        content: openGraphLocales[candidate],
      }))
  )

  useHead({
    // Owns <html lang> so prerendered Welsh pages ship lang="cy".
    htmlAttrs: { lang: locale },
    title,
    link: computed(() => [{ rel: 'canonical', href: canonical.value }, ...alternateLinks.value]),
    meta: computed(() => [
      { name: 'description', content: description.value },
      { property: 'og:title', content: ogTitle.value },
      { property: 'og:description', content: ogDescription.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical.value },
      { property: 'og:site_name', content: 'Vanguard Digital Solutions' },
      { property: 'og:locale', content: openGraphLocales[locale.value] },
      ...ogLocaleAlternates.value,
      { property: 'og:image', content: `${SITE_ORIGIN}/og-image.png` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Vanguard Digital Solutions — websites for South Wales businesses' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: `${SITE_ORIGIN}/og-image.png` },
    ]),
  })
}
