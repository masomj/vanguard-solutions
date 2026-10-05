<template>
  <div class="bg-ink text-paper">
    <div class="wrap flex flex-wrap justify-between gap-x-6 gap-y-1 py-2.5 font-mono text-xs uppercase tracking-wide">
      <span>{{ t('nav.strapLeft') }}</span>
      <span class="hidden md:inline text-[#C9C9C2]">{{ t('nav.strapRight') }}</span>
    </div>
  </div>
  <header class="bg-paper/95 backdrop-blur border-b border-border sticky top-0 z-50">
    <div class="wrap">
      <div class="flex items-center justify-between gap-3 h-18">
        <router-link :to="'/'" class="flex items-center gap-3 text-ink no-underline min-w-0" :aria-label="t('nav.homeAria')">
          <BrandLogo class="h-8 w-auto shrink-0" />
          <span class="flex flex-col leading-none">
            <span class="display text-xl">VANGUARD</span>
            <span class="font-mono text-[0.625rem] uppercase tracking-wide text-text-secondary mt-1">Digital Solutions</span>
          </span>
        </router-link>

        <nav class="hidden lg:block" :aria-label="t('nav.mainNavigation')">
          <ul class="flex items-center gap-1 list-none m-0 p-0">
            <li v-for="entry in navEntries" :key="entry.id">
              <NavDropdown
                v-if="entry.kind === 'group'"
                :id="entry.id"
                :label="entry.label"
                :items="entry.items"
                :active="isGroupActive(entry)"
                :close-key="route.fullPath"
              />
              <router-link
                v-else
                :to="entry.to"
                class="nav-link px-3 py-2 text-ink no-underline font-medium text-[0.9375rem] whitespace-nowrap"
                active-class="nav-link--active"
              >
                {{ entry.label }}
              </router-link>
            </li>

            <li class="ml-4">
              <BaseButton to="/contact" size="sm" class="shrink-0">
                {{ t('nav.getQuote') }}
              </BaseButton>
            </li>
          </ul>
        </nav>

        <button
          class="lg:hidden inline-flex items-center justify-center gap-2 min-h-11 min-w-11 px-3 shrink-0 border border-ink text-ink font-semibold text-sm bg-transparent cursor-pointer"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="t('nav.toggleNavigationMenu')"
          @click="menuOpen = !menuOpen"
        >
          <span class="hidden min-[360px]:inline">{{ t('nav.menu') }}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="square" stroke-width="2" d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>
    </div>

    <MobileMenu :open="menuOpen" :nav-entries="navEntries" @close="menuOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MobileMenu from './MobileMenu.vue'
import NavDropdown from './NavDropdown.vue'
import BrandLogo from '../shared/BrandLogo.vue'
import BaseButton from '../shared/BaseButton.vue'
import type { NavEntry, NavGroup } from '../../types'

const menuOpen = ref(false)
const route = useRoute()
const { t } = useI18n()

/**
 * Four top-level slots plus the quote button. The two groups collect pages
 * that answer the same question ("what do you build?" and "who are you and
 * how do you work?"). The logo is the home link.
 *
 * Every destination is still a real anchor in the rendered HTML, so grouping
 * costs nothing in crawlability.
 */
const navEntries = computed<NavEntry[]>(() => [
  {
    kind: 'group',
    id: 'services',
    label: t('nav.services'),
    items: [
      { to: '/services', label: t('nav.allServices') },
      { to: '/small-business', label: t('nav.forSmallBusiness') },
      { to: '/services/business-website', label: t('nav.businessWebsites') },
      { to: '/services/ecommerce', label: t('nav.onlineShops') },
      { to: '/services/booking-systems', label: t('nav.bookingSystems') },
      { to: '/services/bespoke-software', label: t('nav.bespokeSoftware') },
    ],
  },
  { kind: 'link', id: 'pricing', to: '/pricing', label: t('nav.pricing') },
  { kind: 'link', id: 'portfolio', to: '/portfolio', label: t('nav.portfolio') },
  {
    kind: 'group',
    id: 'about',
    label: t('nav.about'),
    items: [
      { to: '/about', label: t('nav.aboutUs') },
      { to: '/process', label: t('nav.howWeWork') },
      { to: '/technology', label: t('nav.technology') },
    ],
  },
])

// A group reads as active when the current page is one of its children, so the
// bar still shows where you are once a page is nested behind a dropdown.
function isGroupActive(group: NavGroup): boolean {
  return group.items.some((item) => route.path === item.to || route.path.startsWith(`${item.to}/`))
}

watch(() => route.path, () => {
  menuOpen.value = false
})
</script>

<style scoped>
.nav-link {
  text-decoration-line: underline;
  text-decoration-color: transparent;
  text-decoration-thickness: 3px;
  text-underline-offset: 8px;
  transition: text-decoration-color 0.15s ease;
}
.nav-link:hover {
  text-decoration-color: var(--color-border);
}
.nav-link--active {
  text-decoration-color: var(--color-signal);
}
</style>
