import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { htmlLang, openGraphLocale } from '../i18n/locales'
import { SITE_ORIGIN, businessId, siteSchemaGraph } from '../seo/siteSchema'

/**
 * i18n label for each path. The breadcrumb trail is built from
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
  '/portfolio': 'nav.portfolio',
}

export function useSeoMeta() {
  const route = useRoute()
  const { t } = useI18n()
  const basePath = computed(() => route.path.replace(/\/+$/, '') || '/')

  const seoKey = computed(() => (route.meta.seoKey as string | undefined) ?? null)
  const seoBaseKey = computed(() => (seoKey.value ? `seo.${seoKey.value}` : null))

  /** True on the catch-all route, which must never be indexed or canonicalised. */
  const isNotFound = computed(() => seoKey.value === 'notFound')

  /**
   * True on any route flagged `noindex` in the router -- a real, linkable
   * page with no indexable content yet (the portfolio section shipped this
   * way before it had a first case study). Unlike `isNotFound`, these routes
   * keep their canonical tag.
   */
  const isNoindex = computed(() => isNotFound.value || (route.meta.noindex as boolean | undefined) === true)

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

  const canonical = computed(() => `${SITE_ORIGIN}${basePath.value}`)

  // Suppressed on the 404 route, where the "page" is whatever bogus path the
  // visitor typed.
  const canonicalLinks = computed(() =>
    isNotFound.value ? [] : [{ rel: 'canonical', href: canonical.value }]
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
        item: `${SITE_ORIGIN}${path}`,
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
          item: `${SITE_ORIGIN}/`,
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
    htmlAttrs: { lang: htmlLang },
    title,
    link: canonicalLinks,
    meta: computed(() => [
      { name: 'description', content: description.value },
      {
        name: 'robots',
        content: isNoindex.value
          ? 'noindex, follow'
          : 'index, follow, max-image-preview:large, max-snippet:-1',
      },
      { name: 'author', content: 'Vanguard Digital Solutions' },
      { property: 'og:title', content: ogTitle.value },
      { property: 'og:description', content: ogDescription.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical.value },
      { property: 'og:site_name', content: 'Vanguard Digital Solutions' },
      { property: 'og:locale', content: openGraphLocale },
      { property: 'og:image', content: `${SITE_ORIGIN}/og-image-2026.png` },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      {
        property: 'og:image:alt',
        content: 'Vanguard Digital Solutions: websites built to bring in work. Starter websites from £100.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle.value },
      { name: 'twitter:description', content: ogDescription.value },
      { name: 'twitter:image', content: `${SITE_ORIGIN}/og-image-2026.png` },
      {
        name: 'twitter:image:alt',
        content: 'Vanguard Digital Solutions: websites built to bring in work. Starter websites from £100.',
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
