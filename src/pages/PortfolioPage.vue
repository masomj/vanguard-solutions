<template>
  <div>
    <section class="bg-primary text-white py-16 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ t('portfolio.hero.title') }}</h1>
        <p class="text-lg text-white/80 max-w-2xl">{{ t('portfolio.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white" :aria-label="t('portfolio.hero.title')">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="items.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PortfolioCard v-for="item in items" :key="item.slug" :item="item" />
        </div>

        <PortfolioEmptyState v-else />
      </div>
    </section>

    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PortfolioCard from '../components/portfolio/PortfolioCard.vue'
import PortfolioEmptyState from '../components/portfolio/PortfolioEmptyState.vue'
import CallToAction from '../components/home/CallToAction.vue'
import { portfolioItems } from '../data/portfolio'
import { usePageSchema, collectionPageSchema } from '../composables/usePageSchema'

const { t } = useI18n()

const items = portfolioItems

usePageSchema(() => collectionPageSchema(t('seo.portfolio.title'), t('seo.portfolio.description'), items))
</script>
