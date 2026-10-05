<template>
  <section class="py-20 lg:py-28" aria-labelledby="services-heading">
    <div class="wrap">
      <div class="flex flex-wrap justify-between items-end gap-6 mb-12">
        <div>
          <p class="label text-accent mb-4">{{ t('home.services.kicker') }}</p>
          <h2 id="services-heading" class="text-5xl sm:text-6xl m-0">{{ t('home.services.heading') }}</h2>
        </div>
        <router-link to="/services" class="font-semibold text-ink">{{ t('home.services.allLink') }}</router-link>
      </div>

      <ul class="list-none m-0 p-0 border-b border-border">
        <li v-for="(service, index) in services" :key="service.title">
          <router-link
            :to="routes[index] ?? '/services'"
            class="service-row grid gap-x-8 gap-y-2 items-baseline py-8 border-t border-border no-underline text-ink"
          >
            <span class="font-mono text-sm text-text-secondary" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="service-title text-2xl sm:text-[1.75rem] font-bold leading-tight transition-colors">{{ service.title }}</span>
            <span class="service-desc text-ink-soft">{{ service.description }}</span>
            <span class="service-price font-mono text-sm lg:text-right whitespace-nowrap">
              {{ service.price }} <span aria-hidden="true">&rarr;</span>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const services = computed(() => tm('home.services.items') as { title: string; description: string; price: string }[])

/** Destination per row, in the same order as home.services.items. */
const routes = [
  '/small-business',
  '/services/booking-systems',
  '/services/ecommerce',
  '/services/bespoke-software',
  '/services',
]
</script>

<style scoped>
.service-row {
  grid-template-columns: 3rem minmax(0, 1fr);
}
.service-desc,
.service-price {
  grid-column: 2;
}
.service-row:hover .service-title {
  color: var(--color-accent);
}
@media (min-width: 1024px) {
  .service-row {
    grid-template-columns: 5rem minmax(0, 4fr) minmax(0, 5fr) 10rem;
  }
  .service-desc,
  .service-price {
    grid-column: auto;
  }
}
</style>
