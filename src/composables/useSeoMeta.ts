import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

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
      { property: 'og:url', content: computed(() => `https://vanguarddigitalsolutions.co.uk${route.path}`) },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  })
}
