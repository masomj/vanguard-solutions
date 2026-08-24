<template>
  <section class="py-16 lg:py-24 bg-surface" aria-labelledby="why-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading heading-id="why-heading" :subtitle="t('home.whyChoose.subtitle')">
        {{ t('home.whyChoose.heading') }}
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <article v-for="item in reasons" :key="item.title" class="text-center">
          <div class="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4" aria-hidden="true">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.iconPath" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">{{ item.title }}</h3>
          <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
        </article>
      </div>

      <p class="mt-12 text-center">
        <router-link :to="localePath('/about')" class="text-primary font-semibold hover:text-primary-light no-underline">
          {{ t('home.whyChoose.aboutLinkText') }} &rarr;
        </router-link>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeading from '../shared/SectionHeading.vue'
import { useLocale } from '../../composables/useLocale'

const { t } = useI18n()
const { localePath } = useLocale()

const reasons = computed(() => [
  {
    title: t('home.whyChoose.item1Title'),
    description: t('home.whyChoose.item1Description'),
    iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: t('home.whyChoose.item2Title'),
    description: t('home.whyChoose.item2Description'),
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: t('home.whyChoose.item3Title'),
    description: t('home.whyChoose.item3Description'),
    iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
  {
    title: t('home.whyChoose.item4Title'),
    description: t('home.whyChoose.item4Description'),
    iconPath: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
  },
])
</script>
