<template>
  <SkipLink />
  <SiteHeader />
  <main id="main-content" tabindex="-1">
    <router-view />
  </main>
  <SiteFooter />
  <CookieBanner />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import SkipLink from './components/layout/SkipLink.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import CookieBanner from './components/cookie/CookieBanner.vue'
import { useSeoMeta } from './composables/useSeoMeta'
import { useAnalytics } from './composables/useAnalytics'

useSeoMeta()
useAnalytics()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vanguard Digital Solutions',
        url: 'https://vanguarddigitalsolutions.co.uk',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'enquiries@vanguarddigitalsolutions.co.uk',
          telephone: '+44-29-1234-5678',
        },
      }),
    },
  ],
})

const router = useRouter()
watch(() => router.currentRoute.value.path, () => {
  const main = document.getElementById('main-content')
  main?.focus()
})
</script>

<style>
#main-content:focus {
  outline: none;
}
</style>
