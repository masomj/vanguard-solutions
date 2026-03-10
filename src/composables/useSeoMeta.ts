import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useSeoMeta() {
  const route = useRoute()

  useHead({
    title: computed(() => route.meta.title ?? 'Vanguard Digital Solutions'),
    meta: [
      { name: 'description', content: computed(() => route.meta.description ?? '') },
      { property: 'og:title', content: computed(() => (route.meta.ogTitle ?? route.meta.title) ?? '') },
      { property: 'og:description', content: computed(() => (route.meta.ogDescription ?? route.meta.description) ?? '') },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: computed(() => `https://vanguarddigital.co.za${route.path}`) },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  })
}
