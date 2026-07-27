<template>
  <Transition name="banner">
    <div
      v-if="bannerVisible"
      role="dialog"
      :aria-label="t('cookieBanner.ariaLabel')"
      aria-describedby="cookie-banner-text"
      class="fixed bottom-0 inset-x-0 z-50 bg-primary-dark border-t border-white/10 shadow-lg"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p id="cookie-banner-text" class="text-sm text-white/80 leading-relaxed flex-1">
            {{ t('cookieBanner.messageA') }}
            {{ t('cookieBanner.messageB') }}
            <router-link
              to="/cookie-policy"
              class="text-accent-cyan hover:text-white underline transition-colors"
            >
              {{ t('cookieBanner.learnMore') }}
            </router-link>
          </p>
          <div class="flex gap-3 shrink-0">
            <button
              @click="declineCookies"
              class="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white border border-white/30 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark cursor-pointer"
            >
              {{ t('cookieBanner.decline') }}
            </button>
            <button
              @click="acceptCookies"
              class="px-4 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent-light rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark cursor-pointer"
            >
              {{ t('cookieBanner.accept') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCookieConsent } from '../../composables/useCookieConsent'

const { t } = useI18n()
const { bannerVisible, acceptCookies, declineCookies } = useCookieConsent()
</script>

<style scoped>
.banner-enter-active,
.banner-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.banner-enter-from,
.banner-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
