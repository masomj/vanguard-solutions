<template>
  <Transition name="banner">
    <div
      v-if="bannerVisible"
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-banner-text"
      class="fixed bottom-0 inset-x-0 z-50 bg-primary-dark border-t border-white/10 shadow-lg"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p id="cookie-banner-text" class="text-sm text-white/80 leading-relaxed flex-1">
            We use cookies to analyse site traffic and improve your experience.
            By clicking "Accept", you consent to our use of analytics cookies.
            <router-link
              to="/cookie-policy"
              class="text-accent-light hover:text-white underline transition-colors"
            >
              Learn more
            </router-link>
          </p>
          <div class="flex gap-3 shrink-0">
            <button
              @click="declineCookies"
              class="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white border border-white/30 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark cursor-pointer"
            >
              Decline
            </button>
            <button
              @click="acceptCookies"
              class="px-4 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent-light rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark cursor-pointer"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCookieConsent } from '../../composables/useCookieConsent'

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
