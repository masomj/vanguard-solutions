<template>
  <header class="bg-white border-b border-border sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-18">
        <router-link to="/" class="flex items-center gap-2 text-primary font-bold text-xl no-underline" aria-label="Vanguard Digital Solutions — Home">
          <svg class="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="currentColor" />
            <path d="M8 10l8 12 8-12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </svg>
          <span class="hidden sm:inline">Vanguard Digital Solutions</span>
          <span class="sm:hidden">VDS</span>
        </router-link>

        <nav class="hidden lg:block" aria-label="Main navigation">
          <ul class="flex items-center gap-1 list-none m-0 p-0">
            <li v-for="link in navLinks" :key="link.to">
              <router-link
                :to="link.to"
                class="px-4 py-2 rounded-md text-text-light hover:text-primary hover:bg-surface transition-colors no-underline font-medium"
                active-class="text-primary bg-surface"
              >
                {{ link.label }}
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="ml-2 px-5 py-2 bg-accent hover:bg-accent-light text-white rounded-md no-underline font-semibold transition-colors"
              >
                Get a Quote
              </router-link>
            </li>
          </ul>
        </nav>

        <button
          class="lg:hidden p-2 rounded-md text-text-light hover:text-primary hover:bg-surface transition-colors"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <MobileMenu :open="menuOpen" :nav-links="navLinks" @close="menuOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MobileMenu from './MobileMenu.vue'

const menuOpen = ref(false)
const route = useRoute()

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

watch(() => route.path, () => {
  menuOpen.value = false
})
</script>
