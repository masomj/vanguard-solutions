<template>
  <SkipLink />
  <SiteHeader />
  <main id="main-content" tabindex="-1">
    <router-view />
  </main>
  <SiteFooter />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import SkipLink from './components/layout/SkipLink.vue'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import { useSeoMeta } from './composables/useSeoMeta'

useSeoMeta()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vanguard Digital Solutions',
        url: 'https://vanguarddigital.co.za',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'info@vanguarddigital.co.za',
          telephone: '+27-12-345-6789',
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
