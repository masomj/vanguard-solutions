<template>
  <div>
    <PageHero :kicker="t('nav.portfolio')" :title="t('portfolio.hero.title')" :subtitle="t('portfolio.hero.subtitle')" />

    <section class="py-16 lg:py-24" :aria-label="t('portfolio.hero.title')">
      <div class="wrap">
        <div v-if="items.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
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
import PageHero from '../components/shared/PageHero.vue'
import PortfolioCard from '../components/portfolio/PortfolioCard.vue'
import PortfolioEmptyState from '../components/portfolio/PortfolioEmptyState.vue'
import CallToAction from '../components/home/CallToAction.vue'
import { portfolioItems } from '../data/portfolio'
import { usePageSchema, collectionPageSchema } from '../composables/usePageSchema'

const { t } = useI18n()

const items = portfolioItems

usePageSchema(() => collectionPageSchema(t('seo.portfolio.title'), t('seo.portfolio.description'), items))
</script>
