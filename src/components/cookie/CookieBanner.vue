<template>
  <Transition name="banner">
    <div
      v-if="bannerVisible"
      role="dialog"
      :aria-label="t('cookieBanner.ariaLabel')"
      aria-describedby="cookie-banner-text"
      class="fixed bottom-0 inset-x-0 z-50 bg-ink border-t-4 border-signal"
    >
      <div class="wrap py-4 sm:py-5">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p id="cookie-banner-text" class="text-sm text-white/80 leading-relaxed flex-1">
            {{ t('cookieBanner.messageA') }}
            {{ t('cookieBanner.messageB') }}
            <router-link
              :to="'/cookie-policy'"
              class="text-paper hover:text-signal underline transition-colors"
            >
              {{ t('cookieBanner.learnMore') }}
            </router-link>
          </p>
          <div class="flex gap-3 shrink-0">
            <button
              @click="declineCookies"
              class="min-h-11 px-4 text-sm font-semibold text-paper hover:bg-paper hover:text-ink border border-paper bg-transparent transition-colors cursor-pointer"
            >
              {{ t('cookieBanner.decline') }}
            </button>
            <button
              @click="acceptCookies"
              class="min-h-11 px-4 text-sm font-semibold text-ink bg-signal hover:bg-signal-dark border border-signal transition-colors cursor-pointer"
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
