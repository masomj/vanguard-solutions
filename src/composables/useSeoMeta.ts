import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { localisePath, openGraphLocales, supportedLocales, type AppLocale } from '../i18n/locales'
import { SITE_ORIGIN, businessId, siteSchemaGraph } from '../seo/siteSchema'
import { useLocale } from './useLocale'

/**
 * Breadcrumb label per page, keyed by the route's `seoKey`. Pages absent from
 * this map (home, 404) get no breadcrumb, which is correct -- a breadcrumb
 * trail of one item is noise.
 */
const breadcrumbLabelKeys: Record<string, string> = {
  about: 'nav.about',
  services: 'nav.services',
  technology: 'nav.technology',
  process: 'nav.process',
  smallBusiness: 'nav.smallBusiness',
  pricing: 'nav.pricing',
  contact: 'nav.contact',
  cookiePolicy: 'footer.cookiePolicy',
}

// NOTE: never put a "|" in an i18n message. vue-i18n treats it as the
// pluralisation separator, silently splits the message and returns a single
// branch -- which truncated every page title on this site until Aug 2026.
// Use an en dash (–) as the title separator instead.
export function useSeoMeta() {
  const route = useRoute()
  const { t } = useI18n()
  const { locale, alternatePaths } = useLocale()

  const seoKey = computed(() => (route.meta.seoKey as string | undefined) ?? null)
  const seoBaseKey = computed(() => (seoKey.value ? `seo.${seoKey.value}` : null))

  /** True on the catch-all route, which must never be indexed or canonicalised. */
  const isNotFound = computed(() => seoKey.value === 'notFound')

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
  // rather than depending on client-side state. Suppressed on the 404 route,
  // where the "page" is whatever bogus path the visitor typed.
  const alternateLinks = computed(() => {
    if (isNotFound.value) return []

    return [
      { rel: 'canonical', href: canonical.value },
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
    ]
  })

  const ogLocaleAlternates = computed(() =>
    supportedLocales
      .filter((candidate) => candidate !== locale.value)
      .map((candidate: AppLocale) => ({
        property: 'og:locale:alternate',
        content: openGraphLocales[candidate],
      }))
  )

  /**
   * Home -> current page. Generated centrally so a new page inherits its
   * breadcrumb by adding one line to `breadcrumbLabelKeys`, not by remembering
   * to wire schema into the page component.
   */
  const breadcrumbSchema = computed(() => {
    const labelKey = seoKey.value ? breadcrumbLabelKeys[seoKey.value] : undefined
    if (!labelKey) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('nav.home'),
          item: `${SITE_ORIGIN}${localisePath('/', locale.value)}/`.replace(/\/+$/, '/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t(labelKey),
          item: canonical.value,
        },
      ],
    }
  })

  useHead({
    // Owns <html lang> so prerendered Welsh pages ship lang="cy".
    htmlAttrs: { lang: locale },
    title,
    link: alternateLinks,
    meta: computed(() => [
      { name: 'description', content: description.value },
      {
        name: 'robots',
        content: isNotFound.value
          ? 'noindex, follow'
          : 'index, follow, max-image-preview:large, max-snippet:-1',
      },
      { name: 'author', content: 'Vanguard Digital Solutions' },
      { property: 'og:title', content: ogTitle.value },
      { property: 'og:description', content: ogDescription.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical.value },
      { property: 'og:site_name', content: 'Vanguard Digital Solutions' },
      { property: 'og:locale', content: openGraphLocales[locale.value] },
      ...ogLocaleAlternates.value,
      { property: 'og:image', content: `${SITE_ORIGIN}/og-image.png` },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      {
        property: 'og:image:alt',
        content: 'Vanguard Digital Solutions — websites for South Wales businesses',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle.value },
      { name: 'twitter:description', content: ogDescription.value },
      { name: 'twitter:image', content: `${SITE_ORIGIN}/og-image.png` },
      {
        name: 'twitter:image:alt',
        content: 'Vanguard Digital Solutions — websites for South Wales businesses',
      },
    ]),
    script: computed(() => {
      const blocks: object[] = [siteSchemaGraph]
      if (breadcrumbSchema.value) blocks.push(breadcrumbSchema.value)

      return blocks.map((block, index) => ({
        key: `site-schema-${index}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(block),
      }))
    }),
  })

  return { businessId }
}
