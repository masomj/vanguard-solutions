import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const SITE_ORIGIN = 'https://vanguarddigitalsolutions.co.uk'

export function useSeoMeta() {
  const route = useRoute()
  const { t } = useI18n()

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

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: ogDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: computed(() => `${SITE_ORIGIN}${route.path}`) },
      { property: 'og:site_name', content: 'Vanguard Digital Solutions' },
      { property: 'og:image', content: `${SITE_ORIGIN}/og-image.png` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Vanguard Digital Solutions — websites for South Wales businesses' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: `${SITE_ORIGIN}/og-image.png` },
    ],
  })
}
