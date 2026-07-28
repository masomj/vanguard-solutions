<template>
  <header class="bg-white border-b border-border sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-18">
        <router-link :to="localePath('/')" class="flex items-center gap-2 text-primary font-bold text-xl no-underline" :aria-label="t('nav.homeAria')">
          <BrandLogo class="h-8 w-auto shrink-0" variant="gradient" />
          <span class="hidden sm:inline">{{ t('site.name') }}</span>
          <span class="sm:hidden">{{ t('site.shortName') }}</span>
        </router-link>

        <nav class="hidden lg:block" :aria-label="t('nav.mainNavigation')">
          <ul class="flex items-center gap-1 list-none m-0 p-0">
            <li v-for="link in navLinks" :key="link.to">
              <router-link
                :to="link.to"
                class="px-4 py-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-colors no-underline font-medium"
                active-class="text-primary bg-surface"
              >
                {{ link.label }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="localePath('/contact')"
                class="ml-2 px-5 py-2 bg-accent hover:bg-accent-light text-white rounded-md no-underline font-semibold transition-colors"
              >
                {{ t('nav.getQuote') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="alternatePath"
                :hreflang="otherLocale"
                class="ml-2 px-4 py-2 border border-border rounded-md text-sm font-semibold text-text-secondary hover:text-primary hover:bg-surface transition-colors no-underline"
                :aria-label="t('language.switchLabel')"
                @click="rememberChoice"
              >
                <span :lang="otherLocale">{{ localeToggleLabel }}</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-2 lg:hidden">
          <router-link
            :to="alternatePath"
            :hreflang="otherLocale"
            class="px-3 py-2 border border-border rounded-md text-sm font-semibold text-text-secondary hover:text-primary hover:bg-surface transition-colors no-underline"
            :aria-label="t('language.switchLabel')"
            @click="rememberChoice"
          >
            <span :lang="otherLocale">{{ localeToggleLabel }}</span>
          </router-link>

          <button
            class="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-colors"
            :aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            :aria-label="t('nav.toggleNavigationMenu')"
            @click="menuOpen = !menuOpen"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <MobileMenu :open="menuOpen" :nav-links="navLinks" @close="menuOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MobileMenu from './MobileMenu.vue'
import BrandLogo from '../shared/BrandLogo.vue'
import { useLocale } from '../../composables/useLocale'

const menuOpen = ref(false)
const route = useRoute()
const { t } = useI18n()
const { locale, otherLocale, alternatePath, localePath, rememberChoice } = useLocale()

const navLinks = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/services'), label: t('nav.services') },
  { to: localePath('/technology'), label: t('nav.technology') },
  { to: localePath('/process'), label: t('nav.process') },
  { to: localePath('/contact'), label: t('nav.contact') },
])

// The toggle always names the *other* language, in that language, so the label
// carries its own lang attribute or it gets read with the page's phonetics.
const localeToggleLabel = computed(() => (locale.value === 'en'
  ? t('language.switchToWelsh')
  : t('language.switchToEnglish')))

watch(() => route.path, () => {
  menuOpen.value = false
})
</script>
