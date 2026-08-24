import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { localisePath, openGraphLocales, supportedLocales, type AppLocale } from '../i18n/locales'
import { SITE_ORIGIN, businessId, siteSchemaGraph } from '../seo/siteSchema'
import { useLocale } from './useLocale'

/**
 * i18n label for each locale-agnostic path. The breadcrumb trail is built from
 * the path's own segments, so `/services/ecommerce` yields Home > Services >
 * Online Shops automatically. A new page needs one line here and nothing else.
 * Paths absent from this map (home, 404) get no breadcrumb -- a trail of one
 * item is noise.
 */
const pathLabelKeys: Record<string, string> = {
  '/about': 'nav.about',
  '/services': 'nav.services',
  '/services/ecommerce': 'serviceDetail.ecommerce.navLabel',
  '/services/booking-systems': 'serviceDetail.booking.navLabel',
  '/services/business-website': 'serviceDetail.businessWebsite.navLabel',
  '/services/bespoke-software': 'serviceDetail.bespoke.navLabel',
  '/technology': 'nav.technology',
  '/process': 'nav.process',
  '/small-business': 'nav.smallBusiness',
  '/pricing': 'nav.pricing',
  '/contact': 'nav.contact',
  '/cookie-policy': 'footer.cookiePolicy',
}

export function useSeoMeta() {
  const route = useRoute()
  const { t } = useI18n()
  const { locale, basePath, alternatePaths } = useLocale()

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
    if (isNotFound.value || basePath.value === '/') return null

    const segments = basePath.value.split('/').filter(Boolean)
    const trail: { name: string; item: string }[] = []

    for (let i = 0; i < segments.length; i += 1) {
      const path = `/${segments.slice(0, i + 1).join('/')}`
      const labelKey = pathLabelKeys[path]
      if (!labelKey) return null

      trail.push({
        name: t(labelKey),
        item: `${SITE_ORIGIN}${localisePath(path, locale.value)}`,
      })
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('nav.home'),
          item: `${SITE_ORIGIN}${localisePath('/', locale.value) || '/'}`,
        },
        ...trail.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: crumb.name,
          item: crumb.item,
        })),
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
