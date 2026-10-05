<template>
  <footer class="bg-ink text-[#C9C9C2]">
    <div class="wrap pt-16 pb-10 lg:pt-20">
      <div class="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
        <div class="col-span-2 lg:col-span-1">
          <div class="flex items-center gap-3 mb-5 text-paper">
            <BrandLogo class="h-8 w-auto shrink-0" variant="paper" />
            <span class="display text-lg">VANGUARD</span>
          </div>
          <p class="text-[0.9375rem] leading-relaxed max-w-xs m-0">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <div v-for="column in columns" :key="column.heading">
          <h2 class="label text-[#8A8A84] font-normal tracking-wide mb-4" style="font-stretch: 100%">
            {{ column.heading }}
          </h2>
          <ul class="list-none m-0 p-0 space-y-2.5">
            <li v-for="link in column.links" :key="link.label">
              <a
                v-if="link.href"
                :href="link.href"
                class="text-[#E4E4DE] hover:text-signal no-underline text-[0.9375rem] transition-colors"
              >{{ link.label }}</a>
              <router-link
                v-else
                :to="link.to!"
                class="text-[#E4E4DE] hover:text-signal no-underline text-[0.9375rem] transition-colors"
              >{{ link.label }}</router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16 pt-6 border-t border-[#2E3237] flex flex-wrap justify-between gap-4 font-mono text-xs text-[#8A8A84]">
        <p class="m-0">{{ t('footer.copyright', { year: currentYear }) }}</p>
        <a href="mailto:enquiries@vanguarddigitalsolutions.co.uk" class="text-[#8A8A84] hover:text-signal no-underline break-all">
          enquiries@vanguarddigitalsolutions.co.uk
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BrandLogo from '../shared/BrandLogo.vue'

const currentYear = new Date().getFullYear()
const { t } = useI18n()

type FooterLink = { label: string; to?: string; href?: string }

const columns = computed<{ heading: string; links: FooterLink[] }[]>(() => [
  {
    heading: t('footer.services'),
    links: [
      { to: '/small-business', label: t('footer.serviceSmallBusiness') },
      { to: '/services/business-website', label: t('nav.businessWebsites') },
      { to: '/services/ecommerce', label: t('footer.serviceEcommerce') },
      { to: '/services/booking-systems', label: t('footer.serviceBooking') },
      { to: '/services/bespoke-software', label: t('footer.serviceBespoke') },
      { to: '/pricing', label: t('footer.pricing') },
    ],
  },
  {
    heading: t('footer.studio'),
    links: [
      { to: '/about', label: t('footer.aboutUs') },
      { to: '/portfolio', label: t('nav.portfolio') },
      { to: '/process', label: t('nav.process') },
      { to: '/technology', label: t('nav.technology') },
    ],
  },
  {
    heading: t('footer.contact'),
    links: [
      { to: '/contact', label: t('footer.contactUs') },
      { href: 'mailto:enquiries@vanguarddigitalsolutions.co.uk', label: t('footer.email') },
      { to: '/cookie-policy', label: t('footer.cookiePolicy') },
    ],
  },
])
</script>
