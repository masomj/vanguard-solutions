<template>
  <section class="py-16 lg:py-24 bg-white" aria-labelledby="services-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading :subtitle="t('home.servicesOverview.subtitle')">
        {{ t('home.servicesOverview.heading') }}
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="service in services" :key="service.title"
          class="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-3">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0" aria-hidden="true">
            {{ service.icon }}
          </div>
          <h3 class="text-lg font-semibold text-text">{{ service.title }}</h3>
          <p class="text-sm text-text-light leading-relaxed flex-1">{{ service.description }}</p>
        </article>
      </div>

      <div class="mt-12 text-center">
        <BaseButton to="/services" variant="primary">
          {{ t('home.servicesOverview.exploreAll') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '../shared/SectionHeading.vue'
import BaseButton from '../shared/BaseButton.vue'

const { t } = useI18n()

const services = computed(() => [
  {
    icon: '🎨',
    title: t('home.servicesOverview.card1Title'),
    description: t('home.servicesOverview.card1Description'),
  },
  {
    icon: '🛒',
    title: t('home.servicesOverview.card2Title'),
    description: t('home.servicesOverview.card2Description'),
  },
  {
    icon: '📅',
    title: t('home.servicesOverview.card3Title'),
    description: t('home.servicesOverview.card3Description'),
  },
  {
    icon: '📋',
    title: t('home.servicesOverview.card4Title'),
    description: t('home.servicesOverview.card4Description'),
  },
  {
    icon: '⚙️',
    title: t('home.servicesOverview.card5Title'),
    description: t('home.servicesOverview.card5Description'),
  },
  {
    icon: '🔗',
    title: t('home.servicesOverview.card6Title'),
    description: t('home.servicesOverview.card6Description'),
  },
])
</script>
